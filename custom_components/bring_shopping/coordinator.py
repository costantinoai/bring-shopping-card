"""DataUpdateCoordinator for the Bring! Shopping Card integration."""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import timedelta
import logging
from typing import Any

from bring_api import Bring, BringAuthException, BringRequestException, BringList
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .const import DOMAIN, UPDATE_INTERVAL
from .helpers import (
    load_section_translations,
    translate_section,
    get_image_url,
    get_icon_for_item,
)

_LOGGER = logging.getLogger(__name__)


@dataclass
class BringItem:
    """Representation of a shopping list item."""

    name: str
    original_name: str
    specification: str
    icon: str
    image_url: str | None
    category: str


@dataclass
class BringListData:
    """Data for a single Bring! list."""

    list_uuid: str
    name: str
    purchase: list[BringItem] = field(default_factory=list)
    recently: list[BringItem] = field(default_factory=list)
    available: list[BringItem] = field(default_factory=list)


@dataclass
class BringData:
    """Coordinator data containing all lists."""

    lists: dict[str, BringListData] = field(default_factory=dict)


class BringDataUpdateCoordinator(DataUpdateCoordinator[BringData]):
    """Class to manage fetching Bring data."""

    def __init__(
        self,
        hass: HomeAssistant,
        bring: Bring,
    ) -> None:
        """Initialize the coordinator."""
        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=timedelta(seconds=UPDATE_INTERVAL),
        )
        self.bring = bring
        self._lists_info: list[BringList] = []

    async def _async_update_data(self) -> BringData:
        """Fetch data from Bring API."""
        try:
            # Get all lists
            lists_response = await self.bring.load_lists()
            self._lists_info = lists_response.lists

            data = BringData()

            # Fetch data for each list
            for list_info in self._lists_info:
                list_uuid = list_info.listUuid
                list_name = list_info.name

                if not list_uuid:
                    continue

                try:
                    list_data = await self._fetch_list_data(list_uuid, list_name)
                    data.lists[list_uuid] = list_data
                except Exception as err:
                    _LOGGER.error(
                        "Failed to fetch data for list %s (%s): %s",
                        list_name,
                        list_uuid,
                        err,
                    )
                    # Don't let a single unparseable item (e.g. a flyer/offer item)
                    # make the whole list disappear from the card. Fall back to the
                    # last known good data for this list if we have it.
                    previous = (
                        self.data.lists.get(list_uuid) if self.data else None
                    )
                    if previous is not None:
                        data.lists[list_uuid] = previous

            return data

        except BringAuthException as err:
            _LOGGER.error("Authentication error with Bring API: %s", err)
            raise UpdateFailed(f"Authentication failed: {err}") from err
        except BringRequestException as err:
            _LOGGER.error("Request error with Bring API: %s", err)
            raise UpdateFailed(f"Failed to fetch data: {err}") from err
        except Exception as err:
            _LOGGER.error("Unexpected error fetching Bring data: %s", err)
            raise UpdateFailed(f"Unexpected error: {err}") from err

    def _list_locale(self, list_uuid: str) -> str:
        """Determine the article language configured for a list in Bring."""
        settings = getattr(self.bring, "user_list_settings", None) or {}
        entry = settings.get(list_uuid) or {}
        return entry.get("listArticleLanguage") or getattr(
            self.bring, "user_locale", "de-CH"
        )

    async def _fetch_list_data(
        self, list_uuid: str, list_name: str
    ) -> BringListData:
        """Fetch data for a single list."""
        # Get items
        items_response = await self.bring.get_list(list_uuid)

        # Category ids come back as canonical German keys; localize them to the
        # list's language using Bring's own translation files (cached).
        locale = self._list_locale(list_uuid)
        sections = await self.hass.async_add_executor_job(
            load_section_translations, locale
        )

        # Get all item details (for images and categories). These are optional
        # enrichment; if they fail to load or parse we still show the list with
        # its items rather than dropping everything.
        try:
            details_response = await self.bring.get_all_item_details(list_uuid)
            details_items = details_response.items
        except Exception as err:
            _LOGGER.warning(
                "Failed to fetch item details for list %s (%s); "
                "showing items without images/categories: %s",
                list_name,
                list_uuid,
                err,
            )
            details_items = []
        details_map = {d.itemId: d for d in details_items}

        # Process purchase items
        purchase_items = []
        for item in items_response.items.purchase:
            item_id = item.itemId
            detail = details_map.get(item_id)

            icon_item_id = detail.userIconItemId if detail else item_id
            category = detail.userSectionId if detail else ""
            image_url = detail.imageUrl if detail and detail.imageUrl else get_image_url(icon_item_id or item_id)

            purchase_items.append(
                BringItem(
                    name=item_id,
                    original_name=item_id,
                    specification=item.specification or "",
                    icon=get_icon_for_item(item_id, icon_item_id, category),
                    image_url=image_url,
                    category=translate_section(category, sections),
                )
            )

        # Process recently items (limit to 20)
        recently_items = []
        for item in items_response.items.recently[:20]:
            item_id = item.itemId
            detail = details_map.get(item_id)

            icon_item_id = detail.userIconItemId if detail else item_id
            category = detail.userSectionId if detail else ""
            image_url = detail.imageUrl if detail and detail.imageUrl else get_image_url(icon_item_id or item_id)

            recently_items.append(
                BringItem(
                    name=item_id,
                    original_name=item_id,
                    specification=item.specification or "",
                    icon=get_icon_for_item(item_id, icon_item_id, category),
                    image_url=image_url,
                    category=translate_section(category, sections),
                )
            )

        # Process available items (all known items not in purchase)
        purchase_names = {item.itemId for item in items_response.items.purchase}
        available_items = []
        seen = set()

        for detail in details_items:
            item_id = detail.itemId
            if item_id and item_id not in seen and item_id not in purchase_names:
                seen.add(item_id)
                category = detail.userSectionId
                icon_item_id = detail.userIconItemId or item_id
                image_url = detail.imageUrl if detail.imageUrl else get_image_url(icon_item_id)

                available_items.append(
                    BringItem(
                        name=item_id,
                        original_name=item_id,
                        specification="",
                        icon=get_icon_for_item(item_id, icon_item_id, category),
                        image_url=image_url,
                        category=translate_section(category, sections),
                    )
                )

        # Sort available by category
        available_items.sort(key=lambda x: (x.category or "ZZZ", x.name))

        return BringListData(
            list_uuid=list_uuid,
            name=list_name,
            purchase=purchase_items,
            recently=recently_items,
            available=available_items,
        )

    def get_lists_info(self) -> list[dict[str, Any]]:
        """Get basic info about all lists (for the card's list selector)."""
        return [
            {
                "uuid": lst.listUuid,
                "name": lst.name,
            }
            for lst in self._lists_info
            if lst.listUuid
        ]

    async def async_add_item(
        self,
        list_uuid: str,
        item_name: str,
        specification: str = "",
    ) -> bool:
        """Add an item to a shopping list."""
        try:
            await self.bring.save_item(list_uuid, item_name, specification)
            await self.async_request_refresh()
            return True
        except Exception as err:
            _LOGGER.error("Failed to add item %s: %s", item_name, err)
            return False

    async def async_complete_item(
        self,
        list_uuid: str,
        item_name: str,
    ) -> bool:
        """Mark an item as completed (move to recently)."""
        try:
            await self.bring.complete_item(list_uuid, item_name)
            await self.async_request_refresh()
            return True
        except Exception as err:
            _LOGGER.error("Failed to complete item %s: %s", item_name, err)
            return False

    async def async_update_item(
        self,
        list_uuid: str,
        item_name: str,
        specification: str,
    ) -> bool:
        """Update an item's specification."""
        try:
            # save_item with same name updates the specification
            await self.bring.save_item(list_uuid, item_name, specification)
            await self.async_request_refresh()
            return True
        except Exception as err:
            _LOGGER.error("Failed to update item %s: %s", item_name, err)
            return False

    async def async_remove_item(
        self,
        list_uuid: str,
        item_name: str,
    ) -> bool:
        """Remove an item from the list."""
        try:
            await self.bring.remove_item(list_uuid, item_name)
            await self.async_request_refresh()
            return True
        except Exception as err:
            _LOGGER.error("Failed to remove item %s: %s", item_name, err)
            return False

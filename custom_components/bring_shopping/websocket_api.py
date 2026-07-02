"""WebSocket API for the Bring! Shopping Card."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import (
    ATTR_ITEM_NAME,
    ATTR_LIST_UUID,
    ATTR_ORDER,
    ATTR_ORIGINAL_NAME,
    ATTR_SPECIFICATION,
    DOMAIN,
    WS_TYPE_ADD_ITEM,
    WS_TYPE_COMPLETE_ITEM,
    WS_TYPE_GET_ITEMS,
    WS_TYPE_GET_LISTS,
    WS_TYPE_REORDER_ITEMS,
    WS_TYPE_UPDATE_ITEM,
)
from .coordinator import BringDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

# Track if API is already registered
_api_registered = False


def async_register_websocket_api(hass: HomeAssistant) -> None:
    """Register the WebSocket API."""
    global _api_registered
    if _api_registered:
        return
    _api_registered = True

    websocket_api.async_register_command(hass, ws_get_lists)
    websocket_api.async_register_command(hass, ws_get_items)
    websocket_api.async_register_command(hass, ws_add_item)
    websocket_api.async_register_command(hass, ws_complete_item)
    websocket_api.async_register_command(hass, ws_update_item)
    websocket_api.async_register_command(hass, ws_reorder_items)


def _iter_coordinators(hass: HomeAssistant) -> list[BringDataUpdateCoordinator]:
    """Return the coordinators for all configured Bring accounts."""
    coordinators: list[BringDataUpdateCoordinator] = []
    for entry in hass.config_entries.async_entries(DOMAIN):
        if getattr(entry, "runtime_data", None):
            coordinators.append(entry.runtime_data)
    return coordinators


def _coordinator_for_list(
    hass: HomeAssistant, list_uuid: str
) -> BringDataUpdateCoordinator | None:
    """Find the coordinator (account) that owns the given list.

    Supports multiple Bring accounts: operations are routed to whichever
    account actually contains the list, rather than always the first one.
    """
    for coordinator in _iter_coordinators(hass):
        if coordinator.data and list_uuid in coordinator.data.lists:
            return coordinator
    return None


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_GET_LISTS,
    }
)
@callback
def ws_get_lists(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Get all available shopping lists across all configured accounts."""
    coordinators = _iter_coordinators(hass)

    if not coordinators:
        connection.send_error(msg["id"], "not_found", "Bring! integration not found")
        return

    lists = []
    seen: set[str] = set()
    for coordinator in coordinators:
        for info in coordinator.get_lists_info():
            uuid = info.get("uuid")
            if uuid and uuid not in seen:
                seen.add(uuid)
                lists.append(info)

    connection.send_result(msg["id"], {"lists": lists})


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_GET_ITEMS,
        vol.Required(ATTR_LIST_UUID): str,
    }
)
@callback
def ws_get_items(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Get items for a specific shopping list."""
    list_uuid = msg[ATTR_LIST_UUID]
    coordinator = _coordinator_for_list(hass, list_uuid)

    if not coordinator:
        connection.send_error(msg["id"], "not_found", f"List {list_uuid} not found")
        return

    list_data = coordinator.data.lists.get(list_uuid) if coordinator.data else None

    if not list_data:
        connection.send_error(msg["id"], "not_found", f"List {list_uuid} not found")
        return

    # Convert dataclasses to dicts for JSON serialization
    def item_to_dict(item):
        return {
            "name": item.name,
            "originalName": item.original_name,
            "specification": item.specification,
            "icon": item.icon,
            "imageUrl": item.image_url,
            "category": item.category,
        }

    result = {
        "listUuid": list_data.list_uuid,
        "name": list_data.name,
        "purchase": [item_to_dict(item) for item in list_data.purchase],
        "recently": [item_to_dict(item) for item in list_data.recently],
        "available": [item_to_dict(item) for item in list_data.available],
    }

    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_ADD_ITEM,
        vol.Required(ATTR_LIST_UUID): str,
        vol.Required(ATTR_ITEM_NAME): str,
        vol.Optional(ATTR_ORIGINAL_NAME): str,
        vol.Optional(ATTR_SPECIFICATION, default=""): str,
    }
)
@websocket_api.async_response
async def ws_add_item(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Add an item to a shopping list."""
    list_uuid = msg[ATTR_LIST_UUID]
    coordinator = _coordinator_for_list(hass, list_uuid)

    if not coordinator:
        connection.send_error(msg["id"], "not_found", f"List {list_uuid} not found")
        return

    # Use original_name if provided (for items from available/recently)
    item_name = msg.get(ATTR_ORIGINAL_NAME, msg[ATTR_ITEM_NAME])
    specification = msg.get(ATTR_SPECIFICATION, "")

    success = await coordinator.async_add_item(list_uuid, item_name, specification)

    if success:
        connection.send_result(msg["id"], {"success": True})
    else:
        connection.send_error(msg["id"], "failed", "Failed to add item")


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_COMPLETE_ITEM,
        vol.Required(ATTR_LIST_UUID): str,
        vol.Required(ATTR_ORIGINAL_NAME): str,
    }
)
@websocket_api.async_response
async def ws_complete_item(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Mark an item as completed."""
    list_uuid = msg[ATTR_LIST_UUID]
    coordinator = _coordinator_for_list(hass, list_uuid)

    if not coordinator:
        connection.send_error(msg["id"], "not_found", f"List {list_uuid} not found")
        return

    item_name = msg[ATTR_ORIGINAL_NAME]

    success = await coordinator.async_complete_item(list_uuid, item_name)

    if success:
        connection.send_result(msg["id"], {"success": True})
    else:
        connection.send_error(msg["id"], "failed", "Failed to complete item")


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_UPDATE_ITEM,
        vol.Required(ATTR_LIST_UUID): str,
        vol.Required(ATTR_ORIGINAL_NAME): str,
        vol.Required(ATTR_SPECIFICATION): str,
    }
)
@websocket_api.async_response
async def ws_update_item(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update an item's specification."""
    list_uuid = msg[ATTR_LIST_UUID]
    coordinator = _coordinator_for_list(hass, list_uuid)

    if not coordinator:
        connection.send_error(msg["id"], "not_found", f"List {list_uuid} not found")
        return

    item_name = msg[ATTR_ORIGINAL_NAME]
    specification = msg[ATTR_SPECIFICATION]

    success = await coordinator.async_update_item(list_uuid, item_name, specification)

    if success:
        connection.send_result(msg["id"], {"success": True})
    else:
        connection.send_error(msg["id"], "failed", "Failed to update item")


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_REORDER_ITEMS,
        vol.Required(ATTR_LIST_UUID): str,
        vol.Required(ATTR_ORDER): [str],
    }
)
@callback
def ws_reorder_items(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Store custom item order (client-side only, Bring API doesn't support ordering).

    The order is stored in the frontend/card, this endpoint just acknowledges the request.
    """
    # Note: Bring API doesn't support custom ordering
    # The card stores order in localStorage
    # This endpoint is here for potential future server-side storage
    connection.send_result(
        msg["id"],
        {
            "success": True,
            "order": msg[ATTR_ORDER],
        },
    )

"""Helper functions for the Bring! Shopping Card integration."""
from __future__ import annotations

import importlib.resources
import json
import logging

from .const import BRING_CDN_BASE
from .translations_data import (
    CATEGORY_ICONS,
    DEFAULT_ICON,
    ITEM_ICONS,
)

_LOGGER = logging.getLogger(__name__)

# Cache of Bring's canonical(German) -> localized name maps, keyed by locale.
_section_cache: dict[str, dict[str, str]] = {}


def load_section_translations(locale: str) -> dict[str, str]:
    """Load Bring's section/name translations for a locale.

    Bring ships translation files (bundled with the ``bring_api`` dependency)
    that map canonical German keys to localized labels, e.g.
    "Fleisch & Fisch" -> "Meat & Fish" (en) / "Carne & Pesce" (it). These files
    also contain the section names, so we reuse them to localize categories to
    whatever language the list is in. Results are cached per locale.

    Returns an empty dict if the locale is unknown or the file can't be read,
    in which case callers fall back to the raw (German) key.
    """
    if not locale:
        return {}
    if locale in _section_cache:
        return _section_cache[locale]

    data: dict[str, str] = {}
    try:
        resource = (
            importlib.resources.files("bring_api")
            / "locales"
            / f"articles.{locale}.json"
        )
        with resource.open("r", encoding="utf-8") as file:
            data = json.load(file)
    except FileNotFoundError:
        _LOGGER.debug(
            "No Bring locale file for %s; sections will show untranslated", locale
        )
    except Exception as err:  # noqa: BLE001 - never let translation break a fetch
        _LOGGER.warning("Failed to load Bring locale %s: %s", locale, err)

    _section_cache[locale] = data
    return data


def translate_section(category: str, sections: dict[str, str]) -> str:
    """Localize a Bring section id using a loaded translation map.

    ``category`` is the canonical (German) ``userSectionId`` returned by the
    API; ``sections`` comes from :func:`load_section_translations`. Unknown
    sections fall back to the raw key.
    """
    if not category:
        return ""
    return sections.get(category, category)


def get_image_url(item_name: str) -> str | None:
    """Get CDN image URL for an item.

    The CDN is keyed by Bring's canonical (German) item id, so callers
    should pass the ``userIconItemId`` rather than the localized name.
    """
    if not item_name:
        return None

    # The CDN uses lowercase names
    clean_name = item_name.lower()
    return f"{BRING_CDN_BASE}{clean_name}.png"


def get_icon_for_item(
    item_name: str,
    icon_id: str | None = None,
    category: str | None = None,
) -> str:
    """Get an appropriate emoji icon for an item (fallback when CDN fails).

    ``category`` is expected to be the canonical (German) section id, which is
    what ``CATEGORY_ICONS`` keys on.
    """
    # Try the item name (the localized name shown to the user)
    if item_name in ITEM_ICONS:
        return ITEM_ICONS[item_name]

    # Try the canonical (German) icon id, which is what the icon dicts key on
    if icon_id and icon_id in ITEM_ICONS:
        return ITEM_ICONS[icon_id]

    # Fall back to a category icon (CATEGORY_ICONS keys on the German section id)
    if category and category in CATEGORY_ICONS:
        return CATEGORY_ICONS[category]

    return DEFAULT_ICON

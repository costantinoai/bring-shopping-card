"""Helper functions for the Bring! Shopping Card integration."""
from __future__ import annotations

import logging

from .const import BRING_CDN_BASE
from .translations_data import (
    CATEGORY_ICONS,
    CATEGORY_TRANSLATIONS,
    DEFAULT_ICON,
    ITEM_ICONS,
)

_LOGGER = logging.getLogger(__name__)


def translate_category(category: str) -> str:
    """Map a Bring section id to a display label.

    Bring's API always returns section ids as canonical German keys
    (e.g. "Fleisch & Fisch"), regardless of the list's article language.
    We map them to English labels for the card's (English) UI; unknown
    sections are returned unchanged.
    """
    if not category:
        return ""
    return CATEGORY_TRANSLATIONS.get(category, category)


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
    """Get an appropriate emoji icon for an item (fallback when CDN fails)."""
    # Try the item name (the localized name shown to the user)
    if item_name in ITEM_ICONS:
        return ITEM_ICONS[item_name]

    # Try the canonical (German) icon id, which is what the icon dicts key on
    if icon_id and icon_id in ITEM_ICONS:
        return ITEM_ICONS[icon_id]

    # Fall back to a category icon
    if category:
        if category in CATEGORY_ICONS:
            return CATEGORY_ICONS[category]
        translated_cat = translate_category(category)
        if translated_cat in CATEGORY_ICONS:
            return CATEGORY_ICONS[translated_cat]

    return DEFAULT_ICON

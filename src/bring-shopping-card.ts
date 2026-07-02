/**
 * Bring! Shopping Card for Home Assistant
 * A beautiful, modern shopping list card
 */

import { LitElement, html, css, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cardStyles } from './styles';
import type {
  BringCardConfig,
  BringItem,
  BringList,
  CardSize,
  HomeAssistant,
  SortMode,
  WsItemsResponse,
  WsListsResponse,
} from './types';

// Storage keys
const STORAGE_PREFIX = 'bring-shopping-card';
const getStorageKey = (key: string, cardId?: string) =>
  `${STORAGE_PREFIX}-${key}${cardId ? `-${cardId}` : ''}`;

// Config Editor Element
@customElement('bring-shopping-card-editor')
export class BringShoppingCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: BringCardConfig;

  static styles = css`
    .editor {
      padding: 16px;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.12));
    }
    .row:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: 500;
    }
    .description {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 4px;
    }
    ha-switch {
      --mdc-theme-secondary: var(--primary-color);
    }
    input[type="number"] {
      width: 60px;
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
  `;

  setConfig(config: BringCardConfig): void {
    this._config = config;
  }

  private _valueChanged(key: string, value: unknown): void {
    if (!this._config) return;

    const newConfig = { ...this._config, [key]: value };
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html``;
    }

    return html`
      <div class="editor">
        <div class="row">
          <div>
            <div class="label">Show Quick Add</div>
            <div class="description">Display recently purchased items for quick re-adding</div>
          </div>
          <ha-switch
            .checked=${this._config.show_recently ?? false}
            @change=${(e: Event) => this._valueChanged('show_recently', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>

        <div class="row">
          <div>
            <div class="label">Show All Items</div>
            <div class="description">Display all available items grouped by category</div>
          </div>
          <ha-switch
            .checked=${this._config.show_available ?? false}
            @change=${(e: Event) => this._valueChanged('show_available', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>

        <div class="row">
          <div>
            <div class="label">Max Quick Add Items</div>
            <div class="description">Maximum items to show in Quick Add section</div>
          </div>
          <input
            type="number"
            min="4"
            max="24"
            .value=${String(this._config.max_quick_items ?? 12)}
            @change=${(e: Event) => this._valueChanged('max_quick_items', parseInt((e.target as HTMLInputElement).value) || 12)}
          />
        </div>

        <div class="row">
          <div>
            <div class="label">Card Size</div>
            <div class="description">Size of the product item cards</div>
          </div>
          <select
            @change=${(e: Event) => this._valueChanged('card_size', (e.target as HTMLSelectElement).value)}
            style="padding: 8px; border: 1px solid var(--divider-color); border-radius: 4px; background: var(--card-background-color); color: var(--primary-text-color);"
          >
            <option value="small" ?selected=${(this._config.card_size ?? 'medium') === 'small'}>Small</option>
            <option value="medium" ?selected=${(this._config.card_size ?? 'medium') === 'medium'}>Medium</option>
            <option value="large" ?selected=${(this._config.card_size ?? 'medium') === 'large'}>Large</option>
          </select>
        </div>
      </div>
    `;
  }
}

@customElement('bring-shopping-card')
export class BringShoppingCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: BringCardConfig;

  @state() private _lists: BringList[] = [];
  @state() private _selectedListUuid: string | null = null;
  @state() private _items: BringItem[] = [];
  @state() private _recentItems: BringItem[] = [];
  @state() private _availableItems: BringItem[] = [];
  @state() private _sortBy: SortMode = 'manual';
  @state() private _customOrder: string[] = [];
  @state() private _searchQuery = '';
  @state() private _selectedSuggestion = -1;
  @state() private _loading = true;
  @state() private _error: string | null = null;
  @state() private _editingItem: BringItem | null = null;
  @state() private _showSortMenu = false;
  @state() private _showListDropdown = false;
  @state() private _showSuggestions = false;

  private _failedImages = new Set<string>();
  private _refreshInterval?: number;
  // Stable per-card key for persisting state (selected list, sort, order).
  // Must NOT be random, or nothing survives a page reload. Set from config so
  // multiple cards on one dashboard can be disambiguated via `card_id`.
  private _cardKey = 'default';
  private _draggedItem: BringItem | null = null;

  public setConfig(config: BringCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this.config = {
      show_recently: false,
      show_available: false,
      max_quick_items: 12,
      sort_default: 'manual',
      card_size: 'medium',
      ...config,
    };
    this._cardKey = this.config.card_id || 'default';
    this._sortBy = this.config.sort_default || 'manual';
    // Set data attribute for CSS size variants
    this.dataset.size = this.config.card_size || 'medium';
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('bring-shopping-card-editor');
  }

  public static getStubConfig(): BringCardConfig {
    return {
      type: 'custom:bring-shopping-card',
    };
  }

  public getCardSize(): number {
    return 5;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._loadSavedState();
    this._fetchLists();
    this._startAutoRefresh();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopAutoRefresh();
  }

  private _loadSavedState(): void {
    try {
      const savedList = localStorage.getItem(getStorageKey('list', this._cardKey));
      if (savedList) this._selectedListUuid = savedList;

      const savedSort = localStorage.getItem(getStorageKey('sort', this._cardKey));
      if (savedSort) this._sortBy = savedSort as SortMode;

      const savedOrder = localStorage.getItem(getStorageKey('order', this._cardKey));
      if (savedOrder) this._customOrder = JSON.parse(savedOrder);
    } catch (e) {
      console.error('Failed to load saved state:', e);
    }
  }

  private _saveState(): void {
    try {
      if (this._selectedListUuid) {
        localStorage.setItem(getStorageKey('list', this._cardKey), this._selectedListUuid);
      }
      localStorage.setItem(getStorageKey('sort', this._cardKey), this._sortBy);
      localStorage.setItem(getStorageKey('order', this._cardKey), JSON.stringify(this._customOrder));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  private async _fetchLists(): Promise<void> {
    try {
      const response = await this.hass.callWS<WsListsResponse>({
        type: 'bring_shopping/get_lists',
      });
      this._lists = response.lists;

      if (this._lists.length > 0) {
        if (!this._selectedListUuid || !this._lists.find(l => l.uuid === this._selectedListUuid)) {
          this._selectedListUuid = this._lists[0].uuid;
        }
        await this._fetchItems();
      } else {
        this._loading = false;
        this._error = 'No shopping lists found';
      }
    } catch (err) {
      console.error('Failed to fetch lists:', err);
      this._loading = false;
      this._error = 'Failed to connect to Bring! integration';
    }
  }

  private async _fetchItems(): Promise<void> {
    if (!this._selectedListUuid) return;

    try {
      const response = await this.hass.callWS<WsItemsResponse>({
        type: 'bring_shopping/get_items',
        list_uuid: this._selectedListUuid,
      });

      this._items = response.purchase;
      this._recentItems = response.recently;
      this._availableItems = response.available;
      this._loading = false;
      this._error = null;
    } catch (err) {
      console.error('Failed to fetch items:', err);
      this._loading = false;
      this._error = 'Failed to load shopping list';
    }
  }

  private _startAutoRefresh(): void {
    this._refreshInterval = window.setInterval(() => {
      if (!document.hidden) {
        this._fetchItems();
      }
    }, 60000);
  }

  private _stopAutoRefresh(): void {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
    }
  }

  private _getSortedItems(): BringItem[] {
    const items = [...this._items];

    switch (this._sortBy) {
      case 'manual':
        const orderMap: Record<string, number> = {};
        this._customOrder.forEach((name, idx) => (orderMap[name] = idx));
        return items.sort((a, b) => {
          const orderA = orderMap[a.originalName] ?? 999;
          const orderB = orderMap[b.originalName] ?? 999;
          return orderA - orderB;
        });
      case 'alpha':
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case 'category':
        return items.sort((a, b) => {
          const catA = a.category || 'ZZZ';
          const catB = b.category || 'ZZZ';
          if (catA !== catB) return catA.localeCompare(catB);
          return a.name.localeCompare(b.name);
        });
      case 'recent':
      default:
        return items;
    }
  }

  private _getFilteredSuggestions(): BringItem[] {
    if (!this._searchQuery.trim()) return [];

    const q = this._searchQuery.toLowerCase();
    const matches = this._availableItems.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        item.originalName.toLowerCase().includes(q)
    );

    const recentMatches = this._recentItems.filter(
      item =>
        (item.name.toLowerCase().includes(q) ||
          item.originalName.toLowerCase().includes(q)) &&
        !this._items.some(p => p.originalName === item.originalName)
    );

    const combined = [...matches];
    recentMatches.forEach(r => {
      if (!combined.some(c => c.originalName === r.originalName)) {
        combined.push(r);
      }
    });

    return combined.slice(0, 8);
  }

  private async _addItem(name: string, originalName?: string, specification = ''): Promise<void> {
    if (!name.trim() || !this._selectedListUuid) return;

    try {
      await this.hass.callWS({
        type: 'bring_shopping/add_item',
        list_uuid: this._selectedListUuid,
        item_name: name.trim(),
        original_name: originalName || name.trim(),
        specification,
      });

      this._showToast(`Added ${name}`, 'success');
      await this._fetchItems();
    } catch (err) {
      console.error('Failed to add item:', err);
      this._showToast('Failed to add item', 'error');
    }
  }

  private async _completeItem(item: BringItem, element: HTMLElement): Promise<void> {
    if (!this._selectedListUuid) return;

    element.classList.add('completing');

    try {
      await this.hass.callWS({
        type: 'bring_shopping/complete_item',
        list_uuid: this._selectedListUuid,
        original_name: item.originalName,
      });

      setTimeout(() => {
        this._showToast(`Done: ${item.name}`, 'success');
        this._fetchItems();
      }, 350);
    } catch (err) {
      console.error('Failed to complete item:', err);
      element.classList.remove('completing');
      this._showToast('Failed to complete item', 'error');
    }
  }

  private async _updateItemSpec(item: BringItem, newSpec: string): Promise<void> {
    if (!this._selectedListUuid) return;

    try {
      await this.hass.callWS({
        type: 'bring_shopping/update_item',
        list_uuid: this._selectedListUuid,
        original_name: item.originalName,
        specification: newSpec,
      });

      this._showToast('Updated', 'success');
      await this._fetchItems();
    } catch (err) {
      console.error('Failed to update item:', err);
      this._showToast('Failed to update', 'error');
    }
  }

  private _showToast(message: string, type: 'success' | 'error' = 'success'): void {
    const container = this.shadowRoot?.querySelector('.toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  private _handleInputKeydown(e: KeyboardEvent): void {
    const filtered = this._getFilteredSuggestions();
    const input = e.target as HTMLInputElement;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._selectedSuggestion = Math.min(this._selectedSuggestion + 1, filtered.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._selectedSuggestion = Math.max(this._selectedSuggestion - 1, -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this._selectedSuggestion >= 0 && filtered[this._selectedSuggestion]) {
        const item = filtered[this._selectedSuggestion];
        this._addItem(item.name, item.originalName);
        input.value = '';
        this._searchQuery = '';
        this._showSuggestions = false;
      } else if (input.value.trim()) {
        this._addItem(input.value);
        input.value = '';
        this._searchQuery = '';
        this._showSuggestions = false;
      }
    } else if (e.key === 'Escape') {
      this._showSuggestions = false;
    }
  }

  private _handleInputChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this._searchQuery = input.value;
    this._showSuggestions = input.value.length > 0;
    this._selectedSuggestion = -1;
  }

  private _handleSuggestionClick(item: BringItem): void {
    this._addItem(item.name, item.originalName);
    const input = this.shadowRoot?.querySelector('.add-input') as HTMLInputElement;
    if (input) input.value = '';
    this._searchQuery = '';
    this._showSuggestions = false;
  }

  private _handleDragStart(e: DragEvent, item: BringItem): void {
    this._draggedItem = item;
    (e.target as HTMLElement).classList.add('dragging');
    e.dataTransfer!.effectAllowed = 'move';
  }

  private _handleDragEnd(e: DragEvent): void {
    (e.target as HTMLElement).classList.remove('dragging');
    this.shadowRoot?.querySelectorAll('.card.drag-over').forEach(el => {
      el.classList.remove('drag-over');
    });
    this._draggedItem = null;
  }

  private _handleDragOver(e: DragEvent): void {
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
  }

  private _handleDragEnter(e: DragEvent, element: HTMLElement): void {
    element.classList.add('drag-over');
  }

  private _handleDragLeave(e: DragEvent, element: HTMLElement): void {
    element.classList.remove('drag-over');
  }

  private _handleDrop(e: DragEvent, targetItem: BringItem, element: HTMLElement): void {
    e.preventDefault();
    element.classList.remove('drag-over');

    if (!this._draggedItem || this._draggedItem.originalName === targetItem.originalName) return;

    // Reorder in customOrder
    const draggedIdx = this._customOrder.indexOf(this._draggedItem.originalName);
    if (draggedIdx === -1) {
      this._customOrder.push(this._draggedItem.originalName);
    }

    this._customOrder = this._customOrder.filter(n => n !== this._draggedItem!.originalName);
    const newTargetIdx = this._customOrder.indexOf(targetItem.originalName);
    this._customOrder.splice(newTargetIdx, 0, this._draggedItem.originalName);

    if (this._sortBy !== 'manual') {
      this._sortBy = 'manual';
    }

    this._saveState();
    this.requestUpdate();
  }

  private _selectList(list: BringList): void {
    this._selectedListUuid = list.uuid;
    this._showListDropdown = false;
    this._saveState();
    this._fetchItems();
  }

  private _renderImage(item: BringItem, size: 'large' | 'small'): TemplateResult {
    const imgClass = size === 'large' ? 'card-img' : 'quick-card-img';
    const iconClass = size === 'large' ? 'card-icon' : 'quick-card-icon';

    if (item.imageUrl && !this._failedImages.has(item.imageUrl)) {
      return html`
        <img
          class="${imgClass}"
          src="${item.imageUrl}"
          alt="${item.name}"
          @error=${(e: Event) => {
            (e.target as HTMLElement).style.display = 'none';
            (e.target as HTMLElement).nextElementSibling?.removeAttribute('style');
            this._failedImages.add(item.imageUrl!);
          }}
        />
        <span class="${iconClass}" style="display:none">${item.icon || '🛒'}</span>
      `;
    }
    return html`<span class="${iconClass}">${item.icon || '🛒'}</span>`;
  }

  private _renderHeader(): TemplateResult {
    const selectedList = this._lists.find(l => l.uuid === this._selectedListUuid);

    return html`
      <header class="header">
        <div class="logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
          <div class="logo-text">Bring<span class="accent">!</span> <span class="subtitle">Shopping Card</span></div>
        </div>
        <div class="header-actions">
          ${this._lists.length > 1
            ? html`
                <div class="list-selector-wrapper">
                  <button
                    class="header-btn list-btn ${this._showListDropdown ? 'open' : ''}"
                    @click=${(e: Event) => {
                      e.stopPropagation();
                      e.preventDefault();
                      this._showListDropdown = !this._showListDropdown;
                      this._showSortMenu = false;
                    }}
                    title="Select List"
                  >
                    <span class="list-btn-text">${selectedList?.name || 'List'}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  ${this._showListDropdown
                    ? html`
                        <div class="list-dropdown open">
                          ${this._lists.map(
                            list => html`
                              <div
                                class="list-option ${list.uuid === this._selectedListUuid ? 'active' : ''}"
                                @mousedown=${(e: Event) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  this._selectList(list);
                                }}
                              >
                                ${list.name}
                              </div>
                            `
                          )}
                        </div>
                      `
                    : nothing}
                </div>
              `
            : nothing}
          <div class="sort-dropdown">
            <button
              class="header-btn"
              @click=${(e: Event) => {
                e.stopPropagation();
                e.preventDefault();
                this._showSortMenu = !this._showSortMenu;
                this._showListDropdown = false;
              }}
              title="Sort"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="12" x2="14" y2="12"></line>
                <line x1="4" y1="18" x2="9" y2="18"></line>
              </svg>
            </button>
            ${this._showSortMenu
              ? html`
                  <div class="sort-menu open">
                    ${(['manual', 'alpha', 'category', 'recent'] as SortMode[]).map(
                      mode => html`
                        <div
                          class="sort-option ${this._sortBy === mode ? 'active' : ''}"
                          @mousedown=${(e: Event) => {
                            e.stopPropagation();
                            e.preventDefault();
                            this._sortBy = mode;
                            this._showSortMenu = false;
                            this._saveState();
                          }}
                        >
                          ${{
                            manual: 'Manual Order',
                            alpha: 'A-Z',
                            category: 'By Category',
                            recent: 'Recently Added',
                          }[mode]}
                        </div>
                      `
                    )}
                  </div>
                `
              : nothing}
          </div>
          <button
            class="header-btn"
            @click=${async (e: Event) => {
              e.stopPropagation();
              const btn = e.currentTarget as HTMLElement;
              btn.classList.add('spinning');
              await this._fetchItems();
              btn.classList.remove('spinning');
            }}
            title="Refresh"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
            </svg>
          </button>
        </div>
      </header>
    `;
  }

  private _renderAddSection(): TemplateResult {
    const suggestions = this._getFilteredSuggestions();

    return html`
      <div class="add-section">
        <div class="add-input-wrapper">
          <input
            type="text"
            class="add-input"
            placeholder="Add item..."
            autocomplete="off"
            @input=${this._handleInputChange}
            @keydown=${this._handleInputKeydown}
            @blur=${() => setTimeout(() => (this._showSuggestions = false), 150)}
          />
          <div class="search-suggestions ${this._showSuggestions && suggestions.length ? 'open' : ''}">
            ${suggestions.map(
              (item, i) => html`
                <div
                  class="suggestion-item ${i === this._selectedSuggestion ? 'selected' : ''}"
                  @click=${() => this._handleSuggestionClick(item)}
                >
                  ${item.imageUrl && !this._failedImages.has(item.imageUrl)
                    ? html`
                        <img
                          class="suggestion-img"
                          src="${item.imageUrl}"
                          alt=""
                          @error=${(e: Event) => {
                            (e.target as HTMLElement).style.display = 'none';
                            (e.target as HTMLElement).nextElementSibling?.removeAttribute('style');
                            this._failedImages.add(item.imageUrl!);
                          }}
                        />
                        <span class="suggestion-icon" style="display:none">${item.icon}</span>
                      `
                    : html`<span class="suggestion-icon">${item.icon}</span>`}
                  <span class="suggestion-text">${item.name}</span>
                  ${item.category ? html`<span class="suggestion-category">${item.category}</span>` : nothing}
                </div>
              `
            )}
          </div>
        </div>
        <button
          class="add-btn"
          @click=${() => {
            const input = this.shadowRoot?.querySelector('.add-input') as HTMLInputElement;
            if (input?.value.trim()) {
              this._addItem(input.value);
              input.value = '';
              this._searchQuery = '';
            }
          }}
        >
          Add
        </button>
      </div>
    `;
  }

  private _renderPurchaseItems(): TemplateResult {
    const sortedItems = this._getSortedItems();

    return html`
      <section class="section">
        <div class="section-header">
          <span class="section-title">To Buy</span>
          <span class="section-count">${this._items.length}</span>
        </div>
        ${this._items.length === 0
          ? html`
              <div class="empty-state">
                <div class="empty-icon">✨</div>
                <div class="empty-text">List is empty!</div>
                <div class="empty-sub">Add items above or tap below</div>
              </div>
            `
          : html`
              <div class="cards-grid">
                ${sortedItems.map(
                  item => html`
                    <div
                      class="card"
                      draggable="true"
                      @dragstart=${(e: DragEvent) => this._handleDragStart(e, item)}
                      @dragend=${this._handleDragEnd}
                      @dragover=${this._handleDragOver}
                      @dragenter=${(e: DragEvent) => this._handleDragEnter(e, e.currentTarget as HTMLElement)}
                      @dragleave=${(e: DragEvent) => this._handleDragLeave(e, e.currentTarget as HTMLElement)}
                      @drop=${(e: DragEvent) => this._handleDrop(e, item, e.currentTarget as HTMLElement)}
                    >
                      <div class="card-drag">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="9" cy="5" r="1.5"></circle>
                          <circle cx="9" cy="12" r="1.5"></circle>
                          <circle cx="9" cy="19" r="1.5"></circle>
                          <circle cx="15" cy="5" r="1.5"></circle>
                          <circle cx="15" cy="12" r="1.5"></circle>
                          <circle cx="15" cy="19" r="1.5"></circle>
                        </svg>
                      </div>
                      <div
                        class="card-check"
                        @click=${(e: Event) => {
                          e.stopPropagation();
                          const check = e.currentTarget as HTMLElement;
                          check.classList.add('checked');
                          this._completeItem(item, check.closest('.card') as HTMLElement);
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      ${this._renderImage(item, 'large')}
                      <span class="card-name">${item.name}</span>
                      <span
                        class="card-spec ${item.specification ? '' : 'empty'}"
                        @click=${(e: Event) => {
                          e.stopPropagation();
                          this._editingItem = item;
                        }}
                      >
                        ${item.specification || '+ note'}
                      </span>
                      ${item.category ? html`<span class="card-category">${item.category}</span>` : nothing}
                    </div>
                  `
                )}
              </div>
            `}
      </section>
    `;
  }

  private _renderQuickAdd(): TemplateResult | typeof nothing {
    if (!this.config.show_recently || this._recentItems.length === 0) return nothing;

    const quickItems = this._recentItems.slice(0, this.config.max_quick_items || 12);

    return html`
      <section class="section">
        <div class="section-header">
          <span class="section-title">Quick Add</span>
        </div>
        <div class="quick-grid">
          ${quickItems.map(
            item => html`
              <div
                class="quick-card"
                @click=${(e: Event) => {
                  const el = e.currentTarget as HTMLElement;
                  el.classList.add('adding');
                  setTimeout(() => el.classList.remove('adding'), 300);
                  this._addItem(item.name, item.originalName, item.specification);
                }}
              >
                ${this._renderImage(item, 'small')}
                <span class="quick-card-name">${item.name}</span>
              </div>
            `
          )}
        </div>
      </section>
    `;
  }

  private _renderAvailableItems(): TemplateResult | typeof nothing {
    if (!this.config.show_available || this._availableItems.length === 0) return nothing;

    // Group by category
    const categories: Record<string, BringItem[]> = {};
    this._availableItems.forEach(item => {
      const cat = item.category || 'Other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(item);
    });
    const sortedCategories = Object.keys(categories).sort();

    return html`
      <div class="divider"></div>
      <section class="section">
        <div class="section-header">
          <span class="section-title">All Items</span>
          <span class="section-count">${this._availableItems.length}</span>
        </div>
        ${sortedCategories.map(
          cat => html`
            <div
              class="collapsible-header"
              @click=${(e: Event) => {
                const header = e.currentTarget as HTMLElement;
                header.classList.toggle('open');
                header.nextElementSibling?.classList.toggle('open');
              }}
            >
              <div class="collapsible-left">
                <span class="section-title" style="margin:0">${cat}</span>
                <span class="section-count">${categories[cat].length}</span>
              </div>
              <svg class="collapsible-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div class="collapsible-content">
              <div class="quick-grid" style="margin-bottom: 12px;">
                ${categories[cat].map(
                  item => html`
                    <div
                      class="quick-card"
                      @click=${(e: Event) => {
                        const el = e.currentTarget as HTMLElement;
                        el.classList.add('adding');
                        setTimeout(() => el.classList.remove('adding'), 300);
                        this._addItem(item.name, item.originalName);
                      }}
                    >
                      ${this._renderImage(item, 'small')}
                      <span class="quick-card-name">${item.name}</span>
                    </div>
                  `
                )}
              </div>
            </div>
          `
        )}
      </section>
    `;
  }

  private _renderEditModal(): TemplateResult | typeof nothing {
    if (!this._editingItem) return nothing;

    return html`
      <div
        class="modal-overlay open"
        @click=${(e: Event) => {
          if (e.target === e.currentTarget) this._editingItem = null;
        }}
      >
        <div class="modal">
          <div class="modal-title">Edit: ${this._editingItem.name}</div>
          <input
            type="text"
            class="modal-input"
            placeholder="e.g., 2 lbs, organic"
            .value=${this._editingItem.specification || ''}
            @keypress=${(e: KeyboardEvent) => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                this._updateItemSpec(this._editingItem!, input.value.trim());
                this._editingItem = null;
              }
            }}
          />
          <div class="modal-actions">
            <button class="modal-btn cancel" @click=${() => (this._editingItem = null)}>Cancel</button>
            <button
              class="modal-btn save"
              @click=${() => {
                const input = this.shadowRoot?.querySelector('.modal-input') as HTMLInputElement;
                this._updateItemSpec(this._editingItem!, input.value.trim());
                this._editingItem = null;
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    `;
  }

  protected render(): TemplateResult {
    // Close dropdowns when clicking anywhere on card
    const closeDropdowns = (e: Event) => {
      // Don't close if clicking on dropdown elements
      const target = e.target as HTMLElement;
      if (target.closest('.list-selector-wrapper') || target.closest('.sort-dropdown')) {
        return;
      }
      this._showSortMenu = false;
      this._showListDropdown = false;
    };

    if (this._loading) {
      return html`
        <ha-card @click=${closeDropdowns}>
          <div class="container">
            ${this._renderHeader()}
            <div class="loading">
              <div class="loading-spinner"></div>
            </div>
          </div>
        </ha-card>
      `;
    }

    if (this._error) {
      return html`
        <ha-card @click=${closeDropdowns}>
          <div class="container">
            ${this._renderHeader()}
            <div class="error-state">
              <div class="error-icon">⚠️</div>
              <div class="error-text">${this._error}</div>
            </div>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card @click=${closeDropdowns}>
        <div class="container">
          ${this._renderHeader()}
          ${this._renderAddSection()}
          ${this._renderPurchaseItems()}
          ${this._renderQuickAdd()}
          ${this._renderAvailableItems()}
        </div>
        <div class="toast-container"></div>
        ${this._renderEditModal()}
      </ha-card>
    `;
  }
}

// Register with Home Assistant
declare global {
  interface HTMLElementTagNameMap {
    'bring-shopping-card': BringShoppingCard;
    'bring-shopping-card-editor': BringShoppingCardEditor;
  }
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'bring-shopping-card',
  name: 'Bring! Shopping Card',
  description: 'A beautiful, modern shopping list card for Bring!',
  preview: true,
});

/**
 * CSS Styles for the Bring! Shopping Card
 * Ported from widget.html with Home Assistant theme integration
 */

import { css } from 'lit';

export const cardStyles = css`
  :host {
    /* HA theme variables with widget defaults as fallback */
    --bring-bg-primary: var(--ha-card-background, var(--card-background-color, #0f1419));
    --bring-bg-secondary: var(--secondary-background-color, #1a2027);
    --bring-bg-tertiary: var(--primary-background-color, #242d38);
    --bring-bg-hover: var(--state-icon-hover-background-color, #2d3848);
    --bring-bg-card: var(--ha-card-background, #1e252d);
    --bring-accent: var(--primary-color, #4fd1c5);
    --bring-accent-dim: rgba(79, 209, 197, 0.12);
    --bring-accent-glow: rgba(79, 209, 197, 0.35);
    --bring-text-primary: var(--primary-text-color, #e8edf4);
    --bring-text-secondary: var(--secondary-text-color, #8b99a8);
    --bring-text-muted: var(--disabled-text-color, #5a6878);
    --bring-success: var(--success-color, #48bb78);
    --bring-error: var(--error-color, #fc8181);
    --bring-warning: var(--warning-color, #f6ad55);
    --bring-border: var(--divider-color, rgba(255, 255, 255, 0.06));
    --bring-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    --bring-radius: var(--ha-card-border-radius, 14px);
    --bring-radius-sm: 10px;

    display: block;
    font-family: var(--paper-font-body1_-_font-family, 'Roboto', sans-serif);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    padding: 16px;
    background: var(--bring-bg-primary);
    border-radius: var(--bring-radius);
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    gap: 12px;
    container-type: inline-size;
  }

  /* On narrow cards, drop the "Shopping Card" subtitle so the brand and the
     action buttons all stay visible instead of truncating. */
  @container (max-width: 360px) {
    .logo-text .subtitle {
      display: none;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .logo-icon svg {
    width: 100%;
    height: 100%;
    fill: var(--bring-accent);
    filter: drop-shadow(0 2px 8px var(--bring-accent-glow));
  }

  .logo-text {
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--bring-text-primary);
  }

  .logo-text .accent {
    color: var(--bring-accent);
  }

  .logo-text .subtitle {
    color: #f6ad55;
    font-weight: 600;
  }

  .header-actions {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-shrink: 0;
  }

  .header-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: var(--bring-bg-secondary);
    border-radius: var(--bring-radius-sm);
    color: var(--bring-text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    border: 1px solid var(--bring-border);
    flex-shrink: 0;
  }

  .header-btn:hover {
    background: var(--bring-bg-tertiary);
    color: var(--bring-accent);
  }

  .header-btn.spinning svg {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* List Selector */
  .list-selector-wrapper {
    position: relative;
  }

  .list-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    width: auto;
    padding: 8px 12px;
  }

  .list-btn-text {
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }

  .list-btn svg {
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  .list-btn.open svg {
    transform: rotate(180deg);
  }

  .list-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: var(--bring-bg-secondary);
    border: 1px solid var(--bring-border);
    border-radius: var(--bring-radius-sm);
    padding: 6px;
    min-width: 150px;
    z-index: 100;
    box-shadow: var(--bring-shadow);
  }

  .list-option {
    padding: 10px 14px;
    font-size: 13px;
    color: var(--bring-text-secondary);
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.15s ease;
  }

  .list-option:hover {
    background: var(--bring-bg-hover);
    color: var(--bring-text-primary);
  }

  .list-option.active {
    color: var(--bring-accent);
    background: var(--bring-accent-dim);
  }

  /* Sort Dropdown */
  .sort-dropdown {
    position: relative;
  }

  .sort-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: var(--bring-bg-secondary);
    border: 1px solid var(--bring-border);
    border-radius: var(--bring-radius-sm);
    padding: 6px;
    min-width: 160px;
    z-index: 100;
    display: none;
    box-shadow: var(--bring-shadow);
  }

  .sort-menu.open {
    display: block;
  }

  .sort-option {
    padding: 10px 14px;
    font-size: 13px;
    color: var(--bring-text-secondary);
    cursor: pointer;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.15s ease;
  }

  .sort-option:hover {
    background: var(--bring-bg-hover);
    color: var(--bring-text-primary);
  }

  .sort-option.active {
    color: var(--bring-accent);
    background: var(--bring-accent-dim);
  }

  /* Add Item Section */
  .add-section {
    background: var(--bring-bg-secondary);
    border-radius: var(--bring-radius);
    padding: 4px;
    margin-bottom: 20px;
    display: flex;
    gap: 4px;
    border: 1px solid var(--bring-border);
    position: relative;
  }

  .add-input-wrapper {
    flex: 1;
    min-width: 0;
    position: relative;
  }

  .add-input {
    width: 100%;
    background: transparent;
    border: none;
    padding: 12px 16px;
    font-size: 14px;
    color: var(--bring-text-primary);
    font-family: inherit;
    outline: none;
  }

  .add-input::placeholder {
    color: var(--bring-text-muted);
  }

  /* Search Suggestions */
  .search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bring-bg-secondary);
    border: 1px solid var(--bring-border);
    border-radius: var(--bring-radius-sm);
    margin-top: 4px;
    max-height: 240px;
    overflow-y: auto;
    z-index: 200;
    display: none;
    box-shadow: var(--bring-shadow);
  }

  .search-suggestions.open {
    display: block;
  }

  .suggestion-item {
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .suggestion-item:hover,
  .suggestion-item.selected {
    background: var(--bring-bg-hover);
  }

  .suggestion-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    border-radius: 4px;
  }

  .suggestion-icon {
    font-size: 20px;
    width: 28px;
    text-align: center;
  }

  .suggestion-text {
    flex: 1;
    font-size: 14px;
    color: var(--bring-text-primary);
  }

  .suggestion-category {
    font-size: 11px;
    color: var(--bring-text-muted);
  }

  .add-btn {
    background: var(--bring-accent);
    color: var(--bring-bg-primary);
    border: none;
    padding: 12px 24px;
    border-radius: var(--bring-radius-sm);
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    flex-shrink: 0;
  }

  .add-btn:hover {
    filter: brightness(1.1);
    box-shadow: 0 4px 16px var(--bring-accent-glow);
  }

  .add-btn:active {
    transform: scale(0.97);
  }

  /* Section */
  .section {
    margin-bottom: 24px;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 0 2px;
    gap: 8px;
  }

  .section-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--bring-text-secondary);
  }

  .section-count {
    font-size: 10px;
    font-weight: 600;
    color: var(--bring-accent);
    background: var(--bring-accent-dim);
    padding: 2px 8px;
    border-radius: 10px;
    flex-shrink: 0;
  }

  /* Cards Grid - sizes controlled by CSS vars */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--bring-card-width, 70px), 1fr));
    gap: 6px;
  }

  .card {
    background: var(--bring-bg-card);
    border-radius: var(--bring-radius-sm);
    padding: var(--bring-card-padding, 8px 6px);
    border: 1px solid var(--bring-border);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-height: var(--bring-card-height, 70px);
  }

  /* Size variants */
  :host([data-size="small"]) .cards-grid { grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 4px; }
  :host([data-size="small"]) .card { padding: 6px 4px; min-height: 60px; }
  :host([data-size="small"]) .card-img { width: 24px; height: 24px; margin-bottom: 4px; }
  :host([data-size="small"]) .card-icon { font-size: 18px; margin-bottom: 4px; }
  :host([data-size="small"]) .card-name { font-size: 9px; }
  :host([data-size="small"]) .card-check { width: 16px; height: 16px; top: 2px; right: 2px; }
  :host([data-size="small"]) .card-check svg { width: 10px; height: 10px; }
  :host([data-size="small"]) .card-drag { display: none; }
  :host([data-size="small"]) .card-spec { display: none; }

  :host([data-size="medium"]) .cards-grid { grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); gap: 6px; }
  :host([data-size="medium"]) .card { padding: 8px 6px; min-height: 70px; }
  :host([data-size="medium"]) .card-img { width: 28px; height: 28px; margin-bottom: 5px; }
  :host([data-size="medium"]) .card-icon { font-size: 22px; margin-bottom: 5px; }
  :host([data-size="medium"]) .card-name { font-size: 10px; }

  :host([data-size="large"]) .cards-grid { grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px; }
  :host([data-size="large"]) .card { padding: 12px 10px; min-height: 95px; }
  :host([data-size="large"]) .card-img { width: 40px; height: 40px; margin-bottom: 8px; }
  :host([data-size="large"]) .card-icon { font-size: 32px; margin-bottom: 8px; }
  :host([data-size="large"]) .card-name { font-size: 12px; }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: transparent;
    transition: background 0.2s ease;
  }

  .card:hover {
    background: var(--bring-bg-hover);
    border-color: var(--bring-accent);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .card:hover::before {
    background: var(--bring-accent);
  }

  .card:active {
    transform: translateY(0) scale(0.98);
  }

  .card.completing {
    animation: cardComplete 0.4s ease-out forwards;
  }

  .card.dragging {
    opacity: 0.5;
    transform: scale(0.95);
  }

  .card.drag-over {
    border-color: var(--bring-accent);
    background: var(--bring-accent-dim);
  }

  @keyframes cardComplete {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.95); }
    100% { opacity: 0; transform: scale(0.8); }
  }

  .card-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    margin-bottom: 5px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  .card-icon {
    font-size: 22px;
    margin-bottom: 5px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  .card-name {
    font-weight: 600;
    font-size: 10px;
    color: var(--bring-text-primary);
    line-height: 1.2;
    max-height: 2.4em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }

  .card-spec {
    font-size: 10px;
    color: var(--bring-accent);
    margin-top: 3px;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    transition: background 0.15s ease;
  }

  .card-spec:hover {
    background: var(--bring-accent-dim);
  }

  .card-spec.empty {
    color: var(--bring-text-muted);
    opacity: 0;
  }

  .card:hover .card-spec.empty {
    opacity: 1;
  }

  .card-category {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 8px;
    color: var(--bring-text-muted);
    background: var(--bring-bg-tertiary);
    padding: 2px 6px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card:hover .card-category {
    opacity: 1;
  }

  .card-check {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    border: 2px solid var(--bring-text-muted);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    background: var(--bring-bg-secondary);
  }

  .card:hover .card-check {
    border-color: var(--bring-accent);
    background: var(--bring-accent-dim);
  }

  .card-check.checked {
    background: var(--bring-accent);
    border-color: var(--bring-accent);
  }

  .card-check svg {
    width: 12px;
    height: 12px;
    color: var(--bring-bg-primary);
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s ease;
  }

  .card-check.checked svg {
    opacity: 1;
    transform: scale(1);
  }

  /* Drag Handle */
  .card-drag {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 16px;
    height: 16px;
    color: var(--bring-text-muted);
    opacity: 0;
    cursor: grab;
    transition: opacity 0.2s ease;
  }

  .card:hover .card-drag {
    opacity: 0.6;
  }

  .card-drag:hover {
    opacity: 1 !important;
    color: var(--bring-accent);
  }

  .card-drag:active {
    cursor: grabbing;
  }

  /* Quick Add Cards */
  .quick-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
    gap: 8px;
  }

  .quick-card {
    background: var(--bring-bg-secondary);
    border-radius: var(--bring-radius-sm);
    padding: 10px 8px;
    border: 1px solid var(--bring-border);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .quick-card:hover {
    background: var(--bring-bg-hover);
    border-color: var(--bring-accent);
    transform: translateY(-2px);
  }

  .quick-card:active {
    transform: translateY(0) scale(0.97);
  }

  .quick-card.adding {
    animation: quickAdd 0.3s ease;
  }

  @keyframes quickAdd {
    0% { transform: scale(1); }
    50% { transform: scale(0.92); background: var(--bring-accent-dim); }
    100% { transform: scale(1); }
  }

  .quick-card-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    margin-bottom: 6px;
  }

  .quick-card-icon {
    font-size: 20px;
    margin-bottom: 6px;
  }

  .quick-card-name {
    font-size: 10px;
    font-weight: 500;
    color: var(--bring-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  /* Collapsible */
  .collapsible-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 12px 16px;
    background: var(--bring-bg-secondary);
    border-radius: var(--bring-radius);
    border: 1px solid var(--bring-border);
    margin-bottom: 10px;
    transition: all 0.2s ease;
    gap: 8px;
  }

  .collapsible-header:hover {
    background: var(--bring-bg-tertiary);
  }

  .collapsible-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .collapsible-icon {
    transition: transform 0.3s ease;
    color: var(--bring-text-muted);
    flex-shrink: 0;
  }

  .collapsible-header.open .collapsible-icon {
    transform: rotate(180deg);
  }

  .collapsible-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .collapsible-content.open {
    max-height: 2000px;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--bring-text-muted);
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.6;
  }

  .empty-text {
    font-size: 14px;
    font-weight: 500;
  }

  .empty-sub {
    font-size: 12px;
    margin-top: 6px;
    opacity: 0.7;
  }

  /* Loading */
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px;
  }

  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--bring-bg-tertiary);
    border-top-color: var(--bring-accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Error State */
  .error-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--bring-error);
  }

  .error-icon {
    font-size: 48px;
    margin-bottom: 12px;
  }

  .error-text {
    font-size: 14px;
  }

  /* Toast */
  .toast-container {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer-events: none;
  }

  .toast {
    background: var(--bring-bg-tertiary);
    color: var(--bring-text-primary);
    padding: 12px 20px;
    border-radius: var(--bring-radius-sm);
    font-size: 13px;
    font-weight: 500;
    box-shadow: var(--bring-shadow);
    animation: toastIn 0.3s ease;
    border-left: 3px solid var(--bring-accent);
    text-align: center;
    pointer-events: auto;
  }

  .toast.error {
    border-left-color: var(--bring-error);
  }

  .toast.success {
    border-left-color: var(--bring-success);
  }

  @keyframes toastIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes toastOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(20px); }
  }

  /* Divider */
  .divider {
    height: 1px;
    background: var(--bring-border);
    margin: 20px 0;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 500;
    padding: 20px;
  }

  .modal-overlay.open {
    display: flex;
  }

  .modal {
    background: var(--bring-bg-secondary);
    border-radius: var(--bring-radius);
    padding: 24px;
    max-width: 320px;
    width: 100%;
    border: 1px solid var(--bring-border);
    box-shadow: var(--bring-shadow);
  }

  .modal-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
    color: var(--bring-text-primary);
  }

  .modal-input {
    width: 100%;
    background: var(--bring-bg-tertiary);
    border: 1px solid var(--bring-border);
    border-radius: var(--bring-radius-sm);
    padding: 12px 14px;
    font-size: 14px;
    color: var(--bring-text-primary);
    font-family: inherit;
    outline: none;
    margin-bottom: 16px;
  }

  .modal-input:focus {
    border-color: var(--bring-accent);
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  .modal-btn {
    padding: 10px 18px;
    border-radius: var(--bring-radius-sm);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    border: none;
  }

  .modal-btn.cancel {
    background: var(--bring-bg-tertiary);
    color: var(--bring-text-secondary);
  }

  .modal-btn.cancel:hover {
    background: var(--bring-bg-hover);
    color: var(--bring-text-primary);
  }

  .modal-btn.save {
    background: var(--bring-accent);
    color: var(--bring-bg-primary);
  }

  .modal-btn.save:hover {
    filter: brightness(1.1);
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--bring-bg-tertiary);
    border-radius: 3px;
  }
`;

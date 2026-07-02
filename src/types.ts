/**
 * Type definitions for the Bring! Shopping Card
 */

export interface BringItem {
  name: string;
  originalName: string;
  specification: string;
  icon: string;
  imageUrl: string | null;
  category: string;
}

export interface BringList {
  uuid: string;
  name: string;
}

export interface BringListData {
  listUuid: string;
  name: string;
  purchase: BringItem[];
  recently: BringItem[];
  available: BringItem[];
}

export type CardSize = 'small' | 'medium' | 'large';

export interface BringCardConfig {
  type: string;
  title?: string;
  card_id?: string;
  show_recently?: boolean;
  show_available?: boolean;
  max_quick_items?: number;
  sort_default?: SortMode;
  card_size?: CardSize;
}

export type SortMode = 'manual' | 'alpha' | 'category' | 'recent';

export interface HomeAssistant {
  callWS: <T>(msg: Record<string, unknown>) => Promise<T>;
  connection: {
    subscribeMessage: <T>(
      callback: (msg: T) => void,
      subscribeMessage: Record<string, unknown>
    ) => Promise<() => void>;
  };
  themes: {
    darkMode: boolean;
  };
  language: string;
}

// WebSocket response types
export interface WsListsResponse {
  lists: BringList[];
}

export interface WsItemsResponse extends BringListData {}

export interface WsSuccessResponse {
  success: boolean;
}

// Card state
export interface CardState {
  lists: BringList[];
  selectedListUuid: string | null;
  items: BringItem[];
  recentItems: BringItem[];
  availableItems: BringItem[];
  sortBy: SortMode;
  customOrder: string[];
  searchQuery: string;
  selectedSuggestion: number;
  loading: boolean;
  error: string | null;
  editingItem: BringItem | null;
}

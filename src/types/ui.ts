export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export type BottomSheetView =
  | "filters"
  | "sort"
  | "notifications"
  | "installPrompt"
  | "share"
  | "menu"
  | null;

export interface BottomSheetState {
  isOpen: boolean;
  view: BottomSheetView;
  props?: Record<string, unknown>;
}

export type ThemeMode = "dark" | "system" | "light";

export interface UIState {
  theme: ThemeMode;
  sidebarOpen: boolean;
  toasts: Toast[];
  bottomSheet: BottomSheetState;
  isOffline: boolean;
  isInstallPromptOpen: boolean;
  notifications: Notification[];
  unreadCount: number;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface FilterChip {
  key: string;
  label: string;
  value: string;
  isActive: boolean;
}

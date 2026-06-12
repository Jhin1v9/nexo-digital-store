import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeMode, Toast, BottomSheetState, Notification } from "@/types/ui";
import { nanoid } from "nanoid";

// Simple nanoid replacement
function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

interface UIStore {
  theme: ThemeMode;
  sidebarOpen: boolean;
  toasts: Toast[];
  bottomSheet: BottomSheetState;
  isOffline: boolean;
  isInstallPromptOpen: boolean;
  notifications: Notification[];
  unreadCount: number;

  setTheme: (theme: ThemeMode) => void;
  toggleSidebar: () => void;
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  openBottomSheet: (view: BottomSheetState["view"], props?: Record<string, unknown>) => void;
  closeBottomSheet: () => void;
  setOffline: (offline: boolean) => void;
  setInstallPromptOpen: (open: boolean) => void;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: "dark",
      sidebarOpen: false,
      toasts: [],
      bottomSheet: { isOpen: false, view: null },
      isOffline: false,
      isInstallPromptOpen: false,
      notifications: [],
      unreadCount: 0,

      setTheme: (theme) => set({ theme }),

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      addToast: (toast) => {
        const id = generateId();
        set((state) => ({
          toasts: [...state.toasts, { ...toast, id }],
        }));
        // Auto-dismiss
        const duration = toast.duration ?? 3000;
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }));
        }, duration);
      },

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),

      clearToasts: () => set({ toasts: [] }),

      openBottomSheet: (view, props) =>
        set({ bottomSheet: { isOpen: true, view, props } }),

      closeBottomSheet: () =>
        set({ bottomSheet: { isOpen: false, view: null, props: undefined } }),

      setOffline: (offline) => set({ isOffline: offline }),

      setInstallPromptOpen: (open) => set({ isInstallPromptOpen: open }),

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: generateId(),
          timestamp: new Date().toISOString(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));
      },

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),

      clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
    }),
    {
      name: "nexo-ui",
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);

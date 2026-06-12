import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppProduct, AppFilter, PaginatedApps } from "@/types/app";
import { mockApi } from "@/lib/api-client";

interface AppStore {
  apps: AppProduct[];
  filteredApps: AppProduct[];
  selectedApp: AppProduct | null;
  loading: boolean;
  error: string | null;
  lastFetched: number;

  fetchApps: (filters?: AppFilter) => Promise<void>;
  fetchApp: (slug: string) => Promise<AppProduct | null>;
  filterApps: (filters: AppFilter) => void;
  selectApp: (app: AppProduct | null) => void;
  clearFilters: () => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      apps: [],
      filteredApps: [],
      selectedApp: null,
      loading: false,
      error: null,
      lastFetched: 0,

      fetchApps: async (filters) => {
        set({ loading: true, error: null });
        try {
          const result: PaginatedApps = await mockApi.getApps(filters);
          set({
            apps: result.apps,
            filteredApps: result.apps,
            loading: false,
            lastFetched: Date.now(),
          });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Erro ao carregar apps",
            loading: false,
          });
        }
      },

      fetchApp: async (slug: string) => {
        set({ loading: true, error: null });
        try {
          const app = await mockApi.getApp(slug);
          set({ selectedApp: app, loading: false });
          return app;
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Erro ao carregar app",
            loading: false,
          });
          return null;
        }
      },

      filterApps: (filters: AppFilter) => {
        const { apps } = get();
        let filtered = [...apps];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          filtered = filtered.filter(
            (a) =>
              a.name.toLowerCase().includes(q) ||
              a.subtitle.toLowerCase().includes(q)
          );
        }
        if (filters.type && filters.type !== "all")
          filtered = filtered.filter((a) => a.type === filters.type);
        if (filters.framework && filters.framework !== "all")
          filtered = filtered.filter((a) => a.framework === filters.framework);
        if (filters.industry && filters.industry !== "all")
          filtered = filtered.filter((a) => a.industry === filters.industry);
        if (filters.sense && filters.sense !== "all")
          filtered = filtered.filter((a) => a.sense === filters.sense);
        if (filters.status && filters.status !== "all")
          filtered = filtered.filter((a) => a.status === filters.status);
        if (filters.pricing && filters.pricing !== "all")
          filtered = filtered.filter((a) => a.pricing === filters.pricing);

        const sortBy = filters.sortBy ?? "relevance";
        if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
        else if (sortBy === "newest")
          filtered.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        else if (sortBy === "popular")
          filtered.sort((a, b) => b.downloadCount - a.downloadCount);

        set({ filteredApps: filtered });
      },

      selectApp: (app) => set({ selectedApp: app }),
      clearFilters: () => set({ filteredApps: get().apps }),
      setError: (error) => set({ error }),
    }),
    {
      name: "nexo-app-store",
      partialize: (state) => ({
        lastFetched: state.lastFetched,
      }),
    }
  )
);

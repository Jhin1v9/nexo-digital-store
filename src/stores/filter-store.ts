import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppFilter } from "@/types/app";

interface FilterStore {
  filters: AppFilter;

  setFilter: <K extends keyof AppFilter>(key: K, value: AppFilter[K]) => void;
  clearFilter: <K extends keyof AppFilter>(key: K) => void;
  clearAll: () => void;
  toggleFilter: <K extends keyof Pick<AppFilter, "type" | "framework" | "industry" | "sense" | "status" | "pricing">>(
    key: K,
    value: AppFilter[K]
  ) => void;
  getActiveFilterCount: () => number;
  syncFromUrl: (searchParams: URLSearchParams) => void;
  buildUrlParams: () => URLSearchParams;
}

const defaultFilters: AppFilter = {
  type: "all",
  framework: "all",
  industry: "all",
  sense: "all",
  status: "all",
  pricing: "all",
  search: undefined,
  sortBy: "relevance",
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      filters: { ...defaultFilters },

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      clearFilter: (key) =>
        set((state) => ({
          filters: { ...state.filters, [key]: defaultFilters[key] },
        })),

      clearAll: () => set({ filters: { ...defaultFilters } }),

      toggleFilter: (key, value) =>
        set((state) => {
          const current = state.filters[key];
          return {
            filters: {
              ...state.filters,
              [key]: current === value ? defaultFilters[key] : value,
            },
          };
        }),

      getActiveFilterCount: () => {
        const { filters } = get();
        let count = 0;
        if (filters.type && filters.type !== "all") count++;
        if (filters.framework && filters.framework !== "all") count++;
        if (filters.industry && filters.industry !== "all") count++;
        if (filters.sense && filters.sense !== "all") count++;
        if (filters.status && filters.status !== "all") count++;
        if (filters.pricing && filters.pricing !== "all") count++;
        if (filters.search) count++;
        return count;
      },

      syncFromUrl: (searchParams) => {
        const filters: AppFilter = { ...defaultFilters };
        const search = searchParams.get("search");
        const type = searchParams.get("type");
        const framework = searchParams.get("framework");
        const industry = searchParams.get("industry");
        const sense = searchParams.get("sense");
        const status = searchParams.get("status");
        const pricing = searchParams.get("pricing");
        const sortBy = searchParams.get("sortBy");

        if (search) filters.search = search;
        if (type) filters.type = type as AppFilter["type"];
        if (framework) filters.framework = framework as AppFilter["framework"];
        if (industry) filters.industry = industry as AppFilter["industry"];
        if (sense) filters.sense = sense as AppFilter["sense"];
        if (status) filters.status = status as AppFilter["status"];
        if (pricing) filters.pricing = pricing as AppFilter["pricing"];
        if (sortBy) filters.sortBy = sortBy as AppFilter["sortBy"];

        set({ filters });
      },

      buildUrlParams: () => {
        const { filters } = get();
        const params = new URLSearchParams();
        if (filters.search) params.set("search", filters.search);
        if (filters.type && filters.type !== "all") params.set("type", filters.type);
        if (filters.framework && filters.framework !== "all") params.set("framework", filters.framework);
        if (filters.industry && filters.industry !== "all") params.set("industry", filters.industry);
        if (filters.sense && filters.sense !== "all") params.set("sense", filters.sense);
        if (filters.status && filters.status !== "all") params.set("status", filters.status);
        if (filters.pricing && filters.pricing !== "all") params.set("pricing", filters.pricing);
        if (filters.sortBy && filters.sortBy !== "relevance") params.set("sortBy", filters.sortBy);
        return params;
      },
    }),
    {
      name: "nexo-filters",
    }
  )
);

"use client";

import { useEffect, useCallback } from "react";
import { useFilterStore } from "@/stores/filter-store";
import { AppFilter } from "@/types/app";

export function useFilters() {
  const { filters, setFilter, clearFilter, clearAll, syncFromUrl, buildUrlParams } = useFilterStore();

  // Sync filters from URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      syncFromUrl(params);
    }
  }, [syncFromUrl]);

  // Update URL when filters change
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = buildUrlParams();
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [filters, buildUrlParams]);

  const setSearch = useCallback(
    (search: string) => {
      setFilter("search", search || undefined);
    },
    [setFilter]
  );

  const setSortBy = useCallback(
    (sortBy: AppFilter["sortBy"]) => {
      setFilter("sortBy", sortBy);
    },
    [setFilter]
  );

  const activeFilterCount = [
    filters.type !== "all",
    filters.framework !== "all",
    filters.industry !== "all",
    filters.sense !== "all",
    filters.status !== "all",
    filters.pricing !== "all",
    !!filters.search,
  ].filter(Boolean).length;

  return {
    filters,
    setFilter,
    clearFilter,
    clearAll,
    setSearch,
    setSortBy,
    activeFilterCount,
  };
}

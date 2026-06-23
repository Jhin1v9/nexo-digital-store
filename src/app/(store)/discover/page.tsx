"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { AppProduct, AppFilter } from "@/types/app";
import { mockApi } from "@/lib/api-client";
import { useI18n } from "@/i18n";
import { AppCard, AppCardSkeleton } from "@/components/AppCard";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

function useFilterTabs() {
  const { t } = useI18n();
  return [
    { key: "type" as const, value: "tpv", label: t("categories.tpv") },
    { key: "type" as const, value: "saas", label: t("categories.saas") },
    { key: "type" as const, value: "site", label: t("categories.web") },
    { key: "type" as const, value: "app", label: t("categories.app") },
    { key: "category" as const, value: "business", label: t("categories.business") },
    { key: "category" as const, value: "ecommerce", label: t("categories.ecommerce") },
    { key: "source" as const, value: "manual", label: t("categories.templates") },
  ];
}

export default function DiscoverPage() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const filterTabs = useFilterTabs();

  const [apps, setApps] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<{ key: string; value: string } | null>(null);

  const buildFilters = useCallback((): AppFilter => {
    const filters: AppFilter = {};
    const sortBy = searchParams.get("sortBy");
    if (sortBy === "rating" || sortBy === "newest" || sortBy === "popular") {
      filters.sortBy = sortBy;
    }
    const source = searchParams.get("source");
    if (source) filters.source = source as AppFilter["source"];
    const category = searchParams.get("category");
    if (category) filters.category = category as AppFilter["category"];
    if (activeFilter) {
      (filters as Record<string, string>)[activeFilter.key] = activeFilter.value;
    }
    return filters;
  }, [searchParams, activeFilter]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    async function load() {
      const filters = buildFilters();
      try {
        const result = await mockApi.getApps({ ...filters, limit: "40" });
        if (mounted) {
          setApps(result.apps);
          setLoading(false);
        }
      } catch {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [buildFilters]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-10">
      <SectionHeader title={t("nav.discover")} />

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-2">
        <button
          onClick={() => setActiveFilter(null)}
          className={cn(
            "shrink-0 h-9 px-4 rounded-full text-sm font-medium transition-colors",
            activeFilter === null
              ? "bg-primary text-on-primary"
              : "bg-surface-secondary text-text-secondary hover:bg-surface-tertiary"
          )}
        >
          {t("home.viewAll")}
        </button>
        {filterTabs.map((tab) => {
          const isActive = activeFilter?.key === tab.key && activeFilter?.value === tab.value;
          return (
            <button
              key={`${tab.key}-${tab.value}`}
              onClick={() => setActiveFilter({ key: tab.key, value: tab.value })}
              className={cn(
                "shrink-0 h-9 px-4 rounded-full text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-on-primary"
                  : "bg-surface-secondary text-text-secondary hover:bg-surface-tertiary"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Results grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <AppCardSkeleton key={i} />
          ))}
        </div>
      ) : apps.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {apps.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-base font-medium text-text-primary">{t("search.noResults")}</p>
          <p className="text-sm text-text-secondary mt-1">{t("search.tryAnother")}</p>
        </div>
      )}
    </div>
  );
}

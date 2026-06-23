"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppProduct } from "@/types/app";
import { mockApi } from "@/lib/api-client";
import { useI18n } from "@/i18n";

export default function SearchPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 1) {
        setLoading(true);
        const r = await mockApi.getApps({ search: query, limit: "10" });
        setResults(r.apps);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Search header */}
      <div className="flex items-center gap-2 px-4 sm:px-6 lg:px-8 h-14 border-b border-border-default shrink-0">
        <button
          onClick={() => router.push("/")}
          className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full hover:bg-surface-tertiary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <div className={cn(
          "flex-1 flex items-center gap-2 rounded-xl px-3 h-10 border",
          "bg-surface-secondary border-border-default focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors"
        )}>
          <Search className="w-4 h-4 text-text-muted shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="rounded-full hover:bg-surface-tertiary p-1">
              <X className="w-4 h-4 text-text-muted" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8 scrollbar-hide">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-surface-tertiary rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : query.trim().length > 1 ? (
          results.length > 0 ? (
            <div className="space-y-2 max-w-3xl mx-auto">
              <p className="text-xs text-text-secondary mb-3">{t("search.results", { count: results.length })}</p>
              {results.map((app) => (
                <button
                  key={app.id}
                  onClick={() => router.push(`/app/${app.slug}`)}
                  className={cn(
                    "flex items-center gap-3 w-full p-3 rounded-2xl bg-surface-secondary border border-border-default text-left",
                    "active:scale-[0.98] hover:bg-surface-tertiary transition-all"
                  )}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 flex items-center justify-center shrink-0 border border-border-default">
                    <span className="text-lg font-bold text-primary">{app.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary truncate">{app.name}</h3>
                    <p className="text-xs text-text-secondary truncate">{app.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="w-12 h-12 text-text-muted mb-4" />
              <p className="text-sm font-medium text-text-primary">{t("search.noResults")}</p>
              <p className="text-xs text-text-secondary mt-1">{t("search.tryAnother")}</p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="w-12 h-12 text-text-muted mb-4" />
            <p className="text-sm font-medium text-text-primary">{t("search.placeholder")}</p>
            <p className="text-xs text-text-secondary mt-1">{t("search.tryAnother")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

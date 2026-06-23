"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppProduct } from "@/types/app";
import { mockApi } from "@/lib/api-client";
import { getAppsByCategory } from "@/lib/mock-data";
import { useI18n } from "@/i18n";
import { AppCard, AppCardSkeleton } from "@/components/AppCard";
import { cn } from "@/lib/utils";

const categoryNames: Record<string, string> = {
  tpv: "TPVs",
  saas: "SaaS",
  web: "Websites",
  app: "Apps Mobile",
  program: "Programas",
  custom: "Personalizado",
  clinics: "Clínicas",
  retail: "Varejo",
  food: "Alimentação",
  business: "Negócios",
  ecommerce: "E-commerce",
  portfolio: "Portfolio",
  landing: "Landing Pages",
};

export function CategoryDetailPageClient({ slug }: { slug: string }) {
  const { t } = useI18n();
  const [apps, setApps] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const filtered = getAppsByCategory(slug);
      if (filtered.length > 0) {
        setApps(filtered);
      } else {
        const result = await mockApi.getApps();
        if (mounted) setApps(result.apps);
      }
      if (mounted) setLoading(false);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const name = categoryNames[slug] ?? slug;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 h-16 border-b border-border-default">
        <Link
          href="/categories"
          className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full hover:bg-surface-tertiary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </Link>
        <h1 className="text-lg font-semibold text-text-primary">{name}</h1>
      </div>

      {/* Results */}
      <div className="p-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
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
    </div>
  );
}

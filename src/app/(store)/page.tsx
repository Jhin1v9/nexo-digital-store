"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard,
  Cloud,
  Globe,
  Smartphone,
  Heart,
  ShoppingBag,
  UtensilsCrossed,
  LayoutGrid,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { AppProduct } from "@/types/app";
import { mockApi } from "@/lib/api-client";
import { useI18n } from "@/i18n";
import { HeroSection } from "@/components/HeroSection";
import { CategoryPill } from "@/components/CategoryPill";
import { SectionHeader } from "@/components/SectionHeader";
import { AppCard, AppCardSkeleton } from "@/components/AppCard";
import { cn } from "@/lib/utils";

const categoryIcons = {
  CreditCard,
  Cloud,
  Globe,
  Smartphone,
  Heart,
  ShoppingBag,
  UtensilsCrossed,
  LayoutGrid,
};

function useCategoryPills() {
  const { t } = useI18n();
  return [
    { label: t("categories.tpv"), icon: "CreditCard", href: "/category/tpv" },
    { label: t("categories.saas"), icon: "Cloud", href: "/category/saas" },
    { label: t("categories.web"), icon: "Globe", href: "/category/web" },
    { label: t("categories.app"), icon: "Smartphone", href: "/category/app" },
    { label: t("categories.clinics"), icon: "Heart", href: "/category/clinics" },
    { label: t("categories.retail"), icon: "ShoppingBag", href: "/category/retail" },
    { label: t("categories.food"), icon: "UtensilsCrossed", href: "/category/food" },
    { label: t("categories.templates"), icon: "LayoutGrid", href: "/discover?source=manual" },
  ];
}

function Carousel({
  title,
  href,
  apps,
  showBadge,
  loading,
}: {
  title: string;
  href: string;
  apps: AppProduct[];
  showBadge?: boolean;
  loading?: boolean;
}) {
  const { t } = useI18n();

  return (
    <section className="w-full mt-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <SectionHeader title={title} href={href} actionLabel={t("home.viewAll")} />
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-2">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-40 shrink-0">
                <AppCardSkeleton />
              </div>
            ))
          : apps.map((app, i) => (
              <div key={app.id} className="w-40 shrink-0 relative">
                {showBadge && (
                  <span className="absolute -top-1.5 -right-1.5 z-10 text-[10px] font-bold text-on-primary bg-secondary px-2 py-0.5 rounded-full uppercase">
                    {t("product.new")}
                  </span>
                )}
                <AppCard app={app} index={i} />
              </div>
            ))}
      </div>
    </section>
  );
}

function FeaturedSection({ apps, loading }: { apps: AppProduct[]; loading?: boolean }) {
  const { t } = useI18n();

  if (loading) {
    return (
      <section className="w-full mt-10 px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("home.featured")} href="/discover?sortBy=popular" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AppCardSkeleton variant="featured" />
          <AppCardSkeleton variant="featured" />
        </div>
      </section>
    );
  }

  const [heroApp, ...gridApps] = apps;

  return (
    <section className="w-full mt-10 px-4 sm:px-6 lg:px-8">
      <SectionHeader title={t("home.featured")} href="/discover?sortBy=popular" />
      {heroApp && (
        <div className="mb-4">
          <AppCard app={heroApp} variant="featured" />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gridApps.slice(0, 4).map((app, i) => (
          <AppCard key={app.id} app={app} index={i} variant="featured" />
        ))}
      </div>
    </section>
  );
}

function RequestCTA() {
  const { t } = useI18n();

  return (
    <section className="w-full mt-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative overflow-hidden rounded-3xl p-8 md:p-10",
          "bg-surface-secondary border border-border-default text-center"
        )}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <Sparkles className="w-10 h-10 text-primary mx-auto relative" />
        <h3 className="relative mt-4 text-xl font-semibold text-text-primary">
          {t("home.requestCustomApp")}
        </h3>
        <p className="relative mt-2 text-sm text-text-secondary max-w-sm mx-auto">
          {t("home.requestCustomAppDescription")}
        </p>
        <Link
          href="/request"
          className={cn(
            "relative inline-flex items-center gap-2 mt-5 h-12 px-6 rounded-full",
            "bg-primary text-on-primary font-semibold",
            "hover:bg-primary-hover active:scale-95 transition-all duration-200"
          )}
        >
          {t("home.requestApp")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  const { t } = useI18n();
  const [apps, setApps] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const result = await mockApi.getApps({ limit: "40" });
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
  }, []);

  const [communityTemplates, setCommunityTemplates] = useState<AppProduct[]>([]);

  useEffect(() => {
    let mounted = true;
    async function loadTemplates() {
      try {
        const result = await mockApi.getTemplates({ limit: "20" });
        if (mounted) setCommunityTemplates(result.apps);
      } catch {
        // ignore
      }
    }
    loadTemplates();
    return () => {
      mounted = false;
    };
  }, []);

  const categoryPills = useCategoryPills();

  const featuredApps = apps.filter((a) =>
    ["tpv-001", "saas-001", "saas-003", "site-001", "site-002"].includes(a.id)
  );
  const newArrivals = apps.filter((a) =>
    ["saas-002", "site-003", "site-004", "app-001", "prog-001"].includes(a.id)
  );
  const popularApps = [...apps]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 8);

  return (
    <div className="w-full pb-8">
      <HeroSection />

      {/* Category pills */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
          {categoryPills.map((pill, i) => {
            const Icon = categoryIcons[pill.icon as keyof typeof categoryIcons] ?? LayoutGrid;
            return (
              <CategoryPill
                key={pill.href}
                href={pill.href}
                label={pill.label}
                icon={Icon}
                index={i}
              />
            );
          })}
        </div>
      </section>

      <FeaturedSection apps={featuredApps} loading={loading} />

      <Carousel
        title={t("home.newArrivals")}
        href="/discover?sortBy=newest"
        apps={newArrivals}
        showBadge
        loading={loading}
      />

      <Carousel
        title={t("home.popular")}
        href="/discover?sortBy=popular"
        apps={popularApps}
        loading={loading}
      />

      {communityTemplates.length > 0 && (
        <Carousel
          title={t("home.communityTemplates")}
          href="/discover?source=manual"
          apps={communityTemplates}
          loading={loading}
        />
      )}

      <RequestCTA />
    </div>
  );
}

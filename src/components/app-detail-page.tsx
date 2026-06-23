"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Download, Play, Check, Globe, FileCode, ArrowUpRight, X } from "lucide-react";
import { AppProduct } from "@/types/app";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { mockApi } from "@/lib/api-client";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

function isTemplate(app: AppProduct): boolean {
  return app.source === "manual" || app.source === "generated" || app.source === "mined";
}

function formatPriceLabel(app: AppProduct, t: (key: string) => string): string {
  if (app.pricing === "free") return t("product.free");
  if (app.pricing === "quote") return t("product.quote");
  if (app.pricing === "subscription") return `€${app.price}/${t("product.month")}`;
  return `€${app.price}`;
}

function PrimaryAction({ app }: { app: AppProduct }) {
  const { t } = useI18n();
  const router = useRouter();

  const label = isTemplate(app) ? t("product.useTemplate") : app.pricing === "quote" ? t("product.requestCustom") : t("product.install");

  return (
    <button
      onClick={() => router.push(`/request?app=${app.slug}`)}
      className={cn(
        "flex-1 h-12 rounded-2xl flex items-center justify-center gap-2",
        "bg-primary text-on-primary font-semibold text-sm",
        "hover:bg-primary-hover active:scale-95 transition-all duration-200"
      )}
    >
      {isTemplate(app) ? <FileCode className="w-4 h-4" /> : <Download className="w-4 h-4" />}
      {label}
    </button>
  );
}

function DemoAction({ app }: { app: AppProduct }) {
  const { t } = useI18n();

  return (
    <button
      onClick={() => {
        if (app.demoUrl?.startsWith("http")) {
          window.open(app.demoUrl, "_blank", "noopener,noreferrer");
        }
      }}
      disabled={!app.demoUrl?.startsWith("http")}
      className={cn(
        "flex-1 h-12 rounded-2xl flex items-center justify-center gap-2",
        "bg-surface-secondary text-text-primary font-semibold text-sm border border-border-default",
        "hover:bg-surface-tertiary active:scale-95 transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-surface-secondary"
      )}
    >
      <Play className="w-4 h-4" />
      {t("product.viewDemo")}
    </button>
  );
}

export function AppDetailPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const [app, setApp] = useState<AppProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLPCreatorBanner, setShowLPCreatorBanner] = useState(() => searchParams.get("source") === "lp-creator");

  useEffect(() => {
    let mounted = true;
    mockApi.getApp(slug).then((a) => {
      if (mounted) {
        setApp(a);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="h-14 border-b border-border-default" />
        <div className="p-4 sm:px-6 lg:px-8 space-y-4 max-w-4xl mx-auto">
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-2xl bg-surface-tertiary animate-pulse" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-5 w-48 bg-surface-tertiary rounded animate-pulse" />
              <div className="h-3 w-32 bg-surface-tertiary rounded animate-pulse" />
            </div>
          </div>
          <div className="h-60 bg-surface-tertiary rounded-2xl animate-pulse" />
          <div className="h-6 w-3/4 bg-surface-tertiary rounded animate-pulse" />
          <div className="h-6 w-1/2 bg-surface-tertiary rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-4">
        <p className="text-base font-medium text-text-primary">{t("product.notFound")}</p>
        <Link
          href="/"
          className={cn(
            "mt-4 h-10 px-5 rounded-full",
            "bg-primary text-on-primary text-sm font-medium",
            "hover:bg-primary-hover transition-colors"
          )}
        >
          {t("product.backHome")}
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pb-24">
      {/* LP Creator return banner */}
      {showLPCreatorBanner && (
        <div className="bg-luna/10 border-b border-luna/20 px-4 py-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="px-1.5 py-0.5 rounded bg-luna text-on-luna text-[10px] font-semibold">
              LP Creator
            </span>
            <span className="text-text-secondary">{t("lpCreator.fromLPCreator")}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.back()}
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium",
                "text-luna hover:text-luna-hover transition-colors"
              )}
            >
              {t("lpCreator.backToEditor")}
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setShowLPCreatorBanner(false)}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-luna/10 text-text-muted"
              aria-label="Fechar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 h-14 border-b border-border-default">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full hover:bg-surface-tertiary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <h1 className="text-base font-semibold text-text-primary truncate">{app.name}</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* App header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-4 sm:gap-6"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-surface-secondary border border-border-default flex items-center justify-center shrink-0">
            <span className="text-3xl sm:text-4xl font-bold text-primary/25">{app.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {isTemplate(app) ? app.category ?? app.type : app.type}
              </span>
              {isTemplate(app) && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                  Template
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mt-1">{app.name}</h2>
            <p className="text-sm text-text-secondary mt-1">{app.subtitle}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <div className="flex items-center gap-1 text-star-filled">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">{app.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-text-muted">({app.reviewCount} {t("product.reviews")})</span>
              <span className="text-xs text-text-muted flex items-center gap-1">
                <Download className="w-3 h-3" />
                {app.downloadCount.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex gap-3"
        >
          <DemoAction app={app} />
          <PrimaryAction app={app} />
        </motion.div>

        {/* Screenshots */}
        {app.screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-base font-semibold text-text-primary mb-3">{t("product.screenshots")}</h3>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
              {app.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="w-[200px] sm:w-[240px] aspect-[9/16] rounded-2xl bg-surface-secondary border border-border-default overflow-hidden shrink-0 snap-start flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt={`${app.name} screenshot ${i + 1}`}
                    className="w-full h-full object-cover object-center opacity-70"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-base font-semibold text-text-primary mb-2">{t("product.about")}</h3>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{app.description}</p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-base font-semibold text-text-primary mb-3">{t("product.features")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {app.features.map((f) => (
              <div key={f} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-text-secondary">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-base font-semibold text-text-primary mb-3">{t("product.techStack")}</h3>
          <div className="flex flex-wrap gap-2">
            {app.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-surface-secondary border border-border-default text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Requirements */}
        {app.requirements.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-base font-semibold text-text-primary mb-3">{t("product.requirements")}</h3>
            <div className="space-y-2">
              {app.requirements.map((req) => (
                <div key={req} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Globe className="w-4 h-4 text-text-muted" />
                  {req}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <ReviewSection appId={app.id} appRating={app.rating} reviewCount={app.reviewCount} />
        </motion.div>

        {/* Price / Request sticky footer on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="sm:hidden fixed bottom-16 left-0 right-0 px-4 py-3 bg-background/95 backdrop-blur-xl border-t border-border-default z-40"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-lg font-bold text-text-primary">{formatPriceLabel(app, t)}</span>
            <button
              onClick={() => router.push(`/request?app=${app.slug}`)}
              className="h-11 px-5 rounded-full bg-primary text-on-primary font-semibold text-sm hover:bg-primary-hover transition-colors"
            >
              {isTemplate(app) ? t("product.useTemplate") : t("product.install")}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Download } from "lucide-react";
import { AppProduct } from "@/types/app";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

interface AppCardProps {
  app: AppProduct;
  index?: number;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function AppCard({ app, index = 0, variant = "default", className }: AppCardProps) {
  const { t } = useI18n();

  const formatPrice = () => {
    if (app.pricing === "free") return t("product.free");
    if (app.pricing === "quote") return t("product.quote");
    if (app.pricing === "subscription") return `€${app.price}/${t("product.month")}`;
    return `€${app.price}`;
  };

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href={`/app/${app.slug}`}
          className={cn(
            "group block relative overflow-hidden rounded-3xl",
            "bg-surface-secondary border border-border-default",
            "hover:shadow-lg hover:border-primary/30 transition-all duration-300",
            className
          )}
        >
          <div className="aspect-[16/10] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary/20">{app.name.charAt(0)}</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {app.type}
                </span>
                <h3 className="text-xl font-semibold text-text-primary mt-1">{app.name}</h3>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">{app.subtitle}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0 text-star-filled">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">{app.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-default">
              <span className="text-sm font-medium text-text-secondary">
                {formatPrice()}
              </span>
              <span className="text-sm font-medium text-primary group-hover:translate-x-0.5 transition-transform">
                {t("product.viewDetails")} →
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href={`/app/${app.slug}`}
          className={cn(
            "group flex items-center gap-4 p-4 rounded-2xl",
            "bg-surface border border-border-default",
            "hover:bg-surface-secondary hover:shadow-md transition-all duration-200",
            className
          )}
        >
          <div className="w-14 h-14 rounded-2xl bg-surface-tertiary flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-primary">{app.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-text-primary truncate">{app.name}</h3>
            <p className="text-xs text-text-secondary truncate mt-0.5">{app.subtitle}</p>
            <span className="text-xs font-medium text-text-muted mt-1">{formatPrice()}</span>
          </div>
          <div className="flex items-center gap-1 text-star-filled shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-semibold">{app.rating.toFixed(1)}</span>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/app/${app.slug}`}
        className={cn(
          "group block rounded-2xl overflow-hidden",
          "bg-surface border border-border-default",
          "hover:shadow-md hover:border-primary/20 transition-all duration-200",
          className
        )}
      >
        <div className="aspect-[4/3] relative bg-surface-secondary flex items-center justify-center">
          <span className="text-4xl font-bold text-primary/15">{app.name.charAt(0)}</span>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-text-primary truncate">{app.name}</h3>
          <p className="text-xs text-text-secondary truncate mt-0.5">{app.subtitle}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-medium text-text-muted">{formatPrice()}</span>
            <div className="flex items-center gap-1 text-star-filled">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium">{app.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function AppCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" | "featured" }) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-border-default animate-pulse">
        <div className="w-14 h-14 rounded-2xl bg-surface-tertiary" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-surface-tertiary rounded" />
          <div className="h-3 w-24 bg-surface-tertiary rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl bg-surface border border-border-default overflow-hidden animate-pulse", variant === "featured" && "rounded-3xl")}>
      <div className={cn("bg-surface-tertiary", variant === "featured" ? "aspect-[16/10]" : "aspect-square")} />
      <div className="p-4 space-y-2">
        <div className="h-4 w-28 bg-surface-tertiary rounded" />
        <div className="h-3 w-20 bg-surface-tertiary rounded" />
      </div>
    </div>
  );
}

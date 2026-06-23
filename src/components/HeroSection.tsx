"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const { t } = useI18n();

  return (
    <section
      className={cn(
        "relative w-full px-6 pt-12 pb-10 md:pt-20 md:pb-14 text-center overflow-hidden",
        className
      )}
    >
      {/* Soft gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 55%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-2xl mx-auto"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wide">
          NEXO Store
        </span>

        <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-[-0.03em] leading-[1.1]">
          {t("home.heroTitle")}
        </h1>

        <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-md mx-auto">
          {t("home.heroSubtitle")}
        </p>

        <div className="mt-7 flex items-center justify-center gap-3">
          <Link
            href="/discover"
            className={cn(
              "inline-flex items-center gap-2 h-12 px-6 rounded-full",
              "bg-primary text-on-primary font-semibold",
              "hover:bg-primary-hover active:scale-95",
              "transition-all duration-200 shadow-md shadow-primary/15"
            )}
          >
            {t("home.exploreNow")}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/request"
            className={cn(
              "inline-flex items-center h-12 px-6 rounded-full",
              "bg-surface-secondary text-text-primary font-semibold border border-border-default",
              "hover:bg-surface-tertiary active:scale-95",
              "transition-all duration-200"
            )}
          >
            {t("home.requestApp")}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

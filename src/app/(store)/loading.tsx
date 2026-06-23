"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n";

export default function Loading() {
  const { t } = useI18n();

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
      {/* Animated spinner */}
      <div className="relative w-12 h-12">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-border-default"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Skeleton cards */}
      <div className="w-full max-w-lg space-y-4">
        <div className="h-4 w-3/4 bg-surface-tertiary rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-surface-tertiary rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-surface-tertiary rounded animate-pulse" />
      </div>

      <p className="text-sm text-text-muted">{t("loading")}...</p>
    </div>
  );
}

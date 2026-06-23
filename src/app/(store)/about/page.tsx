"use client";

import { useI18n } from "@/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 tracking-tight">
        {t("about.title")}
      </h1>
      <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
      </div>
    </div>
  );
}

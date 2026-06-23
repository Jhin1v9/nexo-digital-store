"use client";

import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 tracking-tight">
        {t("contact.title")}
      </h1>
      <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
        {t("contact.p1")}
      </p>
      <a
        href="mailto:hello@nexo-digital.app"
        className={cn(
          "inline-flex items-center justify-center h-12 px-6 rounded-2xl text-sm font-medium",
          "bg-primary text-on-primary hover:bg-primary-hover transition-colors"
        )}
      >
        {t("contact.cta")}
      </a>
    </div>
  );
}

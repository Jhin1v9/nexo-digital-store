"use client";

import { useI18n } from "@/i18n";

export default function PrivacyPage() {
  const { t, messages } = useI18n();
  const section = (messages as Record<string, unknown>).privacy as Record<string, unknown> | undefined;
  const items = (section?.items as string[]) ?? [];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 tracking-tight">
        {t("privacy.title")}
      </h1>
      <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
        {t("privacy.p1")}
      </p>
      <ul className="space-y-3 text-sm sm:text-base text-text-secondary">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-primary">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Globe, Sun } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { useI18n, locales, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme } = useUIStore();

  const menuItems = [
    { icon: User, label: t("profile.myAccount"), description: t("profile.accountDesc") },
    { icon: Bell, label: t("profile.notifications"), description: t("profile.notificationsDesc") },
    { icon: Shield, label: t("profile.privacy"), description: t("profile.privacyDesc") },
    { icon: Settings, label: t("profile.settings"), description: t("profile.settingsDesc") },
    { icon: HelpCircle, label: t("profile.help"), description: t("profile.helpDesc") },
    { icon: LogOut, label: t("profile.logout"), description: t("profile.logoutDesc") },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-24">
      {/* Profile header */}
      <div className="flex flex-col items-center py-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-lg font-bold text-text-primary mt-3">{t("profile.user")}</h1>
        <p className="text-sm text-text-secondary">{t("profile.email")}</p>
      </div>

      {/* Preferences */}
      <div className="max-w-md mx-auto space-y-4 mb-6">
        <div className="rounded-2xl bg-surface-secondary border border-border-default p-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-text-secondary" />
            <span className="text-sm font-semibold text-text-primary">{t("profile.language")}</span>
          </div>
          <div className="flex gap-2">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l as Locale)}
                className={cn(
                  "flex-1 h-9 rounded-xl text-xs font-medium border transition-colors",
                  locale === l
                    ? "bg-primary border-primary text-on-primary"
                    : "bg-background border-border-default text-text-secondary hover:border-primary/40"
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-surface-secondary border border-border-default p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sun className="w-4 h-4 text-text-secondary" />
            <span className="text-sm font-semibold text-text-primary">{t("profile.theme")}</span>
          </div>
          <div className="flex gap-2">
            {(["light", "dark", "system"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setTheme(m)}
                className={cn(
                  "flex-1 h-9 rounded-xl text-xs font-medium border transition-colors",
                  theme === m
                    ? "bg-primary border-primary text-on-primary"
                    : "bg-background border-border-default text-text-secondary hover:border-primary/40"
                )}
              >
                {t(`profile.theme${m.charAt(0).toUpperCase() + m.slice(1)}` as keyof typeof t)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="max-w-md mx-auto space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 w-full p-3 rounded-xl transition-colors text-left",
              "hover:bg-surface-secondary"
            )}
          >
            <div className="w-10 h-10 rounded-lg bg-surface-secondary border border-border-default flex items-center justify-center">
              <item.icon className="w-5 h-5 text-text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">{item.label}</p>
              <p className="text-xs text-text-secondary">{item.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-text-muted mt-8 pb-4">
        {t("profile.version", { version: "1.0.0" })}
      </p>
    </div>
  );
}

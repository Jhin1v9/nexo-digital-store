"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Zap, Globe } from "lucide-react";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

const navLinks = [
  { href: "/discover", label: "discover" },
  { href: "/categories", label: "categories" },
];

export function Navbar() {
  const router = useRouter();
  const { t } = useI18n();
  const { direction, isAtTop } = useScrollDirection({ threshold: 60 });
  const addToast = useUIStore((s) => s.addToast);

  const isVisible = direction !== "down" || isAtTop;

  const handleNotificationClick = () => {
    addToast({
      type: "info",
      title: t("nav.notifications"),
      message: "Notifications coming soon!",
      duration: 3000,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -72 }}
          animate={{ y: 0 }}
          exit={{ y: -72 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed top-0 left-0 right-0 z-50 h-16 md:h-[4.5rem]",
            "bg-background/80 backdrop-blur-xl border-b border-border-default",
            "transition-shadow duration-300",
            !isAtTop && "shadow-sm"
          )}
        >
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 select-none active:scale-95 transition-transform"
              aria-label={t("nav.home")}
            >
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-on-primary" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-text-primary tracking-tight">
                NEXO
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-tertiary transition-colors"
                >
                  {t(`nav.${link.label}`)}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => router.push("/search")}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-tertiary transition-colors"
                aria-label={t("nav.search")}
              >
                <Search className="w-5 h-5 text-text-secondary" />
              </button>
              <button
                onClick={handleNotificationClick}
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-tertiary transition-colors"
                aria-label={t("nav.notifications")}
              >
                <Bell className="w-5 h-5 text-text-secondary" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
              </button>
              <Link
                href="/profile"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-tertiary hover:bg-border-default transition-colors"
                aria-label={t("nav.profile")}
              >
                <Globe className="w-5 h-5 text-text-secondary" />
              </Link>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

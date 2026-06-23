"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Grid3X3, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

const navItems = [
  { href: "/", icon: Home, label: "home" },
  { href: "/discover", icon: Compass, label: "discover" },
  { href: "/categories", icon: Grid3X3, label: "categories" },
  { href: "/profile", icon: User, label: "profile" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border-default safe-area-pb">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive ? "text-primary" : "text-text-muted hover:text-text-secondary"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-medium">{t(`nav.${item.label}`)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

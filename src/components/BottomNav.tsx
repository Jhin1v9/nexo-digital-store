"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Search, LayoutGrid, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Explorar", href: "/discover", icon: Search },
  { label: "Categorias", href: "/categories", icon: LayoutGrid },
  { label: "Chat", href: "/chat", icon: MessageSquare },
  { label: "Perfil", href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 h-16",
        "bg-[#141419]/85 backdrop-blur-xl border-t border-[#2A2A35]"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="h-full flex items-center justify-around px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          return (
            <motion.button
              key={tab.href}
              onClick={() => router.push(tab.href)}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl transition-colors",
                active ? "text-[#3B82F6]" : "text-[#475569]"
              )}
              aria-label={tab.label}
            >
              <tab.icon
                className={cn("w-5 h-5", active && "drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]")}
                strokeWidth={active ? 2.5 : 1.5}
              />
              <span
                className={cn(
                  "text-[0.625rem] font-semibold leading-none tracking-wide",
                  active ? "text-[#F1F5F9]" : "text-[#475569]"
                )}
              >
                {tab.label}
              </span>
              {active && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-0.5 w-1 h-1 rounded-full bg-[#3B82F6]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}

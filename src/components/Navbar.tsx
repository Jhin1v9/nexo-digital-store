"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Zap } from "lucide-react";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const router = useRouter();
  const { direction, isAtTop } = useScrollDirection({ threshold: 60 });
  const addToast = useUIStore((s) => s.addToast);

  const isVisible = direction !== "down" || isAtTop;

  const handleNotificationClick = () => {
    addToast({
      type: "info",
      title: "Notificacoes",
      message: "Notificacoes em breve!",
      duration: 3000,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -56 }}
          animate={{ y: 0 }}
          exit={{ y: -56 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4",
            "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5"
          )}
        >
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 select-none active:scale-95 transition-transform"
            aria-label="Ir para inicio"
          >
            <Zap className="w-6 h-6 text-[#3B82F6]" strokeWidth={2.5} />
            <span className="text-lg font-extrabold text-[#F1F5F9] tracking-tight">
              NEXO
            </span>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/search")}
              className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/5 transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5 text-[#94A3B8]" />
            </button>
            <button
              onClick={handleNotificationClick}
              className="relative w-10 h-10 flex items-center justify-center rounded-full active:bg-white/5 transition-colors"
              aria-label="Notificacoes"
            >
              <Bell className="w-5 h-5 text-[#94A3B8]" />
              {/* Red dot badge */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

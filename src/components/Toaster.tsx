"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const borderColors = {
  success: "border-l-[#10B981]",
  error: "border-l-[#EF4444]",
  info: "border-l-[#3B82F6]",
  warning: "border-l-[#F59E0B]",
};

export function Toaster() {
  const toasts = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  return (
    <div className="fixed top-4 left-0 right-0 z-[70] flex flex-col items-center gap-2 pointer-events-none px-4">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn(
                "pointer-events-auto w-full max-w-sm",
                "bg-[#141419] border border-[#2A2A35] border-l-4 rounded-xl p-3 shadow-lg",
                borderColors[toast.type]
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", `text-[${getColor(toast.type)}]`)} style={{ color: getColorValue(toast.type) }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#F1F5F9]">{toast.title}</p>
                  {toast.message && (
                    <p className="text-xs text-[#94A3B8] mt-0.5">{toast.message}</p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-3.5 h-3.5 text-[#475569]" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function getColor(type: keyof typeof icons): string {
  const colors: Record<string, string> = {
    success: "#10B981",
    error: "#EF4444",
    info: "#3B82F6",
    warning: "#F59E0B",
  };
  return colors[type] ?? "#3B82F6";
}

function getColorValue(type: keyof typeof icons): string {
  const colors: Record<string, string> = {
    success: "#10B981",
    error: "#EF4444",
    info: "#3B82F6",
    warning: "#F59E0B",
  };
  return colors[type] ?? "#3B82F6";
}

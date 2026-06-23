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

const styles = {
  success: "border-l-success bg-surface-secondary",
  error: "border-l-error bg-surface-secondary",
  info: "border-l-primary bg-surface-secondary",
  warning: "border-l-warning bg-surface-secondary",
};

const iconColors = {
  success: "text-success",
  error: "text-error",
  info: "text-primary",
  warning: "text-warning",
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
                "border border-border-default border-l-4 rounded-xl p-3 shadow-lg shadow-black/5",
                styles[toast.type]
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", iconColors[toast.type])} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{toast.title}</p>
                  {toast.message && (
                    <p className="text-xs text-text-secondary mt-0.5">{toast.message}</p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-surface-tertiary transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-3.5 h-3.5 text-text-muted" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

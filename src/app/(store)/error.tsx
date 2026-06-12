"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex flex-col items-center gap-5"
      >
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#F1F5F9]">
            Algo deu errado
          </h2>
          <p className="text-sm text-[#94A3B8] mt-1 max-w-xs">
            Ocorreu um erro inesperado. Tente novamente em alguns instantes.
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={reset}
          className="flex items-center gap-2 h-11 px-5 rounded-2xl bg-[#3B82F6] text-white font-medium text-sm hover:bg-[#2563EB] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Tentar novamente
        </motion.button>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-4 text-left w-full max-w-sm">
            <summary className="text-xs text-[#475569] cursor-pointer hover:text-[#94A3B8] transition-colors">
              Detalhes do erro
            </summary>
            <pre className="mt-2 p-3 rounded-xl bg-[#141419] border border-[#2A2A35] text-[10px] text-red-400 overflow-auto max-h-40">
              {error.message}
              {error.stack && (
                <>
                  {"\n\n"}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}
      </motion.div>
    </div>
  );
}

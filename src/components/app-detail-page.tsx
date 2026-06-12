"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Download, Play } from "lucide-react";
import { AppProduct } from "@/types/app";
import { mockApi } from "@/lib/api-client";
import { cn } from "@/lib/utils";

export function AppDetailPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [app, setApp] = useState<AppProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getApp(slug).then((a) => {
      setApp(a);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="h-14 border-b border-[#2A2A35]" />
        <div className="p-4 space-y-4">
          <div className="h-20 bg-[#1E1E24] rounded-2xl animate-pulse" />
          <div className="h-40 bg-[#1E1E24] rounded-2xl animate-pulse" />
          <div className="h-6 w-3/4 bg-[#1E1E24] rounded animate-pulse" />
          <div className="h-6 w-1/2 bg-[#1E1E24] rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <p className="text-sm text-[#94A3B8]">App nao encontrado</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 h-10 px-4 rounded-xl bg-[#3B82F6] text-white text-sm font-medium"
        >
          Voltar ao inicio
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-[#2A2A35]">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ArrowLeft className="w-5 h-5 text-[#94A3B8]" />
        </button>
        <h1 className="text-base font-semibold text-[#F1F5F9] truncate">{app.name}</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* App header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/10 flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-[#3B82F6]">{app.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-[#F1F5F9]">{app.name}</h2>
            <p className="text-sm text-[#94A3B8]">{app.subtitle}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />
                <span className="text-xs text-[#F1F5F9] font-medium">{app.rating}</span>
              </div>
              <span className="text-xs text-[#475569]">({app.reviewCount} avaliacoes)</span>
              <span className="text-xs text-[#475569]">{app.downloadCount.toLocaleString()} downloads</span>
            </div>
          </div>
        </motion.div>

        {/* Screenshots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-semibold text-[#F1F5F9] mb-3">Capturas de tela</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {app.screenshots.map((src, i) => (
              <div
                key={i}
                className="w-[200px] h-[360px] rounded-2xl bg-[#141419] border border-[#2A2A35] overflow-hidden shrink-0 snap-start flex items-center justify-center"
              >
                <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover object-center opacity-60" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-[#F1F5F9] mb-2">Sobre</h3>
          <p className="text-sm text-[#94A3B8] leading-relaxed">{app.description}</p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-[#F1F5F9] mb-3">Funcionalidades</h3>
          <div className="space-y-2">
            {app.features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                <span className="text-sm text-[#94A3B8]">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm font-semibold text-[#F1F5F9] mb-3">Tecnologias</h3>
          <div className="flex flex-wrap gap-2">
            {app.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#141419] border border-[#2A2A35] text-[#94A3B8]"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3 pt-4 pb-6"
        >
          <button
            onClick={() => {
              if (app.demoUrl?.startsWith("http")) {
                window.open(app.demoUrl, "_blank", "noopener,noreferrer");
              }
            }}
            disabled={!app.demoUrl?.startsWith("http")}
            className={cn(
              "flex-1 h-12 rounded-2xl flex items-center justify-center gap-2",
              "bg-[#141419] border border-[#3B82F6] text-[#3B82F6] font-medium text-sm",
              "hover:bg-[#3B82F6]/10 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            )}
          >
            <Play className="w-4 h-4" />
            Ver Demo
          </button>
          <button
            onClick={() => router.push(`/request?app=${app.slug}`)}
            className={cn(
              "flex-1 h-12 rounded-2xl flex items-center justify-center gap-2",
              "bg-[#3B82F6] text-white font-medium text-sm",
              "hover:bg-[#2563EB] transition-colors"
            )}
          >
            <Download className="w-4 h-4" />
            Instalar
          </button>
        </motion.div>
      </div>
    </div>
  );
}

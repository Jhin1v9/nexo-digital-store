"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppProduct } from "@/types/app";
import { mockApi } from "@/lib/api-client";

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 1) {
        setLoading(true);
        const r = await mockApi.getApps({ search: query, limit: "10" });
        setResults(r.apps);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0A0A0F]">
      {/* Search header */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-[#2A2A35] shrink-0">
        <button onClick={() => router.push("/")} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ArrowLeft className="w-5 h-5 text-[#94A3B8]" />
        </button>
        <div className="flex-1 flex items-center gap-2 bg-[#141419] rounded-xl px-3 h-10 border border-[#2A2A35]">
          <Search className="w-4 h-4 text-[#475569] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar apps, categorias..."
            className="flex-1 bg-transparent text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X className="w-4 h-4 text-[#475569]" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-[#1E1E24] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : query.trim().length > 1 ? (
          results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs text-[#94A3B8] mb-3">{results.length} resultados</p>
              {results.map((app) => (
                <button
                  key={app.id}
                  onClick={() => router.push(`/app/${app.slug}`)}
                  className="flex items-center gap-3 w-full p-3 rounded-2xl bg-[#141419] border border-[#2A2A35] text-left active:scale-[0.98] transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/10 flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-[#3B82F6]">{app.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#F1F5F9] truncate">{app.name}</h3>
                    <p className="text-xs text-[#94A3B8] truncate">{app.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="w-12 h-12 text-[#475569] mb-4" />
              <p className="text-sm font-medium text-[#94A3B8]">Nenhum resultado</p>
              <p className="text-xs text-[#475569] mt-1">Tente buscar por outro termo</p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="w-12 h-12 text-[#475569] mb-4" />
            <p className="text-sm font-medium text-[#94A3B8]">Busque por apps</p>
            <p className="text-xs text-[#475569] mt-1">Digite pelo menos 2 caracteres</p>
          </div>
        )}
      </div>
    </div>
  );
}

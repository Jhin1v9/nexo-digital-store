"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppProduct } from "@/types/app";
import { mockApi } from "@/lib/api-client";
import { getAppsByCategory } from "@/lib/mock-data";

const categoryNames: Record<string, string> = {
  tpv: "TPVs",
  saas: "SaaS",
  web: "Websites",
  app: "Apps Mobile",
  program: "Programas",
  custom: "Personalizado",
  clinics: "Clinicas",
  retail: "Varejo",
  food: "Alimentacao",
};

export function CategoryDetailPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [apps, setApps] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const filtered = getAppsByCategory(slug);
      if (filtered.length > 0) {
        setApps(filtered);
      } else {
        const result = await mockApi.getApps();
        setApps(result.apps);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  const name = categoryNames[slug] ?? slug;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 px-4 h-14 border-b border-[#2A2A35]">
        <button onClick={() => router.push("/categories")} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ArrowLeft className="w-5 h-5 text-[#94A3B8]" />
        </button>
        <h1 className="text-base font-semibold text-[#F1F5F9]">{name}</h1>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-[#1E1E24] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : apps.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => router.push(`/app/${app.slug}`)}
                className="flex flex-col p-3 rounded-2xl bg-[#141419] border border-[#2A2A35] text-left active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/10 flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-[#3B82F6]">{app.name.charAt(0)}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#F1F5F9] truncate">{app.name}</h3>
                <p className="text-[10px] text-[#94A3B8] mt-0.5 truncate">{app.subtitle}</p>
                <span className="text-xs text-[#3B82F6] mt-1 font-medium">
                  {app.pricing === "free" ? "Gratis" : app.pricing === "subscription" ? `€${app.price}/mes` : app.pricing === "quote" ? "Sob consulta" : `€${app.price}`}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-[#94A3B8]">Nenhum app nesta categoria</p>
          </div>
        )}
      </div>
    </div>
  );
}

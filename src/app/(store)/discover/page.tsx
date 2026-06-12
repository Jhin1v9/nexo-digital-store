"use client";

import { useEffect, useState } from "react";
import { AppProduct } from "@/types/app";
import { mockApi } from "@/lib/api-client";

export default function DiscoverPage() {
  const [apps, setApps] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getApps({ limit: "20" }).then((r) => {
      setApps(r.apps);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full px-4 pt-4">
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-6">Explorar</h1>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-[#1E1E24] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#141419] border border-[#2A2A35]"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-[#3B82F6]">{app.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#F1F5F9] truncate">{app.name}</h3>
                <p className="text-xs text-[#94A3B8] truncate">{app.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

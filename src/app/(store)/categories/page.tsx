"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/types/app";
import { mockApi } from "@/lib/api-client";
import { CreditCard, Cloud, Globe, Smartphone, Monitor, Settings, Heart, ShoppingBag, UtensilsCrossed } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  CreditCard, Cloud, Globe, Smartphone, Monitor, Settings, Heart, ShoppingBag, UtensilsCrossed,
};

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    mockApi.getCategories().then(setCategories);
  }, []);

  return (
    <div className="w-full px-4 pt-4">
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-6">Categorias</h1>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Settings;
          return (
            <button
              key={cat.id}
              onClick={() => router.push(`/category/${cat.slug}`)}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#141419] border border-[#2A2A35] active:scale-95 transition-transform"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}20` }}
              >
                <Icon className="w-6 h-6" style={{ color: cat.color }} />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-[#F1F5F9]">{cat.name}</h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">{cat.count} apps</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

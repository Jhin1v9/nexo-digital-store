"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/types/app";
import { mockApi } from "@/lib/api-client";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Cloud,
  Globe,
  Smartphone,
  Monitor,
  Settings,
  Heart,
  ShoppingBag,
  UtensilsCrossed,
  Briefcase,
  ShoppingCart,
  Image,
  Layout,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  CreditCard,
  Cloud,
  Globe,
  Smartphone,
  Monitor,
  Settings,
  Heart,
  ShoppingBag,
  UtensilsCrossed,
  Briefcase,
  ShoppingCart,
  Image,
  Layout,
};

export default function CategoriesPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    mockApi.getCategories().then(setCategories);
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 tracking-tight">
        {t("categories.title")}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Settings;
          return (
            <button
              key={cat.id}
              onClick={() => router.push(`/category/${cat.slug}`)}
              className={cn(
                "flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface-secondary border border-border-default",
                "active:scale-95 hover:bg-surface-tertiary hover:border-border-strong transition-all"
              )}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                <Icon className="w-6 h-6" style={{ color: cat.color }} />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-text-primary">{t(`categories.${cat.slug}` as keyof typeof t)}</h3>
                <p className="text-xs text-text-secondary mt-0.5">{cat.count} apps</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

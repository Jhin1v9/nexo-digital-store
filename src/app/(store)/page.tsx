"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard, Cloud, Globe, Smartphone, Heart,
  ShoppingBag, UtensilsCrossed, LayoutGrid, Star,
  ChevronRight, Sparkles,
} from "lucide-react";
import { AppProduct } from "@/types/app";
import { mockApi } from "@/lib/api-client";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const categoryIcons: Record<string, React.ElementType> = {
  CreditCard, Cloud, Globe, Smartphone, Heart, ShoppingBag, UtensilsCrossed, LayoutGrid,
};

const categoryPills = [
  { label: "TPVs", icon: "CreditCard", href: "/category/tpv" },
  { label: "SaaS", icon: "Cloud", href: "/category/saas" },
  { label: "Webs", icon: "Globe", href: "/category/web" },
  { label: "Apps", icon: "Smartphone", href: "/category/app" },
  { label: "Clinicas", icon: "Heart", href: "/category/clinics" },
  { label: "Retail", icon: "ShoppingBag", href: "/category/retail" },
  { label: "Food", icon: "UtensilsCrossed", href: "/category/food" },
  { label: "Todos", icon: "LayoutGrid", href: "/discover" },
];

function formatDownloads(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

// ---- Skeleton ----
function SkeletonCard() {
  return (
    <div className="w-[140px] shrink-0">
      <div className="w-[140px] h-[140px] rounded-2xl bg-[#1E1E24] animate-pulse" />
      <div className="mt-2 h-3.5 w-24 bg-[#1E1E24] rounded animate-pulse" />
      <div className="mt-1 h-3 w-16 bg-[#1E1E24] rounded animate-pulse" />
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="flex gap-3 overflow-hidden px-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// ---- App Card ----
function AppCard({ app, index }: { app: AppProduct; index?: number }) {
  const router = useRouter();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index ?? 0) * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      whileTap={{ scale: 0.96 }}
      onClick={() => router.push(`/app/${app.slug}`)}
      className={cn(
        "w-[140px] shrink-0 flex flex-col items-start",
        "bg-[#141419] border border-[#2A2A35] rounded-2xl p-3",
        "hover:border-[#3B82F6]/40 transition-colors text-left"
      )}
    >
      {/* Icon placeholder */}
      <div className="w-16 h-16 rounded-[14px] bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/10 flex items-center justify-center mb-2.5">
        <span className="text-xl font-bold text-[#3B82F6]">{app.name.charAt(0)}</span>
      </div>
      <h3 className="text-sm font-semibold text-[#F1F5F9] truncate w-full">{app.name}</h3>
      <span className="text-[10px] font-medium text-[#10B981] mt-0.5 uppercase tracking-wide">
        {app.type.toUpperCase()}
      </span>
      <span className="text-xs text-[#94A3B8] mt-1">
        {app.pricing === "free"
          ? "Gratis"
          : app.pricing === "subscription"
          ? `€${app.price}/mes`
          : app.pricing === "quote"
          ? "Sob consulta"
          : `€${app.price}`}
      </span>
    </motion.button>
  );
}

// ---- Section Header ----
function SectionHeader({ title, href }: { title: string; href: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between px-4 mb-5">
      <h2 className="text-xl font-semibold text-[#F1F5F9] tracking-tight">{title}</h2>
      <button
        onClick={() => router.push(href)}
        className="text-xs font-medium text-[#3B82F6] flex items-center gap-0.5 hover:underline"
      >
        Ver Tudo <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}

// ---- Hero Section ----
function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative w-full px-5 pt-10 pb-6 text-center overflow-hidden">
      {/* Glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 60%)",
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
        className="relative text-[2.5rem] font-extrabold text-[#F1F5F9] leading-[1.1] tracking-[-0.03em]"
      >
        Tu negocio,
        <br />
        potenciado.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.4 }}
        className="relative text-sm text-[#94A3B8] mt-3 leading-relaxed max-w-xs mx-auto"
      >
        Descubre apps profesionales para tu empresa.
        <br />
        Desde TPVs hasta SaaS — listas para instalar.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.6 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => router.push("/discover")}
        className={cn(
          "relative mt-5 h-12 px-7 rounded-3xl",
          "bg-[#3B82F6] text-white font-semibold text-base",
          "hover:bg-[#60A5FA] transition-colors",
          "shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_24px_rgba(59,130,246,0.4)]"
        )}
      >
        Explorar Ahora
      </motion.button>
    </section>
  );
}

// ---- Category Pills ----
function CategoryPillsSection() {
  const router = useRouter();

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full mt-4 px-4"
    >
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1 scroll-snap-x mandatory">
        {categoryPills.map((pill) => {
          const Icon = categoryIcons[pill.icon] ?? LayoutGrid;
          return (
            <motion.button
              key={pill.label}
              variants={fadeUp}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => router.push(pill.href)}
              className={cn(
                "flex items-center gap-1.5 h-9 px-4 rounded-full shrink-0",
                "bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white",
                "text-xs font-semibold scroll-snap-align-start"
              )}
            >
              <Icon className="w-4 h-4" />
              {pill.label}
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
}

// ---- Featured Section ----
function FeaturedSection({ apps }: { apps: AppProduct[] }) {
  const router = useRouter();
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

  const heroApp = apps[0];
  const gridApps = apps.slice(1, 5);

  return (
    <section ref={ref} className="w-full mt-8 px-4">
      <SectionHeader title="Destacados" href="/discover?filter=featured" />

      {isVisible && heroApp && (
        <motion.button
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push(`/app/${heroApp.slug}`)}
          className={cn(
            "w-full h-[200px] rounded-[20px] p-5 flex flex-col items-start justify-between",
            "bg-gradient-to-br from-[#1E3A5F] via-[#0F172A] to-[#1E293B]",
            "border border-[#2A2A35] hover:border-[#3B82F6]/50 transition-all",
            "hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)]",
            "text-left mb-3"
          )}
        >
          <div>
            <span className="text-[10px] font-semibold text-[#10B981] uppercase tracking-wider">
              Destacado
            </span>
            <h3 className="text-xl font-bold text-[#F1F5F9] mt-1.5">{heroApp.name}</h3>
            <p className="text-xs text-[#94A3B8] mt-1">{heroApp.subtitle}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-semibold text-[#F1F5F9]">
              €{heroApp.price}/mes
            </span>
            <span className="text-xs font-medium text-[#3B82F6] border border-[#3B82F6] rounded-full px-3 py-1">
              Ver Detalhes
            </span>
          </div>
        </motion.button>
      )}

      {isVisible && (
        <div className="grid grid-cols-2 gap-3">
          {gridApps.map((app, i) => (
            <motion.button
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 * (i + 1) }}
              whileTap={{ scale: 0.96 }}
              onClick={() => router.push(`/app/${app.slug}`)}
              className={cn(
                "flex flex-col p-3 rounded-2xl",
                "bg-[#141419] border border-[#2A2A35]",
                "hover:border-[#3B82F6]/40 transition-colors text-left"
              )}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/10 flex items-center justify-center mb-2">
                <span className="text-lg font-bold text-[#3B82F6]">{app.name.charAt(0)}</span>
              </div>
              <h4 className="text-sm font-semibold text-[#F1F5F9] truncate">{app.name}</h4>
              <span className="text-[10px] text-[#94A3B8] mt-0.5">{app.subtitle}</span>
            </motion.button>
          ))}
        </div>
      )}
    </section>
  );
}

// ---- Horizontal Carousel ----
function CarouselSection({
  title,
  href,
  apps,
  showBadge,
}: {
  title: string;
  href: string;
  apps: AppProduct[];
  showBadge?: boolean;
}) {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="w-full mt-8">
      <SectionHeader title={title} href={href} />
      {isVisible ? (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1 scroll-snap-x mandatory">
          {apps.map((app, i) => (
            <div key={app.id} className="relative scroll-snap-align-start">
              {showBadge && (
                <span className="absolute -top-1 -right-1 z-10 text-[9px] font-bold text-white bg-[#10B981] px-1.5 py-0.5 rounded-full uppercase">
                  Novo
                </span>
              )}
              <AppCard app={app} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <SkeletonGrid />
      )}
    </section>
  );
}

// ---- Promo Section ----
function PromoSection() {
  const router = useRouter();
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.15 });

  return (
    <section ref={ref} className="w-full px-4 mt-8 mb-6">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className={cn(
            "w-full p-6 rounded-[20px] text-center",
            "bg-gradient-to-br from-[rgba(59,130,246,0.12)] to-[rgba(16,185,129,0.06)]",
            "border border-dashed border-[#3B82F6]/40"
          )}
        >
          <Sparkles className="w-10 h-10 text-[#3B82F6] mx-auto" />
          <h3 className="text-lg font-semibold text-[#F1F5F9] mt-3">
            ¿Necesitas algo a medida?
          </h3>
          <p className="text-sm text-[#94A3B8] mt-2 max-w-xs mx-auto">
            Creamos software personalizado para tu negocio.
            <br />
            Solicita tu app con tu marca y colores.
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push("/request")}
            className={cn(
              "mt-4 h-12 px-6 rounded-3xl",
              "bg-[#3B82F6] text-white font-semibold text-sm",
              "hover:bg-[#60A5FA] transition-colors",
              "shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_24px_rgba(59,130,246,0.35)]"
            )}
          >
            Solicitar App Personalizada
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}

// ---- Main Home Page ----
export default function HomePage() {
  const [apps, setApps] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const result = await mockApi.getApps({ limit: "30" });
        if (mounted) {
          setApps(result.apps);
          setLoading(false);
        }
      } catch {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  const featuredApps = apps.filter((a) =>
    ["tpv-001", "saas-001", "saas-003", "site-001", "site-002"].includes(a.id)
  );
  const newArrivals = apps.filter((a) =>
    ["saas-002", "site-003", "site-004", "app-001", "prog-001"].includes(a.id)
  );
  const popularApps = [...apps]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 8);

  if (loading) {
    return (
      <div className="w-full">
        <HeroSection />
        <div className="mt-4">
          <SkeletonGrid />
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between px-4 mb-5">
            <div className="h-5 w-32 bg-[#1E1E24] rounded animate-pulse" />
            <div className="h-3 w-12 bg-[#1E1E24] rounded animate-pulse" />
          </div>
          <SkeletonGrid />
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between px-4 mb-5">
            <div className="h-5 w-40 bg-[#1E1E24] rounded animate-pulse" />
            <div className="h-3 w-12 bg-[#1E1E24] rounded animate-pulse" />
          </div>
          <SkeletonGrid />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <HeroSection />
      <CategoryPillsSection />

      {featuredApps.length > 0 && <FeaturedSection apps={featuredApps} />}

      {newArrivals.length > 0 && (
        <CarouselSection
          title="Nuevos Lanzamientos"
          href="/discover?filter=new"
          apps={newArrivals}
          showBadge
        />
      )}

      {popularApps.length > 0 && (
        <CarouselSection
          title="Populares"
          href="/discover?filter=popular"
          apps={popularApps}
        />
      )}

      <PromoSection />
      <Footer />
    </div>
  );
}

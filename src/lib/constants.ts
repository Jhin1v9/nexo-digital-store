import { AppType, Framework, Industry, Sense, AppStatus, Pricing } from "@/types/app";

// Route paths
export const ROUTES = {
  home: "/",
  discover: "/discover",
  categories: "/categories",
  category: (slug: string) => `/category/${slug}`,
  app: (slug: string) => `/app/${slug}`,
  search: "/search",
  request: "/request",
  demo: (slug: string) => `/demo/${slug}`,
  chat: "/chat",
  profile: "/profile",
} as const;

// Navigation tabs
export const NAV_TABS = [
  { label: "Inicio", href: "/", icon: "Home" },
  { label: "Explorar", href: "/discover", icon: "Search" },
  { label: "Categorias", href: "/categories", icon: "LayoutGrid" },
  { label: "Chat", href: "/chat", icon: "MessageSquare" },
  { label: "Perfil", href: "/profile", icon: "User" },
] as const;

// Filter options
export const APP_TYPE_OPTIONS: { value: AppType | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "tpv", label: "TPV" },
  { value: "saas", label: "SaaS" },
  { value: "site", label: "Site" },
  { value: "program", label: "Programa" },
  { value: "custom", label: "Personalizado" },
  { value: "app", label: "App Mobile" },
];

export const FRAMEWORK_OPTIONS: { value: Framework | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "nextjs", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "flutter", label: "Flutter" },
  { value: "node", label: "Node.js" },
  { value: "php", label: "PHP" },
  { value: "python", label: "Python" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "other", label: "Outro" },
];

export const INDUSTRY_OPTIONS: { value: Industry | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "retail", label: "Varejo" },
  { value: "food", label: "Alimentacao" },
  { value: "health", label: "Saude" },
  { value: "construction", label: "Construcao" },
  { value: "education", label: "Educacao" },
  { value: "entertainment", label: "Entretenimento" },
  { value: "finance", label: "Financeiro" },
  { value: "other", label: "Outro" },
];

export const SENSE_OPTIONS: { value: Sense | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "sorveteria", label: "Sorveteria" },
  { value: "barbearia", label: "Barbearia" },
  { value: "clinica", label: "Clinica" },
  { value: "restaurante", label: "Restaurante" },
  { value: "loja", label: "Loja" },
  { value: "escritorio", label: "Escritorio" },
  { value: "outro", label: "Outro" },
];

export const STATUS_OPTIONS: { value: AppStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "available", label: "Disponivel" },
  { value: "beta", label: "Beta" },
  { value: "coming_soon", label: "Em breve" },
  { value: "deprecated", label: "Descontinuado" },
];

export const PRICING_OPTIONS: { value: Pricing | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "free", label: "Gratis" },
  { value: "fixed", label: "Pagamento unico" },
  { value: "subscription", label: "Assinatura" },
  { value: "quote", label: "Sob consulta" },
];

export const SORT_OPTIONS: { value: "relevance" | "rating" | "newest" | "popular"; label: string }[] = [
  { value: "relevance", label: "Relevancia" },
  { value: "rating", label: "Melhor avaliado" },
  { value: "newest", label: "Mais recente" },
  { value: "popular", label: "Mais popular" },
];

// Pagination
export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
} as const;

// API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
export const API_TIMEOUT = 10000;
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000;

// App metadata
export const APP_NAME = "NEXO Digital Store";
export const APP_DESCRIPTION = "Apps que impulsionam seu negocio. TPVs, SaaS, sites e software personalizado.";
export const APP_URL = "https://nexodigital.store";
export const APP_AUTHOR = "NEXO Digital S.L.";

// Theme (legacy reference; prefer Tailwind tokens from globals.css)
export const THEME_COLORS = {
  primary: "#3B82F6",
  primaryHover: "#2563EB",
  success: "#10B981",
  background: "#FFFFFF",
  surface: "#F9FAFB",
  surfaceTertiary: "#F3F4F6",
  borderDefault: "#E5E7EB",
  borderFocus: "#3B82F6",
  textPrimary: "#111827",
  textSecondary: "#4B5563",
  textMuted: "#6B7280",
} as const;

// Footer link groups
export const footerLinks = [
  {
    title: "footer.product",
    links: [
      { label: "footer.discover", href: "/discover" },
      { label: "footer.categories", href: "/categories" },
      { label: "footer.search", href: "/search" },
    ],
  },
  {
    title: "footer.company",
    links: [
      { label: "footer.about", href: "/about" },
      { label: "footer.request", href: "/request" },
      { label: "footer.contact", href: "/contact" },
    ],
  },
] as const;

// Category pills for home
export const CATEGORY_PILLS = [
  { label: "TPVs", icon: "CreditCard", href: "/category/tpv" },
  { label: "SaaS", icon: "Cloud", href: "/category/saas" },
  { label: "Webs", icon: "Globe", href: "/category/web" },
  { label: "Apps", icon: "Smartphone", href: "/category/app" },
  { label: "Clinicas", icon: "Heart", href: "/category/clinics" },
  { label: "Retail", icon: "ShoppingBag", href: "/category/retail" },
  { label: "Food", icon: "UtensilsCrossed", href: "/category/food" },
  { label: "Todos", icon: "LayoutGrid", href: "/discover" },
] as const;

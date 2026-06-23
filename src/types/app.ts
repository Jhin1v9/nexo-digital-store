// ===== Nexo Store core enums =====

export type AppType = "app" | "saas" | "site" | "program" | "tpv" | "custom";

export type AppStatus =
  | "available"
  | "beta"
  | "coming_soon"
  | "deprecated"
  // LP Creator QA / marketplace lifecycle
  | "sanitizing"
  | "unreviewed"
  | "approved"
  | "rejected"
  | "failed";

export type Framework =
  | "nextjs"
  | "react"
  | "flutter"
  | "node"
  | "php"
  | "python"
  | "swift"
  | "kotlin"
  | "other";

export type Industry =
  | "retail"
  | "food"
  | "health"
  | "construction"
  | "education"
  | "entertainment"
  | "finance"
  | "other";

export type Sense =
  | "sorveteria"
  | "barbearia"
  | "clinica"
  | "restaurante"
  | "loja"
  | "escritorio"
  | "outro";

export type Pricing = "free" | "fixed" | "subscription" | "quote";

// ===== LP Creator marketplace enums =====

export type TemplateCategory =
  | "business"
  | "startup"
  | "portfolio"
  | "ecommerce"
  | "saas"
  | "agency"
  | "personal"
  | "event"
  | "landing"
  | "other";

export type TemplateSource = "manual" | "generated" | "mined";

export interface VirtualPrice {
  stars: number;
  suns: number;
  moons: number;
}

export interface TemplateMetadata {
  category?: string;
  subcategory?: string;
  tags?: string[];
  niche?: string;
  audience?: string;
  difficulty?: "beginner" | "intermediate" | "advanced" | string;
  style?: string;
  colors?: string[];
  features?: string[];
  useCases?: string[];
  seoKeywords?: string[];
  badges?: string[];
  whyBuy?: string;
}

// ===== Unified product / template model =====

export interface AppProduct {
  // Core identity
  id: string;
  slug: string;
  name: string;

  // Descriptions
  subtitle: string;
  description: string;
  shortDescription: string;

  // Media
  icon: string;
  thumbnail: string;
  screenshots: string[];
  previewVideo?: string;

  // Taxonomy — Nexo Store
  type: AppType;
  framework: Framework;
  industry: Industry;
  sense: Sense;

  // Lifecycle
  status: AppStatus;
  version: string;
  releaseDate: string; // ISO date
  lastUpdate: string; // ISO date

  // Commercial
  hasDemo: boolean;
  demoUrl: string;
  repoUrl?: string;
  requestUrl: string;
  pricing: Pricing;
  price?: number;
  currency: "EUR" | "USD" | "BRL";

  // Social proof
  rating: number;
  reviewCount: number;
  downloadCount: number;

  // Content / SEO
  developer: string;
  techStack: string[];
  features: string[];
  requirements: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];

  // ===== LP Creator extensions (optional) =====
  /** Primary marketplace category when sold as a template */
  category?: TemplateCategory;
  /** Secondary marketplace category / niche */
  subcategory?: string;
  /** LP Creator stack alias, e.g. "react-tailwind" */
  stack?: string;
  /** How the item originated */
  source?: TemplateSource;
  /** Generated code assets */
  html?: string;
  css?: string;
  js?: string;
  config?: Record<string, unknown>;
  /** Virtual-currency pricing */
  virtualPrice?: VirtualPrice;
  originalVirtualPrice?: VirtualPrice;
  /** QA / publishing artifacts */
  originalHtml?: string;
  sanitizedHtml?: string;
  sanitizationLog?: string | Record<string, unknown>;
  publicPreviewToken?: string;
  promptHash?: string;
  promptCensored?: string;
  /** Link back to generation session */
  sessionId?: string;
  kimiChatUrl?: string;
  reviewedAt?: string;
  unreviewedReason?: string;
  /** Rich inferred metadata */
  metadata?: TemplateMetadata;
}

export interface ReviewReply {
  id: string;
  reviewId: string;
  responder: "developer" | "luna";
  name?: string;
  content: string;
  date: string;
  /** Link to a NEXO chat session, so Luna can answer using chat context */
  chatId?: string;
}

export interface Review {
  id: string;
  appId: string;
  author: string;
  avatar?: string;
  rating: number;
  title?: string;
  body: string;
  date: string;
  helpful: number;
  /** @deprecated Prefer `replies` for structured responses */
  developerResponse?: string;
  replies?: ReviewReply[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
  color: string;
}

export interface AppFilter {
  type?: AppType | "all";
  framework?: Framework | "all";
  industry?: Industry | "all";
  sense?: Sense | "all";
  status?: AppStatus | "all";
  pricing?: Pricing | "all";
  category?: TemplateCategory | "all";
  subcategory?: string;
  source?: TemplateSource | "all";
  search?: string;
  sortBy?: "relevance" | "rating" | "newest" | "popular";
}

export interface PaginatedApps {
  apps: AppProduct[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

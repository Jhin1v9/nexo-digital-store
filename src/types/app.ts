export type AppType = "app" | "saas" | "site" | "program" | "tpv" | "custom";
export type AppStatus = "available" | "beta" | "coming_soon" | "deprecated";
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

export interface AppProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  icon: string;
  thumbnail: string;
  screenshots: string[];
  previewVideo?: string;
  type: AppType;
  framework: Framework;
  industry: Industry;
  sense: Sense;
  status: AppStatus;
  version: string;
  releaseDate: string;
  lastUpdate: string;
  hasDemo: boolean;
  demoUrl: string;
  repoUrl?: string;
  requestUrl: string;
  pricing: Pricing;
  price?: number;
  currency: "EUR" | "USD" | "BRL";
  rating: number;
  reviewCount: number;
  downloadCount: number;
  developer: string;
  techStack: string[];
  features: string[];
  requirements: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
}

export interface Review {
  id: string;
  appId: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  helpful: number;
  developerResponse?: string;
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

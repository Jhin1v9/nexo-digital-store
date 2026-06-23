import {
  AppProduct,
  AppType,
  Framework,
  Industry,
  Sense,
  AppStatus,
  Pricing,
  TemplateCategory,
  TemplateSource,
  TemplateMetadata,
  VirtualPrice,
} from "@/types/app";

/**
 * Raw LP Creator template shape (loosely typed on purpose — the LP DB
 * can evolve without breaking the store adapter).
 */
export interface LPCTemplate {
  id: string;
  name: string;
  description?: string;
  category?: string;
  subcategory?: string;
  stack?: string;
  thumbnail_url?: string;
  html?: string;
  css?: string;
  js?: string;
  config?: Record<string, unknown>;
  tags?: string;
  source?: string;
  usage_count?: number;
  uses?: number;
  rating?: number;
  is_public?: number;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  price_stars?: number;
  price_suns?: number;
  price_moons?: number;
  original_price_stars?: number;
  original_price_suns?: number;
  original_price_moons?: number;
  status?: string;
  original_html?: string;
  sanitized_html?: string;
  sanitization_log?: string | Record<string, unknown>;
  public_preview_token?: string;
  prompt_hash?: string;
  prompt_censored?: string;
  session_id?: string;
  kimi_chat_url?: string;
  reviewed_at?: string;
  unreviewed_reason?: string;
  metadata_json?: string | TemplateMetadata;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseTags(tags?: string): string[] {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function parseMetadata(json?: string | TemplateMetadata): TemplateMetadata | undefined {
  if (!json) return undefined;
  if (typeof json === "object") return json;
  try {
    return JSON.parse(json) as TemplateMetadata;
  } catch {
    return undefined;
  }
}

function inferAppType(category?: string): AppType {
  const c = category?.toLowerCase();
  if (c === "saas") return "saas";
  if (c === "ecommerce" || c === "business") return "site";
  if (c === "portfolio" || c === "landing" || c === "agency" || c === "startup" || c === "event" || c === "personal")
    return "site";
  return "site";
}

function inferFramework(stack?: string): Framework {
  const s = stack?.toLowerCase() ?? "";
  if (s.includes("nextjs") || s.includes("next.js")) return "nextjs";
  if (s.includes("react")) return "react";
  if (s.includes("flutter")) return "flutter";
  if (s.includes("node")) return "node";
  if (s.includes("php")) return "php";
  if (s.includes("python")) return "python";
  if (s.includes("swift")) return "swift";
  if (s.includes("kotlin")) return "kotlin";
  return "other";
}

function inferIndustry(category?: string, subcategory?: string, metadata?: TemplateMetadata): Industry {
  const text = `${category ?? ""} ${subcategory ?? ""} ${metadata?.niche ?? ""}`.toLowerCase();
  if (text.includes("restaurant") || text.includes("food") || text.includes("cafe") || text.includes("coffee") || text.includes("bakery") || text.includes("gelato") || text.includes("pizza"))
    return "food";
  if (text.includes("clinic") || text.includes("health") || text.includes("medical") || text.includes("dental") || text.includes("fisioterapia") || text.includes("farmacia") || text.includes("beauty") || text.includes("academia"))
    return "health";
  if (text.includes("shop") || text.includes("store") || text.includes("retail") || text.includes("boutique") || text.includes("ecommerce") || text.includes("moda") || text.includes("brinquedo"))
    return "retail";
  if (text.includes("construction") || text.includes("construcao") || text.includes("obra") || text.includes("reforma"))
    return "construction";
  if (text.includes("education") || text.includes("course") || text.includes("school") || text.includes("curso") || text.includes("escola"))
    return "education";
  if (text.includes("finance") || text.includes("fintech") || text.includes("billing") || text.includes("faturacao"))
    return "finance";
  if (text.includes("entertainment") || text.includes("game") || text.includes("jogo"))
    return "entertainment";
  return "other";
}

function inferSense(subcategory?: string, metadata?: TemplateMetadata): Sense {
  const text = `${subcategory ?? ""} ${metadata?.niche ?? ""}`.toLowerCase();
  if (text.includes("sorvet") || text.includes("gelato") || text.includes("ice cream")) return "sorveteria";
  if (text.includes("barbearia") || text.includes("barber")) return "barbearia";
  if (text.includes("clinic") || text.includes("clinica") || text.includes("health") || text.includes("dental") || text.includes("medical") || text.includes("fisioterapia") || text.includes("farmacia") || text.includes("beauty"))
    return "clinica";
  if (text.includes("restaurant") || text.includes("restaurante") || text.includes("cafeteria") || text.includes("lanchonete") || text.includes("hamburgueria") || text.includes("pizza") || text.includes("food"))
    return "restaurante";
  if (text.includes("shop") || text.includes("store") || text.includes("loja") || text.includes("boutique") || text.includes("ecommerce") || text.includes("moda"))
    return "loja";
  if (text.includes("office") || text.includes("escritorio") || text.includes("advogado") || text.includes("agency") || text.includes("agencia"))
    return "escritorio";
  return "outro";
}

function normalizeStatus(status?: string): AppStatus {
  switch (status?.toLowerCase()) {
    case "available":
    case "approved":
      return "available";
    case "beta":
      return "beta";
    case "coming_soon":
    case "unreviewed":
    case "sanitizing":
      return "coming_soon";
    case "deprecated":
    case "rejected":
    case "failed":
      return "deprecated";
    default:
      return "available";
  }
}

function normalizeSource(source?: string): TemplateSource {
  if (source === "manual" || source === "generated" || source === "mined") return source;
  return "manual";
}

function normalizeCategory(category?: string): TemplateCategory {
  const c = category?.toLowerCase();
  const valid: TemplateCategory[] = [
    "business",
    "startup",
    "portfolio",
    "ecommerce",
    "saas",
    "agency",
    "personal",
    "event",
    "landing",
    "other",
  ];
  if (valid.includes(c as TemplateCategory)) return c as TemplateCategory;
  return "other";
}

export function adaptLPCTemplateToAppProduct(template: LPCTemplate): AppProduct {
  const metadata = parseMetadata(template.metadata_json);
  const category = normalizeCategory(template.category);
  const subcategory = template.subcategory ?? metadata?.subcategory;
  const type = inferAppType(template.category);
  const framework = inferFramework(template.stack);
  const industry = inferIndustry(template.category, subcategory, metadata);
  const sense = inferSense(subcategory, metadata);
  const status = normalizeStatus(template.status);
  const source = normalizeSource(template.source);
  const slug = `${slugify(template.name)}-template`;
  const price =
    template.price_stars ?? template.price_suns ?? template.price_moons
      ? 0
      : undefined;

  const tags = [...new Set([...parseTags(template.tags), ...(metadata?.tags ?? [])])];
  const keywords = [...new Set([template.name, ...(metadata?.seoKeywords ?? []), category, subcategory].filter((x): x is string => Boolean(x)))];

  const now = new Date().toISOString().split("T")[0];
  const releaseDate = template.created_at ? template.created_at.split("T")[0] : now;
  const lastUpdate = template.updated_at ? template.updated_at.split("T")[0] : releaseDate;

  const virtualPrice: VirtualPrice | undefined =
    template.price_stars != null || template.price_suns != null || template.price_moons != null
      ? {
          stars: template.price_stars ?? 0,
          suns: template.price_suns ?? 0,
          moons: template.price_moons ?? 0,
        }
      : undefined;

  const originalVirtualPrice: VirtualPrice | undefined =
    template.original_price_stars != null ||
    template.original_price_suns != null ||
    template.original_price_moons != null
      ? {
          stars: template.original_price_stars ?? 0,
          suns: template.original_price_suns ?? 0,
          moons: template.original_price_moons ?? 0,
        }
      : undefined;

  return {
    id: template.id,
    slug,
    name: template.name,
    subtitle: metadata?.useCases?.[0] ?? template.description?.slice(0, 80) ?? "",
    description: template.description ?? "",
    shortDescription: template.description?.slice(0, 120) ?? "",
    icon: template.thumbnail_url ?? `/icons/${slug}.svg`,
    thumbnail: template.thumbnail_url ?? `/thumbnails/${slug}.jpg`,
    screenshots: template.thumbnail_url ? [template.thumbnail_url] : ["/screenshot-placeholder.jpg"],
    type,
    framework,
    industry,
    sense,
    status,
    version: "1.0.0",
    releaseDate,
    lastUpdate,
    hasDemo: Boolean(template.public_preview_token),
    demoUrl: template.public_preview_token
      ? `/preview/${template.public_preview_token}`
      : `/demo/${slug}`,
    repoUrl: undefined,
    requestUrl: `/request?template=${slug}`,
    pricing: virtualPrice ? "fixed" : "free",
    price,
    currency: "EUR",
    rating: template.rating ?? 0,
    reviewCount: 0,
    downloadCount: template.usage_count ?? template.uses ?? 0,
    developer: template.created_by ?? "NEXO Community",
    techStack: template.stack ? template.stack.split("-").map((s) => s.trim()) : [],
    features: metadata?.features ?? [],
    requirements: ["Navegador moderno", "Conexão internet"],
    metaTitle: `${template.name} — Template | NEXO Store`,
    metaDescription: template.description?.slice(0, 160) ?? "",
    keywords,
    tags,
    category,
    subcategory,
    stack: template.stack,
    source,
    html: template.html,
    css: template.css,
    js: template.js,
    config: template.config,
    virtualPrice,
    originalVirtualPrice,
    originalHtml: template.original_html,
    sanitizedHtml: template.sanitized_html,
    sanitizationLog: template.sanitization_log,
    publicPreviewToken: template.public_preview_token,
    promptHash: template.prompt_hash,
    promptCensored: template.prompt_censored,
    sessionId: template.session_id,
    kimiChatUrl: template.kimi_chat_url,
    reviewedAt: template.reviewed_at,
    unreviewedReason: template.unreviewed_reason,
    metadata,
  };
}

export function adaptLPCTemplates(templates: LPCTemplate[]): AppProduct[] {
  return templates.map(adaptLPCTemplateToAppProduct);
}

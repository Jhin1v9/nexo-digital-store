import { API_BASE_URL, API_TIMEOUT, API_RETRY_ATTEMPTS, API_RETRY_DELAY } from "@/lib/constants";

class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "APIError";
  }
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

async function fetchWithTimeout(
  url: string,
  options: RequestOptions = {}
): Promise<Response> {
  const { timeout = API_TIMEOUT, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function request<T>(
  method: string,
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const retries = options.retries ?? API_RETRY_ATTEMPTS;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, {
        ...options,
        method,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new APIError(
          response.status,
          errorData.message ?? `HTTP ${response.status}`,
          errorData
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return (await response.json()) as T;
      }
      return (await response.text()) as unknown as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < retries) {
        const backoffDelay = API_RETRY_DELAY * Math.pow(2, attempt);
        await delay(backoffDelay);
        continue;
      }

      break;
    }
  }

  throw lastError ?? new Error("Request failed");
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
    request<T>("GET", endpoint, options),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> =>
    request<T>("POST", endpoint, {
      ...options,
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> =>
    request<T>("PUT", endpoint, {
      ...options,
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
    request<T>("DELETE", endpoint, options),
};

export { APIError };

// ===== Mock API functions =====
import { mockApps, mockCategories, getAppBySlug } from "@/lib/mock-data";
import { getReviewStore } from "@/lib/review-store";
import { notifyTelegramReview } from "@/lib/telegram";
import { AppProduct, Review, Category, AppFilter, PaginatedApps } from "@/types/app";
import { WhiteLabelConfigInput } from "@/lib/validators";
import { ContactFormInput, ReviewFormInput } from "@/lib/validators";

const MOCK_DELAY = 300;

function isClient() {
  return typeof window !== "undefined";
}

function buildQueryString(filters?: Record<string, string | number | undefined>): string {
  const params = new URLSearchParams();
  if (!filters) return "";
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== "all") {
      params.set(key, String(value));
    }
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

async function fetchApps(endpoint: string): Promise<PaginatedApps> {
  const res = await fetch(endpoint, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as PaginatedApps;
}

async function fetchAppBySlug(slug: string): Promise<AppProduct | null> {
  const res = await fetch(`/api/app/${slug}/`, { headers: { Accept: "application/json" } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as AppProduct;
}

export const mockApi = {
  // Apps / Templates (unified)
  getApps: async (filters?: AppFilter & { page?: number; limit?: string }): Promise<PaginatedApps> => {
    if (isClient()) {
      return fetchApps(`/api/apps/${buildQueryString(filters as Record<string, string | number | undefined>)}`);
    }
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    let apps = [...mockApps];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      apps = apps.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.keywords.some((k) => k.toLowerCase().includes(q)) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.techStack.some((t) => t.toLowerCase().includes(q)) ||
          a.features.some((f) => f.toLowerCase().includes(q))
      );
    }
    if (filters?.type && filters.type !== "all") apps = apps.filter((a) => a.type === filters.type);
    if (filters?.framework && filters.framework !== "all") apps = apps.filter((a) => a.framework === filters.framework);
    if (filters?.industry && filters.industry !== "all") apps = apps.filter((a) => a.industry === filters.industry);
    if (filters?.sense && filters.sense !== "all") apps = apps.filter((a) => a.sense === filters.sense);
    if (filters?.status && filters.status !== "all") apps = apps.filter((a) => a.status === filters.status);
    if (filters?.pricing && filters.pricing !== "all") apps = apps.filter((a) => a.pricing === filters.pricing);
    if (filters?.category && filters.category !== "all")
      apps = apps.filter((a) => a.category === filters.category);
    if (filters?.subcategory)
      apps = apps.filter((a) => a.subcategory?.toLowerCase() === filters.subcategory?.toLowerCase());
    if (filters?.source && filters.source !== "all") apps = apps.filter((a) => a.source === filters.source);

    const sortBy = filters?.sortBy ?? "relevance";
    if (sortBy === "rating") apps.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "newest") apps.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    else if (sortBy === "popular") apps.sort((a, b) => b.downloadCount - a.downloadCount);

    const limit = parseInt(filters?.limit ?? "20", 10);
    const page = filters?.page ?? 1;
    const start = (page - 1) * limit;
    const paginated = apps.slice(start, start + limit);

    return {
      apps: paginated,
      total: apps.length,
      page,
      totalPages: Math.ceil(apps.length / limit),
      hasMore: start + limit < apps.length,
    };
  },

  getTemplates: async (filters?: Omit<AppFilter, "type"> & { page?: number; limit?: string }): Promise<PaginatedApps> => {
    if (isClient()) {
      return fetchApps(`/api/apps/${buildQueryString({ ...filters, source: filters?.source ?? "manual" })}`);
    }
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    let templates = mockApps.filter((a) => a.source === "manual" || a.source === "generated" || a.source === "mined");

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      templates = templates.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (filters?.category && filters.category !== "all")
      templates = templates.filter((a) => a.category === filters.category);
    if (filters?.subcategory)
      templates = templates.filter((a) => a.subcategory?.toLowerCase() === filters.subcategory?.toLowerCase());
    if (filters?.source && filters.source !== "all")
      templates = templates.filter((a) => a.source === filters.source);

    const sortBy = filters?.sortBy ?? "newest";
    if (sortBy === "rating") templates.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "newest") templates.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    else if (sortBy === "popular") templates.sort((a, b) => b.downloadCount - a.downloadCount);

    const limit = parseInt(filters?.limit ?? "20", 10);
    const page = filters?.page ?? 1;
    const start = (page - 1) * limit;
    const paginated = templates.slice(start, start + limit);

    return {
      apps: paginated,
      total: templates.length,
      page,
      totalPages: Math.ceil(templates.length / limit),
      hasMore: start + limit < templates.length,
    };
  },

  getApp: async (slug: string): Promise<AppProduct | null> => {
    if (isClient()) {
      return fetchAppBySlug(slug);
    }
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    return getAppBySlug(slug) ?? null;
  },

  // Reviews
  getReviews: async (appId?: string): Promise<Review[]> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    return getReviewStore().getReviews(appId ? { appId } : undefined);
  },

  createReview: async (data: ReviewFormInput & { appId: string }): Promise<Review> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    const store = getReviewStore();
    const review = await store.createReview({
      appId: data.appId,
      author: data.author,
      rating: data.rating,
      title: data.title,
      body: data.body,
    });

    // Notify Luna via Telegram (fire-and-forget)
    const app = getAppBySlug(data.appId) ?? mockApps.find((a) => a.id === data.appId);
    if (app) {
      notifyTelegramReview({
        appName: app.name,
        appSlug: app.slug,
        author: review.author,
        rating: review.rating,
        title: review.title,
        body: review.body,
        reviewId: review.id,
      }).catch((err) => console.error("[notifyTelegramReview]", err));
    }

    return review;
  },

  createReviewReply: async (reviewId: string, data: { responder: "developer" | "luna"; content: string; chatId?: string; name?: string }): Promise<Review> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    return getReviewStore().createReply({
      reviewId,
      responder: data.responder,
      name: data.name,
      content: data.content,
      chatId: data.chatId,
    });
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    return mockCategories;
  },

  // Contact
  submitContact: async (data: ContactFormInput): Promise<{ success: boolean; message: string }> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    console.log("[Contact Form]", data);
    return { success: true, message: "Mensagem enviada com sucesso!" };
  },

  // Request
  submitRequest: async (data: WhiteLabelConfigInput): Promise<{ success: boolean; requestId: string; message: string }> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    const requestId = `REQ-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    console.log("[Request Form]", { requestId, data });
    return { success: true, requestId, message: "Solicitacao enviada com sucesso!" };
  },

  // Chat
  sendChatMessage: async (_content: string): Promise<{ content: string; suggestions?: string[] }> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY + 200));
    const responses = [
      "Ola! Como posso ajudar voce hoje? Posso tirar duvidas sobre nossos apps e solucoes.",
      "Entendo! Temos varias solucoes para esse tipo de negocio. Posso mostrar as opcoes disponiveis.",
      "Perfeito! Voce pode solicitar uma demonstracao diretamente na pagina do app. Posso te guiar.",
      "Nossos TPVs sao desenvolvidos com tecnologia moderna e suporte especializado. Quer saber mais?",
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    return {
      content: response,
      suggestions: ["Ver apps disponiveis", "Solicitar demo", "Falar com suporte"],
    };
  },

  // Luna Bridge
  getLunaRequests: async (): Promise<Array<{ id: string; status: string; type: string }>> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    return [
      { id: "LUNA-001", status: "pending", type: "app_build" },
      { id: "LUNA-002", status: "completed", type: "review" },
    ];
  },

  submitLunaResult: async (data: unknown): Promise<{ success: boolean }> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    console.log("[Luna Bridge]", data);
    return { success: true };
  },

  // Health
  health: async (): Promise<{ status: string; timestamp: string; version: string }> => {
    await new Promise((r) => setTimeout(r, 100));
    return { status: "ok", timestamp: new Date().toISOString(), version: "1.0.0" };
  },
};

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
import { mockApps, mockReviews, mockCategories, getAppBySlug } from "@/lib/mock-data";
import { AppProduct, Review, Category, AppFilter, PaginatedApps } from "@/types/app";
import { WhiteLabelConfigInput } from "@/lib/validators";
import { ContactFormInput, ReviewFormInput } from "@/lib/validators";

const MOCK_DELAY = 300;

function mockResponse<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), MOCK_DELAY);
  });
}

export const mockApi = {
  // Apps
  getApps: async (filters?: AppFilter & { page?: number; limit?: string }): Promise<PaginatedApps> => {
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

  getApp: async (slug: string): Promise<AppProduct | null> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    return getAppBySlug(slug) ?? null;
  },

  // Reviews
  getReviews: async (appId?: string): Promise<Review[]> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    if (appId) return mockReviews.filter((r) => r.appId === appId);
    return mockReviews;
  },

  createReview: async (data: ReviewFormInput & { appId: string }): Promise<Review> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));
    const review: Review = {
      id: `rev-${Date.now()}`,
      appId: data.appId,
      author: data.author,
      rating: data.rating,
      title: data.title,
      body: data.body,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    };
    return review;
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
  sendChatMessage: async (content: string): Promise<{ content: string; suggestions?: string[] }> => {
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

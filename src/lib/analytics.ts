type EventCategory = "navigation" | "engagement" | "conversion" | "error" | "performance";

interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, string | number | boolean>;
}

function logEvent(event: AnalyticsEvent): void {
  const timestamp = new Date().toISOString();
  const payload = { ...event, timestamp };

  // Mock: log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${event.category} / ${event.action}`, payload);
  }

  // In production, this would send to GA4 via gtag
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    const { gtag } = window as unknown as { gtag: (...args: unknown[]) => void };
    gtag("event", event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.metadata,
    });
  }
}

export const analytics = {
  // Navigation
  pageView: (path: string, title?: string) => {
    logEvent({ category: "navigation", action: "page_view", label: path, metadata: { title: title ?? "" } });
  },

  tabSwitch: (tab: string) => {
    logEvent({ category: "navigation", action: "tab_switch", label: tab });
  },

  // Engagement
  appView: (appSlug: string, appName: string) => {
    logEvent({ category: "engagement", action: "app_view", label: appSlug, metadata: { appName } });
  },

  appInstall: (appSlug: string, appName: string) => {
    logEvent({ category: "engagement", action: "app_install", label: appSlug, metadata: { appName } });
  },

  search: (query: string, resultCount: number) => {
    logEvent({ category: "engagement", action: "search", label: query, value: resultCount });
  },

  filterApply: (filters: Record<string, string>) => {
    logEvent({ category: "engagement", action: "filter_apply", metadata: filters });
  },

  demoRequest: (appSlug: string) => {
    logEvent({ category: "engagement", action: "demo_request", label: appSlug });
  },

  // Conversion
  requestStart: () => {
    logEvent({ category: "conversion", action: "request_start" });
  },

  requestComplete: (step: number, businessType: string) => {
    logEvent({ category: "conversion", action: "request_complete", value: step, metadata: { businessType } });
  },

  contactSubmit: (subject: string) => {
    logEvent({ category: "conversion", action: "contact_submit", label: subject });
  },

  reviewSubmit: (appSlug: string, rating: number) => {
    logEvent({ category: "conversion", action: "review_submit", label: appSlug, value: rating });
  },

  chatMessage: (isFirstMessage: boolean) => {
    logEvent({ category: "engagement", action: "chat_message", metadata: { isFirstMessage } });
  },

  // Error
  error: (error: string, context?: string) => {
    logEvent({ category: "error", action: "app_error", label: error, metadata: { context: context ?? "" } });
  },

  // Performance
  apiLatency: (endpoint: string, durationMs: number) => {
    logEvent({ category: "performance", action: "api_latency", label: endpoint, value: Math.round(durationMs) });
  },

  // Generic
  track: (event: AnalyticsEvent) => {
    logEvent(event);
  },
};

export type { AnalyticsEvent, EventCategory };

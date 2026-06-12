const CACHE_NAME = "nexo-store-v1";
const STATIC_CACHE = "nexo-static-v1";
const API_CACHE = "nexo-api-v1";
const IMAGE_CACHE = "nexo-images-v1";

// Shell assets to cache on install
const SHELL_ASSETS = [
  "/",
  "/offline",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// Install — cache shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => {
              return (
                name.startsWith("nexo-") &&
                name !== STATIC_CACHE &&
                name !== API_CACHE &&
                name !== IMAGE_CACHE
              );
            })
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Helper: check if request is for an API call
function isApiRequest(url) {
  return url.pathname.startsWith("/api/");
}

// Helper: check if request is for an image
function isImageRequest(url) {
  return /\.(png|jpg|jpeg|svg|gif|webp|ico)$/.test(url.pathname);
}

// Helper: check if request is for a static asset
function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/static/") ||
    url.pathname === "/manifest.json" ||
    url.pathname === "/offline"
  );
}

// Fetch — cache strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) return;

  // API requests: Network first, fallback to cache
  if (isApiRequest(url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.ok) {
            const clone = response.clone();
            caches.open(API_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            if (cached) return cached;
            // Return offline JSON for API failures
            return new Response(
              JSON.stringify({
                error: "offline",
                message: "Voce esta offline. Tente novamente mais tarde.",
              }),
              {
                status: 503,
                headers: { "Content-Type": "application/json" },
              }
            );
          });
        })
    );
    return;
  }

  // Image requests: Cache first, network fallback
  if (isImageRequest(url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(IMAGE_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Static assets: Cache first
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Navigation requests (pages): Network first with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() => {
          return caches.match("/offline").then((cached) => {
            if (cached) return cached;
            return new Response("Voce esta offline", {
              status: 503,
              headers: { "Content-Type": "text/html" },
            });
          });
        })
    );
    return;
  }

  // Default: Network with cache fallback
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    })
  );
});

// Background sync for form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "form-submission") {
    event.waitUntil(handleFormSubmission());
  }
});

async function handleFormSubmission() {
  // Retrieve pending submissions from IndexedDB and retry
  // This is a placeholder for future implementation
  console.log("[SW] Background sync triggered for form submission");
}

// Push notifications
self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || "Nova notificacao da NEXO Digital Store",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-96x96.png",
    tag: data.tag || "default",
    data: data.url || "/",
    actions: data.actions || [
      { action: "open", title: "Abrir" },
      { action: "dismiss", title: "Dispensar" },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || "NEXO Digital Store",
      options
    )
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open" || !event.action) {
    const url = event.notification.data || "/";
    event.waitUntil(
      self.clients.matchAll({ type: "window" }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
    );
  }
});

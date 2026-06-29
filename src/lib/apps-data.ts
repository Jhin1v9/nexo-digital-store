import { AppProduct } from "@/types/app";
import rawApps from "@/data/apps.json";

// Runtime mutable copy used by the app and the admin panel
let _apps: AppProduct[] = [...(rawApps as AppProduct[])];

export const APPS_JSON_PATH = "src/data/apps.json";

export function getApps(): AppProduct[] {
  return _apps;
}

export function getAppBySlug(slug: string): AppProduct | undefined {
  return _apps.find((a) => a.slug === slug);
}

export function getAppById(id: string): AppProduct | undefined {
  return _apps.find((a) => a.id === id);
}

export function addApp(app: AppProduct): AppProduct {
  _apps.unshift(app);
  return app;
}

export function updateApp(id: string, updates: Partial<AppProduct>): AppProduct | undefined {
  const idx = _apps.findIndex((a) => a.id === id);
  if (idx === -1) return undefined;
  _apps[idx] = { ..._apps[idx], ...updates };
  return _apps[idx];
}

export function deleteApp(id: string): boolean {
  const idx = _apps.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  _apps.splice(idx, 1);
  return true;
}

export function setApps(apps: AppProduct[]) {
  _apps = [...apps];
}

export function saveAppsToDisk(): void {
  // Server-side only
  if (typeof window !== "undefined") return;
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(process.cwd(), APPS_JSON_PATH);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(_apps, null, 2), "utf-8");
}

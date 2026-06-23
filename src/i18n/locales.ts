export const locales = ["en", "pt", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const stored = localStorage.getItem("nexo-store-locale");
  if (stored && isLocale(stored)) return stored;
  const browser = navigator.language.split("-")[0];
  if (isLocale(browser)) return browser;
  return defaultLocale;
}

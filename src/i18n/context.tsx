"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { type Locale, defaultLocale, getInitialLocale, isLocale } from "./locales";

import enMessages from "../../messages/en.json";
import ptMessages from "../../messages/pt.json";
import esMessages from "../../messages/es.json";

const staticMessages: Record<Locale, Messages> = {
  en: enMessages as Messages,
  pt: ptMessages as Messages,
  es: esMessages as Messages,
};

export type Messages = Record<string, unknown>;

interface I18nContextValue {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
  isReady: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(obj: Record<string, unknown>, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

function formatMessage(
  message: string,
  values?: Record<string, string | number>
): string {
  if (!values) return message;
  return message.replace(/\{(\w+)\}/g, (_, key) =>
    String(values[key] ?? `{${key}}`)
  );
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initial = getInitialLocale();
    setLocaleState(initial);
    setIsReady(true);
  }, []);

  const messages = useMemo(() => staticMessages[locale], [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    if (!isLocale(nextLocale)) return;
    localStorage.setItem("nexo-store-locale", nextLocale);
    setLocaleState(nextLocale);
  }, []);

  const t = useCallback(
    (key: string, values?: Record<string, string | number>) => {
      const raw = getNestedValue(messages, key);
      if (typeof raw !== "string") {
        if (process.env.NODE_ENV === "development") {
          console.warn(`[i18n] Missing translation: ${key}`);
        }
        return key;
      }
      return formatMessage(raw, values);
    },
    [messages]
  );

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale, t, isReady }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

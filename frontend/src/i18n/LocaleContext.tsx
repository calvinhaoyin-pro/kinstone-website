import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en from "./en.json";
import zh from "./zh.json";
import type { Locale } from "../types";

const dictionaries = { en, zh } as const;

export type Dictionary = typeof en;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const STORAGE_KEY = "kinstone-locale";

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "zh" ? "zh" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}

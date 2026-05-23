export const LOCALES = ["en", "hi"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};

export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  en: "EN",
  hi: "HI",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "hi";
}

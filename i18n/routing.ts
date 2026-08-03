import { defineRouting } from "next-intl/routing"

export const locales = ["en", "ka", "ru"] as const
export type Locale = (typeof locales)[number]

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ka: "ქართული",
  ru: "Русский",
}

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
})

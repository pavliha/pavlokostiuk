"use client"

import { useLocale } from "next-intl"

import { usePathname, useRouter } from "@/i18n/navigation"
import { LOCALE_LABELS, locales, type Locale } from "@/i18n/routing"

const LocaleSwitcher = ({ label }: { label: string }) => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <select
      aria-label={label}
      value={locale}
      onChange={(event) => router.replace(pathname, { locale: event.target.value as Locale })}
      className="shrink-0 bg-transparent text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white py-1.5 px-1 rounded-lg cursor-pointer focus-visible:outline-2"
    >
      {locales.map((option) => (
        <option key={option} value={option} className="bg-white dark:bg-surface text-zinc-900 dark:text-zinc-50">
          {LOCALE_LABELS[option]}
        </option>
      ))}
    </select>
  )
}

export default LocaleSwitcher

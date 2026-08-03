"use client"

import { useLocale } from "next-intl"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePathname, useRouter } from "@/i18n/navigation"
import { LOCALE_LABELS, locales, type Locale } from "@/i18n/routing"

const LocaleSwitcher = ({ label }: { label: string }) => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Select value={locale} onValueChange={(next) => router.replace(pathname, { locale: next as Locale })}>
      <SelectTrigger aria-label={label} size="sm" className="w-auto gap-1 border-none shadow-none bg-transparent">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {locales.map((option) => (
          <SelectItem key={option} value={option}>
            {LOCALE_LABELS[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LocaleSwitcher

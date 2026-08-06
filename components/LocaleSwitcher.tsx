"use client"

import { useLocale } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "@/i18n/navigation"
import { LOCALE_CODES, LOCALE_LABELS, locales, type Locale } from "@/i18n/routing"

const LocaleSwitcher = ({ label }: { label: string }) => {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={label} className="gap-2">
          <span className="text-sm font-medium">{LOCALE_CODES[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => router.replace(pathname, { locale: option })}
            className={locale === option ? "bg-accent" : ""}
          >
            <span className="mr-2 font-medium">{LOCALE_CODES[option]}</span>
            {LOCALE_LABELS[option]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LocaleSwitcher

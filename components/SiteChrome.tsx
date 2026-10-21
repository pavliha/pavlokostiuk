"use client"

import { useTranslations } from "next-intl"

import SiteFooter from "@/components/SiteFooter"
import SiteNav from "@/components/SiteNav"
import { Link, usePathname } from "@/i18n/navigation"

const GLOBAL_NAV = [
  { key: "ecommerce", href: "/ecommerce", accent: true },
  { key: "price", href: "/ecommerce#price", accent: false },
  { key: "prototype", href: "/ecommerce#prototype", accent: false },
  { key: "about", href: "/about", accent: false },
] as const

const FOOTER_NAV = [...GLOBAL_NAV, { key: "contact", href: "/#contact", accent: false }] as const

export const GlobalNav = ({ ctaHref }: { ctaHref: string }) => {
  const nav = useTranslations("nav")
  const common = useTranslations("common")
  const pathname = usePathname()

  return (
    <SiteNav
      brandHref="/"
      links={GLOBAL_NAV.map(({ key, href, accent }) => ({
        label: nav(key),
        href,
        accent,
        current: !href.includes("#") && pathname === href,
      }))}
      themeLabel={nav("toggleTheme")}
      languageLabel={nav("language")}
      cta={{ label: common("bookCall"), href: ctaHref }}
    />
  )
}

export const GlobalFooter = ({ reserveStickyBar = false }: { reserveStickyBar?: boolean }) => {
  const nav = useTranslations("nav")
  const common = useTranslations("common")
  return (
    <SiteFooter reserveStickyBar={reserveStickyBar} copyright={common("copyright")}>
      <nav aria-label={common("footerNav")}>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          {FOOTER_NAV.map(({ key, href }) => (
            <li key={href}>
              <Link href={href} className="hover:text-foreground transition-colors">
                {nav(key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </SiteFooter>
  )
}

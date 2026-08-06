import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

import LocaleSwitcher from "./LocaleSwitcher"
import ThemeToggle from "./ThemeToggle"

export type NavLink = { label: string; href: string; accent: boolean; compact?: boolean }

const SiteNav = ({
  brandHref,
  links,
  themeLabel,
  languageLabel,
  cta,
}: {
  brandHref: string
  links: readonly NavLink[]
  themeLabel: string
  languageLabel: string
  cta?: { label: string; href: string }
}) => (
  <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-md border-b">
    <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
      <Link href={brandHref} className="text-base font-semibold tracking-tight whitespace-nowrap shrink-0 hidden sm:block">
        Pavlo Kostiuk
      </Link>
      <div className="flex items-center gap-2 min-w-0">
        <ul className="flex gap-1 sm:gap-3 overflow-x-auto whitespace-nowrap min-w-0">
          {links.map(({ label, href, accent, compact }) => (
            <li key={href} className={compact ? "hidden sm:block" : undefined}>
              <Link
                href={href}
                className={`inline-flex items-center min-h-11 px-2 text-sm transition-colors ${
                  accent
                    ? "text-accent-blue hover:text-brand-strong"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <LocaleSwitcher label={languageLabel} />
        <ThemeToggle label={themeLabel} />
        {cta ? (
          <Button asChild size="sm" className="hidden md:inline-flex shrink-0">
            <a href={cta.href}>{cta.label}</a>
          </Button>
        ) : null}
      </div>
    </div>
  </nav>
)

export default SiteNav

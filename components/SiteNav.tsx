import { Link } from "@/i18n/navigation"

import LocaleSwitcher from "./LocaleSwitcher"
import ThemeToggle from "./ThemeToggle"

export type NavLink = { label: string; href: string; accent: boolean }

const SiteNav = ({
  brandHref,
  links,
  themeLabel,
  languageLabel,
}: {
  brandHref: string
  links: readonly NavLink[]
  themeLabel: string
  languageLabel: string
}) => (
  <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-background/80 backdrop-blur-xl border-b">
    <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
      <Link href={brandHref} className="font-bold text-lg tracking-tight whitespace-nowrap shrink-0 hidden sm:block">
        Pavlo Kostiuk
      </Link>
      <div className="flex items-center gap-2 min-w-0">
        <ul className="flex gap-1 sm:gap-3 overflow-x-auto whitespace-nowrap min-w-0">
          {links.map(({ label, href, accent }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block px-2 py-1.5 text-sm transition-colors ${
                  accent
                    ? "text-primary dark:text-brand-light hover:text-brand-strong"
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
      </div>
    </div>
  </nav>
)

export default SiteNav

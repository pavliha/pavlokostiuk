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
  <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-white/80 dark:bg-bg/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 transition-colors">
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
                    ? "text-accent dark:text-accent-light hover:text-accent-strong dark:hover:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
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

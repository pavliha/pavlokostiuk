import Link from "next/link"

import ThemeToggle from "./ThemeToggle"

export type NavLink = { label: string; href: string; accent?: boolean }

const SiteNav = ({ brandHref, links }: { brandHref: string; links: readonly NavLink[] }) => (
  <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-white/80 dark:bg-bg/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 transition-colors">
    <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
      <Link href={brandHref} className="font-bold text-lg tracking-tight whitespace-nowrap shrink-0">
        Pavlo Kostiuk
      </Link>
      <div className="flex items-center gap-4 min-w-0">
        <ul className="flex gap-1 sm:gap-4 overflow-x-auto whitespace-nowrap min-w-0">
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
        <ThemeToggle />
      </div>
    </div>
  </nav>
)

export default SiteNav

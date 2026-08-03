import type { ReactNode } from "react"

const SiteFooter = ({
  children,
  reserveStickyBar,
  copyright,
}: {
  children: ReactNode
  reserveStickyBar: boolean
  copyright: string
}) => (
  <footer
    className={`text-center py-8 text-zinc-600 dark:text-zinc-400 text-xs border-t border-zinc-200 dark:border-zinc-800 ${
      reserveStickyBar ? "pb-24 sm:pb-8" : ""
    }`}
  >
    {children}
    <div className="mt-2">{copyright}</div>
  </footer>
)

export default SiteFooter

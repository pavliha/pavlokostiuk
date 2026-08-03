import type { ReactNode } from "react"

const SiteFooter = ({ children, reserveStickyBar }: { children?: ReactNode; reserveStickyBar?: boolean }) => (
  <footer
    className={`text-center py-8 text-zinc-600 dark:text-zinc-400 text-xs border-t border-zinc-200 dark:border-zinc-800 ${
      reserveStickyBar ? "pb-24 sm:pb-8" : ""
    }`}
  >
    {children}
    <div className={children ? "mt-2" : ""}>&copy; 2026 Pavlo Kostiuk</div>
  </footer>
)

export default SiteFooter

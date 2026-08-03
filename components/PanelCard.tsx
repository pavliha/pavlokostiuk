import type { ReactNode } from "react"

const PanelCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl ${className}`}>
    {children}
  </div>
)

export default PanelCard

import type { ReactNode } from "react"

import { Separator } from "@/components/ui/separator"

const SiteFooter = ({
  children,
  reserveStickyBar,
  copyright,
}: {
  children: ReactNode
  reserveStickyBar: boolean
  copyright: string
}) => (
  <>
    <Separator />
    <footer className={`text-center py-8 text-muted-foreground text-xs ${reserveStickyBar ? "pb-24 sm:pb-8" : ""}`}>
      {children}
      <div className="mt-2">{copyright}</div>
    </footer>
  </>
)

export default SiteFooter

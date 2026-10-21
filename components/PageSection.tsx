import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

const PageSection = ({
  id,
  className,
  children,
}: {
  id: string
  className?: string
  children: ReactNode
}) => (
  <section
    id={id}
    className={cn("w-full max-w-6xl mx-auto px-6 sm:px-10 py-24 scroll-mt-24", className)}
  >
    {children}
  </section>
)

export default PageSection

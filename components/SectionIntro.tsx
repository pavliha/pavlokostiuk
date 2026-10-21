import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

const SectionIntro = ({ className, children }: { className?: string; children: ReactNode }) => (
  <p className={cn("text-lg text-ink-2 max-w-2xl mb-10 leading-[1.6]", className)}>{children}</p>
)

export default SectionIntro

import type { ReactNode } from "react"

import PainPromise from "@/components/PainPromise"
import { cn } from "@/lib/utils"

const PainRow = ({
  index,
  misery,
  moment,
  promise,
  proof,
  visual,
  flipped,
  lead,
}: {
  index: string
  misery: string
  moment: string
  promise: string
  proof: string
  visual: ReactNode
  flipped: boolean
  lead: boolean
}) => (
  <div
    className={cn(
      "border-t border-rule pt-6 grid items-start",
      lead ? "lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16" : "lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-14",
    )}
  >
    <div className={flipped ? "lg:order-2" : ""}>
      <div className={cn("flex gap-3", lead ? "flex-col mb-4" : "items-baseline mb-3")}>
        <span className="figure text-sm text-muted-foreground shrink-0">{index}</span>
        <h3
          className={cn(
            "claim text-ink text-balance",
            lead ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
          )}
        >
          &ldquo;{misery}&rdquo;
        </h3>
      </div>
      <p className={cn("text-ink-2 leading-[1.6] mb-6", lead ? "text-lg" : "text-base")}>{moment}</p>
      <PainPromise promise={promise} proof={proof} />
    </div>
    <div className={flipped ? "lg:order-1" : ""}>{visual}</div>
  </div>
)

export default PainRow

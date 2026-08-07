import Image from "next/image"
import type { ReactNode } from "react"

import PainPromise from "@/components/PainPromise"
import type { MediaAsset } from "@/content/media"

const PainRow = ({
  index,
  misery,
  moment,
  promise,
  proof,
  shot,
  shotAlt,
  figure,
  flipped,
}: {
  index: string
  misery: string
  moment: string
  promise: string
  proof: string
  shot?: MediaAsset
  shotAlt?: string
  figure?: ReactNode
  flipped: boolean
}) => (
  <div className="border-t border-rule pt-6 grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-14 items-start">
    <div className={flipped ? "lg:order-2" : ""}>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="figure text-sm text-muted-foreground shrink-0">{index}</span>
        <h3 className="claim text-xl sm:text-2xl text-ink text-balance">&ldquo;{misery}&rdquo;</h3>
      </div>
      <p className="text-base text-ink-2 leading-[1.6] mb-6">{moment}</p>
      <PainPromise promise={promise} proof={proof} />
    </div>
    {shot && shotAlt ? (
      <div
        className={`shot rounded-xl border border-rule p-2 shadow-[0_10px_28px_-16px_rgba(16,18,29,0.2)] dark:shadow-[0_10px_32px_-16px_rgba(0,0,0,0.7)] ${
          flipped ? "lg:order-1" : ""
        }`}
      >
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={shotAlt}
          loading="lazy"
          className="w-full h-auto rounded-lg border border-rule"
        />
      </div>
    ) : (
      <div className={flipped ? "lg:order-1" : ""}>{figure}</div>
    )}
  </div>
)

export default PainRow

import Image from "next/image"

import type { MediaAsset } from "@/content/media"
import { cn } from "@/lib/utils"

const PainShot = ({
  shot,
  alt,
  className,
}: {
  shot: MediaAsset
  alt: string
  className?: string
}) => (
  <div
    className={cn(
      "shot rounded-xl border border-rule p-2 shadow-[0_10px_28px_-16px_rgba(16,18,29,0.2)] dark:shadow-[0_10px_32px_-16px_rgba(0,0,0,0.7)]",
      className,
    )}
  >
    <Image
      src={shot.src}
      width={shot.width}
      height={shot.height}
      alt={alt}
      sizes="(min-width: 1024px) 620px, 100vw"
      loading="lazy"
      className="w-full h-auto rounded-lg border border-rule"
    />
  </div>
)

export default PainShot

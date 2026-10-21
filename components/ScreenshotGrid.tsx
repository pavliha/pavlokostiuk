import { useTranslations, type Messages } from "next-intl"

import ScreenshotCard from "@/components/ScreenshotCard"
import type { MediaAsset } from "@/content/media"
import { cn } from "@/lib/utils"

type ShotKey = keyof Messages["platform"]["screens"]["shots"]

const ScreenshotGrid = ({
  shots,
  className,
}: {
  shots: readonly MediaAsset<ShotKey>[]
  className?: string
}) => {
  const t = useTranslations("platform.screens.shots")

  return (
    <div className={cn("grid lg:grid-cols-2 gap-8", className)}>
      {shots.map((shot) => (
        <ScreenshotCard
          key={shot.key}
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={t(`${shot.key}.alt`)}
          title={t(`${shot.key}.title`)}
          body={t(`${shot.key}.body`)}
        />
      ))}
    </div>
  )
}

export default ScreenshotGrid

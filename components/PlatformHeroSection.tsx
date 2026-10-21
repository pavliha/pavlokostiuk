import Image from "next/image"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { PLATFORM_HERO_SHOT } from "@/content/media"
import { WHATSAPP } from "@/content/site"

const PlatformHeroSection = () => {
  const t = useTranslations("platform")
  const common = useTranslations("common")

  return (
    <section className="pt-24 pb-0">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 pt-16 pb-20">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            <h1 className="claim text-ink text-[clamp(2.5rem,6vw,3.5rem)] mb-6 max-w-[17ch] text-balance">
              {t("hero.headline")}
            </h1>
            <p className="text-lg text-ink-2 max-w-xl mb-9 leading-[1.6]">{t("hero.subhead")}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="cta">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  {common("bookCall")}
                </a>
              </Button>
              <a
                href="#prototype"
                className="text-base text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                {t("hero.ctaTransitional")}
              </a>
            </div>
            <p className="mt-8 pt-6 border-t border-rule text-sm text-muted-foreground max-w-md leading-[1.6]">
              {t("hero.proof")}
            </p>
          </div>
          <div className="shot rounded-xl border border-rule p-2 lg:p-3 shadow-[0_12px_32px_-16px_rgba(16,18,29,0.22)] dark:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.75)]">
            <Image
              src={PLATFORM_HERO_SHOT.src}
              width={PLATFORM_HERO_SHOT.width}
              height={PLATFORM_HERO_SHOT.height}
              alt={t("hero.shotAlt")}
              sizes="(min-width: 1024px) 560px, 100vw"
              priority
              className="w-full h-auto rounded-lg border border-rule"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlatformHeroSection

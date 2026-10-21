import { useMessages, useTranslations } from "next-intl"

import BulletList from "@/components/BulletList"
import PageSection from "@/components/PageSection"
import ScreenshotGrid from "@/components/ScreenshotGrid"
import SectionHeading from "@/components/SectionHeading"
import { STOREFRONT_SHOTS } from "@/content/media"

const PlatformScreensSection = () => {
  const t = useTranslations("platform")
  const { findings } = useMessages().platform.audit

  return (
    <PageSection id="screens">
      <SectionHeading title={t("screens.title")} />
      <ScreenshotGrid shots={STOREFRONT_SHOTS} className="mt-8" />

      <div className="border border-rule bg-card mt-8 p-6">
        <h3 className="text-xl font-semibold text-ink mb-3">{t("audit.title")}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t("audit.intro")}</p>
        <div className="border-l border-ledger pl-4 py-2 mb-3">
          <div className="text-xs font-medium text-muted-foreground mb-2">{t("audit.you")}</div>
          <p className="text-sm text-foreground/80">{t("audit.question")}</p>
        </div>
        <div className="border-l border-accent-blue bg-secondary/60 pl-4 py-3">
          <div className="text-xs font-medium text-muted-foreground mb-2">{t("audit.store")}</div>
          <BulletList
            items={findings}
            className="text-sm text-foreground/80 space-y-1.5 leading-relaxed"
            dotClassName="bg-ledger"
          />
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed mt-4">{t("audit.footnote")}</p>
      </div>
    </PageSection>
  )
}

export default PlatformScreensSection

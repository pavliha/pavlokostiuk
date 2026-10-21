import { useMessages, useTranslations } from "next-intl"

import BulletList from "@/components/BulletList"
import PageSection from "@/components/PageSection"
import SectionHeading from "@/components/SectionHeading"
import { PROCESS_KEYS } from "@/content/structure"

const PlatformProcessSection = () => {
  const t = useTranslations("platform")
  const { reasons } = useMessages().platform.shopify

  return (
    <PageSection id="process">
      <SectionHeading title={t("process.title")} />
      <div className="grid md:grid-cols-2 gap-x-14 gap-y-7 mt-6 mb-14">
        {PROCESS_KEYS.map((key) => (
          <div key={key} className="border-t border-rule pt-4">
            <div className="text-sm font-semibold text-ink mb-1.5">
              {t(`process.steps.${key}.step`)}
            </div>
            <h3 className="font-semibold mb-1.5 text-ink">{t(`process.steps.${key}.title`)}</h3>
            <p className="text-base text-ink-2 leading-relaxed">{t(`process.steps.${key}.body`)}</p>
          </div>
        ))}
      </div>

      <div className="hairline pt-8 mt-4">
        <h3 className="text-lg font-semibold mb-4 text-ink">{t("shopify.title")}</h3>
        <p className="text-base text-ink-2 leading-relaxed mb-4">{t("shopify.intro")}</p>
        <BulletList
          items={reasons}
          className="text-sm text-muted-foreground space-y-1.5 leading-relaxed"
          dotClassName="bg-ledger"
        />
      </div>
    </PageSection>
  )
}

export default PlatformProcessSection

import { useMessages, useTranslations } from "next-intl"

import BulletList from "@/components/BulletList"
import PageSection from "@/components/PageSection"
import SectionHeading from "@/components/SectionHeading"
import SectionIntro from "@/components/SectionIntro"

const PlatformAuthoritySection = () => {
  const t = useTranslations("platform")
  const { hows, items } = useMessages().platform.authority

  return (
    <PageSection id="authority">
      <SectionHeading title={t("authority.title")}>
        <SectionIntro>{t("authority.body")}</SectionIntro>
      </SectionHeading>
      <p className="claim text-base text-ink mb-4">{t("authority.howsLead")}</p>
      <BulletList
        items={hows}
        className="grid sm:grid-cols-2 gap-x-12 gap-y-3 mb-10 max-w-4xl"
        itemClassName="text-base text-ink leading-[1.55]"
        dotClassName="bg-primary"
      />
      <dl className="grid grid-cols-1 sm:grid-cols-2 border-t border-rule">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={`pt-4 pr-6 pb-1 ${index < items.length - 1 ? "sm:border-r border-rule" : ""} ${
              index > 0 ? "border-t sm:border-t-0 border-rule mt-4 sm:mt-0 sm:pl-6" : ""
            }`}
          >
            <dt className="printed text-2xl font-bold mb-1 text-ink">{item.value}</dt>
            <dd className="text-xs text-muted-foreground leading-snug">{item.label}</dd>
          </div>
        ))}
      </dl>
    </PageSection>
  )
}

export default PlatformAuthoritySection

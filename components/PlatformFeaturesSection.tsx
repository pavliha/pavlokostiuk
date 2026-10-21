import { useMessages, useTranslations } from "next-intl"

import LedgerGroup from "@/components/LedgerGroup"
import PageSection from "@/components/PageSection"
import ScreenshotGrid from "@/components/ScreenshotGrid"
import SectionHeading from "@/components/SectionHeading"
import SectionIntro from "@/components/SectionIntro"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ADMIN_SHOTS } from "@/content/media"
import { FEATURE_KEYS } from "@/content/structure"

const PlatformFeaturesSection = () => {
  const t = useTranslations("platform")
  const { groups } = useMessages().platform.features

  return (
    <PageSection id="features">
      <SectionHeading title={t("features.title")}>
        <SectionIntro>{t("features.intro")}</SectionIntro>
      </SectionHeading>

      <p className="text-sm text-muted-foreground mb-6">
        {t("features.tally", {
          areas: FEATURE_KEYS.length,
          items: FEATURE_KEYS.reduce((total, key) => total + groups[key].bullets.length, 0),
        })}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-px bg-rule border border-rule mb-10">
        {FEATURE_KEYS.map((key) => (
          <div
            key={key}
            className="bg-background px-4 py-3.5 text-sm font-medium text-ink leading-snug"
          >
            {t(`features.groups.${key}.title`)}
          </div>
        ))}
      </div>

      <ScreenshotGrid shots={ADMIN_SHOTS} className="mb-10" />

      <Accordion type="single" collapsible>
        <AccordionItem value="all" className="border-none">
          <AccordionTrigger className="text-base font-medium hover:no-underline">
            {t("features.showAll")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-12 mt-10">
              {FEATURE_KEYS.map((key) => (
                <LedgerGroup
                  key={key}
                  title={t(`features.groups.${key}.title`)}
                  bullets={groups[key].bullets}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PageSection>
  )
}

export default PlatformFeaturesSection

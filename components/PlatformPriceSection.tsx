import { useMessages, useTranslations } from "next-intl"

import LedgerGroup from "@/components/LedgerGroup"
import PageSection from "@/components/PageSection"
import SectionHeading from "@/components/SectionHeading"
import SectionIntro from "@/components/SectionIntro"
import StatLedger from "@/components/StatLedger"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { PRICE_DETAIL_KEYS, PRICE_KEYS } from "@/content/structure"

const PlatformPriceSection = () => {
  const t = useTranslations("platform")
  const { hero, figures, anchor, groups } = useMessages().platform.price

  return (
    <PageSection id="price">
      <SectionHeading title={t("price.title")}>
        <SectionIntro>{t("price.intro")}</SectionIntro>
      </SectionHeading>

      <div className="max-w-3xl mb-14">
        <StatLedger hero={hero} note={t("price.anchor.note")} rest={figures} />
      </div>

      <div className="border-t border-rule pt-6 mb-12 max-w-3xl">
        <h3 className="text-2xl font-semibold text-ink mb-4">{t("price.rate.headline")}</h3>
        <p className="text-sm text-ink-2 leading-relaxed mb-5">{t("price.rate.body")}</p>
        <p className="text-sm text-ink-2 leading-relaxed pt-5 border-t border-rule">
          {t("price.rate.terms")}
        </p>
        <p className="text-sm text-ink-2 leading-relaxed mt-5">{t("price.rate.hourly")}</p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Button asChild size="cta">
            <a href="#prototype">{t("price.ctaMid")}</a>
          </Button>
        </div>
      </div>

      <div className="mb-12 max-w-2xl">
        <LedgerGroup title={t("price.anchor.neverStopTitle")} bullets={anchor.neverStop} />
      </div>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
        {PRICE_KEYS.map((key) => (
          <LedgerGroup
            key={key}
            title={t(`price.groups.${key}.title`)}
            bullets={groups[key].bullets}
          />
        ))}
      </div>

      <Accordion type="single" collapsible className="mt-12">
        <AccordionItem value="all" className="border-none">
          <AccordionTrigger className="text-base font-medium hover:no-underline">
            {t("price.showAll")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-12 mt-10">
              {PRICE_DETAIL_KEYS.map((key) => (
                <LedgerGroup
                  key={key}
                  title={t(`price.groups.${key}.title`)}
                  bullets={groups[key].bullets}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-rule pt-8">
        <Button asChild size="cta">
          <a href="#prototype">{t("prototype.cta")}</a>
        </Button>
        <p className="text-sm text-ink-2 max-w-sm leading-relaxed">{t("price.ctaNote")}</p>
      </div>
    </PageSection>
  )
}

export default PlatformPriceSection

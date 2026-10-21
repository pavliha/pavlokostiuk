import { useMessages, useTranslations } from "next-intl"

import LedgerGroup from "@/components/LedgerGroup"
import PageSection from "@/components/PageSection"
import PainFigure from "@/components/PainFigure"
import PainRow from "@/components/PainRow"
import PainShot from "@/components/PainShot"
import SectionHeading from "@/components/SectionHeading"
import SectionIntro from "@/components/SectionIntro"
import StatLedger from "@/components/StatLedger"
import { Button } from "@/components/ui/button"
import { hasShot, PAIN_SHOTS } from "@/content/media"
import { LEAD_PAIN_KEY, PAIN_KEYS, type PainKey } from "@/content/structure"

const PAIN_ORDER: readonly PainKey[] = [LEAD_PAIN_KEY, ...PAIN_KEYS]

const PlatformPainsSection = () => {
  const t = useTranslations("platform")
  const { lead, also } = useMessages().platform.pains

  const visualFor = (key: PainKey) => {
    if (key === LEAD_PAIN_KEY) {
      return <StatLedger hero={lead.hero} note={lead.note} rest={lead.stats} />
    }
    return hasShot(key) ? (
      <PainShot shot={PAIN_SHOTS[key]} alt={t(`pains.items.${key}.shotAlt`)} />
    ) : (
      <PainFigure name={key} />
    )
  }

  return (
    <PageSection id="pains">
      <SectionHeading title={t("pains.title")}>
        <SectionIntro className="mb-12">{t("pains.intro")}</SectionIntro>
      </SectionHeading>

      <div className="grid gap-16">
        {PAIN_ORDER.map((key, index) => (
          <section key={key} id={`pain-${key}`} className="scroll-mt-24">
            <PainRow
              index={String(index + 1).padStart(2, "0")}
              misery={t(`pains.items.${key}.misery`)}
              moment={t(`pains.items.${key}.moment`)}
              promise={t(`pains.items.${key}.promise`)}
              proof={t(`pains.items.${key}.proof`)}
              visual={visualFor(key)}
              flipped={key !== LEAD_PAIN_KEY && index % 2 === 0}
              lead={key === LEAD_PAIN_KEY}
            />
            {key === LEAD_PAIN_KEY && (
              <PainShot
                shot={PAIN_SHOTS[LEAD_PAIN_KEY]}
                alt={t(`pains.items.${LEAD_PAIN_KEY}.shotAlt`)}
                className="mt-10"
              />
            )}
          </section>
        ))}
      </div>

      <div className="mt-16 max-w-3xl">
        <LedgerGroup title={t("pains.alsoTitle")} bullets={also} />
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-rule pt-8">
        <Button asChild size="cta">
          <a href="#prototype">{t("prototype.cta")}</a>
        </Button>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
          {t("pains.ctaNote")}
        </p>
      </div>
    </PageSection>
  )
}

export default PlatformPainsSection

import { MonitorCheck, Rocket, Send } from "lucide-react"
import { useTranslations } from "next-intl"

import PageSection from "@/components/PageSection"
import SectionHeading from "@/components/SectionHeading"
import { PLAN_KEYS } from "@/content/structure"

const PLAN_ICONS = { send: Send, see: MonitorCheck, launch: Rocket }

const PlatformPlanSection = () => {
  const t = useTranslations("platform")

  return (
    <PageSection id="plan">
      <SectionHeading title={t("plan.title")} />
      <ol className="grid sm:grid-cols-3 gap-x-12 gap-y-10 mt-10">
        {PLAN_KEYS.map((key, index) => {
          const Icon = PLAN_ICONS[key]
          return (
            <li key={key} className="border-t border-rule pt-5">
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <span className="printed text-2xl font-bold text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-muted-foreground text-right">
                  {t(`plan.steps.${key}.when`)}
                </span>
              </div>
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-10 text-primary mb-5" />
              <p className="text-lg font-semibold text-ink mb-2">{t(`plan.steps.${key}.title`)}</p>
              <p className="text-base text-ink-2 leading-[1.55]">{t(`plan.steps.${key}.body`)}</p>
            </li>
          )
        })}
      </ol>
    </PageSection>
  )
}

export default PlatformPlanSection

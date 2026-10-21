import { useMessages, useTranslations } from "next-intl"

import PageSection from "@/components/PageSection"
import PrototypeRequest from "@/components/PrototypeRequest"
import SectionHeading from "@/components/SectionHeading"
import SectionIntro from "@/components/SectionIntro"
import { EMAIL, WHATSAPP } from "@/content/site"
import { inlineLink } from "@/lib/utils"

const PlatformPrototypeSection = () => {
  const t = useTranslations("platform")
  const { steps, form } = useMessages().platform.prototype

  return (
    <PageSection id="prototype">
      <div className="border border-rule bg-card p-6 sm:p-10">
        <SectionHeading title={t("prototype.title")}>
          <SectionIntro>{t("prototype.body")}</SectionIntro>
        </SectionHeading>
        <ol className="grid sm:grid-cols-2 gap-x-12 gap-y-5 mb-8">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="text-sm font-medium text-muted-foreground shrink-0 pt-0.5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-base text-ink-2 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        <PrototypeRequest
          id="prototype-form"
          copy={form}
          contactEmail={EMAIL}
          mailSubject={t("prototype.mailSubject")}
        />
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${inlineLink}`}
          >
            {t("prototype.orBook")}
          </a>
        </div>
        <p className="text-xs text-muted-foreground max-w-md leading-relaxed mt-5">
          {t("prototype.note")}
        </p>
        <p className="text-xs text-ink-2 max-w-md leading-relaxed mt-3 border-t border-rule pt-3">
          {t("prototype.scarcity")}
        </p>
      </div>
    </PageSection>
  )
}

export default PlatformPrototypeSection

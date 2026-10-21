import { useMessages, useTranslations } from "next-intl"

import EmailCapture from "@/components/EmailCapture"
import PageSection from "@/components/PageSection"
import PrototypeDisclosure from "@/components/PrototypeDisclosure"
import SectionHeading from "@/components/SectionHeading"
import SectionIntro from "@/components/SectionIntro"
import { Button } from "@/components/ui/button"
import { EMAIL, TELEGRAM, WHATSAPP } from "@/content/site"
import { CALL_KEYS } from "@/content/structure"
import { Link } from "@/i18n/navigation"
import { inlineLink } from "@/lib/utils"

const PlatformClosingSection = () => {
  const t = useTranslations("platform")
  const common = useTranslations("common")
  const { form } = useMessages().platform.prototype

  return (
    <PageSection id="cta">
      <div className="border-t border-rule pt-6 mb-16 max-w-2xl">
        <h3 className="text-xl font-semibold text-ink mb-3">{t("bio.title")}</h3>
        <p className="text-base text-ink-2 leading-relaxed mb-3">{t("bio.body1")}</p>
        <p className="text-base text-ink-2 leading-relaxed">
          {t("bio.body2")}{" "}
          <Link href="/" className={inlineLink}>
            {t("bio.backgroundLink")}
          </Link>
          .
        </p>
      </div>

      <div className="max-w-2xl mb-16">
        <EmailCapture
          source="platform"
          heading={t("subscribe.heading")}
          body={t("subscribe.body")}
          label={t("subscribe.label")}
          placeholder={t("subscribe.placeholder")}
          action={t("subscribe.action")}
          done={t("subscribe.done")}
          error={t("subscribe.error")}
        />
      </div>

      <div className="max-w-3xl">
        <SectionHeading title={t("cta.title")}>
          <SectionIntro>{t("cta.intro")}</SectionIntro>
        </SectionHeading>
        <div className="grid sm:grid-cols-3 gap-x-10 gap-y-4 mb-10">
          {CALL_KEYS.map((key) => (
            <div key={key} className="border-t border-rule pt-3">
              <div className="claim text-base text-ink mb-1.5">
                {t(`cta.expectations.${key}.label`)}
              </div>
              <p className="text-base text-ink-2 leading-relaxed">
                {t(`cta.expectations.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
        <Button asChild size="cta">
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            {common("bookCall")}
          </a>
        </Button>

        <div className="mt-16 border-t border-rule pt-8">
          <h3 className="text-lg font-semibold text-ink mb-2">{t("cta.notReady.title")}</h3>
          <p className="text-base text-ink-2 max-w-xl mb-8 leading-relaxed">
            {t("cta.notReady.body")}
          </p>
          <PrototypeDisclosure
            id="cta-form"
            trigger={t("prototype.cta")}
            copy={form}
            contactEmail={EMAIL}
            mailSubject={t("prototype.mailSubject")}
          />
        </div>

        <p className="text-sm text-muted-foreground mt-10">
          <a href={`mailto:${EMAIL}`} className={inlineLink}>
            {EMAIL}
          </a>
          {" · "}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={inlineLink}>
            WhatsApp
          </a>
          {" · "}
          <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className={inlineLink}>
            Telegram
          </a>
        </p>
      </div>
    </PageSection>
  )
}

export default PlatformClosingSection

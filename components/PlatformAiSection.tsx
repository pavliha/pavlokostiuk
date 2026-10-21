import { useMessages, useTranslations } from "next-intl"

import LedgerNote from "@/components/LedgerNote"
import McpChat from "@/components/McpChat"
import PageSection from "@/components/PageSection"
import ScreenshotGrid from "@/components/ScreenshotGrid"
import SectionHeading from "@/components/SectionHeading"
import SectionIntro from "@/components/SectionIntro"
import { MCP_SHOTS } from "@/content/media"
import { AI_POINT_KEYS } from "@/content/structure"

const PlatformAiSection = () => {
  const t = useTranslations("platform")
  const { chat, asks } = useMessages().platform.ai

  return (
    <PageSection id="ai">
      <SectionHeading title={t("ai.title")}>
        <SectionIntro className="mb-12">{t("ai.intro")}</SectionIntro>
      </SectionHeading>

      <div className="mb-4">
        <McpChat title={t("ai.chat.title")} placeholder={t("ai.chat.placeholder")} turns={chat.turns} />
      </div>
      <p className="text-base text-ink-2 leading-[1.55] mb-10">{t("ai.chat.caption")}</p>

      <ScreenshotGrid shots={MCP_SHOTS} className="lg:grid-cols-1 mb-12" />

      <div className="border border-rule bg-card p-6 mb-6">
        <h3 className="text-base font-semibold text-ink mb-5">{t("ai.asksTitle")}</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {asks.map((ask) => (
            <div
              key={ask}
              className="border-l border-ledger pl-4 py-2 text-base text-ink-2 leading-[1.55]"
            >
              &quot;{ask}&quot;
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-x-14 gap-y-7">
        {AI_POINT_KEYS.map((key) => (
          <LedgerNote key={key} title={t(`ai.points.${key}.title`)}>
            {t(`ai.points.${key}.body`)}
          </LedgerNote>
        ))}
      </div>
    </PageSection>
  )
}

export default PlatformAiSection

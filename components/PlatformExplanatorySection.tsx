import { useMessages, useTranslations } from "next-intl"

import PageSection from "@/components/PageSection"
import SectionHeading from "@/components/SectionHeading"

const PlatformExplanatorySection = () => {
  const t = useTranslations("platform")
  const { blocks } = useMessages().platform.explanatory

  return (
    <PageSection id="explanatory">
      <SectionHeading title={t("explanatory.title")} />
      <div className="max-w-4xl mt-8">
        {blocks.map((block) => (
          <div
            key={block.title}
            className="grid md:grid-cols-[14rem_1fr] gap-x-10 gap-y-2 border-t border-rule py-6"
          >
            <h3 className="claim text-base text-ink text-balance">{block.title}</h3>
            <p className="text-base text-ink-2 leading-[1.7]">{block.body}</p>
          </div>
        ))}
      </div>
    </PageSection>
  )
}

export default PlatformExplanatorySection

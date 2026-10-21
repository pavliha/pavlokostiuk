import { useMessages, useTranslations } from "next-intl"

import PageSection from "@/components/PageSection"
import SectionHeading from "@/components/SectionHeading"

const PlatformStakesSection = () => {
  const t = useTranslations("platform")
  const { items } = useMessages().platform.stakes

  return (
    <PageSection id="stakes" className="py-20">
      <SectionHeading title={t("stakes.title")} />
      <ul className="max-w-3xl mt-8">
        {items.map((item, index) => (
          <li
            key={item}
            className={`border-t border-rule py-4 leading-[1.5] ${
              index === items.length - 1 ? "text-lg font-medium text-ink" : "text-lg text-ink-2"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </PageSection>
  )
}

export default PlatformStakesSection

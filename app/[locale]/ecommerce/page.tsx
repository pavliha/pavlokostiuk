import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale, useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { use } from "react"

import PlatformAiSection from "@/components/PlatformAiSection"
import PlatformAuthoritySection from "@/components/PlatformAuthoritySection"
import PlatformClosingSection from "@/components/PlatformClosingSection"
import PlatformExplanatorySection from "@/components/PlatformExplanatorySection"
import PlatformFeaturesSection from "@/components/PlatformFeaturesSection"
import PlatformHeroSection from "@/components/PlatformHeroSection"
import PlatformPainsSection from "@/components/PlatformPainsSection"
import PlatformPlanSection from "@/components/PlatformPlanSection"
import PlatformPriceSection from "@/components/PlatformPriceSection"
import PlatformProcessSection from "@/components/PlatformProcessSection"
import PlatformPrototypeSection from "@/components/PlatformPrototypeSection"
import PlatformScreensSection from "@/components/PlatformScreensSection"
import PlatformStakesSection from "@/components/PlatformStakesSection"
import SectionRule from "@/components/SectionRule"
import { GlobalFooter, GlobalNav } from "@/components/SiteChrome"
import StickyCallBar from "@/components/StickyCallBar"
import { WHATSAPP } from "@/content/site"
import { locales, routing } from "@/i18n/routing"

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: "platform.meta" })
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/ecommerce`,
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, `/${code}/ecommerce`])),
        "x-default": `/${routing.defaultLocale}/ecommerce`,
      },
    },
  }
}

const EcommercePage = ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = use(params)
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const common = useTranslations("common")

  return (
    <>
      <GlobalNav ctaHref={WHATSAPP} />

      <main>
        <PlatformHeroSection />
        <SectionRule />
        <PlatformStakesSection />
        <SectionRule />
        <PlatformAuthoritySection />
        <SectionRule />
        <PlatformPainsSection />
        <SectionRule />
        <PlatformPlanSection />
        <SectionRule />
        <PlatformPrototypeSection />
        <SectionRule />
        <PlatformAiSection />
        <SectionRule />
        <PlatformFeaturesSection />
        <SectionRule />
        <PlatformExplanatorySection />
        <SectionRule />
        <PlatformPriceSection />
        <SectionRule />
        <PlatformScreensSection />
        <SectionRule />
        <PlatformProcessSection />
        <SectionRule />
        <PlatformClosingSection />
      </main>

      <GlobalFooter reserveStickyBar />

      <StickyCallBar label={common("bookCall")} href={WHATSAPP} hideNear="#prototype" />
    </>
  )
}

export default EcommercePage

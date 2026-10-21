import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { hasLocale, useTranslations } from "next-intl"
import { use } from "react"

import CallToActionLink from "@/components/CallToActionLink"
import VisitSiteButton from "@/components/VisitSiteButton"
import HeroBackdrop from "@/components/HeroBackdrop"
import ScreenshotCard from "@/components/ScreenshotCard"
import { Separator } from "@/components/ui/separator"
import SectionHeading from "@/components/SectionHeading"
import { GlobalFooter, GlobalNav } from "@/components/SiteChrome"
import StickyCallBar from "@/components/StickyCallBar"
import SocialLinks from "@/components/SocialLinks"
import TagList from "@/components/TagList"
import { AIRCAST_SHOTS, INTO_GE_SHOTS, PORTRAIT } from "@/content/media"
import { AIRCAST, INTO_GE, WHATSAPP } from "@/content/site"
import { AIRCAST_TAGS, INTO_GE_TAGS } from "@/content/structure"
import { locales, routing } from "@/i18n/routing"

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

const STAT_KEYS = ["years", "users", "founder"] as const

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: "home.experience" })
  return {
    title: "Pavlo Kostiuk",
    description: t("intro"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, `/${code}`])),
        "x-default": `/${routing.defaultLocale}`,
      },
    },
  }
}

const HomePage = ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = use(params)
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = useTranslations("home")
  const common = useTranslations("common")

  return (
    <>
      <GlobalNav ctaHref={WHATSAPP} />

      <main>
        <header className="px-6 sm:px-10 pt-32 pb-20 relative overflow-hidden noise">
          <HeroBackdrop />
          <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-xs font-medium bg-primary/10 text-primary dark:text-brand-light border border-primary/15">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {t("hero.available")}
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {t("hero.role")}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground mb-6">
                {t("hero.titleStart")}{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {t("hero.titleGradient")}
                </span>{" "}
                {t("hero.titleEnd")}
              </h1>
              <p className="text-foreground/80 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
                {t("hero.body")}
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
                {STAT_KEYS.map((key) => (
                  <div key={key}>
                    <span className="text-2xl font-bold text-foreground">
                      {t(`hero.stats.${key}.value`)}
                    </span>{" "}
                    <span className="text-sm text-muted-foreground">
                      {t(`hero.stats.${key}.label`)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <CallToActionLink
                  label={t("hero.bookCall")}
                  size="lg"
                  className="rounded-lg px-6 py-6 text-sm font-semibold shadow-lg shadow-primary/25"
                />
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border border-border text-foreground hover:bg-muted transition-all"
                >
                  {t("hero.seeWork")}
                </a>
              </div>
              <SocialLinks />
            </div>
            <div className="shrink-0 mx-auto lg:mx-0">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden border shadow-2xl">
                <Image
                  src={PORTRAIT.src}
                  alt={t("hero.portraitAlt")}
                  width={PORTRAIT.width}
                  height={PORTRAIT.height}
                  sizes="(min-width: 640px) 288px, 256px"
                  priority
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </header>

        <Separator />

        <section id="projects" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
          <SectionHeading title={t("aircast.title")}>
            <p className="text-muted-foreground max-w-2xl mb-4">{t("aircast.intro")}</p>
          </SectionHeading>
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            <VisitSiteButton href={AIRCAST} label={common("visitSite")} />
            <TagList tags={AIRCAST_TAGS} />
          </div>
          <div className="flex flex-col gap-8">
            {AIRCAST_SHOTS.map((shot) => (
              <ScreenshotCard
                key={shot.key}
                src={shot.src}
                width={shot.width}
                height={shot.height}
                alt={t(`aircast.shots.${shot.key}.alt`)}
                title={t(`aircast.shots.${shot.key}.title`)}
                body={t(`aircast.shots.${shot.key}.body`)}
              />
            ))}
          </div>
        </section>

        <Separator />

        <section className="py-20 px-6 max-w-5xl mx-auto">
          <SectionHeading title={t("experience.items.intoGe.title")}>
            <p className="text-muted-foreground max-w-2xl mb-4">{t("intoGe.intro")}</p>
          </SectionHeading>
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            <VisitSiteButton href={INTO_GE} label={common("visitSite")} />
            <TagList tags={INTO_GE_TAGS} />
          </div>
          <div className="flex flex-col gap-8">
            {INTO_GE_SHOTS.map((shot) => (
              <ScreenshotCard
                key={shot.key}
                src={shot.src}
                width={shot.width}
                height={shot.height}
                alt={t(`intoGe.shots.${shot.key}.alt`)}
                title={t(`intoGe.shots.${shot.key}.title`)}
                body={t(`intoGe.shots.${shot.key}.body`)}
              />
            ))}
          </div>
        </section>

        <Separator />

        <section id="contact" className="py-24 px-6 max-w-5xl mx-auto text-center scroll-mt-20">
          <SectionHeading title={t("contact.title")}>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">{t("contact.body")}</p>
          </SectionHeading>
          <CallToActionLink
            label={common("bookCall")}
            size="lg"
            className="rounded-xl px-6 py-6 text-sm mb-10"
          />
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            {common("orReachMe")}
          </p>
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </section>
      </main>

      <GlobalFooter reserveStickyBar />

      <StickyCallBar label={common("bookCall")} href={WHATSAPP} hideNear="#contact" />
    </>
  )
}

export default HomePage

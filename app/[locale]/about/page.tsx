import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { hasLocale, useMessages, useTranslations } from "next-intl"
import { use } from "react"

import CallToActionLink from "@/components/CallToActionLink"
import ExperienceCard from "@/components/ExperienceCard"
import VisitSiteButton from "@/components/VisitSiteButton"
import ScreenshotCard from "@/components/ScreenshotCard"
import { Separator } from "@/components/ui/separator"
import SectionHeading from "@/components/SectionHeading"
import { GlobalFooter, GlobalNav } from "@/components/SiteChrome"
import StickyCallBar from "@/components/StickyCallBar"
import SkillEntry from "@/components/SkillEntry"
import SocialLinks from "@/components/SocialLinks"
import TagList from "@/components/TagList"
import { AIRCAST_SHOTS, PORTRAIT } from "@/content/media"
import { AIRCAST, WHATSAPP } from "@/content/site"
import {
  AIRCAST_TAGS,
  EXPERIENCE_KEYS,
  EXPERIENCE_TAGS,
  SKILL_ICONS,
  SKILL_KEYS,
} from "@/content/structure"
import { locales, routing } from "@/i18n/routing"

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: "about.meta" })
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, `/${code}/about`])),
        "x-default": `/${routing.defaultLocale}/about`,
      },
    },
  }
}

const AboutPage = ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = use(params)
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = useTranslations("home")
  const about = useTranslations("about")
  const common = useTranslations("common")
  const { hackathons } = useMessages().home.background

  return (
    <>
      <GlobalNav ctaHref={WHATSAPP} />

      <main>
        <header className="px-6 sm:px-10 pt-32 pb-16">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {t("hero.role")}
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-foreground mb-6">
                {about("title")}
              </h1>
              <p className="text-foreground/80 text-lg max-w-xl mb-8 leading-relaxed">{about("intro")}</p>
              <SocialLinks />
            </div>
            <div className="shrink-0 mx-auto lg:mx-0">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden border shadow-2xl">
                <Image
                  src={PORTRAIT.src}
                  alt={t("hero.portraitAlt")}
                  width={PORTRAIT.width}
                  height={PORTRAIT.height}
                  priority
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </header>

        <Separator />

        <section id="experience" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
          <SectionHeading title={t("experience.title")}>
            <p className="text-muted-foreground max-w-xl mb-12">{t("experience.intro")}</p>
          </SectionHeading>
          <div className="flex flex-col gap-4">
            {EXPERIENCE_KEYS.map((key) => (
              <ExperienceCard
                key={key}
                title={t(`experience.items.${key}.title`)}
                role={t(`experience.items.${key}.role`)}
                via={t(`experience.items.${key}.via`) ? t("experience.via", { company: t(`experience.items.${key}.via`) }) : ""}
                duration={t(`experience.items.${key}.duration`)}
                body={t(`experience.items.${key}.body`)}
                tags={EXPERIENCE_TAGS[key]}
              />
            ))}
          </div>
        </section>

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

        <section id="skills" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
          <SectionHeading title={t("skills.title")}>
            <p className="text-muted-foreground max-w-xl mb-12">{t("skills.intro")}</p>
          </SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {SKILL_KEYS.map((key) => (
              <SkillEntry
                key={key}
                icon={SKILL_ICONS[key]}
                title={t(`skills.items.${key}.title`)}
                body={t(`skills.items.${key}.body`)}
              />
            ))}
          </div>
        </section>

        <Separator />

        <section className="py-20 px-6 max-w-5xl mx-auto">
          <SectionHeading title={t("background.title")}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              <section className="border-t border-rule pt-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary dark:text-brand-light mb-3">
                  {t("background.educationTitle")}
                </h3>
                <div className="text-base font-medium text-ink">{t("background.degree")}</div>
                <div className="text-muted-foreground text-sm mt-1">{t("background.university")}</div>
              </section>
              <section className="border-t border-rule pt-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary dark:text-brand-light mb-3">
                  {t("background.hackathonsTitle")}
                </h3>
                <ul className="space-y-2">
                  {hackathons.map(({ place, date }) => (
                    <li key={place} className="text-muted-foreground text-sm flex justify-between gap-4">
                      {place} <span className="text-muted-foreground text-xs whitespace-nowrap">{date}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </SectionHeading>
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

export default AboutPage

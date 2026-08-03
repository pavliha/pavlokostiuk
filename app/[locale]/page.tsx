import type { Metadata } from "next"
import Image from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { useTranslations } from "next-intl"
import { use } from "react"

import CallToActionLink from "@/components/CallToActionLink"
import ExperienceCard from "@/components/ExperienceCard"
import ExternalIcon from "@/components/ExternalIcon"
import HeroBackdrop from "@/components/HeroBackdrop"
import PanelCard from "@/components/PanelCard"
import ScreenshotCard from "@/components/ScreenshotCard"
import SectionDivider from "@/components/SectionDivider"
import SectionHeading from "@/components/SectionHeading"
import SiteFooter from "@/components/SiteFooter"
import SiteNav from "@/components/SiteNav"
import SkillCard from "@/components/SkillCard"
import SocialLinks from "@/components/SocialLinks"
import TagList from "@/components/TagList"
import { AIRCAST_SHOTS, INTO_GE_SHOTS, PORTRAIT } from "@/content/media"
import { AIRCAST, INTO_GE } from "@/content/site"
import {
  AIRCAST_TAGS,
  EXPERIENCE_KEYS,
  EXPERIENCE_TAGS,
  INTO_GE_TAGS,
  SKILL_ICONS,
  SKILL_KEYS,
} from "@/content/structure"
import { Link } from "@/i18n/navigation"
import { locales } from "@/i18n/routing"

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home.meta" })
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((code) => [code, `/${code}`])),
    },
  }
}

const HomePage = ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = use(params)
  setRequestLocale(locale)
  return <HomeContent />
}

const HomeContent = () => {
  const t = useTranslations("home")
  const nav = useTranslations("nav")
  const common = useTranslations("common")

  const links = [
    { label: nav("experience"), href: "/#experience", accent: false },
    { label: nav("projects"), href: "/#projects", accent: false },
    { label: nav("ecommerce"), href: "/ecommerce", accent: true },
    { label: nav("skills"), href: "/#skills", accent: false },
    { label: nav("contact"), href: "/#contact", accent: false },
  ]

  const statKeys = ["years", "users", "founder"] as const

  return (
    <>
      <SiteNav brandHref="/" links={links} themeLabel={nav("toggleTheme")} languageLabel={nav("language")} />

      <header className="min-h-screen flex items-center px-6 sm:px-10 py-28 relative overflow-hidden noise">
        <HeroBackdrop />
        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-xs font-medium bg-accent/10 text-indigo-700 dark:text-indigo-300 border border-accent/15">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {t("hero.available")}
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-4">
              {t("hero.role")}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-zinc-900 dark:text-white mb-6">
              {t("hero.titleStart")}
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                {t("hero.titleGradient")}
              </span>{" "}
              {t("hero.titleEnd")}
            </h1>
            <p className="text-zinc-700 dark:text-zinc-300 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              {t("hero.body")}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
              {statKeys.map((key) => (
                <div key={key}>
                  <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {t(`hero.stats.${key}.value`)}
                  </span>{" "}
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">{t(`hero.stats.${key}.label`)}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <CallToActionLink
                source="home-hero"
                label={common("bookCall")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-accent text-white hover:bg-accent-strong transition-all shadow-lg shadow-indigo-500/25"
              />
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
              >
                {t("hero.seeWork")}
              </a>
            </div>
            <SocialLinks />
          </div>
          <div className="shrink-0 mx-auto lg:mx-0 relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-500/30 via-purple-500/20 to-pink-500/30 blur-3xl rounded-full pointer-events-none" />
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
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

      <SectionDivider />

      <section id="experience" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
        <SectionHeading eyebrow={t("experience.eyebrow")} title={t("experience.title")}>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mb-12">{t("experience.intro")}</p>
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

      <SectionDivider />

      <section id="projects" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
        <SectionHeading eyebrow={t("aircast.eyebrow")} title={t("aircast.title")}>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-4">{t("aircast.intro")}</p>
        </SectionHeading>
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          <a
            href={AIRCAST}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-strong transition-all"
          >
            <ExternalIcon />
            {common("visitSite")}
          </a>
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

      <SectionDivider />

      <section className="py-20 px-6 max-w-5xl mx-auto">
        <SectionHeading eyebrow="" title={t("intoGe.title")}>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-4">{t("intoGe.intro")}</p>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-4">
            {t("intoGe.offerLead")}{" "}
            <Link
              href="/ecommerce"
              className="text-accent dark:text-accent-light hover:text-accent-strong dark:hover:text-white underline underline-offset-4"
            >
              {t("intoGe.offerLink")}
            </Link>
            .
          </p>
        </SectionHeading>
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          <a
            href={INTO_GE}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-strong transition-all"
          >
            <ExternalIcon />
            {common("visitSite")}
          </a>
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

        <PanelCard className="mt-10 p-6">
          <h3 className="text-lg font-semibold mb-4">{t("intoGe.builtTitle")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {t.raw("intoGe.built").map((item: string) => (
              <div key={item} className="flex items-start gap-2">
                <span className="text-indigo-700 dark:text-indigo-300 mt-0.5">-</span>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </PanelCard>
      </section>

      <SectionDivider />

      <section id="skills" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
        <SectionHeading eyebrow={t("skills.eyebrow")} title={t("skills.title")}>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mb-12">{t("skills.intro")}</p>
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_KEYS.map((key) => (
            <SkillCard
              key={key}
              icon={SKILL_ICONS[key]}
              title={t(`skills.items.${key}.title`)}
              body={t(`skills.items.${key}.body`)}
            />
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="py-20 px-6 max-w-5xl mx-auto">
        <SectionHeading eyebrow={t("background.eyebrow")} title={t("background.title")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <PanelCard className="p-6">
              <h3 className="text-indigo-700 dark:text-indigo-300 font-semibold mb-3">
                {t("background.educationTitle")}
              </h3>
              <div className="text-base font-medium">{t("background.degree")}</div>
              <div className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">{t("background.university")}</div>
            </PanelCard>
            <PanelCard className="p-6">
              <h3 className="text-indigo-700 dark:text-indigo-300 font-semibold mb-3">
                {t("background.hackathonsTitle")}
              </h3>
              <ul className="space-y-2">
                {t.raw("background.hackathons").map(({ place, date }: { place: string; date: string }) => (
                  <li key={place} className="text-zinc-600 dark:text-zinc-400 text-sm flex justify-between gap-4">
                    {place} <span className="text-zinc-600 dark:text-zinc-400 text-xs whitespace-nowrap">{date}</span>
                  </li>
                ))}
              </ul>
            </PanelCard>
          </div>
        </SectionHeading>
      </section>

      <SectionDivider />

      <section id="contact" className="py-24 px-6 max-w-5xl mx-auto text-center scroll-mt-20">
        <SectionHeading eyebrow={t("contact.eyebrow")} title={t("contact.title")}>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8">{t("contact.body")}</p>
        </SectionHeading>
        <CallToActionLink
          source="home-contact"
          label={common("bookCall")}
          className="inline-flex items-center px-8 py-4 rounded-xl font-medium bg-accent text-white hover:bg-accent-strong transition-all mb-10"
        />
        <p className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-4">
          {common("orReachMe")}
        </p>
        <div className="flex justify-center">
          <SocialLinks />
        </div>
      </section>

      <SiteFooter reserveStickyBar={false} copyright={common("copyright")}>
        {null}
      </SiteFooter>
    </>
  )
}

export default HomePage

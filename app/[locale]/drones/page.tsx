import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { hasLocale, useMessages, useTranslations } from "next-intl"
import { use } from "react"
import { ArrowUpRight, ExternalLink } from "lucide-react"

import BulletList from "@/components/BulletList"
import ScreenshotCard from "@/components/ScreenshotCard"
import SectionHeading from "@/components/SectionHeading"
import SectionIntro from "@/components/SectionIntro"
import { GlobalFooter } from "@/components/SiteChrome"
import SiteNav from "@/components/SiteNav"
import SocialLinks from "@/components/SocialLinks"
import StatLedger from "@/components/StatLedger"
import TagList from "@/components/TagList"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AIRCAST_SHOTS, DRONE_SHOTS, PORTRAIT } from "@/content/media"
import { AIRCAST, EMAIL } from "@/content/site"
import { DRONE_REPOS, DRONE_SECTION_KEYS, DRONE_TAGS } from "@/content/structure"
import { locales, routing } from "@/i18n/routing"

const GITHUB_ORG = "https://github.com/aircast-one"
const HERO_SHOT = AIRCAST_SHOTS[0]

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: "drones.meta" })
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/drones`,
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, `/${code}/drones`])),
        "x-default": `/${routing.defaultLocale}/drones`,
      },
    },
  }
}

const DronesPage = ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = use(params)
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = useTranslations("drones")
  const home = useTranslations("home")
  const common = useTranslations("common")
  const nav = useTranslations("nav")
  const { drones } = useMessages()

  return (
    <>
      <SiteNav
        brandHref="/"
        links={[
          { label: nav("about"), href: "/about", accent: false, compact: true },
          { label: nav("drones"), href: "/drones", accent: false, current: true },
        ]}
        themeLabel={nav("toggleTheme")}
        languageLabel={nav("language")}
        cta={{ label: t("contact.email"), href: `mailto:${EMAIL}` }}
      />

      <main>
        <header className="px-6 sm:px-10 pt-32 pb-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {t("hero.role")}
              </p>
              <p className="text-sm font-medium text-primary dark:text-brand-light mb-5">{t("hero.available")}</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-foreground mb-6 text-balance">
                {t("hero.title")}
              </h1>
              <p className="text-foreground/80 text-lg mb-6 leading-relaxed">{t("hero.intro")}</p>
              <BulletList
                items={drones.hero.tldr}
                className="space-y-2 mb-8"
                itemClassName="text-base text-ink leading-[1.5] font-medium"
                dotClassName="bg-primary"
              />
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <Button asChild size="lg" className="rounded-xl">
                  <a href={`mailto:${EMAIL}`}>{t("contact.email")}</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl">
                  <a href={GITHUB_ORG} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    {t("hero.github")}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl">
                  <a href={AIRCAST} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    {common("visitSite")}
                  </a>
                </Button>
              </div>
              <SocialLinks />
            </div>
            <figure className="border border-rule bg-card rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={HERO_SHOT.src}
                alt={home(`aircast.shots.${HERO_SHOT.key}.alt`)}
                width={HERO_SHOT.width}
                height={HERO_SHOT.height}
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="w-full h-auto"
              />
            </figure>
          </div>
          <div className="max-w-6xl mx-auto mt-10">
            <TagList tags={DRONE_TAGS} />
          </div>
        </header>

        <Separator />

        <section className="py-20 px-6 max-w-5xl mx-auto">
          <StatLedger hero={drones.ledger.hero} note={t("ledger.note")} rest={drones.ledger.rest} />
        </section>

        {DRONE_SECTION_KEYS.map((key) => (
          <section key={key} id={key} className="scroll-mt-20">
            <Separator />
            <div className="py-20 px-6 max-w-5xl mx-auto">
              <SectionHeading title={t(`${key}.title`)}>
                <SectionIntro>{t(`${key}.intro`)}</SectionIntro>
              </SectionHeading>
              <BulletList
                items={drones[key].bullets}
                className="space-y-3 max-w-3xl mb-10"
                itemClassName="text-base text-ink-2 leading-[1.55]"
                dotClassName="bg-ledger"
              />
              <ScreenshotCard
                src={DRONE_SHOTS[key].src}
                width={DRONE_SHOTS[key].width}
                height={DRONE_SHOTS[key].height}
                alt={t(`${key}.shot.alt`)}
                title={t(`${key}.shot.title`)}
                body={t(`${key}.shot.body`)}
              />
            </div>
          </section>
        ))}

        <Separator />

        <section id="repos" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
          <SectionHeading title={t("repos.title")}>
            <SectionIntro>{t("repos.intro")}</SectionIntro>
          </SectionHeading>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DRONE_REPOS.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 h-full border border-rule bg-card rounded-xl p-5 hover:border-primary/40 transition-colors"
                >
                  <span className="flex items-center gap-2 font-mono text-sm font-semibold text-ink">
                    {t(`repos.items.${key}.title`)}
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </span>
                  <span className="text-sm text-ink-2 leading-[1.55]">{t(`repos.items.${key}.body`)}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <section id="console" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
          <SectionHeading title={t("shots.title")}>
            <SectionIntro>{t("shots.intro")}</SectionIntro>
          </SectionHeading>
          <div className="flex flex-col gap-8">
            {AIRCAST_SHOTS.map((shot) => (
              <ScreenshotCard
                key={shot.key}
                src={shot.src}
                width={shot.width}
                height={shot.height}
                alt={home(`aircast.shots.${shot.key}.alt`)}
                title={home(`aircast.shots.${shot.key}.title`)}
                body={home(`aircast.shots.${shot.key}.body`)}
              />
            ))}
          </div>
        </section>

        <Separator />

        <section id="contact" className="py-24 px-6 max-w-5xl mx-auto text-center scroll-mt-20">
          <div className="relative w-28 h-28 mx-auto mb-8 rounded-full overflow-hidden border shadow-lg">
            <Image
              src={PORTRAIT.src}
              alt={home("hero.portraitAlt")}
              width={PORTRAIT.width}
              height={PORTRAIT.height}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <SectionHeading title={t("contact.title")}>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">{t("contact.body")}</p>
          </SectionHeading>
          <Button asChild size="lg" className="rounded-xl px-6 py-6 text-sm mb-10">
            <a href={`mailto:${EMAIL}`}>{t("contact.email")}</a>
          </Button>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{common("orReachMe")}</p>
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </section>
      </main>

      <GlobalFooter />
    </>
  )
}

export default DronesPage

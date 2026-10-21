import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { hasLocale, useMessages, useTranslations } from "next-intl"
import { use } from "react"
import { ArrowUpRight } from "lucide-react"

import BulletList from "@/components/BulletList"
import ScreenshotCard from "@/components/ScreenshotCard"
import SectionHeading from "@/components/SectionHeading"
import SectionIntro from "@/components/SectionIntro"
import { GlobalFooter, GlobalNav } from "@/components/SiteChrome"
import SocialLinks from "@/components/SocialLinks"
import StatLedger from "@/components/StatLedger"
import TagList from "@/components/TagList"
import VisitSiteButton from "@/components/VisitSiteButton"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AIRCAST_SHOTS } from "@/content/media"
import { AIRCAST, EMAIL } from "@/content/site"
import { DRONE_REPOS, DRONE_SECTION_KEYS, DRONE_TAGS } from "@/content/structure"
import { locales, routing } from "@/i18n/routing"

const GITHUB_ORG = "https://github.com/aircast-one"

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
  const { drones } = useMessages()

  return (
    <>
      <GlobalNav ctaHref={`mailto:${EMAIL}`} />

      <main>
        <header className="px-6 sm:px-10 pt-32 pb-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              {t("hero.role")}
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-foreground mb-6 max-w-3xl text-balance">
              {t("hero.title")}
            </h1>
            <p className="text-foreground/80 text-lg max-w-2xl mb-8 leading-relaxed">{t("hero.intro")}</p>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <VisitSiteButton href={GITHUB_ORG} label={t("hero.github")} />
              <VisitSiteButton href={AIRCAST} label={common("visitSite")} />
            </div>
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
                className="space-y-3 max-w-3xl"
                itemClassName="text-base text-ink-2 leading-[1.55]"
                dotClassName="bg-ledger"
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

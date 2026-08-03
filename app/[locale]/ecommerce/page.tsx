import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { useTranslations } from "next-intl"
import { use } from "react"

import LedgerGroup from "@/components/LedgerGroup"
import LedgerNote from "@/components/LedgerNote"
import StatLedger from "@/components/StatLedger"
import CallToActionLink from "@/components/CallToActionLink"
import EmailCapture from "@/components/EmailCapture"
import { Card } from "@/components/ui/card"
import ScreenshotCard from "@/components/ScreenshotCard"
import { Separator } from "@/components/ui/separator"
import SectionHeading from "@/components/SectionHeading"
import SiteFooter from "@/components/SiteFooter"
import SiteNav from "@/components/SiteNav"
import StickyCallBar from "@/components/StickyCallBar"
import { PLATFORM_SHOTS } from "@/content/media"
import { EMAIL, INTO_GE, TELEGRAM } from "@/content/site"
import { AI_POINT_KEYS, CALL_KEYS, FEATURE_KEYS, PRICE_KEYS, PROCESS_KEYS, STAT_KEYS } from "@/content/structure"
import { Link } from "@/i18n/navigation"
import { locales } from "@/i18n/routing"

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "platform.meta" })
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/ecommerce`,
      languages: Object.fromEntries(locales.map((code) => [code, `/${code}/ecommerce`])),
    },
  }
}

const EcommercePage = ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = use(params)
  setRequestLocale(locale)
  return <EcommerceContent />
}

const EcommerceContent = () => {
  const t = useTranslations("platform")
  const nav = useTranslations("nav")
  const common = useTranslations("common")

  const links = [
    { label: nav("ai"), href: "/ecommerce#ai", accent: false },
    { label: nav("features"), href: "/ecommerce#features", accent: false },
    { label: nav("screens"), href: "/ecommerce#screens", accent: false },
    { label: nav("price"), href: "/ecommerce#price", accent: false },
    { label: nav("process"), href: "/ecommerce#process", accent: false },
  ]

  return (
    <>
      <SiteNav brandHref="/" links={links} themeLabel={nav("toggleTheme")} languageLabel={nav("language")} />

      <section className="pt-36 pb-16 px-6 max-w-5xl mx-auto">
        <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-brand-light border border-primary/20 mb-6">
          {t("hero.badge")}
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
          {t("hero.titleLine1")}
          <br />
          <span className="text-primary dark:text-brand-light">{t("hero.titleLine2")}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed">
          {t("hero.bodyStart")} <em>{t("hero.bodyYour")}</em> {t("hero.bodyEnd")}{" "}
          <a
            href={INTO_GE}
            target="_blank"
            rel="noopener"
            className="text-primary dark:text-brand-light hover:text-brand-strong underline underline-offset-4"
          >
            into.ge
          </a>
          .
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <CallToActionLink
            source="hero"
            label={common("bookCall30")}
            size="lg"
            className="rounded-xl px-6 py-6 text-sm"
          />
          <a
            href="#screens"
            className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium bg-card border hover:border-primary transition-all"
          >
            {t("hero.seeWhole")}
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("hero.eligibility")}{" "}
          <a
            href="#price"
            className="text-primary dark:text-brand-light hover:text-brand-strong underline underline-offset-4"
          >
            {t("hero.whatItCosts")}
          </a>
        </p>
      </section>

      <section className="px-6 max-w-5xl mx-auto pb-20">
        <StatLedger
          hero={{ value: t("stats.tools.value"), label: t("stats.tools.label") }}
          note={t("stats.note")}
          rest={STAT_KEYS.filter((key) => key !== "tools").map((key) => ({
            value: t(`stats.${key}.value`),
            label: t(`stats.${key}.label`),
          }))}
        />
      </section>

      <Separator />

      <section id="ai" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
        <SectionHeading eyebrow={t("ai.eyebrow")} title={t("ai.title")}>
          <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">{t("ai.intro")}</p>
        </SectionHeading>

        <Card className="p-6 mb-6">
          <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-5">
            {t("ai.asksTitle")}
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {t.raw("ai.asks").map((ask: string) => (
              <div
                key={ask}
                className="rounded-xl bg-muted/40 border p-4 text-sm text-foreground/80"
              >
                &quot;{ask}&quot;
              </div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-x-14 gap-y-7">
          {AI_POINT_KEYS.map((key) => (
            <LedgerNote key={key} title={t(`ai.points.${key}.title`)}>
              {t(`ai.points.${key}.body`)}
            </LedgerNote>
          ))}
        </div>
      </section>

      <Separator />

      <section id="features" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
        <SectionHeading eyebrow={t("features.eyebrow")} title={t("features.title")}>
          <p className="text-muted-foreground max-w-2xl mb-6 leading-relaxed">{t("features.intro")}</p>
        </SectionHeading>
        <div className="flex flex-wrap gap-1.5 mb-10">
          {FEATURE_KEYS.map((key) => (
            <span
              key={key}
              className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground border"
            >
              {t(`features.groups.${key}.title`)}
            </span>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-9">
          {FEATURE_KEYS.map((key) => (
            <LedgerGroup
              key={key}
              title={t(`features.groups.${key}.title`)}
              bullets={t.raw(`features.groups.${key}.bullets`)}
            />
          ))}
        </div>
      </section>

      <Separator />

      <section id="screens" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
        <SectionHeading eyebrow={t("screens.eyebrow")} title={t("screens.title")}>
          {null}
        </SectionHeading>
        <div className="flex flex-col gap-8 mt-6">
          {PLATFORM_SHOTS.map((shot) => (
            <ScreenshotCard
              key={shot.key}
              src={shot.src}
              width={shot.width}
              height={shot.height}
              alt={t(`screens.shots.${shot.key}.alt`)}
              title={t(`screens.shots.${shot.key}.title`)}
              body={t(`screens.shots.${shot.key}.body`)}
            />
          ))}
        </div>

        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold mb-2">{t("audit.title")}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t("audit.intro")}</p>
          <div className="rounded-xl bg-muted/40 border p-4 mb-3">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              {t("audit.you")}
            </div>
            <p className="text-sm text-foreground/80">{t("audit.question")}</p>
          </div>
          <div className="rounded-xl bg-muted/40 border p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              {t("audit.store")}
            </div>
            <ul className="text-sm text-foreground/80 space-y-1.5 leading-relaxed">
              {t.raw("audit.findings").map((finding: string) => (
                <li key={finding}>— {finding}</li>
              ))}
            </ul>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed mt-4">{t("audit.footnote")}</p>
        </Card>
      </section>

      <Separator />

      <section id="price" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
        <SectionHeading eyebrow={t("price.eyebrow")} title={t("price.title")}>
          <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">{t("price.intro")}</p>
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-9">
          {PRICE_KEYS.map((key) => (
            <LedgerGroup
              key={key}
              title={t(`price.groups.${key}.title`)}
              bullets={t.raw(`price.groups.${key}.bullets`)}
            />
          ))}
        </div>
      </section>

      <Separator />

      <section id="process" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
        <SectionHeading eyebrow={t("process.eyebrow")} title={t("process.title")}>
          {null}
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-7 mt-6 mb-14">
          {PROCESS_KEYS.map((key) => (
            <section key={key} className="border-t border-rule pt-4">
              <div className="figure text-primary dark:text-brand-light font-semibold text-sm mb-1.5">
                {t(`process.steps.${key}.step`)}
              </div>
              <h3 className="font-semibold mb-1.5 text-ink">{t(`process.steps.${key}.title`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`process.steps.${key}.body`)}
              </p>
            </section>
          ))}
        </div>

        <div className="border-t-2 border-rule pt-6">
          <h3 className="text-lg font-semibold mb-4 text-ink">{t("shopify.title")}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t("shopify.intro")}</p>
          <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
            {t.raw("shopify.reasons").map((reason: string) => (
              <li key={reason} className="relative pl-4">
                <span className="absolute left-0 top-[0.62em] h-px w-1.5 bg-ledger" aria-hidden="true" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Separator />

      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="border-t border-rule pt-6 mb-16 max-w-2xl">
          <h3 className="text-lg font-semibold mb-2">{t("bio.title")}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t("bio.body1")}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("bio.body2")}{" "}
            <Link
              href="/"
              className="text-primary dark:text-brand-light hover:text-brand-strong underline underline-offset-4"
            >
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

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t("cta.title")}</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">{t("cta.intro")}</p>
          <div className="grid sm:grid-cols-3 gap-3 text-left mb-8">
            {CALL_KEYS.map((key) => (
              <div key={key} className="border-t border-rule pt-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary dark:text-brand-light mb-1.5">
                  {t(`cta.expectations.${key}.label`)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`cta.expectations.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
          <CallToActionLink
            source="footer"
            label={common("bookCall")}
            size="lg"
            className="rounded-xl px-8 py-7 mb-10"
          />
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            {common("orReachMe")}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href={`mailto:${EMAIL}`}
              className="px-5 py-3 bg-card border rounded-xl text-sm hover:border-primary transition-all"
            >
              {EMAIL}
            </a>
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener"
              className="px-5 py-3 bg-card border rounded-xl text-sm hover:border-primary transition-all"
            >
              @pavliha
            </a>
          </div>
        </div>
      </section>

      <SiteFooter reserveStickyBar copyright={common("copyright")}>
        <Link href="/" className="hover:text-foreground transition-colors">
          {common("backToSite")}
        </Link>
      </SiteFooter>

      <StickyCallBar label={common("bookCall30")} />
    </>
  )
}

export default EcommercePage

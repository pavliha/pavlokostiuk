import type { Metadata } from "next"
import Image from "next/image"
import { MonitorCheck, Rocket, Send } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { useTranslations } from "next-intl"
import { use } from "react"

import LedgerGroup from "@/components/LedgerGroup"
import McpChat from "@/components/McpChat"
import LedgerNote from "@/components/LedgerNote"
import EmailCapture from "@/components/EmailCapture"
import PainFigure from "@/components/PainFigure"
import PainPromise from "@/components/PainPromise"
import PainRow from "@/components/PainRow"
import PrototypeRequest from "@/components/PrototypeRequest"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import ScreenshotCard from "@/components/ScreenshotCard"
import SectionHeading from "@/components/SectionHeading"
import StatLedger from "@/components/StatLedger"
import SiteFooter from "@/components/SiteFooter"
import SiteNav from "@/components/SiteNav"
import StickyCallBar from "@/components/StickyCallBar"
import { ADMIN_SHOTS, MCP_SHOTS, PAIN_SHOTS, PLATFORM_HERO_SHOT, STOREFRONT_SHOTS } from "@/content/media"
import { EMAIL, TELEGRAM, WHATSAPP } from "@/content/site"
import {
  AI_POINT_KEYS,
  CALL_KEYS,
  FEATURE_KEYS,
  LEAD_PAIN_KEY,
  PAIN_KEYS,
  PRICE_DETAIL_KEYS,
  PRICE_KEYS,
  PROCESS_KEYS,
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

const PLAN_ICON_COMPONENTS = [Send, MonitorCheck, Rocket] as const

const EcommerceContent = () => {
  const t = useTranslations("platform")
  const nav = useTranslations("nav")
  const common = useTranslations("common")

  const links = [
    { label: nav("pains"), href: "/ecommerce#pains", accent: false },
    { label: nav("features"), href: "/ecommerce#features", accent: false, compact: true },
    { label: nav("price"), href: "/ecommerce#price", accent: false },
    { label: nav("screens"), href: "/ecommerce#screens", accent: false, compact: true },
  ]

  return (
    <>
      <SiteNav
        brandHref="/"
        links={links}
        themeLabel={nav("toggleTheme")}
        languageLabel={nav("language")}
        cta={{ label: common("bookCall"), href: WHATSAPP }}
      />

      <section className="pt-24 pb-0">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 pt-16 pb-20">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
            <div>
              <h1 className="claim text-ink text-[clamp(2.5rem,6vw,3.5rem)] mb-6 max-w-[17ch] text-balance">
                {t("hero.headline")}
              </h1>
              <p className="text-lg text-ink-2 max-w-xl mb-9 leading-[1.6]">{t("hero.subhead")}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="h-auto min-h-13 shrink py-3 whitespace-normal text-center">
                  <a href={WHATSAPP} target="_blank" rel="noopener">
                    {common("bookCall")}
                  </a>
                </Button>
                <a
                  href="#prototype"
                  className="text-base text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  {t("hero.ctaTransitional")}
                </a>
              </div>
              <p className="mt-8 pt-6 border-t border-rule text-sm text-muted-foreground max-w-md leading-[1.6]">
                {t("hero.proof")}
              </p>
            </div>
            <div className="shot rounded-xl border border-rule p-2 lg:p-3 shadow-[0_12px_32px_-16px_rgba(16,18,29,0.22)] dark:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.75)]">
              <Image
                src={PLATFORM_HERO_SHOT.src}
                width={PLATFORM_HERO_SHOT.width}
                height={PLATFORM_HERO_SHOT.height}
                alt={t("hero.shotAlt")}
                priority
                className="w-full h-auto rounded-lg border border-rule"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Separator />
      </div>

      <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-20">
        <SectionHeading title={t("stakes.title")}>{null}</SectionHeading>
        <ul className="max-w-3xl mt-8">
          {t.raw("stakes.items").map((item: string, index: number, all: string[]) => (
            <li
              key={item}
              className={`border-t border-rule py-4 leading-[1.5] ${
                index === all.length - 1
                  ? "text-lg font-medium text-ink"
                  : "text-lg text-ink-2"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Separator />
      </div>

      <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-24">
        <SectionHeading title={t("authority.title")}>
          <p className="text-lg text-ink-2 max-w-2xl mb-10 leading-[1.6]">
            {t("authority.body")}
          </p>
        </SectionHeading>
        <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-3 mb-10 max-w-4xl">
          {t.raw("authority.hows").map((how: string) => (
            <li key={how} className="flex gap-3 text-base text-ink leading-[1.55]">
              <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-primary" />
              <span>{how}</span>
            </li>
          ))}
        </ul>
        <dl className="grid grid-cols-1 sm:grid-cols-2 border-t border-rule">
          {t.raw("authority.items").map((item: { value: string; label: string }, index: number, all: unknown[]) => (
            <div
              key={item.label}
              className={`pt-4 pr-6 pb-1 ${index < all.length - 1 ? "sm:border-r border-rule" : ""} ${
                index > 0 ? "border-t sm:border-t-0 border-rule mt-4 sm:mt-0 sm:pl-6" : ""
              }`}
            >
              <dt className="printed text-2xl font-bold mb-1 text-ink">{item.value}</dt>
              <dd className="text-xs text-muted-foreground leading-snug">{item.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Separator />
      </div>

      <section id="pains" className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-24 scroll-mt-24">
        <SectionHeading title={t("pains.title")}>
          <p className="text-lg text-ink-2 max-w-2xl mb-12 leading-[1.6]">{t("pains.intro")}</p>
        </SectionHeading>

        <section
          id={`pain-${LEAD_PAIN_KEY}`}
          className="border-t border-rule pt-6 scroll-mt-24 grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start"
        >
          <div>
            <p className="figure text-sm text-muted-foreground mb-3">01</p>
            <h3 className="claim text-2xl sm:text-3xl text-ink mb-4 text-balance">
              &ldquo;{t(`pains.items.${LEAD_PAIN_KEY}.misery`)}&rdquo;
            </h3>
            <p className="text-lg text-ink-2 leading-[1.6] mb-6">
              {t(`pains.items.${LEAD_PAIN_KEY}.moment`)}
            </p>
            <PainPromise
              promise={t(`pains.items.${LEAD_PAIN_KEY}.promise`)}
              proof={t(`pains.items.${LEAD_PAIN_KEY}.proof`)}
            />
          </div>
          <StatLedger
            hero={t.raw("pains.lead.hero")}
            note={t("pains.lead.note")}
            rest={t.raw("pains.lead.stats")}
          />
        </section>

        <div className="shot rounded-xl border border-rule p-2 mt-10 shadow-[0_10px_28px_-16px_rgba(16,18,29,0.2)] dark:shadow-[0_10px_32px_-16px_rgba(0,0,0,0.7)]">
          <Image
            src={PAIN_SHOTS[LEAD_PAIN_KEY].src}
            width={PAIN_SHOTS[LEAD_PAIN_KEY].width}
            height={PAIN_SHOTS[LEAD_PAIN_KEY].height}
            alt={t(`pains.items.${LEAD_PAIN_KEY}.shotAlt`)}
            loading="lazy"
            className="w-full h-auto rounded-lg border border-rule"
          />
        </div>

        <div className="grid gap-16 mt-16">
          {PAIN_KEYS.map((key, index) => (
            <section key={key} id={`pain-${key}`} className="scroll-mt-24">
              <PainRow
                index={`0${index + 2}`}
                misery={t(`pains.items.${key}.misery`)}
                moment={t(`pains.items.${key}.moment`)}
                promise={t(`pains.items.${key}.promise`)}
                proof={t(`pains.items.${key}.proof`)}
                shot={PAIN_SHOTS[key]}
                shotAlt={PAIN_SHOTS[key] ? t(`pains.items.${key}.shotAlt`) : undefined}
                figure={PAIN_SHOTS[key] ? null : <PainFigure name={key} />}
                flipped={index % 2 === 1}
              />
            </section>
          ))}
        </div>

        <div className="mt-16 max-w-3xl">
          <LedgerGroup title={t("pains.alsoTitle")} bullets={t.raw("pains.also")} />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-rule pt-8">
          <Button asChild size="lg" className="h-auto min-h-13 shrink py-3 whitespace-normal text-center">
            <a href="#prototype">{t("prototype.cta")}</a>
          </Button>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            {t("pains.ctaNote")}
          </p>
        </div>
      </section>


      <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-24">
        <SectionHeading title={t("plan.title")}>{null}</SectionHeading>
        <ol className="grid sm:grid-cols-3 gap-x-12 gap-y-10 mt-10">
          {t.raw("plan.steps").map(
            (step: { when: string; title: string; body: string }, index: number) => {
              const Icon = PLAN_ICON_COMPONENTS[index]
              return (
                <li key={step.title} className="border-t border-rule pt-5">
                  <div className="flex items-baseline justify-between gap-4 mb-6">
                    <span className="printed text-2xl font-bold text-ink">{`0${index + 1}`}</span>
                    <span className="text-xs text-muted-foreground text-right">{step.when}</span>
                  </div>
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-10 text-primary mb-5"
                  />
                  <p className="text-lg font-semibold text-ink mb-2">{step.title}</p>
                  <p className="text-base text-ink-2 leading-[1.55]">{step.body}</p>
                </li>
              )
            }
          )}
        </ol>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Separator />
      </div>

      <section id="prototype" className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-24 scroll-mt-24">
        <div className="border border-rule bg-card p-6 sm:p-10">
          <SectionHeading title={t("prototype.title")}>
            <p className="text-lg text-ink-2 max-w-2xl mb-10 leading-[1.6]">
              {t("prototype.body")}
            </p>
          </SectionHeading>
          <ol className="grid sm:grid-cols-2 gap-x-12 gap-y-5 mb-8">
            {t.raw("prototype.steps").map((step: string, index: number) => (
              <li key={step} className="flex gap-3">
                <span className="text-sm font-medium text-muted-foreground shrink-0 pt-0.5">
                  {`0${index + 1}`}
                </span>
                <span className="text-base text-ink-2 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <PrototypeRequest
            id="prototype-form"
            copy={t.raw("prototype.form")}
            contactEmail={EMAIL}
            mailSubject={t("prototype.mailSubject")}
          />
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
              className="text-sm text-primary dark:text-brand-light hover:text-brand-strong underline underline-offset-4"
            >
              {t("prototype.orBook")}
            </a>
          </div>
          <p className="text-xs text-muted-foreground max-w-md leading-relaxed mt-5">
            {t("prototype.note")}
          </p>
          <p className="text-xs text-ink-2 max-w-md leading-relaxed mt-3 border-t border-rule pt-3">
            {t("prototype.scarcity")}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Separator />
      </div>

      <section id="ai" className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-24 scroll-mt-24">
        <SectionHeading title={t("ai.title")}>
          <p className="text-lg text-ink-2 max-w-2xl mb-12 leading-[1.6]">{t("ai.intro")}</p>
        </SectionHeading>

        <div className="mb-4">
          <McpChat
            title={t("ai.chat.title")}
            placeholder={t("ai.chat.placeholder")}
            turns={t.raw("ai.chat.turns")}
          />
        </div>
        <p className="text-base text-ink-2 leading-[1.55] mb-10">{t("ai.chat.caption")}</p>

        <div className="mb-12">
          {MCP_SHOTS.map((shot) => (
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

        <div className="border border-rule bg-card p-6 mb-6">
          <h3 className="text-base font-semibold text-ink mb-5">
            {t("ai.asksTitle")}
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {t.raw("ai.asks").map((ask: string) => (
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
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Separator />
      </div>

      <section id="features" className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-24 scroll-mt-24">
        <SectionHeading title={t("features.title")}>
          <p className="text-lg text-ink-2 max-w-2xl mb-10 leading-[1.6]">{t("features.intro")}</p>
        </SectionHeading>

        <p className="text-sm text-muted-foreground mb-6">
          {t("features.tally", {
            areas: FEATURE_KEYS.length,
            items: FEATURE_KEYS.reduce(
              (total, key) => total + t.raw(`features.groups.${key}.bullets`).length,
              0,
            ),
          })}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-px bg-rule border border-rule mb-10">
          {FEATURE_KEYS.map((key) => (
            <div
              key={key}
              className="bg-background px-4 py-3.5 text-sm font-medium text-ink leading-snug"
            >
              {t(`features.groups.${key}.title`)}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {ADMIN_SHOTS.map((shot) => (
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

        <Accordion type="single" collapsible className="">
          <AccordionItem value="all" className="border-none">
            <AccordionTrigger className="text-base font-medium hover:no-underline">
              {t("features.showAll")}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-12 mt-10">
            {FEATURE_KEYS.map((key) => (
              <LedgerGroup
                key={key}
                title={t(`features.groups.${key}.title`)}
                bullets={t.raw(`features.groups.${key}.bullets`)}
              />
            ))}
          </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Separator />
      </div>

      <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-24">
        <SectionHeading title={t("explanatory.title")}>{null}</SectionHeading>
        <div className="max-w-4xl mt-8">
          {t.raw("explanatory.blocks").map((block: { title: string; body: string }) => (
            <div
              key={block.title}
              className="grid md:grid-cols-[14rem_1fr] gap-x-10 gap-y-2 border-t border-rule py-6"
            >
              <h3 className="claim text-base text-ink text-balance">{block.title}</h3>
              <p className="text-base text-ink-2 leading-[1.7]">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Separator />
      </div>

      <section id="price" className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-24 scroll-mt-24">
        <SectionHeading title={t("price.title")}>
          <p className="text-lg text-ink-2 max-w-2xl mb-10 leading-[1.6]">{t("price.intro")}</p>
        </SectionHeading>

        <div className="max-w-3xl mb-14">
          <StatLedger
            hero={t.raw("price.figures")[0]}
            note={t("price.anchor.note")}
            rest={t.raw("price.figures").slice(1)}
          />
        </div>

        <div className="border-t border-rule pt-6 mb-12 max-w-3xl">
          <h3 className="text-2xl font-semibold text-ink mb-4">
            {t("price.rate.headline")}
          </h3>
          <p className="text-sm text-ink-2 leading-relaxed mb-5">{t("price.rate.body")}</p>
          <p className="text-sm text-ink-2 leading-relaxed pt-5 border-t border-rule">
            {t("price.rate.terms")}
          </p>
          <p className="text-sm text-ink-2 leading-relaxed mt-5">
            {t("price.rate.hourly")}
          </p>
        </div>

        <div className="mb-12 max-w-2xl">
          <LedgerGroup
            title={t("price.anchor.neverStopTitle")}
            bullets={t.raw("price.anchor.neverStop")}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {PRICE_KEYS.map((key) => (
            <LedgerGroup
              key={key}
              title={t(`price.groups.${key}.title`)}
              bullets={t.raw(`price.groups.${key}.bullets`)}
            />
          ))}
        </div>

        <Accordion type="single" collapsible className="mt-12">
          <AccordionItem value="all" className="border-none">
            <AccordionTrigger className="text-base font-medium hover:no-underline">
              {t("price.showAll")}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-12 mt-10">
                {PRICE_DETAIL_KEYS.map((key) => (
                  <LedgerGroup
                    key={key}
                    title={t(`price.groups.${key}.title`)}
                    bullets={t.raw(`price.groups.${key}.bullets`)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-rule pt-8">
          <Button asChild size="lg" className="h-auto min-h-13 shrink py-3 whitespace-normal text-center">
            <a href="#prototype">{t("prototype.cta")}</a>
          </Button>
          <p className="text-sm text-ink-2 max-w-sm leading-relaxed">{t("price.ctaNote")}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Separator />
      </div>

      <section id="screens" className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-24 scroll-mt-24">
        <SectionHeading title={t("screens.title")}>
          {null}
        </SectionHeading>
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {STOREFRONT_SHOTS.map((shot) => (
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

        <div className="border border-rule bg-card mt-8 p-6">
          <h3 className="text-xl font-semibold text-ink mb-3">{t("audit.title")}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t("audit.intro")}</p>
          <div className="border-l border-ledger pl-4 py-2 mb-3">
            <div className="text-xs font-medium text-muted-foreground mb-2">
              {t("audit.you")}
            </div>
            <p className="text-sm text-foreground/80">{t("audit.question")}</p>
          </div>
          <div className="border-l border-accent-blue bg-secondary/60 pl-4 py-3">
            <div className="text-xs font-medium text-muted-foreground mb-2">
              {t("audit.store")}
            </div>
            <ul className="text-sm text-foreground/80 space-y-1.5 leading-relaxed">
              {t.raw("audit.findings").map((finding: string) => (
                <li key={finding} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ledger" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed mt-4">{t("audit.footnote")}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Separator />
      </div>

      <section id="process" className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-24 scroll-mt-24">
        <SectionHeading title={t("process.title")}>
          {null}
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-7 mt-6 mb-14">
          {PROCESS_KEYS.map((key) => (
            <section key={key} className="border-t border-rule pt-4">
              <div className="text-sm font-semibold text-ink mb-1.5">
                {t(`process.steps.${key}.step`)}
              </div>
              <h3 className="font-semibold mb-1.5 text-ink">{t(`process.steps.${key}.title`)}</h3>
              <p className="text-base text-ink-2 leading-relaxed">
                {t(`process.steps.${key}.body`)}
              </p>
            </section>
          ))}
        </div>

        <div className="hairline pt-8 mt-4">
          <h3 className="text-lg font-semibold mb-4 text-ink">{t("shopify.title")}</h3>
          <p className="text-base text-ink-2 leading-relaxed mb-4">{t("shopify.intro")}</p>
          <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
            {t.raw("shopify.reasons").map((reason: string) => (
              <li key={reason} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ledger" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Separator />
      </div>

      <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-24">
        <div className="border-t border-rule pt-6 mb-16 max-w-2xl">
          <h3 className="text-xl font-semibold text-ink mb-3">{t("bio.title")}</h3>
          <p className="text-base text-ink-2 leading-relaxed mb-3">{t("bio.body1")}</p>
          <p className="text-base text-ink-2 leading-relaxed">
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

        <div className="max-w-3xl">
          <SectionHeading title={t("cta.title")}>
            <p className="text-lg text-ink-2 max-w-2xl mb-10 leading-[1.6]">{t("cta.intro")}</p>
          </SectionHeading>
          <div className="grid sm:grid-cols-3 gap-x-10 gap-y-4 mb-10">
            {CALL_KEYS.map((key) => (
              <div key={key} className="border-t border-rule pt-3">
                <div className="claim text-base text-ink mb-1.5">
                  {t(`cta.expectations.${key}.label`)}
                </div>
                <p className="text-base text-ink-2 leading-relaxed">
                  {t(`cta.expectations.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
          <Button asChild size="lg" className="h-auto min-h-13 shrink py-3 whitespace-normal text-center">
            <a href={WHATSAPP} target="_blank" rel="noopener">
              {common("bookCall")}
            </a>
          </Button>

          <div className="mt-16 border-t border-rule pt-8">
            <h3 className="text-lg font-semibold text-ink mb-2">{t("cta.notReady.title")}</h3>
            <p className="text-base text-ink-2 max-w-xl mb-8 leading-relaxed">
              {t("cta.notReady.body")}
            </p>
            <PrototypeRequest
              id="cta-form"
              copy={t.raw("prototype.form")}
              contactEmail={EMAIL}
              mailSubject={t("prototype.mailSubject")}
            />
          </div>

          <p className="text-sm text-muted-foreground mt-10">
            <a
              href={`mailto:${EMAIL}`}
              className="text-primary dark:text-brand-light hover:text-brand-strong underline underline-offset-4"
            >
              {EMAIL}
            </a>
            {" · "}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
              className="text-primary dark:text-brand-light hover:text-brand-strong underline underline-offset-4"
            >
              WhatsApp
            </a>
            {" · "}
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener"
              className="text-primary dark:text-brand-light hover:text-brand-strong underline underline-offset-4"
            >
              Telegram
            </a>
          </p>
        </div>
      </section>

      <SiteFooter reserveStickyBar copyright={common("copyright")}>
        <Link href="/" className="hover:text-foreground transition-colors">
          {common("backToSite")}
        </Link>
      </SiteFooter>

      <StickyCallBar label={common("bookCall")} href={WHATSAPP} hideNear="#prototype" />
    </>
  )
}

export default EcommercePage

import type { Metadata } from "next"

import BulletCard from "@/components/BulletCard"
import CallToActionLink from "@/components/CallToActionLink"
import PanelCard from "@/components/PanelCard"
import ScreenshotCard from "@/components/ScreenshotCard"
import SectionHeading from "@/components/SectionHeading"
import SiteFooter from "@/components/SiteFooter"
import SiteNav from "@/components/SiteNav"
import StickyCallBar from "@/components/StickyCallBar"
import {
  AI_POINTS,
  ASK_EXAMPLES,
  AUDIT_FINDINGS,
  CALL_EXPECTATIONS,
  FEATURE_GROUPS,
  PRICE_GROUPS,
  PROCESS_STEPS,
  SCREENS,
  SHOPIFY_REASONS,
  STATS,
} from "@/content/ecommerce"
import { EMAIL, INTO_GE, TELEGRAM } from "@/content/site"

export const metadata: Metadata = {
  title: "AI-Native E-Commerce Platform for Small Business — Pavlo Kostiuk",
  description:
    "A complete online store tailored to your business — storefront, admin, inventory, POS, finance — with an AI assistant wired into all of it. Built and running in production at into.ge.",
}

const NAV = [
  { label: "AI", href: "#ai" },
  { label: "Features", href: "#features" },
  { label: "Screens", href: "#screens" },
  { label: "Price", href: "#price" },
  { label: "Process", href: "#process" },
] as const

const Divider = () => <hr className="border-zinc-200 dark:border-zinc-800 max-w-5xl mx-auto" />

const EcommercePage = () => (
  <>
    <SiteNav brandHref="/" links={NAV} />

    <section className="pt-36 pb-16 px-6 max-w-5xl mx-auto">
      <span className="inline-block text-xs px-3 py-1 rounded-full bg-accent/10 text-indigo-700 dark:text-indigo-300 border border-accent/20 mb-6">
        For small business owners
      </span>
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
        Your own online store.
        <br />
        <span className="text-accent dark:text-accent-light">Run it by talking to AI.</span>
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mb-6 leading-relaxed">
        Not a template on someone else&apos;s platform. A complete system built around how <em>your</em> business works
        — storefront, admin, stock, point of sale, money — with an AI assistant plugged into every part of it. Already
        built and running at{" "}
        <a href={INTO_GE} target="_blank" rel="noopener" className="text-accent dark:text-accent-light hover:text-accent-strong dark:hover:text-white underline underline-offset-4">
          into.ge
        </a>
        .
      </p>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <CallToActionLink
          source="hero"
          label="Book a free 30-minute call"
          className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium bg-accent text-white hover:bg-accent-strong transition-all"
        />
        <a
          href="#screens"
          className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium bg-white dark:bg-surface border border-zinc-200 dark:border-zinc-800 hover:border-accent transition-all"
        >
          See the whole thing
        </a>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Worked remotely, anywhere — your bank and courier are the only per-country pieces.{" "}
        <a href="#price" className="text-accent dark:text-accent-light hover:text-accent-strong dark:hover:text-white underline underline-offset-4">
          What it costs
        </a>
      </p>
    </section>

    <section className="px-6 max-w-5xl mx-auto pb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(({ value, label }) => (
          <PanelCard key={label} className="p-5">
            <div className="text-3xl font-bold tracking-tight mb-1">{value}</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-snug">{label}</div>
          </PanelCard>
        ))}
      </div>
    </section>

    <Divider />

    <section id="ai" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
      <SectionHeading eyebrow="The difference" title="An AI assistant that actually operates the shop">
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          Most &quot;AI e-commerce&quot; means a chatbot bolted onto the storefront. This is the opposite. Your store
          exposes itself as a set of tools over the Model Context Protocol, so Claude, ChatGPT or any MCP-capable
          assistant can read and change real data — with your permissions, your audit trail, and your approval on
          anything destructive.
        </p>
      </SectionHeading>

      <PanelCard className="p-6 mb-6">
        <h3 className="text-sm uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-5">
          Things you can just ask for
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {ASK_EXAMPLES.map((example) => (
            <div
              key={example}
              className="rounded-xl bg-zinc-50 dark:bg-bg border border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-700 dark:text-zinc-300"
            >
              &quot;{example}&quot;
            </div>
          ))}
        </div>
      </PanelCard>

      <div className="grid md:grid-cols-2 gap-4">
        {AI_POINTS.map(({ title, body }) => (
          <PanelCard key={title} className="p-6">
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{body}</p>
          </PanelCard>
        ))}
      </div>
    </section>

    <Divider />

    <section id="features" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
      <SectionHeading eyebrow="Everything in the box" title="Full functionality overview">
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-6 leading-relaxed">
          This is the complete feature set running in production today. Your build won&apos;t need all of it — we switch
          on what fits your trade and leave the rest out.
        </p>
      </SectionHeading>
      <div className="flex flex-wrap gap-1.5 mb-10">
        {FEATURE_GROUPS.map(({ title }) => (
          <span
            key={title}
            className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-surface text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
          >
            {title}
          </span>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {FEATURE_GROUPS.map((group) => (
          <BulletCard key={group.title} {...group} />
        ))}
      </div>
    </section>

    <Divider />

    <section id="screens" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
      <SectionHeading eyebrow="The real thing" title="What it looks like" />
      <div className="flex flex-col gap-8 mt-6">
        {SCREENS.map((screen) => (
          <ScreenshotCard key={screen.src} {...screen} />
        ))}
      </div>

      <PanelCard className="mt-8 p-6">
        <h3 className="text-lg font-semibold mb-2">A real answer, from the real store</h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-5">
          Asked of into.ge&apos;s live catalog while writing this page. No cherry-picking — it found problems in my own
          shop, which is rather the point.
        </p>
        <div className="rounded-xl bg-zinc-50 dark:bg-bg border border-zinc-200 dark:border-zinc-800 p-4 mb-3">
          <div className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-2">You</div>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Audit the catalog — anything broken, mislinked or unpublishable?
          </p>
        </div>
        <div className="rounded-xl bg-zinc-50 dark:bg-bg border border-zinc-200 dark:border-zinc-800 p-4">
          <div className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-2">The store</div>
          <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1.5 leading-relaxed">
            {AUDIT_FINDINGS.map((finding) => (
              <li key={finding}>— {finding}</li>
            ))}
          </ul>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed mt-4">
          Thirteen classes of defect, checked across the whole catalog in one question. Finding the same by eye is a
          morning&apos;s work you&apos;d never actually schedule.
        </p>
      </PanelCard>
    </section>

    <Divider />

    <section id="price" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
      <SectionHeading eyebrow="The money" title="What it costs">
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          One build fee, then nothing per sale — ever. It&apos;s installed on your own hosting, running against your own
          database, and I support it from there. However much you grow, the price doesn&apos;t follow your revenue.
        </p>
      </SectionHeading>
      <div className="grid md:grid-cols-2 gap-4">
        {PRICE_GROUPS.map((group) => (
          <BulletCard key={group.title} {...group} />
        ))}
      </div>
    </section>

    <Divider />

    <section id="process" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
      <SectionHeading eyebrow="How it goes" title="From call to open shop" />
      <div className="grid md:grid-cols-2 gap-4 mt-6 mb-10">
        {PROCESS_STEPS.map(({ step, title, body }) => (
          <PanelCard key={step} className="p-6">
            <div className="text-indigo-700 dark:text-indigo-300 font-bold text-sm mb-2">{step}</div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{body}</p>
          </PanelCard>
        ))}
      </div>

      <PanelCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Why not just use Shopify?</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
          Sometimes you should, and I&apos;ll say so on the call. Rented platforms are the right answer for a simple
          catalog with standard needs. This is worth it when one of these is true:
        </p>
        <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
          {SHOPIFY_REASONS.map((reason) => (
            <li key={reason}>— {reason}</li>
          ))}
        </ul>
      </PanelCard>
    </section>

    <Divider />

    <section className="py-20 px-6 max-w-5xl mx-auto">
      <PanelCard className="p-6 mb-16">
        <h3 className="text-lg font-semibold mb-2">Who you&apos;d be working with</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
          I&apos;m Pavlo Kostiuk — a full-stack developer in Tbilisi. Into.ge is my own build, start to finish: the
          storefront, the admin, the inventory engine, the point of sale, the bank integration and the AI layer. I run
          it in production, which means I get the support calls when something breaks, and I&apos;ve had to make it
          survive real use rather than a demo.
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          That&apos;s the honest state of the reference list: one shop, deeply built, publicly inspectable — not a
          portfolio of logos.{" "}
          <a href="/" className="text-accent dark:text-accent-light hover:text-accent-strong dark:hover:text-white underline underline-offset-4">
            My background and other work
          </a>
          .
        </p>
      </PanelCard>

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Tell me what you sell</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
          Thirty minutes, free, no obligation — and I&apos;ll tell you if you&apos;d be better off on Shopify.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 text-left mb-8">
          {CALL_EXPECTATIONS.map(({ label, body }) => (
            <PanelCard key={label} className="p-4">
              <div className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-1.5">{label}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{body}</p>
            </PanelCard>
          ))}
        </div>
        <CallToActionLink
          source="footer"
          label="Book a free call"
          className="inline-flex items-center px-8 py-4 rounded-xl font-medium bg-accent text-white hover:bg-accent-strong transition-all mb-10"
        />
        <p className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-4">or reach me directly</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href={`mailto:${EMAIL}`}
            className="px-5 py-3 bg-white dark:bg-surface border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm hover:border-accent transition-all"
          >
            {EMAIL}
          </a>
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noopener"
            className="px-5 py-3 bg-white dark:bg-surface border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm hover:border-accent transition-all"
          >
            @pavliha
          </a>
        </div>
      </div>
    </section>

    <SiteFooter reserveStickyBar>
      <a href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
        ← Back to pavlokostiuk.cloud
      </a>
    </SiteFooter>

    <StickyCallBar />
  </>
)

export default EcommercePage

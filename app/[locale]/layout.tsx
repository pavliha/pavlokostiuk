import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"

import AnalyticsProvider from "@/components/AnalyticsProvider"
import { locales, routing } from "@/i18n/routing"

import "../globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://pavlokostiuk.cloud"),
  icons: { icon: "/favicon.svg" },
}

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

const sans = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-face",
  display: "swap",
})

const mono = Geist_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
})

const themeScript = `if (localStorage.theme === 'dark' || (!('theme' in localStorage) && matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');`

const LocaleLayout = async ({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        {/* eslint-disable-next-line react/no-danger */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: Every claim on this page is welded to a screenshot detail that proves it. It refuses decoration entirely — no metaphor, no illustration, no invented world — and equally refuses the thermal-receipt world that preceded it here.
OWN-WORLD: Monochrome product marketing. A fine neutral scale from near-white (#fbfbfc) to near-black (#16181d), one restrained blue accent (#2f5cff) used only on links and the primary action. One family, Geist, at four weights; Geist Mono for figures only. Screenshots framed on soft neutral grounds. Generous whitespace and hairline rules; no fills, no heavy borders, no uppercase.
STORY: A shop owner sees a serious piece of software, recognises their own problem stated plainly, sees the interface that solves it, and books a call.
FIRST VIEWPORT: Left-weighted claim in large regular-weight type, subhead beneath, one solid dark button and one text link, with a real screenshot of the running store as a co-equal right column.
FORM: Monochrome software product marketing, the challenger that beat the roll on audience identification and product clarity, seed key f08d3dc2.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`,
          }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <AnalyticsProvider locale={locale} />
      </body>
    </html>
  )
}

export default LocaleLayout

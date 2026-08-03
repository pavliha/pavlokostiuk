import type { Metadata } from "next"
import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"

import { locales, routing } from "@/i18n/routing"

import "../globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://pavlokostiuk.cloud"),
  icons: { icon: "/favicon.svg" },
}

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

const themeScript = `if (localStorage.theme === 'dark' || (!('theme' in localStorage) && matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');`

const LocaleLayout = async ({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout

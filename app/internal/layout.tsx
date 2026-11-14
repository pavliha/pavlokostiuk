import type { Metadata } from "next"
import type { ReactNode } from "react"

import { mono, sans } from "@/lib/fonts"
import { themeScript } from "@/lib/theme-script"

import "../globals.css"

export const metadata: Metadata = {
  title: "Internal · Pavlo Kostiuk",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
}

const InternalLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    </head>
    <body className="antialiased bg-background text-foreground">{children}</body>
  </html>
)

export default InternalLayout

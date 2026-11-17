import type { Metadata } from "next"
import type { ReactNode } from "react"

import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { themeScript } from "@/lib/theme-script"

import "../globals.css"

export const metadata: Metadata = {
  title: "Internal · Pavlo Kostiuk",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
}

const InternalLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} internal-fonts`} suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    </head>
    <body className="antialiased bg-background text-foreground overflow-x-clip">{children}</body>
  </html>
)

export default InternalLayout

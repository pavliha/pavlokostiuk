import type { Metadata } from "next"
import type { ReactNode } from "react"

import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://pavlokostiuk.cloud"),
  icons: { icon: "/favicon.svg" },
}

const themeScript = `if (localStorage.theme === 'dark' || (!('theme' in localStorage) && matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');`

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className="scroll-smooth dark">
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    </head>
    <body className="bg-zinc-50 dark:bg-bg text-zinc-900 dark:text-zinc-50 antialiased transition-colors">
      {children}
    </body>
  </html>
)

export default RootLayout

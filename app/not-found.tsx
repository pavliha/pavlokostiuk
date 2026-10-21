import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"

import "./globals.css"

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

const NotFound = () => (
  <html lang="en" className={`${sans.variable} ${mono.variable}`}>
    <body className="antialiased">
      <main className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">404</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">
            That page does not exist
          </h1>
          <p className="text-muted-foreground mb-8">
            The link is wrong or the page moved. Everything is one click away from the home page.
          </p>
          <div className="flex justify-center">
            <Link
              href="/en"
              className="inline-flex items-center min-h-11 px-5 rounded-lg bg-primary text-primary-foreground font-medium"
            >
              Home page
            </Link>
          </div>
        </div>
      </main>
    </body>
  </html>
)

export default NotFound

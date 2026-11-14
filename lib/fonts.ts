import { Geist, Geist_Mono } from "next/font/google"

export const sans = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-face",
  display: "swap",
})

export const mono = Geist_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
})

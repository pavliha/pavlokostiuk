import type { MetadataRoute } from "next"

export const dynamic = "force-static"

import { locales } from "@/i18n/routing"

const SITE = "https://pavlokostiuk.cloud"
const PAGES = ["", "/ecommerce"] as const

const sitemap = (): MetadataRoute.Sitemap =>
  PAGES.flatMap((page) =>
    locales.map((locale) => ({
      url: `${SITE}/${locale}${page}`,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.9,
      alternates: {
        languages: Object.fromEntries(locales.map((code) => [code, `${SITE}/${code}${page}`])),
      },
    })),
  )

export default sitemap

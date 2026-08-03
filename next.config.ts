import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const isExport = process.env.NEXT_PHASE === "phase-production-build"

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(isExport
    ? {}
    : {
        async redirects() {
          return [
            { source: "/", destination: "/en", permanent: false },
            { source: "/ecommerce", destination: "/en/ecommerce", permanent: false },
          ]
        },
      }),
}

export default createNextIntlPlugin("./i18n/request.ts")(nextConfig)

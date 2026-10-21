import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  ...(process.env.NEXT_OUTPUT === "standalone" ? { output: "standalone" as const } : {}),
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      { source: "/ecommerce", destination: "/en/ecommerce", permanent: false },
      { source: "/index.html", destination: "/en", permanent: true },
      { source: "/ecommerce.html", destination: "/en/ecommerce", permanent: true },
    ]
  },
}

export default createNextIntlPlugin("./i18n/request.ts")(nextConfig)

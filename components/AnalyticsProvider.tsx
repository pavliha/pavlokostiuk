"use client"

import { usePathname } from "next/navigation"
import posthog from "posthog-js"
import { useEffect } from "react"

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

const AnalyticsProvider = ({ locale }: { locale: string }) => {
  const pathname = usePathname()

  useEffect(() => {
    if (!KEY || !HOST) return
    if (!posthog.__loaded) {
      posthog.init(KEY, {
        api_host: HOST,
        person_profiles: "identified_only",
        capture_pageview: false,
        capture_pageleave: true,
      })
    }
    posthog.capture("$pageview", {
      locale,
      page: pathname.replace(/^\/[a-z]{2}/, "") || "/home",
    })
  }, [pathname, locale])

  return null
}

export default AnalyticsProvider

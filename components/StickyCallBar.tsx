"use client"

import { useEffect, useState } from "react"

import CallToActionLink from "./CallToActionLink"

const StickyCallBar = () => {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY >= window.innerHeight)
    onScroll()
    addEventListener("scroll", onScroll, { passive: true })
    return () => removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`sm:hidden fixed bottom-0 inset-x-0 z-50 px-4 py-3 bg-white/90 dark:bg-bg/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 transition-transform ${
        shown ? "" : "translate-y-full"
      }`}
    >
      <CallToActionLink
        source="sticky"
        label="Book a free 30-minute call"
        className="flex items-center justify-center w-full px-6 py-3 rounded-xl text-sm font-medium bg-accent text-white"
      />
    </div>
  )
}

export default StickyCallBar

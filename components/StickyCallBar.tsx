"use client"

import { useEffect, useState } from "react"

import CallToActionLink from "./CallToActionLink"

const StickyCallBar = ({ label }: { label: string }) => {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY >= window.innerHeight)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`sm:hidden fixed bottom-0 inset-x-0 z-50 px-4 py-3 bg-background/90 backdrop-blur-xl border-t transition-transform ${
        shown ? "" : "translate-y-full"
      }`}
    >
      <CallToActionLink source="sticky" label={label} size="lg" className="w-full rounded-xl py-6 text-sm" />
    </div>
  )
}

export default StickyCallBar

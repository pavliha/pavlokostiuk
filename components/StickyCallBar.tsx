"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"


const StickyCallBar = ({
  label,
  href,
  hideNear,
}: {
  label: string
  href: string
  hideNear?: string
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [nearTarget, setNearTarget] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= window.innerHeight)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const target = hideNear ? document.querySelector(hideNear) : null
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setNearTarget(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [hideNear])

  return (
    <div
      id="stickyCta"
      className={`sm:hidden fixed bottom-0 inset-x-0 z-50 px-3 py-3 bg-background/92 backdrop-blur-md border-t border-rule transition-transform ${
        scrolled && !nearTarget ? "" : "translate-y-full"
      }`}
    >
      <Button asChild size="lg" className="w-full">
        <a href={href}>{label}</a>
      </Button>
    </div>
  )
}

export default StickyCallBar

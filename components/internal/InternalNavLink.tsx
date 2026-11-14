"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const InternalNavLink = ({ href, label }: { href: string; label: string }) => {
  const current = usePathname() === href
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`inline-flex items-center min-h-11 px-1.5 sm:px-2 text-sm transition-colors ${
        current
          ? "text-foreground font-medium underline underline-offset-8 decoration-2 decoration-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  )
}

export default InternalNavLink

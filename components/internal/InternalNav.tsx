import ThemeToggle from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { INTERNAL_NAV } from "@/content/internal"
import { signOut } from "@/app/internal/actions"

import InternalNavLink from "./InternalNavLink"

const InternalNav = () => (
  <nav className="sticky top-0 z-50 px-4 sm:px-6 py-2 bg-background/80 backdrop-blur-md border-b">
    <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
      <ul className="flex gap-0 sm:gap-3 whitespace-nowrap min-w-0">
        {INTERNAL_NAV.map((item) => (
          <li key={item.href}>
            <InternalNavLink href={item.href} label={item.label} />
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-1">
        <ThemeToggle label="Toggle theme" />
        <form action={signOut} className="hidden sm:block">
          <Button type="submit" variant="ghost" size="xs">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  </nav>
)

export default InternalNav

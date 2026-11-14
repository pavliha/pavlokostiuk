import type { ReactNode } from "react"

import InternalNav from "@/components/internal/InternalNav"
import { requireSignedIn } from "@/lib/internal/session"

export const dynamic = "force-dynamic"

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  await requireSignedIn()
  return (
    <>
      <InternalNav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid gap-8">{children}</main>
    </>
  )
}

export default DashboardLayout

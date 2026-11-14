"use client"

import { Button } from "@/components/ui/button"

const DashboardError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => (
  <section role="alert" className="grid gap-3 rounded-xl border bg-card p-4">
    <h1 className="text-lg font-semibold">That didn&apos;t go through</h1>
    <p className="text-muted-foreground">
      The CRM or the database refused the change, most often because the lead changed elsewhere since this page loaded. The
      server log has the details under this reference: <span className="font-mono">{error.digest}</span>
    </p>
    <div>
      <Button type="button" onClick={reset}>
        Reload
      </Button>
    </div>
  </section>
)

export default DashboardError

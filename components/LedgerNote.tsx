import type { ReactNode } from "react"

const LedgerNote = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-rule pt-4">
    <h3 className="font-semibold mb-1.5 text-ink">{title}</h3>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </section>
)

export default LedgerNote

import type { ReactNode } from "react"

const SectionHeading = ({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) => (
  <>
    {eyebrow ? (
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-700 dark:text-indigo-300 mb-3">
        {eyebrow}
      </p>
    ) : null}
    <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
    {children}
  </>
)

export default SectionHeading

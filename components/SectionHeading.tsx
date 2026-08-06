import type { ReactNode } from "react"

const SectionHeading = ({ title, children }: { title: string; children: ReactNode }) => (
  <>
    <h2 className="claim text-ink text-[clamp(1.875rem,3.6vw,2.5rem)] mb-5 max-w-2xl">{title}</h2>
    {children}
  </>
)

export default SectionHeading

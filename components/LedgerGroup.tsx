export type BulletGroup = { title: string; bullets: readonly string[] }

const LedgerGroup = ({ title, bullets }: BulletGroup) => (
  <section className="break-inside-avoid">
    <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary dark:text-brand-light pb-2 mb-3 border-b border-rule">
      {title}
    </h3>
    <ul className="space-y-1.5">
      {bullets.map((bullet) => (
        <li key={bullet} className="relative pl-4 text-[13.5px] text-ink-2 leading-[1.62]">
          <span className="absolute left-0 top-[0.62em] h-px w-1.5 bg-ledger" aria-hidden="true" />
          {bullet}
        </li>
      ))}
    </ul>
  </section>
)

export default LedgerGroup

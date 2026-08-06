export type BulletGroup = { title: string; bullets: readonly string[] }

const LedgerGroup = ({ title, bullets }: BulletGroup) => (
  <section className="break-inside-avoid">
    <h3 className="text-base font-semibold text-ink pb-2 mb-3 border-b border-rule">{title}</h3>
    <ul className="space-y-2">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex gap-3 text-base text-ink-2 leading-[1.55]">
          <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ledger" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  </section>
)

export default LedgerGroup

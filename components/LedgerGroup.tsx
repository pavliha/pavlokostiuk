import BulletList from "@/components/BulletList"

export type BulletGroup = { title: string; bullets: readonly string[] }

const LedgerGroup = ({ title, bullets }: BulletGroup) => (
  <section className="break-inside-avoid">
    <h3 className="text-base font-semibold text-ink pb-2 mb-3 border-b border-rule">{title}</h3>
    <BulletList
      items={bullets}
      className="space-y-2"
      itemClassName="text-base text-ink-2 leading-[1.55]"
      dotClassName="bg-ledger"
    />
  </section>
)

export default LedgerGroup

import PanelCard from "./PanelCard"

export type BulletGroup = { title: string; bullets: readonly string[] }

const BulletCard = ({ title, bullets }: BulletGroup) => (
  <PanelCard className="p-6">
    <h3 className="font-semibold mb-3">{title}</h3>
    <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
      {bullets.map((bullet) => (
        <li key={bullet}>— {bullet}</li>
      ))}
    </ul>
  </PanelCard>
)

export default BulletCard

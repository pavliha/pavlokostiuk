import PanelCard from "./PanelCard"
import SkillIcon, { type SkillIconName } from "./SkillIcon"

export type Skill = { title: string; body: string; icon: SkillIconName }

const SkillCard = ({ title, body, icon }: Skill) => (
  <PanelCard className="p-5">
    <h3 className="font-semibold mb-2 flex items-center gap-2">
      <SkillIcon icon={icon} />
      {title}
    </h3>
    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{body}</p>
  </PanelCard>
)

export default SkillCard

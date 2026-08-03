import SkillIcon, { type SkillIconName } from "./SkillIcon"

export type Skill = { title: string; body: string; icon: SkillIconName }

const SkillEntry = ({ title, body, icon }: Skill) => (
  <section className="border-t border-rule pt-4">
    <h3 className="flex items-center gap-2 font-semibold mb-1.5 text-ink">
      <SkillIcon icon={icon} />
      {title}
    </h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
  </section>
)

export default SkillEntry

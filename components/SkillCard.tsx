import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import SkillIcon, { type SkillIconName } from "./SkillIcon"

export type Skill = { title: string; body: string; icon: SkillIconName }

const SkillCard = ({ title, body, icon }: Skill) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <SkillIcon icon={icon} />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
    </CardContent>
  </Card>
)

export default SkillCard

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import TagList from "./TagList"

export type Experience = {
  title: string
  role: string
  via: string
  duration: string
  body: string
  tags: readonly string[]
}

const ExperienceCard = ({ title, role, via, duration, body, tags }: Experience) => (
  <Card className="hover:bg-surface-hover transition-colors">
    <CardHeader>
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="text-primary dark:text-brand-light text-sm font-medium mt-1">
            {role} {via ? <span className="text-muted-foreground">{via}</span> : null}
          </div>
        </div>
        <Badge variant="outline" className="whitespace-nowrap">
          {duration}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{body}</p>
      <TagList tags={tags} />
    </CardContent>
  </Card>
)

export default ExperienceCard

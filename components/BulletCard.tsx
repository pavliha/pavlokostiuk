import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type BulletGroup = { title: string; bullets: readonly string[] }

const BulletCard = ({ title, bullets }: BulletGroup) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
        {bullets.map((bullet) => (
          <li key={bullet}>— {bullet}</li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

export default BulletCard

import Image from "next/image"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type Screenshot = {
  src: string
  alt: string
  title: string
  body: string
  width: number
  height: number
}

const ScreenshotCard = ({ src, alt, title, body, width, height }: Screenshot) => (
  <Card className="overflow-hidden gap-0 py-0">
    <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" loading="lazy" />
    <CardHeader className="pt-6">
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="pb-6">
      <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
    </CardContent>
  </Card>
)

export default ScreenshotCard

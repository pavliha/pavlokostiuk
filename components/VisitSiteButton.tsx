import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"

const VisitSiteButton = ({ href, label }: { href: string; label: string }) => (
  <Button asChild variant="default">
    <a href={href} target="_blank" rel="noopener">
      <ExternalLink />
      {label}
    </a>
  </Button>
)

export default VisitSiteButton

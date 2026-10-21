import { Button } from "@/components/ui/button"
import { WHATSAPP } from "@/content/site"

const CallToActionLink = ({
  label,
  size,
  className,
}: {
  label: string
  size: "lg" | "default"
  className: string
}) => (
  <Button asChild size={size} className={className}>
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  </Button>
)

export default CallToActionLink

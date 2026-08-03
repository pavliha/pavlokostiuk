import { Button } from "@/components/ui/button"
import { CALENDLY_URL } from "@/content/site"

const CallToActionLink = ({
  source,
  label,
  size,
  className,
}: {
  source: string
  label: string
  size: "lg" | "default"
  className: string
}) => (
  <Button asChild size={size} className={className}>
    <a
      href={`${CALENDLY_URL}?utm_source=pavlokostiuk.cloud&utm_content=${source}`}
      target="_blank"
      rel="noopener"
    >
      {label}
    </a>
  </Button>
)

export default CallToActionLink

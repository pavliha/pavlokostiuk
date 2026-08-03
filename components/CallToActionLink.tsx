import { CALENDLY_URL } from "@/content/site"

const CallToActionLink = ({
  source,
  label,
  className = "",
}: {
  source: string
  label: string
  className?: string
}) => (
  <a
    href={`${CALENDLY_URL}?utm_source=pavlokostiuk.cloud&utm_content=${source}`}
    target="_blank"
    rel="noopener"
    className={className}
  >
    {label}
  </a>
)

export default CallToActionLink

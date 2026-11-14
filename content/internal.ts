export const INTERNAL_TIMEZONE = "Asia/Tbilisi"

export const DAILY_GOALS = { applications: 3, networks: 1 } as const

export const WEEKLY_GOALS = { applications: 15 } as const

export const FOLLOW_UP_AFTER_DAYS = 7

export const NETWORKS = [
  { id: "toptal", name: "Toptal", url: "https://www.toptal.com/developers/join" },
  { id: "lemon-io", name: "Lemon.io", url: "https://lemon.io/for-developers/" },
  { id: "arc-dev", name: "Arc.dev", url: "https://arc.dev/" },
  { id: "djinni", name: "Djinni", url: "https://djinni.co/" },
  { id: "wellfound", name: "Wellfound", url: "https://wellfound.com/" },
  { id: "linkedin-open-to-work", name: "LinkedIn: Open to Work", url: "https://www.linkedin.com/in/kostyukpavel/" },
] as const

export type NetworkId = (typeof NETWORKS)[number]["id"]

export const INTERNAL_NAV = [
  { href: "/internal", label: "Job search" },
  { href: "/internal/jobs", label: "Pipeline" },
  { href: "/internal/security", label: "Security" },
] as const

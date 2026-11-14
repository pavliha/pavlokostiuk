export const INTERNAL_TIMEZONE = "Asia/Tbilisi"

export const DAILY_GOALS = { applications: 3, contacts: 3, networks: 1 } as const

export const WEEKLY_GOALS = { applications: 15, contacts: 15 } as const

export const PART_108_DEADLINE = "2026-12-07"

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
  { href: "/internal", label: "Today" },
  { href: "/internal/jobs", label: "Jobs" },
  { href: "/internal/outreach", label: "Outreach" },
  { href: "/internal/security", label: "Security" },
] as const

import type { Skill } from "@/components/SkillEntry"

export const EXPERIENCE_KEYS = [
  "intoGe",
  "homeWarranty",
  "aircast",
  "traceability",
  "whiteboard",
  "banking",
  "crowdfunding",
  "retail",
  "octopart",
] as const

export const EXPERIENCE_TAGS: Record<(typeof EXPERIENCE_KEYS)[number], readonly string[]> = {
  intoGe: ["Next.js", "React", "Drizzle ORM", "PostgreSQL", "MCP", "Meilisearch", "Playwright"],
  homeWarranty: ["React", "Next.js", "VTEX", "Contentstack", "Playwright", "Oracle DB"],
  aircast: ["Go", "React", "WebRTC", "Raspberry Pi", "H.264", "Ansible", "MAVLink"],
  traceability: ["React", "MobX", "Jest", "Cypress", "React Testing Library"],
  whiteboard: ["React", "Redux/Saga", "Web Components", "Jest", "Node.js"],
  banking: ["React", "React Native", "Redux/Saga", "Web Components", "NestJS", "TypeORM"],
  crowdfunding: ["React", "Redux", "Material UI", "Jest", "Storybook"],
  retail: ["React Native Web", "Redux", "Material UI", "Jest"],
  octopart: ["Node.js", "Serverless", "AWS Lambda", "BigQuery", "ElasticSearch", "Redis"],
}

export const AIRCAST_TAGS = [
  "React",
  "WebRTC",
  "MediaMTX",
  "MAVLink",
  "Raspberry Pi",
  "Tailscale",
  "Kubernetes",
] as const

export const DRONE_TAGS = [
  "ArduPilot",
  "PX4",
  "MAVLink",
  "QGroundControl",
  "Qt / C++",
  "Rust",
  "Go",
  "TypeScript",
  "WebRTC",
  "RTSP",
  "GStreamer",
  "Raspberry Pi",
] as const

export const DRONE_SECTION_KEYS = ["gcs", "telemetry", "missions", "hardware", "device"] as const

export const DRONE_REPOS = [
  { key: "qgroundcontrol", href: "https://github.com/aircast-one/qgroundcontrol" },
  { key: "sitl", href: "https://github.com/aircast-one/aircast-sitl" },
  { key: "mavlink", href: "https://github.com/aircast-one/aircast-mavlink" },
  { key: "flasher", href: "https://github.com/aircast-one/aircast-flasher" },
  { key: "pigen", href: "https://github.com/aircast-one/aircast-pi-gen" },
  { key: "cli", href: "https://github.com/aircast-one/aircast-cli" },
] as const

export const INTO_GE_TAGS = [
  "Next.js",
  "React",
  "Drizzle ORM",
  "PostgreSQL",
  "MCP",
  "Tailwind CSS",
  "Meilisearch",
  "Playwright",
  "AWS S3",
] as const

export const SKILL_KEYS = ["frontend", "backend", "databases", "infrastructure", "testing", "leadership"] as const

export const SKILL_ICONS: Record<(typeof SKILL_KEYS)[number], Skill["icon"]> = {
  frontend: "code",
  backend: "server",
  databases: "database",
  infrastructure: "cloud",
  testing: "check",
  leadership: "people",
}

export const FEATURE_KEYS = [
  "storefront",
  "search",
  "checkout",
  "payments",
  "orders",
  "catalog",
  "pricing",
  "inventory",
  "pos",
  "money",
  "customers",
  "services",
  "languages",
  "staff",
  "notifications",
  "seo",
  "config",
  "backups",
] as const

export const LEAD_PAIN_KEY = "stock"

export const PAIN_KEYS = ["money", "commission", "catalog", "orders", "staff"] as const

export type PainKey = typeof LEAD_PAIN_KEY | (typeof PAIN_KEYS)[number]

export const PLAN_KEYS = ["send", "see", "launch"] as const

export const AI_POINT_KEYS =["servers", "connect", "translation", "dataEntry", "audit", "howIBuild"] as const

export const PRICE_KEYS = ["setup", "customisation", "moves", "notFixed"] as const

export const PRICE_DETAIL_KEYS = ["warranty", "yours"] as const

export const PROCESS_KEYS = ["talk", "seeData", "shape", "launch"] as const

export const CALL_KEYS = ["bring", "cover", "leave"] as const

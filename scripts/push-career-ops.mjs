import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

const careerOpsDir = process.env.CAREER_OPS_DIR ?? join(homedir(), "Code", "career-ops")
const siteUrl = process.env.SITE_URL ?? "https://pavlokostiuk.cloud"
const token = process.env.INTERNAL_INGEST_TOKEN

if (!token) throw new Error("Set INTERNAL_INGEST_TOKEN")

const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tbilisi" }).format(new Date())
const idOf = (url) => createHash("sha256").update(url).digest("hex").slice(0, 16)
const LABELED = /^(posted|trust|yrs|note|rank):/

const evaluated = (line) => {
  const match = line.match(/^- \[x\] #\d+ \| (\S+) \| ([^|]+) \| ([^|]+) \| ([\d.]+)\/5 \| PDF (\S+)/)
  return match && {
    id: idOf(match[1]),
    url: match[1],
    company: match[2].trim(),
    role: match[3].trim(),
    location: "",
    score: Number(match[4]),
    hasCv: match[5] === "✅",
    addedOn: today,
  }
}

const pending = (line) => {
  if (!line.startsWith("- [ ] ")) return null
  const [url, company, role, ...rest] = line.slice(6).split("|").map((cell) => cell.trim())
  return company && role
    ? {
        id: idOf(url),
        url,
        company,
        role,
        location: rest.find((cell) => cell && !LABELED.test(cell)) ?? "",
        score: null,
        hasCv: false,
        addedOn: today,
      }
    : null
}

const jobs = readFileSync(join(careerOpsDir, "data", "pipeline.md"), "utf8")
  .split("\n")
  .map((line) => evaluated(line) ?? pending(line))
  .filter(Boolean)

const response = await fetch(new URL("/internal/api/jobs", siteUrl), {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ jobs, events: [] }),
})

if (!response.ok) throw new Error(`Push failed: ${response.status} ${await response.text()}`)
console.log(await response.json())

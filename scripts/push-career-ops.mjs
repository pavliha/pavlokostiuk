import { readFileSync } from "node:fs"
import { join } from "node:path"

import { parsePipeline } from "./career-ops-pipeline.mjs"

const required = (name) => {
  const value = process.env[name]
  if (!value) throw new Error(`Set ${name}`)
  return value
}

const careerOpsDir = required("CAREER_OPS_DIR")
const siteUrl = required("SITE_URL")
const token = required("INTERNAL_INGEST_TOKEN")

const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tbilisi" }).format(new Date())
const jobs = parsePipeline(readFileSync(join(careerOpsDir, "data", "pipeline.md"), "utf8"), today)

const response = await fetch(new URL("/internal/api/jobs", siteUrl), {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ jobs, events: [] }),
})

if (!response.ok) throw new Error(`Push failed: ${response.status} ${await response.text()}`)
console.log(await response.json())

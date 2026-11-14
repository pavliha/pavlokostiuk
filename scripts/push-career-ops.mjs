import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { cvFileFor, parsePipeline } from "./career-ops-pipeline.mjs"

const required = (name) => {
  const value = process.env[name]
  if (!value) throw new Error(`Set ${name}`)
  return value
}

const careerOpsDir = required("CAREER_OPS_DIR")
const siteUrl = required("SITE_URL")
const token = required("INTERNAL_INGEST_TOKEN")
const headers = { Authorization: `Bearer ${token}` }

const send = async (path, init) => {
  const response = await fetch(new URL(path, siteUrl), { ...init, headers: { ...headers, ...init.headers } })
  if (!response.ok) throw new Error(`${init.method} ${path} failed: ${response.status} ${await response.text()}`)
  return response.json()
}

const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tbilisi" }).format(new Date())
const jobs = parsePipeline(readFileSync(join(careerOpsDir, "data", "pipeline.md"), "utf8"), today)

console.log("jobs", await send("/internal/api/jobs", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ jobs }),
}))

const outputDir = join(careerOpsDir, "output")
const outputFiles = readdirSync(outputDir)
const withCv = jobs
  .filter((job) => job.report !== null)
  .map((job) => ({ job, file: cvFileFor(outputFiles, job.report) }))
  .filter(({ file }) => file !== null)

for (const { job, file } of withCv) {
  await send(`/internal/api/jobs/${job.id}/cv`, {
    method: "PUT",
    headers: { "Content-Type": "application/pdf" },
    body: readFileSync(join(outputDir, file)),
  })
}
console.log("cvs", withCv.length)

import { spawnSync } from "node:child_process"

const required = (name) => {
  const value = process.env[name]
  if (!value) throw new Error(`Set ${name}`)
  return value
}

const careerOpsDir = required("CAREER_OPS_DIR")
const siteUrl = required("SITE_URL")
const token = required("INTERNAL_INGEST_TOKEN")

const STATE = { applied: "Applied", replied: "Responded", interview: "Interview", offer: "Offer", rejected: "Rejected", skipped: "SKIP" }

const response = await fetch(new URL("/internal/api/jobs/state", siteUrl), { headers: { Authorization: `Bearer ${token}` } })
if (!response.ok) throw new Error(`GET state failed: ${response.status} ${await response.text()}`)
const { jobs } = await response.json()

const results = jobs
  .filter((job) => job.report !== null && job.status !== "todo")
  .map((job) => {
    const args = ["set-status.mjs", "--report", String(job.report), STATE[job.status], "--json", "--source", "pavlokostiuk.cloud"]
    const run = spawnSync("node", job.statusOn ? [...args, "--on", job.statusOn] : args, { cwd: careerOpsDir, encoding: "utf8" })
    return { report: job.report, company: job.company, state: STATE[job.status], ok: run.status === 0, output: (run.stdout || run.stderr).trim() }
  })

results.forEach((result) => console.log(JSON.stringify(result)))
if (results.some((result) => !result.ok)) process.exitCode = 1

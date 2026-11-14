import { createHash } from "node:crypto"

const LABELED = /^(posted|trust|yrs|note|rank):/

const idOf = (url) => createHash("sha256").update(url).digest("hex").slice(0, 16)

const evaluated = (line, addedOn) => {
  const match = line.match(/^- \[x\] #(\d+) \| (\S+) \| ([^|]+) \| ([^|]+) \| ([\d.]+)\/5 \| PDF (\S+)/)
  return match
    ? {
        id: idOf(match[2]),
        url: match[2],
        company: match[3].trim(),
        role: match[4].trim(),
        location: null,
        score: Number(match[5]),
        report: Number(match[1]),
        addedOn,
      }
    : null
}

const pending = (line, addedOn) => {
  if (!line.startsWith("- [ ] ")) return null
  const [url, company, role, ...rest] = line.slice(6).split("|").map((cell) => cell.trim())
  const location = rest.find((cell) => cell && !LABELED.test(cell))
  return company && role
    ? { id: idOf(url), url, company, role, location: location === undefined ? null : location, score: null, report: null, addedOn }
    : null
}

export const parsePipeline = (markdown, addedOn) =>
  markdown
    .split("\n")
    .map((line) => evaluated(line, addedOn) ?? pending(line, addedOn))
    .filter((job) => job !== null)

export const cvFileFor = (fileNames, report) =>
  fileNames.find((name) => name.startsWith("cv-") && name.endsWith(".pdf") && !name.endsWith(".overflow.pdf") && name.includes(`-${String(report).padStart(3, "0")}-`)) ?? null

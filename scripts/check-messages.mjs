import { readFileSync, readdirSync } from "fs"

const LATIN = /[A-Za-z]/
const NATIVE = { ka: /[Ⴀ-ჿ]/, uk: /[Ѐ-ӿ]/, ru: /[Ѐ-ӿ]/ }

const BANNED = [
  {
    pattern: /(?<![\p{L}])(бойов|боев)[\p{L}]*/giu,
    locales: ["uk", "ru"],
    why: 'dev slang for "production" translated literally — reads as "combat". Use "якими користуються щодня" / "которыми пользуются каждый день", or "у продакшені" for a technical reader.',
  },
]

const ENUMS = [
  {
    path: /^platform\.ai\.chat\.turns\[\d+\]\.role$/,
    allowed: ["user", "tool", "reply"],
    why: "McpChat renders and times each turn by its role, and throws on any other value",
  },
]

const walk = (node, path = "") =>
  typeof node === "string"
    ? [[path, node]]
    : Array.isArray(node)
      ? node.flatMap((v, i) => walk(v, `${path}[${i}]`))
      : Object.entries(node).flatMap(([k, v]) => walk(v, path ? `${path}.${k}` : k))

const arrays = (node, path = "") =>
  Array.isArray(node)
    ? [[path, node], ...node.flatMap((v, i) => arrays(v, `${path}[${i}]`))]
    : node !== null && typeof node === "object"
      ? Object.entries(node).flatMap(([k, v]) => arrays(v, path ? `${path}.${k}` : k))
      : []

const load = (locale) => JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url)))
const locales = readdirSync(new URL("../messages", import.meta.url)).map((f) => f.replace(".json", ""))
const reference = new Set(walk(load("en")).map(([path]) => path))

const alignment = (locale, entries) => {
  const paths = new Set(entries.map(([path]) => path))
  const missing = [...reference].filter((p) => !paths.has(p)).map((p) => `${locale}: missing ${p}`)
  const extra = [...paths].filter((p) => !reference.has(p)).map((p) => `${locale}: unexpected ${p}`)
  const native = NATIVE[locale]
  const mixed = native
    ? entries.flatMap(([path, text]) =>
        (text.match(/[\p{L}\p{N}'’]+/gu) ?? [])
          .filter((word) =>
            [...word].some((ch, i) => LATIN.test(ch) && [...word].slice(0, i).some((c) => native.test(c))),
          )
          .map((word) => `${locale}: mixed-script "${word}" at ${path}`),
      )
    : []
  const banned = BANNED.filter((rule) => rule.locales.includes(locale)).flatMap((rule) =>
    entries.flatMap(([path, text]) =>
      (text.match(rule.pattern) ?? []).map(
        (hit) => `${locale}: banned "${hit}" at ${path} — ${rule.why}`,
      ),
    ),
  )
  return [...missing, ...extra, ...mixed, ...banned]
}

const problems = locales.flatMap((locale) => {
  const data = load(locale)
  const entries = walk(data)
  const enums = entries.flatMap(([path, text]) =>
    ENUMS.filter((rule) => rule.path.test(path) && !rule.allowed.includes(text)).map(
      (rule) => `${locale}: "${text}" at ${path} must be one of ${rule.allowed.join(", ")} — ${rule.why}`,
    ),
  )
  const duplicates = arrays(data).flatMap(([path, list]) =>
    list
      .filter((value) => typeof value === "string")
      .filter((value, index, all) => all.indexOf(value) !== index)
      .map(
        (value) =>
          `${locale}: duplicate "${value}" in ${path} — list entries are rendered with the string as the React key, so they must be unique`,
      ),
  )
  return [...(locale === "en" ? [] : alignment(locale, entries)), ...enums, ...duplicates]
})

problems.forEach((p) => console.error(p))
console.log(
  problems.length
    ? `${problems.length} problem(s)`
    : `messages ok — ${locales.length} locales, keys aligned, no mixed-script words, no duplicate list entries`,
)
process.exit(problems.length ? 1 : 0)

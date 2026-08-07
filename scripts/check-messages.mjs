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

const walk = (node, path = "") =>
  typeof node === "string"
    ? [[path, node]]
    : Array.isArray(node)
      ? node.flatMap((v, i) => walk(v, `${path}[${i}]`))
      : Object.entries(node).flatMap(([k, v]) => walk(v, path ? `${path}.${k}` : k))

const load = (locale) => JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url)))
const locales = readdirSync(new URL("../messages", import.meta.url)).map((f) => f.replace(".json", ""))
const reference = new Set(walk(load("en")).map(([path]) => path))

const problems = locales
  .filter((locale) => locale !== "en")
  .flatMap((locale) => {
    const entries = walk(load(locale))
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
  })

problems.forEach((p) => console.error(p))
console.log(problems.length ? `${problems.length} problem(s)` : `messages ok — ${locales.length} locales, keys aligned, no mixed-script words`)
process.exit(problems.length ? 1 : 0)

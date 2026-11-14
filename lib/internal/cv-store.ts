import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

import { internalEnv } from "@/lib/internal/env"

const MAX_CV_BYTES = 5 * 1024 * 1024
const PDF_MAGIC = "%PDF-"

const cvPath = (id: string): string => join(dirname(internalEnv().INTERNAL_DB_PATH), "cvs", `${id}.pdf`)

export const isPdf = (bytes: Buffer): boolean => bytes.length <= MAX_CV_BYTES && bytes.subarray(0, 5).toString("latin1") === PDF_MAGIC

export const saveCv = (id: string, bytes: Buffer): void => {
  mkdirSync(dirname(cvPath(id)), { recursive: true })
  writeFileSync(cvPath(id), bytes)
}

export const readCv = (id: string): Buffer => readFileSync(cvPath(id))

export const removeCvs = (ids: string[]): void => ids.forEach((id) => rmSync(cvPath(id), { force: true }))

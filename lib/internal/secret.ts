import { createHash, timingSafeEqual } from "node:crypto"

const digest = (value: string): Buffer => createHash("sha256").update(value).digest()

export const matchesSecret = (candidate: string, secret: string): boolean =>
  timingSafeEqual(digest(candidate), digest(secret))

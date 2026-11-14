import { createHash, timingSafeEqual } from "node:crypto"
import { getIronSession, type IronSession } from "iron-session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { internalEnv } from "@/lib/internal/env"

type InternalSession = { signedIn: boolean }

export const session = async (): Promise<IronSession<InternalSession>> =>
  getIronSession<InternalSession>(await cookies(), {
    password: internalEnv().INTERNAL_SESSION_SECRET,
    cookieName: "internal_session",
    ttl: 60 * 60 * 24 * 30,
    cookieOptions: { httpOnly: true, secure: true, sameSite: "lax", path: "/internal" },
  })

export const requireSignedIn = async (): Promise<void> => {
  const current = await session()
  if (!current.signedIn) redirect("/internal/login")
}

const digest = (value: string): Buffer => createHash("sha256").update(value).digest()

export const matchesSecret = (candidate: string, secret: string): boolean =>
  timingSafeEqual(digest(candidate), digest(secret))

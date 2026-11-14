import { passkey } from "@better-auth/passkey"
import { betterAuth } from "better-auth"
import { getMigrations } from "better-auth/db/migration"
import { nextCookies } from "better-auth/next-js"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { database } from "@/lib/internal/db"
import { internalEnv } from "@/lib/internal/env"

const build = () => {
  const env = internalEnv()
  const site = new URL(env.BETTER_AUTH_URL)
  return betterAuth({
    appName: "Pavlo Kostiuk internal",
    baseURL: env.BETTER_AUTH_URL,
    basePath: "/internal/api/auth",
    secret: env.BETTER_AUTH_SECRET,
    database: database(),
    emailAndPassword: { enabled: true, disableSignUp: true },
    rateLimit: {
      enabled: true,
      storage: "memory",
      customRules: { "/sign-in/email": { window: 60, max: 10 } },
    },
    advanced: { ipAddress: { ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"] } },
    plugins: [passkey({ rpID: site.hostname, rpName: "Pavlo Kostiuk internal", origin: site.origin }), nextCookies()],
  })
}

type Auth = ReturnType<typeof build>

const prepare = async (): Promise<Auth> => {
  const auth = build()
  const { runMigrations } = await getMigrations(auth.options)
  await runMigrations()
  const context = await auth.$context
  const env = internalEnv()
  const owner = await context.internalAdapter.findUserByEmail(env.INTERNAL_OWNER_EMAIL)
  if (!owner) {
    const user = await context.internalAdapter.createUser(
      { email: env.INTERNAL_OWNER_EMAIL, name: "Pavlo", emailVerified: true },
      { method: "admin" },
    )
    await context.internalAdapter.linkAccount({
      userId: user.id,
      providerId: "credential",
      accountId: user.id,
      password: await context.password.hash(env.INTERNAL_PASSWORD),
    })
  }
  return auth
}

const instances = new Map<string, Promise<Auth>>()

export const authReady = (): Promise<Auth> => {
  const key = internalEnv().INTERNAL_DB_PATH
  const existing = instances.get(key)
  if (existing) return existing
  const created = prepare()
  instances.set(key, created)
  return created
}

export const currentSession = async () => (await authReady()).api.getSession({ headers: await headers() })

export const requireSignedIn = async (): Promise<void> => {
  if (!(await currentSession())) redirect("/internal/login")
}

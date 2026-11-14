import { z } from "zod"

const schema = z.object({
  BETTER_AUTH_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  INTERNAL_OWNER_EMAIL: z.email(),
  INTERNAL_PASSWORD: z.string().min(12),
  INTERNAL_INGEST_TOKEN: z.string().min(32),
  INTERNAL_DB_PATH: z.string().min(1),
})

export type InternalEnv = z.infer<typeof schema>

export const internalEnv = (): InternalEnv => schema.parse(process.env)

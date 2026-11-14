import { z } from "zod"

const schema = z.object({
  INTERNAL_PASSWORD: z.string().min(12),
  INTERNAL_SESSION_SECRET: z.string().min(32),
  INTERNAL_INGEST_TOKEN: z.string().min(32),
  INTERNAL_DB_PATH: z.string().min(1),
  TWENTY_API_URL: z.url(),
  TWENTY_API_KEY: z.string().min(1),
})

export type InternalEnv = z.infer<typeof schema>

export const internalEnv = (): InternalEnv => schema.parse(process.env)

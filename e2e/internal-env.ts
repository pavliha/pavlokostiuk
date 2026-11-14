import { tmpdir } from "node:os"
import { join } from "node:path"

process.env.INTERNAL_E2E_RUN ||= String(Date.now())

const run = process.env.INTERNAL_E2E_RUN

export const INTERNAL_TEST_ENV = {
  BETTER_AUTH_URL: "http://localhost:4400",
  BETTER_AUTH_SECRET: "e2e-better-auth-secret-at-least-32-characters",
  INTERNAL_OWNER_EMAIL: "owner@example.com",
  INTERNAL_PASSWORD: "e2e-internal-password",
  INTERNAL_INGEST_TOKEN: "e2e-ingest-token-at-least-32-characters-long",
  INTERNAL_DB_PATH: join(tmpdir(), `internal-e2e-${run}.db`),
  TWENTY_API_URL: "https://crm.aircast.one",
  TWENTY_API_KEY: "not-used-by-the-e2e-suite",
}

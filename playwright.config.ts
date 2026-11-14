import { tmpdir } from "node:os"
import { join } from "node:path"
import { defineConfig } from "@playwright/test"

export const INTERNAL_TEST_ENV = {
  BETTER_AUTH_URL: "http://localhost:4400",
  BETTER_AUTH_SECRET: "e2e-better-auth-secret-at-least-32-characters",
  INTERNAL_OWNER_EMAIL: "owner@example.com",
  INTERNAL_PASSWORD: "e2e-internal-password",
  INTERNAL_INGEST_TOKEN: "e2e-ingest-token-at-least-32-characters-long",
  INTERNAL_DB_PATH: join(tmpdir(), `internal-e2e-${Date.now()}.db`),
  TWENTY_API_URL: "https://crm.aircast.one",
  TWENTY_API_KEY: "not-used-by-the-e2e-suite",
}

export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: "http://localhost:4400" },
  webServer: {
    command: "npx next start -p 4400",
    url: "http://localhost:4400/en",
    reuseExistingServer: true,
    timeout: 60000,
    env: INTERNAL_TEST_ENV,
  },
})

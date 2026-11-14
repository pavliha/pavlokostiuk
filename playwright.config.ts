import { defineConfig } from "@playwright/test"

import { INTERNAL_TEST_ENV } from "./e2e/internal-env"

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

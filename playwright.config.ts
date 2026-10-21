import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: "http://localhost:4400" },
  webServer: {
    command: "npx next start -p 4400",
    url: "http://localhost:4400/en",
    reuseExistingServer: true,
    timeout: 60000,
  },
})

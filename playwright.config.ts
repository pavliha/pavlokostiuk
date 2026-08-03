import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: "http://localhost:4400" },
  webServer: {
    command: "npx --yes serve out -l 4400 --no-clipboard",
    url: "http://localhost:4400/en",
    reuseExistingServer: true,
    timeout: 60000,
  },
})

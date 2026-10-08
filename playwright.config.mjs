import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: process.env.CI ? "yarn start" : "yarn dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      NEXTAUTH_URL: baseURL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "ci-test-secret",
      GOOGLE_ID: process.env.GOOGLE_ID || "dummy-google-id",
      GOOGLE_CLIENT_SECRET:
        process.env.GOOGLE_CLIENT_SECRET || "dummy-google-secret",
      MONGODB_URI:
        process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/promptopia-test",
    },
  },
});

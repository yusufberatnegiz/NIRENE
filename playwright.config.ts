import { defineConfig, devices } from "@playwright/test";

// Runs against the production build (`npm run build` first). Reuses a server already on :3000.
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3000", locale: "tr-TR" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    // Safari does not focus links on tap/click, unlike Chromium; catches blur-closes-menu bugs.
    { name: "iphone", use: { ...devices["iPhone 13"] } },
    { name: "safari", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000/tr",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});

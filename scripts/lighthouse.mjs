// Lighthouse against the local production server, using Playwright's Chromium.
// Usage: npm run build && npm run start, then: node scripts/lighthouse.mjs
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "@playwright/test";

const base = process.env.LH_BASE ?? "http://localhost:3000";
const paths = ["/tr", "/tr/agents", "/tr/agents/onboarding", "/tr/pricing", "/en"];
const presets = { mobile: undefined, desktop: "desktop" };
const categories = ["performance", "accessibility", "best-practices", "seo"];

const chrome = await chromeLauncher.launch({ chromePath: chromium.executablePath(), chromeFlags: ["--headless=new"] });
const rows = [];
try {
  for (const [device, preset] of Object.entries(presets)) {
    for (const path of paths) {
      const config = preset ? (await import("lighthouse/core/config/desktop-config.js")).default : undefined;
      const result = await lighthouse(`${base}${path}`, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: categories }, config);
      const c = result.lhr.categories;
      const failed = Object.values(result.lhr.audits)
        .filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode === "binary")
        .map((a) => a.id);
      rows.push({ device, path, perf: Math.round(c.performance.score * 100), a11y: Math.round(c.accessibility.score * 100), bp: Math.round(c["best-practices"].score * 100), seo: Math.round(c.seo.score * 100), failed: failed.join(", ") });
    }
  }
} finally {
  await chrome.kill();
}
console.table(rows);

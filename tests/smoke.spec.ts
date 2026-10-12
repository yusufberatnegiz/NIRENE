import { expect, test } from "@playwright/test";
import tr from "../src/dictionaries/tr.json";

const pages = ["", "/platform", "/agents", "/principles", "/pricing", "/team", "/login", "/privacy"];
const agentSlugs = tr.agents.map((a) => a.slug);

test("root redirects to Turkish, English Accept-Language to /en", async ({ page, browser }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/tr$/);
  const en = await browser.newContext({ locale: "en-US" });
  const enPage = await en.newPage();
  await enPage.goto("http://localhost:3000/");
  await expect(enPage).toHaveURL(/\/en$/);
  await en.close();
});

for (const lang of ["tr", "en"]) {
  for (const path of [...pages, ...agentSlugs.map((s) => `/agents/${s}`)]) {
    test(`${lang}${path || "/"} renders with one h1, lang and no em dash`, async ({ page }) => {
      const res = await page.goto(`/${lang}${path}`);
      expect(res?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("h1")).toHaveCount(1);
      const text = await page.locator("body").innerText();
      expect(text).not.toMatch(/[—–]/);
    });
  }
}

test("unknown agent returns 404", async ({ page }) => {
  const res = await page.goto("/tr/agents/does-not-exist");
  expect(res?.status()).toBe(404);
});

test("security headers are present", async ({ request }) => {
  const res = await request.get("/tr");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["permissions-policy"]).toContain("camera=()");
  expect(h["strict-transport-security"]).toContain("max-age=");
  expect(h["x-powered-by"]).toBeUndefined();
});

test("pilot CTA is a mailto link with a localized subject", async ({ page }) => {
  await page.goto("/en");
  const href = await page.getByRole("link", { name: /Request a pilot/ }).first().getAttribute("href");
  expect(href).toMatch(/^mailto:.+\?subject=.*pilot%20request/);
});

test("login page collects nothing in phase 1", async ({ page }) => {
  await page.goto("/tr/login");
  await expect(page.locator("input, textarea, form")).toHaveCount(0);
});

test("metrics and pricing carry their target/indicative labels", async ({ page }) => {
  await page.goto("/tr");
  await expect(page.getByText("Hedef", { exact: true })).toBeVisible();
  await page.goto("/tr/pricing");
  await expect(page.getByText(/Örnek fiyatlardır/)).toBeVisible();
});

test("language switch keeps the current page", async ({ page }) => {
  await page.goto("/tr/pricing");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en\/pricing$/);
});

test("new page opens at the top after navigating from the bottom", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop nav");
  await page.goto("/tr");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Ekip" }).click();
  await expect(page).toHaveURL(/\/tr\/team$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("agents dropdown opens on hover and links to agent pages", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop nav");
  await page.goto("/tr");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Asistanlar" }).hover();
  const item = page.getByRole("link", { name: /Kültür Asistanı/ }).first();
  await expect(item).toBeVisible();
  await item.click();
  await expect(page).toHaveURL(/\/tr\/agents\/culture$/);
});

test("mobile menu opens, lists sections and closes on Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile nav");
  await page.goto("/tr");
  const toggle = page.getByRole("button", { name: "Menü" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  for (const name of ["Platform", "Asistanlar", "İlkeler", "Fiyatlar", "Ekip"]) {
    await expect(page.locator("#mobile-menu").getByRole("link", { name })).toBeVisible();
  }
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
});

test("no horizontal overflow on key pages", async ({ page }) => {
  for (const path of ["/tr", "/tr/agents", "/tr/agents/onboarding", "/tr/pricing", "/tr/team"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});

test("theme toggle switches, persists and overrides the system setting", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/tr");
  const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(await bg()).toBe("rgb(245, 246, 248)");
  await page.locator("header button", { hasText: "Koyu temaya geç" }).click();
  expect(await bg()).toBe("rgb(0, 0, 0)");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await bg()).toBe("rgb(0, 0, 0)");
  await page.locator("header button", { hasText: "Açık temaya geç" }).click();
  expect(await bg()).toBe("rgb(245, 246, 248)");
});

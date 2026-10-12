# Testing

## Required Before Completion

- [ ] Lint, typecheck and build pass.
- [ ] Playwright smoke tests pass.
- [ ] User-visible changes checked in a browser (TR/EN, 360px/desktop, light/dark).
- [ ] No tests skipped or weakened without approval.

## Commands

- All tests: `npm test` (Playwright, desktop + Pixel 7; run `npm run build` first, reuses a server on :3000)
- Lighthouse: `npm run start` then `npm run lighthouse` (uses Playwright Chromium; prints perf/a11y/best-practices/SEO per page)
- Single test: `npx playwright test -g "<name>"`
- Typecheck: `npx tsc --noEmit`
- Lint: `npm run lint`
- Build: `npm run build`

## What To Test

| Change type | Minimum check |
|-------------|---------------|
| Copy / translations | Both locales render the key; no missing-message warnings in dev |
| Section UI | Browser check at 360px and desktop, both themes |
| Routing / middleware | Playwright: `/` → `/tr`, switcher keeps the section |
| Headers / config | Playwright or `curl -I` against `npm run start` |
| Phase 2 auth | Human review plus focused tests, logged-out access to protected routes |

## Smoke tests (from PRD acceptance steps)

- `/` redirects to `/tr`; `/en` renders English.
- Primary CTA `href` starts with `mailto:` and has a locale-specific subject.
- `/[locale]/login` contains no `input` elements.
- Metric and pricing sections contain their target/indicative labels.
- Security headers present.

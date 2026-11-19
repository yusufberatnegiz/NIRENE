# Testing

## Required Before Completion

- [ ] Lint, typecheck and build pass.
- [ ] Smoke checks below done with `curl` and the in-app browser (no Playwright in this project).
- [ ] User-visible changes checked in a browser (TR/EN, 360px/desktop, light/dark).
- [ ] No tests skipped or weakened without approval.

## Commands

- Routes and headers: `curl -s -o /dev/null -w "%{http_code}"` and `curl -sI` against `npm run start` or the live URL
- Typecheck: `npx tsc --noEmit`
- Lint: `npm run lint`
- Build: `npm run build`

## What To Test

| Change type | Minimum check |
|-------------|---------------|
| Copy / translations | Both locales render the key; no missing-message warnings in dev |
| Section UI | Browser check at 360px and desktop, both themes |
| Routing / middleware | `curl`: `/` → `/tr`; browser: switcher keeps the section |
| Headers / config | `curl -I` against `npm run start` |
| Phase 2 auth | Human review plus focused tests, logged-out access to protected routes |

## Smoke tests (from PRD acceptance steps)

- `/` redirects to `/tr`; `/en` renders English.
- Primary CTA `href` starts with `mailto:` and has a locale-specific subject.
- `/[locale]/login` contains no `input` elements.
- Metric and pricing sections contain their target/indicative labels.
- Security headers present.

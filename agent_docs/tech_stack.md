# Tech Stack

Last verified: 2026-10-12 (build, lint, typecheck, browser)

## Stack

| Area | Choice | Notes |
|------|--------|-------|
| Frontend | Next.js 16.4 App Router, React 19, TypeScript | Static generation per locale in phase 1 |
| i18n | Built-in: `src/app/[lang]`, `src/dictionaries/{tr,en}.json`, `src/proxy.ts` | `tr` default, `en`; locale prefix in URL |
| Backend | none (phase 1); FastAPI (phase 2, separate service) | REST draft in `docs/research-NOOVOY.md` |
| Database | none (phase 1); PostgreSQL + pgvector with RLS (phase 2) | |
| Auth | none (phase 1); own JWT in HttpOnly cookies, invitation-only (phase 2) | |
| Styling | Tailwind CSS 4 with project tokens | No shadcn defaults; CLAUDE.md design list |
| Deployment | undecided | Must run Next.js |

## Commands

- Setup: `npm install`
- Dev: `npm run dev`
- Typecheck: `npx tsc --noEmit` (run after a build/dev so route types exist)
- Lint: `npm run lint`
- Build: `npm run build`
- Test: `npm test`
- Lighthouse: `npm run lighthouse` (server running)
- Browser check: `npm run dev`, then `/tr` and `/en` at 360px and desktop, light and dark

## Important Patterns

- Copy: `src/dictionaries/{tr,en}.json` only; brand names from `src/config/site.ts`.
- Structured content (team, partners, pricing) with `{tr,en}` fields: `src/config/site.ts`. Metrics live in the dictionaries.
- Security headers: `next.config` `headers()`.

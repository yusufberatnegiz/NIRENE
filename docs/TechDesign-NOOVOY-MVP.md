# NOOVOY AI website: technical design (MVP)

Companion to `docs/PRD-NOOVOY-MVP.md`. Phase 1 is a static, bilingual marketing site. The phase 2 app gets added to the same Next.js project.

## Stack

| Area | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router), TypeScript, latest stable at scaffold time | Page and app in one project; static generation for the page now; server-side session checks for the app later. Matches the Drive architecture doc. |
| i18n | Next.js built-in pattern: `app/[lang]` + JSON dictionaries + `src/proxy.ts` redirect; `tr` (default), `en` | Documented in the bundled Next 16 i18n guide; two locales and static pages do not need a library. |
| Styling | Tailwind CSS with project design tokens (colour, type, spacing, radius) defined once | Fast iteration; tokens enforce the CLAUDE.md rules. No shadcn defaults. |
| Fonts | Self-hosted through `next/font` (max two families, not Inter, not Space Grotesk + Instrument Serif) | No third-party font requests (privacy, CSP); chosen during the design step. |
| Content | `src/dictionaries/tr.json`, `src/dictionaries/en.json`; structured data with `{tr,en}` fields in `src/config/site.ts` | Copy edits without touching components; mock pricing is one place. |
| Brand | `src/config/site.ts`: product, project, company, contact email; copy uses `{product}`/`{project}`/`{company}` placeholders | Naming is unconfirmed; one-file rename. |
| Backend / DB | None in phase 1 | mailto CTA only. |
| Auth | None in phase 1; own JWT-cookie auth against FastAPI in phase 2 | PRD decision. |
| Deployment | Open question; must support Next.js (Vercel, Netlify, or Docker `next start`) | Decided before first public deploy. |

## Structure

- `src/app/[locale]/page.tsx`: product page, statically generated per locale (`generateStaticParams`).
- `src/app/[locale]/login/page.tsx`: invitation-only notice (phase 1). Replaced by the real login in phase 2.
- `src/app/[locale]/privacy/page.tsx`: privacy notice.
- `src/proxy.ts` (Next 16 renamed middleware to proxy): redirect paths without a locale to `/tr` or `/en` from `Accept-Language`.
- `src/components/sections/*`: one component per page section; sections compose plain components, no section-level animation wrappers.
- Product visuals: real-looking UI fragments built in code (chat answer with source cards, journey timeline) using the wireframe layouts, so they stay translatable and crisp.

## Security (phase 1)

- Security headers set in `next.config` `headers()`: CSP (`default-src 'self'`; `img-src 'self' data:`; `frame-ancestors 'none'`; `form-action 'self'`; `object-src 'none'`; `base-uri 'self'`), HSTS in production, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera/mic/geolocation.
- `script-src 'self' 'unsafe-inline'` because nonce-based CSP forces dynamic rendering of static pages. Acceptable while the site takes no user input; switch to nonces when the phase 2 app ships.
- No secrets exist in phase 1. `.env*` git-ignored from the start; `.env.example` with placeholders.
- `npm audit` before each deploy; lockfile committed.

## Implementation steps

1. Scaffold Next.js + TypeScript + Tailwind + ESLint; `[lang]` routing, dictionaries and proxy.
2. Design tokens and typography (run the taste/frontend skills; check the CLAUDE.md design list).
3. `site.ts` config and content data files; TR and EN message files.
4. Sections in PRD order; header with language switcher and Sign in; footer.
5. Login placeholder and privacy pages.
6. Security headers, metadata, OG images, sitemap, robots, `hreflang`.
7. Playwright smoke tests for the PRD acceptance steps; Lighthouse pass; 360px and keyboard checks.

## Commands

Created by the scaffold; not yet run.

- Setup: `npm install`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`
- Test: `npx playwright test`

## Verification

PRD acceptance steps through Playwright (locale redirect, switcher, mailto href, login page has no inputs, labels on metrics and pricing, headers present) plus manual Lighthouse and visual checks in light/dark at 360px and desktop. **Nothing is verified yet.**

## Handoff Context

- App: NOOVOY AI website.
- Level: Developer.
- Platform: Web, static (phase 1).
- Budget: No paid services needed for phase 1.
- Timeline: 1–2 weeks for phase 1.
- Mode: Guided, Claude Code.
- Constraints: CLAUDE.md design/security rules; no backend in phase 1; naming must be one-file configurable.
- Decisions: Next.js 16 App Router, built-in i18n dictionaries, Tailwind with custom tokens, self-hosted fonts, static generation, mailto CTA, header-based security policy.
- Open questions: hosting/domain (before deploy); contact email (placeholder); final naming; partner logo files; font, palette and logo (design step).

## Metadata

```json
{
  "schemaVersion": 1,
  "documentType": "techdesign",
  "appName": "NOOVOY AI",
  "stack": {
    "frontend": "Next.js 16 App Router, TypeScript, built-in i18n dictionaries",
    "styling": "Tailwind CSS with custom design tokens",
    "backend": "None in phase 1; FastAPI in phase 2",
    "auth": "None in phase 1; own JWT cookie auth in phase 2",
    "deployment": "Undecided"
  },
  "commands": {
    "setup": "npm install",
    "dev": "npm run dev",
    "lint": "npm run lint",
    "typecheck": "npx tsc --noEmit",
    "build": "npm run build",
    "test": "npx playwright test"
  }
}
```

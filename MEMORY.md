# Memory

Update after major decisions, completed phases, or bugs future agents need to know about. Keep it short.

## Current State

- Current task: Phase 1 product page.
- Current phase: Product page v1 built (TR/EN, light/dark). Design council (visual, a11y, content, responsive, B2B) reached 9+/10 in all five areas on 2026-10-13 after 5 rounds.
- Next step: advisor review of copy/naming/pricing; supply pending externals (real email, quotes, team photos, setup time/HR hours, reply-time promise, legal docs, hosting).
- Blocked by: none (contact email can be a placeholder until provided).

## Decisions

- 2026-10-12 Product page first, app second; primary audience is companies, CTA is a pilot/demo request.
- 2026-10-12 Next.js App Router, TR (default) + EN, Tailwind with custom tokens.
- 2026-10-12 CTA is a mailto link; no form or backend in phase 1.
- 2026-10-12 Own auth with invitation-only accounts in phase 2; backend (FastAPI) not started.
- 2026-10-12 Partner names, team, target metrics and mock pricing are public; pricing confirmed after advisor review.
- 2026-10-12 Partner logos (AGT, DOKA, DESIRD) approved for use; logo files still to be sourced.
- 2026-10-12 No NOOVOY logo exists; we design one (wordmark + mark) in the design step.
- 2026-10-12 Scroll animations added on explicit user request (overrides CLAUDE.md rule 12): CSS scroll-driven `.reveal`/`.reveal-tilt`/`.parallax` in globals.css, gated by prefers-reduced-motion. Dark theme is true black. Havva Cebel removed from team.
- 2026-10-12 Logos in public/logos from each organisation's site (AGT svg, DESIRD/AOSB Teknopark/ABÜ png); DOKA logo from dokaplast.com (2026-10-13), cropped to the mark without the tagline. Photos in src/assets/photos from Unsplash (free license): mentor 1690378820474-b468b8ee64d3, factory 1581091212991-8891c7d4bd9b, desk 1559136555-9303baea8ebd.
- 2026-10-12 Scope change (user): home page now presents the whole NOOVOY AI ecosystem, not only the Onboarding Agent. Added `/[lang]/agents` and `/[lang]/agents/[slug]` (8 agents, content in dictionaries `agents`). Only Onboarding is marked "in development"; the other 7 are "planned" and described with PRD-safe framing (voluntary, aggregated, HR-controlled; no monitoring, scoring or attrition prediction). User asked to remove the per-agent "Boundaries" section.
- 2026-10-12 Each nav item is its own page: /platform, /agents (+ /agents/[slug]), /principles, /pricing, /team via `PageShell` in src/components/Page.tsx. Home = Hero, Problem, Ecosystem, Pilot, Contact. Agents nav item has a CSS-only dropdown (hover + keyboard focus-visible).
- 2026-10-12 Theme toggle: system preference by default; explicit choice stored in localStorage `theme` and applied as `<html data-theme>` by an inline head script (src/components/themeScript.ts, must stay outside the "use client" module). Tailwind `dark:` uses a custom variant matching the same rule. Logos: dark tiles + inverted logos in dark; white tile + original colors on hover in both themes.
- 2026-10-12 Contact email: placeholder in `src/config/site.ts` until provided.
- 2026-10-12 Working naming: NOOVOY AI product, NİRENE project/ecosystem, INNOSU R&D company. Configurable in one file.
- 2026-10-12 Premium redesign after user feedback ("looks bad"). References studied: Leapsome, Lattice, Rippling, Moveworks (patterns only, nothing copied). Palette: midnight ink #0e1525 + saffron #f2a93b, cool neutrals. Fonts: Schibsted Grotesk (display) + Geist (body). Shape: shells 28px / cores 22px / UI 12px / pills. Hero shows a real-component app window from the team's AI Chat wireframe.

- 2026-10-13 Status labels: "Pilot programında" (Onboarding) / "Erken erişim" (others). Hero keeps whole-product framing (owner decision), phrased as "designed"; no "today we start with onboarding" line.
- 2026-10-13 Security copy uses design tense ("tasarlanır") for encryption, pseudonymisation and no-model-training: unverified, owner must confirm before launch.

- 2026-10-13 Hosting: Vercel, live at https://nirene.vercel.app (GitHub main auto-deploys). Live smoke tests 92/92, headers and HTTPS redirect verified.

## Known Issues

- 2026-10-12 Lighthouse: desktop 100/100/100/100 on /tr, /tr/agents, /tr/agents/onboarding, /tr/pricing, /en; mobile perf 94-96, rest 100. Reveal animations must not leave text semi-transparent once in view (axe flags it): keep opacity in the first 40% of `rise` and no opacity in `tilt-in`.
- Unknown `/[lang]/agents/<slug>` is rejected in src/proxy.ts: notFound() after streaming starts keeps HTTP 200 under Cache Components.

- 2026-10-12 Design + security review passed (web-design-guidelines, security-audit guidance mode): 0 contrast failures light/dark on all pages, heading order fixed, keyboard nav OK; headers on all routes, no open redirect, image optimizer rejects remote URLs, no secrets, no source maps. Open: CSP 'unsafe-inline' (switch to nonces in phase 2), HSTS has `preload` (only submit once the domain is final).

- Next 16 no longer overrides CSS `scroll-behavior: smooth` on navigation; `<html data-scroll-behavior="smooth">` is required or new pages open at the previous scroll position.

- `npm audit`: 5 high, all dev-only via eslint-config-next → braces (ReDoS-style DoS in lint tooling, not shipped). Suggested fix downgrades to eslint-config-next 14; do not apply. Recheck on next eslint-config-next release.
- `npx tsc --noEmit` needs `.next/types` from a prior `npm run build`/`npm run dev` (PageProps/LayoutProps are generated).
- Tailwind: do not combine `hidden` with the shared `button.*` classes (base has `inline-flex`, which wins). Wrap in a `hidden md:block` element instead.
- Hosting/domain: decide before first public deploy.
- Contact email is a placeholder; replace before launch.
- DOKA logo file not yet obtained (official site not found).
- Two Drive sources unreadable (AGT/DESIRD/DOKA handbook drafts, Employee Handbook Template v1.0).

## Completed

- [x] Research, PRD, Tech Design, agent files
- [x] Initial scaffold (Next 16.4, React 19.3, Tailwind 4.3)
- [x] Design tokens and typography
- [x] Product page sections (TR/EN)
- [x] Login placeholder and privacy pages
- [x] Security headers, basic metadata + hreflang
- [ ] OG image, sitemap, robots
- [x] Playwright smoke tests (tests/smoke.spec.ts, 83 pass) and Lighthouse script (scripts/lighthouse.mjs)
- [ ] Launch checks

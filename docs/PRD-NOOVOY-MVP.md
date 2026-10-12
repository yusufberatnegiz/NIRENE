# NOOVOY AI website: product requirements (MVP)

Built on `docs/research-NOOVOY.md`. The Onboarding Agent's own requirements live in the team's Master PRD (Drive: `1) DISCOVER/Claude MD - GPT PRD Instructions/NOOVOY_AI_Master_PRD.md`); this document covers the website that presents it and, later, gives users access to it.

## Purpose

One site, two jobs, delivered in two phases:

1. **Phase 1, product page (this MVP):** explain NOOVOY AI and its Onboarding Agent to companies and get HR leaders to request a pilot or demo.
2. **Phase 2, app (later):** "Sign in" leads invited employees, HR specialists and managers to their agents (Dashboard, AI Chat, Missions, Journey, HR Dashboard per the wireframes).

## Users (phase 1)

- **Primary:** HR directors and people/culture leads at 50–5,000 employee companies in Türkiye and nearby markets, evaluating onboarding tools.
- **Secondary:** pilot partners (AGT, DOKA, DESIRD), programme evaluators and investors who receive the link.
- **Phase 2 users:** new employees, HR specialists, managers (limited), technical admin. Accounts are invitation-only.

## Must have (phase 1)

- **Bilingual TR/EN.** Locale in the URL (`/tr`, `/en`), language switcher on every page, Turkish default. Every visible string comes from translation files; no hard-coded copy.
- **Hero.** Product name, one concrete sentence about what the Onboarding Agent does, primary CTA "Pilot başvurusu / Request a pilot" (mailto), secondary "Giriş yap / Sign in".
- **Problem.** The onboarding pains from the research (same questions to HR, scattered documents, unclear first weeks).
- **How the Onboarding Agent works.** Source-grounded Q&A with visible citations, role-based 30/60/90-day plan, missions and progress, HR review. Shown with a realistic product visual (chat answer with source cards, journey timeline), not icon boxes.
- **Trust and ethics.** Answers only from approved documents, says when it does not know, HR reviews plans, no employee surveillance or scoring, GDPR/KVKK alignment, EU AI Act awareness.
- **Roadmap.** The broader NİRENE / 8-agent ecosystem presented as future work, clearly separated from what exists now. No P2 capability is described as available.
- **Pilot partners.** AGT, DOKA, DESIRD with their focus areas.
- **Target metrics.** −70% HR operational load, −30% time-to-productivity, +15 eNPS, <10% first-6-month attrition, each labelled as a target/projection.
- **Pricing (mock).** Starter / Growth / Enterprise / Pilot, visibly marked as indicative until confirmed; values live in one data file.
- **Team and advisors.** Names, titles, roles from the research.
- **Contact.** mailto link with prefilled subject; no form, no backend.
- **Sign in entry point.** Header button to `/[locale]/login`. In phase 1 that page states that access is invitation-only for pilot users and gives the contact link. No credentials are collected in phase 1.
- **Footer.** INNOSU R&D, AOSB Teknopark, ABÜ collaboration, privacy notice link, language switcher.
- **Quality bar.** CLAUDE.md design rules; WCAG 2.1 AA in light and dark; responsive down to 360px; content visible without JS animations; `prefers-reduced-motion` respected.

## Acceptance steps

1. Open `/`: redirected to `/tr`; page renders with Turkish copy.
2. Switch to EN: same section on `/en`, all visible text in English, no Turkish leftovers.
3. Press the primary CTA: mail client opens with the configured address and a prefilled subject in the active language.
4. Press "Sign in": `/[locale]/login` explains invitation-only access; no input fields.
5. Every metric shows a "target" label; pricing shows an "indicative" label.
6. Roadmap section never states that Wellness, Retention or monitoring features are live.
7. Keyboard-only: all links and buttons reachable with a visible focus ring; skip link works.
8. Lighthouse (mobile): Accessibility ≥ 95, SEO ≥ 95, Performance ≥ 90.
9. 360px width: no horizontal scroll.
10. Response headers include CSP, HSTS (production), `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`, `Permissions-Policy`.

## Should have

- Open Graph / social preview image per locale.
- `sitemap.xml`, `robots.txt`, `hreflang` alternates.
- Privacy notice page (TR/EN).

## Out of scope (phase 1)

- Login, sign-up, sessions, any backend or database.
- Demo request form, email service, analytics with cookies.
- The app screens (phase 2).
- Live AI demo on the page.
- CMS.

## Phase 2 notes (for the next PRD revision)

- Own auth (no third-party identity provider): JWT in `HttpOnly`, `Secure`, `SameSite=Lax` cookies, argon2/bcrypt hashing, rate-limited login, invitation-only account creation by HR/admin.
- Roles: employee, HR specialist, manager (read-only progress if HR allows), admin. Company isolation by `company_id`.
- Backend: FastAPI + PostgreSQL/pgvector (not started). Frontend talks to it through the REST draft in the research.

## Success signals

- Partners and the advisor can review it within the 1–2 week window.
- Pilot requests arrive through the mailto link.
- Advisor confirms naming, pricing and partner wording after the first review.

## Handoff Context

- App: NOOVOY AI website (phase 1 product page, phase 2 app).
- Level: Developer (owner reviews; assistant implements).
- Platform: Web, responsive, TR/EN.
- Budget: Not stated; phase 1 needs no paid services.
- Timeline: Phase 1 in 1–2 weeks.
- Mode: Guided, Claude Code.
- Constraints: CLAUDE.md design and security rules; Master PRD scope (Onboarding Agent only is real); targets labelled as targets; pricing mock.
- Decisions: Companies are the primary audience; CTA is a pilot/demo request via mailto; Next.js; bilingual; own auth and invitation-only sign-up in phase 2; partner names, team, metrics and mock pricing are public.
- Open questions:
  - Final naming (NİRENE vs NOOVOY AI hierarchy) awaits advisor confirmation; working assumption: NOOVOY AI product, NİRENE project, INNOSU R&D company.
  - Contact email address for the mailto CTA (placeholder until provided).
  - Hosting and domain (decided before first deploy).
  - Partner logo files (use approved; files to be obtained).
- Resolved: no existing logo, we design a wordmark and mark; partner logos may be shown.

## Metadata

```json
{
  "schemaVersion": 1,
  "documentType": "prd",
  "appName": "NOOVOY AI",
  "oneLiner": "Bilingual product page for the NOOVOY AI Onboarding Agent, later the sign-in gateway to the agents app",
  "targetUsers": "HR leaders at 50-5,000 employee companies; later invited employees, HR specialists and managers",
  "mustHave": [
    "TR/EN locales with switcher",
    "Hero with pilot request CTA and sign-in entry",
    "How the Onboarding Agent works with product visuals",
    "Trust and ethics section",
    "Roadmap separated from current capabilities",
    "Pilot partners, labelled target metrics, mock pricing, team",
    "mailto contact",
    "Invitation-only login placeholder page"
  ]
}
```

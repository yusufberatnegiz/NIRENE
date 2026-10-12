# AGENTS.md — NOOVOY AI website

## Project

- **What this is:** Bilingual (TR/EN) product page for the NOOVOY AI Onboarding Agent; later the sign-in gateway to the agents app.
- **Who it is for:** HR leaders at companies considering a pilot; later invited employees, HR specialists and managers.

## Read first — when relevant

- Product scope or acceptance criteria: `docs/PRD-NOOVOY-MVP.md`.
- Architecture or integration choices: `docs/TechDesign-NOOVOY-MVP.md`.
- Background, naming, partners, team, numbers: `docs/research-NOOVOY.md`.
- Non-obvious product constraints: `agent_docs/project_brief.md`.
- Stack-specific setup: `agent_docs/tech_stack.md`.
- Choosing or troubleshooting checks: `agent_docs/testing.md`.

Read only what the task needs. Current progress lives in `MEMORY.md`.

## Gotchas

- **Naming is not final.** Never hard-code "NOOVOY", "NİRENE" or "INNOSU" in components or copy keys; read them from `src/config/site.ts` / message placeholders.
- **Only the Onboarding Agent exists.** Wellness, Retention, Confusion Score, Hidden Talent, behavioural or Slack/email monitoring are roadmap items. Copy must never present them as available (EU AI Act high-risk area; Master PRD P2).
- **Numbers are targets.** Every metric carries a "target/hedef" label; pricing carries an "indicative/örnek" label until the advisor confirms.
- **Every visible string is translated.** Add keys to both `src/dictionaries/tr.json` and `src/dictionaries/en.json` in the same change.
- **No em dashes in UI copy** and the rest of the CLAUDE.md design list; the FR_1 purple/cyan palette from Drive is rejected.
- Phase 1 has no backend: the CTA is a `mailto:` link and the login page collects nothing.

## Protected areas

Keep secrets, credentials, private logs and production data out of commits. Partner surveys and employee data from Drive never go into this repo. Deploying, buying a domain or contacting partners needs explicit user approval.

## Done means

Requested behaviour complete in both locales, lint/typecheck/build pass, relevant Playwright checks pass, and UI changes were looked at in a browser at 360px and desktop in light and dark. Report what was actually checked.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

@AGENTS.md

# NIRENE — Project Rules

These rules apply to all code written in this project. Follow them by default; deviate only when the user explicitly asks.

## Skills: invoke automatically

Don't wait to be asked. Before starting a task, check the available skills and invoke every one whose description matches the work, for example:

- New feature or vague request: `spec-driven-development` / `interview-me`, then `planning-and-task-breakdown` and `incremental-implementation`.
- UI work: `frontend-ui-engineering` and a taste skill (`taste-skill:design-taste-frontend`); UI review: `web-design-guidelines`.
- Bug or failing build/test: `debugging-and-error-recovery`; new logic: `test-driven-development`.
- Auth, user input, data storage, uploads, third-party APIs: `security-and-hardening`; pre-launch: `security-audit` and `shipping-and-launch`.
- API or module boundary design: `api-and-interface-design`.
- Before finishing a change: `code-review-and-quality`; commits/PRs: `git-workflow-and-versioning`.
- Anything touching Claude/Anthropic APIs: `claude-api`.

## Design: don't look "vibecoded"

Avoid these generic AI-generated UI patterns:

1. **No purple-to-blue gradients.** Pick a deliberate, restrained palette (one accent color, neutrals).
2. **No gradient hero text.** Headlines are solid color; hierarchy comes from size, weight, and spacing.
3. **No emojis in headings** or as decorative bullets.
4. **Not Inter everywhere.** Choose a typeface with character for the brand; pair at most two families.
5. **No colored-border cards** (e.g. `border-l-4 border-blue-500` accents).
6. **No glassmorphism** (`backdrop-blur` + translucent white cards).
7. **No low-contrast dark mode.** Meet WCAG AA (4.5:1 body text, 3:1 large text/UI) in both themes.
8. **No "3 icon boxes in a row"** feature section. Use layouts driven by real content: screenshots, varied grids, prose.
9. **No pill badge above the headline** ("✨ New: ..." chips).
10. **Not Lucide icons everywhere.** Use icons sparingly and only where they aid comprehension; consider a more distinctive set or custom marks.
11. **No untouched shadcn/ui.** If using shadcn, customize tokens (radius, colors, typography, shadows) so it reads as this product.
12. **No fade-in-on-scroll** for every section. Content is visible immediately; motion only where it communicates something. Respect `prefers-reduced-motion`.
13. **No cursor-following beams/spotlights** or similar gimmick effects.
14. **Buttons don't just fade on hover.** Use clear, intentional state changes (color/background shift, pressed state, visible focus ring).
15. **Consistent spacing.** Use a single spacing scale (e.g. 4/8px based tokens); no ad-hoc values.
16. **No em dashes (—) in UI copy.** Use periods, commas, or colons.
17. **No generic buzzword copy** ("seamless", "supercharge", "unlock", "revolutionize", "next-level", "effortless"). Write specific, concrete copy about what the product actually does.
18. **No serif-italic accent words** inside sans-serif headlines.
19. **No Space Grotesk + Instrument Serif** combo (the default "AI tasteful" pairing).
20. **No grain/noise texture over gradients.**

For UI reviews, also use the `web-design-guidelines` skill.

## Security: required before launch

Every feature must satisfy these; check them before considering work done:

1. **Hide API keys.** Secrets live only in server-side env vars (`.env*` in `.gitignore`). Never ship secret keys to the client or prefix them with `NEXT_PUBLIC_`/`VITE_`.
2. **Purge Git secrets.** Never commit secrets; if one is committed, rotate it and scrub history. Keep a `.env.example` with placeholder values only.
3. **Use the public DB key on the client.** Client code uses only the anon/publishable key (e.g. Supabase anon key); service-role/admin keys are server-only.
4. **Enable row-level security** on every table, with explicit policies. No table is reachable without RLS.
5. **Encrypt sensitive data** at rest (PII, tokens) and in transit.
6. **Enforce auth server-side.** Never trust client-side checks or hidden UI; every protected route/API/action verifies the session on the server.
7. **Lock record access.** Every read/write checks the record belongs to (or is shared with) the current user. Prevent IDOR.
8. **Block field tampering.** Whitelist writable fields; never accept `role`, `user_id`, `is_admin`, `price`, etc. from the client. Derive them server-side.
9. **Secure session cookies:** `HttpOnly`, `Secure`, `SameSite=Lax` (or `Strict`), sensible expiry.
10. **Hash passwords** with bcrypt/argon2 (or delegate to a vetted auth provider). Never store or log plaintext.
11. **Rate limit login**, signup, password reset, and other sensitive/expensive endpoints.
12. **Add bot protection** (e.g. Cloudflare Turnstile) on public forms like signup, login, and contact.
13. **Parameterize queries.** No string-concatenated SQL; use the ORM/query builder or prepared statements.
14. **Validate all input** server-side with a schema (e.g. Zod): types, lengths, formats, enums.
15. **Escape user content.** No `dangerouslySetInnerHTML`/`innerHTML` with user data; sanitize (DOMPurify) if HTML is truly required.
16. **Restrict file uploads:** allowlist MIME types and extensions, verify content, cap size, randomize filenames, store outside the web root / in private buckets.
17. **Trim API responses.** Return only the fields the client needs; never leak password hashes, internal IDs, tokens, or other users' data. No stack traces in production errors.
18. **Add security headers:** CSP, HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `frame-ancestors`/`X-Frame-Options`, `Permissions-Policy`.
19. **Force HTTPS** everywhere, with HSTS; redirect HTTP.
20. **Scan dependencies** (`npm audit` or equivalent) and keep them updated; pin versions via the lockfile.

For a deeper review, use the `security-audit` skill.

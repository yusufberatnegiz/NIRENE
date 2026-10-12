# Review Checklist

Do not mark work complete until the relevant checks pass.

## Basic Checks

- [ ] Diff is focused on the requested task.
- [ ] No secrets, partner survey data or employee data in the diff.
- [ ] Lint, typecheck and build passed, or failures are explained.
- [ ] UI checked in a browser: TR and EN, 360px and desktop, light and dark.

## Content

- [ ] New strings exist in both `src/dictionaries/tr.json` and `src/dictionaries/en.json`.
- [ ] Brand names come from `src/config/site.ts`.
- [ ] Metrics labelled as targets; pricing labelled as indicative.
- [ ] No roadmap (P2) capability described as available.
- [ ] No em dashes or buzzword copy (CLAUDE.md design rules 16–17).

## Accessibility

- [ ] Keyboard reachable, visible focus ring, skip link.
- [ ] Contrast AA in both themes.
- [ ] `prefers-reduced-motion` respected.

## Security

- [ ] Security headers still present (CSP, HSTS, nosniff, Referrer-Policy, frame-ancestors, Permissions-Policy).
- [ ] `npm audit`: no unaddressed high-severity findings.
- [ ] No `dangerouslySetInnerHTML` with content from outside the repo.

## Final Evidence

Files changed, commands run, browser results, remaining risks.

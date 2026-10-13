import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";
import { brand } from "@/i18n";
import { AgentsDropdown } from "./AgentsDropdown";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { button, CtaArrow, mailto } from "./ui";

type Props = { lang: Locale; t: Dictionary; path?: string };

const linkClass = "inline-flex items-center gap-1 rounded-full px-3 py-2 transition-colors duration-300 ease-premium hover:bg-shell hover:text-ink active:bg-panel";

// Floating island nav: solid surface (no blur, per project rules), detached from the top edge.
// Full nav from xl; below xl the links live in MobileMenu, below sm also language and sign in.
export function Header({ lang, t, path = "" }: Props) {
  const other = lang === "tr" ? "en" : "tr";
  const home = `/${lang}`;
  const links = [
    ["/platform", t.nav.how],
    ["/agents", t.nav.agents],
    ["/principles", t.nav.trust],
    ["/pricing", t.nav.pricing],
    ["/team", t.nav.team],
  ].map(([p, label]) => ({ href: `${home}${p}`, label, active: path.startsWith(p) }));
  const agents = t.agents.map((a) => ({
    href: `${home}/agents/${a.slug}`,
    slug: a.slug,
    name: a.name,
    live: a.status === "now",
    current: path === `/agents/${a.slug}`,
    status: a.status === "now" ? t.agentsPage.now : t.agentsPage.later,
  }));
  const cta = { href: mailto(brand(t.cta.mailSubject), t.cta.mailBody), label: t.cta.pilot };

  return (
    <header className="sticky top-3 z-20 px-3 sm:top-4">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2">
        {t.nav.skip}
      </a>
      <div className="relative mx-auto flex h-14 max-w-6xl items-center gap-3 rounded-full bg-surface pl-4 pr-2 shadow-soft ring-1 ring-line sm:gap-6 sm:pl-5">
        <Link href={home} aria-label={brand("{product}")} className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label={t.nav.primary} className="hidden xl:block">
          <ul className="flex items-center gap-1 text-sm text-muted">
            {links.map((l) =>
              l.href.endsWith("/agents") ? (
                <AgentsDropdown key={l.href} href={l.href} label={l.label} toggleLabel={t.nav.agentsMenu} active={l.active} items={agents} className={`${linkClass} ${l.active ? "bg-shell text-ink" : ""}`} />
              ) : (
                <li key={l.href}>
                  <Link href={l.href} aria-current={l.active ? "page" : undefined} className={`${linkClass} ${l.active ? "bg-shell text-ink" : ""}`}>
                    {l.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <MobileMenu
            label={t.nav.menu}
            links={links}
            language={{ href: `/${other}${path}`, label: t.nav.languageLabel, lang: other, name: t.nav.language }}
            signIn={{ href: `/${lang}/login`, label: t.nav.signIn }}
            cta={cta}
          />
          <ThemeToggle toLight={t.nav.toLight} toDark={t.nav.toDark} />
          <Link href={`/${other}${path}`} hrefLang={other} lang={other} aria-label={t.nav.languageLabel} className="hidden rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-shell hover:text-ink active:bg-panel sm:inline-flex">
            {t.nav.language}
          </Link>
          <Link href={`/${lang}/login`} className="hidden whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-shell active:bg-panel sm:inline-flex">
            {t.nav.signIn}
          </Link>
          <div className="hidden md:block">
            <a href={cta.href} className={button.primary}>
              {cta.label}
              <CtaArrow />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

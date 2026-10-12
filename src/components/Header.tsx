import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary, Locale } from "@/i18n";
import { brand } from "@/i18n";
import { AgentIcon } from "./AgentIcon";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { button, CtaArrow, mailto } from "./ui";

type Props = { lang: Locale; t: Dictionary; path?: string };

const linkClass = "inline-flex items-center gap-1 rounded-full px-3 py-2 transition-colors duration-300 ease-premium hover:bg-shell hover:text-ink";

// Floating island nav: solid surface (no blur, per project rules), detached from the top edge.
export function Header({ lang, t, path = "" }: Props) {
  const other = lang === "tr" ? "en" : "tr";
  const home = `/${lang}`;
  const links = [
    ["/platform", t.nav.how],
    ["/agents", t.nav.agents],
    ["/principles", t.nav.trust],
    ["/pricing", t.nav.pricing],
    ["/team", t.nav.team],
  ].map(([p, label]) => [`${home}${p}`, label, path.startsWith(p)] as const);

  return (
    <header className="sticky top-3 z-20 px-3 sm:top-4">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2">
        {t.nav.skip}
      </a>
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 rounded-full bg-surface pl-5 pr-2 shadow-soft ring-1 ring-line">
        <Link href={home} aria-label={brand("{product}")}>
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm text-muted">
            {links.map(([href, label, active]) =>
              href.endsWith("/agents") ? (
                <li key={href} className="group relative">
                  <Link href={href} aria-current={active ? "page" : undefined} className={`${linkClass} ${active ? "bg-shell text-ink" : ""}`}>
                    {label}
                    <CaretDown size={12} weight="bold" aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-180 group-has-[:focus-visible]:rotate-180" />
                  </Link>
                  <AgentsMenu lang={lang} t={t} />
                </li>
              ) : (
                <li key={href}>
                  <Link href={href} aria-current={active ? "page" : undefined} className={`${linkClass} ${active ? "bg-shell text-ink" : ""}`}>
                    {label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <MobileMenu label={t.nav.menu} links={links.map(([href, label]) => [href, label] as const)} />
          <ThemeToggle toLight={t.nav.toLight} toDark={t.nav.toDark} />
          <Link href={`/${other}${path}`} hrefLang={other} lang={other} aria-label={t.nav.languageLabel} className="rounded-full px-3 py-2 text-sm text-muted hover:text-ink">
            {t.nav.language}
          </Link>
          <Link href={`/${lang}/login`} className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold hover:bg-shell">
            {t.nav.signIn}
          </Link>
          <div className="hidden md:block">
            <a href={mailto(brand(t.cta.mailSubject))} className={button.primary}>
              {t.cta.pilot}
              <CtaArrow />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// CSS-only dropdown: opens on hover and on keyboard focus (focus-visible, so a mouse click does not keep it open).
function AgentsMenu({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <div className="invisible absolute left-1/2 top-full z-30 w-[34rem] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition duration-300 ease-premium group-has-[:focus-visible]:visible group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <ul className="grid grid-cols-2 gap-1 rounded-2xl bg-surface p-2 text-ink shadow-soft ring-1 ring-line">
        {t.agents.map((a) => (
          <li key={a.slug}>
            <Link href={`/${lang}/agents/${a.slug}`} className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-shell">
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${a.status === "now" ? "bg-accent text-accent-ink" : "bg-panel"}`}>
                <AgentIcon slug={a.slug} size={18} />
              </span>
              <span>
                <span className="block text-sm font-semibold">{a.name}</span>
                <span className="block text-xs text-muted">{a.status === "now" ? t.agentsPage.now : t.agentsPage.later}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

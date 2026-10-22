import Link from "next/link";
import { site } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { brand } from "@/i18n";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "./CookieConsent";
import { container } from "./ui";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const home = `/${lang}`;
  const groups = [
    {
      title: t.footer.product,
      links: [
        [`${home}/platform`, t.nav.how],
        [`${home}/agents`, t.nav.agents],
        [`${home}/pricing`, t.nav.pricing],
      ],
    },
    {
      title: t.footer.company,
      links: [
        [`${home}/team`, t.nav.team],
        [`${home}/principles`, t.nav.trust],
        [`${home}/security`, t.footer.security],
        [`${home}/privacy`, t.footer.privacy],
      ],
    },
  ];
  return (
    <footer className="border-t border-line">
      <div className={`${container} grid gap-10 py-14 text-sm sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]`}>
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-[38ch] leading-relaxed text-muted">{brand(t.footer.about)}</p>
          <p className="mt-4 text-muted">
            {brand(t.footer.address)}
            <br />
            <a href={`mailto:${site.contactEmail}`} className="inline-block py-2 underline-offset-4 hover:text-ink hover:underline">
              {site.contactEmail}
            </a>
          </p>
        </div>
        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <p className="font-semibold">{g.title}</p>
            <ul className="mt-2 grid text-muted">
              {g.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="inline-block py-2.5 underline-offset-4 hover:text-ink hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
              {g.title === t.footer.company && (
                <li>
                  <CookieSettingsButton label={t.cookie.settings} />
                </li>
              )}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <p className={`${container} py-6 text-xs text-muted`}>© {brand(t.footer.rights)}</p>
      </div>
    </footer>
  );
}

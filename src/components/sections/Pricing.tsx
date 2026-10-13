import { site } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { brand } from "@/i18n";
import { button, container, CtaArrow, mailto } from "../ui";

const money = (lang: Locale) =>
  new Intl.NumberFormat(lang === "tr" ? "tr-TR" : "en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export function Pricing({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section id="pricing">
      <div className={`${container} pb-24 md:pb-32`}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {site.pricing.map(({ id, eur, plus }) => {
            const plan = t.pricing.plans[id];
            const pilot = id === "pilot";
            return (
              <li key={id} className={`reveal flex flex-col rounded-shell p-7 ${pilot ? "bg-night text-white shadow-soft [--focus:#f4b453]" : "bg-panel"}`}>
                <h2 className="font-semibold">{plan.name}</h2>
                <p className="mt-10 font-display text-4xl font-semibold tracking-[-0.03em]">
                  {pilot ? t.pricing.free : `${money(lang).format(eur)}${plus ? "+" : ""}`}
                  {!pilot && <span className="ml-1.5 text-sm font-normal tracking-normal text-muted">{t.pricing.perMonth}</span>}
                </p>
                <p className={`mt-4 text-sm leading-relaxed ${pilot ? "text-night-muted" : "text-muted"}`}>{plan.scope}</p>
                {pilot ? (
                  <a href={mailto(brand(t.cta.mailSubject), t.cta.mailBody)} className={`${button.primary} mt-8 self-start`}>
                    {t.cta.pilot}
                    <CtaArrow />
                  </a>
                ) : (
                  <p className="mt-auto pt-8 text-xs font-semibold text-muted">{t.pricing.fromGa}</p>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-muted">{t.pricing.note}</p>
      </div>
    </section>
  );
}

import { site } from "@/config/site";
import type { Locale } from "@/i18n";
import { container } from "../ui";

const initials = (name: string) =>
  name.replace(/^(Prof\. Dr\.|Doç\. Dr\.)\s*/, "").split(" ").map((w) => w[0]).slice(0, 2).join("");

export function Team({ lang }: { lang: Locale }) {
  const people = [...site.team, site.advisor];
  return (
    <section id="team" className={`${container} pb-24 md:pb-32`}>
      <ul className="flex flex-wrap justify-center gap-3">
        {people.map((m) => {
          return (
            <li key={m.name} className="reveal flex basis-full items-center gap-4 rounded-core bg-surface p-5 ring-1 ring-line sm:basis-[calc((100%-0.75rem)/2)] lg:basis-[calc((100%-3rem)/5)] lg:flex-col lg:items-start">
              <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-panel font-display text-sm font-semibold">
                {initials(m.name)}
              </span>
              <span>
                <span className="block font-semibold leading-snug">{m.name}</span>
                <span className="block text-sm text-muted">{m.role[lang]}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

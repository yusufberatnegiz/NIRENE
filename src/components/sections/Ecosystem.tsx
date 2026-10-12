import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";
import { brand } from "@/i18n";
import { AgentGrid } from "../AgentGrid";
import { button, container, SectionTitle } from "../ui";

export function Ecosystem({ lang, t }: { lang: Locale; t: Dictionary }) {
  const e = t.ecosystem;
  return (
    <section id="agents" className={`${container} py-24 md:py-32`}>
      <p className="reveal text-sm font-semibold text-accent-text">{brand(e.eyebrow)}</p>
      <div className="reveal mt-4 flex flex-wrap items-end justify-between gap-6">
        <SectionTitle title={e.title} lead={e.lead} />
        <Link href={`/${lang}/agents`} className={button.secondary}>
          {e.all}
        </Link>
      </div>
      <AgentGrid lang={lang} t={t} />
    </section>
  );
}

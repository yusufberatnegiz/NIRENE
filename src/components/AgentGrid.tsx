import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary, Locale } from "@/i18n";
import { AgentIcon } from "./AgentIcon";

// Featured live agent (2 rows) + 7 planned agents = 9 cells in a 3-column grid.
export function AgentGrid({ lang, t }: { lang: Locale; t: Dictionary }) {
  const e = t.ecosystem;
  const [current, ...planned] = t.agents;
  return (
    <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Link
        href={`/${lang}/agents/${current.slug}`}
        className="reveal group flex flex-col rounded-shell bg-accent p-7 text-accent-ink transition-transform duration-500 ease-premium hover:-translate-y-1 lg:row-span-2"
      >
        <span className="flex items-center justify-between">
          <span className="inline-flex rounded-full bg-accent-ink/10 px-3 py-1 text-xs font-semibold">{t.agentsPage.now}</span>
          <AgentIcon slug={current.slug} size={28} />
        </span>
        <span className="mt-16 block font-display text-4xl font-semibold tracking-[-0.03em] lg:mt-auto">{current.name}</span>
        <span className="mt-3 block max-w-[40ch] leading-relaxed">{current.short}</span>
        <span className="mt-8 inline-flex items-center gap-3 self-start rounded-full bg-accent-ink py-2 pl-5 pr-2 text-sm font-semibold text-accent">
          {e.more}
          <span className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 ease-premium group-hover:-translate-y-px group-hover:translate-x-0.5">
            <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </span>
        </span>
      </Link>
      {planned.map((a) => (
        <Link
          key={a.slug}
          href={`/${lang}/agents/${a.slug}`}
          className="reveal group flex flex-col rounded-core p-5 ring-1 ring-line transition-[background-color,transform] duration-500 ease-premium hover:-translate-y-1 hover:bg-surface"
        >
          <span className="flex items-start justify-between gap-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-panel">
              <AgentIcon slug={a.slug} size={20} />
            </span>
            <ArrowUpRight size={18} weight="light" aria-hidden="true" className="text-muted transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
          </span>
          <span className="mt-5 block font-semibold">{a.name}</span>
          <span className="mt-1 block text-sm leading-relaxed text-muted">{a.short}</span>
          <span className="mt-4 block text-xs text-muted">{t.agentsPage.later}</span>
        </Link>
      ))}
    </div>
  );
}

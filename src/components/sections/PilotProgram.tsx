import { Check } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/i18n";
import { container, SectionTitle } from "../ui";

export function PilotProgram({ t }: { t: Dictionary }) {
  const p = t.pilotProgram;
  const lists = [
    [p.provideTitle, p.provide],
    [p.getTitle, p.get],
  ] as const;
  return (
    <section id="pilot" className="border-y border-line bg-surface">
      <div className={`${container} py-24 md:py-32`}>
        <div className="reveal">
          <SectionTitle title={p.title} lead={p.lead} />
        </div>
        <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {p.steps.map((s, i) => (
            <li key={s.title} className="reveal rounded-core bg-panel p-6">
              <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-accent-ink">
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {lists.map(([title, items]) => (
            <div key={title} className="reveal rounded-core p-6 ring-1 ring-line sm:p-8">
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <ul className="mt-5 grid gap-3">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <Check size={18} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-accent-text" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

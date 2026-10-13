import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/i18n";
import { container, SectionTitle } from "../ui";

// Native <details>: keyboard and screen-reader support without client JS.
export function Faq({ t, group }: { t: Dictionary; group: "pilot" | "data" }) {
  return (
    <section id="faq" className={`${container} py-24 md:py-32`}>
      <div className="reveal">
        <SectionTitle title={t.faq.title} />
      </div>
      <div className="mt-12 grid gap-3">
        {t.faq.items.filter((item) => item.group === group).map((item) => (
          <details key={item.q} className="reveal group rounded-core bg-surface ring-1 ring-line open:bg-panel">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-core px-6 py-5 font-semibold [&::-webkit-details-marker]:hidden">
              {item.q}
              <Plus size={18} weight="bold" aria-hidden="true" className="shrink-0 text-accent-text transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="max-w-[70ch] px-6 pb-6 leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

import { Check, X } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/i18n";
import { container } from "../ui";

export function Trust({ t, nested = false }: { t: Dictionary; nested?: boolean }) {
  const H = nested ? "h3" : "h2";
  const columns = [
    { title: t.trust.doesTitle, items: t.trust.does, Icon: Check, dot: "bg-accent text-accent-ink" },
    { title: t.trust.doesNotTitle, items: t.trust.doesNot, Icon: X, dot: "bg-ink/10 text-ink" },
  ];
  return (
    <section id="trust" className={`${container} pb-24 md:pb-32`}>
      <div className="reveal rounded-frame bg-surface p-3 shadow-soft ring-1 ring-line sm:p-12 lg:p-16">
        <div className="grid gap-6 md:grid-cols-2">
          {columns.map(({ title, items, Icon, dot }) => (
            <div key={title} className="rounded-core bg-panel p-5 sm:p-8">
              <H className="font-display text-xl font-semibold">{title}</H>
              <ul className="mt-6 grid gap-5">
                {items.map((item) => (
                  <li key={item} className="flex gap-4 leading-relaxed">
                    <span className={`flex size-6 shrink-0 items-center justify-center rounded-full ${dot}`}>
                      <Icon size={14} weight="bold" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-[65ch] px-3 pb-3 text-sm text-muted sm:p-0">{t.trust.compliance}</p>
      </div>
    </section>
  );
}

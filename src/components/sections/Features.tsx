import { CheckCircle, Circle, FileText, ShareFat } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/i18n";
import { container, Shell } from "../ui";

export function Features({ t }: { t: Dictionary }) {
  const f = t.features;
  return (
    <section id="features" className={`${container} pb-24 md:pb-32`}>

      <Shell className="reveal" core="bg-accent-tint">
        <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <FeatureText title={f.grounded.title} body={f.grounded.body} />
          <SourcesVisual t={t} />
        </div>
      </Shell>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <Shell className="reveal lg:col-span-7" core="bg-surface">
          <div className="flex h-full flex-col gap-10 p-6 sm:p-10">
            <FeatureText title={f.plan.title} body={f.plan.body} />
            <PlanVisual t={t} />
          </div>
        </Shell>
        <Shell className="reveal lg:col-span-5" core="bg-panel">
          <div className="flex h-full flex-col gap-10 p-6 sm:p-10">
            <FeatureText title={f.hr.title} body={f.hr.body} />
            <HrVisual t={t} />
          </div>
        </Shell>
      </div>
    </section>
  );
}

function FeatureText({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{title}</h2>
      <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function SourcesVisual({ t }: { t: Dictionary }) {
  const p = t.preview;
  return (
    <div className="grid gap-3">
      <div className="rounded-core bg-surface p-5 shadow-soft">
        <p className="text-sm leading-relaxed">{p.answer}</p>
        <ul className="mt-4 grid gap-2">
          {[p.source1, p.source2].map((s) => (
            <li key={s} className="flex items-center gap-2 rounded-ui bg-panel px-3 py-2 text-sm">
              <FileText size={18} weight="light" aria-hidden="true" className="text-accent-text" />
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-start gap-3 rounded-core bg-surface/70 p-5 ring-1 ring-line">
        <ShareFat size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0 text-accent-text" />
        <p className="text-sm leading-relaxed text-muted">{p.notFound}</p>
      </div>
    </div>
  );
}

function PlanVisual({ t }: { t: Dictionary }) {
  const pl = t.plan;
  const stages = [
    [pl.d30, pl.d30Items, true],
    [pl.d60, pl.d60Items, false],
    [pl.d90, pl.d90Items, false],
  ] as const;
  return (
    <ol className="mt-auto grid gap-3 sm:grid-cols-3">
      {stages.map(([label, items, active]) => (
        <li key={label} className={`rounded-core p-4 ${active ? "bg-night text-white" : "bg-panel"}`}>
          <p className="text-sm font-semibold">{label}</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {items.map((item, i) => {
              const done = active && i < 2;
              const Icon = done ? CheckCircle : Circle;
              return (
                <li key={item} className="flex items-start gap-2">
                  <Icon size={18} weight={done ? "fill" : "light"} aria-hidden="true" className={`mt-px shrink-0 ${done ? "text-accent" : active ? "text-night-muted" : "text-muted"}`} />
                  <span className={active ? "" : "text-muted"}>{item}</span>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ol>
  );
}

function HrVisual({ t }: { t: Dictionary }) {
  const h = t.hrPanel;
  return (
    <div className="mt-auto rounded-core bg-surface p-5 shadow-soft">
      <p className="text-sm font-semibold">{h.title}</p>
      <ul className="mt-4 grid gap-2">
        {h.rows.map(([role, status], i) => (
          <li key={role} className="flex items-center justify-between gap-3 rounded-ui bg-panel px-3 py-2.5 text-sm">
            <span>{role}</span>
            {i === 0 ? (
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">{h.approve}</span>
            ) : (
              <span className="text-xs text-muted">{status}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

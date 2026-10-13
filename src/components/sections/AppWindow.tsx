import { ChatCircleText, FileText, Flag, House, ListChecks, PaperPlaneRight, ShareFat } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/i18n";
import { Logo } from "../Logo";

// Real, translatable mini version of the team's AI Chat wireframe (not a screenshot).
export function AppWindow({ t }: { t: Dictionary }) {
  const a = t.app;
  const p = t.preview;
  const icons = [House, ChatCircleText, ListChecks, Flag];

  return (
    <figure className="overflow-hidden rounded-core bg-surface text-ink">
      <div className="grid md:grid-cols-[13rem_1fr] lg:grid-cols-[13rem_1fr_17rem]">
        <div className="hidden border-r border-line p-4 md:block">
          <div className="scale-90 origin-left">
            <Logo />
          </div>
          <ul className="mt-6 grid gap-1 text-sm">
            {a.nav.map((label, i) => {
              const Icon = icons[i];
              const active = i === 1;
              return (
                <li key={label} className={`flex items-center gap-3 rounded-ui px-3 py-2 ${active ? "bg-accent-tint font-semibold" : "text-muted"}`}>
                  <Icon size={18} weight={active ? "fill" : "light"} aria-hidden="true" className={active ? "text-accent-text" : ""} />
                  {label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">{a.title}</p>
            <p className="text-sm text-muted">{a.subtitle}</p>
          </div>
          <Bubble self>{p.question}</Bubble>
          <div className="max-w-[34rem] rounded-ui bg-panel p-4">
            <p className="text-sm leading-relaxed">{p.answer}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {[p.source1, p.source2].map((s) => (
                <li key={s} className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs ring-1 ring-line">
                  <FileText size={14} weight="light" aria-hidden="true" className="text-accent-text" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <Bubble self>{a.q2}</Bubble>
          <div className="max-w-[34rem] rounded-ui bg-panel p-4">
            <p className="text-sm leading-relaxed">{a.a2}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-tint px-3 py-1 text-xs font-semibold text-accent-text">
              <ShareFat size={14} weight="fill" aria-hidden="true" />
              {a.escalated}
            </p>
          </div>
          <div aria-hidden="true" className="mt-auto flex items-center justify-between rounded-full px-4 py-2.5 text-sm text-muted ring-1 ring-line">
            {a.input}
            <PaperPlaneRight size={18} weight="light" aria-hidden="true" />
          </div>
        </div>

        <div className="hidden border-l border-line p-6 lg:block">
          <p className="text-sm font-semibold">{a.journey}</p>
          <p className="mt-4 font-display text-3xl font-semibold tracking-tight">{a.week}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-panel">
            <div className="h-full w-[42%] rounded-full bg-accent" />
          </div>
          <p className="mt-2 text-xs text-muted">{a.progress}</p>
          <p className="mt-8 text-sm font-semibold">{a.next}</p>
          <ul className="mt-3 grid gap-2">
            {a.missions.map(([title, due]) => (
              <li key={title} className="flex items-center justify-between gap-3 rounded-ui bg-panel px-3 py-2.5 text-sm">
                <span>{title}</span>
                <span className="text-xs text-muted">{due}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="border-t border-line px-6 py-3 text-xs text-muted">{p.sample}</figcaption>
    </figure>
  );
}

function Bubble({ children, self = false }: { children: React.ReactNode; self?: boolean }) {
  return <p className={`max-w-[80%] rounded-ui px-4 py-2.5 text-sm ${self ? "self-end bg-ink text-bg" : ""}`}>{children}</p>;
}

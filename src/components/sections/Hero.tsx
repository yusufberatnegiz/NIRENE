import Link from "next/link";
import { CheckCircle, FileText } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary, Locale } from "@/i18n";
import { brand } from "@/i18n";
import { button, container, CtaArrow, mailto } from "../ui";
import { AppWindow } from "./AppWindow";
import { Logos } from "./Logos";

export function Hero({ lang, t }: { lang: Locale; t: Dictionary }) {
  const h = t.hero;
  return (
    <section className="relative overflow-x-clip pt-16 md:pt-24">
      {/* Soft saffron light behind the product; decorative only. */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[28rem] -z-10 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px] dark:bg-accent/10" />

      <div className={`${container} grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end`}>
        <h1 className="enter font-display text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl">
          {h.title}
        </h1>
        <div className="enter enter-2 lg:pb-2">
          <p className="max-w-[44ch] text-lg leading-relaxed text-muted">{brand(h.lead)}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={mailto(brand(t.cta.mailSubject), t.cta.mailBody)} className={button.primary}>
              {t.cta.pilot}
              <CtaArrow />
            </a>
            <Link href={`/${lang}/pricing#pilot`} className={button.secondary}>
              {t.cta.howPilot}
            </Link>
          </div>
        </div>
      </div>

      <div className={`${container} enter enter-3 relative mt-14 md:mt-20`}>
        <div className="reveal-tilt origin-top rounded-frame bg-night p-2 shadow-soft sm:p-3 md:p-6 lg:p-10">
          <div className="rounded-shell bg-white/5 p-1.5 ring-1 ring-night-line">
            <AppWindow t={t} />
          </div>
        </div>

        <FloatCard className="float -left-2 top-24 xl:-left-10" icon={<CheckCircle size={20} weight="fill" className="text-accent-text" />} title={h.float1} sub={h.float1Sub} />
        <FloatCard className="float float-late -right-2 bottom-24 xl:-right-10" icon={<FileText size={20} weight="light" className="text-accent-text" />} title={h.float2} sub={h.float2Sub} />
      </div>

      <Logos label={t.logos} groups={t.logoGroups} />
    </section>
  );
}

function FloatCard({ className, icon, title, sub }: { className: string; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div aria-hidden="true" className={`absolute hidden items-center gap-3 rounded-core bg-surface py-3 pl-3 pr-5 shadow-soft ring-1 ring-line xl:flex ${className}`}>
      <span className="flex size-10 items-center justify-center rounded-ui bg-accent-tint">{icon}</span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted">{sub}</span>
      </span>
    </div>
  );
}

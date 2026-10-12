import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";

export const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

export const mailto = (subject: string) =>
  `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}`;

const pill =
  "group inline-flex items-center gap-3 whitespace-nowrap rounded-full text-sm font-semibold transition-[background-color,box-shadow,transform] duration-300 ease-premium active:scale-[0.98]";

export const button = {
  primary: `${pill} bg-accent py-2 pl-5 pr-2 text-accent-ink hover:bg-accent-hover`,
  secondary: `${pill} px-5 py-3 text-ink ring-1 ring-line hover:bg-shell hover:ring-ink/20`,
  night: `${pill} px-5 py-3 text-white ring-1 ring-night-line hover:bg-white/5`,
};

// Button-in-button trailing icon for primary CTAs.
export function CtaArrow() {
  return (
    <span className="flex size-8 items-center justify-center rounded-full bg-accent-ink/10 transition-transform duration-300 ease-premium group-hover:-translate-y-px group-hover:translate-x-0.5">
      <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
    </span>
  );
}

// Double-bezel: an outer tray with a hairline and an inner core with concentric radius.
export function Shell({ children, className = "", core = "bg-surface" }: { children: ReactNode; className?: string; core?: string }) {
  return (
    <div className={`rounded-shell bg-shell p-1.5 ring-1 ring-line ${className}`}>
      <div className={`h-full rounded-core shadow-[inset_0_1px_0_rgb(255_255_255/0.6)] ${core}`}>{children}</div>
    </div>
  );
}

export function SectionTitle({ title, lead, center = false }: { title: string; lead?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance md:text-5xl">{title}</h2>
      {lead && <p className={`mt-5 text-lg leading-relaxed text-muted ${center ? "mx-auto max-w-[56ch]" : "max-w-[56ch]"}`}>{lead}</p>}
    </div>
  );
}

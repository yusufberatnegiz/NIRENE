import Image from "next/image";
import factory from "@/assets/photos/factory.jpg";
import { site } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { container, SectionTitle, Shell } from "../ui";
import { logoHeight, shownLogos } from "./Logos";

const logo = (name: string) => shownLogos.find((l) => l.name === name && l.src);

export function Pilot({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section className="border-y border-line bg-surface">
      <div className={`${container} py-24 md:py-32`}>
        <div className="reveal">
          <SectionTitle title={t.partners.title} lead={t.partners.lead} />
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <div className="reveal relative min-h-[28rem] overflow-hidden rounded-shell ring-1 ring-line lg:col-span-5 lg:row-span-2">
            <Image src={factory} alt={t.photos.factory} placeholder="blur" fill sizes="(min-width: 1024px) 40vw, 100vw" className="parallax object-cover" />
          </div>
          <ul className="grid gap-3 sm:grid-cols-3 lg:col-span-7">
            {site.partners.map((p) => (
              <li key={p.name} className="reveal rounded-core bg-panel p-6">
                <div className="flex h-12 items-end">
                  {logo(p.name) ? (
                    <Image src={logo(p.name)!.src!} alt={p.name} width={logo(p.name)!.w} height={logo(p.name)!.h} style={{ height: logoHeight(logo(p.name)!) }} className="w-auto object-contain dark:brightness-0 dark:invert" />
                  ) : (
                    <p className="font-display text-2xl font-semibold tracking-tight">{p.name}</p>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.focus[lang]}</p>
              </li>
            ))}
          </ul>
          <Shell className="reveal lg:col-span-7" core="bg-bg">
            <div className="flex h-full flex-col p-6 sm:p-10">
              <p className="font-display text-xl font-semibold">{t.targets.title}</p>
              {t.targets.groups.map((g, gi) => (
                <div key={g} className="mt-8 first-of-type:mt-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{g}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8">
                    {t.targets.items.filter((m) => m.group === gi).map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <dt className="order-2 mt-2 text-sm leading-snug text-muted">{m.label}</dt>
                        <dd className="order-1 font-display tabular-nums text-5xl font-semibold tracking-[-0.04em] md:text-6xl">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
              <p className="mt-10 border-t border-line pt-5 text-sm text-muted">
                <span className="mr-2 rounded-full bg-accent-tint px-2.5 py-1 text-xs font-semibold text-accent-text">{t.targets.badge}</span>
                {t.targets.note}
              </p>
            </div>
          </Shell>
        </div>
      </div>
    </section>
  );
}

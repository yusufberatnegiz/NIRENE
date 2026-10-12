import Image from "next/image";
import mentor from "@/assets/photos/mentor.jpg";
import type { Dictionary } from "@/i18n";
import { container } from "../ui";

export function Problem({ t }: { t: Dictionary }) {
  return (
    <section className="border-y border-line bg-surface">
      <div className={`${container} grid gap-12 py-24 md:py-32 lg:grid-cols-[1fr_1.15fr] lg:gap-20`}>
        <div className="reveal">
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance md:text-5xl">{t.problem.title}</h2>
          <div className="mt-10 overflow-hidden rounded-shell ring-1 ring-line">
            <Image
              src={mentor}
              alt={t.photos.mentor}
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="parallax aspect-[4/3] h-auto w-full object-cover"
            />
          </div>
        </div>
        <ol className="grid content-center gap-x-10 gap-y-12 sm:grid-cols-2">
          {t.problem.items.map((item, i) => (
            <li key={item} className="reveal">
              <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-accent-tint font-display text-sm font-semibold text-accent-text">
                {i + 1}
              </span>
              <p className="mt-5 text-lg leading-relaxed text-muted">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

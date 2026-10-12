import Image from "next/image";
import desk from "@/assets/photos/desk.jpg";
import type { Dictionary } from "@/i18n";
import { brand } from "@/i18n";
import { button, container, CtaArrow, mailto } from "../ui";

export function Contact({ t }: { t: Dictionary }) {
  return (
    <section className={`${container} pb-24 md:pb-32`}>
      <div className="reveal relative isolate overflow-hidden rounded-[2.25rem] px-8 py-20 text-center text-white shadow-soft sm:px-12 md:py-32">
        <Image src={desk} alt={t.photos.desk} placeholder="blur" fill sizes="100vw" className="parallax -z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0e1525]/70 dark:bg-black/60" />
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance md:text-6xl">{t.contact.title}</h2>
        <p className="mx-auto mt-6 max-w-[56ch] text-lg leading-relaxed text-white/80">{t.contact.body}</p>
        <a href={mailto(brand(t.cta.mailSubject))} className={`${button.primary} mt-10`}>
          {t.cta.pilot}
          <CtaArrow />
        </a>
      </div>
    </section>
  );
}

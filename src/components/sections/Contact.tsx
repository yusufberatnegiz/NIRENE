import Image from "next/image";
import Link from "next/link";
import desk from "@/assets/photos/desk.jpg";
import { site } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { brand } from "@/i18n";
import { button, container, CtaArrow, mailto } from "../ui";

// Closing CTA. `agent` switches planned-agent pages to the early-access variant.
export function Contact({ lang, t, agent }: { lang: Locale; t: Dictionary; agent?: string }) {
  const c = t.contact;
  const early = Boolean(agent);
  const href = early ? mailto(brand(t.cta.earlySubject).replace("{agent}", agent!), t.cta.earlyBody) : mailto(brand(t.cta.mailSubject), t.cta.mailBody);
  return (
    <section className={`${container} pb-24 md:pb-32 [.border-y+&]:pt-24 md:[.border-y+&]:pt-32`}>
      {/* Light focus ring on the dark photo overlay (the default brown ring is too faint here). */}
      <div className="reveal relative isolate overflow-hidden rounded-frame px-8 py-20 text-center text-white shadow-soft [--focus:#f4b453] sm:px-12 md:py-32">
        <Image src={desk} alt={t.photos.desk} placeholder="blur" fill sizes="100vw" className="parallax -z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-night/80 dark:bg-black/75" />
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance md:text-6xl">{early ? c.earlyTitle : c.title}</h2>
        <p className="mx-auto mt-6 max-w-[56ch] text-lg leading-relaxed text-white/90">{early ? c.earlyBody : c.body}</p>
        <a href={href} className={`${button.primary} mt-10`}>
          {early ? t.cta.earlyAccess : t.cta.pilot}
          <CtaArrow />
        </a>
        <p className="mt-6 text-sm text-white/90">
          {c.orWrite}{" "}
          <a href={`mailto:${site.contactEmail}`} className="inline-block py-2 font-semibold underline underline-offset-4">
            {site.contactEmail}
          </a>
        </p>
        <p className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/90">
          <Link href={`/${lang}/pricing#pilot`} className="inline-block py-2 underline-offset-4 hover:underline">{c.howPilot}</Link>
          <Link href={`/${lang}/security`} className="inline-block py-2 underline-offset-4 hover:underline">{c.security}</Link>
        </p>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { brand, getDictionary, hasLocale, type Dictionary, type Locale } from "@/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Contact } from "./sections/Contact";
import { container } from "./ui";

// Shared loader for locale pages: validates the locale and returns the dictionary.
export async function loadPage(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return { lang, t: await getDictionary(lang) };
}

export async function pageMetadata(params: Promise<{ lang: string }>, path: string, pick: (t: Dictionary) => { title: string; description: string }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { title, description } = pick(await getDictionary(lang));
  return {
    title: `${title} | ${brand("{product}")}`,
    description: brand(description),
    alternates: { canonical: `/${lang}${path}`, languages: { tr: `/tr${path}`, en: `/en${path}` } },
  };
}

// Standard sub-page: header, page intro (h1 + lead), content, pilot CTA, footer.
export function PageShell(props: { lang: Locale; t: Dictionary; path: string; title: string; lead: string; children: ReactNode; contact?: boolean }) {
  const { lang, t, path, title, lead, children, contact = true } = props;
  return (
    <>
      <Header lang={lang} t={t} path={path} />
      <main id="main">
        <section className={`${container} pb-16 pt-16 md:pb-20 md:pt-24`}>
          <h1 className="enter max-w-4xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl">{title}</h1>
          <p className="enter enter-2 mt-6 max-w-[56ch] text-lg leading-relaxed text-muted">{brand(lead)}</p>
        </section>
        {children}
        {contact && <Contact lang={lang} t={t} />}
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}

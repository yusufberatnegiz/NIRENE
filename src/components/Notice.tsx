import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary, Locale } from "@/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { button, container } from "./ui";

// Shared shell for short text pages (login placeholder, privacy).
export function Notice(props: { lang: Locale; t: Dictionary; path: string; title: string; back: string; children: ReactNode }) {
  const { lang, t, path, title, back, children } = props;
  return (
    <>
      <Header lang={lang} t={t} path={path} />
      <main id="main" className={`${container} min-h-[60dvh] py-24`}>
        <div className="max-w-[60ch]">
          <h1 className="font-display text-5xl font-semibold tracking-[-0.03em] text-balance">{title}</h1>
          <div className="mt-6 grid gap-6 leading-relaxed text-muted">{children}</div>
          <Link href={`/${lang}`} className={`${button.secondary} mt-10`}>
            {back}
          </Link>
        </div>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}

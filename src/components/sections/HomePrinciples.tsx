import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";
import { brand } from "@/i18n";
import { button, container, SectionTitle } from "../ui";
import { Trust } from "./Trust";

// Home teaser for the principles page: the "does / does not" list is the strongest differentiator for HR buyers.
export function HomePrinciples({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <>
      <div className={`${container} reveal flex flex-wrap items-end justify-between gap-6 pb-12`}>
        <SectionTitle title={t.trust.title} lead={brand(t.trust.lead)} />
        <Link href={`/${lang}/principles`} className={button.secondary}>
          {t.homeTrust.more}
        </Link>
      </div>
      <Trust t={t} nested />
    </>
  );
}

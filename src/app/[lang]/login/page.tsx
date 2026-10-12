import { notFound } from "next/navigation";
import { brand, getDictionary, hasLocale } from "@/i18n";
import { Notice } from "@/components/Notice";
import { button, CtaArrow, mailto } from "@/components/ui";

// Phase 1 placeholder: collects nothing. Real invitation-only login arrives with the app (phase 2).
export default async function Login({ params }: PageProps<"/[lang]/login">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  return (
    <Notice lang={lang} t={t} path="/login" title={t.login.title} back={t.login.back}>
      <p>{brand(t.login.body)}</p>
      <a href={mailto(brand(t.cta.mailSubject))} className={`${button.primary} justify-self-start`}>
        {t.cta.pilot}
        <CtaArrow />
      </a>
    </Notice>
  );
}

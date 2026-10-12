import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n";
import { Notice } from "@/components/Notice";

export default async function Privacy({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  return (
    <Notice lang={lang} t={t} path="/privacy" title={t.privacy.title} back={t.privacy.back}>
      <p>{t.privacy.body}</p>
    </Notice>
  );
}

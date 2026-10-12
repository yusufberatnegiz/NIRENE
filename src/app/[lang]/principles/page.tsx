import { loadPage, pageMetadata, PageShell } from "@/components/Page";
import { Trust } from "@/components/sections/Trust";

export const generateMetadata = ({ params }: PageProps<"/[lang]/principles">) =>
  pageMetadata(params, "/principles", (t) => ({ title: t.trust.title, description: t.trust.lead }));

export default async function PrinciplesPage({ params }: PageProps<"/[lang]/principles">) {
  const { lang, t } = await loadPage(params);
  return (
    <PageShell lang={lang} t={t} path="/principles" title={t.trust.title} lead={t.trust.lead}>
      <Trust t={t} />
    </PageShell>
  );
}

import { loadPage, pageMetadata, PageShell } from "@/components/Page";
import { Features } from "@/components/sections/Features";

export const generateMetadata = ({ params }: PageProps<"/[lang]/platform">) =>
  pageMetadata(params, "/platform", (t) => ({ title: t.features.title, description: t.features.lead }));

export default async function PlatformPage({ params }: PageProps<"/[lang]/platform">) {
  const { lang, t } = await loadPage(params);
  return (
    <PageShell lang={lang} t={t} path="/platform" title={t.features.title} lead={t.features.lead}>
      <Features t={t} />
    </PageShell>
  );
}

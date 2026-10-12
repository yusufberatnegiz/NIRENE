import { loadPage, pageMetadata, PageShell } from "@/components/Page";
import { Pricing } from "@/components/sections/Pricing";

export const generateMetadata = ({ params }: PageProps<"/[lang]/pricing">) =>
  pageMetadata(params, "/pricing", (t) => ({ title: t.pricing.title, description: t.pricing.note }));

export default async function PricingPage({ params }: PageProps<"/[lang]/pricing">) {
  const { lang, t } = await loadPage(params);
  return (
    <PageShell lang={lang} t={t} path="/pricing" title={t.pricing.title} lead={t.pricing.note}>
      <Pricing lang={lang} t={t} />
    </PageShell>
  );
}

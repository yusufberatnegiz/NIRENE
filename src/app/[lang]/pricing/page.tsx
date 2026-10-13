import { loadPage, pageMetadata, PageShell } from "@/components/Page";
import { Faq } from "@/components/sections/Faq";
import { PilotProgram } from "@/components/sections/PilotProgram";
import { Pricing } from "@/components/sections/Pricing";

export const generateMetadata = ({ params }: PageProps<"/[lang]/pricing">) =>
  pageMetadata(params, "/pricing", (t) => ({ title: t.pricing.title, description: t.pricing.lead }));

export default async function PricingPage({ params }: PageProps<"/[lang]/pricing">) {
  const { lang, t } = await loadPage(params);
  return (
    <PageShell lang={lang} t={t} path="/pricing" title={t.pricing.title} lead={t.pricing.lead}>
      <Pricing lang={lang} t={t} />
      <PilotProgram t={t} />
      <Faq t={t} group="pilot" />
    </PageShell>
  );
}

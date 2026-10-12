import { AgentGrid } from "@/components/AgentGrid";
import { loadPage, pageMetadata, PageShell } from "@/components/Page";
import { container } from "@/components/ui";

export const generateMetadata = ({ params }: PageProps<"/[lang]/agents">) =>
  pageMetadata(params, "/agents", (t) => ({ title: t.agentsPage.title, description: t.agentsPage.lead }));

export default async function AgentsPage({ params }: PageProps<"/[lang]/agents">) {
  const { lang, t } = await loadPage(params);
  return (
    <PageShell lang={lang} t={t} path="/agents" title={t.agentsPage.title} lead={t.agentsPage.lead}>
      <div className={`${container} pb-24 md:pb-32`}>
        <AgentGrid lang={lang} t={t} />
      </div>
    </PageShell>
  );
}

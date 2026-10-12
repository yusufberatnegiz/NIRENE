import { loadPage, pageMetadata, PageShell } from "@/components/Page";
import { Team } from "@/components/sections/Team";

export const generateMetadata = ({ params }: PageProps<"/[lang]/team">) =>
  pageMetadata(params, "/team", (t) => ({ title: t.team.title, description: t.team.lead }));

export default async function TeamPage({ params }: PageProps<"/[lang]/team">) {
  const { lang, t } = await loadPage(params);
  return (
    <PageShell lang={lang} t={t} path="/team" title={t.team.title} lead={t.team.lead}>
      <Team lang={lang} />
    </PageShell>
  );
}

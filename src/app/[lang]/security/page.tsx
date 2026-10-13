import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { loadPage, pageMetadata, PageShell } from "@/components/Page";
import { Faq } from "@/components/sections/Faq";
import { container } from "@/components/ui";

export const generateMetadata = ({ params }: PageProps<"/[lang]/security">) =>
  pageMetadata(params, "/security", (t) => ({ title: t.security.title, description: t.security.lead }));

export default async function SecurityPage({ params }: PageProps<"/[lang]/security">) {
  const { lang, t } = await loadPage(params);
  const s = t.security;
  return (
    <PageShell lang={lang} t={t} path="/security" title={s.title} lead={s.lead}>
      <section className={container}>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item) => (
            <li key={item.title} className="reveal rounded-core bg-surface p-7 ring-1 ring-line">
              <ShieldCheck size={24} weight="light" aria-hidden="true" className="text-accent-text" />
              <h2 className="mt-6 font-display text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[70ch] text-sm text-muted">{s.note}</p>
      </section>
      <Faq t={t} group="data" />
    </PageShell>
  );
}

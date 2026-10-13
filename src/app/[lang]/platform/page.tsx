import { loadPage, pageMetadata, PageShell } from "@/components/Page";
import { AppWindow } from "@/components/sections/AppWindow";
import { Features } from "@/components/sections/Features";
import { container } from "@/components/ui";

export const generateMetadata = ({ params }: PageProps<"/[lang]/platform">) =>
  pageMetadata(params, "/platform", (t) => ({ title: t.features.title, description: t.features.lead }));

export default async function PlatformPage({ params }: PageProps<"/[lang]/platform">) {
  const { lang, t } = await loadPage(params);
  return (
    <PageShell lang={lang} t={t} path="/platform" title={t.features.title} lead={t.features.lead}>
      <div className={`${container} pb-16 md:pb-24`}>
        <div className="reveal-tilt origin-top rounded-frame bg-night p-2 shadow-soft sm:p-3 md:p-6 lg:p-10">
          <div className="rounded-shell bg-white/5 p-1.5 ring-1 ring-night-line">
            <AppWindow t={t} />
          </div>
        </div>
      </div>
      <Features t={t} />
    </PageShell>
  );
}

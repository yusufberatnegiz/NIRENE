import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import tr from "@/dictionaries/tr.json";
import { brand, getDictionary, hasLocale, type Dictionary, type Locale } from "@/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgentIcon } from "@/components/AgentIcon";
import { AppWindow } from "@/components/sections/AppWindow";
import { Contact } from "@/components/sections/Contact";
import { button, container, CtaArrow, mailto, Shell } from "@/components/ui";

export function generateStaticParams() {
  return tr.agents.map((a) => ({ slug: a.slug }));
}

async function load(params: PageProps<"/[lang]/agents/[slug]">["params"]) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const agent = t.agents.find((a) => a.slug === slug);
  if (!agent) notFound();
  return { lang, t, agent };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/agents/[slug]">): Promise<Metadata> {
  const { lang, agent } = await load(params);
  return {
    title: `${agent.name} | ${brand("{product}")}`,
    description: agent.tagline,
    alternates: { canonical: `/${lang}/agents/${agent.slug}`, languages: { tr: `/tr/agents/${agent.slug}`, en: `/en/agents/${agent.slug}` } },
  };
}

export default async function AgentPage({ params }: PageProps<"/[lang]/agents/[slug]">) {
  const { lang, t, agent } = await load(params);
  const p = t.agentsPage;
  const live = agent.status === "now";
  const others = t.agents.filter((a) => a.slug !== agent.slug);

  return (
    <>
      <Header lang={lang} t={t} path={`/agents/${agent.slug}`} />
      <main id="main">
        <section className={`${container} pt-12 md:pt-20`}>
          <Link href={`/${lang}/agents`} className="enter inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted ring-1 ring-line hover:text-ink">
            <ArrowLeft size={16} weight="light" aria-hidden="true" />
            {p.back}
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div className="enter">
              <div className="flex items-center gap-4">
                <span className={`flex size-14 items-center justify-center rounded-2xl ${live ? "bg-accent text-accent-ink" : "bg-panel"}`}>
                  <AgentIcon slug={agent.slug} size={28} />
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${live ? "bg-accent-tint text-accent-text" : "bg-panel text-muted"}`}>
                  {live ? p.now : p.later}
                </span>
              </div>
              <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance md:text-7xl">{agent.name}</h1>
            </div>
            <div className="enter enter-2 lg:pb-2">
              <p className="text-lg leading-relaxed text-muted">{agent.tagline}</p>
              <p className="mt-4 text-sm text-muted">{live ? p.nowNote : p.laterNote}</p>
              <a href={mailto(brand(t.cta.mailSubject))} className={`${button.primary} mt-8`}>
                {t.cta.pilot}
                <CtaArrow />
              </a>
            </div>
          </div>
        </section>

        {live && (
          <div className={`${container} enter enter-3 mt-16`}>
            <div className="reveal-tilt origin-top rounded-[2.25rem] bg-night p-2 shadow-soft sm:p-3 md:p-6 lg:p-10">
              <div className="rounded-[1.75rem] bg-white/5 p-1.5 ring-1 ring-night-line">
                <AppWindow t={t} />
              </div>
            </div>
          </div>
        )}

        <section className={`${container} py-24 md:py-32`}>
          <h2 className="reveal font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">{p.caps}</h2>
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {agent.caps.map((c, i) => (
              <Shell key={c.title} className="reveal" core={i === 0 ? "bg-accent-tint" : "bg-surface"}>
                <div className="flex h-full flex-col p-7 pt-10">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{c.body}</p>
                </div>
              </Shell>
            ))}
          </div>

          <div className="reveal mt-6 rounded-shell bg-panel p-7 sm:p-9">
            <h3 className="font-display text-xl font-semibold">{p.audience}</h3>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {agent.audience.map((item) => (
                <li key={item} className="flex gap-4 leading-relaxed">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
                    <Check size={14} weight="bold" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Others lang={lang} t={t} others={others} />
        <Contact t={t} />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}

function Others({ lang, t, others }: { lang: Locale; t: Dictionary; others: Dictionary["agents"] }) {
  return (
    <section className="border-t border-line bg-surface">
      <div className={`${container} py-24`}>
        <h2 className="reveal font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{t.agentsPage.others}</h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.slice(0, 4).map((a) => (
            <li key={a.slug} className="reveal">
              <Link href={`/${lang}/agents/${a.slug}`} className="group flex h-full flex-col rounded-core bg-bg p-5 ring-1 ring-line transition-transform duration-500 ease-premium hover:-translate-y-1">
                <span className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-panel">
                    <AgentIcon slug={a.slug} size={20} />
                  </span>
                  <ArrowUpRight size={18} weight="light" aria-hidden="true" className="text-muted transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </span>
                <span className="mt-5 font-semibold">{a.name}</span>
                <span className="mt-1 text-sm leading-relaxed text-muted">{a.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

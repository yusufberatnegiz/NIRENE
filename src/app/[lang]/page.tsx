import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Pilot } from "@/components/sections/Pilot";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { PilotProgram } from "@/components/sections/PilotProgram";
import { HomePrinciples } from "@/components/sections/HomePrinciples";
import { Contact } from "@/components/sections/Contact";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main">
        <Hero lang={lang} t={t} />
        <Problem t={t} />
        <Ecosystem lang={lang} t={t} />
        <HomePrinciples lang={lang} t={t} />
        <Pilot lang={lang} t={t} />
        <PilotProgram t={t} />
        <Contact lang={lang} t={t} />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}

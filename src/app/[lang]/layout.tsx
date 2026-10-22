import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Schibsted_Grotesk } from "next/font/google";
import { brand, getDictionary, hasLocale, locales } from "@/i18n";
import { site } from "@/config/site";
import { themeScript } from "@/components/themeScript";
import { CookieConsent } from "@/components/CookieConsent";
import "../globals.css";

const heading = Schibsted_Grotesk({ variable: "--font-heading", subsets: ["latin", "latin-ext"] });
const body = Geist({ variable: "--font-body", subsets: ["latin", "latin-ext"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: brand(t.meta.title),
    description: t.meta.description,
    alternates: { canonical: `/${lang}`, languages: { tr: "/tr", en: "/en" } },
    openGraph: { title: brand(t.meta.title), description: t.meta.description, locale: lang },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  return (
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning className={`${heading.variable} ${body.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        {children}
        <CookieConsent t={t.cookie} policyHref={`/${lang}/privacy`} />
      </body>
    </html>
  );
}

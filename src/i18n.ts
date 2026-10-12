import { site } from "@/config/site";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

const dictionaries = {
  tr: () => import("./dictionaries/tr.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["tr"]>>;

export const getDictionary = (locale: Locale) => dictionaries[locale]();

// Brand names are not final, so copy uses {product}/{project}/{company} placeholders.
export const brand = (text: string) =>
  text
    .replaceAll("{product}", site.product)
    .replaceAll("{project}", site.project)
    .replaceAll("{company}", site.company);

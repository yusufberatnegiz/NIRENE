import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";
import { brand } from "@/i18n";
import { Logo } from "./Logo";
import { container } from "./ui";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <footer className="border-t border-line">
      <div className={`${container} flex flex-col gap-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between`}>
        <Logo />
        <p>
          © {brand(t.footer.rights)}
        </p>
        <p>{t.footer.builtBy}</p>
        <Link href={`/${lang}/privacy`} className="hover:text-ink">
          {t.footer.privacy}
        </Link>
      </div>
    </footer>
  );
}

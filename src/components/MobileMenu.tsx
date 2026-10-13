"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";

type Item = { href: string; label: string; active?: boolean };

// The panel is positioned against the header pill (relative), so it stays aligned at every width.
// Below xl the primary links collapse into this menu. Below sm it also carries language, sign in and the pilot CTA.
// Closes on link click, Escape (focus returns to the button), outside pointer and focus leaving the menu.
export function MobileMenu(props: { label: string; links: Item[]; language: Item & { lang: string; name: string }; signIn: Item; cta: Item }) {
  const { label, links, language, signIn, cta } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    ref.current?.querySelector<HTMLAnchorElement>("#mobile-menu a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const close = () => setOpen(false);
  const row = "block rounded-ui px-4 py-3 text-sm font-medium transition-colors hover:bg-shell active:bg-panel";

  return (
    // relatedTarget is null when Safari taps a link (it does not focus links); taps outside are handled by pointerdown.
    <div ref={ref} className="xl:hidden" onBlur={(e) => e.relatedTarget && !e.currentTarget.contains(e.relatedTarget) && close()}>
      <button
        ref={button}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-shell active:bg-panel"
      >
        {open ? <X size={20} weight="light" aria-hidden="true" /> : <List size={20} weight="light" aria-hidden="true" />}
      </button>
      {open && (
        <nav id="mobile-menu" aria-label={label} className="absolute right-2 top-[calc(100%+0.5rem)] max-h-[calc(100dvh-5rem)] w-[min(16rem,calc(100%-1rem))] overflow-y-auto rounded-core bg-surface p-2 shadow-soft ring-1 ring-line">
          <ul className="grid">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} aria-current={l.active ? "page" : undefined} className={`${row} ${l.active ? "bg-shell" : ""}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-2 grid border-t border-line pt-2 sm:hidden">
            <li>
              <Link href={signIn.href} onClick={close} className={row}>
                {signIn.label}
              </Link>
            </li>
            <li>
              <Link href={language.href} onClick={close} hrefLang={language.lang} lang={language.lang} aria-label={language.label} className={row}>
                {language.name}
              </Link>
            </li>
          </ul>
          <a href={cta.href} onClick={close} className="mt-2 block rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover md:hidden">
            {cta.label}
          </a>
        </nav>
      )}
    </div>
  );
}

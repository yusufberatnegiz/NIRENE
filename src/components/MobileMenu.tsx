"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";

// Below lg the primary links collapse into this menu. Closes on link click, Escape and outside click.
export function MobileMenu({ label, links }: { label: string; links: readonly (readonly [string, string])[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative lg:hidden">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-shell"
      >
        {open ? <X size={20} weight="light" aria-hidden="true" /> : <List size={20} weight="light" aria-hidden="true" />}
      </button>
      {open && (
        <nav id="mobile-menu" aria-label={label} className="absolute right-0 top-12 w-60 rounded-2xl bg-surface p-2 shadow-soft ring-1 ring-line">
          <ul className="grid">
            {links.map(([href, text]) => (
              <li key={href}>
                <Link href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-shell">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

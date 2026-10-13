"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { AgentIcon } from "./AgentIcon";

type Item = { href: string; slug: string; name: string; status: string; live: boolean; current: boolean };

// Disclosure: the label navigates to /agents, the caret button toggles the panel (keyboard), hover opens it (mouse).
// Escape closes and returns focus to the caret; focus leaving the item closes it; a click on any link closes it.
export function AgentsDropdown(props: { href: string; label: string; toggleLabel: string; active: boolean; items: Item[]; className: string }) {
  const { href, label, toggleLabel, active, items, className } = props;
  const [open, setOpen] = useState(false);
  const caret = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLLIElement>(null);

  // While open: Escape anywhere closes (even if opened by hover), and a tap/click outside closes (touch tablets).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      if (root.current?.contains(document.activeElement)) caret.current?.focus();
    };
    const onPointer = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <li
      ref={root}
      className="relative flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => e.relatedTarget && !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
    >
      <Link href={href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={`${className} pr-1`}>
        {label}
      </Link>
      <button
        ref={caret}
        type="button"
        aria-label={toggleLabel}
        aria-expanded={open}
        aria-controls="agents-menu"
        // Keyboard (detail 0) and touch toggle; a mouse click right after the hover-open keeps it open.
        onClick={(e) => setOpen((v) => (e.detail === 0 || (e.nativeEvent as PointerEvent).pointerType === "touch" ? !v : true))}
        className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-shell hover:text-ink"
      >
        <CaretDown size={12} weight="bold" aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        id="agents-menu"
        className={`absolute left-1/2 top-full z-30 w-[34rem] -translate-x-1/2 pt-3 transition duration-300 ease-premium ${open ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"}`}
      >
        <ul className="grid grid-cols-2 gap-1 rounded-core bg-surface p-2 text-ink shadow-soft ring-1 ring-line">
          {items.map((a) => (
            <li key={a.slug}>
              <Link href={a.href} onClick={() => setOpen(false)} aria-current={a.current ? "page" : undefined} className={`flex items-start gap-3 rounded-ui p-3 transition-colors hover:bg-shell ${a.current ? "bg-shell" : ""}`}>
                <span className={`flex size-9 shrink-0 items-center justify-center rounded-ui ${a.live ? "bg-accent text-accent-ink" : "bg-panel"}`}>
                  <AgentIcon slug={a.slug} size={18} />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{a.name}</span>
                  <span className="block text-xs text-muted">{a.status}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

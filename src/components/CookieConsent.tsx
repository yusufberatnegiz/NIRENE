"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n";

const KEY = "cookie-consent";
const OPEN_EVENT = "cookie-preferences";
const MAX_AGE = 365 * 24 * 60 * 60 * 1000;

type Choice = { v: 1; analytics: boolean; at: string };

function readChoice(): Choice | null {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) ?? "null") as Choice | null;
    // A choice older than 12 months is asked again (Cookie Policy says 12 months).
    return c?.v === 1 && Date.now() - Date.parse(c.at) < MAX_AGE ? c : null;
  } catch {
    return null;
  }
}

// For future non-essential scripts: run them only when this returns true.
export const hasConsent = (category: "analytics") => readChoice()?.[category] === true;

export const openCookiePreferences = () => window.dispatchEvent(new Event(OPEN_EVENT));

// Non-modal panel: the page stays usable. Accept and reject have equal weight (KVKK cookie guide).
export function CookieConsent({ t, policyHref }: { t: Dictionary["cookie"]; policyHref: string }) {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const reopen = () => {
      setAnalytics(readChoice()?.analytics ?? false);
      setPrefs(true);
      setOpen(true);
    };
    // localStorage only exists in the browser, so the first check runs after hydration.
    const first = requestAnimationFrame(() => !readChoice() && setOpen(true));
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener(OPEN_EVENT, reopen);
    };
  }, []);

  const save = (value: boolean) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: 1, analytics: value, at: new Date().toISOString() } satisfies Choice));
    } catch {}
    setOpen(false);
    setPrefs(false);
  };

  if (!open) return null;
  const btn = "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";
  const primary = `${btn} bg-ink text-bg hover:bg-ink/85 active:bg-ink/75`;
  const secondary = `${btn} ring-1 ring-line hover:bg-shell active:bg-panel`;

  return (
    <section
      aria-labelledby="cookie-title"
      className="fixed inset-x-2 bottom-2 z-50 rounded-core bg-surface p-5 shadow-soft ring-1 ring-line sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[26rem] sm:p-6"
    >
      <h2 id="cookie-title" className="font-display text-lg font-semibold">{t.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {t.body}{" "}
        <Link href={policyHref} className="font-medium text-ink underline underline-offset-4">{t.policy}</Link>
      </p>

      {prefs && (
        <ul className="mt-4 grid gap-3 text-sm">
          <li className="flex items-start justify-between gap-4 rounded-ui bg-panel p-3">
            <span>
              <span className="block font-semibold">{t.necessary}</span>
              <span className="mt-0.5 block text-muted">{t.necessaryBody}</span>
            </span>
            <span className="shrink-0 text-xs font-semibold text-muted">{t.always}</span>
          </li>
          <li className="rounded-ui bg-panel p-3">
            <label className="flex cursor-pointer items-start justify-between gap-4">
              <span>
                <span className="block font-semibold">{t.analytics}</span>
                <span className="mt-0.5 block text-muted">{t.analyticsBody}</span>
              </span>
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 size-5 shrink-0 accent-[var(--accent-text)]" />
            </label>
          </li>
        </ul>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => save(true)} className={primary}>{t.accept}</button>
        <button type="button" onClick={() => save(false)} className={primary}>{t.reject}</button>
        {prefs ? (
          <button type="button" onClick={() => save(analytics)} className={`${secondary} col-span-2`}>{t.save}</button>
        ) : (
          <button type="button" onClick={() => setPrefs(true)} className={`${secondary} col-span-2`}>{t.prefs}</button>
        )}
      </div>
    </section>
  );
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className="inline-block py-2.5 text-left underline-offset-4 hover:text-ink hover:underline">
      {label}
    </button>
  );
}

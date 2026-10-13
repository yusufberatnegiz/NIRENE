"use client";

import { Moon, Sun } from "@phosphor-icons/react";

// Flips between light and dark. With no stored choice the page follows the system setting.
export function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const isDark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    const next = isDark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  // Both icons render; CSS shows the one for the current theme, so server and client markup match.
  return (
    <button type="button" onClick={toggle} className="group flex size-10 items-center justify-center rounded-full transition-colors hover:bg-shell active:bg-panel">
      <span className="dark:hidden">
        <Moon size={20} weight="light" aria-hidden="true" />
        <span className="sr-only">{toDark}</span>
      </span>
      <span className="hidden dark:inline">
        <Sun size={20} weight="light" aria-hidden="true" />
        <span className="sr-only">{toLight}</span>
      </span>
    </button>
  );
}

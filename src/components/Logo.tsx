import { site } from "@/config/site";

// Mark: two linked rings, from the double "o" in the product name.
export function Logo() {
  return (
    <span translate="no" className="inline-flex items-center gap-2 whitespace-nowrap font-display text-lg font-bold tracking-tight">
      <svg viewBox="0 0 32 20" aria-hidden="true" className="h-5 w-8 text-accent">
        <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="22" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
      {site.product}
    </span>
  );
}

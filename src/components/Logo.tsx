import { site } from "@/config/site";

// Mark: the employee at the centre, the eight agents around them.
// Dots grow clockwise from small to large: the journey from the first day to career growth.
const agents = [
  [20.00, 4.20, 0.90],
  [31.17, 8.83, 1.17],
  [35.80, 20.00, 1.44],
  [31.17, 31.17, 1.71],
  [20.00, 35.80, 1.98],
  [8.83, 31.17, 2.25],
  [4.20, 20.00, 2.52],
  [8.83, 8.83, 2.79],
];

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <circle cx="20" cy="15.6" r="4.5" fill="currentColor" />
      <path d="M12.6 28.2a7.4 7.4 0 0 1 14.8 0z" fill="currentColor" />
      {agents.map(([cx, cy, r]) => (
        <circle key={cx + cy} cx={cx} cy={cy} r={r} className="fill-accent" />
      ))}
    </svg>
  );
}

export function Logo() {
  return (
    <span translate="no" className="inline-flex items-center gap-2 whitespace-nowrap font-display text-lg font-bold tracking-tight">
      <LogoMark className="size-7" />
      {site.product}
    </span>
  );
}

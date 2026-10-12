import Image from "next/image";
import { site } from "@/config/site";
import { container } from "../ui";

// Light theme: white tiles, grayscale logos. Dark theme: dark tiles, logos inverted to light.
// On hover both themes show the original colors on a white tile.
// The square seal (ABÜ) is only inverted so its inner details survive; the rest become white silhouettes.
export function Logos({ label }: { label: string }) {
  return (
    <div className={`${container} py-16 md:py-24`}>
      <p className="reveal text-center text-sm text-muted">{label}</p>
      <ul className="reveal mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {site.logos.map((l) => (
          <li
            key={l.name}
            className="group flex h-24 items-center justify-center rounded-2xl bg-white px-6 ring-1 ring-line transition-[background-color,transform] duration-500 ease-premium hover:-translate-y-1 dark:bg-surface dark:hover:bg-white last:col-span-2 sm:last:col-span-1"
          >
            {l.src ? (
              <Image
                src={l.src}
                alt={l.name}
                width={l.w}
                height={l.h}
                className={`${l.w === l.h ? "max-h-16 dark:invert" : "max-h-12 dark:brightness-0 dark:invert"} w-auto object-contain opacity-70 grayscale transition duration-500 ease-premium group-hover:opacity-100 group-hover:grayscale-0 dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:brightness-100 dark:group-hover:invert-0`}
              />
            ) : (
              <span className="font-display text-2xl font-bold tracking-tight text-[#3b3f47] transition-colors duration-500 group-hover:text-[#0e1525] dark:text-muted dark:group-hover:text-[#0e1525]">{l.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

import Image from "next/image";
import { site } from "@/config/site";
import { container } from "../ui";

// Light theme: white tiles, grayscale logos. Dark theme: dark tiles, logos inverted to light.
// On hover both themes show the original colors on a white tile.
// The square seal (ABÜ) is only inverted so its inner details survive; the rest become white silhouettes.
export function Logos({ label, groups }: { label: string; groups: string[] }) {
  return (
    <section aria-label={label} className={`${container} py-16 md:py-24`}>
      <div className="reveal grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-6">
        {groups.map((g, i) => (
          <div key={g}>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-muted">{g}</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-3">
              {site.logos.filter((l) => l.group === i).map((l) => (
                <li
                  key={l.name}
                  className={`group flex h-20 items-center justify-center rounded-core bg-white px-3 sm:h-24 sm:px-6 ring-1 ring-line transition-[background-color,transform] duration-500 ease-premium hover:-translate-y-1 dark:bg-surface dark:hover:bg-white ${i === 0 ? "basis-[calc((100%-1.5rem)/3)]" : "basis-[calc((100%-0.75rem)/2)] sm:basis-[calc((100%-1.5rem)/3)] lg:basis-[calc((100%-0.75rem)/2)]"}`}
                >
                  <Image
                    src={l.src}
                    alt={l.name}
                    width={l.w}
                    height={l.h}
                    className={`${l.w === l.h ? "max-h-12 sm:max-h-16 dark:invert" : "max-h-10 sm:max-h-12 dark:brightness-0 dark:invert"} w-auto object-contain opacity-70 grayscale transition duration-500 ease-premium group-hover:opacity-100 group-hover:grayscale-0 dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:brightness-100 dark:group-hover:invert-0`}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

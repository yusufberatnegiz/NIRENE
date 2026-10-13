// Single source for names and structured content. Naming is not final (see MEMORY.md).
type L = { tr: string; en: string };

export const site = {
  product: "NOOVOY AI",
  project: "NİRENE",
  company: "INNOSU R&D",
  // shortcut: placeholder address, replace with the real pilot inbox before launch.
  contactEmail: "pilot@example.com",
  url: "https://example.com",

  partners: [
    { name: "AGT", focus: { tr: "Operasyonel onboarding ve İK iş yükü", en: "Operational onboarding and HR workload" } },
    { name: "DOKA", focus: { tr: "Uyum, aidiyet ve güven", en: "Adaptation, belonging and confidence" } },
    { name: "DESIRD", focus: { tr: "Role göre kişiselleştirme", en: "Role-based personalisation" } },
  ] satisfies { name: string; focus: L }[],

  // Downloaded from each organisation's own website.
  logos: [
    // group: index into the dictionary's logoGroups (0 pilot partners, 1 collaborators).
    { name: "AGT", src: "/logos/agt.svg", w: 100, h: 26, group: 0 },
    { name: "DOKA", src: "/logos/doka.png", w: 700, h: 340, group: 0 },
    { name: "DESIRD", src: "/logos/desird.png", w: 195, h: 66, group: 0 },
    { name: "Antalya OSB Teknopark", src: "/logos/aosb-teknopark.png", w: 400, h: 143, group: 1 },
    { name: "Antalya Bilim Üniversitesi", src: "/logos/abu.png", w: 800, h: 800, group: 1 },
  ],

  team: [
    { name: "Prof. Dr. Semail Ülgen", role: { tr: "Proje yürütücüsü", en: "Principal investigator" } },
    { name: "Prof. Dr. Hilal Kazan", role: { tr: "Yapay zekâ mimarisi", en: "AI architecture" } },
    { name: "Prof. Dr. Aytuğ Onan", role: { tr: "Doğal dil işleme", en: "Natural language processing" } },
    { name: "Doç. Dr. Fatih Ak", role: { tr: "Karar modelleri", en: "Decision models" } },
  ] satisfies { name: string; role: L }[],

  advisor: { name: "Doç. Dr. Aydın Çivilidağ", role: { tr: "Bilimsel danışman", en: "Scientific advisor" } },

  // Indicative prices from the competition submission; confirm before launch.
  pricing: [
    { id: "pilot", eur: 0, plus: false },
    { id: "starter", eur: 1400, plus: false },
    { id: "growth", eur: 3200, plus: false },
    { id: "enterprise", eur: 7400, plus: true },
  ],
} as const;

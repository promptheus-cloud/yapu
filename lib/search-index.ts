export interface SearchItem {
  title: string;
  snippet: string;
  href: string;
  category: string;
}

type Locale = "de" | "en";

export function buildSearchIndex(locale: Locale): SearchItem[] {
  const items: SearchItem[] = [];

  const categoryLabels = {
    de: { seite: "Seite", inhalt: "Inhalt" },
    en: { seite: "Page", inhalt: "Content" },
  };

  const cat = categoryLabels[locale];

  // Beispiel: Features durchsuchen
  try {
    const features = require(`@/content/data/${locale}/features.json`);
    for (const f of features.features) {
      items.push({
        title: f.titel,
        snippet: f.beschreibung,
        href: `/${locale}`,
        category: cat.inhalt,
      });
    }
  } catch {}

  // Beispiel: Einträge durchsuchen
  try {
    const beispiel = require(`@/content/data/${locale}/beispiel.json`);
    for (const e of beispiel.eintraege) {
      items.push({
        title: e.titel,
        snippet: e.inhalt?.substring(0, 100) || "",
        href: `/${locale}/beispiel`,
        category: cat.seite,
      });
    }
  } catch {}

  return items;
}

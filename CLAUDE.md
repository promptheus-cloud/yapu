# Webstack — Projektname

Webseite fuer FIRMENNAME — kurze Beschreibung.

**Live:** https://DOMAIN

## Tech-Stack

- **Framework:** Next.js 16 (App Router, SSG)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS v4 (kein tailwind.config — alles in `globals.css` via `@theme inline {}`)
- **UI-Komponenten:** shadcn/ui (Radix-basiert, `data-slot` Attribute)
- **i18n:** next-intl (DE default, EN), Middleware-basiertes Routing (`/de/...`, `/en/...`)
- **Suche:** Fuse.js (client-side Fuzzy Search, Ctrl+K)
- **Theming:** next-themes (Light/Dark)
- **Icons:** lucide-react

## Seiten

| Route | Inhalt |
|-------|--------|
| `/` | Startseite |
| `/beispiel` | Beispiel-Unterseite |

Alle Routen sind locale-prefixed: `/de/...`, `/en/...`

## Dateistruktur

```
app/
  globals.css              — Farben, Themes, Design-Preset (geschichtet)
  layout.tsx               — Root-Layout (globals.css Import)
  [locale]/
    layout.tsx             — Locale-Layout (Fonts, ThemeProvider, Navigation, Footer)
    page.tsx               — Startseite
    beispiel/page.tsx      — Beispiel-Unterseite

components/
  Navigation.tsx           — Sticky Header, Desktop/Mobile, Search, Theme-Toggle, Language-Switcher
  Footer.tsx               — Footer mit Links + Kontakt
  Hero.tsx                 — Hero-Banner (Props: titel, untertitel, ctaText, ctaHref, badge, image)
  ContentCard.tsx          — Aufklappbare Card mit Datum
  SearchDialog.tsx         — Ctrl+K Suchfenster (Fuse.js)
  ThemeProvider.tsx         — next-themes Wrapper
  ui/                      — shadcn/ui Basis-Komponenten (button, card, dialog)

content/
  data/de/                 — Deutsche Inhalts-JSONs
  data/en/                 — Englische Inhalts-JSONs
  data/shared/             — Sprachunabhaengige Daten

messages/
  de.json                  — next-intl UI-Strings (Deutsch)
  en.json                  — next-intl UI-Strings (Englisch)

i18n/
  routing.ts               — Locale-Konfiguration (de, en)
  navigation.ts            — Typisierte Navigation-Helpers
  request.ts               — Server-seitige Locale-Aufloesung

lib/
  content.ts               — loadContent<T>(file, locale) / loadSharedContent<T>(file)
  search-index.ts          — buildSearchIndex(locale) fuer Fuse.js
  utils.ts                 — cn() (clsx + tailwind-merge)

server/                    — Server-Setup-Templates (nicht im Build)
  deploy.sh                — Deploy-Script (git pull, npm ci, build, pm2 restart)
  nginx.conf.template      — Nginx-Config (Platzhalter: DOMAIN, PORT)
  ecosystem.config.js      — PM2-Konfiguration
  setup.sh                 — Server-Ersteinrichtung
```

## Content-Architektur

Inhalt lebt in **JSON-Dateien** unter `content/data/`, nicht in Markdown oder CMS.

- `loadContent<T>("features", "de")` → laedt `content/data/de/features.json`
- `loadSharedContent<T>("placeholder")` → laedt `content/data/shared/placeholder.json`
- Fallback: wenn EN-Datei fehlt, wird DE geladen
- Alle Seiten sind statisch generiert (SSG via `generateStaticParams`)

### UI-Strings vs. Content

- **`messages/de.json` / `en.json`**: UI-Strings (Titel, Labels, Buttons, Placeholders)
  - Zugriff: `useTranslations("namespace")` (Client) oder `getTranslations()` (Server)
- **`content/data/`**: Strukturierte Inhalte (Features, Eintraege, etc.)
  - Zugriff: `loadContent<Type>("filename", locale)`

## CSS-Architektur (globals.css)

Die CSS ist in 6 Schichten aufgebaut:

```
1. Tailwind Imports + @theme inline {}     — bleibt immer
2. Farbpalette (:root / .dark)             — wird pro Projekt angepasst (OKLCH)
3. Base Styles (body, typo)                — bleibt immer
4. Design-Preset: Glassmorphism            — AUSTAUSCHBAR (klar markierter Block)
5. Component Styles                        — projektspezifisch
6. Utilities + Animationen                 — optional
```

**Schicht 4 ist der austauschbare Block.** Fuer einen anderen Look (Flat, Brutalist, etc.) nur diesen Block ersetzen.

### Farben anpassen

In `globals.css` unter `:root` und `.dark` die OKLCH-Werte aendern:
- `--primary` — Hauptfarbe
- `--accent` — CTA/Aktionsfarbe
- `--brand` — Markenfarbe (optional)
- Alle anderen Farben leiten sich davon ab

## Theming

- `next-themes` mit `attribute="class"` auf `<html>`
- `defaultTheme="system"`, `enableSystem`
- Toggle: Moon/Sun Icon in Navigation
- CSS: `:root` (Light) und `.dark` (Dark) in `globals.css`

## Server & Deployment

| | |
|---|---|
| **Server** | IP_ADRESSE |
| **SSH** | `ssh root@IP_ADRESSE` |
| **App-Pfad** | `/home/APP_NAME/` |
| **Port** | PORT (Next.js) |
| **Process Manager** | PM2 (`pm2 restart APP_NAME`) |
| **Reverse Proxy** | nginx (Port 80/443 → PORT) |
| **Deploy-Script** | `server/deploy.sh` |

### Deployment

```bash
ssh root@IP_ADRESSE "APP_DIR=/home/APP_NAME /home/APP_NAME/server/deploy.sh"
```

### Ersteinrichtung

1. `server/setup.sh` auf dem VPS ausfuehren
2. Repo klonen nach `/home/APP_NAME/`
3. `server/nginx.conf.template` → `/etc/nginx/sites-available/APP_NAME` (Platzhalter fuellen)
4. `ln -s /etc/nginx/sites-available/APP_NAME /etc/nginx/sites-enabled/`
5. `certbot --nginx -d DOMAIN`
6. `cd /home/APP_NAME && npm ci && npm run build`
7. `pm2 start server/ecosystem.config.js && pm2 save`

## Konventionen

- **Farben:** OKLCH-Farbraum, CSS Custom Properties
- **Tailwind v4:** Konfiguration in `globals.css` via `@theme inline {}`
- **shadcn/ui:** Komponenten in `components/ui/`, Styling ueber `data-slot` Attribute
- **Neue Seite:** `app/[locale]/routenname/page.tsx` + Content-JSON in `content/data/de/` + `en/` + UI-Strings in `messages/*.json`
- **Neue Komponente:** In `components/`, Client Components mit `"use client"` Direktive
- **Neuer Content:** JSON in `content/data/{locale}/`, Typ-Interface inline oder in der Page-Datei

# Webstack

Modularer Webseiten-Baukasten. Next.js 16 + TypeScript + Tailwind CSS v4 + Glassmorphism.

## Quick Start

```bash
git clone https://github.com/Marlin-hi/webstack.git mein-projekt
cd mein-projekt
npm install
npm run dev
```

Oeffne http://localhost:3000

## Anpassen

### 1. Farben (`app/globals.css`)

Unter `:root` und `.dark` die OKLCH-Werte aendern:

```css
:root {
  --primary: oklch(0.55 0.18 230);   /* Hauptfarbe — Hue aendern */
  --accent: oklch(0.48 0.20 250);    /* CTA-Farbe */
  --brand: oklch(0.55 0.16 160);     /* Markenfarbe */
}
```

### 2. Inhalte (`content/data/`)

JSON-Dateien pro Sprache:
- `content/data/de/` — Deutsch
- `content/data/en/` — Englisch
- `content/data/shared/` — Sprachunabhaengig

### 3. UI-Strings (`messages/`)

- `messages/de.json` — Deutsche UI-Texte
- `messages/en.json` — Englische UI-Texte

### 4. Navigation (`content/data/{locale}/navigation.json`)

### 5. Seiten hinzufuegen

Neue Datei: `app/[locale]/meine-seite/page.tsx`

## Design-Preset wechseln

In `globals.css` ist der Glassmorphism-Block klar markiert (Layer 4). Fuer einen anderen Look diesen Block ersetzen.

## Deployment

Templates in `server/`:
- `setup.sh` — Server-Ersteinrichtung (Node, PM2, nginx, certbot)
- `deploy.sh` — Deploy-Script (git pull, build, pm2 restart)
- `nginx.conf.template` — Platzhalter: `{{DOMAIN}}`, `{{PORT}}`
- `ecosystem.config.js` — PM2-Config: `{{APP_NAME}}`, `{{PORT}}`

## Stack

| Was | Womit |
|-----|-------|
| Framework | Next.js 16 (App Router, SSG) |
| Sprache | TypeScript |
| Styling | Tailwind CSS v4 |
| Komponenten | shadcn/ui |
| i18n | next-intl (DE/EN) |
| Theming | next-themes (Light/Dark) |
| Suche | Fuse.js (Ctrl+K) |
| Icons | lucide-react |
| Farben | OKLCH |

## Lizenz

Privat.

# YAPU Solutions — Pitch Website

Proaktiver Website-Pitch fuer YAPU Solutions (Social-FinTech, Berlin). Dreisprachige Single-Page-Website (EN/ES/FR) auf dem Webstack-Template.

**Live:** https://yapu.promptheus.cloud

## Tech-Stack

- **Framework:** Next.js 16 (App Router, SSG)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS v4 (kein tailwind.config — alles in `globals.css` via `@theme inline {}`)
- **UI-Komponenten:** shadcn/ui (Radix-basiert, `data-slot` Attribute)
- **i18n:** next-intl (EN default, ES, FR), Middleware-basiertes Routing (`/en/...`, `/es/...`, `/fr/...`)
- **Theming:** next-themes (Light/Dark, default: Light)
- **Icons:** lucide-react
- **Font:** Inter

## Seiten

Single-Page mit Anchor-Sektionen:

| Section ID | Komponente | Inhalt |
|-----------|-----------|--------|
| (Hero) | inline in page.tsx | Tagline, CTA |
| `#impact` | ImpactNumbers.tsx | 4 Kennzahlen |
| `#solutions` | Solutions.tsx | 3 Service-Cards |
| (Partners) | Partners.tsx | Trusted-By Logos |
| (How It Works) | HowItWorks.tsx | 3-Schritt-Prozess |
| (Testimonial) | Testimonial.tsx | Zitat |
| `#about` | inline in page.tsx | Team/Standorte |
| `#contact` | ContactCTA.tsx | CTA |

## Content-Architektur

- `messages/{en,es,fr}.json` — UI-Strings (next-intl)
- `content/data/{en,es,fr}/` — Strukturierte Inhalte (JSON)
- `content/data/shared/partners.json` — Sprachunabhaengig
- Fallback: wenn Locale-Datei fehlt, wird EN geladen

## CSS-Architektur (globals.css)

```
1. Tailwind Imports + @theme inline     — Font: Inter
2. Farbpalette (:root / .dark)          — YAPU Teal (Hue 180-195)
3. Base Styles                          — scroll-behavior: smooth
4. Design-Preset: YAPU Glassmorphism    — Teal-Gradienten, Glassmorphism-Cards
5. Component Styles                     — section-padding, scroll-margin-top
6. Utilities + Animationen              — float-up
```

## Server & Deployment

| | |
|---|---|
| **Server** | 187.77.66.133 (Hostinger VPS, shared with Mobile-Mika) |
| **SSH** | `ssh root@187.77.66.133` |
| **App-Pfad** | `/home/yapu/` |
| **Port** | 3002 (Next.js) |
| **Service** | `yapu.service` (systemd) |
| **Reverse Proxy** | nginx -> Port 3002 |
| **Domain** | yapu.promptheus.cloud |
| **Repo** | github.com/promptheus-cloud/yapu (public) |

### Deployment

```bash
ssh root@187.77.66.133 "cd /home/yapu && git pull && npm ci && npm run build && systemctl restart yapu"
```

## Konventionen

- **Farben:** OKLCH-Farbraum, CSS Custom Properties
- **Tailwind v4:** Konfiguration in `globals.css` via `@theme inline {}`
- **Neuer Content:** JSON in `content/data/{locale}/`, Messages in `messages/{locale}.json`

# Migrate engineering-portfolio into Laravel Inertia

## Goal

Consolidate the standalone `engineering-portfolio/` React app into the main Laravel Inertia project as a single Inertia page. Delete the standalone app afterward.

## Approach

Single Inertia page. One route (`GET /`), one page component, four shared components. No new abstractions.

## File Structure

```
resources/js/
  pages/
    portfolio.tsx          ← replaces welcome.tsx (renamed from App.tsx)
  components/
    Navbar.tsx             ← from engineering-portfolio, unchanged
    Terminal.tsx           ← from engineering-portfolio, unchanged
    ContactModal.tsx       ← from engineering-portfolio, unchanged
    ProjectModal.tsx       ← from engineering-portfolio, unchanged
  data.ts                  ← portfolio content constants (HERO_DATA, ABOUT_DATA, etc.)
  types/
    portfolio.ts           ← Project, ExperienceItem, TechStackItem, LogMessage interfaces
    auth.ts                ← existing, unchanged
    index.ts               ← re-export both auth and portfolio types
    global.d.ts            ← existing, unchanged
    vite-env.d.ts          ← existing, unchanged
  lib/
    utils.ts               ← existing cn(), unchanged
  app.tsx                  ← existing, unchanged
  wayfinder/               ← existing, unchanged
  routes/                  ← existing, unchanged
  actions/                 ← existing, unchanged

resources/css/
  app.css                  ← add JetBrains Mono font + brutalist styles + color tokens

routes/web.php             ← change 'welcome' to 'portfolio' in Route::inertia
vite.config.ts             ← unchanged
tsconfig.json              ← unchanged
package.json               ← add lucide-react
```

## Page Component (`portfolio.tsx`)

- Default export function `App()` (name kept as-is per user preference)
- Add `Head` from `@inertiajs/react` for page title
- Remove `createRoot` / `StrictMode` — Inertia handles mounting
- State management identical to original: `activeSection`, `isTerminalOpen`, `isContactOpen`, `selectedProject`
- IntersectionObserver identical — detects active section from scroll
- All 5 sections inline: Hero, About, Experience, Stack, Projects + Footer
- Overlays (Terminal, ContactModal, ProjectModal) rendered at bottom of component

## Components

All four components port as-is with zero changes:

- **Navbar.tsx** — sticky nav with section anchor links, mobile hamburger drawer, scroll-based active section highlighting
- **Terminal.tsx** — floating terminal overlay, command parsing, history, fullscreen toggle
- **ContactModal.tsx** — visual-only contact form simulation (fake encryption handshake, no API)
- **ProjectModal.tsx** — project detail overlay with image, tags, description, links

## Styles

Merge into `resources/css/app.css`:

- **JetBrains Mono** — Google Fonts `@import`, override `--font-sans` and `--font-mono` in `@theme`
- **Color tokens** — `--color-background: #09090B`, `--color-surface: #18181B`, `--color-outline-variant: #3F3F46`, `--color-on-surface-variant: #c4c7c8` in `@theme`
- **Brutalist utilities** — `.brutalist-btn`, `.brutalist-border`, `.bg-grid`, `.timeline-line`, `.mono-bracket` as CSS classes
- **Custom scrollbar** — webkit scrollbar styles

Existing Tailwind config (`@import 'tailwindcss'`, `@source`, Instrument Sans) stays. JetBrains Mono overrides the font.

## Data & Types

- `resources/js/data.ts` — moved from `engineering-portfolio/src/data.ts`, all constants unchanged
- `resources/js/types/portfolio.ts` — 4 interfaces: `Project`, `ExperienceItem`, `TechStackItem`, `LogMessage`
- `resources/js/types/index.ts` — add `export type * from './portfolio'` alongside existing auth re-export

## Route

`routes/web.php` — change `Route::inertia('/', 'welcome')` to `Route::inertia('/', 'portfolio')`.

## Dependencies

- Add: `lucide-react` (only live dependency from engineering-portfolio)
- Remove: `engineering-portfolio/` directory (contains dead deps: `@google/genai`, `motion`, `express`, `dotenv` — none imported in source)

## Cleanup

1. Delete `engineering-portfolio/` directory
2. Delete `resources/js/pages/welcome.tsx`
3. Run `pnpm install` to sync dependencies

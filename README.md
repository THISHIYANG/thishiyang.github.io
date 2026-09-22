# THISHI — Homepage v0.3

A deliberately minimal Astro + TypeScript hero. Work stays on `rebuild/thishi-v3`; production main and Pages settings are unchanged.

## Local preview

Node.js 22.12+ and pnpm 11:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:4321. `pnpm build` checks types and generates `dist/`; `pnpm preview` serves that output.

## Structure and scope

- `src/components/LetterHero.astro`: isolated full-viewport hero and revealed text.
- `src/components/LetterNav.astro`: six semantic letter buttons, without visible category labels or grid framing.
- `src/components/SiteHeader.astro`: small maker mark and quiet language/appearance controls.
- `src/content/worlds.ts`: the six supplied personal statements; stable IDs reserve future scene destinations.
- `src/scripts/home.ts`: proximity, focus, selection, language and appearance state.
- `src/styles/global.css`: desktop composition, mobile two-row arrangement and reduced motion.
- `src/layouts/BaseLayout.astro`: document metadata and font imports.
- `src/pages/index.astro`: header, hero and scroll cue only.

No footer, cards, projects, Six Worlds section or physics. The scroll cue is a visual placeholder; no content section is built below it in this phase.

## Behavior

Desktop proximity within 86px reveals one letter's statement. The active letter scales to 1.06, lifts 5px and moves subtly with the pointer; other letters become light grey. Tab reveals the same information with a visible focus outline. Click selects; another click toggles selection. Escape or tapping empty space clears selection. Pointer exit restores any selected or keyboard-focused letter, otherwise the quiet default.

Mobile uses a 2 × 3 arrangement and 80–92px letters. First tap reveals a statement, tapping it again clears selection. Scene navigation is intentionally deferred. Appearance controls are hidden on mobile. Desktop FIELD retains palette switching only.

Reduced motion removes all letter translation and scaling while retaining a simple color fade.

## Typography

The main word and body now use neutral system Arial / Helvetica with a sans-serif fallback. No system font binaries are distributed. IBM Plex Mono and Noto Sans SC remain self-hosted OFL Fontsource dependencies; their license texts are included in `public/fonts`. Syne is no longer imported by the page; its existing dependency and license are retained for possible later use, without loading it.

## Verification

Astro check and production build pass without errors or warnings. Browser checks cover 1440 × 900 desktop proportions (word approximately 619px wide), default and INTEREST screenshots, hover reset, Tab focus, Escape, mobile selection/reset, Chinese copy, reduced motion and horizontal overflow at 320–1536px widths. Visual reference images were not attached to this correction request; implementation follows the supplied written dimensions and behavior.

Stop here for visual review before adding any other sections.

## v0.3 correction

Default background is pure white (#FFFFFF). Each `.hero-letter` owns its button and unique copy panel, linked by aria-controls/aria-describedby. Desktop panels are absolutely positioned at 50% of their own wrapper and translated by half their width, with left-aligned text. Six independent panels fade locally over 150ms. No global changing tooltip exists.

On mobile the six panels retain their own DOM ownership but appear below the complete matrix to avoid covering the lower row. Column-based positioning is clamped to a readable 260px width within the matrix; the selected glyph remains the visual anchor. Pointer exit clears mouse selection; keyboard focus and touch remain supported.

Verified all six desktop panel centers against their owning buttons, unchanged wordmark bounds across all states, pure-white body background, keyboard behavior and pointer exit. All six mobile states fit at 320px and 390px without horizontal overflow. No layout shift was found. No new sections were added.


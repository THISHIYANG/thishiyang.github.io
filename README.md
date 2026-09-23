# THISHI — Independent Creator

Astro + TypeScript source project on `rebuild/thishi-v3`. The current review is **Commit 01: T identity + H1 journey**, desktop only. Main and production are unchanged.

## Run locally

```sh
pnpm install
pnpm dev --host 127.0.0.1
pnpm check
pnpm build
pnpm preview --host 127.0.0.1
```

Open http://127.0.0.1:4321/. The preview command serves the last production build.

## Current review scope

The homepage retains its existing wordmark, header, white background, caption alignment and mobile fallback. Only T and H1 mount interactive artifacts. Previous scene, other artifact and DOT pointer files are retained as dormant scaffolding; the homepage does not mount or initialize them. No further scene content or mobile interaction is part of this review.

- `src/components/worlds/CreatorIdentity.astro` tokenizes the current `worlds.ts` copy, preserving its line breaks. Each identity has a button and its own 44 × 56 numbered empty portrait proof. The frames are positioned in a shared gutter, do not reflow the text, and only one is active at a time.
- `src/content/journey.ts` contains the ordered route and editable city, role, school, degree and mapType fields.
- `src/components/worlds/JourneyMap.astro` renders five semantic location buttons, a folded SVG route and five original schematic geographic studies. Its map paths are hand-authored SVG, not traced or embedded screenshots and not exact cartography.
- `src/components/LetterNav.astro` owns the six letters and mounts the two components.
- `src/scripts/home.ts` handles world ownership, keyboard focus, portrait ownership, language and display controls.
- `src/styles/worlds.css` contains desktop-only presentation and choreography. `global.css` and hero geometry are unchanged.
- `src/pages/index.astro` mounts the current homepage without the previous transition or pointer system.

## Interaction and accessibility

Letter, vertical rule, caption and artifact form a continuous pointer region. Portraits remain active while crossing their adjacent gap. Keyboard focus reveals the same content; hidden world panels are inert. Identity buttons support Enter/Space as well as hover and focus. Journey buttons expose complete city and education labels to assistive technology.

Journey nodes appear at 0/120/240/360/480ms; connecting strokes start at 60/180/300/420ms. Contours follow their node by 40ms. Reduced motion removes route choreography and portrait translation while preserving opacity state changes. The existing mobile fallback is retained; both new desktop components are hidden there.

## Review boundary

Validate at 1440 × 900 and 1536 × 960. Run `pnpm check` and `pnpm build` before committing. Do not merge to main or deploy. Stop for visual approval before implementing I1, S, H2 or I2.

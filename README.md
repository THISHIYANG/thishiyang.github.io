# THISHI — Independent Creator

Astro + TypeScript source project on `rebuild/thishi-v3`. The current review is **Commit 02: typography + portfolio folder + social carousel**, desktop only. Main and production are unchanged.

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

The homepage retains its existing wordmark, header, white background, caption alignment and mobile fallback. T, H1, I1 and S mount interactive artifacts. Previous scene, remaining artifact and DOT pointer files are retained as dormant scaffolding; the homepage does not mount or initialize them. No further scene content or mobile interaction is part of this review.

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

## Commit 02 — readability, portfolio and social

The current review adds desktop supporting typography at 28–30px for body copy, 14px for section labels, 12px for city names, 11px for school names and 9px for degree text. Header typography increases modestly. Hero glyph geometry and mobile styles are unchanged; T/H1 keep their existing interaction model.

New files:
- `src/components/worlds/PortfolioFolder.astro`
- `src/components/worlds/SocialCarousel.astro`
- `src/content/portfolio.ts`
- `src/content/socials.ts`
- `src/scripts/portfolio-folder.ts`
- `src/scripts/social-carousel.ts`

`LetterNav.astro` mounts the new components and `worlds.css` supplies their desktop styles. The unused old `SocialArtifact.astro` stack, including TikTok, has been removed.

Portfolio uses bounded extraction progress, five staggered CSS transforms and numbered semantic buttons. Wheel up extracts, wheel down returns; vertical pointer movement also adjusts extraction. Only wheel input that changes extraction is consumed, only within the artifact. Arrow up/down and Home/End provide keyboard control; focusing a sheet exposes the full stack. Future images and destinations live in `portfolio.ts`, separate from animation logic.

Social uses eight data-driven cards and a CSS perspective orbit, without WebGL or animation dependencies. Five cards are visible at a time, with independently reachable transformed hit areas. Moving onto a side card selects it after a brief dwell; wheel down/right advances, up/left reverses. Selection wraps in both directions. Roving keyboard focus uses left/right arrows, with Enter invoking a destination once its currently-null href is supplied. Status is announced through a polite live region. Each card has a dedicated `.social-card-media` container for future images.

Reduced motion disables extraction transitions and replaces animated perspective with immediate planar selection. Tests cover 1440×900, 1536×960 and 1920×1080: reverse extraction, five keyboard-accessible sheets, all visible carousel hit areas, wraparound, wheel ownership, stable hero bounds and reduced motion. `pnpm check` and `pnpm build` pass. H2/I2, DOT, scene transitions, real images, mobile redesign and production remain outside this commit. Stop for visual review.


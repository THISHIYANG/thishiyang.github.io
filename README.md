# THISHI — Desktop Interaction System V1

Astro + TypeScript, static output. Development branch: `rebuild/thishi-v3`. The approved pure-white hero remains the default view; this increment adds desktop objects, scene-entry prototypes, and one global DOT pointer.

## Run locally

Use Node.js 22.12+ and pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:4321. `pnpm build` runs Astro/TypeScript checks and generates `dist/`. `pnpm preview` serves the build.

## Six interactions

| Letter | Object | Destination |
| --- | --- | --- |
| T | Silver-filled, black-outline identity keywords | /about |
| H₁ | Fuping / Shaanxi ↔ Shanghai markers and line | /place |
| I₁ | Flat silver folder with three paper sheets | /work |
| S | Five loose social notes | /social |
| H₂ | Three monochrome placeholder photo frames | /life |
| I₂ | Three tabbed catalogue cards | /archive |

All destinations are empty SceneShell prototypes with shared typography, metadata, header and letter navigation. No project content, personal photos, coordinates or external social accounts have been invented. Social cards currently open the Social shell; connect their real external destinations in a later content pass.

## Source map

- `src/components/Experience.astro`: persistent header, homepage, scene shell and transition layer.
- `src/components/LetterNav.astro`: each glyph owns its annotation and object.
- `IdentityKeywords`, `PlaceArtifact`, `FolderArtifact`, `SocialArtifact`, `PhotoArtifact`, `ArchiveArtifact`: separate object implementations.
- `SceneShell.astro`: minimal shared destination view.
- `DotPointer.astro`: single SVG cursor overlay, hidden from accessibility APIs.
- `src/content/worlds.ts`: existing statements and stable letter IDs.
- `src/content/scenes.ts`: route/letter/object mapping. Internal IDs `work`, `games`, `ideas` retain their original identities; their routes are explicitly mapped to `/place`, `/work`, `/archive`.
- `src/scripts/home.ts`: hover/focus/tap state, shared glyph-to-object region, language, appearance and optical caption anchoring.
- `src/scripts/transitions.ts`: navigation lifecycle, scene state, history, focus and Web Animations choreography.
- `src/scripts/pointer.ts`: global idle/active/loading pointer state and fallback handling.
- `src/styles/global.css`: approved base composition and unchanged mobile styles.
- `src/styles/worlds.css`, `scenes.css`, `pointer.css`: new desktop layer.
- `src/pages/[scene].astro`: statically generates all six direct-entry routes; no server adapter or React runtime.

## State and motion

The active world comes from keyboard focus, pointer ownership, or selection. Its interaction region includes glyph, the gap to the annotation, copy and object; it remains active as the pointer travels downward. Hidden panels are inert so Tab cannot enter invisible objects. Desktop glyph clicks and object links enter scenes; the existing mobile tap behavior is retained and all new objects are hidden on narrow screens.

Reveals: letter immediately, rule at 40ms, copy at 80ms, object at 140ms. Object movement uses 160–320ms transitions with `cubic-bezier(.22,.61,.36,1)`; location markers finish at about 400ms. Cards rotate no more than 3 degrees.

Scene entry freezes the world and rejects duplicate navigation, fades inactive letters/copy, performs the object's signature gesture, and expands its letter, seam, sheet, note, photo or index surface. Total durations are 580ms (T), 600ms (place), and 620ms (the other four). The archive border becomes the shell frame. Navigation updates the address and page title, focuses the destination heading, and restores normal cursor state. Browser back/forward work; Escape cancels an in-flight transition. Empty shells are already available in the document so no artificial loading or network dependency is introduced. Direct URLs also work as static pages.

## DOT pointer

One 18px SVG overlay: outlined idle ring, filled interactive dot, or dashed transition ring. Fill changes over 140ms; loading rotation takes 1100ms. Very short interpolation (0.82 per frame) settles quickly, with no trailing copies or perpetual idle animation loop. Native cursor is hidden only after a valid overlay frame renders. Touch/coarse pointers, inactive windows and editable controls retain native cursor behavior. Pointer events pass through the overlay and text selection is preserved. The pointer uses the existing foreground color for contrast in FIELD mode.

## Accessibility and fallback

Semantic buttons/links support Tab, Enter and Space. Focus activates the same world as hover. Hidden annotations are inert, headings receive focus after navigation, and current scene links use aria-current. Reduced motion removes object choreography, translation, scale and cursor smoothing/spin; routes change immediately. Native pointer remains available if the custom overlay is unsupported or cannot render. The static scene routes remain navigable without client-side transition support.

## Verification

Astro check: zero errors, warnings or hints. Production build: seven static pages. Browser verification covered all six object entries and all six letter entries, cursor idle/active/loading/restoration, Tab-to-folder and Space entry, Escape cancellation, back/forward and scene-to-scene navigation, Chinese and FIELD controls, direct scene loads with JavaScript disabled, reduced-motion entry, native cursor over form controls, and unchanged narrow-screen tap behavior. Default, object, scene and intermediate-transition screenshots were reviewed. Desktop widths 1024, 1280, 1440 and 1536 were checked for overflow; narrow-screen regression used 390px.

## Deployment boundary

No merge to main, no deployment workflow, and no Pages setting changes. Old generated assets remain preserved in main/history. Fontsource OFL licenses remain in `public/fonts`; no proprietary font binaries are committed. This is an interaction prototype, not the completed site. Stop for visual review before building scene content or mobile interactions.

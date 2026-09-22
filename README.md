# THISHI — Independent Creator

Homepage v0.1. A new Astro + TypeScript source project on `rebuild/thishi-v3`, based on main commit `7865b5d3e3101318baea31e8a0014eafff759fb3`.

## Local development

Use Node.js 22.12+ and pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

Open the local URL printed by Astro (normally http://localhost:4321). `build` runs Astro/TypeScript checks before producing static output in `dist/`.

## Structure

```text
src/
  components/   SiteHeader and LetterNav
  content/      typed six-world definitions (no old content migrated)
  layouts/      BaseLayout, document metadata and fonts
  pages/        index.astro
  scripts/      progressive homepage interactions
  styles/       palette, typography, responsive layout and motion rules
public/         original SVG favicon; future public assets
```

## Scope

- Warm paper / ink, oversized six-letter wordmark, identity and footer.
- Each letter has a stable scene ID: About / Work / Games / Social / Life / Ideas. Hover/focus previews; click, Enter, Space or tap selects; Escape clears. These are previews, not links to nonexistent pages.
- EN / 中 translates supporting copy and scene labels, and changes document language.
- INDEX / FIELD changes the palette. FIELD is a visual preview only: no physics or cards yet.
- Semantic landmarks, skip link, accessible button names and pressed states, visible focus, reduced motion, responsive layout.
- No React runtime needed at this stage. Add islands only when interaction complexity requires them.

## Fonts

Syne 800, IBM Plex Mono 400 and Noto Sans SC 400 are self-hosted through pinned Fontsource dependencies. All three families use SIL Open Font License 1.1; the packages include their license files. No proprietary font files are checked in. Chinese webfont subsets are emitted by the build and downloaded only as required by characters.

## Deployment boundary

This branch replaces the legacy generated files with a source tree. The old site and all old assets remain intact on `main` and in Git history. No old content is migrated. No deployment workflow is installed and no Pages settings are changed. Do not merge this branch or change the Pages source during visual review. `dist/` is generated and never committed.

Future publishing is a separate step: confirm the actual Pages source and custom domain, review the finished site, then configure an Astro static build deployment and replace the live version deliberately.

## Next review

Approve homepage scale, spacing, mobile proportions and letter feedback first. Then build the six scenes and card system, implement real FIELD interactions, and migrate selected original content.

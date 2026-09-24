# THISHI — Independent Creator

Personal website built with Astro and TypeScript, published at https://thishiyang.github.io/.

## Local development

Use Node.js 22.12+ and pnpm 11.19.0 (pinned in package.json).

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
pnpm preview
```

Open http://localhost:4321/. Preview serves the production build from dist/.

## Source structure

- src/components/worlds/: Creator Identity, Journey Map, Portfolio Folder, Social Carousel, Life Album and Archive Cabinet.
- src/components/cursor/, transition/, scene/: DOT pointer, signature transitions and destination shells.
- src/content/: editable typed content and route definitions.
- src/layouts/, pages/: document layout and seven statically generated routes.
- src/scripts/, styles/: interactions, accessible navigation and responsive styling.
- public/: current favicon and OFL licenses for the two fonts bundled from Fontsource. Font license links are included in the document head.

Routes: /, /about, /journey, /work, /social, /life, /archive.

The six worlds retain their individual hover/focus behavior and transitions. Semantic controls, keyboard focus, reduced motion, touch fallback and direct route entry are supported. Destination content and media remain intentional placeholders.

IBM Plex Mono and Noto Sans SC are bundled locally under the SIL Open Font License. Display text uses the system Arial/Helvetica stack. No external font request is required.

## Automatic deployment

.github/workflows/deploy.yml installs locked dependencies, checks and builds Astro on Node.js 22, uploads dist/, and deploys it to GitHub Pages. pnpm/action-setup reads the pinned pnpm version from package.json.

The publishing source in repository Settings → Pages → Build and deployment must be **GitHub Actions**. The workflow runs on pushes to main and can also be started manually from Actions. The site is served at the domain root without a base subpath or custom domain.

Daily workflow: edit → pnpm dev → review localhost:4321 → pnpm check → pnpm build → commit → push main → Actions automatically deploys.

Never commit node_modules/, .astro/ or dist/. No manual HTML export or build upload is needed. Check the Actions run and deployed URL after each production change.

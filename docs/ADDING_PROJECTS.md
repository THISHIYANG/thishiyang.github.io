# Adding a project

Create one Markdown file in `src/content/projects/`, named exactly like its stable URL slug (for example `new-project.md` → `/work/new-project`). Fill the required frontmatter: `title`, `slug`, `number`, `type` (`GAME`, `WORK`, or `ARTICLE`), `year`, `status` (`WIP`, `RELEASED`, `ARCHIVE`, or `STUDY`), `summary`, `order`, and `featuredInField`. Write the project body below the frontmatter.

The WORK index and detail route are generated automatically. `order` controls the catalogue order; filenames do not. Keep `slug` stable once published.

Set `featuredInField: true` only for a curated desk item. It then also needs a stable `fieldId` and `field` placement (`x`, `y`, `rotation`, `width`, `height`, `z`). Existing IDs must not change because saved FIELD layouts use them. Optional `eyebrow`, `fieldMeta`, `openLabel`, and `fieldType` customize its Peek without another component.

Optional `thumbnail` and `heroImage` are paths to assets in `public/`. Leave them out until real, distributable media is available; the text layout works without images. Optional `tags` and `links` can be added later. Run `pnpm check` and `pnpm build` before publishing.

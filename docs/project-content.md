# Authoring project documents

Projects remain Markdown files in src/content/projects. The shared /work/[slug] route renders their body without requiring a custom page.

Optional frontmatter fields: displayTitle (an array of intentional title lines), role and tools (arrays), duration, platform, medium, heroImageAlt and heroCaption (strings). Existing fields remain supported. Omit unknown facts; empty facts are not rendered. Keep displayTitle wording consistent with title.

Use H2 Markdown headings for whichever sections a project needs. Plain Markdown images receive a wide documentation measure:

~~~markdown
![A meaningful description of the image](/projects/example/process.webp)
~~~

For a wide image with a caption, use a plain HTML figure in Markdown:

~~~html
<figure class="project-wide">
  <img src="/projects/example/process.webp" alt="Describe the documented process" loading="lazy" />
  <figcaption>Process study, 2026.</figcaption>
</figure>
~~~

For two images, wrap two figures in <div class="project-image-pair">. Each figure uses an img with meaningful alt text and an optional figcaption. The pair stacks on mobile. Use actual asset paths only; do not add empty wrappers.

ProjectMedia.astro offers the same wide/pair layouts for future Astro composition using an images array of { src, alt, caption? }. It is used for the optional hero image today. GIF images work through the same image path; a future video block can share the wide/pair wrappers without a player framework.

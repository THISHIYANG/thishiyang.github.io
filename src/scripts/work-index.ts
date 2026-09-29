// The catalogue is fully rendered at build time. This small layer only selects
// a preview and filters existing links; it never mutates project content or FIELD.
document.querySelectorAll<HTMLElement>('[data-work-index]').forEach((index) => {
  const rows = [...index.querySelectorAll<HTMLAnchorElement>('[data-work-row]')];
  const items = [...index.querySelectorAll<HTMLElement>('[data-work-item]')];
  const filters = [...index.querySelectorAll<HTMLButtonElement>('[data-work-filter]')];
  const panels = [...index.querySelectorAll<HTMLElement>('[data-work-preview-panel]')];
  const count = index.querySelector<HTMLElement>('[data-work-count]');
  if (!rows.length || !count) return;
  const total = rows.length;
  let filter = 'ALL';
  const firstVisible = () => rows.find((row) => !row.closest<HTMLElement>('[data-work-item]')?.hidden);

  function showPreview(row?: HTMLAnchorElement) {
    const slug = row?.dataset.projectSlug ?? firstVisible()?.dataset.projectSlug;
    panels.forEach((panel) => panel.toggleAttribute('data-active', panel.dataset.projectSlug === slug));
  }

  filters.forEach((button) => button.addEventListener('click', () => {
    filter = button.dataset.workFilter ?? 'ALL';
    filters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    let visible = 0;
    items.forEach((item) => {
      item.hidden = filter !== 'ALL' && item.dataset.projectType !== filter;
      if (!item.hidden) visible += 1;
    });
    count.textContent = filter === 'ALL'
      ? `${String(total).padStart(2, '0')} PROJECTS`
      : `${String(visible).padStart(2, '0')} / ${String(total).padStart(2, '0')} PROJECTS`;
    showPreview();
  }));

  rows.forEach((row) => {
    row.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') showPreview(row);
    });
    row.addEventListener('focus', () => showPreview(row));
  });
  index.querySelector('[data-work-projects]')?.addEventListener('pointerleave', () => {
    if (!index.querySelector('[data-work-row]:focus')) showPreview();
  });
  index.querySelector('[data-work-projects]')?.addEventListener('focusout', () => {
    queueMicrotask(() => {
      const focused = index.querySelector<HTMLAnchorElement>('[data-work-row]:focus');
      showPreview(focused ?? undefined);
    });
  });
});

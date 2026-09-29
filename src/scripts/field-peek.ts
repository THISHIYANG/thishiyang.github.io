const canvas = document.querySelector<HTMLElement>('[data-field-canvas]');
const layer = canvas?.querySelector<HTMLElement>('[data-field-peek-layer]');
const peek = layer?.querySelector<HTMLElement>('[data-field-peek]');

if (canvas && layer && peek) {
  const desk = canvas;
  const peekLayer = layer;
  const inspection = peek;
  const eyebrow = inspection.querySelector<HTMLElement>('[data-peek-eyebrow]')!;
  const title = inspection.querySelector<HTMLElement>('[data-peek-title]')!;
  const summary = inspection.querySelector<HTMLElement>('[data-peek-summary]')!;
  const meta = inspection.querySelector<HTMLElement>('[data-peek-meta]')!;
  const open = inspection.querySelector<HTMLAnchorElement>('[data-peek-open]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let selected: HTMLElement | null = null;
  let animation: Animation | null = null;
  let generation = 0;

  function animateBetween(source: HTMLElement, reverse = false) {
    if (reduced.matches) return Promise.resolve();
    const from = source.getBoundingClientRect();
    const to = inspection.getBoundingClientRect();
    const dx = (from.left + from.width / 2) - (to.left + to.width / 2);
    const dy = (from.top + from.height / 2) - (to.top + to.height / 2);
    const start = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${from.width / to.width}, ${from.height / to.height})`;
    animation?.cancel();
    animation = inspection.animate(
      reverse
        ? [{ transform: 'translate(-50%, -50%)', opacity: 1 }, { transform: start, opacity: .3 }]
        : [{ transform: start, opacity: .45 }, { transform: 'translate(-50%, -50%)', opacity: 1 }],
      { duration: reverse ? 280 : 340, easing: 'cubic-bezier(.22,.61,.36,1)' }
    );
    return animation.finished.catch(() => undefined);
  }

  function fill(card: HTMLElement) {
    eyebrow.textContent = card.dataset.peekEyebrow ?? card.dataset.fieldType ?? '';
    title.textContent = card.querySelector('.field-card-title')?.textContent?.trim() ?? '';
    summary.textContent = card.dataset.peekSummary ?? '';
    let labels: string[] = [];
    try {
      const value: unknown = JSON.parse(card.dataset.peekMeta ?? '[]');
      if (Array.isArray(value)) labels = value.filter((item): item is string => typeof item === 'string');
    } catch { /* Preview metadata is optional. */ }
    meta.textContent = labels.join('     ');
    const href = card.getAttribute('href');
    open.hidden = !href;
    if (href) {
      open.href = href;
      open.textContent = `${card.dataset.peekOpenLabel ?? 'OPEN'} →`;
    } else {
      open.removeAttribute('href');
    }
    inspection.dataset.species = (card.dataset.fieldType ?? 'NOTE').toLowerCase();
  }

  function openPeek(card: HTMLElement) {
    if (selected === card) return;
    const previous = selected;
    ++generation;
    animation?.cancel();
    previous?.removeAttribute('data-peek-source');
    previous?.setAttribute('aria-expanded', 'false');
    selected = card;
    fill(card);
    peekLayer.hidden = false;
    desk.setAttribute('data-peek-open', '');
    card.setAttribute('data-peek-source', '');
    card.setAttribute('aria-expanded', 'true');
    inspection.focus({ preventScroll: true });
    if (previous && !reduced.matches) {
      inspection.animate(
        [{ opacity: .45, transform: 'translate(-48%, -50%)' }, { opacity: 1, transform: 'translate(-50%, -50%)' }],
        { duration: 220, easing: 'cubic-bezier(.22,.61,.36,1)' }
      );
    } else {
      void animateBetween(card);
    }
  }

  async function closePeek(restoreFocus = true, immediate = false) {
    const card = selected;
    if (!card) return;
    const turn = ++generation;
    animation?.cancel();
    if (!immediate) await animateBetween(card, true);
    if (turn !== generation) return;
    selected = null;
    card.removeAttribute('data-peek-source');
    card.setAttribute('aria-expanded', 'false');
    desk.removeAttribute('data-peek-open');
    peekLayer.hidden = true;
    if (restoreFocus) card.focus({ preventScroll: true });
  }

  desk.querySelectorAll<HTMLElement>('[data-field-card]').forEach((card) => {
    card.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (card.dataset.justDragged === 'true') return;
      openPeek(card);
    });
    if (card.tagName === 'A') {
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') delete card.dataset.justDragged;
      });
    } else {
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          delete card.dataset.justDragged;
          openPeek(card);
        }
      });
    }
  });

  inspection.querySelector('[data-peek-close]')?.addEventListener('click', () => { void closePeek(); });
  peekLayer.addEventListener('click', (event) => event.stopPropagation());
  desk.addEventListener('click', (event) => {
    if (selected && !(event.target as Element).closest('[data-field-card], [data-field-token], [data-field-reset], [data-field-peek]')) {
      void closePeek();
    }
  });
  desk.addEventListener('field:close-peek', (event) => {
    const detail = (event as CustomEvent<{ restoreFocus?: boolean; immediate?: boolean }>).detail;
    void closePeek(detail?.restoreFocus ?? false, detail?.immediate ?? true);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && selected) {
      event.preventDefault();
      event.stopPropagation();
      void closePeek();
    }
  });
  document.addEventListener('click', (event) => {
    if ((event.target as Element).closest('[data-mode="index"]')) {
      void closePeek(false, true);
    }
  }, true);
}

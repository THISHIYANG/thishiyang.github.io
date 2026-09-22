import { worlds, type Language } from '../content/worlds';
let language: Language = 'en';
let selected: string | null = null;
let hovered: string | null = null;
let focused: string | null = null;
const hero = document.querySelector<HTMLElement>('[data-hero]')!;
const letters = document.querySelector<HTMLElement>('[data-letters]')!;
const buttons = [...letters.querySelectorAll<HTMLButtonElement>('[data-world]')];
const title = document.querySelector<HTMLElement>('[data-detail-title]')!;
const note = document.querySelector<HTMLElement>('[data-detail-note]')!;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let shown: string | null | undefined;
function render(force = false) {
  const active = focused ?? hovered ?? selected;
  if (active === shown && !force) return;
  shown = active;
  hero.toggleAttribute('data-active', !!active);
  letters.toggleAttribute('data-active', !!active);
  buttons.forEach(button => {
    button.toggleAttribute('data-active', button.dataset.world === active);
    button.setAttribute('aria-pressed', String(button.dataset.world === selected));
  });
  const world = worlds.find(world => world.id === active);
  title.textContent = world ? world[language] : '';
  note.textContent = world ? language === 'en' ? world.note : world.noteZh : '';
}
function resetMovement() {
  buttons.forEach(button => { button.style.removeProperty('--mx'); button.style.removeProperty('--my'); });
}
buttons.forEach(button => {
  button.addEventListener('focus', () => { if (button.matches(':focus-visible')) { focused = button.dataset.world!; render(); } });
  button.addEventListener('blur', () => { focused = null; render(); });
  button.addEventListener('click', () => {
    selected = selected === button.dataset.world ? null : button.dataset.world!;
    render(true);
  });
});
// Detect distance to each stable button box, never to the moving glyph.
document.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse') return;
  let nearest: HTMLButtonElement | undefined;
  let distance = 86;
  buttons.forEach(button => {
    const rect = button.getBoundingClientRect();
    const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
    const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
    const value = Math.hypot(dx, dy);
    if (value < distance) { nearest = button; distance = value; }
  });
  hovered = nearest?.dataset.world ?? null;
  resetMovement();
  if (nearest && !reduced.matches) {
    const rect = nearest.getBoundingClientRect();
    nearest.style.setProperty('--mx', `${Math.max(-6,Math.min(6,(event.clientX-rect.left-rect.width/2)*.055))}px`);
    nearest.style.setProperty('--my', `${Math.max(-3,Math.min(3,(event.clientY-rect.top-rect.height/2)*.04))}px`);
  }
  render();
});
document.documentElement.addEventListener('pointerleave', () => { hovered = null; resetMovement(); render(); });
document.addEventListener('pointerdown', event => {
  if (!(event.target instanceof Element) || event.target.closest('[data-world],.controls')) return;
  selected = null; hovered = null; focused = null; resetMovement(); render();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  selected = hovered = focused = null; resetMovement(); render(true);
});
reduced.addEventListener('change', resetMovement);
document.querySelectorAll<HTMLButtonElement>('[data-language]').forEach(button => {
  button.addEventListener('click', () => {
    language = button.dataset.language as Language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll<HTMLButtonElement>('[data-language]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    buttons.forEach((item, index) => item.setAttribute('aria-label', `${worlds[index].letter} — ${worlds[index][language]}`));
    document.querySelector('[data-tap-hint]')!.textContent = language === 'en' ? 'TAP A LETTER' : '轻触一个字母';
    render(true);
  });
});
document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(button => {
  button.addEventListener('click', () => {
    const field = button.dataset.mode === 'field';
    document.documentElement.dataset.mode = field ? 'field' : 'index';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', field ? '#0A0A0A' : '#F4F4EF');
    document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});
document.querySelector<HTMLElement>('[data-controls]')!.hidden = false;
render();


import { setupPointer } from './pointer';
import { setupScenes } from './transitions';
import { worlds, type Language } from '../content/worlds';
let language: Language = 'en';
let selected: string | null = null;
let hovered: string | null = null;
let focused: string | null = null;
const hero = document.querySelector<HTMLElement>('[data-hero]')!;
const letters = document.querySelector<HTMLElement>('[data-letters]')!;
const buttons = [...letters.querySelectorAll<HTMLButtonElement>('[data-world]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let shown: string | null | undefined;
const desktop = matchMedia('(min-width: 601px)');
function render(force = false) {
  if (document.documentElement.hasAttribute('data-transition') && !force) return;
  const active = focused ?? hovered ?? selected;
  if (active === shown && !force) return;
  shown = active;
  hero.toggleAttribute('data-active', !!active);
  letters.toggleAttribute('data-active', !!active);
  buttons.forEach(button => {
    button.toggleAttribute('data-active', button.dataset.world === active);
    button.parentElement!.toggleAttribute('data-active', button.dataset.world === active);
    const panel = document.getElementById(button.getAttribute('aria-controls')!)!;
    panel.setAttribute('aria-hidden', String(button.dataset.world !== active));
    panel.inert = button.dataset.world !== active;
    button.setAttribute('aria-pressed', String(button.dataset.world === selected));
  });
}
function resetMovement() {
  buttons.forEach(button => { button.style.removeProperty('--mx'); button.style.removeProperty('--my'); });
}
buttons.forEach(button => {
  button.addEventListener('focus', () => { if (button.matches(':focus-visible')) { focused = button.dataset.world!; render(); } });
  button.addEventListener('blur', () => { if (desktop.matches) return; focused = null; render(); });
  button.addEventListener('click', () => {
    if (document.documentElement.hasAttribute('data-transition')) return;
    if (desktop.matches && button.dataset.world) { document.dispatchEvent(new CustomEvent('thishi:navigate', {detail:{id:button.dataset.world, trigger:button}})); return; }
    selected = selected === button.dataset.world ? null : button.dataset.world!;
    render(true);
  });
});
// Detect distance to each stable button box, never to the moving glyph.
document.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || document.documentElement.hasAttribute('data-transition') || document.querySelector<HTMLElement>('[data-home]')?.hidden) return;
  focused = null;
  let nearest: HTMLButtonElement | undefined;
  let distance = 86;
  buttons.forEach(button => {
    const rect = button.getBoundingClientRect();
    const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
    const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
    const value = Math.hypot(dx, dy);
    if (value < distance) { nearest = button; distance = value; }
  });
  if (desktop.matches) {
    const targetWorld = (event.target as Element).closest<HTMLElement>('[data-letter-world]');
    if (targetWorld?.hasAttribute('data-active') || targetWorld?.querySelector('.letter')?.contains(event.target as Node)) {
      nearest = buttons.find(button => button.dataset.world === targetWorld.dataset.letterWorld);
    } else if (!nearest && shown) {
      const owner = buttons.find(button => button.dataset.world === shown)!;
      const glyph = owner.getBoundingClientRect();
      const detail = owner.parentElement!.querySelector('.letter-detail')!.getBoundingClientRect();
      if (event.clientY >= glyph.bottom && event.clientY <= detail.bottom && event.clientX >= Math.min(glyph.left, detail.left) - 8 && event.clientX <= Math.max(glyph.right, detail.right) + 8) nearest = owner;
    }
  }
  hovered = nearest?.dataset.world ?? null;
  if (!nearest) selected = null;
  resetMovement();
  if (nearest && !reduced.matches) {
    const rect = nearest.getBoundingClientRect();
    nearest.style.setProperty('--mx', `${Math.max(-6,Math.min(6,(event.clientX-rect.left-rect.width/2)*.055))}px`);
    nearest.style.setProperty('--my', `${Math.max(-3,Math.min(3,(event.clientY-rect.top-rect.height/2)*.04))}px`);
  }
  render();
});
document.documentElement.addEventListener('pointerleave', () => { hovered = null; selected = null; resetMovement(); render(); });
document.addEventListener('pointerdown', event => {
  if (!(event.target instanceof Element) || event.target.closest('[data-letter-world],.controls')) return;
  selected = null; hovered = null; focused = null; resetMovement(); render();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || document.documentElement.hasAttribute('data-transition')) return;
  selected = hovered = focused = null; resetMovement(); render(true);
});
reduced.addEventListener('change', resetMovement);
document.querySelectorAll<HTMLButtonElement>('[data-language]').forEach(button => {
  button.addEventListener('click', () => {
    if (document.documentElement.hasAttribute('data-transition')) return;
    if (desktop.matches && button.dataset.world) { document.dispatchEvent(new CustomEvent('thishi:navigate', {detail:{id:button.dataset.world, trigger:button}})); return; }
    language = button.dataset.language as Language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll<HTMLButtonElement>('[data-language]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    buttons.forEach((item, index) => item.setAttribute('aria-label', `${worlds[index].letter} — ${worlds[index][language]}`));
    buttons.forEach((item, index) => {
      const panel = document.getElementById(item.getAttribute('aria-controls')!)!;
      panel.querySelector('[data-detail-title]')!.textContent = worlds[index][language];
      panel.querySelector('[data-detail-note]')!.textContent = language === 'en' ? worlds[index].note : worlds[index].noteZh;
    });
    document.querySelectorAll<HTMLElement>('[data-lang]').forEach(element => { element.hidden = element.dataset.lang !== language; });
    document.dispatchEvent(new Event('thishi:language'));
    document.querySelector('[data-tap-hint]')!.textContent = language === 'en' ? 'TAP A LETTER' : '轻触一个字母';
    render(true);
  });
});
document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(button => {
  button.addEventListener('click', () => {
    if (document.documentElement.hasAttribute('data-transition')) return;
    if (desktop.matches && button.dataset.world) { document.dispatchEvent(new CustomEvent('thishi:navigate', {detail:{id:button.dataset.world, trigger:button}})); return; }
    const field = button.dataset.mode === 'field';
    document.documentElement.dataset.mode = field ? 'field' : 'index';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', field ? '#0A0A0A' : '#FFFFFF');
    document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});
document.querySelector<HTMLElement>('[data-controls]')!.hidden = false;
render();



// Font side bearings differ sharply between T and I. Anchor captions to ink,
// not the invisible advance box; preserve the existing wordmark spacing.
function measureCaptionAnchors() {
  const context = document.createElement('canvas').getContext('2d');
  if (!context) return;
  buttons.forEach(button => {
    const style = getComputedStyle(button);
    context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const metrics = context.measureText(button.textContent!.trim());
    const box = button.getBoundingClientRect();
    const scale = reduced.matches ? 1 : 1.06;
    const inkLeft = -metrics.actualBoundingBoxLeft * scale - box.width * (scale - 1) / 2;
    button.parentElement!.style.setProperty('--ink-left', `${inkLeft}px`);
    button.parentElement!.style.setProperty('--available-width', `${Math.max(0, innerWidth - box.left - inkLeft - 24)}px`);
  });
}
void document.fonts.ready.then(measureCaptionAnchors);
window.addEventListener('resize', measureCaptionAnchors);
reduced.addEventListener('change', measureCaptionAnchors);

document.querySelectorAll<HTMLElement>('[data-letter-world]').forEach(wrapper => {
  wrapper.addEventListener('focusin', () => {
    if (!desktop.matches) return;
    focused = wrapper.dataset.letterWorld!;
    render();
  });
  wrapper.addEventListener('focusout', event => {
    if (wrapper.contains(event.relatedTarget as Node)) return;
    focused = null;
    render();
  });
});

document.addEventListener('thishi:freeze', event => {
  const id = (event as CustomEvent<{id?: string}>).detail.id;
  selected = id ?? null; hovered = focused = null; render(true);
});
document.addEventListener('thishi:scene-ready', () => {
  selected = hovered = focused = null; resetMovement(); render(true);
  requestAnimationFrame(measureCaptionAnchors);
});
setupPointer();
setupScenes();


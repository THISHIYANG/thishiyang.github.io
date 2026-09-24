import { worlds, type Language } from '../content/worlds';
const hero = document.querySelector<HTMLElement>('[data-hero]')!;
const letters = document.querySelector<HTMLElement>('[data-letters]')!;
const buttons = [...letters.querySelectorAll<HTMLButtonElement>('[data-world]')];
const desktop = matchMedia('(min-width: 601px)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let selected: string | null = null;
let hovered: string | null = null;
let focused: string | null = null;
let shown: string | null | undefined;
// Resolve a touch tap before compatibility mouse events (and layout changes).
// Suppress only the duplicate native click, never the deliberate button.click().
let touchLetter: {button:HTMLButtonElement;x:number;y:number;id:number}|undefined;
let lastTouchLetter: HTMLButtonElement|undefined;
let lastTouchTime=0;
letters.addEventListener('pointerdown',event=>{
  const button=(event.target as Element).closest<HTMLButtonElement>('[data-world]');
  if(event.pointerType==='touch' && button)touchLetter={button,x:event.clientX,y:event.clientY,id:event.pointerId};
});
letters.addEventListener('pointercancel',()=>{touchLetter=undefined;});
letters.addEventListener('pointerup',event=>{
  const tap=touchLetter;touchLetter=undefined;
  if(!tap || tap.id!==event.pointerId || Math.hypot(event.clientX-tap.x,event.clientY-tap.y)>12)return;
  lastTouchLetter=tap.button;lastTouchTime=performance.now();tap.button.click();
});
document.addEventListener('click',event=>{
  if(event.isTrusted && performance.now()-lastTouchTime<700 && (event.target as Element).closest('[data-world]')===lastTouchLetter){
    event.preventDefault();event.stopImmediatePropagation();
  }
},true);
function render(force = false) {
  if (document.documentElement.hasAttribute('data-transition') && !force) return;
  const active = desktop.matches && matchMedia('(hover:hover) and (pointer:fine)').matches ? focused ?? hovered ?? selected : selected;
  if (active === shown && !force) return;
  shown = active;
  hero.toggleAttribute('data-active', !!active);
  letters.toggleAttribute('data-active', !!active);
  buttons.forEach(button => {
    const on = button.dataset.world === active;
    button.toggleAttribute('data-active', on);
    button.parentElement!.toggleAttribute('data-active', on);
    const panel = document.getElementById(button.getAttribute('aria-controls')!)!;
    panel.setAttribute('aria-hidden', String(!on));
    panel.inert = !on;
    button.setAttribute('aria-pressed', String(button.dataset.world === selected));
  });
  clearIdentity();
}
function resetMovement() {
  buttons.forEach(button => { button.style.removeProperty('--mx'); button.style.removeProperty('--my'); });
}
buttons.forEach(button => {
  button.addEventListener('focus', () => { if (button.matches(':focus-visible')) { focused = button.dataset.world!; render(); } });
  button.addEventListener('blur', () => { if (!desktop.matches) { focused = null; render(); } });
  button.addEventListener('click', () => { selected = selected === button.dataset.world ? null : button.dataset.world!; render(); });
  const wrapper = button.parentElement!;
  wrapper.addEventListener('focusin', event => { if (desktop.matches) { focused = button.dataset.world!; render(); const unit = (event.target as Element).closest<HTMLElement>('[data-identity-unit]'); if (unit) setIdentity(unit); } });
  wrapper.addEventListener('focusout', event => { if (!wrapper.contains(event.relatedTarget as Node)) { focused = null; render(); } });
});
// The caption and artifact belong to their letter. The union bridges the small
// gap below the glyph without leaving a timer that could select a stale world.
document.addEventListener('pointermove', event => {
  if (!desktop.matches || event.pointerType !== 'mouse' || document.documentElement.hasAttribute('data-transition') || document.querySelector<HTMLElement>('[data-home]')?.hidden) return;
  focused = null;
  let nearest: HTMLButtonElement | undefined;
  let distance = 86;
  buttons.forEach(button => {
    const box = button.getBoundingClientRect();
    const value = Math.hypot(Math.max(box.left-event.clientX,0,event.clientX-box.right),Math.max(box.top-event.clientY,0,event.clientY-box.bottom));
    if (value < distance) { nearest = button; distance = value; }
  });
  if (desktop.matches) {
    const target = (event.target as Element).closest<HTMLElement>('[data-letter-world]');
    if (target?.hasAttribute('data-active') || target?.querySelector('.letter')?.contains(event.target as Node)) {
      nearest = buttons.find(button => button.dataset.world === target.dataset.letterWorld);
    } else if (shown) {
      const owner = buttons.find(button => button.dataset.world === shown)!;
      const glyph = owner.getBoundingClientRect();
      const panel = owner.parentElement!.querySelector('.letter-detail')!.getBoundingClientRect();
      if (event.clientY >= glyph.bottom && event.clientY <= panel.bottom && event.clientX >= Math.min(glyph.left,panel.left)-8 && event.clientX <= Math.max(glyph.right,panel.right)+8) nearest = owner;
    }
  }
  hovered = nearest?.dataset.world ?? null;
  if (!nearest) selected = null;
  resetMovement();
  if (nearest && !reduced.matches) {
    const box = nearest.getBoundingClientRect();
    nearest.style.setProperty('--mx', `${Math.max(-6,Math.min(6,(event.clientX-box.left-box.width/2)*.055))}px`);
    nearest.style.setProperty('--my', `${Math.max(-3,Math.min(3,(event.clientY-box.top-box.height/2)*.04))}px`);
  }
  render();
});
function clearWorld() { selected = hovered = focused = null; resetMovement(); render(); }
document.documentElement.addEventListener('pointerleave', event => { if(event.pointerType==='mouse') clearWorld(); });
document.addEventListener('pointerdown', event => { if (!(event.target as Element).closest('[data-letter-world],.controls')) clearWorld(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') clearWorld(); });
reduced.addEventListener('change', resetMovement);

const identityUnits = [...document.querySelectorAll<HTMLElement>('[data-identity-unit]')];
let activeIdentity: HTMLElement | null = null;
function setIdentity(unit: HTMLElement | null) {
  activeIdentity = unit;
  identityUnits.forEach(item => {
    const on = item === unit;
    item.toggleAttribute('data-active', on);
    item.querySelector('button')!.setAttribute('aria-expanded', String(on));
    item.querySelector('.portrait-proof')!.setAttribute('aria-hidden', String(!on));
  });
}
function clearIdentity() { setIdentity(null); }
identityUnits.forEach(unit => {
  const button = unit.querySelector<HTMLButtonElement>('button')!;
  button.addEventListener('pointerenter', event => { if(event.pointerType==='mouse') setIdentity(unit); });
  button.addEventListener('focus', () => setIdentity(unit));
  button.addEventListener('click', () => setIdentity(unit));
  button.addEventListener('blur', clearIdentity);
});
document.querySelector('[data-creator]')?.addEventListener('pointermove', event => {
  if (!activeIdentity || (event as PointerEvent).pointerType !== 'mouse') return;
  const pointer = event as PointerEvent;
  const target = (pointer.target as Element).closest<HTMLElement>('[data-identity-unit]');
  if (target) { setIdentity(target); return; }
  const word = activeIdentity.querySelector('button')!.getBoundingClientRect();
  const frame = activeIdentity.querySelector('.portrait-proof')!.getBoundingClientRect();
  if (pointer.clientX < word.left || pointer.clientX > frame.right || pointer.clientY < Math.min(word.top,frame.top) || pointer.clientY > Math.max(word.bottom,frame.bottom)) clearIdentity();
});
document.querySelector('[data-creator]')?.addEventListener('pointerleave', event => { if((event as PointerEvent).pointerType==='mouse') clearIdentity(); });

document.querySelectorAll<HTMLButtonElement>('[data-language]').forEach(button => {
  button.addEventListener('click', () => {
    const language = button.dataset.language as Language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-language]').forEach(item => item.setAttribute('aria-pressed',String(item === button)));
    buttons.forEach((item,index) => {
      item.setAttribute('aria-label',`${worlds[index].letter} — ${worlds[index][language]}`);
      const panel = document.getElementById(item.getAttribute('aria-controls')!)!;
      panel.querySelector('[data-detail-title]')!.textContent = worlds[index][language];
      panel.querySelector('[data-detail-note]')!.textContent = language === 'en' ? worlds[index].note : worlds[index].noteZh;
    });
    document.querySelectorAll<HTMLElement>('[data-lang]').forEach(item => { item.hidden = item.dataset.lang !== language; });
    clearIdentity();
    document.dispatchEvent(new Event('thishi:language'));
  });
});
document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(button => {
  button.addEventListener('click', () => {
    const field = button.dataset.mode === 'field';
    document.documentElement.dataset.mode = field ? 'field' : 'index';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',field ? '#0A0A0A' : '#FFFFFF');
    document.querySelectorAll('[data-mode]').forEach(item => item.setAttribute('aria-pressed',String(item === button)));
  });
});
document.querySelector<HTMLElement>('[data-controls]')!.hidden = false;
function measureCaptionAnchors() {
  const context = document.createElement('canvas').getContext('2d');
  if (!context) return;
  buttons.forEach(button => {
    const style = getComputedStyle(button);
    context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const metrics = context.measureText(button.textContent!.trim());
    const box = button.getBoundingClientRect();
    const scale = reduced.matches ? 1 : 1.06;
    const inkLeft = -metrics.actualBoundingBoxLeft * scale - box.width * (scale-1)/2;
    button.parentElement!.style.setProperty('--ink-left',`${inkLeft}px`);
    button.parentElement!.style.setProperty('--available-width',`${Math.max(0,innerWidth-box.left-inkLeft-24)}px`);
  });
}
void document.fonts.ready.then(measureCaptionAnchors);
window.addEventListener('resize',measureCaptionAnchors);
reduced.addEventListener('change',measureCaptionAnchors);
render();



document.addEventListener('thishi:freeze', event => {
  const identity = activeIdentity;
  selected = (event as CustomEvent<{id?:string}>).detail.id ?? null;
  focused = hovered = null; render(true);
  if (identity && selected === 'about') setIdentity(identity);
});
document.addEventListener('thishi:scene-ready', () => {
  selected = hovered = focused = null; resetMovement(); render(true);
  requestAnimationFrame(measureCaptionAnchors);
});

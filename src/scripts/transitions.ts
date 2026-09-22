import { scenes, sceneAt, type Scene } from '../content/scenes';

export function setupScenes() {
  const root = document.documentElement;
  const experience = document.querySelector<HTMLElement>('[data-experience]')!;
  const home = document.querySelector<HTMLElement>('[data-home]')!;
  const shell = document.querySelector<HTMLElement>('[data-scene-shell]')!;
  const layer = document.querySelector<HTMLElement>('[data-transition-layer]')!;
  const heading = document.querySelector<HTMLElement>('#scene-title')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 601px)');
  const easing = 'cubic-bezier(.22,.61,.36,1)';
  let busy = false;
  let generation = 0;
  let current = sceneAt(location.pathname);
  const animations = new Set<Animation>();

  async function animate(element: Element, frames: Keyframe[], duration: number) {
    const animation = element.animate(frames, { duration, easing, fill: 'forwards' });
    animations.add(animation);
    try { await animation.finished; } catch { /* Cancellation restores the current scene. */ }
  }
  function notifyCursor() { document.dispatchEvent(new Event('thishi:transition-state')); }
  function cleanup() {
    animations.forEach(animation => animation.cancel()); animations.clear();
    layer.replaceChildren(); root.removeAttribute('data-transition');
    document.querySelector('#main')?.removeAttribute('aria-busy');
    busy = false; notifyCursor();
  }
  function reveal(scene: Scene | undefined, focus = true) {
    const language = root.lang === 'zh-CN' ? 'zh' : 'en';
    experience.dataset.scene = scene?.id ?? 'home';
    home.hidden = !!scene; shell.hidden = !scene;
    document.querySelector<HTMLElement>('[data-scroll-cue]')!.hidden = !!scene;
    if (scene) {
      document.querySelector('[data-scene-number]')!.textContent = scene.number;
      document.querySelector('[data-scene-glyph]')!.textContent = scene.letter;
      document.querySelector('[data-scene-title]')!.textContent = language === 'zh' ? scene.zh : scene.title;
      heading.setAttribute('aria-label', language === 'zh' ? scene.zh : scene.title);
    }
    shell.querySelectorAll<HTMLElement>('[data-scene]').forEach(link => {
      if (link.dataset.scene === scene?.id) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
    document.title = scene ? `THISHI — ${language === 'zh' ? scene.zh : scene.title}` : 'THISHI — Independent Creator';
    if (focus) (scene ? heading : document.querySelector<HTMLElement>('#main'))?.focus({ preventScroll: true });
    document.dispatchEvent(new CustomEvent('thishi:scene-ready', { detail: { scene: scene?.id ?? 'home' } }));
  }
  function commit(scene: Scene | undefined) {
    current = scene;
    history.pushState(null, '', scene?.path ?? '/');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function sourceFor(scene: Scene, trigger?: HTMLElement) {
    const owner = document.querySelector<HTMLElement>(`[data-letter-world="${scene.id}"]`)!;
    if (home.hidden) return shell.querySelector<HTMLElement>('[data-scene-glyph]')!;
    if (scene.kind === 'type') return owner.querySelector<HTMLElement>('.letter-glyph')!;
    if (trigger?.matches('[data-signature]')) return trigger;
    const candidates = owner.querySelectorAll<HTMLElement>(`[data-signature="${scene.kind}"]`);
    return candidates[candidates.length - 1] ?? owner.querySelector<HTMLElement>('.letter-glyph')!;
  }
  async function navigate(scene: Scene | undefined, trigger?: HTMLElement) {
    if (busy || scene?.id === current?.id) return;
    const ticket = ++generation;
    busy = true;
    document.dispatchEvent(new CustomEvent('thishi:freeze', { detail: { id: scene?.id } }));
    root.dataset.transition = scene?.kind ?? 'type';
    document.querySelector('#main')?.setAttribute('aria-busy','true');
    notifyCursor();
    try {
      if (!scene || reduced.matches || !desktop.matches || !Element.prototype.animate) {
        reveal(scene); commit(scene); return;
      }
      // 140ms for the object's signature gesture; no loading screen or network wait.
      await animate(layer, [{ opacity: 1 }, { opacity: 1 }], 140);
      if (ticket !== generation) return;
      const source = sourceFor(scene, trigger);
      const box = source.getBoundingClientRect();
      const surface = document.createElement('div');
      surface.className = 'transition-surface'; surface.dataset.kind = scene.kind;
      Object.assign(surface.style, { left: `${box.left}px`, top: `${box.top}px`, width: `${box.width}px`, height: `${box.height}px` });
      layer.append(surface);
      if (scene.kind === 'type') {
        const fontSize = parseFloat(getComputedStyle(source).fontSize);
        surface.textContent = scene.letter;
        surface.style.fontSize = `${fontSize}px`;
        source.style.visibility = 'hidden';
        await animate(surface, [
          { left: `${box.left}px`, top: `${box.top}px`, fontSize: `${fontSize}px` },
          { left: '15vw', top: 'calc(29svh + 36px)', fontSize: 'clamp(160px,19vw,290px)' },
        ], 340);
        source.style.visibility = '';
        if (ticket !== generation) return;
        reveal(scene);
        await animate(surface, [{ opacity: 1 }, { opacity: 0 }], 100);
      } else if (scene.kind === 'place') {
        surface.style.height = '1px';
        await animate(surface, [{ left: `${box.left}px`, width: `${box.width}px` }, { left: '0px', width: `${innerWidth}px` }], 240);
        if (ticket !== generation) return;
        reveal(scene);
        const seamY = Math.max(0, Math.min(innerHeight, box.top));
        await animate(shell, [{ clipPath: `inset(${seamY}px 0 ${innerHeight-seamY}px 0)` }, { clipPath: 'inset(0% 0 0% 0)' }], 220);
      } else {
        // The selected paper/card/frame grows from its real screen bounds.
        if (scene.kind === 'archive') surface.style.borderWidth = '1px';
        const frameInset = scene.kind === 'archive' ? 24 : 0;
        await animate(surface, [
          { left: `${box.left}px`, top: `${box.top}px`, width: `${box.width}px`, height: `${box.height}px` },
          { left: `${frameInset}px`, top: `${frameInset}px`, width: `${innerWidth-frameInset*2}px`, height: `${innerHeight-frameInset*2}px` },
        ], 360);
        if (ticket !== generation) return;
        reveal(scene);
        // Reveal from the expanding surface edge, not a generic screen fade.
        await animate(surface, [{ clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)' }], 120);
      }
      if (ticket === generation) commit(scene);
    } catch (error) {
      console.error('Scene transition fallback', error);
      if (ticket === generation) { reveal(scene); commit(scene); }
    } finally {
      if (ticket === generation) cleanup();
    }
  }
  document.addEventListener('click', event => {
    const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[data-scene]');
    if (!anchor || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    void navigate(scenes.find(scene => scene.id === anchor.dataset.scene), anchor);
  });
  document.addEventListener('keydown', event => {
    const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[data-scene]');
    if (event.code === 'Space' && anchor) { event.preventDefault(); void navigate(scenes.find(scene => scene.id === anchor.dataset.scene), anchor); }
    if (event.key === 'Escape' && busy) { generation++; cleanup(); reveal(current); }
  });
  document.addEventListener('thishi:navigate', event => {
    const detail = (event as CustomEvent<{ id: string; trigger?: HTMLElement }>).detail;
    void navigate(scenes.find(scene => scene.id === detail.id), detail.trigger);
  });
  window.addEventListener('popstate', () => {
    generation++; cleanup(); current = sceneAt(location.pathname); reveal(current);
  });
  document.addEventListener('thishi:language', () => reveal(current, false));
  reveal(current, false);
}


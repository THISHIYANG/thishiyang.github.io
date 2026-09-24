const folder = document.querySelector<HTMLElement>('[data-portfolio]');
if (folder) {
  const sheets = [...folder.querySelectorAll<HTMLButtonElement>('[data-sheet]')];
  let progress = 0;
  let pointerY: number | null = null;
  function update(value: number) {
    if (document.documentElement.hasAttribute('data-transition')) return;
    progress = Math.max(0, Math.min(1, value));
    folder!.dataset.progress = progress.toFixed(3);
    sheets.forEach((sheet, i) => {
      const amount = Math.max(0, Math.min(1, progress * 2 - i * .24));
      sheet.style.setProperty('--deal', String(amount));
      sheet.style.transitionDelay = `${i * 50}ms`;
    });
  }
  folder.addEventListener('wheel', event => {
    if (!matchMedia('(min-width:601px)').matches) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    const next = Math.max(0, Math.min(1, progress - delta / 500));
    if (next !== progress) { event.preventDefault(); update(next); }
  }, {passive:false});
  folder.addEventListener('pointerenter', event => { pointerY = event.clientY; });
  folder.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    if (pointerY !== null) update(progress + (pointerY - event.clientY) / 260);
    pointerY = event.clientY;
  });
  folder.addEventListener('pointerleave', () => { pointerY = null; });
  folder.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); update(event.key === 'Home' ? 0 : event.key === 'End' ? 1 : progress + (event.key === 'ArrowUp' ? .2 : -.2));
    }
  });
  sheets.forEach(sheet => {
    sheet.addEventListener('focus', () => update(1));
    sheet.addEventListener('click', () => { if (sheet.dataset.href) location.assign(sheet.dataset.href); });
  });
  const owner = folder.closest('[data-letter-world]')!;
  new MutationObserver(() => { if (!owner.hasAttribute('data-active')) { update(0); pointerY = null; } }).observe(owner,{attributes:true,attributeFilter:['data-active']});
  update(0);
}


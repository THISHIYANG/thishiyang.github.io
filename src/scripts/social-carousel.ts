const carousel = document.querySelector<HTMLElement>('[data-social-carousel]');
if (carousel) {
  const cards = [...carousel.querySelectorAll<HTMLButtonElement>('[data-social-card]')];
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let active = 0;
  let wheel = 0;
  let lastWheel = 0;
  let lastWheelEvent = 0;
  let hoverTimer: ReturnType<typeof setTimeout> | undefined;
  function select(index: number, focus = false) {
    active = (index + cards.length) % cards.length;
    cards.forEach((card,i) => {
      let offset = (i - active + cards.length) % cards.length;
      if (offset > cards.length / 2) offset -= cards.length;
      const visible = Math.abs(offset) <= 2;
      const depth = Math.abs(offset);
      card.style.transform = reduced.matches ? `translateX(${offset * 125}px) scale(${depth ? .8 : 1})` : `translateX(${offset * 135}px) translateZ(${-depth * 70}px) rotateY(${-Math.sign(offset) * Math.min(depth * 38,60)}deg) scale(${1 - depth * .1})`;
      card.style.zIndex = String(10-depth);
      card.style.opacity = visible ? String(1-depth*.16) : '0';
      card.style.visibility = visible ? 'visible' : 'hidden';
      card.style.pointerEvents = visible ? 'auto' : 'none';
      card.tabIndex = i === active ? 0 : -1;
      card.setAttribute('aria-pressed',String(i===active));
      card.setAttribute('aria-hidden',String(!visible));
      card.dataset.offset = String(offset);
    });
    carousel!.querySelector('[data-social-status]')!.textContent = `${cards[active].getAttribute('aria-label')}, ${active+1} of ${cards.length}`;
    if (focus) cards[active].focus({preventScroll:true});
  }
  cards.forEach((card,index) => {
    card.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || index === active) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => select(index),130);
    });
    card.addEventListener('pointerleave', () => clearTimeout(hoverTimer));
    card.addEventListener('click', () => { select(index); if (card.dataset.href) location.assign(card.dataset.href); });
    card.addEventListener('focus', () => { if (active !== index) select(index); });
  });
  carousel.addEventListener('wheel', event => {
    if (!matchMedia('(min-width:601px)').matches) return;
    const delta = Math.abs(event.deltaX)>Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!delta) return;
    event.preventDefault();clearTimeout(hoverTimer);
    const now = performance.now();
    if (now-lastWheelEvent>220) wheel=0;
    lastWheelEvent=now;
    wheel += delta * (event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
    if (Math.abs(wheel)>=40 && now-lastWheel>=300) { select(active+Math.sign(wheel));wheel=0;lastWheel=now; }
  },{passive:false});
  carousel.addEventListener('keydown', event => {
    if (event.key==='ArrowLeft'||event.key==='ArrowRight') {event.preventDefault();select(active+(event.key==='ArrowRight'?1:-1),true);}
  });
  carousel.addEventListener('pointerleave',()=>clearTimeout(hoverTimer));
  reduced.addEventListener('change',()=>select(active));
  select(0);
}



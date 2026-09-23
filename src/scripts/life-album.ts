import type { LifePhoto } from '../content/life';
const album = document.querySelector<HTMLElement>('[data-life-album]');
if (album) {
  const photos: LifePhoto[] = JSON.parse(album.dataset.photos!);
  const cards = [...album.querySelectorAll<HTMLButtonElement>('[data-life-photo]')];
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const mod = (n:number) => (n % photos.length + photos.length) % photos.length;
  let current = 3;
  let moving = false;
  let queued = 0;
  let queuedFocus = false;
  let totalWheel = 0;
  let lastEvent = 0;
  let finishTimer: ReturnType<typeof setTimeout>;
  const indices = new Map(cards.map((card,i)=>[card,current+i-4]));
  function content(card:HTMLButtonElement, index:number) {
    const photo=photos[mod(index)];
    card.dataset.photoId=photo.id;
    card.querySelector('.life-photo-number')!.textContent=photo.id;
    card.setAttribute('aria-label',photo.alt || `Photo ${photo.id}`);
    const img=card.querySelector('img')!;
    img.hidden=!photo.image;img.alt=photo.alt;
    if(photo.image) img.src=photo.image;else img.removeAttribute('src');
  }
  function paint() {
    cards.forEach(card=>{
      const offset=indices.get(card)!-current;
      const depth=Math.abs(offset);
      card.dataset.offset=String(offset);
      card.style.transform=reduced.matches ? `translateY(${offset*30}px) scale(${depth ? .78 : 1})` : `translateY(${offset*32}px) translateZ(${-depth*70}px) rotateX(${Math.sign(offset)*Math.min(depth*12,30)}deg) scale(${1-depth*.07})`;
      card.style.zIndex=String(10-depth);
      card.style.opacity=depth<=3?String(1-depth*.12):'0';
      card.style.pointerEvents=depth<=3?'auto':'none';
      card.setAttribute('aria-hidden',String(depth>3));
      card.setAttribute('aria-pressed',String(offset===0));
      card.tabIndex=offset===0?0:-1;
    });
    album!.querySelector('[data-life-status]')!.textContent=`Photo ${photos[mod(current)].id}, ${mod(current)+1} of ${photos.length}`;
  }
  function finish() {
    // Recycle only the invisible buffer at the far edge. Visible photos keep
    // their identity and trajectory, including the 007 → 001 boundary.
    cards.forEach(card=>{
      const old=indices.get(card)!;
      if(Math.abs(old-current)>4){
        const next=old+(old<current?cards.length:-cards.length);
        card.style.transition='none';indices.set(card,next);content(card,next);
      }
    });
    paint();
    requestAnimationFrame(()=>{cards.forEach(card=>card.style.removeProperty('transition'));});
    moving=false;
    if(queued){const step=Math.sign(queued);queued-=step;advance(step,queuedFocus);}
  }
  function advance(step:number, focus=false) {
    if (document.documentElement.hasAttribute('data-transition')) return;
    if(moving){queuedFocus=focus;queued=Math.max(-7,Math.min(7,queued+step));return;}
    current+=step;moving=true;paint();
    if(focus) cards.find(card=>indices.get(card)===current)?.focus({preventScroll:true});
    clearTimeout(finishTimer);
    finishTimer=setTimeout(finish,reduced.matches?0:380);
  }
  cards.forEach(card=>{
    content(card,indices.get(card)!);
    card.addEventListener('click',()=>{
      const offset=indices.get(card)!-current;
      if(offset){queued=offset-Math.sign(offset);advance(Math.sign(offset));}
    });
  });
  album.addEventListener('wheel',event=>{
    if(!matchMedia('(min-width:601px)').matches || !event.deltaY)return;
    event.preventDefault();
    const now=performance.now();if(now-lastEvent>220)totalWheel=0;lastEvent=now;
    totalWheel+=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
    if(Math.abs(totalWheel)>=45){advance(Math.sign(totalWheel));totalWheel=0;}
  },{passive:false});
  album.addEventListener('keydown',event=>{
    if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();advance(event.key==='ArrowDown'?1:-1,true);}
  });
  reduced.addEventListener('change',paint);
  new MutationObserver(()=>{if(!album.closest('[data-letter-world]')!.hasAttribute('data-active'))queued=0;}).observe(album.closest('[data-letter-world]')!,{attributes:true,attributeFilter:['data-active']});
  paint();
}



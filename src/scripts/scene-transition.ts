import { scenes, sceneAt, letterDestination, type Scene } from '../content/scenes';

export function setupScenes() {
  const root=document.documentElement;
  const experience=document.querySelector<HTMLElement>('[data-experience]')!;
  const home=document.querySelector<HTMLElement>('[data-home]')!;
  const shell=document.querySelector<HTMLElement>('[data-scene-shell]')!;
  const layer=document.querySelector<HTMLElement>('[data-transition-layer]')!;
  const heading=document.querySelector<HTMLElement>('#scene-title')!;
  const desktop=matchMedia('(min-width:601px)');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const easing='cubic-bezier(.22,.61,.36,1)';
  let current=sceneAt(location.pathname);
  let busy=false, generation=0;
  const animations=new Set<Animation>();
  const paused=new Set<Animation>();
  const hiddenSources=new Map<HTMLElement,string>();
  let origin:HTMLElement|undefined;
  async function animate(el:Element,frames:Keyframe[],duration:number) {
    const animation=el.animate(frames,{duration,easing,fill:'forwards'});animations.add(animation);
    try {await animation.finished;} catch { /* Escape/back invalidates this operation. */ }
  }
  function cursor() {document.dispatchEvent(new Event('thishi:transition-state'));}
  function cleanup() {
    animations.forEach(a=>a.cancel());animations.clear();
    paused.forEach(a=>{if(a.playState==='paused')a.play();});paused.clear();
    hiddenSources.forEach((visibility,el)=>{el.style.visibility=visibility;});hiddenSources.clear();
    layer.replaceChildren();root.removeAttribute('data-transition');busy=false;
    document.querySelector('#main')?.removeAttribute('aria-busy');
    document.querySelectorAll('[data-transition-selected]').forEach(el=>el.removeAttribute('data-transition-selected'));
    cursor();
  }
  function reveal(scene:Scene|undefined,focus=true) {
    experience.dataset.scene=scene?.id??'home';home.hidden=!!scene;shell.hidden=!scene;
    const zh=root.lang==='zh-CN';
    if(scene){
      shell.querySelector('[data-scene-number]')!.textContent=scene.number;
      shell.querySelector('[data-scene-glyph]')!.textContent=scene.letter;
      shell.querySelector('[data-scene-title]')!.textContent=zh?scene.zh:scene.title;
      heading.setAttribute('aria-label',zh?scene.zh:scene.title);
    }
    shell.querySelectorAll<HTMLAnchorElement>('[data-scene]').forEach(link=>{
      const target=scenes.find(item=>item.id===link.dataset.scene)!;
      link.href=letterDestination(target,scene)?.path??'/';
      link.setAttribute('aria-label',target.id===scene?.id ? `${zh?target.zh:target.title} — ${zh?'返回首页':'return home'}` : (zh?target.zh:target.title));
      if(link.dataset.scene===scene?.id)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
    });
    document.title='this is ishi.';
    document.dispatchEvent(new CustomEvent('thishi:scene-ready',{detail:{scene:scene?.id??'home'}}));
    if(focus)(scene?heading:document.querySelector<HTMLElement>('#main'))?.focus({preventScroll:true});
  }
  function commit(scene:Scene|undefined){current=scene;history.pushState(null,'',scene?.path??'/');window.scrollTo({top:0,behavior:'instant'});}
  function sourceFor(scene:Scene,trigger?:HTMLElement){
    if(home.hidden)return shell.querySelector<HTMLElement>('[data-scene-glyph]')!;
    const owner=home.querySelector<HTMLElement>(`[data-letter-world="${scene.id}"]`)!;
    const selectors:Record<string,string>={type:'.letter-glyph',place:'.journey-route',folder:'[data-sheet]:focus, [data-sheet]',social:'[data-social-card][aria-pressed="true"]',photo:'[data-life-photo][aria-pressed="true"]',archive:'[data-archive-drawer]:hover, [data-archive-drawer]:focus, [data-archive-drawer]'};
    if(trigger?.matches('[data-sheet],[data-archive-drawer]'))return trigger;
    return owner.querySelector<HTMLElement>(selectors[scene.kind])??owner.querySelector<HTMLElement>('.letter-glyph')!;
  }
  function surfaceFor(source:HTMLElement,kind:string){
    const box=source.getBoundingClientRect();
    const surface=document.createElement('div');surface.className='transition-surface';surface.dataset.kind=kind;
    Object.assign(surface.style,{left:`${box.x}px`,top:`${box.y}px`,width:`${box.width}px`,height:`${box.height}px`});
    const clone=source.cloneNode(true) as HTMLElement;
    clone.removeAttribute('id');clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));clone.inert=true;
    Object.assign(clone.style,{position:'absolute',left:'0',top:'0',margin:'0',width:'100%',height:'100%',transform:'none',opacity:'1',visibility:'visible',transition:'none'});
    surface.append(clone);
    let frame: SVGRectElement | undefined;
    let frameSvg: SVGSVGElement | undefined;
    if(kind!=='type'){
      clone.style.border='0';clone.style.outline='0';
      frameSvg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      frameSvg.setAttribute('viewBox',`0 0 ${innerWidth} ${innerHeight}`);
      Object.assign(frameSvg.style,{position:'absolute',inset:'0',width:'100%',height:'100%',overflow:'visible'});
      frame=document.createElementNS('http://www.w3.org/2000/svg','rect');
      for(const [key,value] of Object.entries({x:'0',y:'0',width:String(box.width),height:String(box.height),fill:'none',stroke:'currentColor','stroke-width':'1','vector-effect':'non-scaling-stroke'}))frame.setAttribute(key,value);
      frame.style.transformOrigin='0 0';frame.style.transform=`translate(${box.x}px,${box.y}px)`;
      frameSvg.append(frame);
    }
    layer.append(surface);if(frameSvg)layer.append(frameSvg);
    hiddenSources.set(source,source.style.visibility);source.style.visibility='hidden';
    return {surface,box,clone,frame,frameSvg};
  }
  async function navigate(scene:Scene|undefined,trigger?:HTMLElement){
    if(busy||scene?.id===current?.id)return;
    const ticket=++generation;origin=trigger;busy=true;
    document.dispatchEvent(new CustomEvent('thishi:freeze',{detail:{id:scene?.id}}));
    const source=scene?sourceFor(scene,trigger):undefined;
    source?.setAttribute('data-transition-selected','');
    if(!home.hidden)home.getAnimations({subtree:true}).forEach(a=>{if(a.playState==='running'){a.pause();paused.add(a);}});
    root.dataset.transition=scene?.kind??'return';document.querySelector('#main')?.setAttribute('aria-busy','true');cursor();
    try {
      if(!scene && !reduced.matches && desktop.matches && typeof Element.prototype.animate === 'function'){
        // Keep the active navigation letter visible while the scene contracts.
        await animate(shell.querySelector('.scene-identity')!,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.97)'}],240);
        if(ticket!==generation)return;
        reveal(undefined);
        await animate(home,[{opacity:0},{opacity:1}],180);
        if(ticket!==generation)return;
        commit(undefined);return;
      }
      if(!scene||reduced.matches||!desktop.matches||!Element.prototype.animate){
        if(typeof Element.prototype.animate === 'function')await animate(home.hidden?shell:home,[{opacity:1},{opacity:0}],reduced.matches?80:140);
        if(ticket!==generation)return;
        commit(scene);cleanup();reveal(scene);return;
      }
      await animate(layer,[{opacity:1},{opacity:1}],140);
      if(ticket!==generation)return;
      if(scene.kind==='type'){
        const {surface,box}=surfaceFor(source!,'type');
        const font=parseFloat(getComputedStyle(source!).fontSize);surface.style.fontSize=`${font}px`;
        const targetFont=Math.max(160,Math.min(innerWidth*.19,290));
        await animate(surface,[{transform:'translate(0,0) scale(1)'},{transform:`translate(${innerWidth*.15-box.x}px,${innerHeight*.29+36-box.y}px) scale(${targetFont/font})`}],340);
        if(ticket!==generation)return;reveal(scene);await animate(surface,[{opacity:1},{opacity:0}],100);
      }else if(scene.kind==='place'){
        const box=source!.getBoundingClientRect();const y=box.y+box.height*.62;
        const seam=document.createElement('div');seam.className='journey-seam';Object.assign(seam.style,{top:`${y}px`,transformOrigin:`${Math.min(innerWidth,box.x+box.width*.23)}px center`});layer.append(seam);
        await animate(seam,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],240);
        if(ticket!==generation)return;reveal(scene);
        await animate(shell,[{clipPath:`inset(${y}px 0 ${Math.max(0,innerHeight-y)}px 0)`},{clipPath:'inset(0% 0 0% 0)'}],220);
      }else{
        const {surface,box,clone,frame,frameSvg}=surfaceFor(source!,scene.kind);
        const inset=scene.kind==='archive'?24:0;
        // The fixed surface owns all geometry. The original hero never reflows.
        void animate(clone,[{opacity:1},{opacity:0}],45);
        if(frame)void animate(frame,[{transform:`translate(${box.x}px,${box.y}px) scale(1,1)`},{transform:`translate(${inset}px,${inset}px) scale(${(innerWidth-inset*2)/box.width},${(innerHeight-inset*2)/box.height})`}],360);
        await animate(surface,[{transform:'translate(0,0) scale(1,1)'},{transform:`translate(${inset-box.x}px,${inset-box.y}px) scale(${(innerWidth-inset*2)/box.width},${(innerHeight-inset*2)/box.height})`}],360);
        if(ticket!==generation)return;reveal(scene);
        if(frameSvg)void animate(frameSvg,[{opacity:1},{opacity:0}],120);
        await animate(surface,[{clipPath:'inset(0% 0% 0% 0%)'},{clipPath:'inset(0% 0% 100% 0%)'}],120);
      }
      if(ticket===generation)commit(scene);
    }catch(error){console.error('Scene transition fallback',error);if(ticket===generation){commit(scene);reveal(scene);}}
    finally{if(ticket===generation)cleanup();}
  }
  // Capture before artifact selection handlers: side cards select, active cards enter.
  document.addEventListener('click',event=>{
    if(busy){event.preventDefault();event.stopImmediatePropagation();return;}
    if(event.button!==0||event.ctrlKey||event.metaKey||event.altKey||event.shiftKey)return;
    const target=event.target as Element;
    const link=target.closest<HTMLElement>('a[data-scene]');
    if(link){event.preventDefault();event.stopImmediatePropagation();const targetScene=scenes.find(s=>s.id===link.dataset.scene);void navigate(targetScene?letterDestination(targetScene,current):undefined,link);return;}
    if(home.hidden)return;
    if(!desktop.matches || matchMedia('(hover:none), (pointer:coarse)').matches){
      const letter=target.closest<HTMLElement>('[data-world]');
      if(letter?.getAttribute('aria-pressed')==='true'){
        event.preventDefault();event.stopImmediatePropagation();
        void navigate(scenes.find(s=>s.id===letter.dataset.world),letter);
      }
      return;
    }
    const trigger=target.closest<HTMLElement>('[data-world],[data-identity],.journey-node,[data-sheet],[data-social-card],[data-life-photo],[data-archive-drawer],[data-portfolio]');
    if(!trigger)return;
    if(trigger.matches('[data-social-card],[data-life-photo]')&&trigger.getAttribute('aria-pressed')!=='true')return;
    event.preventDefault();event.stopImmediatePropagation();
    const id=trigger.closest<HTMLElement>('[data-letter-world]')?.dataset.letterWorld;
    void navigate(scenes.find(s=>s.id===id),trigger);
  },true);
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&busy){event.preventDefault();generation++;cleanup();reveal(current);origin?.focus({preventScroll:true});return;}
    const target=event.target as HTMLElement;
    if((event.code==='Space'&&target.matches('a[data-scene]'))||((event.key==='Enter'||event.code==='Space')&&target.matches('[data-portfolio]'))){event.preventDefault();target.click();}
  });
  document.addEventListener('keydown',event=>{if(busy && event.key!=='Escape'){event.preventDefault();event.stopImmediatePropagation();}},true);
  document.addEventListener('wheel',event=>{if(busy){event.preventDefault();event.stopImmediatePropagation();}},{capture:true,passive:false});
  window.addEventListener('popstate',()=>{generation++;cleanup();current=sceneAt(location.pathname);reveal(current);});
  document.addEventListener('thishi:language',()=>reveal(current,false));
  reveal(current,false);
}







document.querySelectorAll<HTMLButtonElement>('[data-archive-drawer]').forEach(drawer=>{
  const state=()=>drawer.setAttribute('aria-expanded',String(drawer.matches(':hover,:focus')));
  drawer.addEventListener('pointerenter',state);
  drawer.addEventListener('pointerleave',state);
  drawer.addEventListener('focus',state);
  drawer.addEventListener('blur',state);
  drawer.addEventListener('click',()=>{if(drawer.dataset.href)location.assign(drawer.dataset.href);});
});

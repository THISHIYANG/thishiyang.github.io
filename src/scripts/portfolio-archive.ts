const index = document.querySelector<HTMLDetailsElement>('[data-portfolio-index]');
if (index) {
  const compact = matchMedia('(max-width: 760px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const sync = () => { index.open = !compact.matches; };
  sync(); compact.addEventListener('change', sync);
  const chapters = [...document.querySelectorAll<HTMLElement>('[data-portfolio-chapter]')];
  const projects = [...document.querySelectorAll<HTMLElement>('[data-portfolio-project]')];
  let scheduled = false;
  function update() {
    scheduled = false;
    const line = Math.min(innerHeight * .3, 210);
    const active = <T extends HTMLElement>(items:T[]) => items.filter(item => item.getBoundingClientRect().top <= line).at(-1);
    const chapter = active(chapters) ?? chapters[0];
    const project = active(projects);
    document.querySelectorAll<HTMLAnchorElement>('[data-chapter-link]').forEach(link => {
      const selected=link.dataset.chapterLink===chapter?.dataset.portfolioChapter;
      if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });
    document.querySelectorAll<HTMLAnchorElement>('[data-project-link]').forEach(link => {
      const selected=link.dataset.projectLink===project?.dataset.workId&&project?.closest('[data-portfolio-chapter]')===chapter;
      if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });
  }
  const request = () => { if(!scheduled){scheduled=true;requestAnimationFrame(update);} };
  addEventListener('scroll',request,{passive:true});addEventListener('resize',request);
  document.querySelector('[data-portfolio-document]')?.addEventListener('click', event => {
    const link=(event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if(!link || event instanceof MouseEvent && (event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0))return;
    const target=document.getElementById(link.hash.slice(1));if(!target)return;
    event.preventDefault();if(compact.matches&&link.closest('.pa-index'))index.open=false;
    target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
    history.replaceState(null,'',link.hash);
    target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
  });
  update();
}

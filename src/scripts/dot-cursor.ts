// One overlay and event pipeline; components never manage cursors.
export function setupPointer() {
const dot = document.querySelector<HTMLElement>('[data-dot-pointer]');
if (!dot || !window.requestAnimationFrame) return;
// Keep the custom pointer above CRT filters and floating UI panels.
document.body.appendChild(dot);
const supported = matchMedia('(min-width:601px) and (hover:hover) and (pointer:fine)');
const reduced = matchMedia('(prefers-reduced-motion:reduce)');
let targetX=0, targetY=0, x=0, y=0, frame=0, visible=false, failed=false;
const interactive = 'a[href],button:not(:disabled),[role="button"],[data-cursor="interactive"],.portrait-proof,[data-portfolio],[data-social-carousel],[data-life-album]';
const native = 'input,textarea,select,[contenteditable]:not([contenteditable="false"]),[data-native-cursor]';
function hide() {
visible=false; cancelAnimationFrame(frame); frame=0;
dot!.hidden=true; document.documentElement.removeAttribute('data-dot-ready');
}
function state() {
dot!.dataset.state = document.documentElement.hasAttribute('data-transition') ? 'loading'
: document.elementFromPoint(targetX,targetY)?.closest(interactive) ? 'interactive' : 'idle';
}
function draw() {
frame=0; if (!visible) return;
try {
const amount=reduced.matches?1:.82;
x+=(targetX-x)*amount; y+=(targetY-y)*amount;
dot!.style.transform=`translate3d(${x-9}px,${y-9}px,0)`;
dot!.hidden=false; state();
if (getComputedStyle(dot!).display!=='none' && dot!.getBoundingClientRect().width>0) document.documentElement.setAttribute('data-dot-ready','');
else { hide(); return; }
if(Math.abs(targetX-x)+Math.abs(targetY-y)>.1) frame=requestAnimationFrame(draw);
} catch {failed=true;hide();}
}
document.addEventListener('pointermove',event=>{
if(failed||!supported.matches||event.pointerType!=='mouse'||(event.target as Element).closest(native)){hide();return;}
targetX=event.clientX;targetY=event.clientY;
if(!visible){x=targetX;y=targetY;} visible=true;
if(!frame)frame=requestAnimationFrame(draw);
},{passive:true});
document.addEventListener('focusin',event=>{if((event.target as Element).closest(native))hide();});
document.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse')hide();});
document.documentElement.addEventListener('pointerleave',hide);
window.addEventListener('blur',hide);window.addEventListener('pagehide',hide);
document.addEventListener('visibilitychange',()=>{if(document.hidden)hide();});
document.addEventListener('thishi:transition-state',state);
supported.addEventListener('change',hide);
}


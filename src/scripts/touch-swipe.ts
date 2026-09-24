// Shared touch gesture handling; the existing components own their content and state.
export function onSwipe(element: HTMLElement, axis: 'x'|'y', advance: (step:number)=>void) {
  let start: { id:number; x:number; y:number } | undefined;
  let suppressClick=false;
  element.addEventListener('pointerdown', event=>{
    if(event.pointerType==='mouse' || !event.isPrimary)return;
    start={id:event.pointerId,x:event.clientX,y:event.clientY};suppressClick=false;

  });
  element.addEventListener('pointerup', event=>{
    if(!start || event.pointerId!==start.id)return;
    const dx=start.x-event.clientX,dy=start.y-event.clientY;
    start=undefined;
    const distance=axis==='x'?dx:dy,other=axis==='x'?dy:dx;
    if(Math.abs(distance)>=28 && Math.abs(distance)>Math.abs(other)){
      suppressClick=true;advance(Math.sign(distance));
    }
    if(element.hasPointerCapture(event.pointerId))element.releasePointerCapture(event.pointerId);
  });
  element.addEventListener('pointercancel',()=>{start=undefined;suppressClick=false;});
  element.addEventListener('click',event=>{
    if(suppressClick){event.preventDefault();event.stopImmediatePropagation();suppressClick=false;}
  },true);
}

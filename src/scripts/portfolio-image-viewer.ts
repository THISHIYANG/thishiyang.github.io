const viewer=document.querySelector<HTMLDialogElement>('[data-portfolio-viewer]');
const image=viewer?.querySelector<HTMLImageElement>('[data-viewer-image]');
const title=viewer?.querySelector<HTMLElement>('[data-viewer-title]');
if(viewer&&image&&title){
  let opener:HTMLButtonElement|undefined;
  let position={x:0,y:0};
  // The existing native-cursor opt-out keeps the pointer visible in the modal top layer.
  document.querySelector('[data-portfolio-document]')?.addEventListener('click',event=>{
    const button=(event.target as Element).closest<HTMLButtonElement>('[data-artwork-open]');
    if(!button||viewer.open)return;
    const src=button.dataset.artworkSrc;if(!src)return;
    opener=button;position={x:scrollX,y:scrollY};
    image.src=src;image.alt=button.querySelector('img')?.alt??'';
    title.textContent=button.dataset.artworkTitle??'ARTWORK';
    viewer.showModal();
  });
  viewer.querySelector('[data-viewer-close]')?.addEventListener('click',()=>viewer.close());
  viewer.addEventListener('click',event=>{
    if(event.target!==viewer)return;
    const box=viewer.getBoundingClientRect();
    if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)viewer.close();
  });
  viewer.addEventListener('close',()=>{
    image.removeAttribute('src');image.alt='';
    window.scrollTo({left:position.x,top:position.y,behavior:'instant'});
    opener?.focus({preventScroll:true});
  });
}

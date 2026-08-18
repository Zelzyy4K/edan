let activeClose=null;
export function closeModal(){ document.querySelector('#modal-root').innerHTML=''; activeClose=null; }
export function openModal({title,content,actions=[],closeOnBackdrop=true}){
  closeModal();
  const root=document.querySelector('#modal-root');
  root.innerHTML=`<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><h3 id="modal-title">${title}</h3><button class="icon-btn" id="modal-x" aria-label="Close"><i data-lucide="x"></i></button></div><div class="modal-body">${content}</div><div class="modal-actions">${actions.map((a,i)=>`<button class="btn ${a.variant||'btn-secondary'}" data-action="${i}">${a.label}</button>`).join('')}</div></div></div>`;
  window.lucide?.createIcons();
  const backdrop=root.firstElementChild;
  activeClose=closeModal;
  root.querySelector('#modal-x').onclick=closeModal;
  if(closeOnBackdrop) backdrop.onclick=e=>{if(e.target===backdrop) closeModal();};
  actions.forEach((a,i)=>root.querySelector(`[data-action="${i}"]`).onclick=()=>a.onClick?.());
}
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&activeClose)activeClose();});

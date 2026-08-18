export function toast(message, type='info', duration=3200){
  const root=document.querySelector('#toast-root');
  const el=document.createElement('div');
  el.className=`toast toast-${type}`;
  const icon={success:'check-circle-2',error:'x-circle',warning:'triangle-alert',info:'info'}[type]||'info';
  el.innerHTML=`<i data-lucide="${icon}"></i><span>${message}</span><button class="icon-btn toast-close" aria-label="Close notification"><i data-lucide="x"></i></button>`;
  root.appendChild(el); window.lucide?.createIcons();
  el.querySelector('.toast-close').onclick=()=>el.remove();
  setTimeout(()=>el.remove(),duration);
}

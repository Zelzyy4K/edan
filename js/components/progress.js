import {openModal,closeModal} from './modal.js';
export function runProgress({title='Processing',steps,duration=650,onComplete}){
  let index=0, cancelled=false;
  openModal({title,content:`<div class="progress-wrap"><div class="progress-label"><span id="progress-step">Preparing...</span><span id="progress-percent">0%</span></div><div class="progress"><div id="progress-bar" class="progress-bar"></div></div><div class="step-list" id="step-list"></div></div>`,actions:[{label:'Cancel',variant:'btn-secondary',onClick:()=>{cancelled=true;closeModal();}}]});
  const tick=()=>{
    if(cancelled)return;
    const step=steps[index];
    if(!step){ document.querySelector('#progress-step').textContent='Completed'; document.querySelector('#progress-percent').textContent='100%'; document.querySelector('#progress-bar').style.width='100%'; setTimeout(()=>{closeModal();onComplete?.();},450); return; }
    document.querySelector('#progress-step').textContent=step;
    document.querySelector('#progress-percent').textContent=Math.round((index/steps.length)*100)+'%';
    document.querySelector('#progress-bar').style.width=Math.round((index/steps.length)*100)+'%';
    const row=document.createElement('div'); row.className='step-row'; row.innerHTML=`<i data-lucide="check"></i>${step}`; document.querySelector('#step-list').appendChild(row); window.lucide?.createIcons();
    index++; setTimeout(tick,duration);
  }; tick();
}

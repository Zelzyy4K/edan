import { state, setState, resetState } from './state.js';
const KEY = 'sgt-prototype-v1';
export function loadState(){
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if(saved) setState(saved);
  } catch(e){ console.warn('Could not load local demo data', e); }
}
export function saveState(next=state){ localStorage.setItem(KEY, JSON.stringify(next)); }
export function clearStorage(){ localStorage.removeItem(KEY); resetState(); saveState(); }
export function exportData(){
  const blob = new Blob([JSON.stringify(state,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='steam-game-tools-settings.json'; a.click(); URL.revokeObjectURL(url);
}
export function importData(file){
  return file.text().then(text => { const data=JSON.parse(text); setState(data); saveState(data); });
}

import {updateState} from '../state.js';
import {toast} from './toast.js';
export function gameCard(game,{onOpen,onDetails}={}){
  const el=document.createElement('article'); el.className='game-card';
  el.innerHTML=`<div class="game-cover" style="background:${game.cover}"><span class="cover-mark">${game.name.split(/\s+/).slice(0,2).map(x=>x[0]).join('')}</span><button class="icon-btn favorite ${game.favorite?'is-favorite':''}" aria-label="Toggle favorite"><i data-lucide="star"></i></button></div><div class="game-info"><div><h3>${game.name}</h3><p>Steam App ID: ${game.appId}</p></div><span class="badge ${game.status==='Needs Fix'?'badge-warning':game.status==='Not Installed'?'badge-muted':game.status==='Backup Available'?'badge-info':'badge-success'}">${game.status}</span></div><div class="game-meta"><span>${game.installed?'Installed':'Not installed'}</span><span>${game.lastActivity}</span></div><div class="game-actions"><button class="btn btn-secondary btn-sm open">Open</button><button class="btn btn-primary btn-sm details">Details</button></div>`;
  el.querySelector('.favorite').onclick=()=>{updateState(s=>{const g=s.games.find(x=>x.id===game.id);g.favorite=!g.favorite;});toast(game.favorite?'Removed from favorites':'Added to favorites','success');};
  el.querySelector('.open').onclick=()=>onOpen?.(game);
  el.querySelector('.details').onclick=()=>onDetails?.(game);
  window.lucide?.createIcons({nodes:[el]});
  return el;
}

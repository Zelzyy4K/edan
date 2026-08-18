import {state} from '../state.js';
import {toast} from '../components/toast.js';
import {runProgress} from '../components/progress.js';
import {navigate} from '../router.js';
import {steamService} from '../services/mockSteam.js';

export function renderHome(){
 const inject=state.logs.filter(x=>x.type==='Injection').length, bypass=state.logs.filter(x=>x.type==='Bypass').length;
 const root=document.createElement('div');
 root.innerHTML=`<div class="page-head"><div><span class="eyebrow">Overview</span><h1>Good evening</h1><p>Manage your Steam games and tools from one place.</p></div></div>
 <div class="stats-grid">${stat('History Inject',inject,'syringe','accent')}${stat('History Bypass',bypass,'shield-check','warning')}${stat('Total Games',state.games.length,'gamepad-2','info')}${stat('Total Backups',state.backups.length,'archive','success')}</div>
 <div class="dashboard-grid"><section class="panel"><div class="panel-head"><div><h2>Recent Activity</h2><p>Latest actions from this prototype.</p></div><button class="btn btn-ghost btn-sm" data-route="logs">View all</button></div><div class="activity-list">${state.logs.slice(0,5).map(logRow).join('')}</div></section><section class="panel"><div class="panel-head"><div><h2>Quick Actions</h2><p>Common maintenance workflows.</p></div></div><div class="quick-grid"><button class="quick-action" data-action="scan"><i data-lucide="scan-search"></i><span>Scan Steam Library</span><small>Discover demo games</small></button><button class="quick-action" data-action="backup"><i data-lucide="archive"></i><span>Create Backup</span><small>Protect game data</small></button><button class="quick-action" data-action="verify"><i data-lucide="badge-check"></i><span>Verify Game</span><small>Run simulated check</small></button><button class="quick-action" data-action="steam"><i data-lucide="refresh-cw"></i><span>Restart Steam</span><small>Simulated process</small></button></div></section></div>`;
 root.querySelector('[data-route]').onclick=()=>navigate('logs');
 root.querySelector('[data-action="scan"]').onclick=()=>runProgress({title:'Scanning Steam Library',steps:['Reading demo library paths...','Discovering installed games...','Checking installation states...','Updating library index...'],onComplete:()=>toast('Steam library scan completed','success')});
 root.querySelector('[data-action="backup"]').onclick=()=>navigate('save');
 root.querySelector('[data-action="verify"]').onclick=()=>navigate('fix');
 root.querySelector('[data-action="steam"]').onclick=()=>runProgress({title:'Restart Steam',steps:['Stopping Steam...','Waiting...','Starting Steam...','Checking status...'],onComplete:async()=>{await steamService.restart();toast('Steam restart simulation completed','success')}});
 window.lucide?.createIcons({nodes:[root]});
 return {element:root};
}
function stat(label,value,icon,tone){return `<div class="stat-card"><div class="stat-icon ${tone}"><i data-lucide="${icon}"></i></div><div><span>${label}</span><strong>${value}</strong></div></div>`}
function logRow(x){return `<div class="activity-row"><div class="activity-dot ${x.status}"></div><div class="activity-main"><strong>${x.game}</strong><span>${x.action}</span></div><div class="activity-time">${x.time}</div></div>`}

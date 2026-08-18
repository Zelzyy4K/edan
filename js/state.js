export const defaultGames = [
  { id:'cyberpunk-2077', name:'Cyberpunk 2077', appId:'1091500', installed:true, status:'Ready', favorite:true, lastActivity:'2 minutes ago', path:'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Cyberpunk 2077', cover:'linear-gradient(135deg,#27223f,#7c5cff)' },
  { id:'batman-arkham-city', name:'Batman: Arkham City', appId:'200260', installed:true, status:'Needs Fix', favorite:false, lastActivity:'25 minutes ago', path:'C:\\Games\\Steam\\steamapps\\common\\Batman Arkham City', cover:'linear-gradient(135deg,#16191f,#394452)' },
  { id:'ac-origins', name:"Assassin's Creed Origins", appId:'582160', installed:true, status:'Ready', favorite:true, lastActivity:'Yesterday', path:'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Assassins Creed Origins', cover:'linear-gradient(135deg,#292114,#8c6d38)' },
  { id:'gta-v', name:'Grand Theft Auto V', appId:'271590', installed:true, status:'Ready', favorite:false, lastActivity:'2 days ago', path:'D:\\SteamLibrary\\steamapps\\common\\Grand Theft Auto V', cover:'linear-gradient(135deg,#171b19,#4e6b58)' },
  { id:'witcher-3', name:'The Witcher 3', appId:'292030', installed:true, status:'Backup Available', favorite:false, lastActivity:'3 days ago', path:'D:\\SteamLibrary\\steamapps\\common\\The Witcher 3', cover:'linear-gradient(135deg,#20242c,#6d7585)' },
  { id:'rdr2', name:'Red Dead Redemption 2', appId:'1174180', installed:false, status:'Not Installed', favorite:false, lastActivity:'Never', path:'-', cover:'linear-gradient(135deg,#271d19,#855541)' },
  { id:'spider-man', name:"Marvel's Spider-Man Remastered", appId:'1817070', installed:true, status:'Ready', favorite:false, lastActivity:'4 days ago', path:'D:\\SteamLibrary\\steamapps\\common\\Marvels Spider-Man Remastered', cover:'linear-gradient(135deg,#1d2537,#5577b8)' }
];

export const defaultState = {
  games: defaultGames,
  logs: [
    { id:1, time:'21:43', game:'Cyberpunk 2077', action:'Backup Created', type:'Backup', status:'success', detail:'Local backup simulation completed.' },
    { id:2, time:'21:31', game:'Steam', action:'Steam Restart Simulation', type:'Steam', status:'success', detail:'Steam process restart simulated.' },
    { id:3, time:'20:54', game:'Batman: Arkham City', action:'File Verification', type:'Fix', status:'warning', detail:'3 simulated file issues detected.' }
  ],
  backups: [
    { id:1, gameId:'witcher-3', game:'The Witcher 3', name:'Witcher 3 Save Backup', date:'2026-08-15 18:20', size:'1.42 GB', location:'Local Demo Storage', status:'Verified' },
    { id:2, gameId:'cyberpunk-2077', game:'Cyberpunk 2077', name:'Cyberpunk Manual Backup', date:'2026-08-18 21:43', size:'842 MB', location:'Local Demo Storage', status:'Verified' }
  ],
  tools: { gameIntegration:false, fileAccess:true, compatibility:false },
  steam: { running:true, path:'C:\\Program Files (x86)\\Steam' },
  settings: { appearance:'dark', accent:'#7C5CFF', compact:false, animations:true, startPage:'home', autoScan:true, confirmActions:true, notificationDuration:3200, debug:false, mockMode:true },
  ui: { sidebarCollapsed:false }
};

export let state = structuredClone(defaultState);
export const subscribers = new Set();
export function setState(patch){
  state = { ...state, ...patch };
  subscribers.forEach(fn => fn(state));
}
export function updateState(mutator){
  const next = structuredClone(state);
  mutator(next);
  state = next;
  subscribers.forEach(fn => fn(state));
}
export function subscribe(fn){ subscribers.add(fn); return () => subscribers.delete(fn); }
export function resetState(){ state = structuredClone(defaultState); subscribers.forEach(fn => fn(state)); }

import {updateState} from '../state.js';
export const steamService={
  async status(){await wait(350);return {running:true};},
  async restart(onProgress){for(const s of ['Stopping Steam...','Waiting for process shutdown...','Starting Steam...','Checking status...']){onProgress?.(s);await wait(500);}updateState(s=>{s.steam.running=true;s.logs.unshift({id:Date.now(),time:now(),game:'Steam',action:'Steam Restart Simulation',type:'Steam',status:'success',detail:'Steam process restart simulated.'});});return {success:true};},
  async scanLibrary(){await wait(900);return {success:true,count:7};}
};
const wait=ms=>new Promise(r=>setTimeout(r,ms)); const now=()=>new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

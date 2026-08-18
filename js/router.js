const routes = new Map();
let current = '';
export function registerRoute(path, renderer){ routes.set(path, renderer); }
export function navigate(path, params={}){
  const target = routes.has(path) ? path : 'home';
  current = target;
  history.replaceState({path:target,params},'',`#${target}`);
  window.dispatchEvent(new CustomEvent('routechange',{detail:{path:target,params}}));
  return routes.get(target);
}
export function getCurrentRoute(){ return current || location.hash.replace('#','') || 'home'; }
export function initRouter(){ window.addEventListener('popstate',()=>navigate(getCurrentRoute())); }

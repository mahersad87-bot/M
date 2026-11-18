const C='maher-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','manifest.json','icon-192.png']).catch(()=>{})))});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
const put=res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res};
if(r.mode==='navigate')e.respondWith(fetch(r).then(put).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));
else e.respondWith(caches.match(r).then(m=>m||fetch(r).then(put)))});

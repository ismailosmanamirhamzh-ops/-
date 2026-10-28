/*! © 2026 Ismueil Osman (إسماعيل عثمان) — ismueilosman.com. All rights reserved. */
/* خاص بالتطبيق فقط (/app/): يحفظ الصفحات والصور بعد أول فتح، ويعرض صفحة بديلة لو انقطع النت. ما يأثر على الموقع الرسمي. */
const V = 'io-app-2';
const CORE = ['/app/', '/app/order/', '/app/check/', '/app/offline.html', '/assets/img/app-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin || r.headers.has('range') || /\.(mp4|webm|pdf)$/i.test(u.pathname)) return;
  if (r.mode === 'navigate') {
    if (!u.pathname.startsWith('/app/')) return;
    e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); return res; })
      .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('/app/offline.html'))));
    return;
  }
  if (/\.(css|js|webp|png|jpg|jpeg|svg|ico|woff2?)$/i.test(u.pathname)) {
    e.respondWith(caches.open(V).then(c => c.match(r).then(m => {
      const net = fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res; }).catch(() => m);
      return m || net;
    })));
  }
});

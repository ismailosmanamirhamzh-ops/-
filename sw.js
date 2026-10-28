/*! © 2026 Ismueil Osman (إسماعيل عثمان) — ismueilosman.com. All rights reserved. */
/* تطبيق الموقع: يحفظ الصفحات والصور بعد أول زيارة، فيفتح أسرع، ويعرض صفحة بديلة لو انقطع النت */
const V = 'io-20261028a';
const CORE = ['/offline.html', '/assets/img/app-192.png', '/assets/img/app-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin || r.headers.has('range') || /\.(mp4|webm|pdf)$/i.test(u.pathname)) return;
  if (r.mode === 'navigate') {
    /* الصفحات: من النت أولًا (أحدث نسخة دايمًا)، ولو ما فيه نت من المحفوظ */
    e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); return res; })
      .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('/offline.html'))));
    return;
  }
  if (/\.(css|js|webp|png|jpg|jpeg|svg|ico|woff2?)$/i.test(u.pathname)) {
    /* الملفات الثابتة: من المحفوظ فورًا، ونحدّثها بالخلفية */
    e.respondWith(caches.open(V).then(c => c.match(r).then(m => {
      const net = fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res; }).catch(() => m);
      return m || net;
    })));
  }
});

/*! © 2026 Ismueil Osman (إسماعيل عثمان) — ismueilosman.com. All rights reserved. */
/* خاص بالتطبيق فقط (/app/): يحفظ الصفحات والصور بعد أول فتح، ويعرض صفحة بديلة لو انقطع النت. ما يأثر على الموقع الرسمي. */
const V = 'io-app-4';
const CORE = ['/app/', '/app/order/', '/app/check/', '/app/prices/', '/app/offline.html', '/app/splash.js?v=1', '/assets/img/app-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V && k !== 'io-app-data').map(k => caches.delete(k)))).then(() => self.clients.claim())); });
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

/* تنبيهات الطلبات بالخلفية (أندرويد بعد تثبيت التطبيق وتفعيل التنبيهات) */
const GS = 'https://script.google.com/macros/s/AKfycbw0Nvt6rPQ2l_KJ5o8XXgzud4ehrnEEkDOWRf7wEuUlxS8MWmKbkWCyTJPrkJMRrzbjmw/exec';
const MSG = { 'قيد التنفيذ': '🔵 بدأت أشتغل على طلبك', 'تم التسليم': '🟢 طلبك جاهز! افتح «طلباتي» واستلم ملفاتك', 'ملغي': 'طلبك انلغى، كلمني واتساب لو تبغى نرتب موعد ثاني' };
async function checkOrders() {
  const c = await caches.open('io-app-data');
  const m = await c.match('/app/__orders.json'); if (!m) return;
  const list = await m.json(); if (!list.length) return;
  const j = await (await fetch(GS + '?ids=' + list.map(o => o.id).join(','))).json();
  if (!j || !j.status) return;
  for (const o of list) {
    const ns = j.status[o.id];
    if (ns && o.st && ns !== o.st && MSG[ns]) await self.registration.showNotification('إسماعيل عثمان', { body: MSG[ns] + ' — ' + o.s, icon: '/assets/img/app-192.png', badge: '/assets/img/app-192.png', tag: 'io-' + o.id, data: { url: '/app/order/#my' } });
    if (ns) o.st = ns;
  }
  await c.put('/app/__orders.json', new Response(JSON.stringify(list), { headers: { 'Content-Type': 'application/json' } }));
}
self.addEventListener('periodicsync', e => { if (e.tag === 'io-orders') e.waitUntil(checkOrders().catch(() => {})); });
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/app/';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
    for (const w of ws) if (w.url.indexOf('/app/') > -1 && 'focus' in w) { w.navigate(url); return w.focus(); }
    return self.clients.openWindow(url);
  }));
});

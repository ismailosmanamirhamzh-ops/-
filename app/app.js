/*! © 2026 Ismueil Osman (إسماعيل عثمان) — ismueilosman.com. All rights reserved. */
/* تطبيق إسماعيل عثمان: الشريط السفلي + زر التثبيت + التشغيل بدون نت. خاص بصفحات /app/ فقط. */
(function () {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    addEventListener('load', function () { navigator.serviceWorker.register('/app/sw.js', { scope: '/app/' }).catch(function () {}); });
  }
  var standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (standalone) document.documentElement.classList.add('is-app');
  var en = document.documentElement.lang === 'en', P = location.pathname, H = location.hash;
  var ls = function (k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} };

  /* الشريط السفلي */
  var I = {
    home: 'M12 3 2 11h3v9h6v-6h2v6h6v-9h3z',
    svc: 'M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z',
    work: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4h-4z',
    add: 'M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z',
    wa: 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.2-.7-2.7-1.1-4.4-3.8-4.6-4-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z'
  };
  var items = [
    ['/app/', 'home', en ? 'Home' : 'الرئيسية', P === '/app/' && H !== '#services' && H !== '#work'],
    ['/app/#services', 'svc', en ? 'Services' : 'الخدمات', P === '/app/' && H === '#services'],
    ['/app/order/', 'add', en ? 'Order' : 'اطلب خدمة', /^\/app\/order/.test(P), 1],
    ['/app/#work', 'work', en ? 'My work' : 'أعمالي', P === '/app/' && H === '#work'],
    ['https://wa.me/966574395924', 'wa', en ? 'WhatsApp' : 'واتساب', false]
  ];
  var st = document.createElement('style');
  st.textContent = '.tbar{position:fixed;left:0;right:0;bottom:0;z-index:8000;display:grid;grid-template-columns:repeat(5,1fr);align-items:end;padding:.35rem .4rem calc(.35rem + env(safe-area-inset-bottom,0px));background:rgba(9,10,15,.94);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border-top:1px solid rgba(255,255,255,.08)}.tbar a{display:flex;flex-direction:column;align-items:center;gap:.15rem;text-decoration:none;color:#9aa1b2;font:700 .68rem Tajawal,system-ui,sans-serif;padding:.3rem 0;-webkit-tap-highlight-color:transparent}.tbar a svg{width:1.45rem;height:1.45rem;fill:currentColor}.tbar a.on{color:#f2b45a}.tbar a.tbw{color:#25d366}.tbar a.mid span.c{width:3.1rem;height:3.1rem;margin-top:-1.4rem;border-radius:50%;display:grid;place-items:center;background:#f2b45a;color:#111;box-shadow:0 8px 22px rgba(242,180,90,.35),0 0 0 5px #090a0f}.tbar a.mid{color:#f2b45a}body{padding-bottom:calc(4.6rem + env(safe-area-inset-bottom,0px))}'
    + '.appx{position:fixed;left:50%;bottom:calc(5.2rem + env(safe-area-inset-bottom,0px));z-index:8500;display:flex;align-items:center;gap:.55rem;transform:translate(-50%,40px);opacity:0;pointer-events:none;transition:transform .5s cubic-bezier(.2,1.2,.3,1),opacity .3s;background:rgba(10,11,16,.95);border:1px solid rgba(242,180,90,.5);border-radius:999px;padding:.4rem .45rem .4rem .9rem;box-shadow:0 10px 30px rgba(0,0,0,.45);font:700 .88rem Tajawal,system-ui,sans-serif;color:#eceef4;white-space:nowrap}.appx.on{transform:translate(-50%,0);opacity:1;pointer-events:auto}.appx img{width:28px;height:28px;border-radius:8px}.appx b{background:#f2b45a;color:#111;border-radius:999px;padding:.45rem .9rem;cursor:pointer;font-weight:800}.appx i{font-style:normal;cursor:pointer;opacity:.6;padding:0 .35rem;font-size:1.1rem}.appsh{position:fixed;inset:0;z-index:9001;background:rgba(0,0,0,.55);display:grid;align-items:end}.appsh>div{background:#10121a;border-top:1px solid rgba(242,180,90,.35);border-radius:22px 22px 0 0;padding:1.4rem 1.3rem calc(1.4rem + env(safe-area-inset-bottom,0px));color:#eceef4;font:500 1rem/1.9 Tajawal,system-ui,sans-serif}.appsh h3{font:900 1.2rem Cairo,system-ui,sans-serif;margin:0 0 .6rem}.appsh ol{margin:0 0 1rem;padding-inline-start:1.2rem}.appsh button{width:100%;background:#f2b45a;color:#111;border:0;border-radius:999px;padding:.8rem;font:800 1rem Tajawal,system-ui,sans-serif}';
  document.head.appendChild(st);
  var nav = document.createElement('nav'); nav.className = 'tbar'; nav.setAttribute('aria-label', en ? 'App navigation' : 'تنقل التطبيق');
  items.forEach(function (it) {
    var a = document.createElement('a'); a.href = it[0]; if (it[3]) a.classList.add('on'); if (it[1] === 'wa') { a.classList.add('tbw'); a.target = '_blank'; a.rel = 'noopener'; }
    var svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + I[it[1]] + '"/></svg>';
    if (it[4]) { a.classList.add('mid'); a.innerHTML = '<span class="c">' + svg + '</span>'; } else a.innerHTML = svg;
    var t = document.createElement('span'); t.textContent = it[2]; a.appendChild(t); nav.appendChild(a);
    if (it[0].indexOf('#') > -1) a.addEventListener('click', function () { setTimeout(mark, 30); });
  });
  document.body.appendChild(nav);
  function mark() { var h = location.hash; [].forEach.call(nav.children, function (a, i) { a.classList.toggle('on', i === 0 ? (P === '/app/' && h !== '#services' && h !== '#work') : i === 1 ? h === '#services' : i === 3 ? h === '#work' : i === 2 ? /^\/app\/order/.test(P) : false); }); }
  addEventListener('hashchange', mark);

  /* زر «ثبّت التطبيق» */
  if (standalone) return;
  if (Date.now() - (+ls('appNo') || 0) < 7 * 864e5) return;
  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !/crios|fxios/i.test(navigator.userAgent);
  var deferred = null, shown = false;
  function close() { ls('appNo', Date.now()); var e = document.querySelector('.appx'); if (e) { e.classList.remove('on'); setTimeout(function () { e.remove(); }, 600); } }
  function sheet() {
    var d = document.createElement('div'); d.className = 'appsh'; d.setAttribute('role', 'dialog');
    d.innerHTML = en
      ? '<div dir="ltr"><h3>Install the app</h3><ol><li>Tap the <b>Share</b> button in Safari.</li><li>Choose <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>.</li></ol><button type="button">Got it</button></div>'
      : '<div><h3>ثبّت التطبيق على جوالك</h3><ol><li>اضغط زر <b>المشاركة</b> في سفاري (المربع والسهم).</li><li>اختر <b>إضافة إلى الشاشة الرئيسية</b>.</li><li>اضغط <b>إضافة</b>.</li></ol><button type="button">تمام</button></div>';
    d.addEventListener('click', function (ev) { if (ev.target === d || ev.target.tagName === 'BUTTON') { d.remove(); close(); } });
    document.body.appendChild(d);
  }
  function show() {
    if (shown) return; shown = true;
    var b = document.createElement('div'); b.className = 'appx';
    b.innerHTML = '<img src="/assets/img/app-192.png" alt=""><span>' + (en ? 'Get the app' : 'ثبّت التطبيق على جوالك') + '</span><b role="button" tabindex="0">' + (en ? 'Install' : 'ثبّت') + '</b><i role="button" tabindex="0" aria-label="' + (en ? 'Close' : 'إغلاق') + '">×</i>';
    b.querySelector('b').addEventListener('click', function () { if (deferred) { deferred.prompt(); deferred.userChoice.then(function () { deferred = null; close(); }); } else sheet(); });
    b.querySelector('i').addEventListener('click', close);
    document.body.appendChild(b); setTimeout(function () { b.classList.add('on'); }, 50);
  }
  addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; setTimeout(show, 5000); });
  addEventListener('appinstalled', close);
  if (ios) setTimeout(show, 5000);
})();

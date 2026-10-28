/*! © 2026 Ismueil Osman (إسماعيل عثمان) — ismueilosman.com. All rights reserved. Unauthorized copying or reuse is prohibited. */
/* تفاعلات صغيرة: أزرار مغناطيسية، ميلان البطاقات، ظهور العناوين، خط تحت الروابط.
   تشتغل فقط مع الماوس (الكمبيوتر)، وتتوقف كليًا مع «تقليل الحركة». */
/* تطبيق الموقع: تسجيل التشغيل بدون نت + زر «ثبّت التطبيق» */
(function () {
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    addEventListener('load', function () { navigator.serviceWorker.register('/sw.js').catch(function () {}); });
  }
  var standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (standalone) { document.documentElement.classList.add('is-app'); return; }
  var ls = function (k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} };
  var n = (+ls('visits') || 0) + 1; ls('visits', n);
  var off = +ls('appNo') || 0; if (Date.now() - off < 14 * 864e5) return;
  var en = document.documentElement.lang === 'en';
  var ua = navigator.userAgent, ios = /iphone|ipad|ipod/i.test(ua) && !/crios|fxios/i.test(ua);
  var deferred = null, shown = false;
  var css = document.createElement('style');
  css.textContent = '.appx{position:fixed;left:50%;bottom:calc(1rem + env(safe-area-inset-bottom,0px));z-index:9000;display:flex;align-items:center;gap:.55rem;transform:translate(-50%,160%);transition:transform .5s cubic-bezier(.2,1.2,.3,1);background:rgba(10,11,16,.92);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border:1px solid rgba(242,180,90,.5);border-radius:999px;padding:.4rem .45rem .4rem .9rem;box-shadow:0 10px 30px rgba(0,0,0,.45);font:700 .88rem Tajawal,system-ui,sans-serif;color:#eceef4;white-space:nowrap}.appx.on{transform:translate(-50%,0)}.appx img{width:28px;height:28px;border-radius:8px}.appx b{background:#f2b45a;color:#111;border-radius:999px;padding:.45rem .9rem;font-weight:800;cursor:pointer;border:0;font:inherit;font-weight:800}.appx i{font-style:normal;cursor:pointer;opacity:.6;padding:0 .35rem;font-size:1.1rem}.appsh{position:fixed;inset:0;z-index:9001;background:rgba(0,0,0,.55);display:grid;align-items:end}.appsh>div{background:#10121a;border-top:1px solid rgba(242,180,90,.35);border-radius:22px 22px 0 0;padding:1.4rem 1.3rem calc(1.4rem + env(safe-area-inset-bottom,0px));color:#eceef4;font:500 1rem/1.9 Tajawal,system-ui,sans-serif}.appsh h3{font:900 1.2rem Cairo,system-ui,sans-serif;margin:0 0 .6rem}.appsh ol{margin:0 0 1rem;padding-inline-start:1.2rem}.appsh button{width:100%;background:#f2b45a;color:#111;border:0;border-radius:999px;padding:.8rem;font:800 1rem Tajawal,system-ui,sans-serif}';
  document.head.appendChild(css);
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
    if (shown || n < 2) return; shown = true;
    var b = document.createElement('div'); b.className = 'appx'; b.setAttribute('role', 'region'); b.setAttribute('aria-label', en ? 'Install app' : 'تثبيت التطبيق');
    b.innerHTML = '<img src="/assets/img/app-192.png" alt=""><span>' + (en ? 'Get the app' : 'تطبيق إسماعيل عثمان') + '</span><b role="button" tabindex="0">' + (en ? 'Install' : 'ثبّت') + '</b><i role="button" tabindex="0" aria-label="' + (en ? 'Close' : 'إغلاق') + '">×</i>';
    b.querySelector('b').addEventListener('click', function () {
      if (deferred) { deferred.prompt(); deferred.userChoice.then(function () { deferred = null; close(); }); }
      else sheet();
    });
    b.querySelector('i').addEventListener('click', close);
    document.body.appendChild(b);
    setTimeout(function () { b.classList.add('on'); }, 50);
  }
  addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; setTimeout(show, 8000); });
  addEventListener('appinstalled', close);
  if (ios && !standalone) setTimeout(show, 8000);
})();
/* حماية: منع عرض الموقع داخل موقع ثاني (iframe)، وتنبيه حقوق في أدوات المطوّر */
(function () {
  try { if (window.top !== window.self && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) window.top.location = window.location.href; } catch (e) { document.documentElement.style.display = 'none'; }
  /* مساحة ضغط أكبر لروابط أسفل الصفحة في الجوال، بدون أي تغيير في شكلها */
  try {
    var hs = document.createElement('style');
    hs.textContent = '.foot a,.ft a,.pall{position:relative}.foot a::after,.ft a::after,.pall::after{content:"";position:absolute;inset:-10px -3px}';
    document.head.appendChild(hs);
  } catch (e) {}
  try {
    console.log('%c© Ismueil Osman', 'font:900 28px sans-serif;color:#f2b45a');
    console.log('%cجميع الحقوق محفوظة. تصميم الموقع وكوده وصوره ونصوصه ملك لإسماعيل عثمان، ويُمنع نسخها أو إعادة استخدامها دون إذن كتابي.\nAll rights reserved. The design, code, images and text of this site belong to Ismueil Osman and may not be copied or reused without written permission.', 'font:14px sans-serif');
  } catch (e) {}
})();
(function () {
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (reduce) return;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var css = document.createElement('style');
  css.textContent =
    '.fx-rv{clip-path:inset(-.2em -.2em 100% -.2em);transform:translateY(.35em);transition:clip-path 1s cubic-bezier(.2,.8,.2,1),transform 1s cubic-bezier(.2,.8,.2,1)}' +
    '.fx-rv.fx-in{clip-path:inset(-.2em -.2em -.3em -.2em);transform:none}' +
    '.fx-ul{background:linear-gradient(currentColor,currentColor) 100% 100%/0 1px no-repeat;transition:background-size .45s cubic-bezier(.2,.8,.2,1),color .25s;padding-bottom:2px}' +
    '[dir=ltr] .fx-ul{background-position:0 100%}' +
    '.fx-ul:hover,.fx-ul:focus-visible{background-size:100% 1px}' +
    '.fx-tilt{transition:transform .5s cubic-bezier(.2,.8,.2,1);transform-style:preserve-3d;will-change:transform}' +
    '.fx-mag{transition:translate .35s cubic-bezier(.2,.8,.2,1)}';
  document.head.appendChild(css);

  /* 1) ظهور العناوين سطرًا من تحت */
  var heads = [].slice.call(document.querySelectorAll('main h2, section > h2, .sh h2, .svx h2, .ps h2, .end h2, .cs-h h3, .sty-h h3, h2.text-3xl'));
  if ('IntersectionObserver' in window && heads.length) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('fx-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    heads.forEach(function (h) {
      var r = h.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) return;   // الظاهر أصلًا ما نخفيه
      h.classList.add('fx-rv'); io.observe(h);
    });
    /* احتياط: أي عنوان تجاوزه التمرير بسرعة يظهر فورًا — ما يبقى نص مخفي أبدًا */
    var pend = 0;
    function sweep() {
      pend = 0;
      var left = document.querySelectorAll('.fx-rv:not(.fx-in)');
      if (!left.length) { removeEventListener('scroll', onS); return; }
      [].forEach.call(left, function (h) { if (h.getBoundingClientRect().top < innerHeight * .95) { h.classList.add('fx-in'); io.unobserve(h); } });
    }
    function onS() { if (!pend) pend = requestAnimationFrame(sweep); }
    addEventListener('scroll', onS, { passive: true });
    addEventListener('load', sweep);
    setTimeout(function () { [].forEach.call(document.querySelectorAll('.fx-rv'), function (h) { if (h.getBoundingClientRect().top < innerHeight) h.classList.add('fx-in'); }); }, 3000);
  }

  /* 2) خط ذهبي يرتسم تحت الروابط النصية */
  [].forEach.call(document.querySelectorAll('.foot a, .foot-in nav a, .pall, .nav-l a.hm, .ab-b2, footer a'), function (a) {
    if (!a.querySelector('img,svg')) a.classList.add('fx-ul');
  });

  if (!fine) return;

  /* 3) أزرار مغناطيسية */
  [].forEach.call(document.querySelectorAll('.btn, .hx-b, .cta, .cs-b, .pgo, .nav-l .wa, .cf-btn, #c-send, .ask a, a.wa'), function (el) {
    el.classList.add('fx-mag');
    var raf = 0;
    el.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = el.getBoundingClientRect(), x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        var c = function (v) { return Math.max(-8, Math.min(8, v)); };
        el.style.translate = c(x * .18).toFixed(1) + 'px ' + c(y * .28).toFixed(1) + 'px';
      });
    });
    el.addEventListener('pointerleave', function () { el.style.translate = ''; });
  });

  /* 4) ميلان البطاقات والصور مع الماوس */
  [].forEach.call(document.querySelectorAll('.svx-c, .ph, .csp, .wed, .lz'), function (el) {
    el.classList.add('fx-tilt');
    var raf = 0;
    el.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = 'perspective(900px) rotateX(' + (-py * 5).toFixed(2) + 'deg) rotateY(' + (px * 6).toFixed(2) + 'deg)';
      });
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  });
})();

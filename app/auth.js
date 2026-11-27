/*! © 2026 Ismueil Osman (إسماعيل عثمان) — ismueilosman.com. All rights reserved. */
/* تسجيل دخول المتجر بالإيميل: رمز تحقق من 6 أرقام يوصل على البريد.
   الزائر يتصفّح بحرية، وتأكيد الطلب يحتاج تسجيل دخول. */
(function () {
  if (window.ioAuth) return;
  var GS = 'https://script.google.com/macros/s/AKfycbw0Nvt6rPQ2l_KJ5o8XXgzud4ehrnEEkDOWRf7wEuUlxS8MWmKbkWCyTJPrkJMRrzbjmw/exec';
  var K = 'ioAuth', D = document;
  function en() { try { return localStorage.getItem('lang') === 'en'; } catch (e) { return false; } }
  function T(ar, e) { return en() ? e : ar; }
  function get() { try { return JSON.parse(localStorage.getItem(K) || 'null'); } catch (e) { return null; } }
  function save(o) { try { o ? localStorage.setItem(K, JSON.stringify(o)) : localStorage.removeItem(K); } catch (e) {} }
  function cur() { var o = get(); return o && o.t && o.e && (!o.x || o.x > Date.now()) ? o : null; }

  var css = '' +
  '.iaB{display:inline-flex;align-items:center;gap:.45rem;font:800 .8rem Tajawal,sans-serif;color:#160f05;background:linear-gradient(135deg,#ffe8b8,#f2b45a 55%,#d6912f);border:0;border-radius:999px;padding:.5rem .9rem;cursor:pointer;white-space:nowrap;box-shadow:0 8px 22px -10px rgba(242,180,90,.8)}' +
  '.iaB svg{width:1rem;height:1rem;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
  '.iaB.in{background:rgba(242,180,90,.1);color:#ffe2a8;border:1px solid rgba(242,180,90,.4);box-shadow:none;padding:.32rem .75rem .32rem .38rem}' +
  'html[dir=rtl] .iaB.in{padding:.32rem .38rem .32rem .75rem}' +
  '.iaB .av{display:grid;place-items:center;width:1.65rem;height:1.65rem;border-radius:50%;background:linear-gradient(135deg,#ffe2a8,#f2b45a);color:#160f05;font:900 .78rem Cairo,sans-serif}' +
  '.iaB .em{max-width:7.5rem;overflow:hidden;text-overflow:ellipsis;direction:ltr}' +
  '@media(max-width:560px){.iaB .em,.iaB .tx{display:none}.iaB{width:2.35rem;height:2.35rem;padding:0;justify-content:center}.iaB.in,html[dir=rtl] .iaB.in{padding:0;width:2.35rem;height:2.35rem}.iaB svg{width:1.15rem;height:1.15rem}}' +
  '.iaM{position:fixed;inset:0;z-index:99999;display:flex;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:max(1rem,env(safe-area-inset-top)) 1rem max(1rem,env(safe-area-inset-bottom));background:rgba(3,4,6,.72);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);opacity:0;transition:opacity .3s}' +
  '.iaM.on{opacity:1}' +
  '.iaC{position:relative;margin:auto;flex:none;width:min(25rem,100%);border-radius:1.6rem;padding:2rem 1.5rem 1.6rem;background:radial-gradient(120% 70% at 50% 0,rgba(242,180,90,.16),transparent 60%),linear-gradient(180deg,#12141c,#0a0b10);border:1px solid rgba(242,180,90,.3);box-shadow:0 40px 90px -30px rgba(0,0,0,.95),0 0 0 1px rgba(255,255,255,.03) inset;text-align:center;color:#eceef4;transform:translateY(18px) scale(.97);transition:transform .45s cubic-bezier(.2,.8,.2,1)}' +
  '.iaM.on .iaC{transform:none}' +
  '.iaC::before{content:"";position:absolute;top:0;left:15%;right:15%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,226,168,.9),transparent)}' +
  '.iaX{position:absolute;top:.8rem;inset-inline-end:.8rem;width:2.2rem;height:2.2rem;border-radius:50%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#a9afbf;font-size:1rem;cursor:pointer}' +
  '.iaI{width:4rem;height:4rem;margin:0 auto 1rem;border-radius:1.2rem;display:grid;place-items:center;background:linear-gradient(135deg,rgba(242,180,90,.25),rgba(242,180,90,.05));border:1px solid rgba(242,180,90,.4)}' +
  '.iaI svg{width:1.8rem;height:1.8rem;fill:none;stroke:#f2b45a;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}' +
  '.iaC h3{font:900 1.35rem/1.3 Cairo,sans-serif}' +
  '.iaC p{margin-top:.45rem;color:#a9afbf;font-size:.95rem;line-height:1.7}' +
  '.iaC p b{color:#ffe2a8;direction:ltr;unicode-bidi:isolate}' +
  '.iaF{margin-top:1.3rem;text-align:start}' +
  '.iaF input{width:100%;height:3.3rem;border-radius:1rem;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font:600 1rem system-ui,sans-serif;padding:0 1rem;direction:ltr;text-align:left;outline:none;transition:border-color .2s,box-shadow .2s}' +
  '.iaF input:focus{border-color:#f2b45a;box-shadow:0 0 0 4px rgba(242,180,90,.15)}' +
  '.iaO{display:flex;gap:.45rem;justify-content:center;direction:ltr;margin-top:1.3rem}' +
  '.iaO input{width:2.85rem;height:3.4rem;border-radius:.9rem;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font:800 1.45rem ui-monospace,Menlo,monospace;text-align:center;outline:none;transition:border-color .2s,box-shadow .2s,transform .2s}' +
  '.iaO input:focus{border-color:#f2b45a;box-shadow:0 0 0 4px rgba(242,180,90,.15);transform:translateY(-2px)}' +
  '.iaO input.f{border-color:rgba(242,180,90,.6)}' +
  '.iaO.bad input{border-color:#ff7a85;animation:iaSh .4s}' +
  '@keyframes iaSh{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}' +
  '.iaE{min-height:1.3rem;margin-top:.55rem;color:#ff8a94;font-size:.85rem;text-align:center}' +
  '.iaG{width:100%;height:3.3rem;margin-top:.6rem;border:0;border-radius:999px;font:800 1rem Tajawal,sans-serif;color:#160f05;background:linear-gradient(135deg,#ffe8b8,#f2b45a 50%,#d6912f);cursor:pointer;box-shadow:0 14px 34px -14px rgba(242,180,90,.85);transition:transform .2s,opacity .2s}' +
  '.iaG:disabled{opacity:.6;cursor:default}' +
  '.iaG:not(:disabled):hover{transform:translateY(-2px)}' +
  '.iaL{display:flex;justify-content:space-between;gap:1rem;margin-top:1rem;font-size:.85rem;color:#a9afbf}' +
  '.iaL button{background:none;border:0;color:#f2b45a;font:700 .85rem Tajawal,sans-serif;cursor:pointer;padding:0}' +
  '.iaL button:disabled{color:#6d7384;cursor:default}' +
  '.iaN{margin-top:1.1rem;font-size:.78rem;color:#6d7384;line-height:1.7}' +
  '.iaOK{width:4.4rem;height:4.4rem;margin:.4rem auto 1rem;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#ffe2a8,#f2b45a);box-shadow:0 0 0 8px rgba(242,180,90,.12),0 0 40px rgba(242,180,90,.5);animation:iaPop .5s cubic-bezier(.2,1.4,.4,1)}' +
  '.iaOK svg{width:2rem;height:2rem;fill:none;stroke:#160f05;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:30;stroke-dashoffset:30;animation:iaCk .5s .2s forwards}' +
  '@keyframes iaPop{from{transform:scale(.3);opacity:0}}@keyframes iaCk{to{stroke-dashoffset:0}}' +
  '.iaSp{display:inline-block;width:1rem;height:1rem;border:2px solid rgba(22,15,5,.3);border-top-color:#160f05;border-radius:50%;animation:iaR .7s linear infinite;vertical-align:-3px}' +
  '@keyframes iaR{to{transform:rotate(360deg)}}' +
  '.iaW{display:flex;align-items:center;gap:.6rem;margin-bottom:1rem;padding:.75rem .9rem;border-radius:1rem;border:1px solid rgba(242,180,90,.3);background:rgba(242,180,90,.07);font-size:.88rem;color:#e7dcc8}' +
  '.iaW b{color:#ffe2a8;direction:ltr;unicode-bidi:isolate}' +
  '.iaW button{margin-inline-start:auto;background:none;border:0;color:#f2b45a;font:700 .82rem Tajawal,sans-serif;cursor:pointer}' +
  '.iaH{margin-top:1rem;text-align:start;padding:.85rem 1rem;border-radius:1rem;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.08);font-size:.82rem;color:#a9afbf;line-height:1.75}' +
  '.iaH b{display:block;color:#ffe2a8;font:800 .86rem Tajawal,sans-serif;margin-bottom:.2rem}.iaH ol{margin:0;padding-inline-start:1.1rem}.iaH em{font-style:normal;color:#eceef4;font-weight:700}.iaH bdi{color:#f2b45a;direction:ltr}' +
  '.iaD{position:fixed;inset:0;z-index:99990;display:flex;justify-content:flex-end;background:rgba(3,4,6,.6);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:0;transition:opacity .3s}.iaD.on{opacity:1}' +
  '.iaP{width:min(30rem,100%);height:100%;overflow-y:auto;overscroll-behavior:contain;background:linear-gradient(180deg,#10121a,#090a0f);border-inline-start:1px solid rgba(242,180,90,.25);padding:1.1rem 1.1rem calc(2rem + env(safe-area-inset-bottom));color:#eceef4;transform:translateX(-100%);transition:transform .4s cubic-bezier(.2,.8,.2,1)}' +
  'html[dir=ltr] .iaP{transform:translateX(100%)}.iaD.on .iaP{transform:none}' +
  '.iaPh{display:flex;align-items:center;gap:.7rem;padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,.07)}.iaPh .av{display:grid;place-items:center;width:2.8rem;height:2.8rem;border-radius:50%;background:linear-gradient(135deg,#ffe2a8,#f2b45a);color:#160f05;font:900 1.1rem Cairo,sans-serif;flex:none}' +
  '.iaPh div{min-width:0;flex:1}.iaPh h3{font:900 1.15rem Cairo,sans-serif}.iaPh small{display:block;color:#a9afbf;font-size:.8rem;direction:ltr;text-align:start;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
  '.iaPh .iaX{position:static;flex:none}' +
  '.iaS{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin:1rem 0}.iaS div{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07);border-radius:.9rem;padding:.6rem;text-align:center}.iaS b{display:block;font:900 1.2rem Cairo,sans-serif;color:#ffe2a8}.iaS span{font-size:.72rem;color:#a9afbf}' +
  '.iaT{font:900 1rem Cairo,sans-serif;margin:1.1rem 0 .6rem}' +
  '.iaO2{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);border-radius:1.1rem;padding:1rem;margin-bottom:.75rem}' +
  '.iaO2 .hd{display:flex;justify-content:space-between;align-items:flex-start;gap:.6rem}.iaO2 .hd b{font:800 .95rem/1.5 Tajawal,sans-serif}.iaO2 .hd small{display:block;color:#7d8292;font-size:.75rem;margin-top:.1rem}' +
  '.iaBd{flex:none;font:800 .72rem Tajawal,sans-serif;padding:.28rem .6rem;border-radius:999px;background:rgba(242,180,90,.12);color:#ffe2a8;border:1px solid rgba(242,180,90,.35);white-space:nowrap}.iaBd.p{background:rgba(110,168,255,.12);color:#a9c9ff;border-color:rgba(110,168,255,.4)}.iaBd.d{background:rgba(126,226,168,.12);color:#9ff0c2;border-color:rgba(126,226,168,.45)}.iaBd.x{background:rgba(255,122,133,.1);color:#ff9aa3;border-color:rgba(255,122,133,.35)}' +
  '.iaTl{display:flex;align-items:center;margin:1rem 0 .3rem}.iaTl i{width:1.5rem;height:1.5rem;border-radius:50%;display:grid;place-items:center;font:900 .7rem Cairo,sans-serif;font-style:normal;background:#1a1d27;border:1px solid rgba(255,255,255,.12);color:#7d8292;flex:none}.iaTl i.on{background:linear-gradient(135deg,#ffe2a8,#f2b45a);color:#160f05;border-color:transparent}.iaTl s{flex:1;height:2px;background:rgba(255,255,255,.1);text-decoration:none}.iaTl s.on{background:#f2b45a}' +
  '.iaTx{display:flex;justify-content:space-between;font-size:.7rem;color:#7d8292;margin-bottom:.6rem}.iaTx span.on{color:#ffe2a8;font-weight:700}' +
  '.iaIt{list-style:none;margin:.5rem 0 0;padding:0;font-size:.83rem;color:#c9cdd8;line-height:1.8}.iaIt li{display:flex;gap:.4rem}.iaIt li::before{content:"•";color:#f2b45a}' +
  '.iaUp{margin-top:.7rem;padding:.7rem .85rem;border-radius:.8rem;background:rgba(242,180,90,.07);border:1px solid rgba(242,180,90,.25);font-size:.84rem;line-height:1.8;color:#eee4d2}.iaUp b{display:block;color:#ffe2a8;font-size:.78rem}' +
  '.iaFt{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin-top:.8rem}.iaFt .tot{margin-inline-end:auto;font:900 1.05rem Cairo,sans-serif;color:#ffe2a8}.iaFt a{font:800 .78rem Tajawal,sans-serif;text-decoration:none;padding:.5rem .8rem;border-radius:999px;border:1px solid rgba(255,255,255,.14);color:#eceef4}.iaFt a.g{background:linear-gradient(135deg,#ffe8b8,#f2b45a);color:#160f05;border:0}' +
  '.iaEm{text-align:center;padding:2rem 1rem;color:#a9afbf}.iaEm b{display:block;color:#eceef4;font:900 1.05rem Cairo,sans-serif;margin-bottom:.3rem}.iaEm a{display:inline-block;margin-top:1rem;text-decoration:none}' +
  '.iaSk{height:7.5rem;border-radius:1.1rem;margin-bottom:.75rem;background:linear-gradient(90deg,rgba(255,255,255,.03),rgba(255,255,255,.07),rgba(255,255,255,.03));background-size:200% 100%;animation:iaSkA 1.2s infinite}@keyframes iaSkA{to{background-position:-200% 0}}' +
  '@media (prefers-reduced-motion:reduce){.iaM,.iaC,.iaOK,.iaOK svg{transition:none;animation:none;stroke-dashoffset:0}}';
  var st = D.createElement('style'); st.textContent = css; D.head.appendChild(st);

  var I_MAIL = '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>';
  var I_LOCK = '<svg viewBox="0 0 24 24"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5"/></svg>';
  var I_USER = '<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/></svg>';

  /* زر الهيدر */
  var hb = null;
  function paintBtn() {
    var bar = D.querySelector('header .tr'); if (!bar) return;
    if (!hb) { hb = D.createElement('button'); hb.type = 'button'; hb.className = 'iaB'; bar.insertBefore(hb, bar.firstChild); hb.addEventListener('click', function () { cur() ? account() : open(null); }); }
    var o = cur();
    if (o) { hb.className = 'iaB in'; hb.innerHTML = '<span class="av">' + o.e.charAt(0).toUpperCase() + '</span><span class="em">' + o.e.replace(/[<>&]/g, '') + '</span>'; hb.setAttribute('aria-label', T('حسابي', 'My account')); }
    else { hb.className = 'iaB'; hb.innerHTML = I_USER + '<span class="tx">' + T('تسجيل الدخول', 'Sign in') + '</span>'; hb.setAttribute('aria-label', T('تسجيل الدخول', 'Sign in')); }
  }

  function paintSlots() {
    var o = cur();
    [].forEach.call(D.querySelectorAll('[data-ioauth]'), function (el) {
      var k = (o ? 'in:' + o.e : 'out') + (en() ? 1 : 0); if (el.getAttribute('data-k') === k) return; el.setAttribute('data-k', k);
      el.className = 'iaW';
      el.innerHTML = o ? (I_USER.replace('<svg', '<svg style="width:1.1rem;height:1.1rem;flex:none;fill:none;stroke:#f2b45a;stroke-width:2"') + '<span>' + T('الطلب باسم', 'Ordering as') + ' <b>' + o.e.replace(/[<>&]/g, '') + '</b></span><button type="button">' + T('تغيير', 'Change') + '</button>')
        : (I_LOCK.replace('<svg', '<svg style="width:1.1rem;height:1.1rem;flex:none;fill:none;stroke:#f2b45a;stroke-width:2"') + '<span>' + T('بنطلب منك تسجيل دخول سريع بالإيميل عند التأكيد.', "You'll sign in quickly with your email when you confirm.") + '</span>');
      var b = el.querySelector('button'); if (b) b.onclick = function () { save(null); paint(); open(null); };
    });
  }
  function paint() { paintBtn(); paintSlots(); }
  var mq = 0; new MutationObserver(function () { if (mq) return; mq = requestAnimationFrame(function () { mq = 0; paintSlots(); }); }).observe(D.documentElement, { childList: true, subtree: true });

  /* النافذة */
  var prevB = '', M = null, C = null, done = null, mail = '', timer = 0;
  function shell(html) {
    if (!M) {
      M = D.createElement('div'); M.className = 'iaM'; M.setAttribute('role', 'dialog'); M.setAttribute('aria-modal', 'true');
      M.innerHTML = '<div class="iaC"></div>'; C = M.firstChild; D.body.appendChild(M);
      M.addEventListener('click', function (e) { if (e.target === M) close(); });
      D.addEventListener('keydown', function (e) { if (e.key === 'Escape' && M && M.parentNode) close(); });
      requestAnimationFrame(function () { M.classList.add('on'); });
      D.documentElement.style.overflow = 'hidden'; prevB = D.body.style.overflow; D.body.style.overflow = 'hidden';
    }
    C.innerHTML = '<button class="iaX" type="button" aria-label="' + T('إغلاق', 'Close') + '">✕</button>' + html;
    C.querySelector('.iaX').onclick = close;
  }
  function close() { if (!M) return; clearInterval(timer); M.classList.remove('on'); var m = M; M = null; C = null; D.documentElement.style.overflow = ''; D.body.style.overflow = prevB; setTimeout(function () { m.remove(); }, 300); }

  function api(q) { return fetch(GS + '?' + q).then(function (r) { return r.json(); }); }
  function msg(code) {
    return ({ email: T('اكتب إيميل صحيح', 'Enter a valid email'), wait: T('انتظر شوي قبل ما تطلب رمز جديد', 'Please wait a moment before requesting a new code'),
      limit: T('طلبت رموز كثير، جرّب بعد ساعة', 'Too many codes requested, try again in an hour'), busy: T('الخدمة مشغولة الحين، جرّب بعد شوي', 'Service is busy, try again shortly'),
      code: T('الرمز غير صحيح', 'Incorrect code'), expired: T('انتهت صلاحية الرمز، اطلب رمز جديد', 'The code expired, request a new one'),
      invalid: T('اكتب الرمز كامل (6 أرقام)', 'Enter the full 6-digit code'), net: T('تعذّر الاتصال، تأكد من الإنترنت وجرّب مرة ثانية', 'Connection failed, check your internet and try again') })[code] || T('صار خطأ، جرّب مرة ثانية', 'Something went wrong, try again');
  }

  function open(cb, why) {
    done = cb || null;
    var o = get();
    shell('<div class="iaI">' + I_MAIL + '</div><h3>' + T('سجّل دخولك بالإيميل', 'Sign in with your email') + '</h3>' +
      '<p>' + (why || T('عشان نأكد طلبك ونرسل لك تفاصيله وحالته على بريدك.', 'So we can confirm your order and send its details and status to your inbox.')) + '</p>' +
      '<form class="iaF" novalidate><input type="email" id="iaEm" autocomplete="email" inputmode="email" placeholder="name@example.com" aria-label="' + T('البريد الإلكتروني', 'Email') + '" maxlength="120"><div class="iaE" id="iaErr"></div>' +
      '<button class="iaG" id="iaGo" type="submit">' + T('أرسل رمز التحقق', 'Send verification code') + '</button></form>' +
      '<div class="iaN">' + I_LOCK.replace('<svg', '<svg style="width:.9rem;height:.9rem;vertical-align:-2px;fill:none;stroke:#6d7384;stroke-width:2"') + ' ' + T('بدون كلمة مرور. بريدك يُستخدم لطلباتك فقط.', 'No password. Your email is used for your orders only.') + '</div>');
    var em = C.querySelector('#iaEm'); if (o && o.e) em.value = o.e;
    setTimeout(function () { em.focus(); }, 250);
    C.querySelector('form').onsubmit = function (e) { e.preventDefault(); send(em.value); };
  }

  function send(v) {
    v = String(v || '').trim().toLowerCase();
    var err = C.querySelector('#iaErr'), go = C.querySelector('#iaGo') || C.querySelector('#iaRe');
    if (!/^[^\s@<>"']+@[^\s@<>"']+\.[a-z]{2,}$/.test(v)) { if (err) err.textContent = msg('email'); return; }
    if (go) { go.disabled = true; if (go.id === 'iaGo') go.innerHTML = '<span class="iaSp"></span>'; }
    api('otp=send&email=' + encodeURIComponent(v) + (en() ? '&lang=en' : '')).then(function (j) {
      if (j && j.ok) { mail = v; codeStep(); return; }
      if (j && j.error === 'wait' && mail === v && C && C.querySelector('.iaO')) { if (go) go.disabled = false; return; }
      if (err) err.textContent = msg(j && j.error); if (go) { go.disabled = false; if (go.id === 'iaGo') go.textContent = T('أرسل رمز التحقق', 'Send verification code'); }
    }).catch(function () { if (err) err.textContent = msg('net'); if (go) { go.disabled = false; if (go.id === 'iaGo') go.textContent = T('أرسل رمز التحقق', 'Send verification code'); } });
  }

  function codeStep() {
    shell('<div class="iaI">' + I_LOCK + '</div><h3>' + T('اكتب رمز التحقق', 'Enter the verification code') + '</h3>' +
      '<p>' + T('أرسلنا رمز من 6 أرقام إلى', 'We sent a 6-digit code to') + '<br><b>' + mail.replace(/[<>&]/g, '') + '</b></p>' +
      '<form novalidate><div class="iaO" id="iaO">' + '<input inputmode="numeric" maxlength="1" autocomplete="one-time-code" aria-label="1">' + [2, 3, 4, 5, 6].map(function (n) { return '<input inputmode="numeric" maxlength="1" aria-label="' + n + '">'; }).join('') + '</div>' +
      '<div class="iaE" id="iaErr"></div><button class="iaG" id="iaV" type="submit">' + T('تحقق وكمّل', 'Verify & continue') + '</button></form>' +
      '<div class="iaL"><button type="button" id="iaCh">' + T('تغيير الإيميل', 'Change email') + '</button><button type="button" id="iaRe" disabled></button></div>' +
      '<div class="iaH"><b>' + T('ما وصلك الرمز خلال دقيقة؟', 'No code within a minute?') + '</b><ol><li>' + T('افتح مجلد <em>الرسائل غير المرغوب فيها (Spam)</em> وتبويب <em>العروض</em> في بريدك.', 'Check your <em>Spam</em> and <em>Promotions</em> folders.') + '</li><li>' + T('الرسالة توصلك من', 'It comes from') + ' <bdi>hello@ismueilosman.com</bdi> ' + T('بعنوان «رمز الدخول». لو لقيتها في السبام اضغط «ليست رسالة غير مرغوب فيها».', 'titled “Your sign-in code”. If it is in spam, mark it “Not spam”.') + '</li><li>' + T('تأكد إن الإيميل مكتوب صح، أو اضغط «إعادة إرسال».', 'Make sure the email is right, or tap Resend.') + '</li></ol></div>');
    var box = C.querySelector('#iaO'), ins = [].slice.call(box.querySelectorAll('input')), err = C.querySelector('#iaErr');
    function val() { return ins.map(function (i) { return i.value; }).join(''); }
    function fill(s, from) { s = String(s).replace(/[^\d٠-٩]/g, '').replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); }); for (var k = 0; k < s.length && from + k < 6; k++) { ins[from + k].value = s[k]; ins[from + k].classList.add('f'); } var nx = Math.min(5, from + s.length); ins[nx].focus(); if (val().length === 6) verify(); }
    ins.forEach(function (inp, i) {
      inp.addEventListener('input', function () { var v = inp.value; inp.value = ''; inp.classList.remove('f'); box.classList.remove('bad'); err.textContent = ''; if (v) fill(v, i); });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Backspace' && !inp.value && i > 0) { ins[i - 1].value = ''; ins[i - 1].classList.remove('f'); ins[i - 1].focus(); e.preventDefault(); } if (e.key === 'ArrowLeft' && i < 5) ins[i + 1].focus(); if (e.key === 'ArrowRight' && i > 0) ins[i - 1].focus(); });
      inp.addEventListener('paste', function (e) { var t = (e.clipboardData || window.clipboardData).getData('text'); if (t) { e.preventDefault(); fill(t, 0); } });
    });
    setTimeout(function () { ins[0].focus(); }, 250);
    C.querySelector('form').onsubmit = function (e) { e.preventDefault(); verify(); };
    C.querySelector('#iaCh').onclick = function () { open(done); };
    var re = C.querySelector('#iaRe'), left = 55;
    function tick() { if (!C) return clearInterval(timer); if (left > 0) { re.disabled = true; re.textContent = T('إعادة الإرسال بعد ', 'Resend in ') + left + T(' ث', 's'); left--; } else { re.disabled = false; re.textContent = T('أعد إرسال الرمز', 'Resend code'); clearInterval(timer); } }
    clearInterval(timer); tick(); timer = setInterval(tick, 1000);
    re.onclick = function () { left = 55; tick(); clearInterval(timer); timer = setInterval(tick, 1000); send(mail); };
    var busy = false;
    function verify() {
      var c = val(); if (busy) return; if (c.length !== 6) { err.textContent = msg('invalid'); box.classList.add('bad'); return; }
      busy = true; var b = C.querySelector('#iaV'); b.disabled = true; b.innerHTML = '<span class="iaSp"></span>';
      api('otp=verify&email=' + encodeURIComponent(mail) + '&code=' + c).then(function (j) {
        busy = false;
        if (j && j.ok && j.token) { save({ e: j.email, t: j.token, x: Date.now() + 89 * 864e5 }); paint(); success(); return; }
        b.disabled = false; b.textContent = T('تحقق وكمّل', 'Verify & continue');
        err.textContent = msg(j && j.error) + (j && j.left ? T(' · باقي ' + j.left + ' محاولات', ' · ' + j.left + ' tries left') : '');
        box.classList.remove('bad'); void box.offsetWidth; box.classList.add('bad');
        ins.forEach(function (i) { i.value = ''; i.classList.remove('f'); }); ins[0].focus();
      }).catch(function () { busy = false; b.disabled = false; b.textContent = T('تحقق وكمّل', 'Verify & continue'); err.textContent = msg('net'); });
    }
  }

  function success() {
    clearInterval(timer);
    var o = cur();
    shell('<div class="iaOK"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><h3>' + T('تم تسجيل الدخول', 'You are signed in') + '</h3><p><b>' + (o ? o.e.replace(/[<>&]/g, '') : '') + '</b></p>');
    var cb = done; done = null;
    setTimeout(function () { close(); if (cb) setTimeout(cb, 320); }, 1100);
    D.dispatchEvent(new CustomEvent('ioauth', { detail: o }));
  }

  var Dw = null;
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function closeD() { if (!Dw) return; var d = Dw; Dw = null; d.classList.remove('on'); D.documentElement.style.overflow = ''; D.body.style.overflow = prevB; setTimeout(function () { d.remove(); }, 350); if (location.hash === '#orders') try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }
  function merge(list) {
    try {
      var my = JSON.parse(localStorage.getItem('myOrders') || '[]'), by = {};
      my.forEach(function (o) { if (o.id) by[o.id] = o; });
      list.forEach(function (o) { var m = by[o.id]; if (m) { m.st = o.st; if (o.ln) m.ln = o.ln; if (o.dt) m.dt = o.dt; } else my.push({ s: o.s, k: 'store', a: o.total ? o.total + ' ر.س' : '', d: o.t || Date.now(), ok: true, id: o.id, dt: o.dt || '', st: o.st, ln: o.ln || '', r: '' }); });
      my.sort(function (a, b) { return b.d - a.d; }); localStorage.setItem('myOrders', JSON.stringify(my.slice(0, 30)));
    } catch (e) {}
  }
  function orderCard(o) {
    var S = { 'جديد': [1, '', T('استلمنا طلبك', 'Received')], 'قيد التنفيذ': [2, 'p', T('قيد التنفيذ', 'In progress')], 'تم التسليم': [3, 'd', T('تم التسليم', 'Delivered')], 'ملغي': [0, 'x', T('ملغي', 'Cancelled')] }[o.st] || [1, '', esc(o.st)];
    var no = String(o.id).slice(0, 6).toUpperCase(), dt = o.t ? new Date(o.t).toLocaleDateString(en() ? 'en-GB' : 'ar-SA', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    var steps = [T('استلمنا', 'Received'), T('قيد التنفيذ', 'In progress'), T('تم التسليم', 'Delivered')], tl = '', tx = '';
    if (S[0]) { for (var k = 1; k <= 3; k++) { tl += (k > 1 ? '<s class="' + (S[0] >= k ? 'on' : '') + '"></s>' : '') + '<i class="' + (S[0] >= k ? 'on' : '') + '">' + (S[0] > k || (S[0] === 3 && k === 3) ? '✓' : k) + '</i>'; tx += '<span class="' + (S[0] >= k ? 'on' : '') + '">' + steps[k - 1] + '</span>'; } }
    var wa = 'https://wa.me/966574395924?text=' + encodeURIComponent((en() ? 'Hi, about my order #' : 'السلام عليكم، بخصوص طلبي رقم ') + no);
    return '<div class="iaO2"><div class="hd"><div><b>' + T('طلب رقم ', 'Order #') + no + '</b><small>' + dt + (o.dt ? ' · ' + T('الموعد: ', 'Date: ') + esc(o.dt) : '') + '</small></div><span class="iaBd ' + S[1] + '">' + S[2] + '</span></div>' +
      (S[0] ? '<div class="iaTl">' + tl + '</div><div class="iaTx">' + tx + '</div>' : '') +
      '<ul class="iaIt">' + (o.items && o.items.length ? o.items : [o.s]).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      (o.up ? '<div class="iaUp"><b>' + T('آخر تحديث من إسماعيل', 'Latest update from Ismueil') + '</b>' + esc(o.up) + '</div>' : (S[0] === 1 ? '<div class="iaUp"><b>' + T('الخطوة الجاية', 'Next step') + '</b>' + T('بتواصل معك على واتساب نأكد التفاصيل ونبدأ.', 'I will reach you on WhatsApp to confirm the details and start.') + '</div>' : '')) +
      '<div class="iaFt">' + (o.total ? '<span class="tot">' + esc(o.total) + ' ' + T('ر.س', 'SAR') + '</span>' : '<span class="tot"></span>') +
      (o.ln ? '<a class="g" href="' + esc(o.ln) + '" target="_blank" rel="noopener">' + T('📥 استلم ملفاتك', '📥 Get your files') + '</a>' : '') +
      (o.st === 'تم التسليم' ? '<a href="/app/review/?id=' + esc(o.id) + '">' + T('⭐ قيّم الخدمة', '⭐ Rate') + '</a>' : '') +
      '<a href="' + wa + '" target="_blank" rel="noopener">' + T('واتساب', 'WhatsApp') + '</a></div></div>';
  }
  function account() {
    var o = cur(); if (!o) return open(function () { account(); });
    if (Dw) return;
    Dw = D.createElement('div'); Dw.className = 'iaD'; Dw.setAttribute('role', 'dialog'); Dw.setAttribute('aria-modal', 'true');
    Dw.innerHTML = '<div class="iaP"><div class="iaPh"><span class="av">' + esc(o.e.charAt(0).toUpperCase()) + '</span><div><h3>' + T('حسابي وطلباتي', 'My account & orders') + '</h3><small>' + esc(o.e) + '</small></div><button class="iaX" type="button" aria-label="' + T('إغلاق', 'Close') + '">✕</button></div>' +
      '<div id="iaBody"><div class="iaSk"></div><div class="iaSk"></div></div>' +
      '<button class="iaG" type="button" id="iaOut" style="margin-top:1.2rem;background:rgba(255,255,255,.05);color:#a9afbf;box-shadow:none;border:1px solid rgba(255,255,255,.12)">' + T('تسجيل الخروج', 'Sign out') + '</button></div>';
    D.body.appendChild(Dw); prevB = D.body.style.overflow; D.documentElement.style.overflow = 'hidden'; D.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { Dw && Dw.classList.add('on'); });
    Dw.addEventListener('click', function (e) { if (e.target === Dw) closeD(); });
    Dw.querySelector('.iaX').onclick = closeD;
    Dw.querySelector('#iaOut').onclick = function () { save(null); paint(); closeD(); D.dispatchEvent(new CustomEvent('ioauth', { detail: null })); };
    var body = Dw.querySelector('#iaBody');
    api('mine=1&auth=' + encodeURIComponent(o.t)).then(function (j) {
      if (!Dw) return;
      if (j && j.error === 'auth') { save(null); paint(); closeD(); open(function () { account(); }); return; }
      var L = (j && j.orders) || []; merge(L);
      var act = L.filter(function (x) { return x.st === 'جديد' || x.st === 'قيد التنفيذ'; }).length, dn = L.filter(function (x) { return x.st === 'تم التسليم'; }).length;
      body.innerHTML = '<div class="iaS"><div><b>' + L.length + '</b><span>' + T('كل الطلبات', 'All orders') + '</span></div><div><b>' + act + '</b><span>' + T('جارية', 'Active') + '</span></div><div><b>' + dn + '</b><span>' + T('مسلّمة', 'Delivered') + '</span></div></div>' +
        (L.length ? '<div class="iaT">' + T('طلباتي', 'My orders') + '</div>' + L.map(orderCard).join('') :
          '<div class="iaEm"><b>' + T('ما عندك طلبات للحين', 'No orders yet') + '</b>' + T('أول ما تطلب، تتابع هنا كل خطوة: استلام الطلب، التنفيذ، والتسليم مع ملفاتك.', 'Once you order, you will follow every step here: received, in progress, and delivery with your files.') + '<br><a class="iaG" style="display:inline-grid;place-items:center;width:auto;padding:0 1.6rem" href="/app/store/">' + T('تصفّح الخدمات', 'Browse services') + '</a></div>');
      var cl = body.querySelector('.iaEm a'); if (cl && location.pathname === '/app/store/') cl.onclick = function (e) { e.preventDefault(); closeD(); };
    }).catch(function () { if (body) body.innerHTML = '<div class="iaEm"><b>' + T('تعذّر تحميل طلباتك', 'Could not load your orders') + '</b>' + msg('net') + '</div>'; });
  }

  window.ioAuth = {
    token: function () { var o = cur(); return o ? o.t : ''; },
    email: function () { var o = cur(); return o ? o.e : ''; },
    require: function (cb, why) { if (cur()) { cb && cb(); return; } open(cb, why); },
    clear: function () { save(null); paint(); },
    open: function () { open(null); },
    orders: function () { account(); }
  };
  /* «طلباتي» في شريط التطبيق وبعد الطلب: تفتح لوحة الطلبات هنا */
  D.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('a[href="/app/order/#my"]'); if (!a) return; e.preventDefault(); if (typeof window.close === 'function' && D.getElementById('sh') && !D.getElementById('sh').hidden) { try { history.back(); } catch (x) {} } setTimeout(account, 60); }, true);
  function hashOpen() { if (location.hash === '#orders') setTimeout(account, 300); }
  addEventListener('hashchange', hashOpen); if (D.readyState === 'complete') hashOpen(); else addEventListener('load', hashOpen);
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', paint); else paint();
  /* لو تغيرت اللغة نحدّث نص الزر */
  new MutationObserver(paint).observe(D.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
})();

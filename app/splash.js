/*! © 2026 Ismueil Osman (إسماعيل عثمان) — ismueilosman.com. All rights reserved. */
/* شاشة الافتتاح: شعار إسماعيل عثمان مع شفرات العدسة تنفتح، وبعدها تنفتح الواجهة مثل فتحة الكاميرا.
   تطلع مرة وحدة كل ما يفتح التطبيق (مو مع كل صفحة). خاص بصفحات /app/ فقط. */
(function () {
  try { if (sessionStorage.getItem('io-sp')) return; sessionStorage.setItem('io-sp', '1'); } catch (e) { return; }
  var d = document, de = d.documentElement;
  var en = false; try { en = localStorage.getItem('lang') === 'en'; } catch (e) {}
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var css = '@property --r{syntax:"<length>";inherits:false;initial-value:0px}' +
    '#iosp{position:fixed;inset:0;z-index:2147483000;background:#07080c;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.1rem;' +
    'background-image:radial-gradient(55% 40% at 50% 42%,rgba(242,180,90,.16),transparent 70%);' +
    '-webkit-mask:radial-gradient(circle at 50% 42%,transparent var(--r),#000 calc(var(--r) + 1px));mask:radial-gradient(circle at 50% 42%,transparent var(--r),#000 calc(var(--r) + 1px));' +
    'animation:iospOpen .7s cubic-bezier(.7,0,.2,1) 2s forwards}' +
    '#iosp svg{width:8.5rem;height:8.5rem;overflow:visible;filter:drop-shadow(0 0 0 rgba(242,180,90,0));animation:iospGlow 1s ease-out .9s both,iospOut .6s cubic-bezier(.7,0,.2,1) 2s forwards}' +
    '#iosp .rg{stroke-dasharray:290;stroke-dashoffset:290;animation:iospDraw .7s cubic-bezier(.3,.7,.3,1) .05s forwards}' +
    '#iosp .dk{transform-origin:0 0;transform:scale(.55);opacity:0;animation:iospDisk .5s cubic-bezier(.2,1.4,.4,1) .3s forwards}' +
    '#iosp .ir{transform-origin:0 0;transform:rotate(-150deg) scale(.28);animation:iospIris 1s cubic-bezier(.2,.9,.25,1) .45s forwards}' +
    '#iosp .nm{font:900 clamp(1.6rem,7vw,2.2rem)/1.2 Cairo,Tajawal,system-ui,sans-serif;color:#eceef4;opacity:0;transform:translateY(12px);animation:iospUp .55s ease-out 1s forwards}#iosp .nm b{color:#f2b45a}' +
    '#iosp .tg{font:700 .9rem/1 Tajawal,system-ui,sans-serif;color:#a9afbf;letter-spacing:.08em;opacity:0;transform:translateY(10px);animation:iospUp .55s ease-out 1.2s forwards}' +
    '#iosp .nm,#iosp .tg{animation-fill-mode:forwards}' +
    '@keyframes iospDraw{to{stroke-dashoffset:0}}@keyframes iospDisk{to{transform:scale(1);opacity:1}}' +
    '@keyframes iospIris{60%{transform:rotate(12deg) scale(1.04)}to{transform:rotate(0) scale(1)}}' +
    '@keyframes iospUp{to{opacity:1;transform:none}}' +
    '@keyframes iospGlow{50%{filter:drop-shadow(0 0 26px rgba(242,180,90,.55))}to{filter:drop-shadow(0 0 10px rgba(242,180,90,.25))}}' +
    '@keyframes iospOut{to{transform:scale(1.35);opacity:0}}' +
    '@keyframes iospOpen{to{--r:150vmax}}' +
    '@supports not (mask:radial-gradient(#000,#000)){@keyframes iospOpen{to{opacity:0}}}' +
    (calm ? '#iosp,#iosp *{animation-duration:.01s!important;animation-delay:0s!important}#iosp{animation:iospFade .4s ease .5s forwards!important}@keyframes iospFade{to{opacity:0}}' : '');
  var st = d.createElement('style'); st.textContent = css;
  var o = d.createElement('div'); o.id = 'iosp'; o.setAttribute('aria-hidden', 'true');
  o.innerHTML = '<svg viewBox="-50 -50 100 100"><defs><clipPath id="iospC"><circle r="41"/></clipPath></defs>' +
    '<circle class="rg" r="46" fill="none" stroke="#f2b45a" stroke-width="4" transform="rotate(-90)"/>' +
    '<g class="dk"><circle r="41" fill="#f2b45a"/><g clip-path="url(#iospC)"><g class="ir">' +
    '<polygon fill="#07080c" points="4.74,-19.02 18.84,-5.40 14.10,13.62 -4.74,19.02 -18.84,5.40 -14.10,-13.62"/>' +
    '<g stroke="#07080c" stroke-width="3" stroke-linecap="round"><line x1="4.74" y1="-19.02" x2="-15.06" y2="-38.14"/><line x1="18.84" y1="-5.40" x2="25.50" y2="-32.11"/><line x1="14.10" y1="13.62" x2="40.55" y2="6.03"/><line x1="-4.74" y1="19.02" x2="15.06" y2="38.14"/><line x1="-18.84" y1="5.40" x2="-25.50" y2="32.11"/><line x1="-14.10" y1="-13.62" x2="-40.55" y2="-6.03"/></g>' +
    '</g></g></g></svg>' +
    (en ? '<div class="nm" dir="ltr">Ismueil <b>Osman</b></div><div class="tg">PHOTOGRAPHY · MARKETING · DESIGN</div>'
        : '<div class="nm" dir="rtl">إسماعيل <b>عثمان</b></div><div class="tg" dir="rtl">تصوير · تسويق · تصميم</div>');
  de.appendChild(st); de.appendChild(o);
  function bye() { if (o.parentNode) { o.remove(); st.remove(); } }
  o.addEventListener('animationend', function (e) { if (e.target === o) bye(); });
  o.addEventListener('click', bye);
  setTimeout(bye, calm ? 1200 : 3400);
})();

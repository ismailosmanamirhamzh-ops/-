/* تفاعلات صغيرة: أزرار مغناطيسية، ميلان البطاقات، ظهور العناوين، خط تحت الروابط.
   تشتغل فقط مع الماوس (الكمبيوتر)، وتتوقف كليًا مع «تقليل الحركة». */
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

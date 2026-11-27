/* واجهة الرئيسية على الكمبيوتر: إحساس عدسة كاميرا سينمائية
   (فوكس يضبط عند الفتح، حبيبات فيلم، إطار عدسة الكاميرا، مؤقت تسجيل حي، وحركة عمق مع الماوس) */
(function(){
  var hero=document.getElementById('hero');
  if(!hero||window.__hxcOn)return;window.__hxcOn=1;
  var mq=matchMedia('(min-width:1024px) and (min-aspect-ratio:21/20) and (pointer:fine)');
  var calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!mq.matches)return;

  var css=''+
  '#hero .hx-bg{animation:hxcFocus 1.9s cubic-bezier(.2,.7,.2,1) both,hxcKb 26s ease-in-out 1.9s infinite alternate;translate:calc(var(--mx,0)*-16px) calc(var(--my,0)*-10px);transition:translate .9s cubic-bezier(.2,.8,.2,1)}'+
  '@keyframes hxcFocus{0%{filter:blur(16px) brightness(.55);transform:scale(1.12)}60%{filter:blur(2px) brightness(.9)}100%{filter:none;transform:scale(1.03)}}'+
  '#hero .hx-in{translate:calc(var(--mx,0)*8px) calc(var(--my,0)*5px);transition:translate .9s cubic-bezier(.2,.8,.2,1)}'+
  '.hxc{position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0;transition:opacity 1.2s ease 1.4s}'+
  '.hxc.on{opacity:1}'+
  '.hxc-grain{position:absolute;inset:-50%;opacity:.07;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27180%27 height=%27180%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.9%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E");animation:hxcGr .9s steps(6) infinite}'+
  '@keyframes hxcGr{0%{transform:translate(0,0)}20%{transform:translate(-4%,3%)}40%{transform:translate(3%,-5%)}60%{transform:translate(-6%,-2%)}80%{transform:translate(5%,4%)}100%{transform:translate(0,0)}}'+
  '.hxc-vig{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 45%,transparent 55%,rgba(0,0,0,.55) 100%)}'+
  '.hxc-thirds{position:absolute;inset:7.5rem 3.2rem 4.2rem;background:linear-gradient(90deg,transparent calc(33.333% - .5px),rgba(255,227,163,.05) calc(33.333% - .5px),rgba(255,227,163,.05) calc(33.333% + .5px),transparent calc(33.333% + .5px),transparent calc(66.666% - .5px),rgba(255,227,163,.05) calc(66.666% - .5px),rgba(255,227,163,.05) calc(66.666% + .5px),transparent calc(66.666% + .5px)),linear-gradient(180deg,transparent calc(33.333% - .5px),rgba(255,227,163,.05) calc(33.333% - .5px),rgba(255,227,163,.05) calc(33.333% + .5px),transparent calc(33.333% + .5px),transparent calc(66.666% - .5px),rgba(255,227,163,.05) calc(66.666% - .5px),rgba(255,227,163,.05) calc(66.666% + .5px),transparent calc(66.666% + .5px))}'+
  '.hxc-fr{position:absolute;inset:7.5rem 3.2rem 4.2rem;translate:calc(var(--mx,0)*5px) calc(var(--my,0)*3px);transition:translate .9s cubic-bezier(.2,.8,.2,1)}'+
  '.hxc-fr i{position:absolute;width:34px;height:34px;border:0 solid rgba(242,180,90,.75)}'+
  '.hxc-fr i:nth-child(1){top:0;left:0;border-top-width:1.5px;border-left-width:1.5px}'+
  '.hxc-fr i:nth-child(2){top:0;right:0;border-top-width:1.5px;border-right-width:1.5px}'+
  '.hxc-fr i:nth-child(3){bottom:0;left:0;border-bottom-width:1.5px;border-left-width:1.5px}'+
  '.hxc-fr i:nth-child(4){bottom:0;right:0;border-bottom-width:1.5px;border-right-width:1.5px}'+
  '.hxc-t{position:absolute;direction:ltr;font:600 .72rem/1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.16em;color:rgba(255,227,163,.82);text-shadow:0 1px 8px rgba(0,0,0,.6);display:flex;align-items:center;gap:.7rem;white-space:nowrap}'+
  '.hxc-tl{top:1.1rem;left:3.1rem}.hxc-tr{top:1.1rem;right:3.1rem}.hxc-bl{bottom:1.1rem;left:3.1rem}.hxc-br{bottom:1.1rem;right:3.1rem}'+
  '.hxc-rec{display:inline-flex;align-items:center;gap:.45rem;color:#ffd9a0}'+
  '.hxc-rec b{width:.55rem;height:.55rem;border-radius:50%;background:#ff4d3d;box-shadow:0 0 12px #ff4d3d;animation:hxcBl 1.2s steps(1) infinite}'+
  '@keyframes hxcBl{50%{opacity:.15}}'+
  '.hxc-bat{display:inline-block;width:1.5rem;height:.62rem;border:1px solid rgba(255,227,163,.8);border-radius:2px;position:relative;padding:1px}'+
  '.hxc-bat::before{content:"";display:block;height:100%;width:78%;background:rgba(242,180,90,.85)}'+
  '.hxc-bat::after{content:"";position:absolute;right:-4px;top:2px;width:2px;height:4px;background:rgba(255,227,163,.8)}'+
  '.hxc-meter{display:inline-flex;gap:2px;align-items:flex-end;height:.75rem}'+
  '.hxc-meter span{width:3px;background:rgba(242,180,90,.85);height:30%;transition:height .12s}'+
  '.hxc-af{position:absolute;width:64px;height:64px;left:var(--afx,73%);top:var(--afy,50%);translate:-50% -50%;opacity:0}'+
  '.hxc-af i{position:absolute;width:14px;height:14px;border:0 solid #7dff9a;filter:drop-shadow(0 0 4px rgba(125,255,154,.6))}'+
  '.hxc-af i:nth-child(1){top:0;left:0;border-top-width:1.5px;border-left-width:1.5px}.hxc-af i:nth-child(2){top:0;right:0;border-top-width:1.5px;border-right-width:1.5px}.hxc-af i:nth-child(3){bottom:0;left:0;border-bottom-width:1.5px;border-left-width:1.5px}.hxc-af i:nth-child(4){bottom:0;right:0;border-bottom-width:1.5px;border-right-width:1.5px}'+
  '.hxc-af.lock{animation:hxcAf 2.6s ease .2s both}'+
  '@keyframes hxcAf{0%{opacity:0;transform:scale(1.7)}25%{opacity:1;transform:scale(1)}35%{opacity:.2}45%{opacity:1}80%{opacity:1}100%{opacity:0}}'+
  '@media (prefers-reduced-motion:reduce){#hero .hx-bg{animation:none;translate:none}#hero .hx-in{translate:none}.hxc-grain,.hxc-rec b{animation:none}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  var shade=hero.querySelector('.hx-shade');
  var w=document.createElement('div');w.className='hxc';w.setAttribute('aria-hidden','true');
  w.innerHTML='<div class="hxc-vig"></div><div class="hxc-grain"></div><div class="hxc-thirds"></div><div class="hxc-af"><i></i><i></i><i></i><i></i></div>'+
    '<div class="hxc-fr"><i></i><i></i><i></i><i></i>'+
      '<div class="hxc-t hxc-tl"><span class="hxc-rec"><b></b>REC</span><span class="hxc-tc">00:00:00:00</span></div>'+
      '<div class="hxc-t hxc-tr"><span>4K</span><span>24p</span><span class="hxc-bat"></span></div>'+
      '<div class="hxc-t hxc-bl"><span>ISO 400</span><span>f/1.8</span><span>1/125</span><span>5600K</span></div>'+
      '<div class="hxc-t hxc-br"><span class="hxc-meter"><span></span><span></span><span></span><span></span><span></span><span></span></span><span>S-LOG3</span><span>SONY α7 V</span></div>'+
    '</div>';
  if(shade&&shade.nextSibling)hero.insertBefore(w,shade.nextSibling);else hero.appendChild(w);
  requestAnimationFrame(function(){w.classList.add('on')});

  /* مربع الفوكس: يقفل على الوجه بعد ما تضبط العدسة */
  var af=w.querySelector('.hxc-af');
  setTimeout(function(){af.classList.add('lock')},1500);

  if(calm)return;
  /* مؤقت التسجيل ومقياس الصوت: يشتغلون بس والواجهة ظاهرة */
  var tc=w.querySelector('.hxc-tc'),bars=w.querySelectorAll('.hxc-meter span'),t0=performance.now(),vis=true,raf=0,last=0;
  function p2(n){return(n<10?'0':'')+n}
  function tick(now){
    raf=requestAnimationFrame(tick);
    if(now-last<42)return;last=now;
    var f=Math.floor((now-t0)/1000*24),s=Math.floor(f/24),m=Math.floor(s/60),h=Math.floor(m/60);
    tc.textContent=p2(h)+':'+p2(m%60)+':'+p2(s%60)+':'+p2(f%24);
    if(f%3===0)for(var i=0;i<bars.length;i++)bars[i].style.height=(20+Math.random()*80*(1-i/9))+'%';
  }
  function run(on){if(on&&!raf){raf=requestAnimationFrame(tick)}else if(!on&&raf){cancelAnimationFrame(raf);raf=0}}
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting;run(vis&&!document.hidden)}).observe(hero);else run(true);
  document.addEventListener('visibilitychange',function(){run(vis&&!document.hidden)});

  /* حركة عمق خفيفة مع الماوس */
  var pend=0,mx=0,my=0;
  hero.addEventListener('mousemove',function(e){
    var r=hero.getBoundingClientRect();mx=(e.clientX-r.left)/r.width*2-1;my=(e.clientY-r.top)/r.height*2-1;
    if(pend)return;pend=requestAnimationFrame(function(){pend=0;hero.style.setProperty('--mx',mx.toFixed(3));hero.style.setProperty('--my',my.toFixed(3))});
  },{passive:true});
  hero.addEventListener('mouseleave',function(){hero.style.setProperty('--mx',0);hero.style.setProperty('--my',0)});
  /* لمسة: كل ما يضغط الزائر يعيد الفوكس القفل */
  hero.addEventListener('pointerdown',function(){af.classList.remove('lock');void af.offsetWidth;af.classList.add('lock')});
})();

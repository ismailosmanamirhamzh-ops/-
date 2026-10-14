try{
(function(){
  var lens=document.getElementById('lens'),txt=document.getElementById('heroText'),tag=document.getElementById('heroTag'),
      sec=document.getElementById('top'),cam=document.getElementById('cam'),stage=document.getElementById('cam3d'),hint=document.getElementById('camHint'),wel=document.getElementById('camWelcome');
  var clamp=function(v){return Math.min(1,Math.max(0,v))},base=lens.offsetWidth||320;
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var P1=reduce?0:Math.round(innerHeight*0.75);           /* مسافة مرحلة الكاميرا */
  if(!reduce)sec.style.height='calc(200vh + '+P1+'px)';
  /* الكاميرا الوحيدة الآن هي المجسّم ثلاثي الأبعاد (camera3d.js)؛ الصورة القديمة حُذفت */
  var W=0,H=0,DY=0,LX=.31,LY2=.73,LW=.47;
  function size(){W=Math.min(innerWidth*.86,innerHeight*.6*1000/936,700);H=W*936/1000;DY=Math.min(34,innerHeight*.05)}
  size();
  var sway=0;
  function ease(c){return c<.5?4*c*c*c:1-Math.pow(-2*c+2,3)/2}
  function update(){
    var y=window.scrollY,c=P1?clamp(y/P1):1,e=ease(c),z=Math.max(0,y-P1);
    if(!reduce){
      var k=1-e,sEnd=Math.max(1.1,340/(LW*W)),s=1+(sEnd-1)*e;
      var ry=-24*k+sway*k,rx=8*k-Math.abs(sway)*.12*k;
      cam.style.transform='translate3d('+(((LX-.5)*W)*k).toFixed(1)+'px,'+((((LY2-.5)*H)+DY)*k).toFixed(1)+'px,0) scale('+s.toFixed(4)+') rotateY('+ry.toFixed(2)+'deg) rotateX('+rx.toFixed(2)+'deg) rotateZ('+(2*k).toFixed(2)+'deg)';
      stage.style.opacity=1-clamp((c-.84)/.16);stage.style.visibility=c>=1?'hidden':'visible';cam.style.willChange=c>=1?'auto':'transform';
      if(window.CAM3D)window.CAM3D.set(e,sway);
      hint.style.opacity=1-clamp(c/.22);
      if(wel)wel.style.opacity=1-clamp(c/.3);
    }else{stage.style.display='none';hint.style.display='none';if(wel)wel.style.display='none'}
    var la=reduce?1:clamp((c-.78)/.22);
    var sc=1+4*clamp(z/300),sz=base*sc;
    lens.style.width=sz+'px';lens.style.height=sz+'px';lens.style.borderWidth=(4*sc)+'px';lens.style.opacity=la;
    txt.style.opacity=la*(1-clamp(z/200));
    tag.style.opacity=clamp((z-250)/200);
    tag.style.pointerEvents=z>350?'auto':'none';
    if(!reduce)shoot(c,z);
  }
  /* ===== شاشة الكاميرا (Viewfinder) + قفل التركيز على الاسم + الفلاش ===== */
  var host=stage.parentElement,vf=null,tc=null,vfOn=false,vfT0=0,shot=false,afTimer=0,fb=null;
  var h1=txt.querySelector('h1'),af=null;
  if(!reduce){
    vf=document.createElement('div');vf.className='vf';vf.setAttribute('aria-hidden','true');vf.dir='ltr';
    vf.innerHTML='<i class="vf-c tl"></i><i class="vf-c tr"></i><i class="vf-c bl"></i><i class="vf-c br"></i>'+
      '<div class="vf-top"><span class="vf-rec"><b></b>REC</span><span class="vf-tc">00:00:00:00</span><span class="vf-fmt">4K · 25p</span></div>'+
      '<div class="vf-bot"><span>ISO 800</span><span>1/125</span><span>f/2.8</span><span class="vf-ev">±0.0</span><span class="vf-bat"><i></i>88%</span></div>';
    host.appendChild(vf);tc=vf.querySelector('.vf-tc');
    if(h1){af=document.createElement('span');af.className='af';af.setAttribute('aria-hidden','true');af.innerHTML='<i></i><i></i><i></i><i></i>';h1.appendChild(af)}
  }
  function pad(n){return(n<10?'0':'')+n}
  function tick(t){
    if(!vfOn)return;
    var f=Math.floor((t-vfT0)/40),fr=f%25,sec=Math.floor(f/25);
    tc.textContent='00:'+pad(Math.floor(sec/60)%60)+':'+pad(sec%60)+':'+pad(fr);
    requestAnimationFrame(tick);
  }
  function flash(){
    if(window.CAM3D&&window.CAM3D.flash){window.CAM3D.flash();return}
    if(!fb){fb=document.createElement('div');fb.className='vf-flash';fb.setAttribute('aria-hidden','true');host.appendChild(fb)}
    if(fb.animate)fb.animate([{opacity:0},{opacity:.95,offset:.08},{opacity:.35,offset:.35},{opacity:0}],{duration:650,easing:'ease-out'});
    if(navigator.vibrate)try{navigator.vibrate(18)}catch(_){}
  }
  function shoot(c,z){
    var o=clamp((c-.5)/.3)*(1-clamp((z-120)/180));
    vf.style.opacity=o;
    if(o>0&&!vfOn){vfOn=true;vfT0=performance.now();requestAnimationFrame(tick)}else if(o<=0&&vfOn)vfOn=false;
    if(c>=.999&&!shot){
      shot=true;txt.classList.remove('af-lock');void txt.offsetWidth;txt.classList.add('af-go');vf.classList.add('vf-af');
      clearTimeout(afTimer);
      afTimer=setTimeout(function(){txt.classList.add('af-lock');vf.classList.add('vf-lock');flash()},820);
    }else if(c<.4&&shot){shot=false;clearTimeout(afTimer);txt.classList.remove('af-go','af-lock');vf.classList.remove('vf-af','vf-lock')}
  }
  /* ===== دوران تلقائي: أول سحب يدير الكاميرا ويفتح العدسة تلقائيًا ===== */
  var auto=false,lastY=window.scrollY,tk=false;
  function req(){if(!tk){tk=true;requestAnimationFrame(function(){tk=false;update()})}}
  function go(to){
    if(auto||reduce)return;auto=true;
    var from=window.scrollY,t0=performance.now(),d=Math.max(900,Math.abs(to-from)/P1*2000);
    (function f(t){
      var p=clamp((t-t0)/d);window.scrollTo({top:from+(to-from)*ease(p),behavior:'instant'});update();
      if(p<1)requestAnimationFrame(f);else{auto=false;lastY=window.scrollY}
    })(t0);
  }
  var block=function(e){if(auto&&e.cancelable)e.preventDefault()};
  window.addEventListener('wheel',block,{passive:false});window.addEventListener('touchmove',block,{passive:false});
  window.addEventListener('keydown',function(e){if(auto&&[32,33,34,35,36,38,40].indexOf(e.keyCode)>-1)e.preventDefault()});
  var ua=-1e9,nav=0;
  ['wheel','touchstart','touchmove','keydown','mousedown'].forEach(function(ev){window.addEventListener(ev,function(){ua=performance.now()},{passive:true})});
  document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('a[href^="#"]')){nav=performance.now()+2500}});
  window.addEventListener('scroll',function(){
    var y=window.scrollY,dy=y-lastY,now=performance.now();
    if(!auto){lastY=y;if(!reduce&&P1&&y>3&&y<P1-3&&dy!==0&&now-ua<700&&now>nav){go(dy>0?P1:0);return}}
    req();
  },{passive:true});
  window.addEventListener('resize',function(){size();req()});
  /* حركة هادئة تلقائية قبل السحب */
  if(!reduce){(function idle(t){
    if(window.scrollY<P1){sway=Math.sin(t/1200)*13;update()}
    requestAnimationFrame(idle)})(0)}
  update();
})();
}catch(e){console.error(e)}
try{
/* خلفية الواجهة: مونتاج قصير من الأعمال والكواليس */
(function(){
  var v=document.getElementById('heroVid'),ph=document.getElementById('heroPhoto'),top=document.getElementById('top');
  if(!v)return;
  var c=navigator.connection;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches||(c&&c.saveData)){v.remove();return}
  var cur='';
  function pick(){
    var want=innerWidth/innerHeight>1.05?'assets/media/hero-bg-wide.mp4':'assets/media/hero-bg-portrait.mp4';
    if(want===cur)return;cur=want;v.src=want;v.load();var p=v.play();if(p&&p.catch)p.catch(function(){});
  }
  v.addEventListener('playing',function(){v.classList.add('on');if(ph)ph.classList.add('off')});
  pick();
  var t;addEventListener('resize',function(){clearTimeout(t);t=setTimeout(pick,400)});
  if(top&&'IntersectionObserver' in window)new IntersectionObserver(function(es){
    if(es[0].isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause();
  }).observe(top);
  document.addEventListener('visibilitychange',function(){if(document.hidden)v.pause();else if(top.getBoundingClientRect().bottom>0)v.play().catch(function(){})});
})();
}catch(e){console.error(e)}
try{
(function(){
  var ph=document.getElementById('heroPhoto'),cp=document.getElementById('camPhoto');
  if(ph&&cp)cp.src=ph.currentSrc||ph.src;
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function count(el){
    var n=+el.dataset.count,p=el.dataset.prefix||'',x=el.dataset.suffix||'';
    if(reduce){el.textContent=p+n+x;return}
    var t0=performance.now();
    (function f(t){var k=Math.min(1,(t-t0)/10000),e=1-Math.pow(1-k,2);el.textContent=p+Math.round(n*e)+x;if(k<1)requestAnimationFrame(f)})(t0);
  }
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;
    e.target.classList.add('in');
    e.target.querySelectorAll&&e.target.querySelectorAll('[data-count]').forEach(count);
    io.unobserve(e.target);
  })},{threshold:.35});
  document.querySelectorAll('.reveal,#stats').forEach(function(el){io.observe(el)});
})();
}catch(e){console.error(e)}
try{
(function(){
  var v=document.getElementById('adVideo'),b=document.getElementById('adPlay');
  if(!v||!b)return;
  v.removeAttribute('controls');
  // ضع هنا رابط الفيديو (mp4 مباشر أو رابط يوتيوب). اتركه فارغًا لاستخدام الفيديو المدمج.
  var VIDEO_URL="";
  b.addEventListener('click',function(){
    var yt=VIDEO_URL.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
    if(yt){
      var f=document.createElement('iframe');
      f.src='https://www.youtube.com/embed/'+yt[1]+'?autoplay=1&rel=0&playsinline=1';
      f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;f.title='إعلان نكهة تهامية';
      f.style.cssText='width:100%;height:100%;border:0';
      v.replaceWith(f);b.style.display='none';return;
    }
    if(VIDEO_URL)v.src=VIDEO_URL;
    v.setAttribute('controls','');b.style.display='none';v.play();
  });
  v.addEventListener('pause',function(){if(v.ended)b.style.display='flex'});
})();
}catch(e){console.error(e)}
try{
(function(){
  var lb=document.getElementById('lb'),im=lb.querySelector('img');
  function open(f){im.src=f.querySelector('img').src;im.alt=f.querySelector('img').alt;lb.classList.add('on')}
  function close(){lb.classList.remove('on')}
  document.querySelectorAll('.wed,.exec').forEach(function(f){
    f.addEventListener('click',function(){open(f)});
    f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(f)}});
  });
  lb.addEventListener('click',close);
  addEventListener('keydown',function(e){if(e.key==='Escape')close()});
})();
}catch(e){console.error(e)}
try{
(function(){
  var sec=document.getElementById('intro'),ws=[].slice.call(sec.querySelectorAll('.w')),
      glow=sec.querySelector('.stm-glow'),bar=document.getElementById('stmBar'),n=ws.length,t=false;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){ws.forEach(function(w){w.classList.add('on')});sec.style.height='auto';sec.firstElementChild.style.position='relative';sec.firstElementChild.style.height='auto';sec.firstElementChild.style.padding='6rem 1.5rem';return}
  function draw(){
    t=false;
    var r=sec.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(sec.offsetHeight-innerHeight))),
        k=Math.min(1,p/0.82);
    ws.forEach(function(w,i){w.classList.toggle('on',i<Math.round(k*n+0.4))});
    glow.style.setProperty('--go',Math.sin(Math.min(1,p*1.05)*Math.PI)*0.9+0.1);
    glow.style.setProperty('--gs',0.6+p*0.7);
    bar.style.width=(p*100)+'%';
  }
  function req(){if(!t){t=true;requestAnimationFrame(draw)}}
  addEventListener('scroll',req,{passive:true});addEventListener('resize',req);draw();
})();
}catch(e){console.error(e)}
try{
(function(){
  var t=document.getElementById('pt'),t2=document.getElementById('pt2');
  if(!t||!t2)return;
  var base=[].slice.call(t.children);
  base.slice().reverse().forEach(function(c){t2.appendChild(c.cloneNode(true))});
  var need=Math.max(window.innerWidth,screen.width||0,1400);
  [t,t2].forEach(function(row){
    var one=row.innerHTML,w=row.getBoundingClientRect().width||1100,reps=Math.max(2,Math.ceil(need/w)),half='';
    for(var i=0;i<reps;i++)half+=one;
    row.innerHTML=half+half;
    var n=row.children.length/2;
    [].slice.call(row.children).forEach(function(c,i){if(i>=n)c.setAttribute('aria-hidden','true')});
  });
})();
}catch(e){console.error(e)}
try{
(function(){
  /* روابط صفحات العلامات: ضع رابط كل علامة بين علامتي الاقتباس ليفتح عند الضغط على شعارها */
  var PARTNER_LINKS={
    'نكهة تهامية':'','مشوية':'','إطلالة البيت':'','مسقف رواد البناء':'','دوار السعادة':'','حاشي باشا':'','شؤون الغذاء':'','سنام':''
  };
  var BR={"نكهة تهامية": "Nakha Tahameiah", "مشوية": "Mashwiyah", "إطلالة البيت": "Itlalat Al-Bayt", "مسقف رواد البناء": "Musaqqaf Rowad Al-Bina", "دوار السعادة": "Dawar Al-Saada", "حاشي باشا": "Hashi Pasha", "شؤون الغذاء": "Food Affairs", "سنام": "Sanam"};
  var DICT={"شريككم الإبداعي | تسويق رقمي وإنتاج سينمائي": "Your Creative Partner | Digital Marketing & Cinematic Production", "إسماعيل عثمان": "Ismueil Osman", "خبراتي": "Experience", "العدسات": "Lenses", "الخدمات": "Services", "أعمالنا": "Our Work", "تواصل معنا": "Contact Us", "تواصل الآن": "Contact Now", "اسحب لاكتشاف تكامل": "Scroll to discover the integration of", "التسويق مع الإبداع البصري": "marketing with visual creativity", "شريككم الإبداعي": "Your Creative Partner", "تسويق رقمي وإنتاج سينمائي": "Digital Marketing & Cinematic Production", "شاهد أعمالي": "See My Work", "خبرتي في أرقام وصور": "My Experience in Numbers & Images", "أجمع بين عقل المسوّق الذي يقيس النتائج وعين المصوّر التي تلتقط اللحظة، وأنفّذ الحملة من الفكرة حتى النشر.": "I combine the mind of a marketer who measures results with the eye of a photographer who captures the moment, and I carry a campaign from idea to publishing.", "علامات تجارية عملت عليها": "Brands I have worked on", "أعلى نمو في المبيعات (وأخرى +15%)": "Highest sales growth (and another +15%)", "منصات إعلانية أديرها": "Ad platforms I manage", "أدوار في شخص واحد": "Roles in one person", "التسويق الرقمي": "Digital Marketing", "أدير حملات مدفوعة وأحلل أرقامها وأحسّنها باستمرار، ثم أكتب المحتوى وأدير الحسابات وأنشر.": "I run paid campaigns, analyze their numbers and keep optimizing them, then write the content, manage the accounts and publish.", "تحليل البيانات": "Data Analysis", "كتابة المحتوى": "Content Writing", "التصوير الاحترافي": "Professional Photography", "استوديو متنقل بمعداتي الخاصة: إضاءة وتصوير وحركة، ثم مونتاج في Premiere وتصميم في فوتوشوب.": "A mobile studio with my own equipment: lighting, photography and motion, then editing in Premiere and design in Photoshop.", "Godox إضاءة وفلاش": "Godox lighting & flash", "DJI جيمبل": "DJI gimbal", "مجموعة العدسات": "Lens Collection", "لكل مشهد عدسته. رسوم متجهة تبقى حادة بأي حجم أو دقة شاشة.": "Every scene has its lens. Vector artwork that stays sharp at any size or screen resolution.", "عدسة واسعة للمساحات والمواقع": "Wide lens for spaces and locations", "للتقارير والفعاليات": "For reportage and events", "للبورتريه والمنتجات": "For portraits and products", "لعزل الخلفية بنعومة": "For soft background separation", "للتصوير من مسافة بعيدة": "For shooting from a distance", "ما نقدّمه لك": "What We Offer You", "مسارَان يعملان معًا: استراتيجية تسويقية تقودها البيانات، وإنتاج بصري بمستوى سينمائي.": "Two tracks working together: a data-driven marketing strategy and cinematic-grade visual production.", "حملات إعلانية مدفوعة، وتحليل بيانات، وصناعة محتوى يرفع المبيعات.": "Paid ad campaigns, data analysis, and content creation that lifts sales.", "إدارة حملات Google Ads والسوشيال ميديا": "Google Ads and social media campaign management", "تحليل الأداء وتحسين العائد": "Performance analysis and return optimization", "كتابة المحتوى والهوية البصرية": "Content writing and visual identity", "الإنتاج السينمائي": "Cinematic Production", "تصوير ومونتاج بجودة سينمائية لإعلانات وأفلام قصيرة تعلق في الذاكرة.": "Cinematic-quality filming and editing for ads and short films that stay in memory.", "تصوير بمعدات احترافية": "Filming with professional equipment", "مونتاج وتصحيح ألوان": "Editing and color grading", "تصميم فوتوشوب ومواد إعلانية": "Photoshop design and advertising materials", "معرض الأعمال": "Portfolio", "أحدث عمل": "Latest Work", "إعلان نكهة تهامية: الفطور": "Nakha Tahameiah Ad: Breakfast", "إعلان عمودي قصير يقدّم عرض الفطور بلقطات قريبة تُبرز تفاصيل الطعام، مصمَّم للعرض على سناب شات وتيك توك وإنستغرام.": "A short vertical ad presenting the breakfast offer with close-up shots that highlight the food details, made for Snapchat, TikTok and Instagram.", "إعلان فيديو": "Video ad", "تصوير": "Filming", "مونتاج": "Editing", "عمودي 9:16": "Vertical 9:16", "تصوير الأعراس": "Wedding Photography", "لقطات ليلية بإضاءة دافئة وخلفيات ضبابية، تحفظ التفاصيل الصغيرة وملامح اللحظة. اضغط على أي صورة لتكبيرها.": "Night shots with warm lighting and soft blurred backgrounds that preserve small details and the feel of the moment. Tap any photo to enlarge it.", "بورتريه ليلي": "Night portrait", "تصوير أعراس": "Wedding photography", "تفاصيل الخاتم": "Ring detail", "لقطة جانبية": "Side profile shot", "بورتريه أنيق": "Elegant portrait", "تصوير قيادات شركة شؤون الغذاء للتطوير وإدارة المطاعم": "Leadership Photography: Food Affairs Company for Restaurant Development & Management", "صور تعكس شخصية القائد وبيئة العمل: إضاءة طبيعية ناعمة وعمق ميدان خفيف، ولقطات عفوية أثناء الاجتماعات إلى جانب بورتريه رسمي. اضغط على أي صورة لتكبيرها.": "Photos that reflect the leader’s character and the work environment: soft natural light, light depth of field, and candid shots during meetings alongside a formal portrait. Tap any photo to enlarge it.", "لقطة عفوية": "Candid shot", "تصوير قيادات": "Leadership photography", "بورتريه داخلي": "Indoor portrait", "بورتريه رسمي": "Formal portrait", "أثناء الاجتماع": "During the meeting", "في مكتب الشركة": "In the company office", "تصوير المنشد عبد الرحمن العسيري": "Photographing Nasheed Artist Abdulrahman Al-Asiri", "جلسة تصوير داخلية بإضاءة دافئة وخلفية مكتبة خشبية، تلتقط حركة اليدين وتعابير الحديث. اضغط على أي صورة لتكبيرها.": "An indoor shoot with warm lighting and a wooden bookshelf backdrop, capturing hand movement and speaking expressions. Tap any photo to enlarge it.", "لقطة تعبيرية": "Expressive shot", "أثناء الحديث": "While speaking", "بورتريه جانبي": "Side portrait", "إعلان علامة تجارية": "Brand ad", "إنتاج سينمائي": "Cinematic production", "خلف الكاميرا": "Behind the camera", "تحليل الحملات": "Campaign analysis", "مونتاج وألوان": "Editing & color", "إضاءة وتصوير": "Lighting & photography", "استراتيجية النمو": "Growth strategy", "تسويق رقمي": "Digital marketing", "شركاء النجاح": "Success Partners", "علامات تجارية أفتخر بصناعة حضورها وتنمية مبيعاتها.": "Brands I am proud to have built a presence for and grown the sales of.", "لننقل علامتك التجارية إلى القمة": "Let’s take your brand to the top", "أخبرنا عن مشروعك وأهدافك، وسنعود إليك بخطة عمل متكاملة للتسويق والإنتاج": "Tell us about your project and goals, and we’ll get back to you with a comprehensive action plan for marketing and production", "© 2026 إسماعيل عثمان. جميع الحقوق محفوظة.": "© 2026 Ismail Othman. All rights reserved."}, STM=["I'm", "Ismueil", "Osman.", "I turn", "your", "brand", "into", "a presence", "that sells,", "with focused", "campaigns", "and cinematic", "visual", "content", "that moves", "your customer", "from", "watching", "to", "buying."];
  Object.assign(DICT,{"تخطَّ إلى المحتوى":"Skip to content","اسحب للأسفل":"Scroll down",'الاسم':'Name','اسم الجهة / الشركة':'Organization / Company name','نوع النشاط':'Business type','اختر نوع النشاط':'Select business type','مطعم أو كافيه':'Restaurant or café','عقارات وتطوير':'Real estate & development','تجزئة ومتاجر':'Retail & stores','خدمات واستشارات':'Services & consulting','فعاليات ومناسبات':'Events & occasions','شخصية عامة / مشهور':'Public figure / influencer','أخرى':'Other','رقم الجوال':'Mobile number','البريد الإلكتروني':'Email','ملاحظات أو تفاصيل إضافية (اختياري)':'Notes or additional details (optional)','إرسال الرسالة':'Send Message','تم إرسال رسالتك':'Your message has been sent','شكرًا لك، وصلتني رسالتك وسأتواصل معك قريبًا.':'Thank you, I received your message and will get back to you soon.','إرسال رسالة أخرى':'Send another message'});
  var PH={'الاسم الكريم':'Your full name','اسم شركتك أو علامتك':'Your company or brand name','حدد نوع النشاط':'Specify business type','اكتب تفاصيل مشروعك أو ما تحتاجه…':'Tell me about your project or what you need…'};
  Object.assign(DICT,{'تواصل مباشر':'Reach me directly','تابعنا':'Follow us','واتساب':'WhatsApp','الاتصال':'Call','انستقرام':'Instagram','سناب شات':'Snapchat','تيك توك':'TikTok','تويتر (X)':'Twitter (X)','لينكدإن':'LinkedIn','يوتيوب':'YouTube'});
  Object.assign(DICT,{"ما أقدّمه لك": "What I Offer You", "حلول متكاملة تجمع بين دقة الأرقام التسويقية وروعة الإنتاج البصري السينمائي.": "Integrated solutions combining the precision of marketing numbers with the beauty of cinematic visual production.", "نمو العلامات التجارية": "Brand Growth", "إنتاج سينمائي وتصوير": "Cinematic Production & Photography", "تغطية المؤتمرات والفعاليات": "Conference & Event Coverage", "التصميم والهوية البصرية": "Design & Visual Identity", "التصوير التجاري والمطاعم": "Commercial & Restaurant Photography", "لا أكتفي بإدارة الإعلانات، بل أبني حضوراً رقمياً متكاملًا لأنشطتك. أقدّر أرقامك وأدير حملاتك بدقة لنرفع مبيعاتك ونحقق عائداً حقيقياً على الاستثمار.": "I don’t just manage ads; I build a complete digital presence for your business. I analyze your numbers and run your campaigns precisely to raise your sales and deliver a real return on investment.", "أضع بين يديك استوديو متكامل. أصور بدقة ووضوح عالٍ، وأنفذ المونتاج وتصحيح الألوان بأعلى معايير الجودة لأحول أفكارك إلى مشاهد بصرية ساحرة تعلق في الذاكرة.": "I put a complete studio at your disposal. I shoot with high precision and clarity, and do editing and color grading to the highest quality standards, turning your ideas into stunning visuals that stay in memory.", "أقدم توثيقاً ميدانياً رسمياً واحترافياً لفعالياتك، معارضك، ومؤتمراتك الكبرى. ألتقط أهم اللحظات بأحدث المعدات والأدوات المتطورة التي تليق بحجم حدثك ومكانة ضيوفك.": "I provide official, professional on-site documentation of your events, exhibitions and major conferences. I capture the key moments with the latest equipment and tools that suit the scale of your event and the standing of your guests.", "أصنع لك هويّة بصرية مميزة لا تُنسى. أبتكر مطبوعاتك، قوائم الطعام (Menu)، واللوحات الإعلانية، إلى جانب تصاميم السوشيال ميديا الإبداعية التي تترجم قوة علامتك التجارية بدقة.": "I create a distinctive visual identity you won’t forget. I design your print materials, restaurant menus and billboards, along with creative social media designs that translate the strength of your brand precisely.", "أبرز تفاصيل منتجاتك وقوائم طعامك بأفضل الزوايا والإضاءة السينمائية. أحرص على أن ينطق منتجك جمالاً لأجذب عملائك وأحفزهم على الشراء الفوري.": "I highlight the details of your products and menus with the best angles and cinematic lighting. I make sure your product speaks beauty, to attract your customers and motivate them to buy right away."});
  Object.assign(DICT,{'لا أكتفي بإدارة الإعلانات، بل أبني حضورًا رقميًا متكاملًا لنشاطك. أقرأ أرقامك وأدير حملاتك بدقة لأرفع مبيعاتك وأحقق لك عائدًا حقيقيًا على الاستثمار.':'I don\u2019t just run ads; I build a complete digital presence for your business. I read your numbers and manage your campaigns precisely to lift your sales and deliver a real return on investment.'});
  window.trI=function(ar){return (lang==='en'&&DICT[ar])||ar};
  Object.assign(DICT,{"نتائج ملموسة وأثر يُقاس": "Tangible Results, Measurable Impact", "أجمع بين رؤية المسوّق التي تستهدف العائد والمبيعات، وعين المصوّر التي تصنع محتوى استثنائياً؛ لنقود حملتك من التخطيط الميداني حتى تحقيق الأثر.": "I combine a marketer’s vision that targets return and sales with a photographer’s eye that creates exceptional content, to lead your campaign from field planning to achieving impact.", "علامات تجارية قادت نموها": "Brands whose growth I led", "نمو مبيعات محقق لشركائي": "Sales growth achieved for my partners", "منصات إعلانية معتمدة": "Approved ad platforms", "حلول متكاملة يقودها شريك واحد": "Integrated solutions led by one partner", "أبني وأدير حملات إعلانية مدفوعة بدقة تحليلية عالية؛ أستهدف جمهورك الفعلي، وأحسّن أداء الميزانيات لتحويل التفاعل والمشاهدات إلى مبيعات ونمو مستدام": "I build and run paid ad campaigns with high analytical precision; I target your real audience and optimize budget performance to turn engagement and views into sales and sustainable growth.", "الإنتاج البصري والسينمائي": "Visual & Cinematic Production", "تجهيز ميداني متكامل بأحدث تقنيات الإضاءة والتصوير والحركة؛ ألتقط روح علامتك التجارية وتفاصيل منتجاتك بإخراج سينمائي ومونتاج متقن يرسخ حضورك في الأذهان.": "A complete field setup with the latest lighting, photography and motion technology; I capture the soul of your brand and your product details with cinematic direction and refined editing that anchors your presence in minds.", "عدسات سينمائية فاخرة": "Premium cinematic lenses", "إضاءة سينمائية": "Cinematic lighting", "أنظمة حركة وتثبيت (Gimbal)": "Motion & stabilization systems (Gimbal)", "تصحيح ألوان ومونتاج (Color Grading)": "Color grading & editing", "لكل زاوية حكايتها؛ ننتقي البُعد البؤري الأنسب لكل مشهد لنبرز تفاصيل منتجاتك وفخامة مكانك بأعلى دقة سينمائية": "Every angle has its story; we choose the focal length best suited to each scene to highlight your product details and the luxury of your venue in the highest cinematic precision.", "نصنع لعلامتك التجارية حضوراً يستحق المشاهدة والريادة": "We craft your brand a presence worth watching and leading."});
  var phStore=[];
  var lang='ar',store=[],stmAr=[];
  var btn=document.getElementById('langBtn');
  function skip(n){var p=n.parentNode;if(!p)return true;var t=p.nodeName;return t==='SCRIPT'||t==='STYLE'||t==='NOSCRIPT'||(p.classList&&p.classList.contains('w'))}
  function walk(cb){var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n;while((n=w.nextNode())){if(!skip(n))cb(n)}}
  function toEn(){
    walk(function(n){
      var raw=n.nodeValue,key=raw.replace(/\s+/g,' ').trim(),pe=n.parentNode,ov=pe&&pe.getAttribute&&pe.getAttribute('data-en');
      if(key&&(ov||DICT[key])){store.push([n,raw]);n.nodeValue=raw.match(/^\s*/)[0]+(ov||DICT[key])+raw.match(/\s*$/)[0]}
    });
    [].forEach.call(document.querySelectorAll('[placeholder]'),function(el){var v=el.getAttribute('placeholder');if(PH[v]){phStore.push([el,v]);el.setAttribute('placeholder',PH[v])}});
    var ws=document.querySelectorAll('#intro .w');
    stmAr=[].map.call(ws,function(w){return w.textContent});
    [].forEach.call(ws,function(w,i){w.textContent=STM[i]||''});
    document.title='Ismueil Osman | Photographer, Marketer & Ad Designer in Saudi Arabia';
  }
  function toAr(){
    store.forEach(function(p){p[0].nodeValue=p[1]});store=[];
    phStore.forEach(function(p){p[0].setAttribute('placeholder',p[1])});phStore=[];
    var ws=document.querySelectorAll('#intro .w');
    [].forEach.call(ws,function(w,i){if(stmAr[i]!==undefined)w.textContent=stmAr[i]});
    document.title='إسماعيل عثمان | مصور ومسوق ومصمم إعلانات في السعودية';
  }
  function set(l){
    if(l===lang)return;
    lang=l;
    var h=document.documentElement;
    if(l==='en'){toEn();h.lang='en';h.dir='ltr';btn.textContent='العربية';btn.setAttribute('aria-label','التبديل إلى العربية')}
    else{toAr();h.lang='ar';h.dir='rtl';btn.textContent='English';btn.setAttribute('aria-label','Switch to English')}
    try{localStorage.setItem('lang',l)}catch(e){}
    window.dispatchEvent(new Event('resize'));window.dispatchEvent(new Event('langchange'));
  }
  btn.addEventListener('click',function(){set(lang==='ar'?'en':'ar')});
  try{if(localStorage.getItem('lang')==='en')set('en')}catch(e){}

  /* الضغط على شعار شريك */
  var plb=document.getElementById('plb'),pc=plb.querySelector('.pcard'),pi=pc.querySelector('img'),pn=pc.querySelector('b');
  function openBrand(f){
    var b=f.getAttribute('data-brand'),url=PARTNER_LINKS[b];
    if(url){window.open(url,'_blank','noopener');return}
    pi.src=f.querySelector('img').src;pi.alt=b;
    pn.textContent=lang==='en'?(BR[b]||b):b;
    pc.classList.toggle('dk',f.classList.contains('dk'));
    plb.classList.add('on');
  }
  var sec=document.getElementById('partners');
  sec.addEventListener('click',function(e){var f=e.target.closest('.pc');if(f)openBrand(f)});
  sec.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){var f=e.target.closest&&e.target.closest('.pc');if(f){e.preventDefault();openBrand(f)}}});
  plb.addEventListener('click',function(){plb.classList.remove('on')});
  addEventListener('keydown',function(e){if(e.key==='Escape')plb.classList.remove('on')});
})();
}catch(e){console.error(e)}
try{
(function(){
  /* ربط النموذج بالبريد: خدمة FormSubmit المجانية. أول رسالة ترسلها تصلك معها رسالة تفعيل على بريدك، اضغط الرابط فيها مرة واحدة.
     لاستخدام Formspree بدلًا منها: ضع رابط نموذجك هنا مثل https://formspree.io/f/xxxxxxxx */
  var FORM_ENDPOINT='https://formsubmit.co/ajax/ismailosmanamirhamzh@gmail.com';
  var OWNER_EMAIL='ismailosmanamirhamzh@gmail.com';
  var f=document.getElementById('cf'); if(!f)return;
  var $=function(id){return document.getElementById(id)};
  var T=function(ar,en){return document.documentElement.lang==='en'?en:ar};
  var F={name:$('cf-name'),company:$('cf-company'),type:$('cf-type'),other:$('cf-other'),phone:$('cf-phone'),email:$('cf-email'),notes:$('cf-notes')};
  var btn=$('cf-send'),st=$('cf-status');
  function digits(v){return v.replace(/[\u0660-\u0669]/g,function(d){return d.charCodeAt(0)-1632}).replace(/[\u06F0-\u06F9]/g,function(d){return d.charCodeAt(0)-1776})}
  function cleanPhone(v){return digits(v).replace(/[\s\-().]/g,'')}
  var rules={
    name:function(){var v=F.name.value.trim();if(!v)return T('أدخل اسمك','Please enter your name');if(v.length<2)return T('الاسم قصير جدًا','Name is too short')},
    company:function(){if(!F.company.value.trim())return T('أدخل اسم الجهة أو الشركة','Please enter your organization name')},
    type:function(){if(!F.type.value)return T('اختر نوع النشاط','Please select a business type');if(F.type.value==='أخرى'&&!F.other.value.trim())return T('حدد نوع النشاط','Please specify the business type')},
    phone:function(){var v=cleanPhone(F.phone.value);if(!v)return T('أدخل رقم الجوال','Please enter your mobile number');if(!/^(\+|00)?[0-9]{8,15}$/.test(v))return T('رقم الجوال غير صحيح، أدخل أرقامًا فقط (مثال: 0501234567)','Invalid mobile number, use digits only (e.g. 0501234567)')},
    email:function(){var v=F.email.value.trim();if(!v)return T('أدخل بريدك الإلكتروني','Please enter your email');if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))return T('البريد الإلكتروني غير صحيح','Invalid email address')}
  };
  function show(k,msg){var el=$('e-'+k),inp=k==='type'&&F.type.value==='أخرى'&&!F.other.value.trim()?F.other:F[k];el.textContent=msg||'';[F[k],F.other].forEach(function(i){if(i&&(i!==F.other||k==='type')){i.classList.toggle('bad',!!msg);i.setAttribute('aria-invalid',msg?'true':'false')}});if(!msg&&k==='type')F.other.classList.remove('bad')}
  function check(k){var m=rules[k]();show(k,m);return !m}
  Object.keys(rules).forEach(function(k){
    F[k].addEventListener('blur',function(){if(F[k].value)check(k)});
    F[k].addEventListener('input',function(){if($('e-'+k).textContent)check(k)});
    F[k].addEventListener('change',function(){if($('e-'+k).textContent)check(k)});
  });
  F.other.addEventListener('input',function(){if($('e-type').textContent)check('type')});
  F.type.addEventListener('change',function(){var o=F.type.value==='أخرى';F.other.hidden=!o;if(o)F.other.focus()});
  F.phone.addEventListener('input',function(){F.phone.value=digits(F.phone.value).replace(/[^0-9+\s\-()]/g,'')});

  function setStatus(html,err){st.className='cf-status'+(err?' err':'');st.innerHTML=html||''}
  function mailtoFallback(d){
    var body=encodeURIComponent('الاسم: '+d['الاسم']+'\nالجهة: '+d['اسم الجهة / الشركة']+'\nالنشاط: '+d['نوع النشاط']+'\nالجوال: '+(d['رقم الجوال']||'-')+'\nالبريد: '+d.email+'\n\n'+(d['ملاحظات']||''));
    return 'mailto:'+OWNER_EMAIL+'?subject='+encodeURIComponent('رسالة من الموقع')+'&body='+body;
  }
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=true,first=null;
    Object.keys(rules).forEach(function(k){if(!check(k)){ok=false;if(!first)first=(k==='type'&&F.type.value==='أخرى')?F.other:F[k]}});
    if(!ok){setStatus(T('تحقق من الحقول المظللة ثم أعد المحاولة.','Please check the highlighted fields and try again.'),true);if(first)first.focus();return}
    if($('cf-honey').value){showOk();return}
    try{var last=+localStorage.getItem('cf-last')||0;if(Date.now()-last<20000){setStatus(T('تم الإرسال للتو، انتظر لحظات قبل إرسال رسالة أخرى.','Just sent, please wait a few seconds before sending another message.'),true);return}}catch(x){}
    var act=F.type.value==='أخرى'?'أخرى: '+F.other.value.trim():F.type.value;
    var d={'الاسم':F.name.value.trim(),'اسم الجهة / الشركة':F.company.value.trim(),'نوع النشاط':act,'رقم الجوال':cleanPhone(F.phone.value),'email':F.email.value.trim(),'ملاحظات':F.notes.value.trim(),
      '_subject':'رسالة جديدة من موقعك الشخصي: '+F.name.value.trim(),'_template':'table','_captcha':'false'};
    btn.disabled=true;btn.classList.add('busy');btn.querySelector('.cf-lbl').textContent=T('جارٍ الإرسال…','Sending…');setStatus('');
    var ctl=new AbortController(),to=setTimeout(function(){ctl.abort()},20000);
    fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d),signal:ctl.signal})
      .then(function(r){return r.json().catch(function(){return {}}).then(function(j){if(!r.ok||j.success==='false'||j.success===false)throw new Error(j.message||'fail');return j})})
      .then(function(){try{localStorage.setItem('cf-last',Date.now())}catch(x){}showOk()})
      .catch(function(){setStatus(T('تعذّر الإرسال الآن. ','Could not send right now. ')+'<a href="'+mailtoFallback(d)+'">'+T('أرسلها عبر بريدك مباشرة','Send it via your email app')+'</a>',true)})
      .then(function(){clearTimeout(to);btn.disabled=false;btn.classList.remove('busy');btn.querySelector('.cf-lbl').textContent=T('إرسال الرسالة','Send Message')});
  });
  function showOk(){f.hidden=true;$('cf-ok').hidden=false;var h=$('cf-ok').querySelector('h3');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}f.reset();F.other.hidden=true}
  $('cf-again').addEventListener('click',function(){$('cf-ok').hidden=true;f.hidden=false;setStatus('');F.name.focus()});
})();
}catch(e){console.error(e)}
try{
(function(){
  var els=[].slice.call(document.querySelectorAll('.pop-in'));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('on')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.25});
  els.forEach(function(e){io.observe(e)});
})();
}catch(e){console.error(e)}
try{
(function(){
  var h=document.getElementById('wkH');if(!h)return;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion:reduce)').matches){h.classList.add('in');return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.7});
  io.observe(h);
})();
}catch(e){console.error(e)}
try{
(function(){
  var nodes=[].slice.call(document.querySelectorAll('.sv-node')),sec=document.getElementById('services'),inner=sec&&sec.querySelector('.sv-in'),
      ring=document.querySelector('.sv-ring'),cd=document.getElementById('centerDisplay'),ct=document.getElementById('centerTitle'),
      cs=document.getElementById('centerDesc'),ci=document.getElementById('centerIcon'),cm=document.getElementById('centerDescM');
  if(!nodes.length||!sec)return;
  var N=nodes.length,STEP=360/N,PER=48,circle=document.querySelector('.sv-circle'),Wc=circle.offsetWidth;               /* PER = مسافة التمرير لكل دائرة (vh) */
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var tr=function(x){return window.trI?window.trI(x):x},en=function(){return document.documentElement.lang==='en'};
  var base=nodes.map(function(_,i){return -90+STEP*i});
  var idx=0,shown=-1,anim=false,busyUntil=0,swapT=0,lastAbs=0,lastT=0,recent=0,lastY=pageYOffset,snapT=0;
  var unit=(window.CSS&&CSS.supports&&CSS.supports('height','100svh'))?'svh':'vh';
  if(!reduce)sec.style.height='calc(100'+unit+' + '+((N-1)*PER)+'vh)';
  nodes.forEach(function(n){n.style.left='50%';n.style.top='50%';n.style.willChange='translate'});
  var dots=document.createElement('div');dots.className='sv-dots';
  var dotEls=nodes.map(function(n,i){var b=document.createElement('button');b.type='button';b.className='sv-dot';b.setAttribute('aria-label',n.dataset.title);b.addEventListener('click',function(){go(i)});dots.appendChild(b);return b});
  var cnt=document.createElement('span');cnt.className='sv-count';cnt.dir='ltr';dots.appendChild(cnt);
  var hint=document.createElement('p');hint.className='sv-hint';inner.appendChild(dots);inner.appendChild(hint);
  function fill(n){ct.textContent=tr(n.dataset.title);cs.textContent=tr(n.dataset.desc);cm.textContent=tr(n.dataset.desc);ci.innerHTML=n.querySelector(".ni").innerHTML}
  function paintHint(){var last=shown===N-1;hint.innerHTML=(last?'':'<span class="sv-arrow">↓</span>')+'<span>'+(last?(en()?'Keep scrolling to continue to the next section':'واصل التمرير للانتقال للقسم التالي'):(en()?'Scroll down to read the next service':'مرّر للأسفل لقراءة الخدمة التالية'))+'</span>'}
  function setActive(i,first){
    shown=i;
    nodes.forEach(function(x,j){var on=j===i;x.classList.toggle('active',on);x.setAttribute('aria-pressed',on?'true':'false');dotEls[j].classList.toggle('on',on)});
    cnt.textContent=(i+1)+' / '+N;paintHint();
    if(first){fill(nodes[i]);return}
    cd.style.opacity='0';cd.style.transform='translateY(10px)';cm.style.opacity='0';
    clearTimeout(swapT);swapT=setTimeout(function(){fill(nodes[shown]);cd.style.opacity='1';cd.style.transform='none';cm.style.opacity='1'},140);
  }
  function geom(){var top=sec.getBoundingClientRect().top+pageYOffset;return {top:top,T:Math.max(1,sec.offsetHeight-inner.offsetHeight)}}
  function posOf(i){var g=geom();return g.top+i*g.T/(N-1)}
  function pinned(){var g=geom(),y=pageYOffset;return y>=g.top-1&&y<=g.top+g.T+1}
  /* الدوران يتبع التمرير الطبيعي مباشرة مع تنعيم خفيف — بدون حجز عجلة الماوس أو اللمس */
  var cur=0,target=0,raf=0;
  function draw(f){
    var R=-STEP*f,r=Wc/2;
    nodes.forEach(function(n,i){var a=(base[i]+R)*Math.PI/180;n.style.translate='calc(-50% + '+(r*Math.cos(a)).toFixed(1)+'px) calc(-50% + '+(r*Math.sin(a)).toFixed(1)+'px)'});
    if(ring)ring.style.transform='rotate('+(-R*0.6).toFixed(2)+'deg)';
    var a=Math.round(f);if(a!==shown)setActive(a,shown<0);
  }
  function tick(){
    raf=0;var d=target-cur;
    cur=Math.abs(d)<0.002?target:cur+d*0.14;
    draw(cur);
    if(cur!==target)raf=requestAnimationFrame(tick);
  }
  function render(){
    var g=geom();
    target=reduce?Math.max(0,shown):Math.min(N-1,Math.max(0,(pageYOffset-g.top)/g.T*(N-1)));
    if(reduce){cur=target;draw(cur);return}
    if(!raf)raf=requestAnimationFrame(tick);
  }
  /* الضغط على نقطة أو دائرة: انتقال ناعم لموضعها */
  function glide(y1,dur){
    if(anim)return;var y0=pageYOffset;if(Math.abs(y1-y0)<1)return;
    anim=true;var h=document.documentElement,t0=performance.now();h.style.scrollBehavior='auto';
    (function step(t){
      var k=Math.min(1,(t-t0)/dur),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
      window.scrollTo(0,y0+(y1-y0)*e);render();
      if(k<1)requestAnimationFrame(step);else{h.style.scrollBehavior='';anim=false}
    })(t0);
  }
  function go(i){i=Math.max(0,Math.min(N-1,i));if(reduce){setActive(i);render();return}glide(posOf(i),Math.min(1100,520+140*Math.abs(i-Math.round(cur))))}
  nodes.forEach(function(n,i){n.addEventListener('click',function(){go(i)})});
  addEventListener('scroll',render,{passive:true});
  addEventListener('resize',function(){Wc=circle.offsetWidth;render()});
  window.addEventListener('langchange',function(){fill(nodes[Math.max(0,shown)]);paintHint()});
  var g0=geom(),f0=reduce?0:Math.min(N-1,Math.max(0,(pageYOffset-g0.top)/g0.T*(N-1)));idx=Math.round(f0);
  setActive(idx,true);render();
})();
}catch(e){console.error(e)}
try{
(function(){
  /* طريقة عملي: كل عنصر يطلع من تحت لحاله لما يدخل الشاشة أثناء التمرير */
  var sec=document.getElementById('process');
  if(!sec||!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  document.documentElement.classList.add('pr-anim');
  var els=[].slice.call(sec.querySelectorAll('.pr-up,.pr-step'));
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('pr-on');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){if(el.getBoundingClientRect().top<innerHeight*.9)el.classList.add('pr-on');else io.observe(el)});
})();
}catch(e){console.error(e)}

try{
(function(){
  /* قائمة الجوال */
  var b=document.getElementById('menuBtn'),m=document.getElementById('mnav');if(!b||!m)return;
  var en=function(){return document.documentElement.lang==='en'};
  function open(){m.hidden=false;requestAnimationFrame(function(){m.classList.add('open')});b.setAttribute('aria-expanded','true');b.setAttribute('aria-label',en()?'Close menu':'إغلاق القائمة');document.documentElement.classList.add('mnav-lock');var f=m.querySelector('a');f&&f.focus({preventScroll:true})}
  function close(back){m.classList.remove('open');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label',en()?'Open menu':'فتح القائمة');document.documentElement.classList.remove('mnav-lock');setTimeout(function(){if(b.getAttribute('aria-expanded')==='false')m.hidden=true},300);if(back)b.focus()}
  b.addEventListener('click',function(){b.getAttribute('aria-expanded')==='true'?close():open()});
  m.addEventListener('click',function(e){if(e.target===m)close();var a=e.target.closest('a');if(a)close()});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&b.getAttribute('aria-expanded')==='true')close(true)});
  addEventListener('resize',function(){if(innerWidth>=768&&b.getAttribute('aria-expanded')==='true')close()});
})();
}catch(e){console.error(e)}

try{
(function(){
  /* الريلز: تشغيل تلقائي صامت عند الظهور، وزر للصوت */
  var list=document.querySelector('.reels');if(!list)return;
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var items=[].slice.call(list.querySelectorAll('.reel'));
  var en=function(){return document.documentElement.lang==='en'};
  if(!('IntersectionObserver' in window)||reduce){document.documentElement.classList.add('no-reel-anim')}
  else{new IntersectionObserver(function(es,o){if(es[0].isIntersecting){list.classList.add('in');o.disconnect()}},{threshold:.15}).observe(list)}
  function play(r){var v=r.querySelector('video');var p=v.play();if(p&&p.catch)p.catch(function(){});r.classList.add('playing')}
  function pause(r){r.querySelector('video').pause();r.classList.remove('playing')}
  items.forEach(function(r){
    var v=r.querySelector('video'),pb=r.querySelector('.reel-play'),sb=r.querySelector('.reel-snd');
    v.addEventListener('click',function(){v.paused?play(r):pause(r)});
    pb.addEventListener('click',function(){play(r)});
    sb.addEventListener('click',function(){
      var on=v.muted;
      items.forEach(function(o){var ov=o.querySelector('video');ov.muted=true;var b=o.querySelector('.reel-snd');b.setAttribute('aria-pressed','false');b.setAttribute('aria-label',en()?'Turn sound on':'تشغيل الصوت')});
      if(on){v.muted=false;sb.setAttribute('aria-pressed','true');sb.setAttribute('aria-label',en()?'Mute':'كتم الصوت');play(r)}
    });
  });
  if(reduce||!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){var r=e.target;if(e.intersectionRatio>=.6)play(r);else if(!r.querySelector('video').muted&&e.intersectionRatio>0){}else pause(r)})},{threshold:[0,.6]});
  items.forEach(function(r){io.observe(r)});
})();
}catch(e){console.error(e)}

try{
/* ===== فتحة العدسة: قسم "من أنا" ينكشف بشفرات الغالق ===== */
(function(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var ab=document.getElementById('about');if(!ab)return;
  var tk=false,done=false,C=Math.cos(Math.PI/8);
  function run(){
    tk=false;
    var r=ab.getBoundingClientRect(),vh=innerHeight;
    if(r.top>vh||r.bottom<0){ab.style.clipPath=r.top>vh?'polygon(50% 0,50% 0,50% 0)':'none';return}
    var p=Math.min(1,Math.max(0,(vh-r.top)/(vh*.8)));
    if(p>=1){if(ab.style.clipPath!=='none')ab.style.clipPath='none';return}
    var w=r.width,h=r.height,cx=w/2,cy=Math.min(h,Math.max(0,vh*.55-r.top));
    var maxR=Math.hypot(Math.max(cx,w-cx),Math.max(cy,h-cy))/C*1.02;
    var e=p*p*(3-2*p),R=Math.max(1,maxR*e),rot=(1-e)*1.2,pts=[];
    for(var k=0;k<8;k++){var a=rot+k*Math.PI/4;pts.push((cx+R*Math.cos(a)).toFixed(1)+'px '+(cy+R*Math.sin(a)).toFixed(1)+'px')}
    ab.style.clipPath='polygon('+pts.join(',')+')';
  }
  function req(){if(!tk){tk=true;requestAnimationFrame(run)}}
  addEventListener('scroll',req,{passive:true});addEventListener('resize',req);run();
})();
/* ===== ضبط التركيز: صور الأعمال تبدأ ضبابية وتتضح لما تدخل الشاشة ===== */
(function(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver' in window))return;
  var els=document.querySelectorAll('#work .wed, #work .work');if(!els.length)return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);
    el.classList.add('rf-on');setTimeout(function(){el.classList.add('rf-done')},1600);
  })},{threshold:.35,rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){
    if(el.getBoundingClientRect().top<innerHeight*.9)return;   /* اللي ظاهر من البداية يبقى واضح */
    var b=document.createElement('i');b.className='rf-b';b.setAttribute('aria-hidden','true');el.appendChild(b);
    el.classList.add('rf');io.observe(el);
  });
})();
}catch(e){console.error(e)}

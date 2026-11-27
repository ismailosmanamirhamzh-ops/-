/*! © 2026 Ismueil Osman (إسماعيل عثمان) — ismueilosman.com. All rights reserved. */
/* ===== مساعد إسماعيل: دائرة عائمة في كل صفحات الموقع، تعرّف بالخدمات وتقترح الأنسب وتحوّل لواتساب ===== */
(function(){
  if(window.__advOn)return;window.__advOn=1;
  var st=document.createElement('style');st.textContent=".fq-ty{display:none;gap:.28rem;padding:.35rem .1rem}.fq-ty i{width:.45rem;height:.45rem;border-radius:50%;background:#9aa0ad;animation:fqty 1s infinite ease-in-out}.fq-ty i:nth-child(2){animation-delay:.15s}.fq-ty i:nth-child(3){animation-delay:.3s}.fq-i.typing .fq-ty{display:flex}/* ===== المستشار السريع ===== */.adv-fab{position:fixed;bottom:calc(1.1rem + env(safe-area-inset-bottom,0px));inset-inline-end:1.1rem;z-index:60;width:3.6rem;height:3.6rem;border-radius:50%;padding:0;border:2px solid #f2b45a;background:#111;box-shadow:0 12px 30px -8px rgba(0,0,0,.8),0 0 0 0 rgba(242,180,90,.5);cursor:pointer;opacity:0;transform:scale(.6) translateY(20px);pointer-events:none;transition:opacity .4s,transform .5s cubic-bezier(.2,1.4,.4,1)}.adv-fab.in{opacity:1;transform:none;pointer-events:auto;animation:advring 2.6s 1s 3}.adv-fab img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}.adv-dot{position:absolute;bottom:.15rem;inset-inline-start:.15rem;width:.8rem;height:.8rem;border-radius:50%;background:#25D366;border:2px solid #111}.adv-tip{position:absolute;bottom:50%;transform:translateY(50%) scale(.9);inset-inline-end:calc(100% + .7rem);white-space:nowrap;padding:.5rem .85rem;border-radius:1rem;background:#f4f1ea;color:#111;font:800 .82rem Cairo,sans-serif;box-shadow:0 10px 25px -10px rgba(0,0,0,.7);opacity:0;pointer-events:none;transition:opacity .3s,transform .3s}.adv-fab.tip .adv-tip{opacity:1;transform:translateY(50%) scale(1)}.adv-fab.open{transform:scale(.92)}.adv{position:fixed;z-index:61;bottom:calc(5.6rem + env(safe-area-inset-bottom,0px));inset-inline-end:1.1rem;width:min(23rem,calc(100vw - 2.2rem));max-height:min(36rem,calc(100vh - 8rem));display:flex;flex-direction:column;border-radius:1.4rem;overflow:hidden;background:#0f1014;border:1px solid rgba(255,255,255,.1);box-shadow:0 30px 70px -20px rgba(0,0,0,.9);opacity:0;transform:translateY(16px) scale(.97);transform-origin:bottom left;visibility:hidden;pointer-events:none;transition:opacity .3s,transform .35s cubic-bezier(.2,.8,.2,1),visibility 0s linear .35s}.adv.on{opacity:1;transform:none;visibility:visible;pointer-events:auto;transition-delay:0s}.adv-h{display:flex;align-items:center;gap:.7rem;padding:.85rem 1rem;background:linear-gradient(135deg,rgba(242,180,90,.16),rgba(242,180,90,.03));border-bottom:1px solid rgba(255,255,255,.07)}.adv-h img{width:2.5rem;height:2.5rem;border-radius:50%;border:1.5px solid #f2b45a}.adv-h div{flex:1;min-width:0;display:flex;flex-direction:column}.adv-h b{font:900 1rem Cairo,sans-serif}.adv-h small{font-size:.72rem;color:#a9afbf}.adv-x{width:2rem;height:2rem;border-radius:50%;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.04);color:#fff;cursor:pointer}.adv-log{position:relative;flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.6rem;overscroll-behavior:contain}.adv-m{max-width:88%;padding:.65rem .85rem;border-radius:1rem;line-height:1.85;font-size:.92rem;animation:fqin .3s cubic-bezier(.2,.8,.2,1)}.adv-bot{align-self:flex-end;background:#1d1f25;border:1px solid rgba(255,255,255,.07);border-end-end-radius:.3rem}html[lang=en] .adv-bot{align-self:flex-start}.adv-me{align-self:flex-start;background:rgba(242,180,90,.18);border:1px solid rgba(242,180,90,.3);border-end-start-radius:.3rem}html[lang=en] .adv-me{align-self:flex-end}.adv-m ul{margin:.4rem 0;padding-inline-start:1.1rem;list-style:disc}.adv-m li{margin:.15rem 0}.adv-typing{padding:.5rem .8rem}.adv-q{display:flex;flex-wrap:wrap;gap:.45rem;padding:.75rem 1rem 1rem;border-top:1px solid rgba(255,255,255,.06)}.adv-q:empty{display:none}.adv-c{padding:.5rem .85rem;border-radius:2rem;border:1px solid rgba(242,180,90,.45);background:rgba(242,180,90,.06);color:#f4e2c2;font:700 .84rem Cairo,sans-serif;cursor:pointer;transition:background .2s,transform .2s}.adv-c:hover{background:rgba(242,180,90,.18);transform:translateY(-1px)}.adv-c.adv-wa{background:#25D366;border-color:#25D366;color:#062b16}.adv{inset-inline:.6rem;width:auto;bottom:calc(5.2rem + env(safe-area-inset-bottom,0px));max-height:calc(100vh - 7rem)}.adv-fab{inset-inline-end:.9rem;bottom:calc(.9rem + env(safe-area-inset-bottom,0px))}.adv,.adv-fab{transition:none}.adv-fab.in{animation:none}.svx-t h3,.lz h3,.pr-step h3,.reel h4,.fq-i summary,.adv-h b{font-family:'Noto Sans Arabic',Cairo,sans-serif!important;font-stretch:87.5%;font-weight:800}@media(max-width:560px){.adv{inset-inline:.6rem;width:auto;bottom:calc(5.2rem + env(safe-area-inset-bottom,0px));max-height:calc(100vh - 7rem)}.adv-fab{inset-inline-end:.9rem;bottom:calc(.9rem + env(safe-area-inset-bottom,0px))}}@media(prefers-reduced-motion:reduce){.adv,.adv-fab{transition:none}.adv-fab.in{animation:none}}@keyframes advring{0%{box-shadow:0 12px 30px -8px rgba(0,0,0,.8),0 0 0 0 rgba(242,180,90,.55)}70%{box-shadow:0 12px 30px -8px rgba(0,0,0,.8),0 0 0 14px rgba(242,180,90,0)}}@keyframes fqin{from{opacity:0;transform:translateY(8px) scale(.97)}}@keyframes fqty{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}}";document.head.appendChild(st);
  var WA='966574395924',ICON='/assets/img/icon-192.png?v=2';
  var en=function(){return document.documentElement.lang==='en'},T=function(a,e){return en()?e:a};
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var HOME=!!document.getElementById('top')&&!!document.getElementById('hero');
  var fab=document.createElement('button');fab.type='button';fab.className='adv-fab';fab.setAttribute('aria-expanded','false');fab.setAttribute('aria-controls','advPanel');
  fab.innerHTML='<img src="'+ICON+'" alt="" width="56" height="56"><i class="adv-dot"></i><span class="adv-tip"></span>';
  var panel=document.createElement('div');panel.className='adv';panel.id='advPanel';panel.setAttribute('role','dialog');panel.hidden=true;
  panel.innerHTML='<div class="adv-h"><img src="'+ICON+'" alt="" width="40" height="40"><div><b class="adv-n"></b><small class="adv-s"></small></div><button type="button" class="adv-x"><span aria-hidden="true">✕</span></button></div><div class="adv-log" aria-live="polite"></div><div class="adv-q"></div>';
  document.body.appendChild(panel);document.body.appendChild(fab);
  var log=panel.querySelector('.adv-log'),qs=panel.querySelector('.adv-q'),ans={},started=false;
  function labels(){
    fab.setAttribute('aria-label',T('اسأل مساعد إسماعيل','Ask Ismueil\'s assistant'));fab.querySelector('.adv-tip').textContent=T('عندك سؤال؟ اسألني','Got a question? Ask me');
    panel.setAttribute('aria-label',T('مساعد إسماعيل','Ismueil\'s assistant'));panel.querySelector('.adv-n').textContent=T('مساعد إسماعيل','Ismueil\'s assistant');
    panel.querySelector('.adv-s').textContent=T('يرد فورًا · يوصلك لإسماعيل على واتساب','Instant replies · connects you to Ismueil on WhatsApp');
    panel.querySelector('.adv-x').setAttribute('aria-label',T('إغلاق','Close'));
  }
  labels();
  function scroll(){log.scrollTop=log.scrollHeight}
  function me(t){var d=document.createElement('div');d.className='adv-m adv-me';d.textContent=t;log.appendChild(d);scroll()}
  function bot(html,cb){
    var d=document.createElement('div');d.className='adv-m adv-bot adv-typing';d.innerHTML='<span class="fq-ty" style="display:flex"><i></i><i></i><i></i></span>';log.appendChild(d);scroll();
    setTimeout(function(){d.classList.remove('adv-typing');d.innerHTML=html;if(cb)cb();log.scrollTop=d.offsetHeight<log.clientHeight-16?log.scrollHeight:d.offsetTop-12},reduce?0:550);
  }
  function chips(list){
    qs.innerHTML='';
    list.forEach(function(c){
      var b=document.createElement(c.href?'a':'button');b.className='adv-c'+(c.wa?' adv-wa':'');b.textContent=c.t;
      if(c.href){b.href=c.href;if(/^https?:/.test(c.href)){b.target='_blank';b.rel='noopener'}}else{b.type='button';b.addEventListener('click',function(){qs.innerHTML='';if(!c.silent)me(c.t);c.go()})}
      qs.appendChild(b);
    });
  }
  function waLink(msg){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(msg)}
  function back(){bot(T('وش تحب تعرف بعد؟','What else would you like to know?'),menu)}
  function menu(){chips([
    {t:T('وش الخدمات؟','What do you offer?'),go:services},
    {t:T('أبي موقع أو تطبيق أو منصة','I need a website, app or platform'),go:dev},
    {t:T('هل يناسب نشاطي؟','Is it right for my business?'),go:fit1},
    {t:T('كم التكلفة؟','How much does it cost?'),go:cost},
    {t:T('شوف أعماله','See his work'),go:work},
    {t:T('راسل إسماعيل مباشرة','Message Ismueil directly'),href:waLink(T('السلام عليكم، تواصلت معك من موقعك','Hi Ismueil, I found you through your website')),wa:true}
  ])}
  function start(){
    started=true;
    bot(T('أهلًا 👋 أنا مساعد إسماعيل.<br>أقدر أعرّفك على خدماته وأقترح لك الأنسب لنشاطك في أقل من دقيقة. وش تحب تعرف؟','Hi 👋 I\'m Ismueil\'s assistant.<br>I can walk you through his services and suggest what fits your business in under a minute. What would you like to know?'),menu);
  }
  function services(){
    bot(T('إسماعيل مصوّر ومسوّق ومصمّم ومطوّر مواقع في السعودية، ويشتغل على مشروعك من الفكرة حتى النتيجة:<ul><li><b>تصوير</b> إعلانات المطاعم والمنتجات، صور وفيديوهات قصيرة</li><li><b>مونتاج</b> وموشن جرافيك وتصحيح ألوان</li><li><b>حملات إعلانية</b> على سناب وتيك توك وميتا وGoogle</li><li><b>تصميم</b> شعارات وهوية بصرية ومنشورات</li><li><b>إدارة حسابات</b> السوشيال ميديا شهريًا</li><li><b>توثيق النشاط</b> في خرائط Google</li><li><b>تطوير مواقع وتطبيقات ومنصات</b> احترافية ولوحات تحكم ومتاجر</li><li><b>تغطية</b> الفعاليات والمؤتمرات</li></ul>تتعامل معه مباشرة بدون وسطاء، ويخدم كل مدن المملكة.',
      'Ismueil is a photographer, marketer, designer and web developer in Saudi Arabia who takes your project from idea to result:<ul><li><b>Photography</b> for restaurant and product ads, photos and short videos</li><li><b>Editing</b>, motion graphics and colour grading</li><li><b>Ad campaigns</b> on Snapchat, TikTok, Meta and Google</li><li><b>Design</b>: logos, visual identity and posts</li><li><b>Social media management</b>, monthly</li><li><b>Google Maps</b> business listing and verification</li><li><b>Websites, apps and platforms</b>, dashboards and online stores</li><li><b>Event</b> and conference coverage</li></ul>You work with him directly, no middlemen, anywhere in Saudi Arabia.'),
      function(){chips([{t:T('أبي موقع أو منصة','I need a website or platform'),go:dev},{t:T('هل يناسب نشاطي؟','Is it right for my business?'),go:fit1},{t:T('كم التكلفة؟','How much does it cost?'),go:cost},{t:T('صفحات الخدمات','Service pages'),go:pages}])});
  }
  function pages(){
    bot(T('اختر الخدمة وأوديك لصفحتها، فيها الباقات والأسعار والأسئلة:','Pick a service and I\'ll take you to its page with packages, prices and FAQs:'),function(){chips([
      {t:T('تطوير المواقع والمنصات','Websites & platforms'),href:'/web-development/'},
      {t:T('تصميم شعار','Logo design'),href:'/logo-design/'},
      {t:T('خرائط Google','Google Maps'),href:'/google-maps/'},
      {t:T('تصوير المطاعم والمنتجات','Restaurant photography'),href:'/restaurant-photography/'},
      {t:T('الإعلانات','Ad campaigns'),href:'/ad-campaigns/'},
      {t:T('إدارة الحسابات','Social media'),href:'/social-media-management/'},
      {t:T('القائمة الرئيسية','Main menu'),go:back,silent:true}
    ])});
  }
  function dev(){
    bot(T('إسماعيل يصمّم ويبرمج بنفسه:<ul><li><b>مواقع رسمية</b> للأفراد والشركات على دومين باسمك</li><li><b>تطبيقات ويب</b> تنزل على الجوال</li><li><b>منصات إدارة ولوحات تحكم</b> لفريقك</li><li><b>متاجر ومنيو إلكتروني</b> وصفحات هبوط للإعلانات</li></ul>كلها بتصميم عربي فاخر وتهيئة لمحركات البحث. من أعماله منصة إدارة التسويق لشؤون الغذاء، وموقع المستشار عبدالقادر أبو سبعة.',
      'Ismueil designs and codes himself:<ul><li><b>Official websites</b> for people and companies on your own domain</li><li><b>Web apps</b> that install on the phone</li><li><b>Management platforms and dashboards</b> for your team</li><li><b>Online stores, digital menus</b> and ad landing pages</li></ul>All with an elegant Arabic-first design, built for search. His work includes the Shu\'un Al-Ghitha marketing platform and the website of legal counsel Abdulqader Abu Sabaa.'),
      function(){chips([{t:T('صفحة تطوير المواقع','Web development page'),href:'/web-development/'},{t:T('احجز استشارة مجانية','Book a free consultation'),href:'/consultation/?svc=dev'},{t:T('اطلب عرض سعر على واتساب','Ask for a quote on WhatsApp'),href:waLink(T('السلام عليكم إسماعيل، أبي موقع/منصة لنشاطي وأبي عرض سعر','Hi Ismueil, I need a website/platform and would like a quote')),wa:true},{t:T('القائمة الرئيسية','Main menu'),go:back,silent:true}])});
  }
  var SECT=[['مطعم أو كافيه','Restaurant or café','r'],['متجر أو منتج','Store or product','p'],['شركة أو مكتب','Company or office','b'],['عقار','Real estate','e'],['فعالية أو مناسبة','Event or occasion','v'],['شيء آخر','Something else','o']];
  var GOAL=[['أبي أزيد مبيعاتي','Increase my sales','s'],['أبي محتوى لحساباتي','Content for my accounts','c'],['أبي موقع أو منصة','A website or platform','w'],['أبي هوية أو شعار','An identity or logo','i'],['عندي افتتاح أو إطلاق','A launch or opening','l'],['أبي تغطية حدث','Cover an event','v']];
  var HAS=[['لا، أبدأ من الصفر','No, starting from scratch','n'],['عندي محتوى ويحتاج إعلانات','I have content, need ads','y']];
  function pick(arr,key,next){chips(arr.map(function(a){return {t:T(a[0],a[1]),go:function(){ans[key]=a;next()}}}))}
  function fit1(){ans={};bot(T('تمام، أسئلة سريعة.<br><b>١</b> وش نوع نشاطك؟','Great, a few quick questions.<br><b>1</b> What kind of business is it?'),function(){pick(SECT,'s',fit2)})}
  function fit2(){bot(T('<b>٢</b> وش أهم هدف عندك الحين؟','<b>2</b> What\'s your main goal right now?'),function(){pick(GOAL,'g',function(){var g=ans.g[2];if(g==='v'||g==='w'||g==='i'){ans.h=null;rec()}else fit3()})})}
  function fit3(){bot(T('<b>٣</b> عندك صور وفيديوهات جاهزة؟','<b>3</b> Do you already have photos and videos?'),function(){pick(HAS,'h',rec)})}
  function rec(){
    var s=ans.s[2],g=ans.g[2],h=ans.h&&ans.h[2],r,link=null;
    if(g==='w'){r=T('<b>موقع أو منصة احترافية</b>: '+(s==='r'?'موقع للمطعم مع منيو إلكتروني وطلب مباشر':s==='p'?'متجر أو صفحة طلب بأسعار واضحة':s==='b'?'موقع رسمي للشركة يعرّف بخدماتها ويجيب عملاء':'موقع رسمي أو منصة تناسب شغلك')+'، بتصميم عربي فاخر وتهيئة لمحركات البحث.','<b>A professional website or platform</b>: '+(s==='r'?'a restaurant site with a digital menu and direct ordering':s==='p'?'a store or order page with clear prices':s==='b'?'an official company site that presents your services and brings clients':'an official site or platform that fits your work')+', with an elegant Arabic-first design built for search.');link={t:T('صفحة تطوير المواقع','Web development page'),href:'/web-development/'}}
    else if(g==='i'){r=T('<b>هوية بصرية</b>: شعار وألوان وخطوط وبطاقة أعمال وقوالب سوشيال، تبدأ من 49 ريال في المتجر.','<b>Visual identity</b>: logo, colours, fonts, business card and social templates, from 49 SAR in the store.');link={t:T('صفحة تصميم الشعار','Logo design page'),href:'/logo-design/'}}
    else if(g==='v')r=T('<b>تغطية فعالية متكاملة</b>: تصوير فوتوغرافي وفيديو للحدث، مع مقطع ملخّص قصير جاهز للنشر على حساباتك.','<b>Full event coverage</b>: photo and video of the event, plus a short recap video ready to post.');
    else if(g==='l')r=T('<b>باقة إطلاق</b>: فيديو تشويقي قبل الافتتاح، وتصوير '+(s==='r'?'المنيو والأطباق':'المنتجات والمكان')+'، وتوثيق النشاط في خرائط Google، وحملة إعلانية تجيب أول العملاء.','<b>Launch package</b>: a teaser video before opening, a shoot of your '+(s==='r'?'menu and dishes':'products and space')+', a Google Maps listing, and an ad campaign to bring in the first customers.');
    else if(g==='s'&&h==='y'){r=T('<b>إدارة حملات إعلانية</b> على سناب وتيك توك وميتا وGoogle، مع متابعة الأرقام وتحسين الإعلانات لين ترتفع المبيعات.','<b>Ad campaign management</b> on Snapchat, TikTok, Meta and Google, tracking the numbers and optimising until sales rise.');link={t:T('صفحة الإعلانات','Ad campaigns page'),href:'/ad-campaigns/'}}
    else if(g==='s')r=T('<b>من التصوير حتى النتيجة</b>: يصوّر لك إعلانات قصيرة'+(s==='r'?' مثل إعلانات المطاعم في أعماله':'')+'، ويطلقها في حملة على المنصة المناسبة، ويتابع الأرقام ويحسّنها.','<b>From shoot to results</b>: short ads'+(s==='r'?' like the restaurant ads in his work':'')+', launched as a campaign on the right platform, with the numbers tracked and optimised.');
    else{r=T('<b>محتوى شهري</b>: فيديوهات قصيرة وصور وتصاميم بهوية واحدة، مع إدارة الحسابات والنشر والردود.','<b>Monthly content</b>: short videos, photos and designs in one identity, with account management, publishing and replies.');link={t:T('صفحة إدارة الحسابات','Social media page'),href:'/social-media-management/'}}
    var sum=T('السلام عليكم إسماعيل، جيتك من موقعك.\nنوع النشاط: '+ans.s[0]+'\nالهدف: '+ans.g[0]+(ans.h?'\nالمحتوى: '+ans.h[0]:'')+'\nأبي أعرف أكثر عن الخدمة المقترحة.',
      'Hi Ismueil, I came from your website.\nBusiness: '+ans.s[1]+'\nGoal: '+ans.g[1]+(ans.h?'\nContent: '+ans.h[1]:'')+'\nI\'d like to know more about the suggested service.');
    bot(T('بناءً على إجاباتك، الأنسب لك:<br>','Based on your answers, the best fit is:<br>')+r+T('<br><br>أرسل اختياراتك لإسماعيل، ويرد عليك بخطة وسعر واضح.','<br><br>Send your answers to Ismueil and he\'ll reply with a clear plan and price.'),
      function(){var c=[{t:T('أرسلها لإسماعيل على واتساب','Send to Ismueil on WhatsApp'),href:waLink(sum),wa:true}];if(link)c.push(link);c.push({t:T('ابدأ من جديد','Start over'),go:fit1},{t:T('القائمة الرئيسية','Main menu'),go:back,silent:true});chips(c)});
  }
  function cost(){
    bot(T('عنده <b>متجر خدمات</b> بأسعار ثابتة تبدأ من 9 ريال: تصميم شعار من 49، وتوثيق خرائط Google من 29، وحملة إعلانية من 199، وإدارة حسابات من 349 شهريًا.<br>أما المواقع والمنصات والتصوير الكبير، فيحدد السعر بعد ما يفهم مشروعك، والاستفسار بدون أي التزام.','He has a <b>services store</b> with fixed prices from 9 SAR: logo design from 49, Google Maps listing from 29, an ad campaign from 199, and social media management from 349 a month.<br>Websites, platforms and bigger shoots are quoted after he understands your project, with no commitment.'),
      function(){chips([{t:T('افتح المتجر','Open the store'),href:'/app/store/'},{t:T('ساعدني أحدد احتياجي','Help me figure out what I need'),go:fit1},{t:T('اسأله عن السعر على واتساب','Ask him for a price on WhatsApp'),href:waLink(T('السلام عليكم إسماعيل، أبي أعرف تكلفة مشروع','Hi Ismueil, I\'d like a quote for a project')),wa:true}])});
  }
  function work(){
    bot(T('في أعماله إعلانات مطاعم قصيرة، وتصوير قيادات شركات، وأعراس، وتصاميم وهويات، ومنصة إدارة تسويق، ومواقع رسمية. أوديك لها؟','His work includes short restaurant ads, executive portraits, weddings, designs and identities, a marketing management platform and official websites. Shall I take you there?'),
      function(){chips([{t:T('ودّني للأعمال','Take me there'),go:function(){close();var w=HOME&&document.getElementById('work');if(w)w.scrollIntoView({behavior:reduce?'auto':'smooth'});else location.href='/work/'}},{t:T('المواقع والمنصات','Websites & platforms'),href:'/work/#platforms'},{t:T('القائمة الرئيسية','Main menu'),go:back,silent:true}])});
  }
  function open(){labels();panel.hidden=false;requestAnimationFrame(function(){panel.classList.add('on')});fab.classList.add('open');fab.setAttribute('aria-expanded','true');fab.classList.remove('tip');if(!started)start();setTimeout(function(){var b=qs.querySelector('.adv-c')||panel.querySelector('.adv-x');if(b)b.focus({preventScroll:true})},reduce?0:650)}
  function close(){panel.classList.remove('on');fab.classList.remove('open');fab.setAttribute('aria-expanded','false');setTimeout(function(){if(!panel.classList.contains('on'))panel.hidden=true},300)}
  fab.addEventListener('click',function(){fab.classList.contains('open')?close():open()});
  panel.querySelector('.adv-x').addEventListener('click',function(){close();fab.focus()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&fab.classList.contains('open')){close();fab.focus()}});
  /* في الرئيسية تظهر بعد مقدمة الكاميرا وتختفي عند «تواصل معي». في باقي الصفحات تظهر بعد أول تمرير بسيط */
  var shown=false,hero=document.getElementById('top'),ct=document.getElementById('contact'),atContact=false;
  function chk(){
    var past=HOME?(!hero||hero.getBoundingClientRect().bottom<innerHeight*.5):(scrollY>120||document.documentElement.scrollHeight<=innerHeight+40);
    var vis=past&&!atContact;
    if(vis&&!shown){shown=true;setTimeout(function(){if(!fab.classList.contains('open')&&!fab.classList.contains('hid')){fab.classList.add('tip');setTimeout(function(){fab.classList.remove('tip')},5000)}},2500)}
    fab.classList.toggle('in',vis||fab.classList.contains('open'));
    fab.classList.toggle('hid',!vis&&!fab.classList.contains('open'));
    if(!vis)fab.classList.remove('tip');
  }
  if(HOME&&ct&&'IntersectionObserver' in window)new IntersectionObserver(function(es){atContact=es[0].isIntersecting;chk()},{threshold:.2}).observe(ct);
  var ctk=false;addEventListener('scroll',function(){if(!ctk){ctk=true;requestAnimationFrame(function(){ctk=false;chk()})}},{passive:true});addEventListener('resize',chk);chk();
  /* لما تتغير لغة الصفحة يتحدّث نص الدائرة */
  new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();

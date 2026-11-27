/*! © 2026 Ismueil Osman (إسماعيل عثمان) — ismueilosman.com. All rights reserved. */
/* شريط ذهبي من خيوط رفيعة يتلوّى مثل الثعبان وينرسم مع التمرير، من الافتتاحية إلى آخر الصفحة.
   بعد الواجهة يمشي على أطراف الصفحة ويعبر بين الأقسام، عشان ما يغطي المحتوى. */
(function(){
  var a=document.getElementById('osx'),b=document.getElementById('hero');
  if(!a||!b||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var cv=document.createElement('canvas');cv.setAttribute('aria-hidden','true');
  cv.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:5;mix-blend-mode:screen';
  document.body.appendChild(cv);
  var ctx=cv.getContext('2d'),dpr=1,W=0,H=0,pts=[],nrm=[],len=[],total=0,N=0,prog=0,want=0,raf=0,t0=performance.now();
  var mob=matchMedia('(max-width:700px)').matches,S=mob?9:15;
  function cr(p0,p1,p2,p3,t){var t2=t*t,t3=t2*t;return[.5*(2*p1[0]+(-p0[0]+p2[0])*t+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),.5*(2*p1[1]+(-p0[1]+p2[1])*t+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3)]}
  function absTop(e){return e.getBoundingClientRect().top+scrollY}
  function build(){
    dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    var t0a=absTop(a),h1=a.offsetHeight,h2=b.offsetHeight;
    function Y(k){return t0a+(k<=1?k*h1:h1+(k-1)*h2)}
    var K=mob?[[-.15,.5],[.2,.62],[.75,.8],[1.1,.98],[.6,1.16],[-.05,1.32],[.3,1.55],[.95,1.72],[.97,1.95]]
             :[[-.08,.45],[.18,.6],[.55,.78],[.92,.95],[.78,1.12],[.32,1.24],[.06,1.42],[.22,1.66],[.66,1.8],[.955,1.97]];
    var P=K.map(function(k){return[k[0]*W,Y(k[1])]});
    var eL=mob?.035:.045,eR=1-eL,side=1,secs=[],el=b.nextElementSibling;
    while(el){if(el.offsetHeight>240)secs.push(el);el=el.nextElementSibling}
    var ft=document.querySelector('footer');if(ft)secs.push(ft);
    secs.forEach(function(sc){var tp=absTop(sc),h=sc.offsetHeight,x=side?eR:eL;
      P.push([x*W,tp+Math.min(h*.2,260)]);if(h>900)P.push([(side?eR-.015:eL+.015)*W,tp+h*.5]);P.push([x*W,tp+h-Math.min(h*.2,260)]);side=1-side});
    P.unshift(P[0]);P.push(P[P.length-1]);
    pts=[];for(var i=1;i<P.length-2;i++){var seg=Math.max(20,Math.min(90,Math.round(Math.hypot(P[i+1][0]-P[i][0],P[i+1][1]-P[i][1])/14)));for(var j=0;j<seg;j++)pts.push(cr(P[i-1],P[i],P[i+1],P[i+2],j/seg))}pts.push(P[P.length-2]);
    N=pts.length;nrm=[];len=[0];total=0;
    for(i=0;i<N;i++){var q=pts[Math.min(N-1,i+1)],p=pts[Math.max(0,i-1)],dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy)||1;nrm.push([-dy/L,dx/L]);if(i){total+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);len.push(total)}}
  }
  /* الطرف يتبع خط عند ٦٢٪ من الشاشة: آخر نقطة في المسار مستواها فوق هذا الخط */
  function target(){if(!N)return 0;var y=scrollY+H*.62;for(var i=N-1;i>0;i--){if(pts[i][1]<=y)return len[i]}return len[1]||0}
  function draw(now){
    raf=0;prog+=(want-prog)*.12;if(Math.abs(want-prog)>.5)raf=requestAnimationFrame(draw);
    var tm=(now-t0)/1000;ctx.clearRect(0,0,W,H);if(!N)return;
    var lo=0,hi=N-1;while(lo<hi){var m=(lo+hi+1)>>1;if(len[m]<=prog)lo=m;else hi=m-1}var last=lo;
    var first=last;while(first>0&&len[last]-len[first]<H*1.6)first--;
    var off=-scrollY,spread=mob?3.2:5,hy=pts[last][1]+off;
    if(hy<-300||pts[first][1]+off>H+300&&hy>H+300)return;
    for(var s=0;s<S;s++){
      var k=s-(S-1)/2,ph=s*.55;
      ctx.beginPath();
      for(var i=first;i<=last;i++){var u=len[i]/1800,tw=Math.sin(u*13+tm*.6+ph*.2)*.9+Math.sin(u*5-tm*.35)*.6;
        var w=k*spread*(1.2+Math.sin(u*7+ph)*.8)*tw,x=pts[i][0]+nrm[i][0]*w,y=pts[i][1]+nrm[i][1]*w+off;
        i>first?ctx.lineTo(x,y):ctx.moveTo(x,y)}
      var g=ctx.createLinearGradient(0,hy-H*1.1,0,hy),al=(s%4===0?.6:.28)*(mob?1.5:1);
      g.addColorStop(0,'rgba(242,180,90,0)');g.addColorStop(.45,'rgba(242,180,90,'+al*.55+')');g.addColorStop(1,'rgba(255,226,168,'+al+')');
      ctx.strokeStyle=g;ctx.lineWidth=(s%4===0?1.2:.8)*(mob?1.3:1);ctx.stroke();
    }
    var hx=pts[last][0],r=mob?26:38,gl=ctx.createRadialGradient(hx,hy,0,hx,hy,r);
    gl.addColorStop(0,'rgba(255,248,230,1)');gl.addColorStop(.15,'rgba(255,226,168,.85)');gl.addColorStop(.45,'rgba(242,180,90,.25)');gl.addColorStop(1,'rgba(242,180,90,0)');
    ctx.fillStyle=gl;ctx.beginPath();ctx.arc(hx,hy,r,0,6.2832);ctx.fill();
  }
  function kick(){if(!N)return;want=target();if(!raf)raf=requestAnimationFrame(draw)}
  function idle(){if(!document.hidden&&!raf&&N)raf=requestAnimationFrame(draw);setTimeout(idle,60)}
  function init(){build();prog=want=target();kick();idle()}
  addEventListener('scroll',kick,{passive:true});
  var rt,bh=0;function rb(){clearTimeout(rt);rt=setTimeout(function(){build();want=target();prog=want;kick()},250)}
  addEventListener('resize',rb);
  if('ResizeObserver' in window)new ResizeObserver(function(){var h=document.body.scrollHeight;if(Math.abs(h-bh)>40){bh=h;rb()}}).observe(document.body);
  if(document.readyState==='complete')setTimeout(init,300);else addEventListener('load',function(){setTimeout(init,300)});
})();

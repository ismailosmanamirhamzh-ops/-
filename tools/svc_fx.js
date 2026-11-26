<script>(function(){
var R=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches,d=document;
/* شريط التقدّم */
var pb=d.createElement('i');pb.className='prog';pb.setAttribute('aria-hidden','true');d.body.appendChild(pb);
var tk=0;function prog(){tk=0;var h=d.documentElement.scrollHeight-innerHeight;pb.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')';fill()}
addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(prog)}},{passive:true});
/* العنوان كلمة كلمة (يعاد تركيبه عند تغيير اللغة) */
var h1=d.querySelector('h1');
function split(){if(!h1||R)return;h1.classList.remove('split-on');var i=0;
  (function walk(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var f=d.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){f.appendChild(d.createTextNode(p));return}var s=d.createElement('span');s.className='w';s.textContent=p;s.style.transitionDelay=(i++*70)+'ms';f.appendChild(s)});c.parentNode.replaceChild(f,c)}else if(c.nodeType===1&&!c.classList.contains('w'))walk(c)})})(h1);
  requestAnimationFrame(function(){requestAnimationFrame(function(){h1.classList.add('split-on')})})}
split();new MutationObserver(function(m){if(m.some(function(x){return x.attributeName==='lang'}))setTimeout(split,0)}).observe(d.documentElement,{attributes:true});
/* الخط الزمني */
var st=d.querySelector('.steps'),lis=st?st.querySelectorAll('li'):[];
function fill(){if(!st)return;var r=st.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.8-r.top)/(r.height+innerHeight*.3)));st.style.setProperty('--fill',R?1:p.toFixed(3));
  [].forEach.call(lis,function(l,i){var on=p>=i/Math.max(1,lis.length-1)-.02;if(on&&!l.classList.contains('lit'))l.classList.add('lit')})}
prog();
/* عدّاد الأرقام */
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);var b=e.target,m=b.textContent.match(/^([+]?)(\d+)(.*)$/);if(!m||R)return;var n=+m[2],t0=performance.now();b.classList.add('cnt');
  (function f(t){var k=Math.min(1,(t-t0)/1400),v=Math.round(n*(1-Math.pow(1-k,3)));b.textContent=m[1]+v+m[3];if(k<1)requestAnimationFrame(f)})(t0)})},{threshold:.6});
  [].forEach.call(d.querySelectorAll('.why b'),function(b){io.observe(b)})}
if(FINE&&!R){
  /* ضوء يتبع الماوس */
  [].forEach.call(d.querySelectorAll('.gets li,.pk>.frame,.rel a,.fq details,.why,.end'),function(el){el.classList.add('spot');
    el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')})});
  /* أزرار مغناطيسية */
  [].forEach.call(d.querySelectorAll('.btn.b1,.nav .st'),function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;b.style.transform='translate('+(x*.18).toFixed(1)+'px,'+(y*.28).toFixed(1)+'px)'});
    b.addEventListener('pointerleave',function(){b.style.transform=''})});
  /* إمالة صورة الواجهة */
  var hp=d.querySelector('.hx-p'),fr=hp&&hp.querySelector('.frame');
  if(hp)d.querySelector('.hero').addEventListener('pointermove',function(e){var r=hp.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;hp.classList.add('tilt');fr.style.transform='perspective(1200px) rotateY('+(x*10).toFixed(2)+'deg) rotateX('+(-y*8).toFixed(2)+'deg)'});
  if(hp)d.querySelector('.hero').addEventListener('pointerleave',function(){hp.classList.remove('tilt');fr.style.transform=''});
}
/* توقيع الخدمة */
var sg=d.querySelector('.sig');
if(sg){var go=function(){sg.classList.add('on');if(sg.classList.contains('sig-ap'))setTimeout(function(){sg.classList.add('open')},R?0:350);
  if(sg.classList.contains('sig-vf')&&!R){setTimeout(function(){sg.classList.add('snap')},500);setInterval(function(){sg.classList.remove('snap');void sg.offsetWidth;sg.classList.add('snap')},7000)}};
  if(R)go();else setTimeout(go,450)}
})();</script>

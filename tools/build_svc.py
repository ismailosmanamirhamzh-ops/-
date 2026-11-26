# -*- coding: utf-8 -*-
"""يبني صفحات الخدمات الخمس بالتصميم الفاخر الموحّد.
مهم: يقرأ الصفحة الأصلية (القالب القديم). لإعادة البناء استرجعها أولًا:
  git show 769ec8e^:<slug>/index.html > <slug>/index.html
التشغيل من جذر الموقع:  python3 tools/build_svc.py
يحافظ على <head> الأصلي (العنوان والوصف والبيانات المنظمة وClarity) ويبدّل الـCSS والـbody."""
import re, os, html, sys
from bs4 import BeautifulSoup
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from svc_content import COMMON as C, SERVICES, PAGES

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = open(os.path.join(ROOT, 'tools/svc.css'), encoding='utf-8').read() + open(os.path.join(ROOT, 'tools/svc_fx.css'), encoding='utf-8').read()
FXJS = open(os.path.join(ROOT, 'tools/svc_fx.js'), encoding='utf-8').read()
ADV = '<script src="/js/advisor.js?v=1" defer></script>'
E = lambda s: html.escape(s, quote=True)

def T(tag, pair, cls='', attrs='', htmlmode=False):
    ar, en = pair
    c = f' class="{cls}"' if cls else ''
    key = 'data-en-h' if htmlmode else 'data-en'
    return f'<{tag}{c}{attrs} {key}="{E(en)}">{ar}</{tag}>'

def size(src):
    try:
        return Image.open(os.path.join(ROOT, src.lstrip('/'))).size
    except Exception:
        return (800, 1000)

LOGO = '<svg viewBox="-50 -50 100 100" aria-hidden="true"><circle r="46" fill="none" stroke="#f2b45a" stroke-width="5"/><circle r="41" fill="#f2b45a"/><polygon fill="#07080c" points="4.74,-19.02 18.84,-5.40 14.10,13.62 -4.74,19.02 -18.84,5.40 -14.10,-13.62"/><g stroke="#07080c" stroke-width="3" stroke-linecap="round"><line x1="4.74" y1="-19.02" x2="-15.06" y2="-38.14"/><line x1="18.84" y1="-5.40" x2="25.50" y2="-32.11"/><line x1="14.10" y1="13.62" x2="40.55" y2="6.03"/><line x1="-4.74" y1="19.02" x2="15.06" y2="38.14"/><line x1="-18.84" y1="5.40" x2="-25.50" y2="32.11"/><line x1="-14.10" y1="-13.62" x2="-40.55" y2="-6.03"/></g></svg>'
HOME = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 11.5h3V21h5.5v-6h3v6H19v-9.5h3L12 3z"/></svg>'
WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.6z"/></svg>'
BAG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7V6a5 5 0 0 1 10 0v1h3l-1.2 14H5.2L4 7h3zm2 0h6V6a3 3 0 0 0-6 0v1z"/></svg>'
LOGOS = [('dawar-alsaada', 'دوّار السعادة'), ('etlalet-albait', 'إطلالة البيت'), ('hashi-basha', 'حاشي باشا'), ('mashwiya', 'مشوية'),
         ('musaqqaf-rowad', 'مسقف رواد البناء'), ('nakhat-tihamiya', 'نكهة تهامية'), ('sanam', 'سنام'), ('shuun-alghitha', 'شؤون الغذاء')]

JS = r'''<script>(function(){var b=document.getElementById('lgB'),K='ismLang',T0=document.title,TE=document.documentElement.getAttribute('data-title-en');
function set(l){var en=l==='en',r=document.documentElement;r.lang=en?'en':'ar';r.dir=en?'ltr':'rtl';
[].forEach.call(document.querySelectorAll('[data-en],[data-en-h]'),function(e){if(e.dataset.ar===undefined)e.dataset.ar=e.innerHTML;if(en){if(e.hasAttribute('data-en-h'))e.innerHTML=e.getAttribute('data-en-h');else e.textContent=e.getAttribute('data-en')}else e.innerHTML=e.dataset.ar});
[].forEach.call(document.querySelectorAll('[data-en-alt]'),function(e){if(e.dataset.arAlt===undefined)e.dataset.arAlt=e.alt;e.alt=en?e.getAttribute('data-en-alt'):e.dataset.arAlt});
b.textContent=en?'عربي':'EN';document.title=en&&TE?TE:T0;try{localStorage.setItem(K,l)}catch(x){}}
b.addEventListener('click',function(){set(document.documentElement.lang==='en'?'ar':'en')});var s=null;try{s=localStorage.getItem(K)}catch(x){}if(/[?&]lang=en/.test(location.search)||s==='en')set('en');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});
[].forEach.call(document.querySelectorAll('.sec .sh,.gets li,.gal figure,.pk>.frame,.steps li,.why,.fq details,.rel a,.end,.vd>*'),function(e,i){e.classList.add('rv');e.style.transitionDelay=(i%4)*80+'ms';io.observe(e)})}
})();</script>'''


BLADES = ''.join(f'<path class="bl" style="--r:{i*60}deg" d="M50 50 L4 -30 L96 -30 Z"/>' for i in range(6))
PIN = '<svg viewBox="0 0 24 24"><defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe2a8"/><stop offset=".55" stop-color="#f2b45a"/><stop offset="1" stop-color="#c98a35"/></linearGradient></defs><path fill="url(#pg)" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.6" fill="#120c02"/></svg>'
SIG = {
 'logo-design': f'<div class="sig sig-ap" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">{BLADES}</svg></div>',
 'google-maps': f'<div class="sig sig-pin" aria-hidden="true"><i></i><i></i><i></i><b>{PIN}</b></div>',
 'restaurant-photography': '<div class="sig sig-vf" aria-hidden="true"><span class="rec">REC</span><span class="fl"></span></div>',
 'ad-campaigns': '<div class="sig sig-gr" aria-hidden="true"><svg viewBox="0 0 300 120" preserveAspectRatio="none"><defs><linearGradient id="grf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2b45a" stop-opacity=".35"/><stop offset="1" stop-color="#f2b45a" stop-opacity="0"/></linearGradient></defs><path class="ar" d="M0 112 C40 104 60 96 90 90 S140 70 170 62 S230 30 300 8 L300 120 L0 120Z"/><path class="ln" d="M0 112 C40 104 60 96 90 90 S140 70 170 62 S230 30 300 8"/><circle cx="296" cy="10" r="5"/></svg></div>',
 'social-media-management': '<div class="sig sig-so" aria-hidden="true">' + ''.join(f'<span style="left:{l}%;animation-delay:{dl}s;--dx:{dx}rem">{e}</span>' for l, dl, dx, e in [(12,0,1,'♥'),(30,1.4,-1,'💬'),(52,2.6,1.5,'♥'),(70,.7,-1.2,'🔖'),(84,3.6,.8,'↗'),(40,4.4,-.6,'♥')]) + '</div>',
}


def build(slug):
    path = os.path.join(ROOT, slug, 'index.html')
    src = open(path, encoding='utf-8').read()
    soup = BeautifulSoup(src, 'lxml')
    P = PAGES[slug]
    hero = soup.find('div', class_='hero')
    img = hero.find('img')
    if P.get('hero'):
        img = {'src': P['hero'][0], 'alt': P['hero'][1]}
    store = hero.select('.cta a')[0]['href']
    wa = hero.select('.cta a')[1]['href']
    frm = hero.select_one('.from b').get_text(strip=True)
    pks = soup.select('.pk a')
    title_ar = soup.title.get_text()
    me = next(s for s in SERVICES if s[0] == f'/{slug}/')

    h = []
    # header
    h.append(f'<header class="tp"><div class="tp-in"><a class="brand" href="/" aria-label="إسماعيل عثمان، الصفحة الرئيسية">{LOGO}<span data-en-h="Ismueil <b>Osman</b>">إسماعيل <b>عثمان</b></span></a>'
             f'<nav class="nav"><a class="hb" href="/" aria-label="الصفحة الرئيسية" title="الرئيسية">{HOME}</a>'
             f'{T("a", C["work"], "nv", " href=\"/work/\"")}<button class="lg" id="lgB" type="button" aria-label="English / عربي">EN</button>'
             f'<a class="st" href="/app/store/" data-en="{E(C["store"][1])}">{C["store"][0]}</a></nav></div></header>')
    h.append('<main>')
    # hero
    w, hh = size(img['src'])
    h.append('<section class="hero"><div class="wrap"><div class="hx-t">'
             f'<span class="num" aria-hidden="true">{P["n"]}</span>'
             f'<p class="bc"><a href="/" data-en="{E(C["home"][1])}">{C["home"][0]}</a><span>‹</span>' + T('span', (me[1], me[2])) + '</p>'
             + T('span', P['kk'], 'kk') +
             f'<h1 data-en-h="{E(P["h1"][1])}<span class=&quot;gold&quot;>{E(P["h1b"][1])}</span>">{P["h1"][0]}<span class="gold">{P["h1b"][0]}</span></h1>'
             + T('p', P['lead'], 'lead') +
             f'<p class="price">' + T('small', C['from']) + f'<b>{frm}</b>' + T('small', C['sar']) + '</p>'
             f'<div class="cta"><a class="btn b1" href="{store}">{BAG}' + T('span', C['order_store']) + f'</a>'
             f'<a class="btn b3" href="{wa}" target="_blank" rel="noopener">{WA}' + T('span', C['ask_wa']) + '</a></div>'
             '<ul class="trust">' + T('li', ('3 شهادات Google Ads', '3 Google Ads certifications')) + T('li', ('شهادة HubSpot', 'HubSpot certified')) + T('li', ('كاتب في صحيفة الوطن', 'Al-Watan columnist')) + T('li', C['cities']) + '</ul>'
             '</div><div class="hx-p"><span class="glow" aria-hidden="true"></span><div class="frame"><div class="in">'
             f'<img src="{img["src"]}" alt="{E(img.get("alt","") or "")}" width="{w}" height="{hh}" fetchpriority="high" decoding="async">{SIG.get(slug,"")}</div></div>'
             f'<span class="badge"><i>✓</i>' + T('span', P['badge']) + f'</span><span class="seal">SC {P["n"]}</span></div></div></section>')
    # logos strip
    lg = ''.join(f'<img src="/assets/img/logo-{k}.webp" alt="شعار {n}" width="{size("/assets/img/logo-"+k+".webp")[0]}" height="{size("/assets/img/logo-"+k+".webp")[1]}" loading="lazy" decoding="async">' for k, n in LOGOS)
    h.append('<section class="lg-strip" aria-label="علامات اشتغلت معها"><div class="wrap">' + T('p', C['logos_t']) + f'<div class="mq"><div class="mq-t">{lg}{lg.replace("alt=\"شعار", "aria-hidden=\"true\" alt=\"")}</div></div></div></section>')
    # gets
    h.append('<section class="sec"><div class="wrap"><div class="sh">' + T('span', C['gets_k'], 'kk') + T('h2', C['gets_h'], htmlmode=True) + '</div><ol class="gets">'
             + ''.join(f'<li><b>{i+1:02d}</b>' + T('span', g) + '</li>' for i, g in enumerate(P['gets'])) + '</ol></div></section>')
    # video (google maps)
    if 'video' in P:
        v = P['video']
        old = soup.find('div', class_='vid')
        btn = old.find('button')
        vimg = btn.find('img')
        h.append('<section class="sec"><div class="wrap vd"><div class="frame"><div class="in"><div class="vid">'
                 f'<button type="button" aria-label="تشغيل الفيديو" onclick="{E(btn["onclick"])}"><img src="{vimg["src"]}" alt="{E(vimg["alt"])}" width="540" height="960" loading="lazy" decoding="async"><span class="play" aria-hidden="true"></span></button>'
                 '</div></div></div><div class="sh">' + T('span', ('VIDEO · 60 SECONDS', 'VIDEO · 60 SECONDS'), 'kk') + T('h2', (v[0], v[1])) + T('p', (v[2], v[3])) + '</div></div></section>')
    # gallery
    land = sum(1 for s,_,_ in P['gal'] if size(s)[0] > size(s)[1]) > len(P['gal'])/2
    g3 = ' land' if land else (' g3' if len(P['gal']) == 3 else '')
    h.append('<section class="sec"><div class="wrap"><div class="sh">' + T('span', C['gal_k'], 'kk') + T('h2', C['gal_h'], htmlmode=True) + f'</div><div class="gal{g3}">'
             + ''.join(f'<figure><img src="{s}" alt="{E(a)}" data-en-alt="{E(e)}" width="{size(s)[0]}" height="{size(s)[1]}" loading="lazy" decoding="async">' + T('figcaption', (a, e)) + '</figure>' for s, a, e in P['gal'])
             + '</div><div class="cta" style="margin-top:1.6rem"><a class="btn b2" href="/work/">' + T('span', ('شاهد كل أعمالي ←', 'See all my work →')) + '</a></div></div></section>')
    # packages
    prices = [a.select_one('.p').contents[0].strip() for a in pks]
    nums = [float(p.replace(',', '')) for p in prices]
    best = nums.index(max(nums))
    cards = ''
    for i, (a, pk) in enumerate(zip(pks, P['pk'])):
        cls = 'frame best' if i == best else 'frame'
        tag = T('span', C['pk_best'], 'tag') if i == best else ''
        cards += (f'<div class="{cls}"><div class="in">{tag}' + T('h3', (pk[0], pk[1])) + f'<p class="p">{prices[i]}' + T('small', C['sar_s']) + '</p>'
                  + T('p', (pk[2], pk[3]), 'd') + f'<a class="btn {"b1" if i == best else "b2"} go" href="{a["href"]}">' + T('span', C['pk_cta']) + '</a></div></div>')
    h.append('<section class="sec" id="packages"><div class="wrap"><div class="sh">' + T('span', C['pk_k'], 'kk') + T('h2', C['pk_h'], htmlmode=True) + f'</div><div class="pk">{cards}</div>'
             + T('p', C['pk_note'], 'pk-n', htmlmode=True) + '</div></section>')
    # steps
    h.append('<section class="sec"><div class="wrap"><div class="sh">' + T('span', C['st_k'], 'kk') + T('h2', C['st_h'], htmlmode=True) + '</div><ol class="steps">'
             + ''.join(T('li', s) for s in P['steps']) + '</ol></div></section>')
    # why
    why = ''
    for n, a, e in C['why']:
        na, ne = (n.split('|') + [n])[:2]
        why += '<div>' + (f'<b class="gold">{na}</b>' if na == ne else T('b', (na, ne), 'gold')) + T('span', (a, e)) + '</div>'
    h.append('<section class="sec"><div class="wrap"><div class="sh">' + T('span', C['why_k'], 'kk') + T('h2', C['why_h'], htmlmode=True) + f'</div><div class="why">{why}</div>'
             '<div class="certs"><span>Google Ads Search</span><span>Google Ads Creative</span><span>Google Ads Measurement</span><span>HubSpot Content Marketing</span></div></div></section>')
    # faq
    h.append('<section class="sec"><div class="wrap"><div class="sh">' + T('span', C['faq_k'], 'kk') + T('h2', C['faq_h'], htmlmode=True) + '</div><div class="fq">'
             + ''.join('<details>' + T('summary', (q[0], q[1])) + T('p', (q[2], q[3])) + '</details>' for q in P['faq']) + '</div></div></section>')
    # related
    rel = ''.join(f'<a href="{u}"><i>' + f'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="{ic}"/></svg></i>' + T('span', (a, e)) + '<em aria-hidden="true">←</em></a>'
                  for u, a, e, ic in SERVICES if u != f'/{slug}/')
    h.append('<section class="sec"><div class="wrap"><div class="sh">' + T('span', C['rel_k'], 'kk') + T('h2', C['rel_h'], htmlmode=True) + f'</div><div class="rel">{rel}</div></div></section>')
    # end
    h.append('<div class="wrap"><div class="frame end"><div class="in">' + T('span', C['end_k'], 'kk') + T('h2', C['end_h'], htmlmode=True) + T('p', C['end_p'])
             + f'<div class="cta"><a class="btn b1" href="{store}">{BAG}' + T('span', C['pk_cta']) + f'</a><a class="btn b3" href="{wa}" target="_blank" rel="noopener">{WA}' + T('span', C['end_wa']) + '</a>'
             '<a class="btn b2" href="/consultation/">' + T('span', C['end_cons']) + '</a></div></div></div></div>')
    h.append('</main>')
    # footer
    svc = ''.join(f'<li><a href="{u}" data-en="{E(e)}">{a}</a></li>' for u, a, e, _ in SERVICES)
    more = [('/work/', 'أعمالي', 'My work'), ('/app/store/', 'متجر الخدمات', 'Services store'), ('/consultation/', 'استشارة مجانية', 'Free consultation'), ('/media/', 'في الإعلام', 'In the media'), ('/press/', 'صور للصحافة', 'Press photos')]
    mr = ''.join(f'<li><a href="{u}" data-en="{E(e)}">{a}</a></li>' for u, a, e in more)
    h.append('<footer class="ft"><div class="wrap"><div class="about"><a class="brand" href="/">' + LOGO + '<span data-en-h="Ismueil <b>Osman</b>">إسماعيل <b>عثمان</b></span></a>' + T('p', C['foot']) + '</div>'
             '<div>' + T('h4', C['foot_svc']) + f'<ul>{svc}</ul></div><div>' + T('h4', C['foot_more']) + f'<ul>{mr}</ul></div>'
             '<div class="cp"><span data-en-h="© 2026 Ismueil Osman. All rights reserved.">© 2026 إسماعيل عثمان. جميع الحقوق محفوظة.</span><b>ISMUEILOSMAN.COM</b></div></div></footer>')
    h.append(JS)
    h.append(FXJS)
    h.append(ADV)
    body = '<body>\n' + '\n'.join(h) + '\n</body>'

    # head: replace style, keep the rest
    head = src[:src.index('<body')]
    head = re.sub(r'<style>.*?</style>', '<style>' + CSS + '</style>', head, count=1, flags=re.S)
    # english title for the toggle
    en_title = f'{me[2]} | Ismueil Osman'
    head = head.replace('<html lang="ar" dir="rtl">', f'<html lang="ar" dir="rtl" data-title-en="{E(en_title)}">', 1)
    out = head + body + '\n</html>\n'
    open(path, 'w', encoding='utf-8').write(out)
    return len(src), len(out)


if __name__ == '__main__':
    for s in (sys.argv[1:] or PAGES):
        print(s, *build(s))

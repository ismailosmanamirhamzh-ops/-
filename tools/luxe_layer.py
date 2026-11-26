# -*- coding: utf-8 -*-
"""طبقة فاخرة موحّدة للصفحات الخاصة (الاستشارة، الإعلام، الصور الصحفية، عن الموقع).
تضيف: خلفية ذهبية وشبكة، هيدر ثابت موحّد (ما عدا الاستشارة لأن لها هيدر بلغتين)، فوتر غني، خط ذهبي تحت العناوين، ظهور تدريجي.
يُشغَّل على النسخة الأصلية من git (git checkout الصفحة أولًا) لأنه يستبدل الهيدر والفوتر الأصليين."""
import re, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CSS = r'''
html,body{max-width:100%;overflow-x:clip}
body{position:relative}
body::before{content:"";position:fixed;inset:0;z-index:-2;pointer-events:none;background:radial-gradient(60% 45% at 85% -8%,rgba(242,180,90,.16),transparent 62%),radial-gradient(45% 40% at -5% 45%,rgba(242,180,90,.06),transparent 70%),radial-gradient(50% 40% at 100% 100%,rgba(138,90,28,.09),transparent 70%)}
body::after{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;background-image:linear-gradient(rgba(242,180,90,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(242,180,90,.035) 1px,transparent 1px);background-size:72px 72px;-webkit-mask-image:radial-gradient(75% 60% at 70% 0,#000,transparent 78%);mask-image:radial-gradient(75% 60% at 70% 0,#000,transparent 78%)}
main h2{position:relative}
main section>h2::after,main .sh>h2::after{content:"";display:block;width:3.4rem;height:2px;margin-top:.8rem;border-radius:2px;background:linear-gradient(90deg,#ffe2a8,#f2b45a,#8a5a1c)}
main section{scroll-margin-top:5rem}
.lx-tp{position:sticky;top:0;z-index:60;backdrop-filter:blur(16px) saturate(1.2);-webkit-backdrop-filter:blur(16px) saturate(1.2);background:linear-gradient(180deg,rgba(7,8,12,.88),rgba(7,8,12,.58));border-bottom:1px solid rgba(242,180,90,.12)}
.lx-in{max-width:76rem;margin:0 auto;padding:.85rem clamp(1.25rem,4vw,2.5rem);display:flex;align-items:center;justify-content:space-between;gap:1rem}
.lx-br{display:flex;align-items:center;gap:.6rem;font:900 1.15rem Cairo,sans-serif;white-space:nowrap;color:#eceef4;text-decoration:none}.lx-br b{color:#f2b45a}.lx-br svg{width:1.7rem;height:1.7rem}
.lx-nv{display:flex;align-items:center;gap:.5rem}
.lx-nv a{font:700 .88rem Tajawal,sans-serif;color:#a9afbf;padding:.55rem 1rem;border:1px solid rgba(255,255,255,.08);border-radius:999px;white-space:nowrap;text-decoration:none;transition:.3s}
.lx-nv a:hover{color:#ffe3a3;border-color:rgba(242,180,90,.45)}
.lx-nv .hb{display:grid;place-items:center;width:2.6rem;height:2.6rem;padding:0;color:#f2b45a;border-color:rgba(242,180,90,.35);background:rgba(242,180,90,.06)}.lx-nv .hb svg{width:1.15rem;height:1.15rem;fill:currentColor}
.lx-nv .st{color:#120c02;border:0;background:linear-gradient(135deg,#ffe2a8,#f2b45a 55%,#c98a35);box-shadow:0 10px 26px -12px rgba(242,180,90,.8)}
.lx-ft{text-align:start;margin-top:clamp(4rem,8vw,6rem);border-top:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,rgba(242,180,90,.03),transparent);color:#eceef4}
.lx-ft .w{max-width:76rem;margin:0 auto;padding:3.2rem clamp(1.25rem,4vw,2.5rem) 2.2rem;display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:2.5rem}
.lx-ft h4{font:800 .95rem Cairo,sans-serif;color:#ffe3a3;margin:0 0 .9rem}
.lx-ft ul{list-style:none;margin:0;padding:0;display:grid;gap:.45rem;color:#a9afbf;font-size:.92rem}.lx-ft a{color:inherit;text-decoration:none}.lx-ft ul a:hover{color:#f2b45a}
.lx-ft .ab p{color:#a9afbf;font-size:.92rem;margin:.8rem 0 0;max-width:22rem;line-height:1.8}
.lx-ft .cp{grid-column:1/-1;padding-top:1.6rem;border-top:1px solid rgba(255,255,255,.08);color:#6f7380;font-size:.84rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:.6rem}
.lx-ft .cp b{font:700 .78rem ui-monospace,Menlo,monospace;letter-spacing:.24em;color:#5a5e69;direction:ltr}
.lx-rv{opacity:0;transform:translateY(22px);transition:opacity 1s cubic-bezier(.2,.8,.2,1),transform 1s cubic-bezier(.2,.8,.2,1)}.lx-rv.on{opacity:1;transform:none}
@media (max-width:860px){.lx-ft .w{grid-template-columns:1fr 1fr}.lx-ft .ab{grid-column:1/-1}}
@media (max-width:620px){.lx-nv .nv{display:none}.lx-nv a{padding:.5rem .8rem}.lx-ft .w{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.lx-rv{opacity:1;transform:none;transition:none}}
'''

LOGO = '<svg viewBox="-50 -50 100 100" aria-hidden="true"><circle r="46" fill="none" stroke="#f2b45a" stroke-width="5"/><circle r="41" fill="#f2b45a"/><polygon fill="#07080c" points="4.74,-19.02 18.84,-5.40 14.10,13.62 -4.74,19.02 -18.84,5.40 -14.10,-13.62"/><g stroke="#07080c" stroke-width="3" stroke-linecap="round"><line x1="4.74" y1="-19.02" x2="-15.06" y2="-38.14"/><line x1="18.84" y1="-5.40" x2="25.50" y2="-32.11"/><line x1="14.10" y1="13.62" x2="40.55" y2="6.03"/><line x1="-4.74" y1="19.02" x2="15.06" y2="38.14"/><line x1="-18.84" y1="5.40" x2="-25.50" y2="32.11"/><line x1="-14.10" y1="-13.62" x2="-40.55" y2="-6.03"/></g></svg>'
HOME = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 11.5h3V21h5.5v-6h3v6H19v-9.5h3L12 3z"/></svg>'

def header(en):
    if en:
        return (f'<header class="lx-tp"><div class="lx-in"><a class="lx-br" href="/" aria-label="Ismueil Osman, home">{LOGO}<span>Ismueil <b>Osman</b></span></a>'
                f'<nav class="lx-nv"><a class="hb" href="/" aria-label="Home" title="Home">{HOME}</a><a class="nv" href="/work/">My work</a><a class="st" href="/app/store/">Store</a></nav></div></header>')
    return (f'<header class="lx-tp"><div class="lx-in"><a class="lx-br" href="/" aria-label="إسماعيل عثمان، الصفحة الرئيسية">{LOGO}<span>إسماعيل <b>عثمان</b></span></a>'
            f'<nav class="lx-nv"><a class="hb" href="/" aria-label="الصفحة الرئيسية" title="الرئيسية">{HOME}</a><a class="nv" href="/work/">أعمالي</a><a class="nv" href="/media/">الإعلام</a><a class="st" href="/app/store/">المتجر</a></nav></div></header>')

SVC_AR = [('/logo-design/', 'تصميم شعار'), ('/google-maps/', 'توثيق النشاط في خرائط Google'), ('/restaurant-photography/', 'تصوير المطاعم والمنتجات'), ('/ad-campaigns/', 'إعلانات سناب وتيك توك وGoogle'), ('/social-media-management/', 'إدارة حسابات السوشيال ميديا'), ('/web-development/', 'تطوير المواقع والتطبيقات والمنصات')]
SVC_EN = [('/logo-design/', 'Logo design'), ('/google-maps/', 'Google Maps listing'), ('/restaurant-photography/', 'Restaurant & product photography'), ('/ad-campaigns/', 'Snapchat, TikTok & Google ads'), ('/social-media-management/', 'Social media management'), ('/web-development/', 'Websites, apps & platforms')]

def footer(en):
    if en:
        svc = ''.join(f'<li><a href="{u}">{n}</a></li>' for u, n in SVC_EN)
        more = [('/work/', 'My work'), ('/consultation/', 'Free consultation'), ('/media/', 'In the media'), ('/press/', 'Press photos'), ('/assets/ismueil-osman-profile-en.pdf?v=5', 'Profile (PDF)'), ('https://www.alwatan.com.sa/author/15812', 'Al-Watan columns')]
        mr = ''.join(f'<li><a href="{u}"{" target=\"_blank\" rel=\"noopener\"" if u.startswith("http") or u.endswith("5") else ""}>{n}</a></li>' for u, n in more)
        return (f'<footer class="lx-ft"><div class="w"><div class="ab"><a class="lx-br" href="/">{LOGO}<span>Ismueil <b>Osman</b></span></a><p>Photographer, digital marketer, designer and web developer in Saudi Arabia.</p></div>'
                f'<div><h4>Services</h4><ul>{svc}</ul></div><div><h4>More</h4><ul>{mr}</ul></div>'
                f'<div class="cp"><span>© 2026 Ismueil Osman. All rights reserved.</span><b>ISMUEILOSMAN.COM</b></div></div></footer>')
    svc = ''.join(f'<li><a href="{u}">{n}</a></li>' for u, n in SVC_AR)
    more = [('/work/', 'أعمالي'), ('/consultation/', 'استشارة مجانية'), ('/media/', 'في الإعلام'), ('/press/', 'صور للصحافة'), ('/assets/ismueil-osman-profile.pdf?v=5', 'البروفايل (PDF)'), ('https://www.alwatan.com.sa/author/15812', 'كتاباتي في صحيفة الوطن')]
    mr = ''.join(f'<li><a href="{u}"{" target=\"_blank\" rel=\"noopener\"" if u.startswith("http") or u.endswith("5") else ""}>{n}</a></li>' for u, n in more)
    return (f'<footer class="lx-ft"><div class="w"><div class="ab"><a class="lx-br" href="/">{LOGO}<span>إسماعيل <b>عثمان</b></span></a><p>مصوّر ومسوّق رقمي ومصمّم ومطوّر مواقع في السعودية. أخدم مكة وجدة والرياض، وكل المملكة أونلاين.</p></div>'
            f'<div><h4>الخدمات</h4><ul>{svc}</ul></div><div><h4>المزيد</h4><ul>{mr}</ul></div>'
            f'<div class="cp"><span>© 2026 إسماعيل عثمان. جميع الحقوق محفوظة.</span><b>ISMUEILOSMAN.COM</b></div></div></footer>')

JS = r'''<script>(function(){if(!('IntersectionObserver' in window))return;var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})},{rootMargin:'0px 0px -6% 0px'});
var sel=document.documentElement.getAttribute('data-lx-rv');if(!sel)return;[].forEach.call(document.querySelectorAll(sel),function(e,i){var r=e.getBoundingClientRect();if(r.top<innerHeight)return;e.classList.add('lx-rv');e.style.transitionDelay=(i%3)*90+'ms';io.observe(e)})})();</script>'''

PAGES = {
    # slug: (english?, replace header?, reveal selectors)
    'media': (False, True, 'main section,.acard,.ccard'),
    'press': (False, True, 'main section'),
    'about-site': (True, True, 'main section'),
    'consultation': (False, False, '.why li,.card'),
}

def mark(name, s):
    return f'<!--LUXE:{name}-->{s}<!--/LUXE:{name}-->'

def strip(t):
    return re.sub(r'<!--LUXE:(\w+)-->.*?<!--/LUXE:\1-->', '', t, flags=re.S)

def apply(slug):
    en, rep_head, rv = PAGES[slug]
    p = os.path.join(ROOT, slug, 'index.html')
    t = open(p, encoding='utf-8').read()
    t = strip(t)
    # css before </head>
    t = t.replace('</head>', mark('css', '<style>' + CSS + '</style>') + '\n</head>', 1)
    # reveal selectors on <html>
    t = re.sub(r'<html([^>]*?)(?: data-lx-rv="[^"]*")?>', lambda m: f'<html{m.group(1)} data-lx-rv="{rv}">', t, count=1)
    # header
    if rep_head:
        t = re.sub(r'(?:<!--LXOLD-->)?<header class="top">.*?</header>', mark('head', header(en)), t, count=1, flags=re.S)
    # footer: replace the page's own footer (first <footer ...> ... </footer>)
    t, n = re.subn(r'<footer\b(?![^>]*lx-ft)[^>]*>.*?</footer>', mark('foot', footer(en)), t, count=1, flags=re.S)
    if not n:
        t = t.replace('</body>', mark('foot', footer(en)) + '\n</body>', 1)
    # js before </body>
    t = t.replace('</body>', mark('js', JS) + '\n</body>', 1)
    open(p, 'w', encoding='utf-8').write(t)
    return len(t)

if __name__ == '__main__':
    for s in (sys.argv[1:] or PAGES):
        print(s, apply(s))

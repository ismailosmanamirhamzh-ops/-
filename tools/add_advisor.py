# -*- coding: utf-8 -*-
"""يضيف مساعد إسماعيل (js/advisor.js) لكل صفحات الموقع الرئيسية. آمن للتكرار."""
import glob, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TAG = '<script src="/js/advisor.js?v=1" defer></script>'
SKIP = ('app/',)
for f in sorted(glob.glob(os.path.join(ROOT, '**/index.html'), recursive=True)):
    rel = os.path.relpath(f, ROOT)
    if rel.startswith(SKIP): continue
    t = open(f, encoding='utf-8').read()
    import re
    t2 = re.sub(r'<script src="/js/advisor\.js[^"]*" defer></script>', TAG, t)
    if TAG not in t2:
        t2 = t2.replace('</body>', TAG + '\n</body>', 1)
    if t2 != t:
        open(f, 'w', encoding='utf-8').write(t2); print('+', rel)

#!/usr/bin/env python3
"""Inline css/style.css + css/tailwind.min.css into index.html (no render-blocking CSS requests).
Re-run after any edit to those CSS files:  python3 tools/inline-css.py"""
import re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
css = (root/'css/style.css').read_text(encoding='utf-8') + '\n' + (root/'css/tailwind.min.css').read_text(encoding='utf-8')
css = css.replace('url(../assets/', 'url(assets/')
assert '</style' not in css.lower()
block = '<style id="siteCss">' + css.strip() + '</style>'
p = root/'index.html'; s = p.read_text(encoding='utf-8')
if '<style id="siteCss">' in s:
    s = re.sub(r'<style id="siteCss">.*?</style>', lambda m: block, s, count=1, flags=re.S)
else:
    s, n1 = re.subn(r'<link rel="stylesheet" href="css/style\.css\?v=[^"]*">\n?', lambda m: block + '\n', s, count=1)
    s, n2 = re.subn(r'<link rel="stylesheet" href="css/tailwind\.min\.css">\n?', '', s, count=1)
    assert n1 == 1 and n2 == 1
p.write_text(s, encoding='utf-8'); print('inlined', len(css), 'bytes')

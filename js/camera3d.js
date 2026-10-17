/* كاميرا ميرورلس ثلاثية الأبعاد (Three.js) — تدور 360° مع السحب وتنتهي والعدسة مواجهة للزائر.
   إذا تعذّر WebGL أو تحميل المكتبة تبقى صورة الكاميرا القديمة كما هي. */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const stage = document.getElementById('cam3d');
const oldCam = document.getElementById('cam');
/* يعمل حتى مع «تقليل الحركة» في الآيفون: يظهر المجسّم ثابتاً بلا دوران. وإذا فشل أي شيء تبقى صورة الكاميرا الثابتة. */
if (stage) { try { init(); } catch (e) { fail(); } }
function fail() {
  const d = document.documentElement; d.classList.remove('c3p', 'cam3d-on');
  const c = stage && stage.querySelector('canvas'); if (c) c.remove();
}

function init() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { document.documentElement.classList.remove('c3p'); return; }
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(DPR);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const cv = renderer.domElement;
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none';
  cv.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 500);

  /* ---------- إضاءة ---------- */
  scene.add(new THREE.HemisphereLight(0xdfe6ff, 0x1a1208, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-14, 18, 22); scene.add(key);
  const rim = new THREE.DirectionalLight(0xf2b45a, 3.2); rim.position.set(18, 6, -16); scene.add(rim);
  const rim2 = new THREE.DirectionalLight(0x8fb4ff, 1.2); rim2.position.set(-18, -4, -12); scene.add(rim2);

  /* ---------- خامات ---------- */
  const tex = (w, h, draw, rep) => {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (rep) t.repeat.set(rep[0], rep[1]);
    return t;
  };
  const leather = tex(256, 256, (g, w, h) => {
    g.fillStyle = '#808080'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 2600; i++) {
      const v = 90 + Math.random() * 90 | 0; g.fillStyle = `rgb(${v},${v},${v})`;
      g.beginPath(); g.arc(Math.random() * w, Math.random() * h, 0.6 + Math.random() * 1.6, 0, 7); g.fill();
    }
  }, [3, 3]);
  const ribs = tex(64, 8, (g, w, h) => {
    for (let x = 0; x < w; x++) { const v = (Math.sin(x / w * Math.PI * 2 * 8) * 0.5 + 0.5) * 255 | 0; g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(x, 0, 1, h); }
  }, [10, 1]);

  const M = {
    body: new THREE.MeshPhysicalMaterial({ color: 0x15161a, roughness: 0.62, metalness: 0.15, bumpMap: leather, bumpScale: 0.6, clearcoat: 0.08 }),
    shell: new THREE.MeshPhysicalMaterial({ color: 0x1c1d22, roughness: 0.38, metalness: 0.35, clearcoat: 0.35, clearcoatRoughness: 0.4 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x0d0d10, roughness: 0.92, metalness: 0, bumpMap: ribs, bumpScale: 1.2 }),
    metal: new THREE.MeshStandardMaterial({ color: 0x9aa0aa, roughness: 0.28, metalness: 1 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x07070a, roughness: 0.5, metalness: 0.2 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xf2b45a, roughness: 0.25, metalness: 1 }),
    screen: new THREE.MeshPhysicalMaterial({ color: 0x050608, roughness: 0.08, metalness: 0, clearcoat: 1 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0x020308, roughness: 0.0, metalness: 0.0, clearcoat: 0.4, clearcoatRoughness: 0.0, iridescence: 1, iridescenceIOR: 1.7, iridescenceThicknessRange: [250, 700], envMapIntensity: 0.22, transparent: true, opacity: 0.4, depthWrite: false }),
    inner: new THREE.MeshPhysicalMaterial({ color: 0x0c0a22, roughness: 0.12, metalness: 0.6, iridescence: 1, iridescenceIOR: 2.0, iridescenceThicknessRange: [300, 800], emissive: 0x1b0f3a, emissiveIntensity: 0.6, envMapIntensity: 1.4 }),
    coat: new THREE.MeshBasicMaterial({ color: 0x7a5cff, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }),
    coat2: new THREE.MeshBasicMaterial({ color: 0x36e0b0, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }),
    glint: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }),
    red: new THREE.MeshStandardMaterial({ color: 0xc8463a, roughness: 0.4, emissive: 0x3a0806 })
  };

  /* ---------- المجسم (الوحدة = سم، الواجهة باتجاه +Z) ---------- */
  const model = new THREE.Group();
  const add = (geo, mat, x = 0, y = 0, z = 0, parent = model) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); parent.add(m); return m; };
  const cylZ = (r1, r2, len, seg = 72, open = false) => { const g = new THREE.CylinderGeometry(r1, r2, len, seg, 1, open); g.rotateX(Math.PI / 2); return g; };

  // الجسم
  add(new RoundedBoxGeometry(12.6, 7.2, 3.8, 6, 0.55), M.body, 0.2, 0, 0);
  // الإطار العلوي
  add(new RoundedBoxGeometry(12.2, 0.9, 3.7, 4, 0.35), M.shell, 0.2, 3.35, 0);
  // المقبض (يمين الكاميرا = يسار المشاهد من الأمام)
  add(new RoundedBoxGeometry(3.1, 7.4, 3.0, 8, 1.2), M.body, -4.65, -0.05, 2.0);
  // حدبة محدد الرؤية
  const hump = new THREE.Shape();
  hump.moveTo(-2.7, 0); hump.lineTo(2.7, 0); hump.lineTo(1.75, 2.0); hump.lineTo(-1.75, 2.0); hump.closePath();
  const hg = new THREE.ExtrudeGeometry(hump, { depth: 3.2, bevelEnabled: true, bevelSize: 0.28, bevelThickness: 0.28, bevelSegments: 4, curveSegments: 8 });
  hg.translate(0, 0, -1.6);
  add(hg, M.shell, 0.9, 3.55, -0.1);
  // كأس العين الخلفي
  add(new RoundedBoxGeometry(3.4, 2.2, 1.4, 4, 0.5), M.rubber, 0.9, 4.6, -2.3);
  add(new RoundedBoxGeometry(2.2, 1.2, 0.2, 2, 0.1), M.screen, 0.9, 4.6, -3.0);
  // الأقراص العلوية
  const dial = (x, z, r, h) => { add(cylZ(r, r, h).rotateX(-Math.PI / 2), M.metal, x, 3.8 + h / 2, z); add(cylZ(r * 0.82, r * 0.82, 0.04).rotateX(-Math.PI / 2), M.dark, x, 3.82 + h, z); };
  dial(4.3, -0.6, 0.85, 0.55); dial(2.5, -0.9, 0.62, 0.45); dial(-3.0, -1.0, 0.7, 0.4);
  // زر الالتقاط مع حلقة التشغيل
  add(cylZ(0.62, 0.62, 0.35).rotateX(-Math.PI / 2), M.metal, -4.6, 3.85, 2.3);
  add(cylZ(0.42, 0.42, 0.45).rotateX(-Math.PI / 2), M.shell, -4.6, 4.0, 2.3);
  // قرص أمامي على المقبض
  add(cylZ(0.75, 0.75, 0.35).rotateX(-Math.PI / 2), M.rubber, -4.6, 3.05, 3.1);
  // نقطة حمراء صغيرة (زر التسجيل) خلفًا
  add(cylZ(0.22, 0.22, 0.12), M.red, 5.1, 2.5, -1.95);
  // الشاشة الخلفية وأزرار
  add(new RoundedBoxGeometry(7.6, 4.8, 0.35, 3, 0.15), M.dark, 1.3, -0.6, -2.0);
  add(new THREE.PlaneGeometry(7.0, 4.3).rotateY(Math.PI), M.screen, 1.3, -0.6, -2.19);
  [[-3.6, 1.5], [-3.6, 0.2], [-3.6, -1.1], [-4.6, -2.3]].forEach(([x, y]) => add(cylZ(0.32, 0.32, 0.25), M.shell, x + 0.2, y, -2.0));
  add(cylZ(0.95, 0.95, 0.3), M.metal, -4.0, -0.7, -1.95);
  // عروات الحزام
  [-6.1, 6.5].forEach(x => add(new THREE.TorusGeometry(0.35, 0.12, 8, 16), M.metal, x, 2.6, 0));
  // قاعدة التركيب
  const LX = 0.9, LY = -0.25;
  add(cylZ(3.35, 3.35, 0.4), M.shell, LX, LY, 1.95);
  add(cylZ(3.05, 3.05, 0.35), M.metal, LX, LY, 2.25);

  // العدسة
  const lens = new THREE.Group(); lens.position.set(LX, LY, 2.4); model.add(lens);
  let z = 0;
  const seg = (r1, r2, len, mat, open) => { add(cylZ(r1, r2, len, 72, open), mat, 0, 0, z + len / 2, lens); z += len; };
  seg(3.15, 3.25, 0.7, M.shell);
  seg(3.3, 3.3, 1.6, M.body);
  seg(3.45, 3.45, 2.8, M.rubber);      // حلقة الزوم
  seg(3.38, 3.38, 0.35, M.shell);
  seg(3.4, 3.4, 0.12, M.gold);         // حلقة ذهبية بلون الهوية
  seg(3.38, 3.38, 0.9, M.shell);
  seg(3.48, 3.48, 1.5, M.rubber, true);      // حلقة التركيز
  seg(3.5, 3.62, 0.9, M.shell, true);
  // تجويف داخلي داكن خلف الزجاج
  const tube = add(cylZ(3.0, 3.0, 2.6, 72, true), new THREE.MeshStandardMaterial({ color: 0x050507, roughness: 0.9, side: THREE.BackSide }), 0, 0, z - 1.3, lens);
  add(new THREE.CircleGeometry(3.0, 64), M.dark, 0, 0, z - 2.55, lens);
  const FRONT = z;
  // واجهة العدسة: حافة + زجاج + طبقات داخلية
  add(new THREE.TorusGeometry(3.42, 0.2, 16, 96), M.shell, 0, 0, FRONT, lens);
  add(new THREE.RingGeometry(2.85, 3.45, 96), M.dark, 0, 0, FRONT + 0.01, lens);
  const glass = add(new THREE.SphereGeometry(5.2, 64, 32, 0, Math.PI * 2, 0, 0.58), M.glass, 0, 0, FRONT - 5.35, lens);
  glass.rotation.x = Math.PI / 2;
  add(new THREE.CircleGeometry(2.6, 64), M.inner, 0, 0, FRONT - 1.4, lens);
  add(new THREE.TorusGeometry(2.0, 0.07, 8, 96), M.metal, 0, 0, FRONT - 1.35, lens);
  add(new THREE.TorusGeometry(1.2, 0.05, 8, 96), M.metal, 0, 0, FRONT - 1.38, lens);
  add(new THREE.CircleGeometry(0.75, 48), M.dark, 0, 0, FRONT - 1.37, lens);
  // انعكاسات طبقات الطلاء والوميض
  add(new THREE.RingGeometry(1.55, 1.75, 96, 1, 0.4, 2.2), M.coat, 0, 0, FRONT - 0.6, lens);
  add(new THREE.RingGeometry(0.95, 1.08, 96, 1, 3.4, 1.9), M.coat2, 0, 0, FRONT - 0.7, lens);
  const gl = add(new THREE.CircleGeometry(0.42, 32), M.glint, -1.25, 1.2, FRONT - 0.25, lens); gl.scale.set(1.6, 0.55, 1); gl.rotation.z = 0.7;
  add(new THREE.CircleGeometry(0.16, 24), M.glint, 1.1, -1.05, FRONT - 0.3, lens);
  const LENS_R = 3.62, LENS_FRONT_Z = 2.4 + FRONT;

  /* ---------- هوية إسماعيل على الكاميرا: الاسم والعدسة الذهبية بدل شعار الشركة المصنّعة ---------- */
  try {
    const GOLD = '#f2b45a', SILVER = '#d7dae0';
    const canvasTex = (w, h, draw) => {
      const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t;
    };
    const decalMat = (map, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ map, transparent: true, roughness: 0.32, metalness: 0.55, polygonOffset: true, polygonOffsetFactor: -2, depthWrite: false }, o));
    /* رسم فتحة العدسة (نفس شعار الموقع) بثقوب شفافة */
    const aperture = (g, cx, cy, s, col) => {
      const t = 0.6, r = (4 + 26 * t) * s, ph = (1 - t) * 35 * Math.PI / 180, R = 41 * s, V = [];
      for (let i = 0; i < 6; i++) { const a = ph + i * Math.PI / 3 - Math.PI / 2; V.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
      g.save();
      g.strokeStyle = col; g.lineWidth = 5 * s; g.beginPath(); g.arc(cx, cy, 46 * s, 0, 7); g.stroke();
      g.fillStyle = col; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill();
      g.globalCompositeOperation = 'destination-out';
      g.beginPath(); V.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); g.fill();
      g.lineWidth = 3 * s; g.lineCap = 'round';
      for (let i = 0; i < 6; i++) {
        const [x, y] = V[i], n = V[(i + 1) % 6]; let dx = x - n[0], dy = y - n[1]; const L = Math.hypot(dx, dy); dx /= L; dy /= L;
        const px = x - cx, py = y - cy, b = 2 * (px * dx + py * dy), c = px * px + py * py - R * R, k = (-b + Math.sqrt(b * b - 4 * c)) / 2;
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + dx * k, y + dy * k); g.stroke();
      }
      g.restore();
    };

    // اللوحة الأمامية فوق العدسة: العدسة الذهبية + ISMUEIL محفورة بالفضي
    const plate = canvasTex(1024, 256, (g, w, h) => {
      aperture(g, 118, h / 2, 1.9, GOLD);
      g.fillStyle = SILVER; g.font = '700 132px "Helvetica Neue",Arial,sans-serif'; g.textBaseline = 'middle';
      if ('letterSpacing' in g) g.letterSpacing = '14px';
      g.fillText('ISMUEIL', 238, h / 2 + 6);
    });
    add(new THREE.PlaneGeometry(3.7, 0.925), decalMat(plate), 0.9, 4.5, 1.8);

    // اسم صغير على المقبض
    const grip = canvasTex(512, 128, (g, w, h) => {
      g.fillStyle = GOLD; g.font = '700 64px "Helvetica Neue",Arial,sans-serif'; g.textBaseline = 'middle'; g.textAlign = 'center';
      if ('letterSpacing' in g) g.letterSpacing = '10px';
      g.fillText('OSMAN', w / 2, h / 2);
    });
    add(new THREE.PlaneGeometry(2.0, 0.5), decalMat(grip, { metalness: 0.8, roughness: 0.25 }), 5.0, 1.9, 1.91);

    // غطاء ذهبي بشكل العدسة فوق قرص الأوضاع
    const cap = canvasTex(256, 256, (g, w) => aperture(g, w / 2, w / 2, 2.6, GOLD));
    const capM = add(new THREE.PlaneGeometry(1.25, 1.25), decalMat(cap, { metalness: 0.9, roughness: 0.22 }), 4.3, 4.39, -0.6);
    capM.rotation.x = -Math.PI / 2;

    // الحلقة الأمامية للعدسة: كتابة دائرية مثل العدسات الحقيقية
    const ring = canvasTex(1024, 1024, (g, w) => {
      const c = w / 2, ro = c, ri = c * 2.85 / 3.45, rt = c * 3.1 / 3.45;
      g.fillStyle = '#08080b'; g.beginPath(); g.arc(c, c, ro, 0, 7); g.arc(c, c, ri, 0, 7, true); g.fill();
      g.textBaseline = 'middle'; g.textAlign = 'center';
      const write = (txt, start, col, size) => {
        g.font = `600 ${size}px "Helvetica Neue",Arial,sans-serif`; g.fillStyle = col;
        let a = start;
        for (const ch of txt) {
          const cw = g.measureText(ch).width + size * 0.18;
          a += cw / 2 / rt;
          g.save(); g.translate(c, c); g.rotate(a); g.translate(0, -rt); g.fillText(ch, 0, 0); g.restore();
          a += cw / 2 / rt;
        }
        return a;
      };
      let a = write('ISMUEIL OSMAN', -1.55, GOLD, 42);
      a = write('  ·  FILM · DESIGN · GROWTH', a, SILVER, 36);
      write('35mm  1:1.4   Ø67', 1.65, SILVER, 36);
    });
    const ringMesh = lens.children.find(m => m.geometry && m.geometry.type === 'RingGeometry' && m.material === M.dark);
    if (ringMesh) ringMesh.material = new THREE.MeshStandardMaterial({ map: ring, transparent: true, roughness: 0.55, metalness: 0.1 });

    // الشاشة الخلفية تعرض صورة من أعمالي مع واجهة الكاميرا
    const scr = lens.parent.children.find(m => m.geometry && m.geometry.type === 'PlaneGeometry' && m.material === M.screen);
    const img = new Image();
    img.onload = () => {
      const t = canvasTex(1024, 630, (g, w, h) => {
        const s = Math.max(w / img.width, h / img.height), iw = img.width * s, ih = img.height * s;
        g.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
        g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(0, 0, w, 54); g.fillRect(0, h - 54, w, 54);
        g.fillStyle = '#fff'; g.font = '600 30px "Helvetica Neue",Arial,sans-serif'; g.textBaseline = 'middle';
        g.fillText('1/250   F1.4   ISO 100', 28, h - 27);
        g.textAlign = 'right'; g.fillStyle = GOLD; g.fillText('● REC 4K', w - 28, 27);
        g.textAlign = 'left'; g.fillStyle = '#fff'; g.fillText('ISMUEIL OSMAN', 28, 27);
        g.strokeStyle = GOLD; g.lineWidth = 4; const bx = w / 2, by = h / 2, bs = 70, bl = 22;
        [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sy]) => { g.beginPath(); g.moveTo(bx + sx * bs, by + sy * (bs - bl)); g.lineTo(bx + sx * bs, by + sy * bs); g.lineTo(bx + sx * (bs - bl), by + sy * bs); g.stroke(); });
      });
      if (scr) { scr.material = new THREE.MeshBasicMaterial({ map: t, toneMapped: false, color: 0xd8d8d8 }); dirty = true; }
    };
    img.src = 'assets/img/studio-lighting.webp';
  } catch (e) { console.error(e); }

  /* ---------- قطع الكاميرا لقسم «من الداخل»: كل قطعة = خدمة ---------- */
  const parts = {};
  ['lens', 'sensor', 'top', 'screen', 'card', 'battery', 'body'].forEach(k => { parts[k] = new THREE.Group(); });
  [...model.children].forEach(o => {
    let k = 'body';
    const p = o.position;
    if (o === lens || (Math.abs(p.x - LX) < 0.01 && Math.abs(p.y - LY) < 0.01 && p.z > 1.8 && p.z < 2.4)) k = 'lens';
    else if (p.y >= 3.3) k = 'top';
    else if (p.z <= -1.9 && p.y < 2.2) k = 'screen';
    parts[k].add(o);
  });
  // قطع داخلية مخفية داخل الجسم، تظهر فقط لما تتفكك الكاميرا
  const sensorM = new THREE.MeshPhysicalMaterial({ color: 0x0b3328, roughness: 0.12, metalness: 0.75, iridescence: 1, iridescenceIOR: 1.9, iridescenceThicknessRange: [200, 750], emissive: 0x0b4a36, emissiveIntensity: 0.55 });
  add(new RoundedBoxGeometry(4.8, 3.6, 0.35, 2, 0.1), M.shell, LX, LY, 1.05, parts.sensor);
  add(new THREE.PlaneGeometry(3.7, 2.5), sensorM, LX, LY, 1.24, parts.sensor);
  add(new RoundedBoxGeometry(4.0, 2.8, 0.06, 1, 0.02), M.gold, LX, LY, 1.22, parts.sensor);
  const cardM = new THREE.MeshStandardMaterial({ color: 0x15161b, roughness: 0.35, metalness: 0.3 });
  add(new RoundedBoxGeometry(2.4, 3.2, 0.24, 2, 0.08), cardM, 4.2, -1.3, -0.3, parts.card);
  add(new THREE.PlaneGeometry(2.1, 0.9), M.gold, 4.2, -0.2, -0.17, parts.card);
  for (let i = 0; i < 6; i++) add(new THREE.BoxGeometry(0.22, 0.55, 0.05), M.gold, 3.3 + i * 0.36, -2.55, -0.17, parts.card);
  add(new RoundedBoxGeometry(2.1, 5.2, 2.3, 3, 0.3), M.dark, -4.6, -0.7, 0.7, parts.battery);
  add(new RoundedBoxGeometry(2.16, 0.5, 2.36, 2, 0.15), M.gold, -4.6, 1.2, 0.7, parts.battery);
  add(new RoundedBoxGeometry(0.9, 0.35, 0.9, 2, 0.1), M.metal, -4.6, 2.05, 0.7, parts.battery);
  Object.values(parts).forEach(g => model.add(g));
  const PART_C = { lens: [LX, LY, 2.4 + FRONT * 0.55], sensor: [LX, LY, 1.2], top: [0.9, 4.4, 0], screen: [1.3, -0.6, -2.2], card: [4.2, -1.3, -0.3], battery: [-4.6, -0.6, 0.7] };

  // توسيط المجسم حول مركزه
  model.position.set(-0.3, 0, -4.0);
  const pivot = new THREE.Group(); pivot.add(model); scene.add(pivot);

  /* ---------- الحالة والرسم ---------- */
  let W = 1, H = 1, E = 0, SW = 0, dirty = true, visible = true;
  let docked = false, shotT = -1;   // الكاميرا المرافقة في زاوية الشاشة
  let mode = 'hero', insP = 0, exNow = -1;   // hero | ins | dock
  const lerp = (a, b, t) => a + (b - a) * t;
  const sm = t => t * t * (3 - 2 * t);
  const lensWorld = new THREE.Vector3();

  function size() {
    const r = (mode === 'dock' ? dock : mode === 'ins' ? insStage : stage).getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
    renderer.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix(); dirty = true;
  }

  function frame() {
    if (!dirty || !visible) return;
    dirty = false;
    if (mode === 'ins') { insFrame(); return; }
    explode(0);
    if (docked) { dockFrame(); return; }
    const e = E, k = 1 - e;
    // دوران كامل 360° + زاوية بداية ثلاثة أرباع، وينتهي والعدسة مواجهة
    pivot.rotation.y = -(Math.PI * 2 + 0.75) * k + SW * 0.012 * k;
    pivot.rotation.x = 0.32 * k - Math.abs(SW) * 0.002 * k;
    pivot.rotation.z = -0.06 * k;
    pivot.updateMatrixWorld(true);

    // موقع مركز واجهة العدسة في العالم
    lensWorld.set(LX, LY, LENS_FRONT_Z); model.localToWorld(lensWorld);

    const tanH = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const fitW = 13.5 / (2 * tanH * cam.aspect) * 1.9, fitH = 11 / (2 * tanH) * 1.9;
    const dStart = Math.max(fitW, fitH, 34);
    const targetPx = Math.min(W, H) * 0.215;                       // نصف قطر العدسة النهائي على الشاشة
    const dEnd = LENS_R * (H / 2) / (targetPx * tanH);
    const t = sm(Math.min(1, Math.max(0, (e - 0.35) / 0.65)));
    const tx = lerp(0, lensWorld.x, t), ty = lerp(0.4, lensWorld.y, t), tz = lerp(0, lensWorld.z, t);
    cam.position.set(tx, ty + lerp(2.2, 0, t), tz + lerp(dStart, dEnd, t));
    cam.lookAt(tx, ty, tz);
    renderer.render(scene, cam);
  }

  let dead = false;
  function loop() { if (dead) return; try { flashLight(); frame(); } catch (e) { dead = true; fail(); return; } requestAnimationFrame(loop); }
  cv.addEventListener('webglcontextlost', ev => { ev.preventDefault(); dead = true; fail(); });

  stage.appendChild(cv);
  if (oldCam) oldCam.style.display = 'none';
  document.documentElement.classList.remove('c3p');
  size();
  /* ---------- الكاميرا المرافقة: بعد المقدمة تنتقل نفس الكاميرا لزاوية الشاشة وترافق الزائر ---------- */
  const reduceM = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const dock = document.createElement('button');
  dock.type = 'button'; dock.className = 'c3dock';
  const dockLabel = () => document.documentElement.lang === 'en' ? 'Back to top' : 'العودة للأعلى';
  dock.setAttribute('aria-label', dockLabel()); dock.title = dockLabel();
  dock.addEventListener('pointerenter', () => { dock.setAttribute('aria-label', dockLabel()); dock.title = dockLabel(); });
  dock.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: reduceM ? 'auto' : 'smooth' }); });
  document.body.appendChild(dock);
  const insSec = document.getElementById('inside'), insStage = document.getElementById('insStage');
  const insLb = insSec ? [...insSec.querySelectorAll('.ins-list li')] : [];
  let heroVis = true, insVis = false;
  function setMode(m) {
    if (m === mode) return;
    mode = m; docked = m === 'dock';
    (m === 'dock' ? dock : m === 'ins' ? insStage : stage).appendChild(cv);
    document.documentElement.classList.toggle('c3-docked', docked);
    if (insSec) insSec.classList.toggle('ins-live', m === 'ins');
    size();
  }
  function pickMode() { setMode(heroVis ? 'hero' : (insVis && insStage ? 'ins' : 'dock')); if (mode === 'ins') insProg(); visible = true; dirty = true; }
  /* تفكيك: كل قطعة تبتعد باتجاهها، وتلف شوي */
  const OFF_L = { lens: [0, 0.4, 11], sensor: [0, 0.2, 5.2], top: [0, 6.8, -0.5], screen: [0, -0.4, -9], card: [2.6, -6.6, 2.6], battery: [-7.5, -4.6, 1.5] };
  const OFF_P = { lens: [0, -4.6, 6.6], sensor: [0, 2.8, 4.6], top: [0, 9.2, 0], screen: [0, -1.6, -7.5], card: [-4.6, -7.4, -3.2], battery: [-3, 5.2, -2] };
  const SPIN = { lens: [0, 0, 0.9], sensor: [0.35, 0.5, 0], top: [0.3, 0, 0.2], screen: [-0.25, 0.4, 0], card: [0.6, -0.8, 0.5], battery: [-0.4, 0.7, -0.3] };
  function explode(a) {
    if (a === exNow) return; exNow = a;
    const O = cam.aspect < 0.85 ? OFF_P : OFF_L;
    for (const k in O) { const g = parts[k], o = O[k], r = SPIN[k]; g.position.set(o[0] * a, o[1] * a, o[2] * a); g.rotation.set(r[0] * a, r[1] * a, r[2] * a); }
  }
  const tmpV = new THREE.Vector3();
  let insFlashed = false, lastAct = -2, capLang = '';
  const insCap = insSec && insSec.querySelector('.ins-cap');
  let insFl = null;
  if (insStage) { insFl = document.createElement('div'); insFl.setAttribute('aria-hidden', 'true');
    insFl.style.cssText = 'position:absolute;inset:0;z-index:4;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.95) 0,rgba(255,244,225,.6) 25%,rgba(255,220,170,0) 65%)';
    insStage.parentElement.appendChild(insFl); }
  function insFrame() {
    const p = reduceM ? 0.6 : insP;
    const cl = v => Math.min(1, Math.max(0, v));
    const a = sm(cl((p - 0.06) / 0.3)) * (1 - sm(cl((p - 0.84) / 0.12)));
    exNow = -1; explode(a);
    const portrait = cam.aspect < 0.85;
    pivot.rotation.y = lerp(-0.35, portrait ? 0.62 : 0.95, sm(cl(p / 0.5))) - (portrait ? 0 : 0.25) * sm(cl((p - 0.5) / 0.4));
    pivot.rotation.x = lerp(0.12, 0.3, a);
    pivot.rotation.z = 0;
    pivot.updateMatrixWorld(true);
    const tanH = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const bw = lerp(18, portrait ? 24 : 31, a), bh = lerp(15, portrait ? 33 : 20, a);
    const d = Math.max(bw / (2 * tanH * cam.aspect), bh / (2 * tanH)) * 1.08;
    cam.position.set(0, 0.6, d); cam.lookAt(0, 0.2, 0);
    renderer.render(scene, cam);
    // تسميات القطع: تتبع كل قطعة على الشاشة، والنشطة تتغير مع التمرير
    const act = a > 0.85 ? Math.min(4, Math.floor(cl((p - 0.36) / 0.48) * 5)) : -1;
    const lws = insLb.map(li => li.offsetWidth);
    insLb.forEach((li, i) => {
      const k = li.dataset.p, c = PART_C[k]; if (!c) return;
      tmpV.set(c[0], c[1], c[2]).applyMatrix4(parts[k].matrixWorld);
      tmpV.project(cam);
      let x = (tmpV.x * 0.5 + 0.5) * W, y = (-tmpV.y * 0.5 + 0.5) * H;
      const right = x > W * 0.5, lw = lws[i] + 10;
      x = right ? Math.min(x, W - lw) : Math.max(x, lw);   // التسمية ما تطلع برا الشاشة
      y = Math.min(H - 28, Math.max(28, y));
      li.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      li.classList.toggle('flip', right);
      li.classList.toggle('show', a > 0.8);
      li.classList.toggle('act', i === act);
    });
    const lang = document.documentElement.lang;
    if (act !== lastAct || lang !== capLang) {
      if (act !== lastAct && act >= 0 && !reduceM) shutter(0.5, true);   // لقطة لكل قطعة/خدمة
      lastAct = act; capLang = lang;
      if (insCap) { const sp = act >= 0 && insLb[act].querySelector('span'); insCap.innerHTML = sp ? '<b dir="ltr">0' + (act + 1) + '</b>' + sp.innerHTML : ''; insCap.classList.toggle('on', !!sp); }
    }
    // لما تتركب من جديد: فلاش وصوت غالق
    if (p > 0.94 && !insFlashed && !reduceM) {
      insFlashed = true; flashT = performance.now(); shutter(1);
      if (insFl) insFl.animate([{ opacity: 0 }, { opacity: 0.85, offset: 0.08 }, { opacity: 0.3, offset: 0.35 }, { opacity: 0 }], { duration: 650, easing: 'ease-out' });
    }
    if (p < 0.85) insFlashed = false;
  }
  function dockFrame() {
    const st = window.scrollY || 0;
    let kick = 0;
    if (shotT >= 0) { const t = (performance.now() - shotT) / 520; if (t >= 1) shotT = -1; else { kick = Math.sin(t * Math.PI); dirty = true; } }
    pivot.rotation.y = reduceM ? -0.55 : -0.55 + Math.sin(st * 0.0011) * 0.5;
    pivot.rotation.x = 0.16 + kick * 0.12;
    pivot.rotation.z = -0.03;
    pivot.updateMatrixWorld(true);
    const tanH = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const d = Math.max(13.5 / (2 * tanH * cam.aspect), 11 / (2 * tanH)) * 1.5 * (1 + kick * 0.05);
    cam.position.set(0, 0.6, d); cam.lookAt(0, 0.2, 0);
    renderer.render(scene, cam);
  }
  new IntersectionObserver(es => { heroVis = es[0].isIntersecting; pickMode(); }).observe(stage);
  if (insStage) new IntersectionObserver(es => { insVis = es[0].isIntersecting; pickMode(); }).observe(insStage);
  function insProg() { if (!insSec) return; const r = insSec.getBoundingClientRect(); insP = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight))); }
  addEventListener('scroll', () => { if (mode === 'ins') { insProg(); dirty = true; } else if (docked && !reduceM) dirty = true; }, { passive: true });
  insProg();
  addEventListener('resize', size);
  /* ---------- فلاش التصوير: مرة واحدة لما تكتمل اللفة والعدسة مواجهة للزائر ---------- */
  const host = stage.parentElement;
  const fl = document.createElement('div');
  fl.setAttribute('aria-hidden', 'true');
  fl.style.cssText = 'position:absolute;inset:0;z-index:6;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 46%,rgba(255,255,255,1) 0,rgba(255,250,235,.92) 18%,rgba(255,236,200,.55) 42%,rgba(255,220,170,0) 72%)';
  host.appendChild(fl);
  const pop = new THREE.PointLight(0xffffff, 0, 60, 1.5); pop.position.set(0, 2, 30); scene.add(pop);
  let fired = false, flashT = -1;
  function flash() {
    fired = true; flashT = performance.now();
    fl.animate([{ opacity: 0 }, { opacity: 0.95, offset: 0.08 }, { opacity: 0.35, offset: 0.35 }, { opacity: 0 }], { duration: 650, easing: 'ease-out' });
    if (navigator.vibrate&&(!navigator.userActivation||navigator.userActivation.hasBeenActive)) try { navigator.vibrate(18); } catch (_) {}
    shutter();
  }
  /* صوت غالق الكاميرا: تكتين قصيرتين مولّدتين بالصوت الرقمي، بلا ملفات.
     المتصفح يسمح بالصوت فقط بعد أن يضغط الزائر على شيء في الصفحة؛ غير ذلك نسكت بهدوء. */
  let actx = null;
  /* ---------- صوت محرّك الزوم: يشتغل مع سرعة التمرير، ويسكت لما يوقف الزائر ---------- */
  function audio() {
    if (window.SND && !window.SND.on()) return null;
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    // نحاول دائماً: بعض المتصفحات تسمح بالصوت تلقائياً (زائر متكرر، أو الموقع مضاف للشاشة الرئيسية)
    try { actx = actx || new AC(); if (actx.state === 'suspended') actx.resume(); } catch (_) { return null; }
    const ua = navigator.userActivation;
    return actx.state === 'running' || (ua && ua.hasBeenActive) ? actx : null;
  }
  let zs = null, zT = 0, zAcc = 0;
  function zoomSound(v, pitch) {
    try {
      const ctx = audio(); if (!ctx) return;
      if (!zs) {
        const n = ctx.sampleRate * 2, buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
        let b = 0; for (let i = 0; i < n; i++) { b = 0.97 * b + 0.03 * (Math.random() * 2 - 1); d[i] = b * 6; }   // ضجيج ناعم مثل محرّك صغير
        const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
        const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 3.5; bp.frequency.value = 900;
        const g = ctx.createGain(); g.gain.value = 0;
        src.connect(bp).connect(g).connect(ctx.destination); src.start();
        const osc = ctx.createOscillator(); osc.type = 'sawtooth'; osc.frequency.value = 80;
        const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520;
        const og = ctx.createGain(); og.gain.value = 0;
        osc.connect(lp).connect(og).connect(ctx.destination); osc.start();
        zs = { g, og, bp, osc };
      }
      const now = ctx.currentTime, amp = Math.min(1, Math.abs(v) * 2.4);
      zs.g.gain.setTargetAtTime(0.11 * amp, now, 0.03);
      zs.og.gain.setTargetAtTime(0.022 * amp, now, 0.03);
      zs.bp.frequency.setTargetAtTime(650 + pitch * 1700 + amp * 300, now, 0.06);
      zs.osc.frequency.setTargetAtTime(62 + pitch * 70 + amp * 35, now, 0.06);
      // تكّات خفيفة مثل حلقة الزوم وهي تلف
      zAcc += Math.abs(v) * 0.016;
      if (zAcc > 0.06) { zAcc = 0; const t = now + 0.005, o = ctx.createOscillator(), tg = ctx.createGain(); o.type = 'square'; o.frequency.value = 2600 + pitch * 900;
        tg.gain.setValueAtTime(0.0001, t); tg.gain.exponentialRampToValueAtTime(0.012, t + 0.002); tg.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);
        o.connect(tg).connect(ctx.destination); o.start(t); o.stop(t + 0.02); }
      clearTimeout(zT); zT = setTimeout(zoomStop, 70);   // يسكت فور ما توقف العدسة
    } catch (_) {}
  }
  function zoomStop() { clearTimeout(zT); if (!zs || !actx) return; const t = actx.currentTime; zs.g.gain.setTargetAtTime(0, t, 0.025); zs.og.gain.setTargetAtTime(0, t, 0.025); }
  let zPrev = 0, zPrevT = 0;
  function zoomFrom(x, pitch) {   // x: قيمة تتغير مع التمرير (0..1)
    const t = performance.now(), dt = Math.max(16, t - zPrevT), v = (x - zPrev) / dt * 1000;
    zPrev = x; zPrevT = t;
    if (Math.abs(v) > 0.02 && dt < 400) zoomSound(v, pitch); else if (dt >= 400) zoomStop();
  }
  function shutter(vol = 1, beep = false) {
    try {
      if (!audio()) return;
      const t0 = actx.currentTime + 0.01;
      const click = (t, dur, freq, vol) => {
        const n = Math.floor(actx.sampleRate * dur), buf = actx.createBuffer(1, n, actx.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
        const src = actx.createBufferSource(); src.buffer = buf;
        const bp = actx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 0.9;
        const g = actx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(bp).connect(g).connect(actx.destination); src.start(t);
      };
      if (beep) {   // صفّارة تأكيد التركيز قبل اللقطة، مثل الكاميرات الحقيقية
        [0, 0.07].forEach(dt => { const o = actx.createOscillator(), g = actx.createGain(); o.type = 'sine'; o.frequency.value = 2400;
          g.gain.setValueAtTime(0.0001, t0 + dt); g.gain.exponentialRampToValueAtTime(0.05 * vol, t0 + dt + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + 0.05);
          o.connect(g).connect(actx.destination); o.start(t0 + dt); o.stop(t0 + dt + 0.06); });
      }
      const s0 = t0 + (beep ? 0.2 : 0);
      click(s0, 0.045, 3200, 0.35 * vol);          // فتح الغالق
      click(s0 + 0.075, 0.06, 2200, 0.28 * vol);   // إغلاقه
    } catch (_) {}
  }
  function flashLight() {
    if (flashT < 0) return;
    const t = (performance.now() - flashT) / 420;
    pop.intensity = t < 1 ? 900 * Math.pow(1 - t, 2) : 0;
    if (t >= 1) flashT = -1;
    dirty = true;
  }

  window.CAM3D = { set(e, sway) {
    if (e !== E && mode === 'hero' && !reduceM) { const z = Math.min(1, Math.max(0, (e - 0.35) / 0.65)), z0 = Math.min(1, Math.max(0, (E - 0.35) / 0.65)); if (z !== z0) zoomFrom(z, z); else zoomStop(); }
    if (e !== E || sway !== SW) { E = e; SW = sway; dirty = true; }
  }, flash, shutter, unlock() { audio(); },
    /* لقطة لكل قسم جديد: الكاميرا المرافقة تومض وتطلق الغالق */
    shot() {
      if (!docked) return;
      if (!reduceM) { shotT = performance.now(); flashT = shotT; dock.classList.remove('shot'); void dock.offsetWidth; dock.classList.add('shot'); }
      shutter(0.55, true); dirty = true;
    } };   /* الفلاش يطلقه app.js بعد ما يقفل التركيز على الاسم */
  requestAnimationFrame(loop);
  document.documentElement.classList.add('cam3d-on');
}

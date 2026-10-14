/* كاميرا ميرورلس ثلاثية الأبعاد (Three.js) — تدور 360° مع السحب وتنتهي والعدسة مواجهة للزائر.
   إذا تعذّر WebGL أو تحميل المكتبة تبقى صورة الكاميرا القديمة كما هي. */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const stage = document.getElementById('cam3d');
const oldCam = document.getElementById('cam');
if (stage && !matchMedia('(prefers-reduced-motion:reduce)').matches) init();

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

  // توسيط المجسم حول مركزه
  model.position.set(-0.3, 0, -4.0);
  const pivot = new THREE.Group(); pivot.add(model); scene.add(pivot);

  /* ---------- الحالة والرسم ---------- */
  let W = 1, H = 1, E = 0, SW = 0, dirty = true, visible = true;
  const lerp = (a, b, t) => a + (b - a) * t;
  const sm = t => t * t * (3 - 2 * t);
  const lensWorld = new THREE.Vector3();

  function size() {
    const r = stage.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
    renderer.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix(); dirty = true;
  }

  function frame() {
    if (!dirty || !visible) return;
    dirty = false;
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

  function loop() { flashLight(); frame(); requestAnimationFrame(loop); }

  stage.appendChild(cv);
  if (oldCam) oldCam.style.display = 'none';
  document.documentElement.classList.remove('c3p');
  size();
  new IntersectionObserver(es => { visible = es[0].isIntersecting; dirty = true; }).observe(stage);
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
    if (navigator.vibrate) try { navigator.vibrate(18); } catch (_) {}
    shutter();
  }
  /* صوت غالق الكاميرا: تكتين قصيرتين مولّدتين بالصوت الرقمي، بلا ملفات.
     المتصفح يسمح بالصوت فقط بعد أن يضغط الزائر على شيء في الصفحة؛ غير ذلك نسكت بهدوء. */
  let actx = null;
  function shutter() {
    try {
      const ua = navigator.userActivation;
      if (ua && !ua.hasBeenActive) return;
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      actx = actx || new AC();
      if (actx.state === 'suspended') actx.resume();
      if (actx.state !== 'running' && !(ua && ua.hasBeenActive)) return;
      const t0 = actx.currentTime + 0.01;
      const click = (t, dur, freq, vol) => {
        const n = Math.floor(actx.sampleRate * dur), buf = actx.createBuffer(1, n, actx.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
        const src = actx.createBufferSource(); src.buffer = buf;
        const bp = actx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 0.9;
        const g = actx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(bp).connect(g).connect(actx.destination); src.start(t);
      };
      click(t0, 0.045, 3200, 0.35);          // فتح الغالق
      click(t0 + 0.075, 0.06, 2200, 0.28);   // إغلاقه
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
    if (e !== E || sway !== SW) { E = e; SW = sway; dirty = true; }
    if (!fired && e >= 0.97) flash();
    if (fired && e < 0.4) fired = false;   // يرجع جاهز لو رجع الزائر لأعلى الصفحة
  } };
  requestAnimationFrame(loop);
  document.documentElement.classList.add('cam3d-on');
}

/*! © 2026 Ismueil Osman (إسماعيل عثمان) — ismueilosman.com. All rights reserved. */
/* افتتاحية الرئيسية: عدسة كاميرا ذهبية ثلاثية الأبعاد مكان حرف O في OSMAN.
   إذا تعذّر WebGL تبقى العدسة الذهبية المرسومة بالـ CSS. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
const host=document.getElementById('osxLens'),sec=document.getElementById('osx');
function placeStreak(){if(!host||!sec)return;const r=host.getBoundingClientRect(),o=sec.getBoundingClientRect();sec.style.setProperty('--sy',(r.top-o.top+r.height/2)+'px')}
addEventListener('resize',placeStreak);setTimeout(placeStreak,60);setTimeout(placeStreak,1800);
let renderer=null;
if(host){try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'})}catch(e){renderer=null}}
if(renderer){try{init()}catch(e){const c=host.querySelector('canvas');if(c)c.remove()}}
function init(){
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.outputColorSpace=THREE.SRGBColorSpace;
host.appendChild(renderer.domElement);
const scene=new THREE.Scene();
const pm=new THREE.PMREMGenerator(renderer);scene.environment=pm.fromScene(new RoomEnvironment(),.04).texture;
const cam=new THREE.PerspectiveCamera(28,1,.1,50);cam.position.set(0,0,6.2);
const lens=new THREE.Group();scene.add(lens);
const gold=new THREE.MeshPhysicalMaterial({color:0xe7ad55,metalness:1,roughness:.2,clearcoat:.7,clearcoatRoughness:.15});
const goldDeep=new THREE.MeshPhysicalMaterial({color:0xb07630,metalness:1,roughness:.32});
const black=new THREE.MeshPhysicalMaterial({color:0x0b0b0e,metalness:.4,roughness:.55,clearcoat:.3});
const inner=new THREE.MeshStandardMaterial({color:0x050506,metalness:.2,roughness:.9,side:THREE.DoubleSide});
const prof=[[.6,.55],[.92,.55],[1,.5],[1,.3],[.97,.28],[.97,.22],[1,.2],[1,-.05],[.96,-.08],[.9,-.5],[.7,-.55]].map(p=>new THREE.Vector2(p[0],p[1]));
const body=new THREE.Mesh(new THREE.LatheGeometry(prof,160),gold);body.rotation.x=Math.PI/2;lens.add(body);
const grip=new THREE.Mesh(new THREE.CylinderGeometry(1.025,1.025,.2,160,1,true),black);grip.rotation.x=Math.PI/2;grip.position.z=.1;lens.add(grip);
const ridge=new THREE.BoxGeometry(.012,.018,.2);
for(let i=0;i<72;i++){const r=new THREE.Mesh(ridge,goldDeep);const a=i/72*Math.PI*2;r.position.set(Math.cos(a)*1.032,Math.sin(a)*1.032,.1);r.rotation.z=a;lens.add(r)}
const lip=new THREE.Mesh(new THREE.TorusGeometry(.76,.028,24,160),gold);lip.position.z=.55;lens.add(lip);
const tube=new THREE.Mesh(new THREE.CylinderGeometry(.6,.5,.9,96,1,true),inner);tube.rotation.x=Math.PI/2;tube.position.z=.1;lens.add(tube);
/* فتحة العدسة السباعية */
const N=7,R=.6;
const iris=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshPhysicalMaterial({color:0x15110b,metalness:.85,roughness:.38,side:THREE.DoubleSide}));iris.position.z=.18;lens.add(iris);
const edges=new THREE.LineSegments(new THREE.BufferGeometry(),new THREE.LineBasicMaterial({color:0x9c6a2a,transparent:true,opacity:.75}));edges.position.z=.181;lens.add(edges);
let lastO=-1;
function setIris(o){if(Math.abs(o-lastO)<.004)return;lastO=o;const r=.06+o*.46,tw=(1-o)*.9;
const sh=new THREE.Shape();sh.absarc(0,0,R,0,Math.PI*2,false);const h=new THREE.Path();
for(let i=0;i<N;i++){const a=i/N*Math.PI*2+tw;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?h.lineTo(x,y):h.moveTo(x,y)}h.closePath();sh.holes.push(h);
iris.geometry.dispose();iris.geometry=new THREE.ShapeGeometry(sh,64);
const v=[];for(let i=0;i<N;i++){const a=i/N*Math.PI*2+tw,a2=(i+1)/N*Math.PI*2+tw;const x=Math.cos(a)*r,y=Math.sin(a)*r;
const dx=Math.cos(a2)*r-x,dy=Math.sin(a2)*r-y,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L;const b=x*ux+y*uy,c=x*x+y*y-R*R,t=-b+Math.sqrt(b*b-c);v.push(x,y,0,x+ux*t,y+uy*t,0)}
edges.geometry.dispose();edges.geometry=new THREE.BufferGeometry();edges.geometry.setAttribute('position',new THREE.Float32BufferAttribute(v,3))}
setIris(.6);
const back=new THREE.Mesh(new THREE.CircleGeometry(.6,64),new THREE.MeshBasicMaterial({color:0x020203}));back.position.z=-.2;lens.add(back);
const glass=new THREE.Mesh(new THREE.SphereGeometry(1.15,96,48,0,Math.PI*2,0,.56),new THREE.MeshPhysicalMaterial({color:0x0a0d18,metalness:.1,roughness:.02,clearcoat:1,clearcoatRoughness:0,iridescence:1,iridescenceIOR:1.45,iridescenceThicknessRange:[200,700],transparent:true,opacity:.55,envMapIntensity:2.4}));
glass.rotation.x=Math.PI/2;glass.position.z=-.5;lens.add(glass);
const key=new THREE.PointLight(0xffd9a0,40,20);key.position.set(-3,3,4);scene.add(key);
const rim=new THREE.PointLight(0x8fb8ff,18,20);rim.position.set(3,-2,2);scene.add(rim);
scene.add(new THREE.AmbientLight(0xffffff,.25));
lens.scale.setScalar(1.02);
function size(){const w=host.clientWidth*1.5;renderer.setSize(w,w,false)}
size();addEventListener('resize',size);
host.classList.add('gl');
let mx=0,my=0,tx=0,ty=0;
addEventListener('pointermove',e=>{tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1},{passive:true});
/* ميلان الجوال */
addEventListener('deviceorientation',e=>{if(e.gamma==null)return;tx=Math.max(-1,Math.min(1,e.gamma/30));ty=Math.max(-1,Math.min(1,(e.beta-45)/30))},{passive:true});
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
let vis=true;new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(host);
const clock=new THREE.Clock();
function frame(){requestAnimationFrame(frame);if(!vis||document.hidden)return;const t=calm?1.2:clock.getElapsedTime();
mx+=(tx-mx)*.06;my+=(ty-my)*.06;
const sp=Math.min(1,Math.max(0,scrollY/(innerHeight*.8)));
lens.rotation.y=Math.sin(t*.55)*.42+mx*.5+sp*1.2;
lens.rotation.x=.12+Math.sin(t*.4)*.12+my*.35;
lens.rotation.z=t*.05;
setIris(Math.min(1,Math.max(0,(.55+Math.sin(t*.9)*.35)*(1-sp*.9))));
scene.environmentRotation.y=t*.25;
renderer.render(scene,cam)}
frame();
}

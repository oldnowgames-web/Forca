(function(){
var WORDS={
"Animais":["elefante", "girafa", "borboleta", "golfinho", "crocodilo", "tartaruga", "papagaio", "camaleão", "pinguim", "jacaré", "hipopótamo", "rinoceronte", "leopardo", "orangotango", "tamanduá", "preguiça", "capivara", "flamingo", "escorpião", "águia", "coruja", "lagosta", "cavalo", "morcego"],
"Comidas":["feijoada", "lasanha", "brigadeiro", "panqueca", "macarrão", "sorvete", "hambúrguer", "coxinha", "pastel", "churrasco", "pamonha", "tapioca", "esfirra", "omelete", "risoto", "bolinho", "pizza", "empada", "canjica", "acarajé", "moqueca", "estrogonofe", "farofa", "paçoca"],
"Frutas":["abacaxi", "morango", "melancia", "maracujá", "goiaba", "framboesa", "laranja", "mamão", "jabuticaba", "banana", "cereja", "pêssego", "amora", "caju", "manga", "limão", "uva", "carambola", "tangerina", "acerola", "pitanga", "graviola", "kiwi", "lichia", "damasco"],
"Países":["portugal", "argentina", "austrália", "japão", "noruega", "moçambique", "canadá", "colômbia", "egito", "alemanha", "espanha", "suécia", "holanda", "marrocos", "tailândia", "vietnã", "paraguai", "uruguai", "equador", "bolívia", "dinamarca", "irlanda", "islândia", "finlândia", "indonésia"],
"Objetos":["computador", "geladeira", "escada", "cadeira", "relógio", "lanterna", "tesoura", "martelo", "espelho", "travesseiro", "ventilador", "microfone", "binóculo", "cadeado", "calculadora", "liquidificador", "chaveiro", "prateleira", "cobertor", "mochila", "campainha", "abajur", "colher", "fogão", "lâmpada"],
"Profissões":["bombeiro", "astronauta", "jardineiro", "professora", "engenheiro", "dentista", "cozinheiro", "pintora", "médico", "advogado", "arquiteto", "padeiro", "fotógrafo", "cientista", "motorista", "piloto", "veterinário", "carpinteiro", "eletricista", "jornalista", "músico", "enfermeira", "marinheiro", "detetive", "mecânico"],
"Natureza":["montanha", "cachoeira", "vulcão", "floresta", "tempestade", "deserto", "pântano", "geleira", "oceano", "cordilheira", "cratera", "planície", "caverna", "relâmpago", "furacão", "tornado", "neblina", "orvalho", "arrecife", "penhasco", "savana", "tundra", "lagoa", "nascente", "cânion"],
"Esportes":["futebol", "basquete", "natação", "ciclismo", "voleibol", "atletismo", "ginástica", "boxe", "judô", "tênis", "surfe", "skate", "esgrima", "remo", "handebol", "golfe", "rúgbi", "capoeira", "maratona", "patinação", "escalada", "hóquei", "beisebol", "badminton", "triatlo"],
"Cidades do Brasil":["salvador", "fortaleza", "curitiba", "manaus", "brasília", "florianópolis", "goiânia", "recife", "belém", "vitória", "natal", "maceió", "aracaju", "teresina", "cuiabá", "palmas", "macapá", "santos", "campinas", "londrina", "joinville", "niterói"],
"Instrumentos":["violão", "guitarra", "piano", "bateria", "flauta", "trompete", "saxofone", "violino", "violoncelo", "clarinete", "acordeão", "pandeiro", "cavaquinho", "berimbau", "harpa", "tambor", "trombone", "ukulele", "sanfona", "xilofone", "gaita", "triângulo", "órgão", "tuba", "oboé"],
"Corpo humano":["coração", "cérebro", "pulmão", "estômago", "fígado", "intestino", "esqueleto", "músculo", "coluna", "costela", "joelho", "cotovelo", "tornozelo", "pescoço", "ombro", "garganta", "rim", "pele", "sangue", "artéria", "nervo", "retina", "cintura", "queixo", "bochecha"],
"Transportes":["avião", "helicóptero", "submarino", "bicicleta", "motocicleta", "caminhão", "ônibus", "trem", "metrô", "navio", "barco", "patinete", "balão", "charrete", "trator", "lancha", "jangada", "caminhonete", "ambulância", "teleférico", "triciclo", "carroça"],
"Espaço":["planeta", "galáxia", "cometa", "asteroide", "eclipse", "nebulosa", "satélite", "meteoro", "órbita", "foguete", "telescópio", "saturno", "júpiter", "netuno", "plutão", "vênus", "marte", "mercúrio", "universo", "constelação", "gravidade", "cosmos"],
"Escola":["caderno", "lápis", "borracha", "apontador", "régua", "giz", "quadro", "recreio", "matemática", "geografia", "história", "biologia", "química", "física", "redação", "prova", "merenda", "carteira", "biblioteca", "alfabeto", "dicionário", "caneta", "estojo", "lousa"],
"Roupas":["camiseta", "bermuda", "jaqueta", "casaco", "vestido", "saia", "calça", "meia", "sapato", "chinelo", "sandália", "boné", "chapéu", "cachecol", "luva", "gravata", "cinto", "pijama", "biquíni", "moletom", "blusa", "colete", "bota", "macacão", "camisa", "avental"]
};
var MAX=6,pool=[],cur=null,norm="",guessed={},errors=0,over=false,wins=0,losses=0;
var $=function(i){return document.getElementById(i)};
function strip(s){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}

/* ---------- 3D ---------- */
var canvas=$("c"),renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
var scene=new THREE.Scene();scene.background=new THREE.Color(0x0e1722);scene.fog=new THREE.Fog(0x0e1722,16,52);
var camera=new THREE.PerspectiveCamera(45,1,.1,100);
var look=new THREE.Vector3(0,1.9,0);
scene.add(new THREE.HemisphereLight(0x8fb3d9,0x2b1d12,.5));var moonL=new THREE.DirectionalLight(0x9db8e0,.6);moonL.position.set(-5,9,7);moonL.castShadow=true;moonL.shadow.mapSize.set(1024,1024);var mcam=moonL.shadow.camera;mcam.left=-6;mcam.right=6;mcam.top=6;mcam.bottom=-6;mcam.near=1;mcam.far=30;scene.add(moonL);
var world=new THREE.Group();scene.add(world);
function mat(c,r){return new THREE.MeshStandardMaterial({color:c,roughness:r==null?.85:r})}
function box(w,h,d,x,y,z,m){var o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;world.add(o);return o}
function rnd(a,b){return a+Math.random()*(b-a)}
function tex(w,h,fn,rx,ry){var c=document.createElement("canvas");c.width=w;c.height=h;fn(c.getContext("2d"),w,h);var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx||1,ry||1);t.anisotropy=4;t.encoding=THREE.sRGBEncoding;return t}
function woodTex(vert,rx,ry){return tex(256,256,function(g,w,h){
 g.fillStyle="#8c5d37";g.fillRect(0,0,w,h);
 for(var i=0;i<170;i++){var p=rnd(0,vert?w:h),a=rnd(.05,.2),o=rnd(-6,6);
  g.strokeStyle=(i%3?"rgba(40,22,10,":"rgba(190,140,90,")+a+")";g.lineWidth=rnd(1,3.2);g.beginPath();
  if(vert){g.moveTo(p,0);g.bezierCurveTo(p+o,h*.3,p-o,h*.7,p+o*.5,h)}else{g.moveTo(0,p);g.bezierCurveTo(w*.3,p+o,w*.7,p-o,w,p+o*.5)}
  g.stroke()}
 for(var k=0;k<2;k++){var x=rnd(30,w-30),y=rnd(30,h-30);for(var r=14;r>2;r-=3){g.strokeStyle="rgba(35,18,8,.28)";g.lineWidth=1.5;g.beginPath();g.ellipse(x,y,vert?r*.6:r*1.6,vert?r*1.6:r*.6,0,0,6.28);g.stroke()}}
 },rx,ry)}
function wm(vert,rx,ry,tint){var t=woodTex(vert,rx,ry);return new THREE.MeshStandardMaterial({map:t,bumpMap:t,bumpScale:.8,roughness:.92,color:tint||0xffffff})}
var woodH=wm(false,3,1),woodV=wm(true,1,3),woodD=wm(false,2,1,0xb09a8a),woodT=wm(false,1,1,0x6b5040);
var iron=new THREE.MeshStandardMaterial({color:0x23272d,roughness:.45,metalness:.85});
var stone=new THREE.MeshStandardMaterial({color:0x6d7176,roughness:.95,flatShading:true});
function bolt(x,y,z){var o=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.03,6),iron);o.rotation.x=Math.PI/2;o.position.set(x,y,z);world.add(o)}
/* chao e cenario */
var gt=tex(512,512,function(g,w,h){g.fillStyle="#3a5330";g.fillRect(0,0,w,h);for(var i=0;i<2600;i++){var c=Math.random();g.fillStyle=c<.5?"rgba(70,110,55,"+rnd(.2,.6)+")":c<.8?"rgba(30,50,28,"+rnd(.2,.6)+")":"rgba(110,85,55,"+rnd(.2,.5)+")";g.fillRect(rnd(0,w),rnd(0,h),rnd(1,4),rnd(2,7))}},26,26);
function terrain(x,z){var d=Math.sqrt(x*x+z*z),k=Math.min(1,Math.max(0,(d-8)/18));k=k*k*(3-2*k);return k*(Math.sin(x*.13)*Math.cos(z*.11)*2.6+Math.sin(x*.37+z*.29)*.5+2.4)}
var tg=new THREE.PlaneGeometry(160,160,120,120);tg.rotateX(-Math.PI/2);var tp=tg.attributes.position;for(var i=0;i<tp.count;i++)tp.setY(i,terrain(tp.getX(i),tp.getZ(i)));tg.computeVertexNormals();
var ground=new THREE.Mesh(tg,new THREE.MeshStandardMaterial({map:gt,roughness:1}));ground.receiveShadow=true;world.add(ground);
var dc=document.createElement("canvas");dc.width=dc.height=256;var dg=dc.getContext("2d"),dgr=dg.createRadialGradient(128,128,40,128,128,128);dgr.addColorStop(0,"rgba(88,66,42,.95)");dgr.addColorStop(.7,"rgba(88,66,42,.55)");dgr.addColorStop(1,"rgba(88,66,42,0)");dg.fillStyle=dgr;dg.fillRect(0,0,256,256);
var dtx=new THREE.CanvasTexture(dc);dtx.encoding=THREE.sRGBEncoding;
var dirt=new THREE.Mesh(new THREE.PlaneGeometry(8.5,7),new THREE.MeshStandardMaterial({map:dtx,transparent:true,roughness:1,depthWrite:false}));dirt.rotation.x=-Math.PI/2;dirt.position.y=.012;dirt.receiveShadow=true;world.add(dirt);
for(var i=0;i<26;i++){var a=rnd(0,6.28),r=rnd(3,7),s=rnd(.12,.4),m=new THREE.Mesh(new THREE.DodecahedronGeometry(s,0),stone);m.position.set(Math.cos(a)*r,s*.4,Math.sin(a)*r);m.scale.y=.65;m.rotation.set(rnd(0,3),rnd(0,3),0);m.castShadow=m.receiveShadow=true;world.add(m)}
var gm=new THREE.MeshStandardMaterial({color:0x5b8a3f,roughness:1});
var gGeo=new THREE.ConeGeometry(.05,.36,4);gGeo.translate(0,.18,0);
var GN=3000,gi=new THREE.InstancedMesh(gGeo,gm,GN),gd=new THREE.Object3D();
for(var i=0;i<GN;i+=4){var a=rnd(0,6.28),r=3+Math.sqrt(Math.random())*18,cx=Math.cos(a)*r,cz=Math.sin(a)*r;if(Math.abs(cx)<3&&Math.abs(cz)<1.6){r+=5;cx=Math.cos(a)*r;cz=Math.sin(a)*r}
 for(var j=0;j<4;j++){var x=cx+rnd(-.09,.09),z=cz+rnd(-.09,.09);gd.position.set(x,terrain(x,z),z);gd.rotation.set(rnd(-.35,.35),rnd(0,6.28),rnd(-.35,.35));gd.scale.set(rnd(.7,1.3),rnd(.6,1.8),rnd(.7,1.3));gd.updateMatrix();gi.setMatrixAt(i+j,gd.matrix)}}
gi.instanceMatrix.needsUpdate=true;world.add(gi);
var bm=new THREE.MeshStandardMaterial({color:0x2c4a2a,roughness:1,flatShading:true});
for(var i=0;i<22;i++){var a=rnd(0,6.28),r=rnd(8,15),x=Math.cos(a)*r,z=Math.sin(a)*r,bg=new THREE.Group();for(var j=0;j<4;j++){var bl=new THREE.Mesh(new THREE.IcosahedronGeometry(rnd(.35,.7),1),bm);bl.position.set(rnd(-.5,.5),rnd(.2,.5),rnd(-.5,.5));bl.scale.y=.75;bg.add(bl)}bg.position.set(x,terrain(x,z),z);world.add(bg)}
var bt=tex(128,256,function(g,w,h){g.fillStyle="#4a3a2c";g.fillRect(0,0,w,h);for(var i=0;i<140;i++){g.strokeStyle=Math.random()<.5?"rgba(20,14,10,"+rnd(.2,.5)+")":"rgba(120,100,80,"+rnd(.1,.3)+")";g.lineWidth=rnd(1,4);var x=rnd(0,w);g.beginPath();g.moveTo(x,0);g.bezierCurveTo(x+rnd(-8,8),h*.3,x+rnd(-8,8),h*.6,x+rnd(-6,6),h);g.stroke()}},2,3);
var barkM=new THREE.MeshStandardMaterial({map:bt,bumpMap:bt,bumpScale:1.5,roughness:1});
function pineTree(s,x,z){var g=new THREE.Group(),H=rnd(7,9);
 var tr=new THREE.Mesh(new THREE.CylinderGeometry(.1,.3,H,10),barkM);tr.position.y=H/2;g.add(tr);
 var tiers=10;for(var k=0;k<tiers;k++){var f=k/(tiers-1),r=(1.9-1.5*f)*rnd(.9,1.1),h=1.5-.5*f,cg=new THREE.ConeGeometry(r,h,9,2),p=cg.attributes.position;
  for(var i=0;i<p.count;i++){var vx=p.getX(i),vz=p.getZ(i),vy=p.getY(i),j=1+rnd(-.14,.14);p.setXYZ(i,vx*j,vy+(vy<0?rnd(-.12,.05):0),vz*j)}
  cg.computeVertexNormals();
  var m=new THREE.Mesh(cg,new THREE.MeshStandardMaterial({color:new THREE.Color().setHSL(.36+rnd(-.02,.02),.42,.09+.07*f),roughness:1,flatShading:true}));
  m.position.y=1.6+f*(H-2.4);m.rotation.y=rnd(0,6.28);g.add(m)}
 for(var i=0;i<5;i++){var st=new THREE.Mesh(new THREE.CylinderGeometry(.012,.03,rnd(.6,1.1),5),barkM);st.position.set(0,rnd(.6,1.6),0);st.rotation.set(rnd(-.5,.5),rnd(0,6.28),rnd(1.1,1.5));g.add(st)}
 g.scale.setScalar(s);g.position.set(x,terrain(x,z)-.1,z);world.add(g)}
function limbT(par,len,rad,d){var seg=new THREE.Mesh(new THREE.CylinderGeometry(rad*.65,rad,len,7),barkM);seg.position.y=len/2;var hd=new THREE.Group();hd.add(seg);par.add(hd);
 if(d>0){var n=d>2?2:(rnd(0,1)<.5?2:3);for(var i=0;i<n;i++){var ch=new THREE.Group();ch.position.y=len*rnd(.75,1);ch.rotation.set(rnd(-.7,.7),rnd(0,6.28),rnd(.3,.8));hd.add(ch);limbT(ch,len*rnd(.6,.78),rad*.62,d-1)}}}
function deadTree(s,x,z){var g=new THREE.Group();limbT(g,3.2,.28,4);g.scale.setScalar(s);g.position.set(x,terrain(x,z)-.1,z);world.add(g)}
var placed=[];
[[-9,-4,1.2],[10,-3,1.2],[-14,-12,1.3]].forEach(function(p){deadTree(p[2],p[0],p[1]);placed.push([p[0],p[1],3.6])});
var tc=0,tries=0;while(tc<14&&tries<2000){tries++;var tx=rnd(-32,32),tz=rnd(-34,-8),ts=rnd(1.3,2.2),tr2=ts*1.9,ok=Math.sqrt(tx*tx+tz*tz)>=12;for(var q=0;q<placed.length&&ok;q++){var dx=tx-placed[q][0],dz=tz-placed[q][1];if(Math.sqrt(dx*dx+dz*dz)<(tr2+placed[q][2])*.95)ok=false}if(!ok)continue;pineTree(ts,tx,tz);placed.push([tx,tz,tr2]);tc++}
/* plataforma */
[[-1.95,-.95],[1.95,-.95],[-1.95,.95],[1.95,.95],[0,-.95],[0,.95]].forEach(function(p){var m=new THREE.Mesh(new THREE.BoxGeometry(.4,.2,.4),stone);m.position.set(p[0],.1,p[1]);m.castShadow=m.receiveShadow=true;world.add(m)});
[-1.8,-.9,0,.9,1.8].forEach(function(x){box(.1,.1,2.1,x,.15,0,woodD)});
for(var i=0;i<11;i++){var m=woodH.clone();m.color.setScalar(rnd(.75,1.05));box(4.2,.1,.185,0,.25,-1+i*.2,m)}
box(4.2,.2,.06,0,.1,1.13,woodD);box(4.2,.2,.06,0,.1,-1.13,woodD);
box(1,.02,1,1.2,.305,0,woodT);box(.9,.03,.05,1.2,.32,-.52,iron);bolt(.85,.335,-.52);bolt(1.55,.335,-.52);
box(.5,.15,1,-2.35,.075,0,woodD);
/* poste, viga e reforcos */
box(.52,.2,.52,-1.6,.4,0,stone);
box(.34,4.1,.34,-1.6,2.55,0,woodV);
box(4.2,.32,.38,.33,4.4,0,woodH);
box(.4,.12,.4,-1.6,1.3,0,iron);box(.4,.12,.4,-1.6,3.4,0,iron);
[1.3,3.4].forEach(function(y){bolt(-1.72,y,.205);bolt(-1.48,y,.205)});
box(.5,.5,.03,-1.6,4.4,.205,iron);[[-.17,-.17],[.17,-.17],[-.17,.17],[.17,.17]].forEach(function(p){bolt(-1.6+p[0],4.4+p[1],.225)});
[.09,-.09].forEach(function(z){var br=box(.14,1.15,.1,-1.07,3.85,z,woodV);br.rotation.z=-.74});
bolt(-.7,4.1,.15);bolt(-1.44,3.52,.15);
/* corda */
var hook=new THREE.Mesh(new THREE.TorusGeometry(.07,.016,8,16),iron);hook.position.set(1.2,4.19,0);hook.castShadow=true;world.add(hook);
var rt=tex(64,64,function(g,w,h){g.fillStyle="#cdbb92";g.fillRect(0,0,w,h);g.strokeStyle="#6e5b3a";g.lineWidth=5;for(var i=-2;i<6;i++){g.beginPath();g.moveTo(0,i*16+8);g.lineTo(w,i*16+24);g.stroke()}},1,5);
var rope=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,.55,12),new THREE.MeshStandardMaterial({map:rt,roughness:1}));rope.position.set(1.2,3.97,0);rope.castShadow=true;world.add(rope);
var knot=new THREE.Mesh(new THREE.SphereGeometry(.075,12,10),rope.material);knot.position.y=-.27;knot.scale.y=1.3;rope.add(knot);
/* lanterna */
var lanternG=new THREE.Group();lanternG.position.set(-.65,3.7,.1);world.add(lanternG);
var bulb=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.3,12),new THREE.MeshBasicMaterial({color:0xf0b04a,transparent:true,opacity:.92}));lanternG.add(bulb);
var lamp=new THREE.PointLight(0xf0b04a,1.8,16);lamp.castShadow=true;lamp.shadow.mapSize.set(1024,1024);lamp.shadow.bias=-.002;lanternG.add(lamp);
for(var i=0;i<6;i++){var an=i/6*6.28,bar=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.32,5),iron);bar.position.set(Math.cos(an)*.115,0,Math.sin(an)*.115);lanternG.add(bar)}
var lb=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.04,6),iron);lb.position.y=-.17;lanternG.add(lb);
var lc=new THREE.Mesh(new THREE.ConeGeometry(.16,.14,6),iron);lc.position.y=.2;lanternG.add(lc);
var lr=new THREE.Mesh(new THREE.TorusGeometry(.04,.01,6,12),iron);lr.position.y=.29;lanternG.add(lr);
var ch=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.2,5),iron);ch.position.y=.44;lanternG.add(ch);
/* lua */
var moon=new THREE.Mesh(new THREE.SphereGeometry(1.2,32,32),new THREE.MeshBasicMaterial({color:0xeef3ff,fog:false}));moon.position.set(-5,6.5,-22);scene.add(moon);
var hc=document.createElement("canvas");hc.width=hc.height=128;var hg=hc.getContext("2d"),gr=hg.createRadialGradient(64,64,10,64,64,64);gr.addColorStop(0,"rgba(190,210,255,.55)");gr.addColorStop(1,"rgba(190,210,255,0)");hg.fillStyle=gr;hg.fillRect(0,0,128,128);
var halo=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(hc),transparent:true,depthWrite:false,fog:false}));halo.scale.set(9,9,1);halo.position.copy(moon.position);scene.add(halo);
var pivot=new THREE.Group();pivot.position.set(1.2,3.7,0);world.add(pivot);
const RB = (() => {
  const { Vector3, Mesh, Group, MathUtils } = THREE;
  const Z_AXIS = new Vector3(0, 0, 1);
  const M0 = o => new THREE.MeshStandardMaterial(o);
  const whiteP = M0({ color: 0xf5f7fa, emissive: 0x2a2d33, roughness: .15, metalness: .06 });
  const blackP = M0({ color: 0x0b0c0e, roughness: .16, metalness: .08 });
  const blackG = M0({ color: 0x050507, roughness: .12, metalness: .08 });
  const glowM = M0({ color: 0xe8f2ff, emissive: 0x8fc4ff, emissiveIntensity: 1.8, roughness: .4 });
  const ringM = glowM.clone(); ringM.emissiveIntensity = 3.2;
  const xM = glowM.clone(); xM.emissive.setHex(0xff4b3e); xM.color.setHex(0xffd7d2);

  function squircle(u, v, p = 4) {
    const au = Math.abs(u), av = Math.abs(v), m = Math.max(au, av);
    if (m === 0) return [0, 0];
    const k = m / Math.pow(Math.pow(au, p) + Math.pow(av, p), 1 / p);
    return [u * k, v * k];
  }
  function makePatch(dirFn, { nu = 40, nv = 40, r0 = .985, r1 = 1.012, p = 4, material }) {
    const cols = nu + 1, dirs = [];
    for (let i = 0; i <= nv; i++) for (let j = 0; j <= nu; j++) {
      const [su, sv] = squircle((j / nu) * 2 - 1, (i / nv) * 2 - 1, p);
      dirs.push(dirFn(su, sv).normalize());
    }
    const top = dirs.map(d => d.clone().multiplyScalar(r1));
    const mean = top.reduce((a, v) => a.add(v), new Vector3()).divideScalar(top.length);
    const orient = (tris, Pp, refFn) => {
      for (let t = 0; t < tris.length; t += 3) {
        const a = Pp[tris[t]], b = Pp[tris[t + 1]], c = Pp[tris[t + 2]];
        const n = new Vector3().subVectors(b, a).cross(new Vector3().subVectors(c, a));
        const ctr = new Vector3().add(a).add(b).add(c).divideScalar(3);
        if (n.dot(refFn(ctr)) < 0) { const tmp = tris[t + 1]; tris[t + 1] = tris[t + 2]; tris[t + 2] = tmp; }
      }
    };
    const topIdx = [];
    for (let i = 0; i < nv; i++) for (let j = 0; j < nu; j++) {
      const a = i * cols + j, b = a + 1, c = a + cols, d = c + 1;
      topIdx.push(a, c, b, b, c, d);
    }
    orient(topIdx, top, c => c);
    const topGeo = new THREE.BufferGeometry();
    topGeo.setAttribute('position', new THREE.Float32BufferAttribute(top.flatMap(v => [v.x, v.y, v.z]), 3));
    topGeo.setAttribute('normal', new THREE.Float32BufferAttribute(dirs.flatMap(v => [v.x, v.y, v.z]), 3));
    topGeo.setIndex(topIdx);
    const loop = [];
    for (let j = 0; j < nu; j++) loop.push(j);
    for (let i = 0; i < nv; i++) loop.push(i * cols + nu);
    for (let j = nu; j > 0; j--) loop.push(nv * cols + j);
    for (let i = nv; i > 0; i--) loop.push(i * cols);
    const wallP = [];
    for (const id of loop) { wallP.push(top[id].clone()); wallP.push(dirs[id].clone().multiplyScalar(r0)); }
    const wallIdx = [], L = loop.length;
    for (let m = 0; m < L; m++) {
      const m2 = (m + 1) % L, A = 2 * m, B = 2 * m + 1, C = 2 * m2, D = 2 * m2 + 1;
      wallIdx.push(A, B, C, C, B, D);
    }
    orient(wallIdx, wallP, c => c.clone().sub(mean));
    const wallGeo = new THREE.BufferGeometry();
    wallGeo.setAttribute('position', new THREE.Float32BufferAttribute(wallP.flatMap(v => [v.x, v.y, v.z]), 3));
    wallGeo.setIndex(wallIdx);
    wallGeo.computeVertexNormals();
    const g = new Group();
    g.add(new Mesh(topGeo, material), new Mesh(wallGeo, material));
    return g;
  }
  function placeOnEllipsoid(obj, dir, radii, s = 1, embed = 0) {
    const p = new Vector3(dir.x * radii.x, dir.y * radii.y, dir.z * radii.z).multiplyScalar(s);
    const n = new Vector3(dir.x / radii.x, dir.y / radii.y, dir.z / radii.z).normalize();
    obj.position.copy(p).addScaledVector(n, -embed);
    obj.quaternion.setFromUnitVectors(Z_AXIS, n);
  }
  function makeEyeGeometry() {
    const R = .21, t = .08, a0 = MathUtils.degToRad(20), a1 = MathUtils.degToRad(160), Ro = R + t / 2, Ri = R - t / 2;
    const s = new THREE.Shape();
    s.moveTo(Ro * Math.cos(a0), Ro * Math.sin(a0));
    s.absarc(0, 0, Ro, a0, a1, false);
    s.absarc(R * Math.cos(a1), R * Math.sin(a1), t / 2, a1, a1 + Math.PI, false);
    s.absarc(0, 0, Ri, a1, a0, true);
    s.absarc(R * Math.cos(a0), R * Math.sin(a0), t / 2, a0 + Math.PI, a0 + 2 * Math.PI, false);
    const geo = new THREE.ExtrudeGeometry(s, { depth: .05, bevelEnabled: true, bevelThickness: .01, bevelSize: .01, bevelSegments: 3, curveSegments: 32 });
    geo.computeBoundingBox();
    const c = geo.boundingBox.getCenter(new Vector3());
    geo.translate(-c.x, -c.y, 0);
    return geo;
  }

  const DISC_H = .16, RING_H = .19, IMG_S = .78;
  const discGeo = new THREE.CylinderGeometry(.5, .5, DISC_H, 48).rotateX(Math.PI / 2).translate(0, 0, DISC_H / 2);
  const ringGeo = (() => {
    const ring = new THREE.Shape(); ring.absarc(0, 0, .5, 0, Math.PI * 2, false);
    const hole = new THREE.Path(); hole.absarc(0, 0, .44, 0, Math.PI * 2, true); ring.holes.push(hole);
    return new THREE.ExtrudeGeometry(ring, { depth: RING_H, bevelEnabled: true, bevelThickness: .01, bevelSize: .008, bevelSegments: 2, curveSegments: 48 });
  })();
  function makeLogo(relief = 1) { const g = new Group(), base = new Group(); base.scale.z = relief; g.add(base); base.add(new Mesh(discGeo, blackP), new Mesh(ringGeo, ringM)); return g; }
  const sphereMesh = (r, mat, w = 32, h = 24) => new Mesh(new THREE.SphereGeometry(r, w, h), mat);

  // ---------- hierarquia de animação ----------
  const flipG = new Group(); pivot.add(flipG);                // giro (cambalhota)
  const ROBOT_SCALE = .6; // tamanho do robô (era .3)
  const rig = new Group(); rig.scale.setScalar(ROBOT_SCALE); rig.position.y = -3.45 * ROBOT_SCALE; flipG.add(rig);
  const upper = new Group(); upper.position.y = 1.0; rig.add(upper);   // tronco+cabeça+braços (pivô no quadril)
  const inner = new Group(); inner.position.y = -1.0; upper.add(inner);

  // Cabeça
  const HEAD_R = new Vector3(1.06, .95, 1.0);
  const head = new Group(); head.position.set(0, 2.5, 0); inner.add(head);
  const headShell = new Group(); headShell.scale.copy(HEAD_R); head.add(headShell);
  headShell.add(new Mesh(new THREE.SphereGeometry(1, 64, 48), whiteP));
  headShell.add(makePatch((u, v) => { const x = .78 * u, y = -.19 + .52 * v; return new Vector3(x, y, Math.sqrt(Math.max(0, 1 - x * x - y * y))); }, { r0: .985, r1: 1.010, p: 4, material: blackG }));
  headShell.add(makePatch((u, v) => { const x = .30 * u, rem = Math.sqrt(1 - x * x), a = .10 + 1.20 * v; return new Vector3(x, rem * Math.cos(a), rem * Math.sin(a)); }, { r0: .985, r1: 1.018, p: 6, material: blackP }));
  const eyeGeo = makeEyeGeometry(), eyes = [];
  for (const s of [-1, 1]) {
    const xu = s * .46, yu = -.17, dir = new Vector3(xu, yu, Math.sqrt(1 - xu * xu - yu * yu));
    const eye = new Group(), hp = new Mesh(eyeGeo, glowM); eye.add(hp);
    placeOnEllipsoid(eye, dir, HEAD_R, 1.010, .03);
    head.add(eye); eyes.push(eye);
    const sc = new Group(); eye.add(sc);
    const dsc = new Mesh(new THREE.CircleGeometry(.17, 32), glowM); dsc.position.z = .045; sc.add(dsc);
    const pup = new Mesh(new THREE.CircleGeometry(.06, 24), blackP); pup.position.set(-s * .02, -.015, .052); sc.add(pup);
    const brow = new Mesh(new THREE.BoxGeometry(.2, .04, .03), glowM); brow.position.set(0, .27, .04); brow.rotation.z = -s * .4; sc.add(brow);
    const xx = new Group(); eye.add(xx);
    for (const r of [Math.PI / 4, -Math.PI / 4]) { const bar = new Mesh(new THREE.BoxGeometry(.3, .065, .04), xM); bar.position.z = .035; bar.rotation.z = r; xx.add(bar); }
    eye.userData = { hp, sc, xx };
  }
  const mouthO = new Mesh(new THREE.TorusGeometry(.065, .022, 10, 24), glowM);
  const mouthS = new Mesh(new THREE.TorusGeometry(.13, .02, 10, 24, Math.PI).rotateZ(Math.PI).translate(0, .06, 0), glowM);
  const mouthF = new Mesh(new THREE.BoxGeometry(.2, .035, .03), xM);
  const mdir = new Vector3(0, -.5, Math.sqrt(.75));
  [mouthO, mouthS, mouthF].forEach(m => { placeOnEllipsoid(m, mdir, HEAD_R, 1.010, .03); head.add(m); });
  const drop = new Mesh(new THREE.SphereGeometry(.075, 14, 12), new THREE.MeshStandardMaterial({ color: 0xbfe6ff, emissive: 0x4fa8e8, emissiveIntensity: 1.2, roughness: .2 }));
  drop.scale.set(.8, 1.4, .8); placeOnEllipsoid(drop, new Vector3(.82, .42, Math.sqrt(1 - .6724 - .1764)), HEAD_R, 1.04, 0); head.add(drop);
  function setFace(st) {
    eyes.forEach(e => { e.userData.hp.visible = st === 'happy'; e.userData.sc.visible = st === 'scared'; e.userData.xx.visible = st === 'dead'; });
    mouthO.visible = st === 'scared'; mouthS.visible = st === 'happy'; mouthF.visible = st === 'dead'; drop.visible = st === 'scared';
  }
  setFace('scared');
  { const logo = makeLogo(.4); logo.scale.setScalar(.55); placeOnEllipsoid(logo, new Vector3(0, Math.cos(.75), Math.sin(.75)), HEAD_R, 1.018, 0); head.add(logo); }
  const earShape = new THREE.Shape(); earShape.absarc(0, 0, .56, 0, Math.PI * 2, false);
  const earGeo = new THREE.ExtrudeGeometry(earShape, { depth: .16, bevelEnabled: true, bevelThickness: .10, bevelSize: .10, bevelSegments: 8, curveSegments: 48 });
  const earDiscGeo = new THREE.CylinderGeometry(.5, .5, .03, 48).rotateX(Math.PI / 2);
  const earRingGeo = new THREE.TorusGeometry(.42, .034, 16, 64);
  for (const s of [-1, 1]) {
    const ear = new Group(); ear.position.set(s * 1.0, 0, 0); ear.rotation.y = s * Math.PI / 2; ear.scale.setScalar(.75);
    ear.add(new Mesh(earGeo, whiteP));
    const disc = new Mesh(earDiscGeo, blackP); disc.position.z = .27; ear.add(disc);
    const ring = new Mesh(earRingGeo, glowM); ring.position.z = .285; ear.add(ring);
    head.add(ear);
  }

  // Tronco
  const TORSO_R = new Vector3(.47, .52, .40);
  const torso = new Group(); torso.position.set(0, 1.25, 0); inner.add(torso);
  const torsoShell = new Group(); torsoShell.scale.copy(TORSO_R); torso.add(torsoShell);
  torsoShell.add(new Mesh(new THREE.SphereGeometry(1, 48, 32), whiteP));
  torsoShell.add(makePatch((u, v) => { const x = (.46 + .08 * v) * u, rem = Math.sqrt(1 - x * x), b = -.10 + 1.0 * v; return new Vector3(x, rem * Math.sin(b), rem * Math.cos(b)); }, { r0: .985, r1: 1.03, p: 5, material: blackP }));
  { const logo = makeLogo(1); logo.scale.setScalar(.40); placeOnEllipsoid(logo, new Vector3(0, Math.sin(.10), Math.cos(.10)), TORSO_R, 1.03, .02); torso.add(logo); }
  const neck = new Mesh(new THREE.CylinderGeometry(.30, .36, .30, 32), blackP); neck.position.y = .33; torso.add(neck);

  // Braços (pivô no ombro)
  const armGeo = (() => {
    const pts = [new THREE.Vector2(0, 0), new THREE.Vector2(.24, 0), new THREE.Vector2(.24, .34)];
    for (let k = 1; k <= 12; k++) { const a = (k / 12) * Math.PI / 2; pts.push(new THREE.Vector2(.24 * Math.cos(a), .34 + .24 * Math.sin(a))); }
    return new THREE.LatheGeometry(pts, 40);
  })();
  const handGeo = (() => {
    const R = .16, yTop = .05, a0 = Math.asin(yTop / R), pts = [new THREE.Vector2(0, yTop)];
    for (let k = 0; k <= 14; k++) { const a = a0 - (k / 14) * (a0 + Math.PI / 2); pts.push(new THREE.Vector2(R * Math.cos(a), R * Math.sin(a))); }
    return new THREE.LatheGeometry(pts, 32);
  })();
  const arms = {}, armW = {};
  for (const s of [-1, 1]) {
    const sp = new Vector3(s * .62, 1.42, 0), aw = new Group(); aw.position.copy(sp); inner.add(aw); armW[s] = aw;
    const shoulder = sphereMesh(.22, blackP); aw.add(shoulder);
    const link = new Mesh(new THREE.CylinderGeometry(.22, .22, .20, 32).rotateZ(Math.PI / 2), blackP);
    link.position.set(-s * .10, .05, 0); link.scale.y = .8; aw.add(link);
    const arm = new Group(); arm.position.x = s * .03; arm.rotation.z = s * .30; aw.add(arm);
    const up = new Mesh(armGeo, whiteP); up.position.y = -.60; arm.add(up);
    const hand = new Mesh(handGeo, blackP); hand.position.y = -.645; arm.add(hand);
    const strip = new Mesh(new THREE.TorusGeometry(.243, .012, 8, 32, Math.PI * .9).rotateZ(-Math.PI * .45).rotateX(Math.PI / 2), glowM);
    strip.position.y = -.22; strip.rotation.y = s > 0 ? 0 : Math.PI; arm.add(strip);
    arms[s] = arm;
  }

  // Pernas (pivô no quadril)
  const footGeo = (() => {
    const pts = [new THREE.Vector2(0, 0)], rb = .08, cx = .31 - rb, cy = rb;
    for (let k = 0; k <= 10; k++) { const a = -Math.PI / 2 + (k / 10) * (Math.PI / 2); pts.push(new THREE.Vector2(cx + rb * Math.cos(a), cy + rb * Math.sin(a))); }
    pts.push(new THREE.Vector2(.277, .200), new THREE.Vector2(.250, .300), new THREE.Vector2(0, .300));
    return new THREE.LatheGeometry(pts, 40);
  })();
  const legGeo = (() => {
    const pts = [new THREE.Vector2(0, 0), new THREE.Vector2(.25, 0), new THREE.Vector2(.25, .15), new THREE.Vector2(.205, .55)];
    for (let k = 1; k <= 12; k++) { const a = (k / 12) * Math.PI / 2; pts.push(new THREE.Vector2(.205 * Math.cos(a), .55 + .205 * Math.sin(a))); }
    return new THREE.LatheGeometry(pts, 40);
  })();
  const hipGeo = (() => {
    const pts = [new THREE.Vector2(0, 0), new THREE.Vector2(.15, 0)];
    for (let k = 1; k <= 6; k++) { const a = -Math.PI / 2 + (k / 6) * (Math.PI / 2); pts.push(new THREE.Vector2(.15 + .055 * Math.cos(a), .055 + .055 * Math.sin(a))); }
    pts.push(new THREE.Vector2(.205, .095));
    for (let k = 1; k <= 12; k++) { const a = (k / 12) * (Math.PI / 2); pts.push(new THREE.Vector2(.205 * Math.cos(a), .095 + .205 * Math.sin(a))); }
    return new THREE.LatheGeometry(pts, 40);
  })();
  const HY = .85, legs = {};
  for (const s of [-1, 1]) {
    const lp = new Group(); lp.position.set(s * .36, HY, 0); rig.add(lp);
    const hip = new Mesh(hipGeo, blackP); hip.position.y = .70 - HY; lp.add(hip);
    const leg = new Mesh(legGeo, whiteP); leg.position.y = .15 - HY; lp.add(leg);
    const strip = new Mesh(new THREE.TorusGeometry(.237, .014, 8, 32, Math.PI * .8).rotateZ(Math.PI * .1).rotateX(Math.PI / 2), glowM);
    strip.position.y = .42 - HY; lp.add(strip);
    const foot = new Mesh(footGeo, blackP); foot.position.y = -HY; lp.add(foot);
    legs[s] = lp;
  }

  rig.traverse(o => { if (o.isMesh) { o.castShadow = !o.userData.logo; o.receiveShadow = true; } });
  return { flipG, rig, upper, head, eyes, armL: arms[-1], armR: arms[1], legL: legs[-1], legR: legs[1], body: whiteP, glow: glowM, ring: ringM, setFace, parts: [head, torso, armW[-1], armW[1], legs[-1], legs[1]] };
})();
var RB_=RB;






var parts=RB_.parts;parts.forEach(function(p){p.visible=false;p.scale.setScalar(.001)});
var stars=new THREE.BufferGeometry(),sp=[];for(var i=0;i<260;i++){var a=Math.random()*6.28,r=14+Math.random()*10;sp.push(Math.cos(a)*r,3+Math.random()*14,-Math.abs(Math.sin(a))*r-2)}
stars.setAttribute("position",new THREE.Float32BufferAttribute(sp,3));
scene.add(new THREE.Points(stars,new THREE.PointsMaterial({color:0xffffff,size:.07})));
var yaw=0,targetYaw=0,drag=null;
canvas.addEventListener("pointerdown",function(e){drag={x:e.clientX,y:targetYaw};canvas.setPointerCapture(e.pointerId);$("hint").style.display="none"});
canvas.addEventListener("pointermove",function(e){if(drag)targetYaw=Math.max(-.9,Math.min(.9,drag.y+(e.clientX-drag.x)*.006))});
canvas.addEventListener("pointerup",function(){drag=null});
function resize(){var w=innerWidth,h=innerHeight,a=w/h;renderer.setSize(w,h,false);camera.aspect=a;
 if(a<.8){camera.position.set(0,3.2,12.5);look.set(0,1.3,0)}else{camera.position.set(0,2.8,8.2);look.set(0,1.8,0)}
 camera.updateProjectionMatrix();camera.lookAt(look)}
addEventListener("resize",resize);resize();
var t0=performance.now(),fall=0,winAt=null;
function tick(now){
 var t=(now-t0)/1000;
 yaw+=(targetYaw-yaw)*.08;world.rotation.y=yaw;pivot.rotation.y=0;
 var amp=over&&errors>=MAX?.2:.02+errors*.025;
 if(winAt==null){pivot.rotation.z=Math.sin(t*1.6)*amp;rope.rotation.z=pivot.rotation.z*.3}
 else{var el=(now-winAt)/1000;
  pivot.rotation.z=0;pivot.position.set(.2,2.37,0);rope.rotation.z=0;
  RB.armL.rotation.x=RB.armR.rotation.x=-2.7+Math.sin(el*10)*.2;RB.armL.rotation.z=-.65;RB.armR.rotation.z=.65;pivot.position.y+=Math.abs(Math.sin(el*6))*.14}
 parts.forEach(function(p){if(p.visible&&p.scale.x<1){var s=Math.min(1,p.scale.x+.07+(1-p.scale.x)*.18);p.scale.setScalar(s)}});
 lamp.intensity=1.8+Math.sin(t*9)*.07+Math.sin(t*23)*.04;lanternG.rotation.z=Math.sin(t*1.3)*.03;RB.head.rotation.z=(!over&&errors>0)?Math.sin(t*38)*(.012+errors*.006):0;
 renderer.render(scene,camera);requestAnimationFrame(tick)}
requestAnimationFrame(tick);
function setLamp(c){lamp.color.setHex(c);bulb.material.color.setHex(c)}

/* ---------- som ---------- */
var AC=null,master=null,nbuf=null,fx=null,muted=false;
function ac(){if(!AC){var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;try{AC=new C()}catch(e){return null}
 master=AC.createGain();master.gain.value=muted?0:.8;master.connect(AC.destination);
 nbuf=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);var d=nbuf.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 fx=AC.createDelay(1);fx.delayTime.value=.34;var fb=AC.createGain();fb.gain.value=.38;var lp=AC.createBiquadFilter();lp.type="lowpass";lp.frequency.value=1800;fx.connect(lp);lp.connect(fb);fb.connect(fx);lp.connect(master);
 startAmbient()}
 if(AC.state==="suspended")AC.resume();return AC}
function tone(f,dur,type,vol,when,slide,dest){if(!AC)return;var t=AC.currentTime+(when||0),o=AC.createOscillator(),g=AC.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t);if(slide)o.frequency.exponentialRampToValueAtTime(slide,t+dur);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(dest||master);if(dest===fx)g.connect(master);o.start(t);o.stop(t+dur+.05)}
function noise(dur,type,f,vol,when,q,slide){if(!AC)return;var t=AC.currentTime+(when||0),s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=nbuf;s.loop=true;fl.type=type;fl.frequency.setValueAtTime(f,t);if(slide)fl.frequency.exponentialRampToValueAtTime(slide,t+dur);fl.Q.value=q||1;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(fl);fl.connect(g);g.connect(master);s.start(t,Math.random());s.stop(t+dur+.05)}
function sfxClick(){if(!ac())return;tone(1200,.05,"triangle",.12);tone(800,.07,"sine",.1,.015);noise(.03,"highpass",3000,.05)}
function sfxOk(n){if(!ac())return;var base=[523.25,659.25,783.99,880];for(var i=0;i<Math.min(n,4);i++){var f=base[i],w=i*.09;tone(f,.7,"sine",.16,w,null,fx);tone(f*2,.5,"sine",.06,w);tone(f*3.01,.25,"sine",.03,w)}noise(.05,"highpass",5000,.04)}
function sfxBad(i){if(!ac())return;tone(150,.35,"sine",.4,0,45);noise(.25,"lowpass",500,.25);tone(98,.5,"sawtooth",.05,.05,70);noise(.7,"bandpass",300,.05,.1,8,900);noise(.4,"bandpass",700,.05,.02,6,250);tone(900,.12,"square",.04,.12,500);tone(1400,.08,"square",.03,.2,1000);if(i>=4){tone(60,.2,"sine",.35,.5);tone(60,.2,"sine",.2,.68);tone(60,.2,"sine",.35,1.3);tone(60,.2,"sine",.2,1.48)}}
function sfxWin(){if(!ac())return;[523.25,659.25,783.99,1046.5,1318.5].forEach(function(f,i){tone(f,.5,"triangle",.18,.35+i*.11,null,fx);tone(f*2,.4,"sine",.05,.35+i*.11)});tone(1568,1.2,"sine",.1,.95,null,fx);for(var i=0;i<9;i++)tone(500+Math.random()*900,.07,"square",.05,.4+i*.09,300+Math.random()*1200);noise(.6,"highpass",4000,.06,.9)}
function sfxLose(){if(!ac())return;[392,370,349,330].forEach(function(f,i){tone(f,.55,"sawtooth",.07,i*.42,f*.96)});tone(70,1.6,"sine",.35,.1,35);noise(1.8,"lowpass",260,.3,.1,1,80);noise(1.2,"bandpass",500,.08,.2,4,200)}
function startAmbient(){
 var w=AC.createBufferSource(),wf=AC.createBiquadFilter(),wg=AC.createGain(),lfo=AC.createOscillator(),lg=AC.createGain();
 w.buffer=nbuf;w.loop=true;wf.type="bandpass";wf.frequency.value=420;wf.Q.value=.6;wg.gain.value=.05;lfo.frequency.value=.12;lg.gain.value=.03;lfo.connect(lg);lg.connect(wg.gain);w.connect(wf);wf.connect(wg);wg.connect(master);w.start();lfo.start();
 var cr=AC.createOscillator(),cg=AC.createGain(),am=AC.createOscillator(),ag=AC.createGain();cr.frequency.value=4300;cg.gain.value=.008;am.frequency.value=28;ag.gain.value=.008;am.connect(ag);ag.connect(cg.gain);cr.connect(cg);cg.connect(master);cr.start();am.start();
 [110,164.81].forEach(function(f,i){var o=AC.createOscillator(),g=AC.createGain(),lp=AC.createBiquadFilter();o.type="sawtooth";o.frequency.value=f*(i?1.003:1);lp.type="lowpass";lp.frequency.value=380;g.gain.value=.03;o.connect(lp);lp.connect(g);g.connect(master);o.start()});
 var sc=[220,261.63,293.66,329.63,392,440,523.25];
 (function pluck(){if(AC&&!document.hidden){var f=sc[Math.floor(Math.random()*sc.length)];tone(f,1.6,"triangle",.07,0,null,fx);tone(f,.9,"sine",.05)}setTimeout(pluck,1800+Math.random()*3200)})();
 (function amb(){if(AC&&!document.hidden){if(Math.random()<.5){tone(430,.35,"sine",.09,0,400,fx);tone(350,.7,"sine",.09,.5,320,fx)}else noise(1.2,"bandpass",260,.04,0,10,180)}setTimeout(amb,9000+Math.random()*14000)})()}
function updMute(){var t=muted?"Som: desligado":"Som: ligado";Array.prototype.forEach.call(document.querySelectorAll(".mutebtn"),function(b){b.textContent=t})}
function toggleMute(){muted=!muted;if(master)master.gain.value=muted?0:.8;updMute();if(!muted){ac();sfxClick()}}
document.addEventListener("visibilitychange",function(){if(AC){if(document.hidden)AC.suspend();else if(!muted)AC.resume()}});

/* ---------- jogo ---------- */
var keysEl=$("keys");
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function(L){var b=document.createElement("button");b.className="k";b.textContent=L;b.dataset.l=L.toLowerCase();b.onclick=function(){guess(b.dataset.l)};keysEl.appendChild(b)});
var sel="";
function pick(){if(!pool.length){for(var c in WORDS)if(!sel||c===sel)WORDS[c].forEach(function(w){pool.push({c:c,w:w})});
 for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=pool[i];pool[i]=pool[j];pool[j]=x}}
 return pool.pop()}
function renderWord(reveal){var el=$("word");el.innerHTML="";
 for(var i=0;i<cur.w.length;i++){var s=document.createElement("div"),n=norm[i];s.className="ch";
  if(guessed[n]){s.textContent=cur.w[i]}else if(reveal){s.textContent=cur.w[i];s.className+=" lost"}
  el.appendChild(s)}}
function renderLives(){var s="";for(var i=0;i<MAX;i++)s+=i<MAX-errors?"♥":"♡";$("lives").textContent=s}
function newGame(){cur=pick();norm=strip(cur.w);guessed={};errors=0;over=false;
 $("cat").textContent="Dica: "+cur.c+" · "+cur.w.length+" letras";$("msg").textContent="";$("again").style.display="none";
 parts.forEach(function(p){p.visible=false;p.scale.setScalar(.001)});winAt=null;pivot.position.set(1.2,3.7,0);pivot.rotation.z=0;RB.armL.rotation.set(0,0,-.3);RB.armR.rotation.set(0,0,.3);RB.setFace("scared");setLamp(0xf0b04a);
 Array.prototype.forEach.call(keysEl.children,function(b){b.disabled=false;b.className="k"});
 renderWord(false);renderLives()}
function end(win){over=true;
 Array.prototype.forEach.call(keysEl.children,function(b){b.disabled=true});
 if(win){wins++;$("w").textContent=wins;$("msg").textContent="Você salvou o boneco!";setLamp(0x6fae6a);parts.forEach(function(p){p.visible=true});winAt=performance.now();RB.setFace("happy");sfxWin()}
 else{losses++;$("l").textContent=losses;$("msg").textContent="Fim de jogo. A palavra era “"+cur.w+"”.";setLamp(0xc9503c);renderWord(true);RB.setFace("dead");sfxLose()}
 $("again").style.display="block";$("again").focus()}
function guess(l){if(over||guessed[l])return;
 var b=keysEl.querySelector('[data-l="'+l+'"]');if(!b)return;guessed[l]=true;b.disabled=true;ac();
 if(norm.indexOf(l)>-1){b.className="k ok";renderWord(false);var cnt=0;for(var q=0;q<norm.length;q++)if(norm[q]===l)cnt++;sfxOk(cnt);
  var done=true;for(var i=0;i<norm.length;i++)if(!guessed[norm[i]])done=false;if(done)end(true)}
 else{b.className="k no";parts[errors].visible=true;sfxBad(errors);errors++;renderLives();$("msg").textContent="Essa letra não existe.";if(errors>=MAX)end(false)}}
$("again").onclick=function(){sfxClick();newGame()};
addEventListener("keydown",function(e){if(inMenu||e.ctrlKey||e.metaKey||e.altKey)return;
 if(e.key==="Enter"&&over){newGame();return}
 var k=strip(e.key.toLowerCase());if(/^[a-z]$/.test(k))guess(k)});
var inMenu=true,menu=$("menu"),cats=$("cats");
function scr(n){$("s1").style.display=n===1?"flex":"none";$("s2").style.display=n===2?"flex":"none"}
function openMenu(n){inMenu=true;menu.style.display="flex";$("top").style.display="none";$("panel").style.display="none";scr(n);(n===1?$("play"):cats.firstChild).focus()}
function startWith(c){sfxClick();sel=c;pool=[];inMenu=false;menu.style.display="none";$("top").style.display="";$("panel").style.display="";newGame()}
function addCat(label,c,n){var b=document.createElement("button");b.className="cat";b.innerHTML=label+"<small>"+n+" palavras</small>";b.onclick=function(){startWith(c)};cats.appendChild(b)}
var total=0;for(var k in WORDS)total+=WORDS[k].length;
addCat("Todos os temas","",total);
for(var k2 in WORDS)addCat(k2,k2,WORDS[k2].length);
$("play").onclick=function(){ac();sfxClick();scr(2);cats.firstChild.focus()};
$("menuback").onclick=function(){sfxClick();scr(1);$("play").focus()};
$("back").onclick=function(){sfxClick();openMenu(2)};Array.prototype.forEach.call(document.querySelectorAll(".mutebtn"),function(b){b.onclick=toggleMute});
newGame();openMenu(1);
})();

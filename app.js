(() => {
'use strict';

/* ======================================================================
   Config — override via URL: ?sky=dusk  ?scanlines=0
   ====================================================================== */
const params = new URLSearchParams(location.search);
const CONFIG = {
  sky: /^dusk$/i.test(params.get('sky') || '') ? 'Dusk' : 'Night',
  scanlines: params.get('scanlines') !== '0',
};

/* ======================================================================
   Data
   ====================================================================== */
const TRAITS = ['str','brn','crg','ldr','hum','tec','mys','stl','hrt'];
const TLABEL = {str:'STRENGTH',brn:'BRAINS',crg:'COURAGE',ldr:'LEADERSHIP',hum:'HUMOR',tec:'TECH',mys:'MAGIC',stl:'STEALTH',hrt:'HEART'};
const SK = '#f0c29b', DK = '#1a1530';
//            str brn crg ldr hum tec mys stl hrt
const HEROES = [
 {id:'ironman',name:'IRON MAN',title:'The Genius Show-off',p:[5,10,7,6,9,10,0,1,4],blurb:"You solve problems by building a bigger, shinier problem-solver. Brilliant, sarcastic, and one coffee away from inventing something nobody asked for.",
  c:{hair:'#c8202e',face:'#f2c14e',eye:'#bdf6ff',mouth:'#d9a83a',p:'#c8202e',q:'#f2c14e',a:'#7ff3ff',g:'#c8202e',l:'#c8202e',b:'#f2c14e'}},
 {id:'cap',name:'CAPTAIN AMERICA',title:'The Moral Compass',p:[7,6,10,10,3,2,0,3,9],blurb:"You're the friend who returns shopping carts. Steady, loyal, and somehow everyone follows you — even into the plans you warned them about.",
  c:{hair:'#2a4fb0',face:SK,eye:DK,p:'#2a4fb0',q:'#2a4fb0',a:'#f3f3f3',g:'#c8202e',l:'#2a4fb0',b:'#c8202e'},item:'shield'},
 {id:'thor',name:'THOR',title:'The Thunderous Hype-Man',p:[10,4,9,6,7,0,8,0,6],blurb:"Big energy, bigger heart. You enter every room like it's a feast hall, and you've definitely bench-pressed something you shouldn't have.",
  c:{hair:'#f1d16a',face:SK,eye:'#3a7bd5',p:'#3b3f52',q:'#c7ccd8',a:'#c7ccd8',g:'#3b3f52',l:'#2a2c3a',b:'#2a2c3a',cape:'#b3202c'},item:'hammer'},
 {id:'hulk',name:'HULK',title:'The Gentle Giant (Mostly)',p:[10,8,6,1,5,5,0,0,7],blurb:"Calm, brainy, polite… until someone touches your snacks. You have two modes: PhD and SMASH. Both get results.",
  c:{hair:'#1d1a24',face:'#5fae47',eye:DK,mouth:'#3d7a2e',p:'#5fae47',q:'#5fae47',a:'#4b9338',g:'#5fae47',l:'#6b3fa0',b:'#5fae47'}},
 {id:'widow',name:'BLACK WIDOW',title:'The Quiet Professional',p:[5,8,8,6,4,4,0,10,6],blurb:"You read the room before you entered it. Unflappable, lethal with a plan, and your group chat has no idea how much you know.",
  c:{hair:'#c8402a',face:SK,eye:DK,p:'#2a2a38',q:'#2a2a38',a:'#e8434b',g:'#2a2a38',l:'#2a2a38',b:'#2a2a38'}},
 {id:'hawkeye',name:'HAWKEYE',title:'The Underrated Legend',p:[4,5,7,4,8,2,0,9,7],blurb:"No powers, no problem. Dry wit, perfect aim, and a suspiciously normal life you protect fiercely. You never miss — especially a comeback.",
  c:{hair:'#8a5a32',face:SK,eye:DK,p:'#5b2f8a',q:'#2a2a38',a:'#3e1f63',g:'#2a2a38',l:'#2a2a38',b:'#2a2a38'},item:'bow'},
 {id:'spidey',name:'SPIDER-MAN',title:'The Friendly Neighbor',p:[7,8,8,3,10,7,0,4,10],blurb:"Quippy, kind, and slightly late to everything. You'd help someone cross the street, then accidentally web the street.",
  c:{hair:'#d1232f',face:'#d1232f',eye:'#ffffff',mouth:'#d1232f',p:'#d1232f',q:'#2350b8',a:'#111018',g:'#d1232f',l:'#2350b8',b:'#d1232f'}},
 {id:'panther',name:'BLACK PANTHER',title:'The Visionary Royal',p:[7,8,8,10,3,8,3,7,7],blurb:"Regal, strategic and always three steps ahead. You lead with grace, build with genius, and look effortlessly cool doing it.",
  c:{hair:'#2c2a3c',face:'#2c2a3c',eye:'#e6e6f0',mouth:'#2c2a3c',p:'#2c2a3c',q:'#2c2a3c',a:'#9a7bff',g:'#2c2a3c',l:'#2c2a3c',b:'#2c2a3c'}},
 {id:'marvel',name:'CAPTAIN MARVEL',title:'The Cosmic Powerhouse',p:[10,5,10,7,6,2,3,0,5],blurb:"You don't do 'tone it down.' Fearless, fast and blindingly bright — you'd rather punch through a problem than walk around it.",
  c:{hair:'#f1d16a',face:SK,eye:DK,p:'#2350b8',q:'#c8202e',a:'#f2c14e',g:'#f2c14e',l:'#2350b8',b:'#c8202e'}},
 {id:'strange',name:'DOCTOR STRANGE',title:'The Know-It-All Wizard',p:[3,10,6,6,6,0,10,2,3],blurb:"You've already seen how this ends. Brilliant, a little smug, and great at bending the rules — and occasionally reality.",
  c:{hair:'#2a2230',face:SK,eye:DK,p:'#1f3b7a',q:'#1f3b7a',a:'#f2c14e',g:'#ffa53a',l:'#3b2d22',b:'#3b2d22',cape:'#b3202c'}},
 {id:'wanda',name:'SCARLET WITCH',title:'The Big-Feelings Mystic',p:[6,5,6,3,2,0,10,3,10],blurb:"Your emotions are a superpower — literally. Fiercely loving, wildly powerful, and best not provoked before your morning tea.",
  c:{hair:'#a8332a',face:SK,eye:DK,p:'#8e1b2e',q:'#c8243a',a:'#3a0f1a',g:'#ff4d6d',l:'#3a0f1a',b:'#3a0f1a',cape:'#5a1020'}},
 {id:'antman',name:'ANT-MAN',title:'The Lovable Underdog',p:[4,6,6,3,10,7,0,7,8],blurb:"You talk your way into heists and out of trouble. Funny, scrappy, and living proof that thinking small can save the world.",
  c:{hair:'#c8202e',face:'#8d93a3',eye:'#ff4d4d',mouth:'#8d93a3',p:'#c8202e',q:'#2a2a38',a:'#c7ccd8',g:'#2a2a38',l:'#c8202e',b:'#2a2a38'}},
];
const QUESTIONS = [
 {kind:'SCENARIO',text:'A villain crashes your brunch. First move?',a:[
  ['Hit them with a pancake. Hard.',{str:3,hum:1}],
  ['Get everyone out, then deal with it.',{ldr:3,hrt:2,crg:1}],
  ["Already hacked their suit's Wi-Fi.",{tec:3,brn:2}],
  ['Slip out the back. Ambush from the vents.',{stl:3,hum:1}]]},
 {kind:'PERSONALITY',text:'Your ideal Saturday looks like…',a:[
  ['Tinkering in the garage until 3am',{tec:3,brn:1}],
  ['Reading a dusty book of forbidden spells',{mys:3,brn:1}],
  ['Bench-pressing a small car',{str:3}],
  ['Couch, snacks, and memes with friends',{hum:2,hrt:2}]]},
 {kind:'SCENARIO',text:'The team needs a plan. You…',a:[
  ['Draw up the plan. Obviously.',{ldr:3,crg:1}],
  ['Already ran 14 million simulations.',{brn:3,mys:1}],
  ['Improvise. Plans are for people without charm.',{hum:3,crg:1}],
  ['Quietly fix the plan everyone else made.',{stl:2,brn:2}]]},
 {kind:'PERSONALITY',text:'Pick your weapon of choice.',a:[
  ['Anything with a lot of buttons',{tec:3}],
  ['Pure, unfiltered magic',{mys:3,hrt:1}],
  ['My fists, thanks',{str:3,crg:1}],
  ["A bow. Or a sharp stick. I'm flexible.",{stl:3,hum:1}]]},
 {kind:'SCENARIO',text:"You've been shrunk to the size of an ant. Reaction?",a:[
  ['Honestly? Best life now.',{hum:3,stl:1}],
  ['Science this. Immediately.',{brn:2,tec:2}],
  ['Ride an ant into battle.',{crg:2,hum:1,hrt:1}],
  ["Rage until I'm big again.",{str:3,ldr:-1}]]},
 {kind:'PERSONALITY',text:'Your friend texts you at 3am. Why?',a:[
  ['My experiment set off their car alarm. Again.',{tec:2,hum:1,brn:1}],
  ["They need a pep talk. I'm the pep talk.",{ldr:2,hrt:2}],
  ['I lifted their fridge looking for a lost fry.',{str:2,hum:2}],
  ["They didn't. Nobody has my number.",{stl:3,brn:1}]]},
 {kind:'SCENARIO',text:'The fate of an entire kingdom rests on you.',a:[
  ['Good. I was born for this.',{ldr:3,crg:1}],
  ["Fine, but I'm bringing snacks and a sidekick.",{hum:2,hrt:2}],
  ["I'll punch whatever needs punching.",{str:2,crg:2}],
  ['Let me peek at every possible future first.',{mys:2,brn:2}]]},
 {kind:'PERSONALITY',text:'Pick a personal motto.',a:[
  ["I'll keep going all day if I have to.",{crg:2,ldr:2,hrt:1}],
  ['Smash first, apologize later.',{str:3}],
  ['If it has buttons, I will press them.',{tec:3,hum:1}],
  ["Reality is a suggestion.",{mys:3,hrt:1}]]},
];
const CALC_LINES = ['Consulting the multiverse…','Measuring sass levels…','Testing hammer-worthiness…','Counting your snacks…','Asking a raccoon for a second opinion…'];
const STAT_KEYS = ['str','brn','crg','ldr'];
const STAT_COLS = {str:'#ef4b5a',brn:'#5ee0e6',crg:'#ffcf4a',ldr:'#8be36b'};
const EMPTY = '#2d2858';

/* ======================================================================
   Pixel art (procedural sprites + skyline, rendered to canvas data URLs)
   ====================================================================== */
const BODY = [
 '....OOOOOOOO....','...OHHHHHHHHO...','..OHHHHHHHHHHO..','..OHHFFFFFFHHO..','..OHFFFFFFFFHO..',
 '..OFFEEFFEEFFO..','..OFFEEFFEEFFO..','..OFFFFFFFFFFO..','...OFFFMMFFFO...','....OOFFFFOO....',
 '..OOPPPPPPPPOO..','.OQQPPPAAPPPQQO.','.OQQPPAAAAPPQQO.','.OSSPPPAAPPPSSO.','..OOQQQQQQQQOO..',
 '...OPPPPPPPPO...','...OPPPOOPPPO...','...OPPPOOPPPO...','..OBBBBOOBBBBO..','..OOOOOOOOOOOO..'];
const ITEMS = {
 shield:{x:0,y:11,m:['..OOO..','.ORRRO.','ORWWWRO','ORWBWRO','ORWWWRO','.ORRRO.','..OOO..']},
 hammer:{x:17,y:8,m:['OOOOO','OgggO','OgggO','OOOOO','.OwO.','.OwO.','.OwO.','.OwO.']},
 bow:{x:17,y:7,m:['pp..','y.p.','y..p','y..p','y..p','y..p','y..p','y..p','y..p','y.p.','pp..']}};
const ITEMPAL = {O:'#0b0a17',R:'#c8202e',W:'#f3f3f3',B:'#2a4fb0',g:'#9aa3b5',w:'#6b4a2b',p:'#7a45b0',y:'#e9e2cf'};
const SPR = {}, SKY = {};

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = amt < 0 ? 0 : 255, k = Math.abs(amt);
  r = Math.round(r + (t - r) * k); g = Math.round(g + (t - g) * k); b = Math.round(b + (t - b) * k);
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

function spriteURL(h) {
  if (SPR[h.id]) return SPR[h.id];
  const W = 22, H = 22, ox = 3, oy = 1, c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  const C = h.c, pal = {O:'#0b0a17',H:C.hair,F:C.face,E:C.eye,M:C.mouth || shade(C.face, -0.3),P:C.p,Q:C.q,A:C.a,S:C.g,L:C.l,B:C.b};
  const put = (px, py, col) => { x.fillStyle = col; x.fillRect(px, py, 1, 1); };
  if (C.cape) {
    for (let r = 11; r <= 18; r++) for (const cc of [0,1,2,13,14,15]) {
      if (BODY[r][cc] === '.') put(ox + cc, oy + r, (cc <= 1 || cc >= 14) ? shade(C.cape, -0.25) : C.cape);
    }
  }
  for (let r = 0; r < BODY.length; r++) for (let cc = 0; cc < 16; cc++) {
    let ch = BODY[r][cc];
    if (ch === '.') continue;
    if (ch === 'P' && r >= 15) ch = 'L';
    let col = pal[ch];
    if (ch !== 'O' && ch !== 'E' && ch !== 'M') {
      const rn = BODY[r][cc + 1] || '.', ln = BODY[r][cc - 1] || '.';
      if (rn === 'O' || rn === '.') col = shade(col, -0.25);
      else if (ln === 'O' || ln === '.') col = shade(col, 0.2);
    }
    put(ox + cc, oy + r, col);
  }
  const it = h.item && ITEMS[h.item];
  if (it) it.m.forEach((row, r) => [...row].forEach((ch, cc) => { if (ch !== '.') put(it.x + cc, it.y + r, ITEMPAL[ch]); }));
  return SPR[h.id] = c.toDataURL();
}

function rng(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function skyURL(theme) {
  if (SKY[theme]) return SKY[theme];
  const dusk = theme === 'Dusk', W = 320, H = 200, c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  const bands = dusk
    ? ['#1b1036','#2c1548','#4a1d5c','#7a2e66','#b84a6a','#e8805e']
    : ['#0b0920','#100d2a','#161236','#1d1843','#262052','#302862'];
  const bh = Math.ceil(170 / bands.length);
  bands.forEach((col, i) => { x.fillStyle = col; x.fillRect(0, i * bh, W, i === bands.length - 1 ? H : bh); });
  for (let i = 1; i < bands.length; i++) {
    x.fillStyle = bands[i];
    for (let yy = i * bh - 3; yy < i * bh; yy++) for (let xx = yy % 2; xx < W; xx += 2) x.fillRect(xx, yy, 1, 1);
  }
  const r = rng(7);
  for (let i = 0; i < 80; i++) {
    const sx = r() * W | 0, sy = r() * (dusk ? 70 : 115) | 0;
    x.globalAlpha = .4 + r() * .6;
    x.fillStyle = r() > .82 ? '#ffcf4a' : '#f3e9d2';
    x.fillRect(sx, sy, 1, 1);
    if (r() > .9) { x.fillRect(sx - 1, sy, 3, 1); x.fillRect(sx, sy - 1, 1, 3); }
  }
  x.globalAlpha = 1;
  const mx = 262, my = 34, mr = 11;
  x.fillStyle = dusk ? '#ffd9a0' : '#f3e9d2';
  for (let dy = -mr; dy <= mr; dy++) for (let dx = -mr; dx <= mr; dx++) if (dx * dx + dy * dy <= mr * mr) x.fillRect(mx + dx, my + dy, 1, 1);
  x.fillStyle = dusk ? '#f0c080' : '#cfc3a6';
  [[-4,-3,3],[3,2,2],[-2,5,2]].forEach(([dx, dy, s]) => x.fillRect(mx + dx, my + dy, s, s));
  let bx = 0;
  x.fillStyle = dusk ? '#3a1a4e' : '#1c1740';
  while (bx < W) {
    const w = 10 + (r() * 22 | 0), h = 50 + (r() * 70 | 0);
    x.fillRect(bx, H - h, w, h);
    if (r() > .7) x.fillRect(bx + (w >> 1), H - h - 8, 1, 8);
    bx += w;
  }
  bx = -4;
  while (bx < W) {
    const w = 14 + (r() * 20 | 0), h = 25 + (r() * 45 | 0);
    x.fillStyle = dusk ? '#1f0f2c' : '#100d26';
    x.fillRect(bx, H - h, w, h);
    for (let wy = H - h + 4; wy < H - 8; wy += 6) for (let wx = bx + 3; wx < bx + w - 3; wx += 5) {
      if (r() < .28) { x.fillStyle = r() < .15 ? '#5ee0e6' : '#ffcf4a'; x.fillRect(wx, wy, 2, 2); }
    }
    bx += w + (r() * 3 | 0);
  }
  x.fillStyle = '#0a0818';
  x.fillRect(0, H - 4, W, 4);
  return SKY[theme] = c.toDataURL();
}

/* ======================================================================
   Scoring
   ====================================================================== */
function compute(picks) {
  const u = TRAITS.map(() => 0);
  picks.forEach((ai, qi) => { const w = QUESTIONS[qi].a[ai][1]; TRAITS.forEach((t, i) => u[i] += w[t] || 0); });
  // z-score the player against the average player, compare to each hero's
  // normalized deviation from the average hero
  const UM = [4.75,3.75,2.75,3,4.5,4,3,3,3], USD = [3.15,2.11,1.68,2.6,2.45,2.87,2.45,2.45,1.9];
  const norm = a => Math.sqrt(a.reduce((s, v) => s + v * v, 0)) || 1;
  const mean = TRAITS.map((_, i) => HEROES.reduce((s, h) => s + h.p[i], 0) / HEROES.length);
  const z = u.map((v, i) => (v - UM[i]) / USD[i]), zn = norm(z);
  // stable sort: ties keep hero order, same as the original "first best wins"
  const ranked = HEROES.map(h => {
    const d = h.p.map((v, i) => v - mean[i]), dn = norm(d);
    return { h, sc: d.reduce((a, v, i) => a + v * z[i], 0) / dn };
  }).sort((a, b) => b.sc - a.sc);
  const cos = Math.max(0, Math.min(1, ranked[0].sc / zn));
  return { id: ranked[0].h.id, match: Math.round(70 + 29 * cos), runnerUp: ranked[1].h.id };
}

/* ======================================================================
   State
   ====================================================================== */
// Share links look like  #hero=thor&m=92  (m is optional)
function parseHash() {
  try {
    const h = location.hash || '';
    const m = h.match(/hero=([a-z]+)/);
    if (!m || !HEROES.find(x => x.id === m[1])) return null;
    const pm = h.match(/[#&]m=(\d{1,3})/);
    const match = pm ? Math.min(99, Math.max(1, +pm[1])) : null;
    return { id: m[1], match };
  } catch (e) { return null; }
}

const shuffled = () => {
  const a = [0, 1, 2, 3];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

// A friend's link is read once, remembered for this tab (so a reload keeps it),
// and stripped from the address bar. It only surfaces on the results page.
function loadFriend() {
  const sh = parseHash();
  if (sh) {
    try { sessionStorage.setItem('avq-friend', JSON.stringify(sh)); } catch (e) {}
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    return sh;
  }
  try {
    const v = JSON.parse(sessionStorage.getItem('avq-friend') || 'null');
    if (v && HEROES.find(h => h.id === v.id)) return { id: v.id, match: Number.isInteger(v.match) ? v.match : null };
  } catch (e) {}
  return null;
}

function initState() {
  let sound = true;
  try { sound = localStorage.getItem('avq-sfx') !== 'off'; } catch (e) {}
  return {
    screen: 'title', qi: 0, picks: [], selected: null, popText: '',
    order: QUESTIONS.map(() => [0, 1, 2, 3]),
    calcStep: 0, roulette: 0, result: null,
    friend: loadFriend(), reveal: 0, toast: '', sound,
  };
}

const state = initState();
let intervals = [];
let toastTimer = null;
let builtKey = null;
let busy = false;
const cardCache = {};
const IS_TOUCH = matchMedia('(pointer: coarse)').matches;
const NATIVE_SHARE = IS_TOUCH && !!navigator.share;

function setState(patch) { Object.assign(state, patch); update(); }
function every(fn, ms) { const t = setInterval(fn, ms); intervals.push(t); return t; }
function clearIntervals() { intervals.forEach(clearInterval); intervals = []; }
const currentHero = () => (state.result && HEROES.find(h => h.id === state.result.id)) || HEROES[0];

/* ======================================================================
   Sound (tiny square-wave chiptune blips)
   ====================================================================== */
let audioCtx = null;
const SFX = {
  start: [[523,.07],[784,.07],[1047,.14]], pick: [[660,.05],[990,.09]], back: [[440,.06],[330,.08]],
  tick: [[1200,.025]], win: [[523,.1],[659,.1],[784,.1],[1047,.3]], ok: [[880,.05],[1320,.09]],
};
function sfx(kind) {
  if (!state.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const ac = audioCtx;
    if (ac.state === 'suspended') ac.resume();
    let t = ac.currentTime;
    (SFX[kind] || []).forEach(([f, d]) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(.05, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(g); g.connect(ac.destination);
      o.start(t); o.stop(t + d + .02);
      t += d;
    });
  } catch (e) {}
}

/* ======================================================================
   Actions
   ====================================================================== */
const hashFor = r => r ? '#hero=' + r.id + (r.match ? '&m=' + r.match : '') : '';

function startQuiz() {
  clearIntervals();
  setState({ screen: 'quiz', qi: 0, picks: [], selected: null, result: null, order: QUESTIONS.map(shuffled) });
  sfx('start');
}

function goTitle() {
  clearIntervals();
  setState({ screen: 'title', selected: null });
  sfx('back');
}

// pos = on-screen position (A–D); answers are shuffled, so map it back to the real answer
function choose(pos) {
  if (state.screen !== 'quiz' || state.selected !== null) return;
  const ai = state.order[state.qi][pos];
  const w = QUESTIONS[state.qi].a[ai][1];
  const top = Object.entries(w).sort((a, b) => b[1] - a[1])[0];
  setState({ selected: pos, popText: '+' + top[1] + ' ' + TLABEL[top[0]] });
  sfx('pick');
  setTimeout(() => {
    if (state.screen !== 'quiz') return;
    const picks = [...state.picks, ai];
    if (state.qi + 1 < QUESTIONS.length) setState({ picks, qi: state.qi + 1, selected: null });
    else { setState({ picks }); runCalc(picks); }
  }, 700);
}

function back() {
  if (state.screen !== 'quiz' || state.selected !== null) return;
  sfx('back');
  if (state.qi === 0) setState({ screen: 'title' });
  else setState({ qi: state.qi - 1, picks: state.picks.slice(0, -1) });
}

function runCalc(picks) {
  const res = compute(picks);
  setState({ screen: 'calc', calcStep: 0, selected: null, result: res, reveal: 0 });
  const iv = every(() => {
    const n = state.calcStep + 1;
    if (n > 24) {
      clearInterval(iv);
      setState({ screen: 'result' });
      sfx('win');
      const rv = every(() => {
        const r = state.reveal + 1;
        setState({ reveal: r });
        if (r >= 10) clearInterval(rv);
      }, 70);
      return;
    }
    setState({ calcStep: n, roulette: (state.roulette + 1 + Math.floor(Math.random() * 3)) % HEROES.length });
    if (n % 3 === 0) sfx('tick');
  }, 110);
}

function showToast(msg) {
  clearTimeout(toastTimer);
  setState({ toast: msg });
  toastTimer = setTimeout(() => setState({ toast: '' }), 1800);
}

const shareUrl = () => location.href.split('#')[0] + hashFor(state.result);
function shareText() {
  const h = currentHero(), m = state.result && state.result.match;
  return `I got ${h.name}${m ? ` (${m}% match)` : ''}! Which Avenger are you?`;
}

// Phones: native share sheet. Everywhere else (or if sharing fails): copy the link.
async function shareLink() {
  if (NATIVE_SHARE) {
    try { await navigator.share({ title: 'Which Avenger Are You?', text: shareText(), url: shareUrl() }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  copyLink();
}

function copyLink() {
  const url = shareUrl();
  const done = () => { sfx('ok'); showToast('LINK COPIED!'); };
  const fallback = () => {
    const t = document.createElement('textarea');
    t.value = url; document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } catch (e) {}
    t.remove(); done();
  };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, fallback);
  else fallback();
}

// Cards are rendered ahead of time (when the result screen opens) so that on
// phones the share sheet can open immediately inside the tap gesture.
function getCard(kind) {
  const r = state.result, key = `${r.id}:${r.match}:${kind}`;
  if (!cardCache[key]) cardCache[key] = renderCard(kind).catch(e => { delete cardCache[key]; throw e; });
  return cardCache[key];
}
function prepareCards() { ['square', 'story'].forEach(k => getCard(k).catch(() => {})); }

// 'square' → SAVE IMAGE. 'story' → SHARE STORY: on phones this opens the share
// sheet with the 9:16 card, where Instagram → Stories loads it into the story
// editor. (Web pages can't post to Instagram Stories directly; only native apps
// can.) Without file sharing (desktop) both fall back to downloading the PNG.
async function saveImage(kind) {
  if (busy) return;
  busy = true;
  const story = kind === 'story';
  try {
    const h = currentHero(), name = `avenger-${h.id}${story ? '-story' : ''}.png`;
    const blob = await getCard(kind);
    if (NATIVE_SHARE && window.File && navigator.canShare) {
      const file = new File([blob], name, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        // Story: image only — Instagram ignores captions and some targets drop the file when text is attached.
        const data = story ? { files: [file] } : { files: [file], text: shareText() };
        try { await navigator.share(data); sfx('ok'); showToast('SHARED!'); return; }
        catch (e) { if (e && e.name === 'AbortError') return; }
      }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = name; a.href = url;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    sfx('ok');
    showToast(story && !IS_TOUCH ? 'SAVED! POST IT FROM YOUR PHONE' : 'IMAGE SAVED!');
  } catch (e) {
    showToast('COULD NOT MAKE IMAGE');
  } finally {
    busy = false;
  }
}

async function renderCard(kind) {
  const h = currentHero(), match = state.result.match, story = kind === 'story', W = 1080, H = story ? 1920 : 1080;
  try { await Promise.all([document.fonts.load('40px "Press Start 2P"'), document.fonts.load('700 40px "Pixelify Sans"')]); } catch (e) {}
  const load = src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = src; });
  const [sky, spr] = await Promise.all([load(skyURL(CONFIG.sky)), load(spriteURL(h))]);
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.imageSmoothingEnabled = false;

  const sc = Math.max(W / 320, H / 200), sw = 320 * sc, sh = 200 * sc;
  x.drawImage(sky, (W - sw) / 2, H - sh, sw, sh);
  x.fillStyle = 'rgba(10,8,24,.35)'; x.fillRect(0, 0, W, H);

  const m = 60, pw = W - 2 * m, ph = H - 2 * m;
  [['#0a0818',16],['#f3e9d2',12],['#0a0818',6],['#241f4a',0]].forEach(([col, o]) => { x.fillStyle = col; x.fillRect(m - o, m - o, pw + 2 * o, ph + 2 * o); });
  x.fillStyle = '#3d3678'; x.fillRect(m, m, pw, 6); x.fillRect(m, m, 6, ph);

  const PS = '"Press Start 2P", monospace', PX = '"Pixelify Sans", monospace';
  const L = story ? {y:200,k:24,name:76,title:46,row:84,foot:1690} : {y:120,k:12,name:56,title:36,row:70,foot:960};
  x.textAlign = 'center'; x.textBaseline = 'top';
  let y = L.y;
  x.font = `${story ? 32 : 26}px ${PS}`; x.fillStyle = '#ffcf4a'; x.fillText("I'M", W / 2, y);
  y += story ? 70 : 52;

  const ns = Math.min(L.name, Math.floor((pw - 80) / h.name.length));
  x.font = `${ns}px ${PS}`;
  x.fillStyle = '#0a0818'; x.fillText(h.name, W / 2, y + Math.round(ns * .14));
  x.fillStyle = '#9e2433'; x.fillText(h.name, W / 2, y + Math.round(ns * .07));
  x.fillStyle = '#ef4b5a'; x.fillText(h.name, W / 2, y);
  y += ns + (story ? 36 : 24);

  x.font = `700 ${L.title}px ${PX}`; x.fillStyle = '#5ee0e6'; x.fillText(h.title, W / 2, y);
  y += L.title + (story ? 40 : 24);

  const s = 22 * L.k;
  x.fillStyle = '#0a0818'; x.fillRect((W - s) / 2 - 14, y - 14, s + 28, s + 28);
  x.fillStyle = '#171334'; x.fillRect((W - s) / 2 - 8, y - 8, s + 16, s + 16);
  x.drawImage(spr, (W - s) / 2, y, s, s);
  y += s + (story ? 60 : 36);

  if (story) {
    x.font = `36px ${PS}`; x.fillStyle = '#ffcf4a';
    x.fillText(match ? match + '% MATCH' : 'CERTIFIED HERO', W / 2, y);
    y += 86;
  }

  x.textAlign = 'left';
  STAT_KEYS.forEach((k, r) => {
    const col = STAT_COLS[k];
    const v = h.p[TRAITS.indexOf(k)], yy = y + r * L.row, bh = story ? 40 : 34, bw = story ? 54 : 48, bx = m + 70 + (story ? 150 : 130);
    x.font = `${story ? 28 : 24}px ${PS}`; x.fillStyle = '#f3e9d2';
    x.fillText(k.toUpperCase(), m + 70, yy + (bh - (story ? 28 : 24)) / 2);
    for (let j = 0; j < 10; j++) {
      x.fillStyle = j < v ? col : EMPTY; x.fillRect(bx + j * (bw + 8), yy, bw, bh);
      x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(bx + j * (bw + 8), yy + bh - 6, bw, 6);
    }
    x.fillStyle = '#ffcf4a';
    x.fillText(String(v), bx + 10 * (bw + 8) + 14, yy + (bh - (story ? 28 : 24)) / 2);
  });

  x.textAlign = 'center';
  x.font = `${story ? 28 : 22}px ${PS}`; x.fillStyle = '#a79fd0'; x.fillText('WHICH AVENGER ARE YOU?', W / 2, L.foot);
  x.font = `${story ? 22 : 18}px ${PS}`; x.fillStyle = '#ffcf4a'; x.fillText('@moejojojo', W / 2, L.foot + (story ? 52 : 40));

  return new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error('toBlob failed')), 'image/png'));
}

/* ======================================================================
   Rendering — each screen is built once, then patched on state changes
   so CSS animations (marquee, popIn, floatUp) don't restart every tick.
   ====================================================================== */
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $ = id => document.getElementById(id);
const screenEl = $('screen');

const BUILD = {
  title() {
    const parade = [...HEROES, ...HEROES].map((h, i) =>
      `<div class="parade-item"><img src="${spriteURL(h)}" alt="" style="animation-delay:${i % 2 ? '-.25s' : '0s'}"></div>`).join('');
    return `
      <div class="screen-title" data-screen-label="01 Title">
        <h1 class="logo ps" style="margin:0;font-weight:400">
          <span class="logo-1">WHICH</span><span class="logo-2">AVENGER</span><span class="logo-3">ARE YOU?</span>
        </h1>
        <div class="parade" aria-hidden="true"><div class="parade-track">${parade}</div><div class="grass"></div></div>
        <p class="tagline">8 questions. 12 heroes. One extremely scientific* result.<br><span>*Not science.</span></p>
        <button class="btn-primary btn-start ps" data-action="start"><span class="blink" aria-hidden="true">▶</span><span>PRESS START</span></button>
        <span class="hint kbd-hint ps">OR HIT ENTER</span>
      </div>`;
  },

  quiz() {
    const q = QUESTIONS[state.qi];
    const pips = QUESTIONS.map((_, i) =>
      `<div class="pip" style="background:${i < state.qi ? '#ffcf4a' : i === state.qi ? '#5ee0e6' : EMPTY}"></div>`).join('');
    const answers = state.order[state.qi].map((ai, pos) =>
      `<button class="answer" data-action="choose" data-i="${pos}"><span class="letter ps">${'ABCD'[pos]}</span><span>${esc(q.a[ai][0])}</span></button>`).join('');
    return `
      <div class="screen-quiz" data-screen-label="02 Question">
        <div class="progress" aria-hidden="true">${pips}</div>
        <div style="display:flex"><span class="kind ps" style="background:${q.kind === 'SCENARIO' ? '#ef4b5a' : '#8be36b'}">${q.kind}</span></div>
        <div class="question">${esc(q.text)}</div>
        <div class="answers">${answers}</div>
        <div class="quiz-foot">
          <button class="btn-back ps" data-action="back">◀ BACK</button>
          <span class="hint kbd-hint ps">KEYS 1–4 WORK TOO</span>
        </div>
      </div>`;
  },

  calc() {
    return `
      <div class="screen-calc" data-screen-label="03 Calculating">
        <span class="calc-head ps">ANALYZING HERO DNA</span>
        <div class="roulette"><img id="roulette" alt=""></div>
        <div class="calc-bar" id="calc-bar">${'<div></div>'.repeat(24)}</div>
        <span class="calc-line" id="calc-line"></span>
      </div>`;
  },

  result() {
    const h = currentHero(), glow = h.c.p;
    const match = state.result && state.result.match ? state.result.match + '% MATCH' : 'CERTIFIED HERO';
    const runnerUp = state.result && state.result.runnerUp && HEROES.find(x => x.id === state.result.runnerUp);
    prepareCards();
    const stats = STAT_KEYS.map(k => `
      <div class="stat" data-stat="${k}">
        <span class="stat-label ps">${TLABEL[k]}</span>
        <div class="stat-blocks">${'<div></div>'.repeat(10)}</div>
        <span class="stat-value ps"></span>
      </div>`).join('');
    return `
      <div class="screen-result" data-screen-label="04 Result">
        <div class="result-top">
          <div class="portrait-col">
            <div class="portrait">
              <div class="glow glow-1" style="background:${glow}"></div>
              <div class="glow glow-2" style="background:${glow}"></div>
              <div class="floor"></div>
              <img src="${spriteURL(h)}" alt="${esc(h.name)}">
            </div>
            <div class="match ps">${match}</div>
          </div>
          <div class="hero-info">
            <span class="you-are ps">YOU ARE…</span>
            <h1 class="hero-name ps">${esc(h.name)}</h1>
            <span class="hero-title">${esc(h.title)}</span>
            <p class="hero-blurb">${esc(h.blurb)}</p>
            ${runnerUp ? `<span class="runner-up ps">RUNNER-UP: ${esc(runnerUp.name)}</span>` : ''}
          </div>
        </div>
        ${friendHTML(h)}
        <div class="stats">${stats}</div>
        <div class="actions">
          <button class="btn-secondary ps" data-action="copy">${NATIVE_SHARE ? 'SHARE LINK' : 'COPY LINK'}</button>
          <button class="btn-secondary ps" data-action="square">SAVE IMAGE</button>
          <button class="btn-secondary ps" data-action="story">SHARE STORY</button>
          <button class="btn-primary btn-retake ps" data-action="retake"><span aria-hidden="true">▶</span><span>PLAY AGAIN</span></button>
        </div>
      </div>`;
  },
};

// Shown on your own result when you arrived via a friend's link.
function friendHTML(h) {
  const fr = state.friend;
  if (!fr) return '';
  const f = HEROES.find(x => x.id === fr.id);
  let note;
  if (f.id === h.id) {
    note = 'Same hero! Great minds, great powers.';
  } else {
    const diff = TRAITS.map((t, i) => [t, h.p[i] - f.p[i]]).sort((a, b) => b[1] - a[1]);
    const [mine, d1] = diff[0], [theirs, d2] = diff[diff.length - 1];
    const lc = t => TLABEL[t].toLowerCase();
    note = d1 > 0 && d2 < 0 ? `You bring the ${lc(mine)}. They bring the ${lc(theirs)}.`
      : d1 > 0 ? `You out-${lc(mine)} them. Easily.`
      : `They've got you on ${lc(theirs)}. For now.`;
  }
  return `
    <div class="friend">
      <img src="${spriteURL(f)}" alt="">
      <div class="friend-text">
        <span class="friend-k ps">YOUR FRIEND GOT</span>
        <span class="friend-name ps">${esc(f.name)}${fr.match ? ` · ${fr.match}%` : ''}</span>
        <span class="friend-note">${esc(note)}</span>
      </div>
    </div>`;
}

const PATCH = {
  quiz() {
    screenEl.querySelectorAll('.answer').forEach((b, i) => {
      const sel = state.selected === i;
      b.style.background = sel ? '#ffcf4a' : '#1a1638';
      b.style.color = sel ? '#1a1530' : '#f3e9d2';
      b.style.opacity = state.selected !== null && !sel ? 0.4 : 1;
      let pop = b.querySelector('.pop');
      if (sel && !pop) {
        pop = document.createElement('span');
        pop.className = 'pop ps';
        pop.textContent = state.popText;
        b.appendChild(pop);
      } else if (!sel && pop) pop.remove();
    });
  },

  calc() {
    $('roulette').src = spriteURL(HEROES[state.roulette]);
    $('calc-bar').querySelectorAll('div').forEach((d, i) => { d.style.background = i < state.calcStep ? '#5ee0e6' : EMPTY; });
    $('calc-line').textContent = CALC_LINES[Math.floor(state.calcStep / 5) % CALC_LINES.length];
  },

  result() {
    const h = currentHero();
    screenEl.querySelectorAll('.stat').forEach(row => {
      const k = row.dataset.stat, v = h.p[TRAITS.indexOf(k)], f = Math.min(v, state.reveal);
      row.querySelectorAll('.stat-blocks div').forEach((d, j) => { d.style.background = j < f ? STAT_COLS[k] : EMPTY; });
      row.querySelector('.stat-value').textContent = f;
    });
  },
};

function update() {
  const s = state;
  $('hud-left').textContent = {
    title: `${HEROES.length} HEROES · ${QUESTIONS.length} QUESTIONS`,
    quiz: `QUESTION ${s.qi + 1}/${QUESTIONS.length}`,
    calc: 'PROCESSING…',
    result: 'RESULT',
  }[s.screen];
  $('sfx').textContent = s.sound ? 'SFX ON' : 'SFX OFF';

  const key = s.screen === 'quiz' ? 'quiz:' + s.qi
    : s.screen === 'result' ? `result:${s.result && s.result.id}:${s.result && s.result.match}`
    : s.screen;
  if (key !== builtKey) {
    // New screen or question: start from the top, not wherever the last one was scrolled to.
    if (builtKey !== null && window.scrollY > 0) window.scrollTo(0, 0);
    builtKey = key;
    screenEl.innerHTML = BUILD[s.screen]();
  }
  if (PATCH[s.screen]) PATCH[s.screen]();

  const toast = $('toast');
  toast.hidden = !s.toast;
  toast.textContent = s.toast;
}

/* ======================================================================
   Events
   ====================================================================== */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  switch (btn.dataset.action) {
    case 'start':  startQuiz(); break;
    case 'retake': goTitle(); break;
    case 'choose': choose(Number(btn.dataset.i)); break;
    case 'back':   back(); break;
    case 'copy':   shareLink(); break;
    case 'square': saveImage('square'); break;
    case 'story':  saveImage('story'); break;
    case 'sound': {
      const v = !state.sound;
      try { localStorage.setItem('avq-sfx', v ? 'on' : 'off'); } catch (err) {}
      setState({ sound: v });
      sfx('ok');
      break;
    }
  }
});

window.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (state.screen === 'title' && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    startQuiz();
  } else if (state.screen === 'quiz') {
    const k = e.key.toLowerCase();
    let i = '1234'.indexOf(k);
    if (i < 0) i = 'abcd'.indexOf(k);
    if (k.length === 1 && i >= 0) choose(i);
    else if (e.key === 'Backspace') back();
  }
});

// A friend's link pasted into an already-open tab only changes the hash:
// treat it like a fresh open — remember the friend, go to the title screen.
window.addEventListener('hashchange', () => {
  const fr = loadFriend();
  if (!fr) return;
  clearIntervals();
  setState({ screen: 'title', selected: null, friend: fr });
});

/* ======================================================================
   Boot
   ====================================================================== */
$('sky').style.backgroundImage = `url(${skyURL(CONFIG.sky)})`;
$('scanlines').hidden = !CONFIG.scanlines;
$('favicon').href = spriteURL(HEROES[0]);
update();
})();

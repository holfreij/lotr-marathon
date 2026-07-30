/* ═══════════════════════════════════════════════════════════════
   Gandalf Day · LOTR Extended Edition Marathon · 24 oktober 2026
   ═══════════════════════════════════════════════════════════════ */
(() => {
'use strict';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const pad = (n, w = 2) => String(n).padStart(w, '0');
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── 1. The day ──────────────────────────────────────────────────
   24 October 2026 falls before the last Sunday of October, so the
   Netherlands is still on CEST (UTC+2). Pinning the offset keeps the
   countdown honest no matter where the visitor's clock lives.        */

const DAY = '2026-10-24', TZ = '+02:00';
const at = t => new Date(`${DAY}T${t}${TZ}`);
const START = at('08:35:38');

const SVGNS = 'http://www.w3.org/2000/svg';
const svgEl = (tag, attrs = {}) => {
  const n = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
};

/* ── 2. Schedule ─────────────────────────────────────────────── */

const SCHEDULE = [
  { s:'08:00:00', e:'08:35:38', type:'meal', icon:'🍳', name:'First & Second Breakfast',
    note:'Twee ontbijten voor negen uur. Zoals het hoort.' },
  { s:'08:35:38', e:'10:16:00', type:'film', name:'The Fellowship of the Ring', part:'Deel 1', dur:'1u 40m',
    note:'Om 10:00 uur precies vertelt Gandalf je hoe laat het is. Kippenvel gegarandeerd.',
    map:['hobbiton','bree','weathertop','fords','rivendell'] },
  { s:'10:16:00', e:'10:46:00', type:'meal', icon:'☕', name:'Elevenses',
    note:'Dertig minuten. Benen strekken, koffie, tweede koffie.' },
  { s:'10:46:00', e:'12:20:00', type:'film', name:'The Fellowship of the Ring', part:'Deel 2', dur:'1u 34m',
    note:'Caradhras, Moria, Lothlórien, en dan breekt het Gezelschap.',
    map:['caradhras','moria','lorien','argonath','amonhen'] },
  { s:'12:20:00', e:'13:05:00', type:'meal', icon:'🍲', name:'Luncheon',
    note:'Drie kwartier. Warm eten, want de weg is nog lang.' },
  { s:'13:05:00', e:'14:51:00', type:'film', name:'The Two Towers', part:'Deel 1', dur:'1u 46m',
    note:'Emyn Muil, de Dodenmoerassen, Fangorn en de Gouden Hal van Meduseld.',
    map:['emynmuil','marshes','fangorn','edoras','isengard'] },
  { s:'14:51:00', e:'15:21:00', type:'meal', icon:'🫖', name:'Afternoon Tea',
    note:'Thee. Je hebt straks al je krachten nodig voor de Hoornburg.' },
  { s:'15:21:00', e:'17:10:00', type:'film', name:'The Two Towers', part:'Deel 2', dur:'1u 49m',
    note:'Helm\'s Deep. Kijk naar het oosten bij het eerste licht van de vijfde dag.',
    map:['helmsdeep','isengard','osgiliath','morannon'] },
  { s:'17:10:00', e:'17:55:00', type:'meal', icon:'🍖', name:'Dinner',
    note:'De grote maaltijd. Drie kwartier — eet als een Ent.' },
  { s:'17:55:00', e:'19:53:00', type:'film', name:'The Return of the King', part:'Deel 1', dur:'1u 58m',
    note:'De bakens worden ontstoken en Minas Tirith roept om hulp.',
    map:['minastirith','osgiliath','dunharrow','cirithungol','pelennor'] },
  { s:'19:53:00', e:'20:23:00', type:'meal', icon:'🥧', name:'Supper',
    note:'De laatste pauze. Daarna zit je vast tot het einde.' },
  { s:'20:23:00', e:'22:27:00', type:'film', name:'The Return of the King', part:'Deel 2', dur:'2u 04m',
    note:'Pelennor, de Zwarte Poort, Orodruin — en daarna nog een paar eindes.',
    map:['pelargir','pelennor','morannon','mountdoom','havens'] },
  { s:'22:27:00', e:null, type:'end', icon:'🌅', name:'The end',
    note:'“Well, I’m back.” Tijd om naar huis te gaan, of niet.' },
];

/* ── 3. Quotes for the Palantír ──────────────────────────────── */

const QUOTES = [
  { nl:'Een tovenaar komt nooit te laat, Frodo Balings. Noch te vroeg. Hij arriveert precies wanneer hij dat wil.',
    en:'A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to.', who:'Gandalf de Grijze' },
  { nl:'Het is 10 uur ’s morgens op 24 oktober, als je ’t wilt weten.',
    en:'It’s ten o’clock in the morning on October the 24th, if you want to know.', who:'Gandalf · Rivendell · en vandaag klopt het' },
  { nl:'Alles wat wij hoeven te beslissen, is wat we doen met de tijd die ons gegeven is.',
    en:'All we have to decide is what to do with the time that is given us.', who:'Gandalf de Grijze' },
  { nl:'GIJ ZULT NIET PASSEREN!', en:'YOU SHALL NOT PASS!', who:'Gandalf · de Brug van Khazad-dûm' },
  { nl:'Vlucht, dwazen!', en:'Fly, you fools!', who:'Gandalf · zijn laatste woorden. Voorlopig.' },
  { nl:'Ik ben Gandalf de Witte. En ik keer tot jullie terug op het keerpunt van het getij.',
    en:'I am Gandalf the White. And I come back to you now, at the turn of the tide.', who:'Gandalf de Witte' },
  { nl:'Kijk naar mijn komst bij het eerste licht van de vijfde dag. Bij zonsopgang, kijk naar het oosten.',
    en:'Look to my coming at first light on the fifth day. At dawn, look to the east.', who:'Gandalf · Helm’s Deep' },
  { nl:'Velen die leven verdienen de dood. En sommigen die sterven verdienen het leven. Kun jij hun dat geven, Frodo?',
    en:'Many that live deserve death. And some that die deserve life. Can you give it to them, Frodo?', who:'Gandalf de Grijze' },
  { nl:'De dood is slechts een ander pad — één die wij allemaal moeten gaan.',
    en:'Death is just another path. One that we all must take.', who:'Gandalf · Minas Tirith' },
  { nl:'Er is nog hoop zolang het Gezelschap trouw blijft.',
    en:'There is still hope, so long as the Company remains true.', who:'Gandalf de Grijze' },
];

/* ── 4. The Fellowship ───────────────────────────────────────── */

const ROUTE_COLOR = {
  frodo:'#d8503a', aragorn:'#e8c25c', merry:'#7fb861', gandalf:'#e6ecfa', boromir:'#8fa4bd',
};

const FELLOWSHIP = [
  { n:'Frodo',   sigil:'💍', role:'Ringdrager',                 route:'frodo'   },
  { n:'Sam',     sigil:'🥔', role:'Tuinman. En de echte held.', route:'frodo'   },
  { n:'Gandalf', sigil:'🔥', role:'De Grijze, later de Witte',  route:'gandalf' },
  { n:'Aragorn', sigil:'👑', role:'Strider, erfgenaam van Isildur', route:'aragorn' },
  { n:'Legolas', sigil:'🏹', role:'Prins van het Boswijkrijk',  route:'aragorn' },
  { n:'Gimli',   sigil:'🪓', role:'Zoon van Glóin',             route:'aragorn' },
  { n:'Boromir', sigil:'🛡️', role:'Van Gondor. Hij hield stand.', route:'boromir' },
  { n:'Merry',   sigil:'🍄', role:'Ruiter van Rohan',           route:'merry'   },
  { n:'Pippin',  sigil:'🕯️', role:'Wachter van de Citadel',     route:'merry'   },
];

/* ── 5. Middle-earth ─────────────────────────────────────────── */

const PLACES = [
  { id:'havens',      n:'Grey Havens',   x: 96, y:272, la:'middle',dx:  0, dy: 20, t:'Mithlond. Waar de laatste schepen westwaarts varen — en waar het echt eindigt.' },
  { id:'hobbiton',    n:'Hobbiton',      x:170, y:254, la:'middle',dx:  0, dy:-14, t:'Bag End. Elk goed verhaal begint met een feest, een ring en een tovenaar die vuurwerk meeneemt.' },
  { id:'bree',        n:'Bree',          x:256, y:248, la:'middle',dx:  0, dy: 19, t:'The Prancing Pony. Regen, argwaan, en een Strider in de donkerste hoek.' },
  { id:'weathertop',  n:'Weathertop',    x:332, y:236, la:'middle',dx:  0, dy:-14, t:'Amon Sûl. Vijf Nazgûl, één Morgul-mes, en een wond die nooit helemaal geneest.' },
  { id:'fords',       n:'Ford of Bruinen',x:400,y:226, la:'middle',dx:  0, dy: 20, t:'“If you want him, come and claim him!” En toen kwam het water.' },
  { id:'rivendell',   n:'Rivendell',     x:448, y:208, la:'start', dx: 13, dy: -4, t:'Imladris. Hier ontwaakt Frodo, hier vergadert de Raad van Elrond — en hier is het tien uur ’s morgens op 24 oktober.' },
  { id:'caradhras',   n:'Caradhras',     x:490, y:282, la:'start', dx: 14, dy:  0, t:'De Wrede. Saruman’s storm drijft het Gezelschap terug — en dus de berg ín.' },
  { id:'moria',       n:'Moria',         x:470, y:326, la:'end',   dx:-13, dy:  4, t:'Khazad-dûm. Spreek vriend en treed binnen. Wat daarna komt, is minder gastvrij.' },
  { id:'lorien',      n:'Lothlórien',    x:540, y:350, la:'start', dx: 13, dy:  4, t:'Het Gouden Woud van Galadriel. Mallorn, mithril, lembas — en een spiegel die je liever niet had ingekeken.' },
  { id:'fangorn',     n:'Fangorn',       x:520, y:414, la:'end',   dx:-13, dy: -6, t:'Hoom. Hom. Haast je niet — zeg nooit iets als het niet de moeite waard is om er lang over te doen.' },
  { id:'isengard',    n:'Isengard',      x:480, y:448, la:'end',   dx:-13, dy:  4, t:'Orthanc. Saruman’s smederij, tot de bomen genoeg hebben gezien.' },
  { id:'argonath',    n:'Argonath',      x:566, y:428, la:'start', dx: 13, dy: -6, t:'De Pilaren der Koningen. Aragorn vaart onder zijn eigen voorouders door.' },
  { id:'amonhen',     n:'Amon Hen',      x:578, y:458, la:'end',   dx:-13, dy: 12, t:'Hier breekt het Gezelschap. Boromir valt, Merry en Pippin worden meegenomen, en Frodo vertrekt alleen. Nou ja — bijna alleen.' },
  { id:'emynmuil',    n:'Emyn Muil',     x:634, y:466, la:'middle',dx:  0, dy:-15, t:'Scherpe rotsen, rondjes lopen, en een oude vriend met veel te grote ogen.' },
  { id:'marshes',     n:'Dead Marshes',  x:664, y:496, la:'end',   dx:-13, dy: -8, t:'Niet naar de lichtjes kijken. Echt niet.' },
  { id:'morannon',    n:'Black Gate',    x:758, y:456, la:'middle',dx:  0, dy:-15, t:'De Morannon. Potdicht — tot iemand er op het allerlaatst hard op klopt.', dark:true },
  { id:'helmsdeep',   n:'Helm’s Deep',   x:500, y:546, la:'end',   dx:-13, dy:  4, t:'De Hoornburg. Een heel lange nacht, en dan licht bij de vijfde dageraad.' },
  { id:'edoras',      n:'Edoras',        x:560, y:528, la:'start', dx: 13, dy: -4, t:'Meduseld, de Gouden Hal op de heuvel. Waar Théoden ontwaakt en Rohan weer gaat rijden.' },
  { id:'dunharrow',   n:'Dunharrow',     x:582, y:562, la:'end',   dx:-13, dy:  4, t:'Onder de Dwimorberg beginnen de Paden der Doden. Aragorn gaat naar binnen. Iedereen raadt het af.' },
  { id:'osgiliath',   n:'Osgiliath',     x:692, y:542, la:'end',   dx:-13, dy: -6, t:'De ruïnestad aan de Anduin. Faramir houdt stand, en houdt stand, en houdt stand.' },
  { id:'ithilien',    n:'Ithilien',      x:712, y:520, la:'middle',dx:  0, dy: 21, t:'Kruiden, gestoofd konijn, en een discussie daarover die veel te lang duurt.' },
  { id:'minastirith', n:'Minas Tirith',  x:652, y:576, la:'middle',dx:  0, dy: 21, t:'De Witte Stad. Zeven cirkels, één baken, en een boom die uiteindelijk weer bloeit.' },
  { id:'pelennor',    n:'Pelennor',      x:700, y:604, la:'middle',dx:  0, dy: 21, t:'“I am no man.” Eén van de beste zinnen ooit uitgesproken op een slagveld.' },
  { id:'pelargir',    n:'Pelargir',      x:722, y:672, la:'start', dx: 13, dy:  4, t:'Kaperschepen, een dodenleger, en een aankomst met uitstekende timing.' },
  { id:'cirithungol', n:'Cirith Ungol',  x:792, y:548, la:'middle',dx:  0, dy: 21, t:'Shelob. Meer hoeft er niet gezegd te worden.', dark:true },
  { id:'mountdoom',   n:'Mount Doom',    x:854, y:532, la:'start', dx: 14, dy:  5, t:'Orodruin. Waar het allemaal eindigt — en waar Sam draagt wat Frodo niet meer kan.', dark:true },
  { id:'baraddur',    n:'Barad-dûr',     x:898, y:480, la:'start', dx: 13, dy: -2, t:'Het Oog. Altijd wakker, nooit uitgerust, en toch één ding over het hoofd gezien.', dark:true },
  { id:'mirkwood',    n:'Mirkwood',      x:648, y:196, la:'middle',dx:  0, dy:-15, t:'Legolas’ thuis. Spinnen inbegrepen, helaas.' },
  { id:'erebor',      n:'Erebor',        x:806, y:152, la:'start', dx: 13, dy:  2, t:'De Eenzame Berg. Gimli’s volk — en het toneel van een heel ander avontuur.' },
];

const P = Object.fromEntries(PLACES.map(p => [p.id, p]));

const ROUTES = {
  frodo: { label:'Frodo & Sam', color:ROUTE_COLOR.frodo,
    via:['hobbiton','bree','weathertop','fords','rivendell','caradhras','moria','lorien','argonath','amonhen','emynmuil','marshes','morannon','ithilien','cirithungol','mountdoom'] },
  aragorn: { label:'Aragorn, Legolas & Gimli', color:ROUTE_COLOR.aragorn,
    via:['rivendell','caradhras','moria','lorien','argonath','amonhen','fangorn','edoras','helmsdeep','isengard','dunharrow','pelargir','pelennor','minastirith','morannon'] },
  merry: { label:'Merry & Pippin', color:ROUTE_COLOR.merry,
    via:['hobbiton','bree','weathertop','fords','rivendell','caradhras','moria','lorien','argonath','amonhen','fangorn','isengard','edoras','dunharrow','pelennor','minastirith'] },
  gandalf: { label:'Gandalf', color:ROUTE_COLOR.gandalf,
    via:['hobbiton','bree','fords','rivendell','caradhras','moria','fangorn','edoras','helmsdeep','isengard','minastirith','pelennor','morannon'] },
  boromir: { label:'Boromir', color:ROUTE_COLOR.boromir,
    via:['rivendell','caradhras','moria','lorien','argonath','amonhen'] },
};

/* Terrain: ridge lines get mountains, blobs get trees. */
const RIDGES = [
  { pts:[[476,88],[486,148],[480,210],[476,268],[474,324],[484,380],[498,432]], s:1.0 },  // Misty Mountains
  { pts:[[464,570],[512,558],[562,556],[606,566],[642,588],[672,608]], s:0.85 },          // White Mountains
  { pts:[[736,444],[728,496],[736,544],[754,580],[786,606]], s:0.8 },                     // Ephel Dúath
  { pts:[[740,442],[796,424],[858,420],[916,432],[952,456]], s:0.8 },                     // Ered Lithui
  { pts:[[770,168],[810,148],[848,162]], s:0.9 },                                         // Erebor & Iron Hills
  { pts:[[240,198],[272,184],[304,194]], s:0.6 },                                         // Weather Hills
];

const WOODS = [
  { cx:644, cy:200, rx:46, ry:76, n:44 },  // Mirkwood
  { cx:522, cy:412, rx:36, ry:32, n:22 },  // Fangorn
  { cx:542, cy:352, rx:28, ry:24, n:16 },  // Lothlórien
  { cx:380, cy:240, rx:26, ry:18, n:12 },  // Trollshaws
  { cx:202, cy:278, rx:24, ry:16, n:11 },  // Old Forest
  { cx:706, cy:522, rx:22, ry:20, n:11 },  // Ithilien
];

const REGIONS = [
  { t:'The Shire',   x:170, y:214, s:13 },
  { t:'Eriador',     x:300, y:352, s:15 },
  { t:'Rhovanion',   x:712, y:300, s:15 },
  { t:'Rohan',       x:516, y:500, s:14 },
  { t:'Gondor',      x:620, y:648, s:14 },
  { t:'Mordor',      x:866, y:596, s:17, dark:true },
  { t:'The Great Sea', x:46, y:420, s:13, rot:-90 },
];

const BEACONS = ['Amon Dîn','Eilenach','Nardol','Erelas','Min-Rimmon','Calenhad','Halifirien'];

/* ══════════════════════════════════════════════════════════════
   Embers
   ══════════════════════════════════════════════════════════════ */

function initEmbers() {
  const cv = $('#embers');
  if (!cv || REDUCED) { if (cv) cv.remove(); return; }
  const ctx = cv.getContext('2d');
  let w, h, parts = [], tint = '255,200,120';

  const readTint = () => {
    const realm = document.documentElement.dataset.realm;
    tint = realm === 'mordor' ? '255,110,50' : realm === 'rohan' ? '255,196,96' : '190,230,150';
  };

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = cv.width  = innerWidth  * dpr;
    h = cv.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(innerWidth * innerHeight / 26000);
    parts = Array.from({ length: Math.min(n, 90) }, spawn);
  };

  function spawn() {
    return {
      x: Math.random() * innerWidth,
      y: innerHeight + Math.random() * innerHeight,
      r: Math.random() * 1.9 + .5,
      vy: -(Math.random() * .35 + .12),
      vx: (Math.random() - .5) * .22,
      a: Math.random() * .5 + .18,
      ph: Math.random() * Math.PI * 2,
    };
  }

  function frame(t) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of parts) {
      p.y += p.vy; p.x += p.vx + Math.sin(t / 1600 + p.ph) * .16;
      if (p.y < -12) Object.assign(p, spawn(), { y: innerHeight + 8 });
      const tw = p.a * (.65 + .35 * Math.sin(t / 520 + p.ph));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.284);
      ctx.fillStyle = `rgba(${tint},${tw})`;
      ctx.shadowBlur = 9; ctx.shadowColor = `rgba(${tint},${tw * .8})`;
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(frame);
  }

  readTint(); resize();
  addEventListener('resize', resize, { passive: true });
  addEventListener('realmchange', readTint);
  requestAnimationFrame(frame);
}

/* ══════════════════════════════════════════════════════════════
   Realm switch — the palette travels from the Shire to Mordor
   ══════════════════════════════════════════════════════════════ */

function setRealm(realm, manual = true) {
  document.documentElement.dataset.realm = realm;
  $$('[data-realm-btn]').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.realmBtn === realm)));
  if (manual) realmLocked = true;
  dispatchEvent(new Event('realmchange'));
}
let realmLocked = false;

function initRealm() {
  $$('[data-realm-btn]').forEach(b =>
    b.addEventListener('click', () => setRealm(b.dataset.realmBtn)));
}

/* On the day itself the page travels along with the marathon. */
function autoRealm(now) {
  if (realmLocked) return;
  const t = now.getTime();
  let realm = 'shire';
  if (t >= at('13:05:00').getTime()) realm = 'rohan';
  if (t >= at('17:55:00').getTime()) realm = 'mordor';
  if (document.documentElement.dataset.realm !== realm) setRealm(realm, false);
}

/* ══════════════════════════════════════════════════════════════
   Countdown
   ══════════════════════════════════════════════════════════════ */

const FLAVOURS = [
  { d: 180, t:'Nog vele manen tot de Grijze Havens. Geduld, hobbit.' },
  { d:  90, t:'De dag nadert langzaam, zoals alle goede dingen.' },
  { d:  30, t:'Nog één maancyclus. Tijd om de voorraadkast te vullen.' },
  { d:   7, t:'Minder dan een maan! Sauron wordt onrustig.' },
  { d:   2, t:'Deze week nog. Slijp je vork en was je dekentje.' },
  { d:   1, t:'Morgen. Leg je kussen alvast klaar.' },
];

function flavourFor(ms) {
  const s = ms / 1000, d = s / 86400, h = s / 3600, m = s / 60;
  if (m <= 1)   return { t:`Mijn preciousss… nog ${Math.max(0, Math.ceil(s))} tellen!`, panic:true };
  if (m <= 10)  return { t:'Adem in. De Ring gaat op reis.' };
  if (h <= 1)   return { t:'Het laatste uur. Kijk naar het oosten.' };
  if (h <= 3)   return { t:'De ketel staat op. First Breakfast is nabij.' };
  if (d <= 1)   return { t:'Vandaag! Zet de wekker, dwaas van een Took.' };
  for (const f of FLAVOURS) if (d >= f.d) return { t: f.t };
  return { t:'Zeer binnenkort.' };
}

function initCountdown() {
  const grid = $('#countGrid'), flav = $('#countFlavour'), meals = $('#countMeals');
  const np = $('#nowPlaying'), npTitle = $('#npTitle'), npFill = $('#npFill'), npRest = $('#npRest');
  const footDays = $('#footDays');
  const cells = { d:$('[data-cd="d"]'), h:$('[data-cd="h"]'), m:$('[data-cd="m"]'), s:$('[data-cd="s"]') };
  const prev = {};
  const endOfDay = at('22:27:00');

  function paint(k, val) {
    if (prev[k] === val) return;
    prev[k] = val;
    cells[k].textContent = val;
    const box = cells[k].closest('.cu');
    box.classList.remove('tick'); void box.offsetWidth; box.classList.add('tick');
  }

  function tick() {
    const now = new Date();
    const diff = START - now;
    autoRealm(now);

    if (diff > 0) {
      const s = Math.floor(diff / 1000);
      paint('d', String(Math.floor(s / 86400)));
      paint('h', pad(Math.floor(s / 3600) % 24));
      paint('m', pad(Math.floor(s / 60) % 60));
      paint('s', pad(s % 60));

      const f = flavourFor(diff);
      if (flav.textContent !== f.t) flav.textContent = f.t;
      flav.classList.toggle('panic', !!f.panic);

      const hobbitMeals = Math.ceil(diff / 86400000 * 7);
      meals.textContent = hobbitMeals > 0
        ? `Dat zijn nog ongeveer ${hobbitMeals.toLocaleString('nl-NL')} hobbitmaaltijden.`
        : '';
      footDays.textContent = `nog ${Math.ceil(diff / 86400000)} dagen`;
    } else {
      grid.classList.add('done');
      const past = now > endOfDay;
      for (const k of ['d','h','m','s']) paint(k, '0');
      flav.classList.remove('panic');
      flav.textContent = past
        ? 'De reis is volbracht. Tot de volgende Gandalf Day.'
        : 'HET IS TIEN UUR ’S MORGENS OP 24 OKTOBER!';
      meals.textContent = '';
      footDays.textContent = past ? 'volbracht' : 'vandaag';
    }

    // Live schedule
    const live = liveState(now);
    if (live.item) {
      np.hidden = false;
      npTitle.textContent = live.item.type === 'film'
        ? `${live.item.name} — ${live.item.part}` : live.item.name;
      npFill.style.width = `${(live.pct * 100).toFixed(1)}%`;
      npRest.textContent = live.rest > 0
        ? `Nog ${live.rest >= 60 ? `${Math.floor(live.rest / 60)} uur en ` : ''}${live.rest % 60} minuten.`
        : 'Bijna klaar…';
    } else {
      np.hidden = true;
    }
    markSchedule(now, live.item);
  }

  tick();
  setInterval(tick, 1000);
}

function liveState(now) {
  const t = now.getTime();
  for (const it of SCHEDULE) {
    if (!it.e) continue;
    const s = at(it.s).getTime(), e = at(it.e).getTime();
    if (t >= s && t < e) {
      return { item: it, pct: (t - s) / (e - s), rest: Math.ceil((e - t) / 60000) };
    }
  }
  return { item: null };
}

/* ══════════════════════════════════════════════════════════════
   Schedule
   ══════════════════════════════════════════════════════════════ */

function initSchedule() {
  const list = $('#scheduleList');
  SCHEDULE.forEach((it, i) => {
    const li = document.createElement('li');
    li.className = `si si-${it.type}`;
    li.dataset.idx = i;

    const parts = [
      `<span class="si-time">${it.s.slice(0, 5)}${it.s.endsWith('38') ? ':38' : ''}</span>`,
      `<span class="si-dot" aria-hidden="true"></span>`,
      `<div class="si-body"${it.type === 'film' ? ' tabindex="0" role="button"' : ''}>`,
      `<div class="si-head">`,
      it.icon ? `<span class="si-icon" aria-hidden="true">${it.icon}</span>` : '',
      `<span class="si-name">${it.name}</span>`,
      it.part ? `<span class="si-part">${it.part}</span>` : '',
      it.dur ? `<span class="si-dur">${it.dur}</span>`
             : it.e ? `<span class="si-dur">${mins(it.s, it.e)} min</span>` : '',
      `</div>`,
      it.note ? `<p class="si-note">${it.note}</p>` : '',
      `</div>`,
    ];
    li.innerHTML = parts.join('');
    list.appendChild(li);

    if (it.type === 'film') {
      const body = $('.si-body', li);
      const go = () => showChapter(i);
      body.addEventListener('click', go);
      body.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    }
  });
}

const mins = (a, b) => Math.round((at(b) - at(a)) / 60000);

function markSchedule(now, current) {
  const t = now.getTime();
  $$('#scheduleList .si').forEach(li => {
    const it = SCHEDULE[+li.dataset.idx];
    const s = at(it.s).getTime();
    const e = it.e ? at(it.e).getTime() : Infinity;
    li.classList.toggle('si-now', it === current);
    li.classList.toggle('si-done', t >= e && t >= s);
    const head = $('.si-head', li);
    const badge = $('.si-badge', head);
    if (it === current && !badge) {
      head.insertAdjacentHTML('beforeend', '<span class="si-badge">Nu bezig</span>');
    } else if (it !== current && badge) {
      badge.remove();
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   Palantír
   ══════════════════════════════════════════════════════════════ */

function initPalantir() {
  const box = $('#quoteBox'), nl = $('#qNl'), en = $('#qEn'), who = $('#qWho');
  let i = Math.floor(Math.random() * QUOTES.length);

  const show = () => {
    const q = QUOTES[i % QUOTES.length];
    nl.textContent = `“${q.nl}”`;
    en.textContent = `“${q.en}”`;
    who.textContent = q.who;
    box.classList.remove('swap'); void box.offsetWidth; box.classList.add('swap');
  };

  const next = () => { i++; show(); };
  show();

  let timer = setInterval(next, 13000);
  $('#palantirBtn').addEventListener('click', () => {
    next();
    clearInterval(timer);
    timer = setInterval(next, 13000);   // restart the clock after a manual peek
  });
}

/* ══════════════════════════════════════════════════════════════
   Fellowship
   ══════════════════════════════════════════════════════════════ */

function initFellowship() {
  const ul = $('#fellowshipList');
  FELLOWSHIP.forEach(m => {
    const li = document.createElement('li');
    li.className = 'fw';
    li.style.setProperty('--fw-c', ROUTE_COLOR[m.route]);
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-pressed', 'false');
    li.dataset.route = m.route;
    li.innerHTML =
      `<span class="fw-sigil" aria-hidden="true">${m.sigil}</span>` +
      `<span class="fw-name">${m.n}</span>` +
      `<span class="fw-role">${m.role}</span>`;
    const go = () => { selectRoute(m.route); $('#kaart').scrollIntoView({ behavior:'smooth', block:'start' }); };
    li.addEventListener('click', go);
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
    ul.appendChild(li);
  });
}

/* ══════════════════════════════════════════════════════════════
   The map
   ══════════════════════════════════════════════════════════════ */

/* deterministic PRNG so the terrain looks the same on every visit */
function mulberry32(a) {
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* Catmull-Rom through the waypoints, rendered as cubic béziers */
function smoothPath(pts, tension = 0.9) {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i];
    const p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6 * tension;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6 * tension;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6 * tension;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6 * tension;
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function buildTerrain() {
  const g = $('#mTerrain');
  const rnd = mulberry32(24102026);

  // Mordor ash
  for (let i = 0; i < 70; i++) {
    const a = rnd() * 6.284, r = Math.sqrt(rnd());
    const x = 848 + Math.cos(a) * r * 104, y = 522 + Math.sin(a) * r * 74;
    g.appendChild(svgEl('circle', { class:'m-ash', cx:x.toFixed(1), cy:y.toFixed(1), r:(rnd() * 5 + 2).toFixed(1) }));
  }

  // Forests
  for (const w of WOODS) {
    for (let i = 0; i < w.n; i++) {
      const a = rnd() * 6.284, r = Math.sqrt(rnd());
      const x = w.cx + Math.cos(a) * r * w.rx, y = w.cy + Math.sin(a) * r * w.ry;
      const s = rnd() * 3 + 5;
      const tree = svgEl('path', {
        class: rnd() > .5 ? 'm-tree' : 'm-tree m-tree-d',
        d: `M${x.toFixed(1)},${(y + s).toFixed(1)} L${(x - s * .72).toFixed(1)},${(y + s * .35).toFixed(1)} ` +
           `L${(x - s * .42).toFixed(1)},${(y + s * .38).toFixed(1)} L${(x - s * .6).toFixed(1)},${(y - s * .3).toFixed(1)} ` +
           `L${(x - s * .3).toFixed(1)},${(y - s * .26).toFixed(1)} L${x.toFixed(1)},${(y - s).toFixed(1)} ` +
           `L${(x + s * .3).toFixed(1)},${(y - s * .26).toFixed(1)} L${(x + s * .6).toFixed(1)},${(y - s * .3).toFixed(1)} ` +
           `L${(x + s * .42).toFixed(1)},${(y + s * .38).toFixed(1)} L${(x + s * .72).toFixed(1)},${(y + s * .35).toFixed(1)} Z`,
      });
      g.appendChild(tree);
    }
  }

  /* Mountains march along each ridge. The two rows are offset along the
     ridge's *normal*, so a north-south range stays narrow instead of
     smearing sideways the way a fixed x-offset would. */
  for (const ridge of RIDGES) {
    const pts = [];
    for (let i = 0; i < ridge.pts.length - 1; i++) {
      const [x1, y1] = ridge.pts[i], [x2, y2] = ridge.pts[i + 1];
      const seg = Math.hypot(x2 - x1, y2 - y1);
      const n = Math.max(2, Math.round(seg / 14));
      const nx = -(y2 - y1) / seg, ny = (x2 - x1) / seg;   // unit normal
      for (let k = 0; k < n; k++) {
        const f = k / n;
        pts.push([x1 + (x2 - x1) * f, y1 + (y2 - y1) * f, nx, ny]);
      }
    }
    for (const row of [{ o: -6, dim:true }, { o: 3, dim:false }]) {
      for (const [px, py, nx, ny] of pts) {
        const j = (rnd() - .5) * 7;                        // jitter across the ridge
        const t = (rnd() - .5) * 8;                        // jitter along it
        const h = (rnd() * 8 + 12) * ridge.s, w = h * .8;
        const x = px + nx * (row.o + j) + ny * t;
        const y = py + ny * (row.o + j) - nx * t;
        g.appendChild(svgEl('path', {
          class: row.dim ? 'm-mtn m-mtn-s' : 'm-mtn',
          d: `M${(x - w).toFixed(1)},${(y + h * .5).toFixed(1)} L${x.toFixed(1)},${(y - h * .5).toFixed(1)} ` +
             `L${(x + w).toFixed(1)},${(y + h * .5).toFixed(1)} Z`,
        }));
      }
    }
  }

  // Region names
  const labels = $('#mLabels');
  for (const r of REGIONS) {
    const t = svgEl('text', {
      class: 'm-region' + (r.dark ? ' m-region-dark' : ''),
      x: r.x, y: r.y, 'font-size': r.s, 'text-anchor': 'middle',
    });
    if (r.rot) t.setAttribute('transform', `rotate(${r.rot} ${r.x} ${r.y})`);
    t.textContent = r.t;
    labels.appendChild(t);
  }
}

/* Each route is drawn twice: a dark casing underneath so the colour reads
   against the parchment, then the colour itself on top. */
function buildRoutes() {
  const g = $('#mRoutes');
  const casings = document.createDocumentFragment();
  const lines = document.createDocumentFragment();

  for (const [key, r] of Object.entries(ROUTES)) {
    const d = smoothPath(r.via.map(id => [P[id].x, P[id].y]));
    const casing = svgEl('path', { class:'m-route m-route-case', 'data-r':key, d, stroke:'#2e2413' });
    const line   = svgEl('path', { class:'m-route', 'data-r':key, d, stroke:r.color });
    casings.appendChild(casing);
    lines.appendChild(line);
  }
  g.appendChild(casings);
  g.appendChild(lines);

  // measure once both are in the document
  $$('.m-route', g).forEach(p => p.style.setProperty('--len', p.getTotalLength().toFixed(0)));
}

function buildMarkers() {
  const g = $('#mMarkers');
  for (const p of PLACES) {
    const grp = svgEl('g', {
      class: 'm-marker' + (p.dark ? ' mordor' : ''),
      id: `pin-${p.id}`, tabindex: '0', role: 'button',
      'aria-label': `${p.n} — meer informatie`,
    });
    grp.appendChild(svgEl('circle', { class:'pin', cx:p.x, cy:p.y, r:5 }));
    const label = svgEl('text', {
      class:'lbl', x: p.x + p.dx, y: p.y + p.dy + 4, 'text-anchor': p.la,
    });
    label.textContent = p.n;
    grp.appendChild(label);
    const show = () => showPlace(p);
    grp.addEventListener('click', show);
    grp.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); }
    });
    g.appendChild(grp);
  }
}

function showPlace(p) {
  const chapters = SCHEDULE
    .filter(it => it.map && it.map.includes(p.id))
    .map(it => `${it.name} ${it.part} · ${it.s.slice(0, 5)}`);
  $('#mapInfo').innerHTML =
    `<p class="mi-name">${p.n}</p><p class="mi-txt">${p.t}` +
    (chapters.length ? `<span class="mi-when">Je ziet dit in: ${chapters.join(' · ')}</span>` : '') +
    `</p>`;
}

function buildMapControls() {
  const bar = $('#mapControls');
  const mk = (key, label, color) => {
    const b = document.createElement('button');
    b.className = 'mc'; b.type = 'button';
    b.dataset.route = key;
    b.style.setProperty('--c', color);
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = `<span class="swatch" aria-hidden="true"></span>${label}`;
    b.addEventListener('click', () => selectRoute(key));
    bar.appendChild(b);
  };
  mk('all', 'Alle routes', '#d9b44a');
  for (const [k, r] of Object.entries(ROUTES)) mk(k, r.label, r.color);
}

let activeRoute = null;

function selectRoute(key) {
  activeRoute = key;
  $$('#mapControls .mc').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.route === key)));
  $$('.fw').forEach(f => f.setAttribute('aria-pressed', String(f.dataset.route === key)));
  $$('#scheduleList .si').forEach(li => li.classList.remove('si-linked'));

  for (const k of Object.keys(ROUTES)) {
    for (const path of $$(`.m-route[data-r="${k}"]`)) {
      path.classList.remove('on', 'dim');
      void path.getBoundingClientRect();        // restart the draw animation
      if (key === 'all' || key === k) path.classList.add('on');
    }
  }

  // spotlight the places on this route
  const via = key === 'all' ? [] : ROUTES[key].via;
  $$('.m-marker').forEach(m => m.classList.toggle('hot', via.includes(m.id.slice(4))));

  if (key !== 'all') {
    const r = ROUTES[key];
    $('#mapInfo').innerHTML =
      `<p class="mi-name">${r.label}</p><p class="mi-txt">` +
      `${r.via.length} halteplaatsen, van ${P[r.via[0]].n} tot ${P[r.via.at(-1)].n}.` +
      `<span class="mi-when">Klik op een stip voor het verhaal erachter.</span></p>`;
  }
}

/* A film block was clicked: light up that stretch of road */
function showChapter(idx) {
  const it = SCHEDULE[idx];
  if (!it.map) return;
  $$('#mapControls .mc').forEach(b => b.setAttribute('aria-pressed', 'false'));
  $$('.fw').forEach(f => f.setAttribute('aria-pressed', 'false'));
  $$('#scheduleList .si').forEach((li, i) => li.classList.toggle('si-linked', i === idx));

  $$('.m-route').forEach(p => { p.classList.remove('on'); p.classList.add('dim'); });
  $$('.m-marker').forEach(m => m.classList.toggle('hot', it.map.includes(m.id.slice(4))));
  activeRoute = null;

  $('#mapInfo').innerHTML =
    `<p class="mi-name">${it.name} — ${it.part}</p>` +
    `<p class="mi-txt">${it.note}<span class="mi-when">Op de kaart: ` +
    `${it.map.map(id => P[id].n).join(' → ')}</span></p>`;

  $('#kaart').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initMap() {
  buildTerrain();
  buildRoutes();
  buildMarkers();
  buildMapControls();
  selectRoute('frodo');
}

/* ══════════════════════════════════════════════════════════════
   Beacons of Gondor
   ══════════════════════════════════════════════════════════════ */

function initBeacons() {
  const wrap = $('#beacons'), line = $('#beaconLine');
  BEACONS.forEach((name, i) => {
    const b = document.createElement('button');
    b.className = 'beacon'; b.type = 'button';
    b.innerHTML =
      `<span class="beacon-peak"><span class="beacon-flame"></span></span>` +
      `<span class="beacon-name">${name}</span>`;
    if (i === 0) {
      b.setAttribute('aria-label', `Ontsteek het baken van ${name}`);
    } else {
      b.setAttribute('tabindex', '-1');
      b.setAttribute('aria-hidden', 'true');
    }
    wrap.appendChild(b);
  });

  const beacons = $$('.beacon', wrap);
  let lighting = false;

  beacons[0].addEventListener('click', () => {
    if (lighting) return;
    lighting = true;
    line.textContent = 'De bakens zijn ontstoken!';
    beacons.forEach((b, i) => setTimeout(() => {
      b.classList.add('lit');
      if (i === beacons.length - 1) {
        setTimeout(() => { line.textContent = 'Gondor roept om hulp!'; }, 700);
        setTimeout(() => {
          line.textContent = 'En Rohan zal antwoorden. 🐎';
          lighting = false;
        }, 2600);
      }
    }, i * 620));
  });
}

/* ══════════════════════════════════════════════════════════════
   Calendar export
   ══════════════════════════════════════════════════════════════ */

function icsStamp(d) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function buildICS() {
  const L = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//lotr.rolf.bible//Gandalf Day//NL',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:LOTR Marathon — Gandalf Day',
  ];
  SCHEDULE.forEach((it, i) => {
    const start = at(it.s);
    const end = it.e ? at(it.e) : new Date(start.getTime() + 15 * 60000);
    const title = it.type === 'film' ? `🎬 ${it.name} — ${it.part}`
                : it.type === 'end'  ? `${it.icon} ${it.name}`
                : `${it.icon} ${it.name}`;
    L.push(
      'BEGIN:VEVENT',
      `UID:gandalfday-2026-${i}@lotr.rolf.bible`,
      `DTSTAMP:${icsStamp(new Date())}`,
      `DTSTART:${icsStamp(start)}`,
      `DTEND:${icsStamp(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${(it.note || '').replace(/[,;]/g, '\\$&')}`,
      'END:VEVENT',
    );
  });
  L.push('END:VCALENDAR');
  return L.join('\r\n');
}

function initICS() {
  $('#icsBtn').addEventListener('click', () => {
    const blob = new Blob([buildICS()], { type: 'text/calendar;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'gandalf-day-2026.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  });
}

/* ══════════════════════════════════════════════════════════════
   Overlays & easter eggs
   ══════════════════════════════════════════════════════════════ */

const ov = { root: null, stage: null };

function openOverlay(kind, html) {
  ov.root.hidden = false;
  ov.root.className = `overlay ov-${kind}`;
  ov.stage.innerHTML = html;
  ov.root.focus?.();
}
function closeOverlay() {
  ov.root.hidden = true;
  ov.stage.innerHTML = '';
}

const EGGS = {
  durin: () => {
    openOverlay('durin', `
      <svg class="durin" viewBox="0 0 260 320" aria-hidden="true">
        <g class="durin-light">
          <rect x="86" y="118" width="88" height="202" fill="#7fb6ff" opacity=".22"/>
        </g>
        <g class="leaf-l">
          <path class="durin-arch" d="M130,300 L44,300 L44,140 C44,92 84,58 130,58"/>
          <circle class="durin-glyph" cx="88" cy="132" r="7"/>
          <path class="durin-glyph" d="M64,182 h48 v3 h-48 Z"/>
          <path class="durin-glyph" d="M76,206 l12,-16 l12,16 l-12,10 Z"/>
        </g>
        <g class="leaf-r">
          <path class="durin-arch" d="M130,300 L216,300 L216,140 C216,92 176,58 130,58"/>
          <circle class="durin-glyph" cx="172" cy="132" r="7"/>
          <path class="durin-glyph" d="M148,182 h48 v3 h-48 Z"/>
          <path class="durin-glyph" d="M160,206 l12,-16 l12,16 l-12,10 Z"/>
        </g>
        <path class="durin-arch" d="M130,44 l10,14 l-10,14 l-10,-14 Z"/>
      </svg>
      <p class="ov-title">Mellon.</p>
      <p class="ov-sub">De Deuren van Durin staan open. Een raadsel dat veel te lang duurde, en het antwoord stond er gewoon.</p>
    `);
    requestAnimationFrame(() => setTimeout(() => $('.durin')?.classList.add('open'), 120));
  },

  eye: () => {
    openOverlay('eye', `
      <svg class="eye" viewBox="0 0 400 260" aria-hidden="true">
        <defs>
          <radialGradient id="eyeFire" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stop-color="#fff2c4"/>
            <stop offset="35%"  stop-color="#ffb03a"/>
            <stop offset="70%"  stop-color="#e2481a"/>
            <stop offset="100%" stop-color="#6b1405"/>
          </radialGradient>
        </defs>
        <g class="eye-flames">
          <path d="M200,16 C286,16 366,74 396,130 C366,186 286,244 200,244 C114,244 34,186 4,130 C34,74 114,16 200,16 Z"
                fill="#8c2408" opacity=".55"/>
        </g>
        <path class="eye-sclera" d="M200,34 C272,34 342,80 372,130 C342,180 272,226 200,226 C128,226 58,180 28,130 C58,80 128,34 200,34 Z"/>
        <ellipse class="eye-pupil" cx="200" cy="130" rx="20" ry="88"/>
      </svg>
      <p class="ov-title">Hij ziet je.</p>
      <p class="ov-sub">Ash nazg durbatulûk, ash nazg gimbatul, ash nazg thrakatulûk agh burzum-ishi krimpatul.<br><em>Eén Ring om allen te regeren.</em></p>
    `);
  },

  gollum: () => {
    openOverlay('gollum', `
      <div class="gollum-eyes" aria-hidden="true">
        <span class="gollum-eye"></span><span class="gollum-eye"></span>
      </div>
      <p class="ov-title">Mijn preciousss…</p>
      <p class="ov-sub">Sneaky little hobbitses. Wat heeft het in zijn zakken, hm?</p>
    `);
  },

  balrog: () => {
    openOverlay('balrog', `
      <svg class="balrog-svg" viewBox="0 0 300 240" aria-hidden="true">
        <defs>
          <radialGradient id="balFire" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stop-color="#ffd27a"/><stop offset="45%" stop-color="#ff6a1e"/>
            <stop offset="100%" stop-color="#5c1200"/>
          </radialGradient>
        </defs>
        <path fill="url(#balFire)" opacity=".65"
              d="M20,236 C34,180 20,150 44,120 C36,164 62,150 70,116 C82,152 96,132 100,104
                 C114,148 132,120 138,86 C158,132 178,116 184,84 C200,130 224,118 232,88
                 C246,124 262,150 254,190 C250,214 244,228 240,236 Z"/>
        <path fill="#150403"
              d="M96,236 C92,196 78,182 84,158 C90,136 112,132 116,110 C104,96 108,74 124,66
                 C112,52 122,32 142,30 C150,14 176,14 184,30 C204,32 214,52 202,66
                 C218,74 222,96 210,110 C214,132 236,136 242,158 C248,182 234,196 230,236 Z"/>
        <path fill="#150403" d="M124,66 C104,52 74,36 48,42 C74,44 100,58 116,74 Z"/>
        <path fill="#150403" d="M202,66 C222,52 252,36 278,42 C252,44 226,58 210,74 Z"/>
        <circle cx="146" cy="58" r="7" fill="#ffb03a"/>
        <circle cx="180" cy="58" r="7" fill="#ffb03a"/>
      </svg>
      <p class="ov-title">GIJ ZULT NIET PASSEREN!</p>
      <p class="ov-sub">De donkere vlam zal je niet baten, vlam van Udûn. Ga terug naar de Schaduw.</p>
    `);
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 1100);
  },

  eagles: () => {
    openOverlay('eagles', `
      <p class="ov-title">De Adelaars komen!</p>
      <p class="ov-sub">Gwaihir, Heer van de Winden. Altijd precies op tijd, en toch altijd te laat om de hele wandeling te besparen.</p>
    `);
    for (let i = 0; i < 7; i++) {
      const e = document.createElement('div');
      e.className = 'eagle';
      e.textContent = '🦅';
      e.style.top = `${10 + Math.random() * 65}vh`;
      e.style.animationDelay = `${i * .38}s`;
      e.style.animationDuration = `${5 + Math.random() * 2.5}s`;
      document.body.appendChild(e);
      setTimeout(() => e.remove(), 9000);
    }
  },
};

const KONAMI = 'arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a';

function initEggs() {
  ov.root = $('#overlay');
  ov.stage = $('#ovStage');
  $('#ovClose').addEventListener('click', closeOverlay);
  ov.root.addEventListener('click', e => { if (e.target === ov.root) closeOverlay(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

  $('#ringBtn').addEventListener('click', EGGS.eye);
  $('#balrogBtn').addEventListener('click', EGGS.balrog);

  let typed = '', keys = [];
  addEventListener('keydown', e => {
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    keys.push(e.key.toLowerCase());
    if (keys.length > 10) keys.shift();
    if (keys.join(',') === KONAMI) { keys = []; EGGS.eagles(); return; }

    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-12);
    if (typed.endsWith('mellon'))   { typed = ''; EGGS.durin(); }
    if (typed.endsWith('precious')) { typed = ''; EGGS.gollum(); }
    if (typed.endsWith('balrog'))   { typed = ''; EGGS.balrog(); }
  });
}

/* ══════════════════════════════════════════════════════════════
   Boot
   ══════════════════════════════════════════════════════════════ */

initEmbers();
initRealm();
initSchedule();
initCountdown();
initPalantir();
initFellowship();
initMap();
initBeacons();
initICS();
initEggs();

})();

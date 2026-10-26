/**
 * Store art plan: which frames to render from the game and what to make of them.
 *
 *   preview  every candidate shot, small, plus a contact sheet (pick cameras)
 *   final    every store size: App Store (iPhone 6.9", 6.5", iPad 13", header, search results),
 *            Google Play (phone, tablet, feature graphic), icons and adaptive icon layers
 *
 * A shot is a game URL: ?play=<line>&studio=1 rides the line with the bot from `ff` metres until an air
 * of at least `air` seconds, holds a trick pose and frames it with `cam` = azimuth from the travel
 * direction (deg), elevation (deg), distance (m), look-up offset (m), horizontal field of view (deg),
 * sun-relative azimuth (0/1), sideways aim (m, + puts the rider right of centre).
 */

// ------------------------------------------------------------------ scenes
export const SCENES = {
  // Red Mesa
  bigSend: { line: 'mesa-5', ff: 458, air: 0.8, pose: 'superman', cam: [-145, 12, 6, 0.2, 80, 0, 1.6] },
  bigSendLow: { line: 'mesa-5', ff: 458, air: 0.8, pose: 'superman', cam: [-115, 2, 5, 0.4, 80, 0, 1.5] },
  cliff: { line: 'mesa-5', ff: 138, air: 0.7, pose: 'nohander', cam: [60, -8, 4.6, 0.6, 80, 0, 1.4] },
  canyonWhip: { line: 'mesa-4', ff: 498, air: 0.6, pose: 'tailwhip', cam: [55, 2, 4.8, 0.3, 80, 0, 1.4] },
  canyonFlip: { line: 'mesa-4', ff: 498, air: 0.6, pose: 'none', pitch: -150, cam: [100, 4, 5, 0.3, 80, 0, 1.5] },
  // Ember Peak
  lava: { line: 'ember-5', ff: 260, air: 0.6, pose: 'superman', cam: [100, 4, 5.5, 0.2, 80, 0, 1.6] },
  lavaHigh: { line: 'ember-5', ff: 260, air: 0.6, pose: 'superman', cam: [140, 10, 6, 0.2, 80, 0, 1.6] },
  eruption: { line: 'ember-5', ff: 488, air: 0.7, pose: 'cancan', cam: [160, 14, 6, 0.2, 80, 0, 1.6] },
  // Old Town
  alley: { line: 'town-2', ff: 416, air: 0.6, pose: 'nohander', cam: [120, 6, 5.5, 0.3, 80, 0, 1.6] },
  roof: { line: 'town-2', ff: 238, air: 0.6, pose: 'superman', cam: [-130, 10, 6, 0.2, 80, 0, 1.6] },
  plaza: { line: 'town-5', ff: 368, air: 0.6, pose: 'barspin', cam: [100, 2, 5, 0.3, 80, 0, 1.5] },
  // Whiteout
  cornice: { line: 'glacier-5', ff: 64, air: 0.7, pose: 'superman', cam: [110, -4, 5, 0.4, 80, 0, 1.5] },
  glacierGap: { line: 'glacier-5', ff: 258, air: 0.6, pose: 'tailwhip', cam: [70, -6, 5, 0.5, 80, 0, 1.5] },
  // Pine Shore
  treeDeck: { line: 'pines-2', ff: 410, air: 0.6, pose: 'nohander', cam: [110, 4, 5, 0.3, 80, 0, 1.5] },
  oldGrowth: { line: 'pines-5', ff: 588, air: 0.6, pose: 'superman', cam: [80, -4, 5, 0.4, 80, 0, 1.5] },
  // gameplay frames with the HUD (chase camera)
  hudFlip: { line: 'mesa-2', ff: 312, air: 0.45, pose: 'superman', hud: true, cam: [150, 10, 4.8, 0.1, 96] },
  hudLava: { line: 'ember-5', ff: 402, air: 0.5, pose: 'superman', hud: true, cam: [175, 12, 5.5, 0, 96] },
  // icon: close and low, the rider against the sky
  iconA: { line: 'mesa-4', ff: 470, air: 0.65, pose: 'superman', cam: [35, -12, 3.4, 0.3, 42] },
  iconE: { line: 'mesa-4', ff: 470, air: 0.65, pose: 'superman', cam: [30, -10, 4.2, 0.35, 44] },
  iconF: { line: 'mesa-4', ff: 470, air: 0.65, pose: 'nohander', cam: [20, -10, 4.4, 0.3, 46] },
  iconG: { line: 'mesa-4', ff: 470, air: 0.65, pose: 'tailwhip', cam: [35, -12, 4.2, 0.3, 44] },
  iconH: { line: 'ember-5', ff: 260, air: 0.6, pose: 'superman', cam: [30, -8, 4.2, 0.3, 44] },
  // Play feature graphic (logo on the left, rider right)
  featC: { line: 'mesa-4', ff: 498, air: 0.6, pose: 'nohander', cam: [100, 4, 6, 0.3, 64, 0, 2.0] },
  featD: { line: 'mesa-5', ff: 458, air: 0.8, pose: 'superman', cam: [-140, 10, 5.4, 0.2, 66, 0, 1.9] },
  featE: { line: 'ember-5', ff: 260, air: 0.6, pose: 'superman', cam: [110, 5, 6, 0.2, 64, 0, 2.0] },
  // App Store header (21:9, app name sits over the lower part: rider centred, a little high)
  headA: { line: 'mesa-5', ff: 458, air: 0.8, pose: 'superman', cam: [-140, 8, 6.5, -0.4, 74] },
  headB: { line: 'ember-5', ff: 260, air: 0.6, pose: 'superman', cam: [120, 6, 6.5, -0.4, 74] },
};

const UI = {
  uiLines: '?ui=lines&stars=30&coins=12450',
  uiGarage: '?ui=garage&stars=40&coins=12450',
  uiHome: '?stars=12&coins=3200',
};

// ------------------------------------------------------------------ helpers
const deg = Math.PI / 180;
/** Vertical fov (deg) for a horizontal fov at this aspect; tall frames (iPad) stop at 62° and crop the sides. */
const vfov = (h, aspect) => Math.min(62, (2 * Math.atan(Math.tan((h * deg) / 2) / aspect)) / deg);

/** Game URL for a scene at a viewport aspect. */
const sceneQuery = (sc, aspect, extra = '') => {
  const [az, el, dist, up, hf, sunRel = 0, side = 0] = sc.cam;
  const fov = vfov(hf, aspect).toFixed(2);
  // the sideways aim keeps its screen position when the frame gets narrower (iPad): scale it down
  const sd = aspect < 1.6 ? side * 0.7 : side;
  const q = [`play=${sc.line}`, 'studio=1', `ff=${sc.ff}`, `air=${sc.air}`, `pose=${sc.pose}`, `cam=${az},${el},${dist},${up},${fov},${sunRel},${sd}`];
  if (sc.pitch) q.push(`pitch=${sc.pitch}`);
  if (sc.yaw) q.push(`yaw=${sc.yaw}`);
  if (sc.hud) q.push('hud=1', 'stars=20');
  return `?${q.join('&')}${extra}`;
};

// ------------------------------------------------------------------ preview
const SQUARE = /^icon/;
const WIDE = /^feat/;
const HEAD = /^head/;
export const preview = () => {
  const renders = [];
  for (const [name, sc] of Object.entries(SCENES)) {
    const [w, h] = SQUARE.test(name) ? [512, 512] : WIDE.test(name) ? [1024, 500] : HEAD.test(name) ? [1120, 480] : [956, 440];
    renders.push({ name, query: sceneQuery(sc, w / h, '&dpr=1'), w, h, dpr: 1, mobile: !SQUARE.test(name) });
  }
  for (const [name, q] of Object.entries(UI)) renders.push({ name, query: q, w: 956, h: 440, dpr: 1, mobile: true, wait: 3500 });
  // a few layouts over the preview frames, to check the captions
  const compose = [
    { out: 'c/01.jpg', bg: 'bigSend', w: 956, h: 440, label: SHOTS[0].label, title: SHOTS[0].title, logo: true },
    { out: 'c/02.jpg', bg: 'hudFlip', w: 956, h: 440, label: SHOTS[1].label, title: SHOTS[1].title, valign: 'bottom' },
    { out: 'c/07.jpg', bg: 'uiGarage', w: 956, h: 440, label: SHOTS[6].label, title: SHOTS[6].title, bare: true },
    { out: 'c/feat.jpg', bg: 'featC', w: 1024, h: 500, logo: 'big', tagline: 'Big-mountain freeride' },
  ];
  return { renders, compose, contact: true };
};

// ------------------------------------------------------------------ final
// device frames: CSS viewport × device pixel ratio = the store's pixel size
export const TARGETS = {
  iphone: { w: 956, h: 440, dpr: 3, dir: 'appstore/iphone-6.9' }, // 2868 × 1320
  iphone65: { w: 896, h: 414, dpr: 3, dir: 'appstore/iphone-6.5' }, // 2688 × 1242
  ipad: { w: 1376, h: 1032, dpr: 2, dir: 'appstore/ipad-13' }, // 2752 × 2064
  play: { w: 960, h: 540, dpr: 2, dir: 'play/phone' }, // 1920 × 1080
  tablet: { w: 1280, h: 720, dpr: 2, dir: 'play/tablet' }, // 2560 × 1440
};

/**
 * The store screenshots in order: scene (or UI query), caption label + title.
 * Titles carry the search words people use: bike, BMX, MTB, flips, tricks, downhill, stunts.
 */
export const SHOTS = [
  { id: '01-cliff', scene: 'bigSend', label: 'Big-mountain freeride', title: 'Huck<br>cliff drops', logo: true },
  { id: '02-tricks', scene: 'hudFlip', label: 'Flips · whips · spins', title: 'Land big<br>bike tricks', valign: 'bottom' },
  { id: '03-lava', scene: 'lava', label: 'Five wild worlds', title: 'Jump the<br>lava canyon' },
  { id: '04-town', scene: 'roof', label: 'MTB & BMX stunts', title: 'Drop off<br>rooftops' },
  { id: '05-pines', scene: 'treeDeck', label: '25 hand-built lines', title: 'Send the<br>tree decks' },
  { id: '06-snow', scene: 'glacierGap', label: 'Downhill', title: 'Whip it<br>in the snow' },
  { id: '07-bikes', ui: 'uiGarage', label: 'Five bikes', title: 'BMX to<br>downhill', bare: true },
  { id: '08-lines', ui: 'uiLines', label: 'New line every day', title: 'Daily line<br>& endless', bare: true },
];

export const final = (pick = {}) => {
  const scenes = { ...SCENES, ...pick.scenes };
  const shots = SHOTS.map((s) => ({ ...s, ...(pick.shots?.[s.id] ?? {}) }));
  const renders = [];
  const compose = [];
  for (const [tid, t] of Object.entries(TARGETS)) {
    for (const s of shots) {
      const name = `${s.id}-${tid}`;
      const query = s.ui ? `${UI[s.ui]}&dpr=${t.dpr}` : sceneQuery(scenes[s.scene], t.w / t.h, `&dpr=${t.dpr}&shadow=4096`);
      renders.push({ name, query, w: t.w, h: t.h, dpr: t.dpr, mobile: true, wait: s.ui ? 3500 : 2500 });
      compose.push({ out: `${t.dir}/${s.id}.jpg`, bg: name, w: t.w * t.dpr, h: t.h * t.dpr, label: s.label, title: s.title, align: s.align, valign: s.valign, logo: s.logo, bare: s.bare });
    }
  }
  // Google Play feature graphic (1024 × 500), rendered at 2× and scaled down
  const feat = scenes[pick.feature ?? 'featD'];
  renders.push({ name: 'feature', query: sceneQuery(feat, 1024 / 500, '&dpr=2&shadow=4096'), w: 1024, h: 500, dpr: 2 });
  compose.push({ out: 'play/feature-graphic.jpg', bg: 'feature', w: 1024, h: 500, logo: 'big', tagline: 'Big-mountain freeride' });
  // App Store header (21:9, 3840 × 1646: no text, the store lays the app name over it)
  const head = scenes[pick.header ?? 'headB'];
  renders.push({ name: 'header', query: sceneQuery(head, 1920 / 823, '&dpr=2&shadow=4096'), w: 1920, h: 823, dpr: 2 });
  compose.push({ out: 'appstore/header-3840x1646.jpg', bg: 'header', w: 3840, h: 1646 });
  // App Store search results card (3:2, 3840 × 2560) with a short phrase
  const card = scenes[pick.card ?? 'bigSend'];
  renders.push({ name: 'card', query: sceneQuery(card, 1.5, '&dpr=2&shadow=4096'), w: 1920, h: 1280, dpr: 2 });
  compose.push({ out: 'appstore/search-3840x2560.jpg', bg: 'card', w: 3840, h: 2560, label: 'Bike stunt game', title: 'Huck<br>cliff drops', size: 132 });
  // icon: the scene at 2048 (scaled to 1024 / 512), plus the adaptive layers (rider matte + plate)
  const ic = scenes[pick.icon ?? 'iconE'];
  renders.push({ name: 'icon', query: sceneQuery(ic, 1, '&dpr=4&shadow=4096'), w: 512, h: 512, dpr: 4 });
  // adaptive icon: same shot pulled back so the rider sits inside the 66% safe circle
  const icWide = { ...ic, cam: [ic.cam[0], ic.cam[1], ic.cam[2] * 1.45, ic.cam[3], ic.cam[4], ic.cam[5] ?? 0] };
  const iw = (extra) => sceneQuery(icWide, 1, `&dpr=4&shadow=4096${extra}`);
  renders.push({ name: 'adaptive-plate', query: iw('&matte=plate'), w: 512, h: 512, dpr: 4 });
  renders.push({ name: 'adaptive-black', query: iw('&matte=black'), w: 512, h: 512, dpr: 4 });
  renders.push({ name: 'adaptive-white', query: iw('&matte=white'), w: 512, h: 512, dpr: 4 });
  const images = [
    { out: 'icon/icon-1024.png', from: 'icon', w: 1024, h: 1024, opaque: true },
    { out: 'icon/icon-512.png', from: 'icon', w: 512, h: 512, opaque: true },
    { out: 'icon/adaptive-bg-1024.png', from: 'adaptive-plate', w: 1024, h: 1024, opaque: true },
  ];
  const mattes = [{ out: 'icon/adaptive-fg-1024.png', black: 'adaptive-black', white: 'adaptive-white', w: 1024, h: 1024 }];
  return { renders, compose, images, mattes, contact: true };
};

/**
 * Store art plan: which frames to render from the game and what to make of them.
 *
 *   preview  every candidate shot, small, plus a contact sheet (pick cameras)
 *   final    every store size: App Store (iPhone 6.9", 6.5", iPad 13"), Google Play (phone, tablet,
 *            feature graphic), icons and adaptive icon layers
 *
 * A shot is a game URL: ?play=<line>&studio=1 rides the line with the bot from `ff` metres until an air
 * of at least `air` seconds, holds a trick pose and frames it with `cam` = azimuth from the travel
 * direction (deg), elevation (deg), distance (m), look-up offset (m), horizontal field of view (deg).
 */

// ------------------------------------------------------------------ scenes
const S = {
  bigSend: { line: 'mesa-5', ff: 458, air: 0.8, pose: 'superman', cam: [100, 8, 8.5, 0, 92] },
  bigSendB: { line: 'mesa-5', ff: 458, air: 0.8, pose: 'superman', cam: [-140, 10, 7.5, 0.3, 96] },
  cliff: { line: 'mesa-5', ff: 138, air: 0.7, pose: 'nohander', cam: [75, -5, 7, 0.5, 92] },
  canyonFlip: { line: 'mesa-4', ff: 498, air: 0.6, pose: 'none', pitch: -150, cam: [90, 5, 8, 0, 90] },
  canyonWhip: { line: 'mesa-4', ff: 498, air: 0.6, pose: 'tailwhip', cam: [60, 0, 6, 0.2, 92] },
  lava: { line: 'ember-5', ff: 260, air: 0.6, pose: 'superman', cam: [110, 6, 8, 0, 90] },
  lavaB: { line: 'ember-5', ff: 260, air: 0.6, pose: 'superman', cam: [-120, 15, 9, 0, 96] },
  eruption: { line: 'ember-5', ff: 488, air: 0.7, pose: 'cancan', cam: [150, 12, 8, 0, 96] },
  alley: { line: 'town-2', ff: 416, air: 0.6, pose: 'nohander', cam: [100, 5, 8, 0, 90] },
  roof: { line: 'town-2', ff: 238, air: 0.6, pose: 'superman', cam: [-110, 8, 8, 0, 92] },
  plaza: { line: 'town-5', ff: 368, air: 0.6, pose: 'barspin', cam: [120, 8, 8, 0, 92] },
  cornice: { line: 'glacier-5', ff: 64, air: 0.7, pose: 'superman', cam: [130, 8, 8, 0, 92] },
  glacierGap: { line: 'glacier-5', ff: 258, air: 0.6, pose: 'tailwhip', cam: [90, 0, 7, 0.2, 90] },
  treeDeck: { line: 'pines-2', ff: 410, air: 0.6, pose: 'nohander', cam: [100, 5, 7, 0, 92] },
  oldGrowth: { line: 'pines-5', ff: 588, air: 0.6, pose: 'superman', cam: [80, 0, 7, 0.2, 90] },
  hudFlip: { line: 'mesa-2', ff: 312, air: 0.45, pose: 'none', pitch: -110, hud: true, cam: [180, 14, 5.5, 0, 100] },
  hudLava: { line: 'ember-5', ff: 402, air: 0.5, pose: 'superman', hud: true, cam: [175, 12, 5.5, 0, 100] },
};

// icon candidates: close and low, the rider against the sky
const ICONS = {
  iconA: { line: 'mesa-4', ff: 470, air: 0.65, pose: 'superman', cam: [35, -12, 3.4, 0.3, 42] },
  iconB: { line: 'mesa-4', ff: 470, air: 0.65, pose: 'superman', cam: [-35, -15, 3.6, 0.4, 44] },
  iconC: { line: 'mesa-4', ff: 470, air: 0.65, pose: 'superman', cam: [25, -6, 3.8, 0.4, 44, 1] },
  iconD: { line: 'mesa-4', ff: 470, air: 0.65, pose: 'nohander', cam: [30, -8, 3.6, 0.3, 42] },
};

const FEATURE = {
  featA: { line: 'mesa-4', ff: 498, air: 0.6, pose: 'nohander', cam: [90, 4, 9, 0, 70] },
  featB: { line: 'mesa-5', ff: 458, air: 0.8, pose: 'superman', cam: [110, 10, 10, 0, 75] },
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
  const [az, el, dist, up, hf, sunRel = 0] = sc.cam;
  const fov = vfov(hf, aspect).toFixed(2);
  const q = [`play=${sc.line}`, 'studio=1', `ff=${sc.ff}`, `air=${sc.air}`, `pose=${sc.pose}`, `cam=${az},${el},${dist},${up},${fov},${sunRel}`];
  if (sc.pitch) q.push(`pitch=${sc.pitch}`);
  if (sc.yaw) q.push(`yaw=${sc.yaw}`);
  if (sc.hud) q.push('hud=1', 'stars=20');
  return `?${q.join('&')}${extra}`;
};

// ------------------------------------------------------------------ preview
export const preview = () => {
  const renders = [];
  for (const [name, sc] of Object.entries(S)) renders.push({ name, query: sceneQuery(sc, 956 / 440, '&dpr=1'), w: 956, h: 440, dpr: 1, mobile: true });
  for (const [name, sc] of Object.entries(ICONS)) renders.push({ name, query: sceneQuery(sc, 1, '&dpr=1'), w: 512, h: 512, dpr: 1 });
  for (const [name, sc] of Object.entries(FEATURE)) renders.push({ name, query: sceneQuery(sc, 1024 / 500, '&dpr=1'), w: 1024, h: 500, dpr: 1 });
  for (const [name, q] of Object.entries(UI)) renders.push({ name, query: q, w: 956, h: 440, dpr: 1, mobile: true, wait: 3500 });
  return { renders, contact: true };
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
  { id: '02-tricks', scene: 'hudFlip', label: 'Flips · whips · spins', title: 'Land big<br>bike tricks' },
  { id: '03-lava', scene: 'lava', label: 'Five wild worlds', title: 'Jump the<br>lava canyon' },
  { id: '04-town', scene: 'alley', label: 'MTB & BMX stunts', title: 'Gap the<br>old town' },
  { id: '05-snow', scene: 'cornice', label: 'Downhill', title: 'Send it<br>in the snow' },
  { id: '06-pines', scene: 'treeDeck', label: '25 hand-built lines', title: 'Drop off<br>tree decks' },
  { id: '07-bikes', ui: 'uiGarage', label: 'Five bikes', title: 'BMX to<br>downhill', align: 'right' },
  { id: '08-lines', ui: 'uiLines', label: 'New line every day', title: 'Daily line<br>& endless', align: 'right' },
];

export const final = (pick = {}) => {
  const scenes = { ...S, ...pick.scenes };
  const renders = [];
  const compose = [];
  for (const [tid, t] of Object.entries(TARGETS)) {
    for (const s of SHOTS) {
      const name = `${s.id}-${tid}`;
      const query = s.ui ? `${UI[s.ui]}&dpr=${t.dpr}` : sceneQuery(scenes[s.scene], t.w / t.h, `&dpr=${t.dpr}&shadow=4096`);
      renders.push({ name, query, w: t.w, h: t.h, dpr: t.dpr, mobile: true, wait: s.ui ? 3500 : 2500 });
      compose.push({ out: `${t.dir}/${s.id}.jpg`, bg: name, w: t.w * t.dpr, h: t.h * t.dpr, label: s.label, title: s.title, align: s.align, logo: s.logo });
    }
  }
  // Google Play feature graphic (1024 × 500), rendered at 2× and scaled down
  const feat = scenes[pick.feature ?? 'featA'] ?? FEATURE[pick.feature ?? 'featA'];
  renders.push({ name: 'feature', query: sceneQuery(feat, 1024 / 500, '&dpr=2&shadow=4096'), w: 1024, h: 500, dpr: 2 });
  compose.push({ out: 'play/feature-graphic.jpg', bg: 'feature', w: 1024, h: 500, logo: 'big', tagline: 'Big-mountain freeride' });
  // icon: the scene at 2048 (scaled to 1024 / 512), plus the adaptive layers (rider matte + plate)
  const ic = scenes[pick.icon ?? 'iconA'] ?? ICONS[pick.icon ?? 'iconA'];
  const iq = (extra) => sceneQuery(ic, 1, `&dpr=4&shadow=4096${extra}`);
  renders.push({ name: 'icon', query: iq(''), w: 512, h: 512, dpr: 4 });
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

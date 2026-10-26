#!/usr/bin/env node
/**
 * Store art on the CI runner: renders frames from the built game (./dist, software WebGL), then
 * captions, resizes and mattes them into every store size, and draws a contact sheet to review.
 *
 *   node art/render.mjs preview|final [outDir=art-out]      (plan in art/plan.mjs)
 *   ONLY=name,name  render just these raw frames (and what is made from them)
 *   PICK='{"scenes":{...},"icon":"iconB","feature":"featB"}'  final: override scenes / choices
 *
 * Needs puppeteer-core and sharp (npm i --no-save puppeteer-core sharp) and Google Chrome.
 */
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import * as PLAN from './plan.mjs';

const mode = process.argv[2] ?? 'preview';
const OUT = resolve(process.argv[3] ?? 'art-out');
const plan = mode === 'final' ? PLAN.final(JSON.parse(process.env.PICK || '{}')) : PLAN.preview();
const only = process.env.ONLY ? new Set(process.env.ONLY.split(',').map((s) => s.trim()).filter(Boolean)) : null;
const want = (raw) => !only || only.has(raw);
mkdirSync(`${OUT}/raw`, { recursive: true });

// ---------------------------------------------------------------- local server: the game + art files
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
const port = 5333;
const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  let f;
  if (p.startsWith('/__out/')) f = join(OUT, p.slice(7));
  else if (p.startsWith('/__fonts/')) f = join('art/fonts', p.slice(9));
  else f = join('dist', p);
  if (!existsSync(f) || statSync(f).isDirectory()) {
    res.writeHead(404);
    return res.end();
  }
  res.writeHead(200, { 'Content-Type': types[extname(f)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(readFileSync(f));
}).listen(port, '127.0.0.1');
const URL0 = `http://127.0.0.1:${port}`;

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME ?? '/usr/bin/google-chrome',
  headless: true,
  protocolTimeout: 900000,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required', '--mute-audio'],
});
let failed = false;
const made = [];
const t00 = Date.now();
try {
  // ---------------------------------------------------------------- raw frames
  for (const r of plan.renders ?? []) {
    if (!want(r.name)) continue;
    const page = await browser.newPage();
    await page.setViewport({ width: r.w, height: r.h, deviceScaleFactor: r.dpr ?? 1, isMobile: !!r.mobile, hasTouch: !!r.mobile, isLandscape: r.w > r.h });
    page.on('pageerror', (e) => {
      failed = true;
      console.log(`[${r.name}] PAGE ERROR: ${e.message}`);
    });
    page.on('console', (m) => {
      if (m.type() === 'error' && !/vibrate|404/.test(m.text())) console.log(`[${r.name}] console: ${m.text().slice(0, 300)}`);
    });
    const t0 = Date.now();
    try {
      await page.goto(`${URL0}/${r.query}`, { waitUntil: 'load', timeout: 300000 });
      await page.waitForFunction('window.__ready === true', { timeout: 600000, polling: 500 });
      await new Promise((res) => setTimeout(res, r.wait ?? 2500));
      // a few more frames after the wait so the camera has settled and the shadows are drawn
      const f0 = await page.evaluate(() => window.__frames ?? 0);
      await page.waitForFunction(`(window.__frames ?? 0) >= ${f0 + 4}`, { timeout: 600000, polling: 250 }).catch(() => undefined);
      await page.screenshot({ path: `${OUT}/raw/${r.name}.png` });
      const info = await page.evaluate(() => {
        const g = window.__game;
        if (!g?.run) return '';
        const b = g.run.bike;
        const r = g.view.renderer.info.render;
        return `s=${b.s.toFixed(0)} ${b.mode} air=${b.air?.t?.toFixed(2) ?? '-'} tris=${r.triangles}`;
      });
      console.log(`raw ${r.name} ${r.w}x${r.h}@${r.dpr ?? 1} (${Math.round((Date.now() - t0) / 1000)} s) ${info}`);
    } catch (e) {
      failed = true;
      console.log(`[${r.name}] FAILED: ${e.message}`);
    }
    await page.close();
  }

  // ---------------------------------------------------------------- mattes (rider layer with exact alpha)
  for (const m of plan.mattes ?? []) {
    if (!want(m.black) && !want(m.white)) continue;
    const B = `${OUT}/raw/${m.black}.png`;
    const W = `${OUT}/raw/${m.white}.png`;
    if (!existsSync(B) || !existsSync(W)) {
      console.log(`skip ${m.out}: missing raw`);
      continue;
    }
    const b = await sharp(B).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const w = await sharp(W).removeAlpha().raw().toBuffer();
    const { width, height } = b.info;
    const out = Buffer.alloc(width * height * 4);
    for (let i = 0, j = 0; i < width * height * 3; i += 3, j += 4) {
      // over black: a·C; over white: a·C + (1 − a)  →  a = 1 − (W − B), C = B / a
      const d = (w[i] - b.data[i] + w[i + 1] - b.data[i + 1] + w[i + 2] - b.data[i + 2]) / 3;
      const a = Math.max(0, Math.min(255, 255 - d));
      out[j + 3] = a;
      if (a > 0) for (let k = 0; k < 3; k++) out[j + k] = Math.min(255, Math.round((b.data[i + k] * 255) / a));
    }
    mkdirSync(dirname(`${OUT}/${m.out}`), { recursive: true });
    await sharp(out, { raw: { width, height, channels: 4 } }).resize(m.w, m.h, { kernel: 'lanczos3' }).png().toFile(`${OUT}/${m.out}`);
    made.push(m.out);
    console.log(`matte ${m.out}`);
  }

  // ---------------------------------------------------------------- straight resizes (icons, plates)
  for (const im of plan.images ?? []) {
    if (!want(im.from)) continue;
    const src = `${OUT}/raw/${im.from}.png`;
    if (!existsSync(src)) continue;
    mkdirSync(dirname(`${OUT}/${im.out}`), { recursive: true });
    let pipe = sharp(src).resize(im.w, im.h, { fit: 'cover', kernel: 'lanczos3' });
    if (im.opaque) pipe = pipe.flatten({ background: '#0b0c0f' }).removeAlpha();
    await pipe.png().toFile(`${OUT}/${im.out}`);
    made.push(im.out);
    console.log(`image ${im.out}`);
  }

  // ---------------------------------------------------------------- captions over the frames
  const html = (s) => {
    const k = s.h / 1080;
    const left = s.align !== 'right';
    const bottom = s.valign === 'bottom';
    const big = s.logo === 'big';
    const fonts = `@font-face { font-family: 'BSD'; src: url('/__fonts/big-shoulders-display-latin-wght-normal.woff2') format('woff2'); font-weight: 100 900; }
@font-face { font-family: 'SAI'; src: url('/__fonts/saira-latin-wdth-normal.woff2') format('woff2'); font-weight: 100 900; font-stretch: 50% 125%; }
html, body { margin: 0; width: ${s.w}px; height: ${s.h}px; overflow: hidden; background: #0b0c0f; }
.label { display: inline-block; font-family: 'SAI'; font-weight: 800; font-stretch: 88%; letter-spacing: .16em; text-transform: uppercase; color: #0b0c0f; background: #ff5b14; font-size: ${Math.round(30 * k)}px; padding: ${Math.round(7 * k)}px ${Math.round(18 * k)}px ${Math.round(6 * k)}px; clip-path: polygon(${Math.round(10 * k)}px 0, 100% 0, calc(100% - ${Math.round(10 * k)}px) 100%, 0 100%); }
.title { font-family: 'BSD'; font-weight: 900; text-transform: uppercase; color: #f4eee3; line-height: .84; transform: skewX(-8deg); text-shadow: 0 ${Math.round(6 * k)}px ${Math.round(34 * k)}px rgba(0,0,0,.5); }
.logo b, .flogo b { color: #ff5b14; }`;
    // UI screens: the screen framed on the brand background, the caption above it
    if (s.bare) {
      const ih = Math.round(s.h * 0.72);
      const iw = Math.round(ih * (s.w / s.h));
      return `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}
body { background: radial-gradient(120% 90% at 50% 110%, #3a1a0c 0%, #14100f 45%, #0b0c0f 75%); }
.row { position: absolute; left: 0; right: 0; top: ${Math.round(s.h * 0.055)}px; display: flex; align-items: center; justify-content: center; gap: ${Math.round(34 * k)}px; }
.row .title { font-size: ${Math.round(124 * k)}px; }
.shot { position: absolute; left: 50%; bottom: ${Math.round(s.h * 0.05)}px; width: ${iw}px; height: ${ih}px; transform: translateX(-50%); border-radius: ${Math.round(34 * k)}px; overflow: hidden; box-shadow: 0 ${Math.round(30 * k)}px ${Math.round(90 * k)}px rgba(0,0,0,.6), 0 0 0 ${Math.max(2, Math.round(5 * k))}px #24262c; background: url('/__out/raw/${s.bg}.png') center / cover no-repeat; }
</style></head><body><div class="row"><div class="label">${s.label}</div><div class="title">${s.title.replace(/<br>/g, ' ')}</div></div><div class="shot"></div></body></html>`;
    }
    return `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}
.bg { position: absolute; inset: 0; background: url('/__out/raw/${s.bg}.png') center / cover no-repeat; }
.scrim { position: absolute; inset: 0; background: linear-gradient(${left ? '100deg' : '260deg'}, rgba(8,9,12,.78) 0%, rgba(8,9,12,.45) 30%, rgba(8,9,12,0) 54%); }
.scrim.bottom { background: linear-gradient(0deg, rgba(8,9,12,.8) 0%, rgba(8,9,12,.4) 26%, rgba(8,9,12,0) 46%); }
.cap { position: absolute; ${left ? 'left' : 'right'}: ${Math.round(80 * k)}px; ${bottom ? `bottom: ${Math.round(70 * k)}px` : `top: ${Math.round(78 * k)}px`}; max-width: ${Math.round(s.w * 0.56)}px; text-align: ${left ? 'left' : 'right'}; }
.cap .title { font-size: ${Math.round((s.size ?? 150) * k)}px; margin-top: ${Math.round(18 * k)}px; transform-origin: ${left ? 'left' : 'right'} bottom; }
.logo { position: absolute; ${left ? 'right' : 'left'}: ${Math.round(70 * k)}px; bottom: ${Math.round(56 * k)}px; font-family: 'BSD'; font-weight: 900; font-size: ${Math.round(84 * k)}px; color: #f4eee3; transform: skewX(-9deg); text-shadow: 0 4px 24px rgba(0,0,0,.45); letter-spacing: .01em; }
.flogo { position: absolute; left: ${Math.round(s.w * 0.055)}px; top: 50%; transform: translateY(-50%) skewX(-9deg); font-family: 'BSD'; font-weight: 900; font-size: ${Math.round(s.h * 0.27)}px; line-height: .9; color: #f4eee3; text-shadow: 0 6px 30px rgba(0,0,0,.45); }
.flogo small { display: block; font-family: 'SAI'; font-weight: 800; font-stretch: 88%; font-size: ${Math.round(s.h * 0.055)}px; letter-spacing: .2em; text-transform: uppercase; color: #ff5b14; margin-top: ${Math.round(s.h * 0.03)}px; transform: skewX(9deg); }
.fscrim { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(8,9,12,.72) 0%, rgba(8,9,12,.35) 34%, rgba(8,9,12,0) 58%); }
</style></head><body><div class="bg"></div>
${big ? `<div class="fscrim"></div><div class="flogo">HUCK<b>LINE</b>${s.tagline ? `<small>${s.tagline}</small>` : ''}</div>` : ''}
${s.title ? `<div class="scrim${bottom ? ' bottom' : ''}"></div>` : ''}
${s.title ? `<div class="cap">${s.label ? `<div class="label">${s.label}</div>` : ''}<div class="title">${s.title}</div></div>` : ''}
${s.logo === true ? '<div class="logo">HUCK<b>LINE</b></div>' : ''}
</body></html>`;
  };
  const page = await browser.newPage();
  for (const s of plan.compose ?? []) {
    if (!want(s.bg)) continue;
    if (!existsSync(`${OUT}/raw/${s.bg}.png`)) {
      console.log(`skip ${s.out}: no raw ${s.bg}`);
      continue;
    }
    await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 1 });
    writeFileSync(`${OUT}/compose.html`, html(s));
    await page.goto(`${URL0}/__out/compose.html`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    mkdirSync(dirname(`${OUT}/${s.out}`), { recursive: true });
    const jpg = s.out.endsWith('.jpg');
    const buf = await page.screenshot({ type: 'png' });
    // stores want no alpha channel: flatten, then JPEG (screens) or 24-bit PNG
    const img = sharp(buf).flatten({ background: '#0b0c0f' }).removeAlpha();
    await (jpg ? img.jpeg({ quality: 92, chromaSubsampling: '4:4:4', mozjpeg: true }) : img.png()).toFile(`${OUT}/${s.out}`);
    made.push(s.out);
    console.log(`composed ${s.out}`);
  }
  rmSync(`${OUT}/compose.html`, { force: true });

  // ---------------------------------------------------------------- contact sheet
  if (plan.contact) {
    const rawNames = (plan.renders ?? []).map((r) => r.name).filter((n) => existsSync(`${OUT}/raw/${n}.png`));
    const items =
      mode === 'final'
        ? made.filter((f) => /iphone-6\.9|feature|icon|header|search/.test(f)).map((f) => ({ src: `/__out/${f}`, name: f }))
        : [...rawNames.map((n) => ({ src: `/__out/raw/${n}.png`, name: n })), ...made.map((f) => ({ src: `/__out/${f}`, name: f }))];
    const sheet = `<!doctype html><html><head><meta charset="utf-8"><style>
body { margin: 0; padding: 12px; background: #15161a; color: #ddd; font: 600 15px system-ui, sans-serif; width: 1976px; }
.g { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
figure { margin: 0; } img { width: 100%; display: block; background: repeating-conic-gradient(#333 0 25%, #444 0 50%) 0 0 / 16px 16px; }
figcaption { padding: 4px 2px 0; }
</style></head><body><div class="g">${items.map((i) => `<figure><img src="${i.src}"><figcaption>${i.name}</figcaption></figure>`).join('')}</div></body></html>`;
    writeFileSync(`${OUT}/contact.html`, sheet);
    await page.setViewport({ width: 2000, height: 800, deviceScaleFactor: 1 });
    await page.goto(`${URL0}/__out/contact.html`, { waitUntil: 'networkidle0' });
    const buf = await page.screenshot({ type: 'png', fullPage: true });
    await sharp(buf).jpeg({ quality: 80 }).toFile(`${OUT}/contact.jpg`);
    rmSync(`${OUT}/contact.html`, { force: true });
    console.log(`contact sheet: ${items.length} images`);
  }
  await page.close();
} finally {
  await browser.close();
  server.close();
}
console.log(`done in ${Math.round((Date.now() - t00) / 60000)} min${failed ? ' (with failures)' : ''}`);
process.exit(failed ? 1 : 0);

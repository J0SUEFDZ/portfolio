// Regenerates public/og-image.png and public/apple-touch-icon.png.
// Run with `npm run images` after changing the headline numbers or name.
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const home = JSON.parse(await readFile(new URL('../src/data/home.json', import.meta.url)));
const metrics = JSON.parse(await readFile(new URL('../src/data/metrics.json', import.meta.url)));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const font = 'font-family="DejaVu Sans, Arial, Helvetica, sans-serif"';

const tiles = metrics
  .map((m, i) => {
    const x = 80 + i * 265;
    return `
    <rect x="${x}" y="400" width="245" height="140" rx="18" fill="#5EEAD4" fill-opacity="0.07" stroke="#5EEAD4" stroke-opacity="0.25"/>
    <text x="${x + 22}" y="462" ${font} font-weight="700" font-size="30" fill="#5EEAD4">${esc(m.value)}</text>
    <text x="${x + 22}" y="502" ${font} font-size="18" fill="#A9BDBB">${esc(m.label)}</text>`;
  })
  .join('');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#061012"/><stop offset="0.5" stop-color="#0A1517"/><stop offset="1" stop-color="#16302F"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="92" cy="96" r="7" fill="#34D399"/>
  <text x="112" y="103" ${font} font-size="22" fill="#34D399">${esc(home.availability)} · ${esc(home.location)}</text>
  <text x="80" y="215" ${font} font-weight="700" font-size="72" fill="#F2FBF9">${esc(home.name)}</text>
  <text x="80" y="275" ${font} font-size="30" fill="#5EEAD4" letter-spacing="3">${esc(home.jobTitle.toUpperCase())}</text>
  <text x="80" y="335" ${font} font-size="26" fill="#A9BDBB">Ruby on Rails + React · De facto tech lead at Postmark</text>
  ${tiles}
</svg>`;

await sharp(Buffer.from(og)).png().toFile(new URL('../public/og-image.png', import.meta.url).pathname);

const icon = await readFile(new URL('../public/favicon.svg', import.meta.url));
await sharp(icon, { density: 300 }).resize(180, 180).png().toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname);

console.log('Wrote public/og-image.png and public/apple-touch-icon.png');

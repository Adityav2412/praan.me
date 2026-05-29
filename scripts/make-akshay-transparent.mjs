import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const inputPath = path.join(root, 'public', 'akshay-blend.png');
const outputPath = path.join(root, 'public', 'akshay-blend-transparent.png');

const CREAM = [245, 240, 232];
const T0 = 16;
const T1 = 48;

function distToCream(r, g, b) {
  const dr = r - CREAM[0];
  const dg = g - CREAM[1];
  const db = b - CREAM[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function luminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function unspill(r, g, b, alpha) {
  const a = alpha / 255;
  if (a <= 0.01) {
    return [0, 0, 0];
  }

  return [
    Math.min(255, Math.max(0, (r - CREAM[0] * (1 - a)) / a)),
    Math.min(255, Math.max(0, (g - CREAM[1] * (1 - a)) / a)),
    Math.min(255, Math.max(0, (b - CREAM[2] * (1 - a)) / a)),
  ];
}

const buffer = fs.readFileSync(inputPath);
const png = PNG.sync.read(buffer);

for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (png.width * y + x) << 2;
    const r = png.data[idx];
    const g = png.data[idx + 1];
    const b = png.data[idx + 2];

    const dist = distToCream(r, g, b);
    const lum = luminance(r, g, b);

    let alpha = Math.max(0, Math.min(255, ((dist - T0) / (T1 - T0)) * 255));

    if (lum < 195) {
      alpha = 255;
    } else if (lum < 235 && dist < T1) {
      alpha = Math.max(alpha, 100);
    }

    if (alpha < 8) {
      png.data[idx] = 0;
      png.data[idx + 1] = 0;
      png.data[idx + 2] = 0;
      png.data[idx + 3] = 0;
      continue;
    }

    const [nr, ng, nb] = unspill(r, g, b, alpha);
    png.data[idx] = Math.round(nr);
    png.data[idx + 1] = Math.round(ng);
    png.data[idx + 2] = Math.round(nb);
    png.data[idx + 3] = Math.round(alpha);
  }
}

fs.writeFileSync(outputPath, PNG.sync.write(png));
console.log(`Wrote ${outputPath} (${png.width}x${png.height})`);

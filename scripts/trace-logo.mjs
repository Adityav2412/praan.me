import fs from 'fs';
import potrace from 'potrace';
import sharp from 'sharp';

const inputPng = 'public/praan-logo-original.png';
const traceInput = 'public/praan-logo-trace-input.png';
const outputSvg = 'public/praan-logo-traced.svg';

await sharp(inputPng)
  .flatten({ background: '#ffffff' })
  .greyscale()
  .threshold(140)
  .png()
  .toFile(traceInput);

const svg = await new Promise((resolve, reject) => {
  potrace.trace(
    traceInput,
    {
      turdSize: 4,
      optCurve: true,
      optTolerance: 0.15,
      color: '#1B3A6B',
      background: 'transparent',
    },
    (err, result) => {
      if (err) reject(err);
      else resolve(result);
    }
  );
});

fs.writeFileSync(outputSvg, svg);
console.log('paths:', (svg.match(/<path/g) || []).length);
console.log('size:', svg.length);
console.log('written:', outputSvg);

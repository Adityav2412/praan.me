import { chromium } from 'playwright';
import { join } from 'path';

const browser = await chromium.launch();
const page = await browser.newPage();

for (const width of [1280, 1440, 1536, 1728, 1920]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const collision = await page.evaluate(() => {
    const logoLink = document.querySelector('nav a[aria-label="PRAAN home"]');
    const buttons = [...document.querySelectorAll('nav button')];
    if (!logoLink) return 'no logo';

    const lr = logoLink.getBoundingClientRect();
    for (const button of buttons) {
      const br = button.getBoundingClientRect();
      const overlap =
        lr.right > br.left &&
        lr.left < br.right &&
        lr.bottom > br.top &&
        lr.top < br.bottom;
      if (overlap) {
        return `overlap with "${button.textContent?.trim()}"`;
      }
    }
    return 'ok';
  });

  console.log(`${width}px: ${collision}`);
}

await browser.close();

import { chromium } from 'playwright';
import { join } from 'path';

const outDir = join(process.cwd(), 'screenshots-audit');
const browser = await chromium.launch();
const page = await browser.newPage();

const viewports = [
  { width: 1440, height: 900, filename: 'desktop-1440x900.png' },
  { width: 1920, height: 1080, filename: 'desktop-1920x1080.png' },
  { width: 390, height: 844, filename: 'mobile-390.png' },
];

for (const { width, height, filename } of viewports) {
  await page.setViewportSize({ width, height });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: join(outDir, filename), fullPage: false });
  console.log('Saved', filename);
}

for (const width of [1440, 1536, 1728, 1920]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  const result = await page.evaluate(() => {
    const logoLink = document.querySelector('nav a[aria-label="PRAAN home"]');
    const buttons = [...document.querySelectorAll('nav button')];
    const hero = document.querySelector('section img[alt="PRAAN"]');
    const heroTop = hero?.getBoundingClientRect().top ?? 0;
    const navBottom =
      document.querySelector('nav')?.getBoundingClientRect().bottom ?? 0;
    const gap = Math.round(heroTop - navBottom);

    if (!logoLink) {
      return { collision: 'no logo', hScroll: false, gap };
    }
    const lr = logoLink.getBoundingClientRect();
    for (const button of buttons) {
      const br = button.getBoundingClientRect();
      const overlap =
        lr.right > br.left &&
        lr.left < br.right &&
        lr.bottom > br.top &&
        lr.top < br.bottom;
      if (overlap) {
        return {
          collision: `overlap: ${button.textContent?.trim()}`,
          hScroll: document.documentElement.scrollWidth > window.innerWidth,
          gap,
        };
      }
    }
    return {
      collision: 'ok',
      hScroll: document.documentElement.scrollWidth > window.innerWidth,
      gap,
    };
  });

  console.log(
    `${width}px: ${result.collision}, hScroll=${result.hScroll}, nav-to-hero gap=${result.gap}px`
  );
}

await browser.close();

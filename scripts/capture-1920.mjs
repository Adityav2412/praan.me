import { chromium } from 'playwright';
import { join } from 'path';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);

const metrics = await page.evaluate(() => {
  const nav = document.querySelector('nav');
  const heroImg = document.querySelector('section img[alt="PRAAN"]');
  const navBottom = nav?.getBoundingClientRect().bottom ?? 0;
  const logo = heroImg?.getBoundingClientRect();
  const hScroll = document.documentElement.scrollWidth > window.innerWidth;

  return {
    navToLogoTop: logo ? Math.round(logo.top - navBottom) : null,
    logoFullyVisible:
      logo &&
      logo.top >= navBottom &&
      logo.left >= 0 &&
      logo.right <= window.innerWidth &&
      logo.bottom <= window.innerHeight,
    hScroll,
  };
});

console.log('Metrics:', metrics);

await page.screenshot({
  path: join('screenshots-audit', 'desktop-1920x1080.png'),
  fullPage: false,
});
console.log('Saved desktop-1920x1080.png');

await browser.close();

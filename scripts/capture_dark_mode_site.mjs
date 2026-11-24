import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire('C:/Users/msilveira/Documents/AJAVP-Gestao/package.json');
const { chromium } = require('playwright');

const FRAMES_DIR = 'C:/Users/msilveira/Documents/antigravity/radiant-salk/public/assets/video-promo-dark/frames';
fs.mkdirSync(FRAMES_DIR, { recursive: true });

const CAPTURES = [
  // Mobile (360x640 @ 3x => 1080x1920)
  { name: 'dark_hero_mobile.png', url: 'https://ajavp.pt/', width: 360, height: 640, scale: 3, scrollY: 0 },
  { name: 'dark_modalidades_mobile.png', url: 'https://ajavp.pt/modalidades', width: 360, height: 640, scale: 3, scrollY: 180 },
  { name: 'dark_noticias_mobile.png', url: 'https://ajavp.pt/noticias', width: 360, height: 640, scale: 3, scrollY: 120 },
  { name: 'dark_jif_mobile.png', url: 'https://ajavp.pt/jif', width: 360, height: 640, scale: 3, scrollY: 160 },
  { name: 'dark_classificacao_mobile.png', url: 'https://ajavp.pt/jif/classificacao', width: 360, height: 640, scale: 3, scrollY: 140 },

  // Desktop (1920x1080 @ 1x => 1920x1080)
  { name: 'dark_hero_desktop.png', url: 'https://ajavp.pt/', width: 1920, height: 1080, scale: 1, scrollY: 0 },
  { name: 'dark_modalidades_desktop.png', url: 'https://ajavp.pt/modalidades', width: 1920, height: 1080, scale: 1, scrollY: 160 },
  { name: 'dark_noticias_desktop.png', url: 'https://ajavp.pt/noticias', width: 1920, height: 1080, scale: 1, scrollY: 100 },
  { name: 'dark_jif_desktop.png', url: 'https://ajavp.pt/jif', width: 1920, height: 1080, scale: 1, scrollY: 150 },
  { name: 'dark_classificacao_desktop.png', url: 'https://ajavp.pt/jif/classificacao', width: 1920, height: 1080, scale: 1, scrollY: 120 },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const cap of CAPTURES) {
      const context = await browser.newContext({
        viewport: { width: cap.width, height: cap.height },
        deviceScaleFactor: cap.scale,
        colorScheme: 'dark',
        locale: 'pt-PT',
      });

      await context.addInitScript(() => {
        try {
          localStorage.setItem('theme', 'dark');
          localStorage.setItem('ajavp_cookie_consent_v1', 'granted');
        } catch (e) {}
        document.documentElement.classList.add('dark');
      });

      const page = await context.newPage();
      console.log(`A capturar ${cap.name} (${cap.url})...`);
      await page.goto(cap.url, { waitUntil: 'networkidle', timeout: 45000 });

      await page.evaluate((scrollY) => {
        try {
          localStorage.setItem('theme', 'dark');
          localStorage.setItem('ajavp_cookie_consent_v1', 'granted');
        } catch (e) {}
        document.documentElement.classList.add('dark');
        // Esconder eventuais banners de cookies / widgets flutuantes que tapem o conteúdo
        document.querySelectorAll('[id*="cookie"], [class*="cookie"]').forEach((el) => {
          if (el instanceof HTMLElement) el.style.display = 'none';
        });
        window.scrollTo(0, scrollY);
      }, cap.scrollY);

      await page.waitForTimeout(1600);

      const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      const outPath = path.join(FRAMES_DIR, cap.name);
      await page.screenshot({ path: outPath, fullPage: false });
      const sizeKB = (fs.statSync(outPath).size / 1024).toFixed(1);
      console.log(` -> ${cap.name} | html.dark=${isDark} | ${sizeKB} KB`);

      await context.close();
    }
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

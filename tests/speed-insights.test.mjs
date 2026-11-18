import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Speed Insights & Core Web Vitals: radiant-salk deve integrar @vercel/speed-insights com CSP e anti-CLS', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  assert.ok(pkg.dependencies['@vercel/speed-insights'], 'package.json deve conter @vercel/speed-insights');

  const layout = fs.readFileSync('app/layout.tsx', 'utf-8');
  assert.ok(layout.includes('@vercel/speed-insights/next'), 'app/layout.tsx deve importar SpeedInsights');
  assert.ok(layout.includes('<SpeedInsights />'), 'app/layout.tsx deve renderizar <SpeedInsights />');

  const nextConfig = fs.readFileSync('next.config.ts', 'utf-8');
  assert.ok(nextConfig.includes('https://va.vercel-scripts.com'), 'CSP deve autorizar va.vercel-scripts.com');
  assert.ok(nextConfig.includes('https://vitals.vercel-insights.com'), 'CSP deve autorizar vitals.vercel-insights.com');

  const banner = fs.readFileSync('components/layout/DynamicTopBanner.tsx', 'utf-8');
  assert.ok(banner.includes('min-h-[36px]') && banner.includes('flex-nowrap'), 'DynamicTopBanner deve ter altura fixa para evitar CLS');

  const agenda = fs.readFileSync('components/home/AgendaMatchCenter.tsx', 'utf-8');
  assert.ok(!agenda.includes('bg-emerald-600 dark:bg-emerald-500 text-white'), 'O Meu Escalão não deve usar bg-emerald-600 com texto branco (baixo contraste)');
});

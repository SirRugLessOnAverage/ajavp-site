import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Revalidação Site CMS: lib/revalidate.ts e /api/revalidate-site devem existir e proteger rotas', () => {
  const libContent = fs.readFileSync('lib/revalidate.ts', 'utf-8');
  assert.ok(libContent.includes('timingSafeEqual'), 'Deve usar timingSafeEqual na verificação do token');
  assert.ok(libContent.includes('ALLOWED_SITE_PATHS'), 'Deve restringir rotas permitidas por allowlist');
  assert.ok(libContent.includes("noticias: ['/', '/api/search-index']"), 'Deve mapear scope noticias');
  assert.ok(libContent.includes("modalidades: ['/modalidades']"), 'Deve mapear scope modalidades');

  const routeContent = fs.readFileSync('app/api/revalidate-site/route.ts', 'utf-8');
  assert.ok(routeContent.includes('verifyRevalidateRequest'), 'Rota deve validar token Bearer');
  assert.ok(routeContent.includes('revalidateAllowedPaths'), 'Rota deve revalidar apenas rotas permitidas');
});

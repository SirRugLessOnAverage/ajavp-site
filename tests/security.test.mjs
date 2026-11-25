import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  sanitizarHtmlEditorial,
  escapeHtmlText,
  verificarRateLimitMemoria,
  limparRateLimitMemoriaParaTestes,
} from '../lib/security.ts';

test('Sanitização HTML Editorial (Allowlist estrita anti-XSS)', () => {
  // Bloqueia vetores sem aspas, svg, script e javascript: URIs
  const malicioso =
    '<p onclick="alert(1)">Texto <strong>seguro</strong></p>' +
    '<img src=x onerror=alert(1)>' +
    '<svg/onload=alert(1)>x</svg>' +
    '<script>alert(1)</script>' +
    '<a href="javascript:alert(1)" onmouseover="alert(2)">Link mau</a> ' +
    '<a href="https://ajavp.pt" onclick="steal()">AJAVP</a>';

  const limpo = sanitizarHtmlEditorial(malicioso);

  assert.doesNotMatch(limpo, /onerror/i);
  assert.doesNotMatch(limpo, /onload/i);
  assert.doesNotMatch(limpo, /onclick/i);
  assert.doesNotMatch(limpo, /onmouseover/i);
  assert.doesNotMatch(limpo, /<script/i);
  assert.doesNotMatch(limpo, /<svg/i);
  assert.doesNotMatch(limpo, /<img/i);
  assert.doesNotMatch(limpo, /javascript:/i);

  assert.ok(limpo.includes('<p>Texto <strong>seguro</strong></p>'));
  assert.ok(limpo.includes('<a>Link mau</a>'));
  assert.ok(limpo.includes('<a href="https://ajavp.pt" target="_blank" rel="noopener noreferrer">AJAVP</a>'));
});

test('escapeHtmlText escapa caracteres perigosos em resumos de texto simples', () => {
  assert.equal(escapeHtmlText('<script>"x"</script>'), '&lt;script&gt;&quot;x&quot;&lt;/script&gt;');
});

test('verificarRateLimitMemoria bloqueia após limite e liberta após janela', () => {
  limparRateLimitMemoriaParaTestes();
  const base = 1_000_000;
  for (let i = 0; i < 3; i++) {
    const r = verificarRateLimitMemoria('dia_aberto', '198.51.100.1', 3, 60_000, base + i);
    assert.equal(r.allowed, true);
  }
  const blocked = verificarRateLimitMemoria('dia_aberto', '198.51.100.1', 3, 60_000, base + 10);
  assert.equal(blocked.allowed, false);

  const afterWindow = verificarRateLimitMemoria('dia_aberto', '198.51.100.1', 3, 60_000, base + 61_000);
  assert.equal(afterWindow.allowed, true);
});

test('Rotas públicas de noticias, dia-aberto e push-subscribe usam proteções lib/security', () => {
  const noticiaPage = fs.readFileSync('app/noticias/[slug]/page.tsx', 'utf-8');
  assert.ok(noticiaPage.includes('sanitizarHtmlEditorial'));
  assert.doesNotMatch(noticiaPage, /sanitizarHtmlBasico/);

  const diaAberto = fs.readFileSync('app/api/dia-aberto/route.ts', 'utf-8');
  assert.ok(diaAberto.includes('verificarRateLimitMemoria'));

  const pushSub = fs.readFileSync('app/api/push-subscribe/route.ts', 'utf-8');
  assert.ok(pushSub.includes('verificarRateLimitMemoria'));
});

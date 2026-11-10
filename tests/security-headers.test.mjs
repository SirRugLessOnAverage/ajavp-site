import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Segurança HTTP & CSP em next.config.ts', async (t) => {
  const configPath = path.resolve('next.config.ts');
  const content = fs.readFileSync(configPath, 'utf-8');

  await t.test('poweredByHeader deve estar definido como false para prevenir fuga de informação', () => {
    assert.match(
      content,
      /poweredByHeader:\s*false/,
      'O nextConfig deve desativar explicitamente o envio de X-Powered-By'
    );
  });

  await t.test('CSP não deve incluir unsafe-eval em produção', () => {
    assert.doesNotMatch(
      content,
      /script-src\s+'self'\s+'unsafe-eval'/,
      'script-src não deve conter unsafe-eval estático em produção'
    );
    assert.match(
      content,
      /isDev\s*\?\s*"'unsafe-eval'"\s*:\s*""/,
      'unsafe-eval deve estar restrito unicamente a ambiente de desenvolvimento'
    );
  });

  await t.test('CSP deve incluir object-src none para prevenir injeções de plugins/applets', () => {
    assert.match(
      content,
      /object-src\s+'none'/,
      'CSP deve conter a diretiva restritiva object-src none'
    );
  });

  await t.test('CSP deve conter frame-ancestors none e proteções essenciais', () => {
    assert.match(
      content,
      /frame-ancestors\s+'none'/,
      'CSP deve conter frame-ancestors none para prevenir clickjacking'
    );
    assert.match(
      content,
      /Strict-Transport-Security/,
      'Deve configurar HSTS com preload'
    );
    assert.match(
      content,
      /X-Content-Type-Options/,
      'Deve configurar nosniff'
    );
  });
});

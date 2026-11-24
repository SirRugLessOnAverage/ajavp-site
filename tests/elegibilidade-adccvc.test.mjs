import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Critérios de Elegibilidade ADCCVC nos Sócios e Atletas', async (t) => {
  const sociosPath = path.resolve('app/socios/page.tsx');
  const sociosContent = fs.readFileSync(sociosPath, 'utf-8');

  await t.test('Página de sócios deve indicar Ligação a Vila do Conde', () => {
    assert.match(
      sociosContent,
      /Ligação a Vila do Conde/,
      'O cartão de requisitos deve intitular-se "Ligação a Vila do Conde"'
    );
  });

  await t.test('Página de sócios deve incluir os 3 pilares concelhios + comunidade escolar', () => {
    assert.match(
      sociosContent,
      /natural,\s*residente\s*ou\s*recenseado\s*no\s*concelho\s*de\s*Vila\s*do\s*Conde/,
      'Deve referir natural, residente ou recenseado no concelho de Vila do Conde'
    );
    assert.match(
      sociosContent,
      /estudar\s*em\s*instituições\s*de\s*ensino\s*de\s*Vila\s*do\s*Conde/,
      'Deve referir estudar em instituições de ensino de Vila do Conde'
    );
    assert.match(
      sociosContent,
      /critérios\s*regulamentares\s*da\s*ADCCVC/,
      'Deve salvaguardar os critérios regulamentares da ADCCVC'
    );
  });

  await t.test('DiaAbertoForm deve manter opções consistentes com a elegibilidade ADCCVC', () => {
    const formPath = path.resolve('components/modalidades/DiaAbertoForm.tsx');
    const formContent = fs.readFileSync(formPath, 'utf-8');

    assert.match(formContent, /Residente ou recenseado em Vila do Conde/);
    assert.match(formContent, /Estuda em instituição de ensino de Vila do Conde/);
    assert.match(formContent, /Natural de Vila do Conde/);
  });
});

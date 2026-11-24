import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Comunicado 11 ADCCVC & Regulamento do Duatlo (05/12)', async (t) => {
  await t.test('Comunicados contém Circular 11 de 24/11/2026', () => {
    const content = fs.readFileSync(path.resolve('data/jif/comunicados.ts'), 'utf-8');
    assert.ok(content.includes("numberFormatted: '11'"), 'Deve incluir Circular 11');
    assert.ok(content.includes('135 Atletas • Cividade de Bagunte'), 'Deve incluir destaque de 135 atletas no Duatlo');
    assert.ok(content.includes('Novo Formato Sub-11'), 'Deve incluir novo formato Sub-11 do Torneio de Natal');
  });

  await t.test('Sub-7 3ª Jornada Aveleda x Bagunte corrigido para 1-1', () => {
    const content = fs.readFileSync(path.resolve('data/jif/futsal-jogos.ts'), 'utf-8');
    assert.ok(
      content.includes("{ time: '10:15', category: 'Sub-7', homeTeam: 'Aveleda', awayTeam: 'Bagunte', score: '1-1'"),
      'Resultado Aveleda x Bagunte deve ser 1-1'
    );
    assert.ok(!content.includes("homeTeam: 'Aveleda', awayTeam: 'Bagunte', score: '1-11'"), 'Resultado antigo 1-11 não deve existir');
  });

  await t.test('Calendário JIF atualizado (Duatlo 09h30, Natal Sub-11 e Atletismo em Arcos)', () => {
    const content = fs.readFileSync(path.resolve('data/jif/calendario.ts'), 'utf-8');
    assert.ok(content.includes('09h30 (início pelos Livres)'), 'Duatlo deve iniciar às 09h30');
    assert.ok(content.includes('Torneio de Natal Sub-11'), 'Torneio de Natal deve indicar Sub-11');
    assert.ok(content.includes('Freguesia de Arcos, Vila do Conde'), 'Atletismo de 09/01/2027 deve indicar Freguesia de Arcos');
  });

  await t.test('Módulo Duatlo e componente JifRegulamentoDuatlo integrados em app/jif/page.tsx', () => {
    const duatloData = fs.readFileSync(path.resolve('data/jif/duatlo.ts'), 'utf-8');
    const duatloComp = fs.readFileSync(path.resolve('components/jif/JifRegulamentoDuatlo.tsx'), 'utf-8');
    const jifPage = fs.readFileSync(path.resolve('app/jif/page.tsx'), 'utf-8');

    assert.ok(duatloData.includes('Capacete Homologado no BTT'), 'Deve incluir regra de capacete homologado');
    assert.ok(duatloData.includes('descida de 3 (mínimo) a 5 lugares'), 'Deve incluir penalização regulamentar');
    assert.ok(duatloComp.includes('id="duatlo"'), 'Componente deve expor âncora #duatlo');
    assert.ok(jifPage.includes('<JifRegulamentoDuatlo />'), 'Página /jif deve renderizar JifRegulamentoDuatlo');
  });

  await t.test('Notícia do Comunicado 11 & Duatlo presente com ligação para /jif#duatlo', () => {
    const newsContent = fs.readFileSync(path.resolve('components/home/NoticiasSection.tsx'), 'utf-8');
    assert.ok(newsContent.includes('comunicado-11-duatlo-bagunte-e-torneio-natal-sub11'), 'Slug da notícia do Comunicado 11 presente');
    assert.ok(newsContent.includes('/jif#duatlo'), 'Encaminhamento para /jif#duatlo presente');
  });
});

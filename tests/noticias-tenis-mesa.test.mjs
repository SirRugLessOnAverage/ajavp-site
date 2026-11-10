import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Validação da Notícia de Ténis de Mesa', async (t) => {
  await t.test('Ficheiro NoticiasSection.tsx contém a notícia de Ténis de Mesa', () => {
    const filePath = path.resolve('components/home/NoticiasSection.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    assert.ok(content.includes('fallback-n0'), 'Deverá conter o id fallback-n0');
    assert.ok(content.includes('vitoria-historica-1o-encontro-tenis-de-mesa-xl-jif'), 'Deverá conter o slug correto');
    assert.ok(content.includes('Ténis de Mesa • JIF'), 'Deverá conter a categoria Ténis de Mesa • JIF');
    assert.ok(content.includes('54 Pontos'), 'Deverá referir os 54 Pontos conquistados');
    assert.ok(content.includes('9 Pódios'), 'Deverá referir os 9 Pódios');
  });

  await t.test('Imagem de capa da notícia de Ténis de Mesa existe no disco', () => {
    const imagePath = path.resolve('public/assets/images/galeria/tenis-mesa/tenis_mesa_2026_medalhados_tarde_ajavp.webp');
    assert.ok(fs.existsSync(imagePath), 'A imagem de capa deve existir em public/assets/images/galeria/tenis-mesa/');
  });

  await t.test('Encaminhamento getNoticiaLink inclui rota para Ténis de Mesa', () => {
    const filePath = path.resolve('components/home/NoticiasSection.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    assert.ok(content.includes('/jif/classificacao#tenis-de-mesa'), 'Deverá encaminhar para /jif/classificacao#tenis-de-mesa');
    assert.ok(content.includes('Ver Quadro de Honra Ténis de Mesa'), 'Deverá ter o label correto');
  });

  await t.test('Comunicados JIF contém a Circular 09 sobre o Ténis de Mesa', () => {
    const filePath = path.resolve('data/jif/comunicados.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    assert.ok(content.includes("numberFormatted: '09'"), 'Deverá conter a Circular 09');
    assert.ok(content.includes('Ténis Mesa & 9 Pódios'), 'Deverá conter o badge de Ténis de Mesa');
    assert.ok(content.includes('1º Lugar Coletivo Geral (14 Pontos)'), 'Deverá destacar a vitória coletiva de 14 pontos');
    assert.ok(content.includes('54 pontos'), 'Deverá mencionar os 54 pontos');
  });
});

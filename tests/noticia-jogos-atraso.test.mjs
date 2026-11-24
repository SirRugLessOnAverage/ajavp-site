import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Notícia de Remarcação dos Jogos em Atraso + Imagem Oficial', async (t) => {
  await t.test('Imagem de capa foi gerada e existe no caminho público esperado', () => {
    const imgPath = path.resolve('public/assets/images/noticias/jogos-atraso-5a-jornada-mindelo.png');
    assert.ok(fs.existsSync(imgPath), 'A imagem jogos-atraso-5a-jornada-mindelo.png deve existir em public/assets/images/noticias/');
    const stats = fs.statSync(imgPath);
    assert.ok(stats.size > 10000, 'A imagem gerada deve ter tamanho válido (>10KB)');
  });

  await t.test('NoticiasSection.tsx contém a nova notícia completa no topo de FALLBACK_NOTICIAS', () => {
    const filePath = path.resolve('components/home/NoticiasSection.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    assert.ok(content.includes('remarcacao-jogos-atraso-5a-jornada-mindelo-2027'), 'Deve conter o slug da nova notícia');
    assert.ok(content.includes('/assets/images/noticias/jogos-atraso-5a-jornada-mindelo.png'), 'Deve apontar para a imagem gerada');
    assert.ok(content.includes('02 de Janeiro de 2027'), 'Deve detalhar os jogos de 02 de Janeiro de 2027');
    assert.ok(content.includes('08h45 • Sub-11:'), 'Deve detalhar horário 08h45 Sub-11');
    assert.ok(content.includes('09h45 • Sub-9:'), 'Deve detalhar horário 09h45 Sub-9');
  });

  await t.test('lib/noticias.ts faz merge entre Supabase e FALLBACK_NOTICIAS por slug e app/page.tsx usa-o', () => {
    const libPath = path.resolve('lib/noticias.ts');
    const libContent = fs.readFileSync(libPath, 'utf-8');
    const homePath = path.resolve('app/page.tsx');
    const homeContent = fs.readFileSync(homePath, 'utf-8');

    assert.ok(libContent.includes('porSlug.set(fallback.slug, fallback)'), 'Deve combinar notícias locais recentes com as do Supabase');
    assert.ok(libContent.includes('db.localeCompare(da)'), 'Deve ordenar cronologicamente por data de publicação');
    assert.ok(homeContent.includes('obterNoticiasPublicadas(6)'), 'A Homepage deve usar obterNoticiasPublicadas para exibir notícias combinadas');
  });
});

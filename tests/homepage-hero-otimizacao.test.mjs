import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Otimização da 1ª Página (Homepage AJAVP)', async (t) => {
  await t.test('JifLiveTicker não deve ter banner duplicado de Ténis de Mesa', () => {
    const filePath = path.resolve('components/home/JifLiveTicker.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    assert.ok(
      !content.includes('Vilar do Pinheiro Vence o 1º Encontro de Ténis de Mesa!'),
      'O banner duplicado de Ténis de Mesa deve ter sido removido do topo de JifLiveTicker'
    );
    assert.ok(
      content.includes('Próximas Provas em Calendário'),
      'JifLiveTicker deve renderizar diretamente as Próximas Provas'
    );
  });

  await t.test('Hero da Homepage deve consolidar o Ténis de Mesa e destacar a 4ª Jornada de Futsal', () => {
    const filePath = path.resolve('app/page.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Cartão único de Ténis de Mesa no Hero
    assert.ok(
      content.includes('AJAVP Campeã do Encontro com 1º Lugar Geral e 9 Pódios!'),
      'O Hero deve manter o destaque oficial da vitória no Ténis de Mesa'
    );

    // Bloco direito dinâmico com os próximos jogos da AJAVP via obterDadosFutsal
    assert.ok(content.includes('obterDadosFutsal'), 'Hero deve obter a próxima jornada dinamicamente via obterDadosFutsal');
    assert.ok(content.includes('Próxima Jornada'), 'Deve apresentar o cartão da Próxima Jornada');
    assert.ok(content.includes('formatarNomeEquipa'), 'Deve normalizar o nome das equipas no cartão do Hero');
    assert.ok(content.includes('JIF_MASTER_EVENTS.length'), 'Deve calcular dinamicamente o número de provas no calendário');

    // Atalhos essenciais
    assert.ok(content.includes('/jif/futsal'), 'Deve manter link para resultados de futsal');
    assert.ok(content.includes('/jif/classificacao'), 'Deve manter link para classificação');
    assert.ok(content.includes('/jif#calendario'), 'Deve manter link para calendário');
  });
});

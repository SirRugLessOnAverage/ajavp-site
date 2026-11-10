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

    // Bloco direito com os próximos jogos da AJAVP em Fajozes
    assert.ok(content.includes('Próxima Jornada') && content.includes('14 Nov'), 'Deve destacar a data da 4ª jornada');
    assert.ok(content.includes('Pav. Fajozes'), 'Deve indicar o Pavilhão de Fajozes');
    assert.ok(content.includes('Fajozes vs AJAVP'), 'Deve listar o jogo dos Sub-13');
    assert.ok(content.includes('08h45'), 'Deve indicar o horário dos Sub-13');
    assert.ok(content.includes('Árvore vs AJAVP'), 'Deve listar o jogo dos Sub-11');
    assert.ok(content.includes('09h45'), 'Deve indicar o horário dos Sub-11');

    // Atalhos essenciais
    assert.ok(content.includes('/jif/futsal'), 'Deve manter link para resultados de futsal');
    assert.ok(content.includes('/jif/classificacao'), 'Deve manter link para classificação');
    assert.ok(content.includes('/jif#calendario'), 'Deve manter link para calendário');
  });
});

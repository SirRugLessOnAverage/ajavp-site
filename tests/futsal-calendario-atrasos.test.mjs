import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Atualização do Calendário de Futsal & Jogos em Atraso', async (t) => {
  const jogosPath = path.resolve('data/jif/futsal-jogos.ts');
  const jogosContent = fs.readFileSync(jogosPath, 'utf-8');

  const calPath = path.resolve('data/jif/calendario.ts');
  const calContent = fs.readFileSync(calPath, 'utf-8');

  await t.test('Taça Concelhia (28/11) tem horário corrigido para 08:45 e inclui Árvore x Fornelo às 11:45', () => {
    assert.ok(
      jogosContent.includes("{ time: '08:45', category: 'Sub-11', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Tougues'"),
      'Jogo da AJAVP Sub-11 a 28/11 deve estar às 08:45'
    );
    assert.ok(
      jogosContent.includes("{ time: '11:45', category: 'Sub-11', homeTeam: 'Árvore', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false, notes: 'Jogo adiado 5ª Jornada' }"),
      'Jogo adiado Árvore x Fornelo deve estar exclusivamente em 28/11 às 11:45 em Fajozes'
    );
  });

  await t.test('Jornada de Jogos em Atraso (02/01/2027) contém os jogos adiados em Mindelo', () => {
    assert.ok(jogosContent.includes("date: '2027-01-02'"), 'Deve existir jornada de jogos em atraso a 2027-01-02');
    assert.ok(
      jogosContent.includes("{ time: '08:45', category: 'Sub-11', homeTeam: 'Gião', awayTeam: 'Vilar do Pinheiro'"),
      'Sub-11 Gião x Vilar do Pinheiro às 08:45'
    );
    assert.ok(
      jogosContent.includes("{ time: '09:45', category: 'Sub-9', homeTeam: 'Junqueira', awayTeam: 'Vilar do Pinheiro'"),
      'Sub-9 Junqueira x Vilar do Pinheiro às 09:45'
    );
  });

  await t.test('Novas jornadas (6ª 12/12, Sub-9 19/12, 7ª 16/01 e 8ª 30/01) estão presentes em FUTSAL_JORNADAS', () => {
    assert.ok(jogosContent.includes("date: '2026-12-12'"), 'Deve incluir 6ª Jornada (12/12/2026)');
    assert.ok(jogosContent.includes("date: '2026-12-19'"), 'Deve incluir Sub-9 & Torneio de Natal (19/12/2026)');
    assert.ok(jogosContent.includes("date: '2027-01-16'"), 'Deve incluir 7ª Jornada (16/01/2027)');
    assert.ok(jogosContent.includes("date: '2027-01-30'"), 'Deve incluir 8ª Jornada (30/01/2027)');
    assert.ok(jogosContent.includes('Pavilhão de Macieira'), 'Deve incluir Pavilhão de Macieira');
  });

  await t.test('JIF_MASTER_EVENTS inclui 12/12, 08h45 em 28/11 e detalhes dos Jogos em Atraso em 02/01/2027', () => {
    assert.ok(calContent.includes('08h45 (Sub-11 AJAVP vs Tougues)'), '28/11 deve estar às 08h45');
    assert.ok(calContent.includes("date: '2026-12-12'"), 'Calendário deve incluir 6ª Jornada em 12/12/2026');
    assert.ok(calContent.includes('Jogos em Atraso 5ª Jorn. em Mindelo'), 'Calendário de 02/01/2027 deve detalhar Jogos em Atraso em Mindelo');
  });

  await t.test('Notícia da 5ª Jornada reflete a remarcação oficial para 02 de Janeiro em Mindelo', () => {
    const newsPath = path.resolve('components/home/NoticiasSection.tsx');
    const newsContent = fs.readFileSync(newsPath, 'utf-8');
    assert.ok(
      newsContent.includes('02 de janeiro de 2027 no Pavilhão de Mindelo'),
      'A notícia deve informar a nova data oficial em Mindelo'
    );
  });
});

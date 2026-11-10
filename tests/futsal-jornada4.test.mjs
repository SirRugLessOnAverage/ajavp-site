import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Futsal Hub: jif-futsal.json deve ter 4ª jornada ativa e jogos de Fajozes', () => {
  const content = fs.readFileSync('public/assets/data/jif-futsal.json', 'utf-8');
  const data = JSON.parse(content);

  assert.equal(data.jornadaAtiva, 4, 'jornadaAtiva deve ser 4');
  assert.ok(data.destaqueSemana.titulo.includes('Fajozes'), 'Destaque deve focar Fajozes');
  
  // Próxima jornada
  const ajavpMatches = data.proximaJornada.jogosAjavp;
  assert.ok(ajavpMatches.length >= 2, 'Deve ter jogos da AJAVP listados');
  const sub13 = ajavpMatches.find(m => m.escalao === 'Sub-13');
  assert.ok(sub13 && sub13.hora === '08h45', 'Sub-13 deve jogar às 08h45 em Fajozes');
  const sub11 = ajavpMatches.find(m => m.escalao === 'Sub-11');
  assert.ok(sub11 && sub11.hora === '09h45', 'Sub-11 deve jogar às 09h45 em Fajozes');

  // Jornada 3 concluída com resultados
  const j3 = data.jornadas.find(j => j.numero === 3);
  assert.ok(j3, 'Deve existir Jornada 3');
  assert.equal(j3.estado, 'Concluída', 'Jornada 3 deve estar Concluída');
});

test('Calendário JIF: Master Events deve incluir 4ª e 5ª jornada e Taça com horários oficiais', () => {
  const content = fs.readFileSync('data/jif/calendario.ts', 'utf-8');

  assert.ok(content.includes('AJAVP em Fajozes (Sub-13 às 08h45 vs Fajozes e Sub-11 às 09h45 vs Árvore)'), 'Evento 14/Nov deve detalhar jogos em Fajozes');
  assert.ok(content.includes('Taça Concelhia (1ª Eliminatória Sub-11 AJAVP vs Tougues às 09h00)'), 'Evento 28/Nov deve detalhar Taça');
});


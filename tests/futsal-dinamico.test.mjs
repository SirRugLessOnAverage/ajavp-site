import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Motor Dinâmico de Jornadas: data-service.ts deve resolver jornada ativa e estados por data civil', () => {
  const content = fs.readFileSync('lib/jif/data-service.ts', 'utf-8');

  assert.ok(
    content.includes('export function obterDataHojePortugal'),
    'Deve exportar obterDataHojePortugal com timezone Europe/Lisbon'
  );
  assert.ok(
    content.includes("timeZone: 'Europe/Lisbon'"),
    'Data civil deve usar explicitamente o fuso horário Europe/Lisbon'
  );
  assert.ok(
    content.includes('export function resolverEstadoDinamicoFutsal'),
    'Deve exportar resolverEstadoDinamicoFutsal'
  );
  assert.ok(
    !content.includes('fj.number < 4'),
    'Não deve ter condição hardcoded fj.number < 4'
  );
  assert.ok(
    !content.includes('Math.max(...concluidas)'),
    'Não deve forçar jornadaAtiva para a última concluída com Math.max(...concluidas)'
  );
  assert.ok(
    content.includes("meta.date < todayStr ? 'Concluída' : 'Agendada'"),
    'Estado da jornada deve transitar automaticamente à meia-noite após a data oficial (meta.date < todayStr)'
  );
  assert.ok(
    content.includes('resolverEstadoDinamicoFutsal(base)') &&
      content.includes('resolverEstadoDinamicoFutsal(hubCalculado)'),
    'Tanto o caminho Supabase IA como o fallback devem aplicar resolverEstadoDinamicoFutsal'
  );
});

test('Homepage Destaque Competitivo: deve exibir todos os escalões da AJAVP incluindo Sub-7 sem truncagem', () => {
  const content = fs.readFileSync('app/page.tsx', 'utf-8');

  assert.ok(
    content.includes('futsalData.jornadaAtiva'),
    'Homepage deve priorizar a jornadaAtiva resolvida dinamicamente'
  );
  assert.ok(
    !content.includes('proximosJogosAjavp.slice(0, 3)'),
    'Não deve truncar proximosJogosAjavp com .slice(0, 3), para nunca ocultar o jogo de Sub-7'
  );
  assert.ok(
    content.includes('proximosJogosAjavp.map'),
    'Deve renderizar todos os jogos da AJAVP na jornada ativa'
  );
  assert.ok(
    content.includes('.sort((a, b) =>'),
    'Deve ordenar cronologicamente os jogos por hora'
  );
});

test('Calendário Futsal J5 (2026-11-21): deve conter os 4 escalões da AJAVP incluindo Sub-7 em Caxinas', () => {
  const content = fs.readFileSync('data/jif/futsal-jogos.ts', 'utf-8');

  assert.ok(content.includes("date: '2026-11-21'"), '5ª Jornada deve ter data 2026-11-21');
  assert.ok(
    content.includes("{ time: '11:00', category: 'Sub-7', homeTeam: 'Tougues', awayTeam: 'Vilar do Pinheiro', score: '8-6', isCompleted: true, isAjavp: true }"),
    '5ª Jornada deve incluir Sub-7 vs Tougues às 11:00 em Caxinas com resultado 8-6'
  );
  assert.ok(
    content.includes("{ time: '10:00', category: 'Sub-9', homeTeam: 'Junqueira', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true, notes: 'Adiado' }"),
    '5ª Jornada deve incluir Sub-9 vs Junqueira às 10:00 marcado como Adiado'
  );
  assert.ok(
    content.includes("{ time: '11:00', category: 'Sub-11', homeTeam: 'Gião', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true, notes: 'Adiado' }"),
    '5ª Jornada deve incluir Sub-11 vs Gião às 11:00 marcado como Adiado'
  );
  assert.ok(
    content.includes("{ time: '09:00', category: 'Sub-13', homeTeam: 'Mosteiró', awayTeam: 'Vilar do Pinheiro', score: '8-2', isCompleted: true, isAjavp: true }"),
    '5ª Jornada deve incluir Sub-13 vs Mosteiró às 09:00 com resultado 8-2'
  );
});

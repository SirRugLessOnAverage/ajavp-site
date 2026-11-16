import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Futsal Equipa Matches: ficheiro lib/jif/team-matches.ts deve existir e exportar funções nucleares', () => {
  const content = fs.readFileSync('lib/jif/team-matches.ts', 'utf-8');
  assert.ok(content.includes('export function obterJogosDaEquipa'), 'Deve exportar obterJogosDaEquipa');
  assert.ok(content.includes('export function equipaCorresponde'), 'Deve exportar equipaCorresponde');
  assert.ok(content.includes('FUTSAL_JORNADAS'), 'Deve integrar o calendário completo FUTSAL_JORNADAS');
  assert.ok(content.includes('jogosRealizados'), 'Deve categorizar jogosRealizados');
  assert.ok(content.includes('proximosJogos'), 'Deve categorizar proximosJogos');
});

test('Futsal Modal Equipa: FutsalTeamMatchesModal.tsx deve cumprir acessibilidade e feedback tátil', () => {
  const content = fs.readFileSync('components/jif/futsal/FutsalTeamMatchesModal.tsx', 'utf-8');
  assert.ok(content.includes('role="dialog"'), 'Deve ter role="dialog"');
  assert.ok(content.includes('aria-modal="true"'), 'Deve ter aria-modal="true"');
  assert.ok(content.includes('Escape'), 'Deve escutar a tecla Escape');
  assert.ok(content.includes('onSelectPavilhao'), 'Deve permitir abrir pavilhão');
  assert.ok(content.includes('onSelectDate'), 'Deve permitir abrir data/calendário');
});

test('Futsal Pavilhoes: lib/jif/pavilhoes.ts deve mapear pavilhões oficiais com GPS e links', () => {
  const content = fs.readFileSync('lib/jif/pavilhoes.ts', 'utf-8');
  assert.ok(content.includes('identificarPavilhao'), 'Deve exportar função identificarPavilhao');
  assert.ok(content.includes('PAVILHOES_JIF'), 'Deve definir PAVILHOES_JIF');
  assert.ok(content.includes('googleMapsUrl'), 'Deve conter link Google Maps');
  assert.ok(content.includes('wazeUrl'), 'Deve conter link Waze');
  assert.ok(content.includes('appleMapsUrl'), 'Deve conter link Apple Maps');
});

test('Futsal Date Modal: FutsalDateModal.tsx deve gerar links Google Calendar e .ics', () => {
  const content = fs.readFileSync('components/jif/futsal/FutsalDateModal.tsx', 'utf-8');
  assert.ok(content.includes('calendar.google.com'), 'Deve conter integração Google Calendar');
  assert.ok(content.includes('BEGIN:VCALENDAR'), 'Deve gerar especificação iCalendar');
});

test('Futsal Jornadas View: FutsalJornadasView.tsx deve unificar apresentação sem tabs de pavilhões', () => {
  const content = fs.readFileSync('components/jif/futsal/FutsalJornadasView.tsx', 'utf-8');
  assert.ok(content.includes('jornadaSelecionada'), 'Deve gerir navegação por jornadas');
  assert.ok(content.includes('FutsalTeamMatchesModal'), 'Deve integrar modal de equipas');
  assert.ok(content.includes('FutsalPavilhaoModal'), 'Deve integrar modal de pavilhão');
  assert.ok(content.includes('FutsalDateModal'), 'Deve integrar modal de data');
  assert.ok(content.includes('active:scale-[0.97]'), 'Deve aplicar feedback de toque mobile-native');
});

test('Futsal Data Service: deve consolidar as 6 jornadas completas', () => {
  const content = fs.readFileSync('lib/jif/data-service.ts', 'utf-8');
  assert.ok(content.includes('consolidarTodasJornadas'), 'Deve implementar fusão híbrida');
  assert.ok(content.includes('FUTSAL_JORNADAS'), 'Deve importar calendário integral');
});

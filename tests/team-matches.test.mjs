import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Futsal Equipa Matches: ficheiro lib/jif/team-matches.ts deve existir e exportar funções nucleares', () => {
  const content = fs.readFileSync('lib/jif/team-matches.ts', 'utf-8');
  assert.ok(content.includes('export function obterJogosDaEquipa'), 'Deve exportar obterJogosDaEquipa');
  assert.ok(content.includes('export function equipaCorresponde'), 'Deve exportar equipaCorresponde');
  assert.ok(content.includes('export function formatarNomeEquipa'), 'Deve exportar formatarNomeEquipa');
  assert.ok(content.includes('export function chaveCanonicaEquipa'), 'Deve exportar chaveCanonicaEquipa');
  assert.ok(content.includes('export function normalizarEscalaoJogo'), 'Deve exportar normalizarEscalaoJogo');
  assert.ok(content.includes('FUTSAL_JORNADAS'), 'Deve integrar o calendário completo FUTSAL_JORNADAS');
  assert.ok(content.includes('jogosRealizados'), 'Deve categorizar jogosRealizados');
  assert.ok(content.includes('proximosJogos'), 'Deve categorizar proximosJogos');
  assert.ok(content.includes('escaloesDisponiveis'), 'Deve mapear escaloesDisponiveis');
});

test('Futsal Deduplicação e Escalões: lib/jif/team-matches.ts deve deduplicar por chave canónica e filtrar escalões válidos', () => {
  const content = fs.readFileSync('lib/jif/team-matches.ts', 'utf-8');
  assert.ok(content.includes('chaveCanonicaEquipa(m.homeTeam)'), 'matchId Base deve usar chaveCanonicaEquipa');
  assert.ok(content.includes('chaveCanonicaEquipa(jogo.casa)'), 'matchId Hub deve usar chaveCanonicaEquipa');
  assert.ok(content.includes('(ORDEM_ESCALOES as readonly string[]).includes(m.escalao)'), 'escaloesDisponiveis deve aceitar apenas escalões oficiais (sem Futsal)');
  assert.ok(content.includes("'AJAVP (Vilar do Pinheiro)'"), 'Deve retornar nome padronizado para AJAVP');
  assert.ok(content.includes("'Touguinha Touguinhó'"), 'Deve padronizar Touguinha/Touguinhó');
  assert.ok(content.includes("'Outeiro Maior'"), 'Deve padronizar Outeiro Maior');
});

test('Futsal JSON Fallback: jogos de Caxinas (Sub-7) na 2ª Jornada devem ter escalao Sub-7 explícito', () => {
  const json = JSON.parse(fs.readFileSync('public/assets/data/jif-futsal.json', 'utf-8'));
  const j2 = json.jornadas.find((j) => j.numero === 2);
  assert.ok(j2, '2ª Jornada deve existir no JSON');
  const caxinas = j2.pavilhoes.find((p) => p.nome.includes('Caxinas'));
  assert.ok(caxinas && caxinas.jogos.length === 8, 'Caxinas na J2 deve ter 8 jogos Sub-7');
  assert.ok(
    caxinas.jogos.every((g) => g.escalao === 'Sub-7'),
    'Todos os jogos de Caxinas na J2 devem ter escalao Sub-7 explícito'
  );
});

test('Futsal Modal Equipa: FutsalTeamMatchesModal.tsx deve cumprir acessibilidade, feedback tátil e pills de escalão', () => {
  const content = fs.readFileSync('components/jif/futsal/FutsalTeamMatchesModal.tsx', 'utf-8');
  assert.ok(content.includes('role="dialog"'), 'Deve ter role="dialog"');
  assert.ok(content.includes('aria-modal="true"'), 'Deve ter aria-modal="true"');
  assert.ok(content.includes('Escape'), 'Deve escutar a tecla Escape');
  assert.ok(content.includes('escalaoAtivo'), 'Deve gerir estado escalaoAtivo');
  assert.ok(content.includes('escaloesDisponiveis'), 'Deve renderizar pills dos escaloes disponíveis');
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
  assert.ok(content.includes('formatarNomeEquipa'), 'Deve aplicar formatarNomeEquipa');
});

test('Futsal Jornadas View: FutsalJornadasView.tsx deve unificar apresentação sem tabs de pavilhões', () => {
  const content = fs.readFileSync('components/jif/futsal/FutsalJornadasView.tsx', 'utf-8');
  assert.ok(content.includes('jornadaSelecionada'), 'Deve gerir navegação por jornadas');
  assert.ok(content.includes('modalEquipa'), 'Deve gerir estado modalEquipa');
  assert.ok(content.includes('formatarNomeEquipa'), 'Deve usar formatarNomeEquipa nos confrontos');
  assert.ok(content.includes('normalizarEscalaoJogo'), 'Deve inferir escalão com normalizarEscalaoJogo');
  assert.ok(content.includes('FutsalTeamMatchesModal'), 'Deve integrar modal de equipas');
  assert.ok(content.includes('FutsalPavilhaoModal'), 'Deve integrar modal de pavilhão');
  assert.ok(content.includes('FutsalDateModal'), 'Deve integrar modal de data');
  assert.ok(content.includes('active:scale-[0.97]'), 'Deve aplicar feedback de toque mobile-native');
});

test('Futsal Classificações: deve aplicar formatarNomeEquipa às equipas dos escalões', () => {
  const content = fs.readFileSync('components/jif/futsal/FutsalClassificacoes.tsx', 'utf-8');
  assert.ok(content.includes('formatarNomeEquipa'), 'Deve importar e aplicar formatarNomeEquipa');
});

test('Futsal Data Service: deve reconciliar jogos extraídos nas jornadas existentes sem duplicar jornadas', () => {
  const content = fs.readFileSync('lib/jif/data-service.ts', 'utf-8');
  assert.ok(content.includes('export function consolidarTodasJornadas'), 'Deve exportar consolidarTodasJornadas');
  assert.ok(content.includes('export function adaptarExtractedParaFutsal'), 'Deve exportar adaptarExtractedParaFutsal');
  assert.ok(content.includes('chaveConfronto'), 'Deve usar chaveConfronto com chaves canónicas');
  assert.ok(content.includes('chaveCanonicaEquipa'), 'Deve importar e usar chaveCanonicaEquipa');
  assert.ok(content.includes('FUTSAL_JORNADAS'), 'Deve importar calendário integral');
  assert.ok(!content.includes('(FUTSAL_DATA.jornadaAtiva || 1) + 1'), 'Não deve criar jornada artificial incremental para jogos extraídos');
});

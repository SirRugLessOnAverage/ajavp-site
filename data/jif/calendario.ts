export interface JifEvent {
  id: number;
  date: string; // YYYY-MM-DD
  day: string;
  month: string;
  sport: 'atletismo' | 'futsal' | 'futebol' | 'tenis-mesa' | 'duatlo' | 'badminton futsal' | 'praia' | 'all';
  title: string;
  location: string;
  time: string;
  badge?: string;
}

export const JIF_MASTER_EVENTS: JifEvent[] = [
  { id: 1, date: '2026-10-03', day: '03', month: 'OUT', sport: 'atletismo', title: 'Corta-Mato (Abertura Oficial dos JIF)', location: 'Espaço Agros', time: '10h00 às 12h30' },
  { id: 2, date: '2026-10-10', day: '10', month: 'OUT', sport: 'futsal', title: 'Futsal • 1ª Jornada do Campeonato', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 3, date: '2026-10-17', day: '17', month: 'OUT', sport: 'futebol', title: '1º Torneio de Futebol dos XL JIF • 6º Lugar Geral & Sub-11 no Pódio 🥉', location: 'Parque de Jogos de Retorta', time: 'Sub-11 em 3º Lugar (Bronze)' },
  { id: 4, date: '2026-10-24', day: '24', month: 'OUT', sport: 'futsal', title: 'Futsal • 2ª Jornada do Campeonato • Estreia Sub-7 em Caxinas', location: 'Pavilhões de Caxinas (C2), Modivas e Canidelo', time: '09h00 às 12h00' },
  { id: 5, date: '2026-10-31', day: '31', month: 'OUT', sport: 'futsal', title: 'Futsal • 3ª Jornada do Campeonato', location: 'Pavilhão de Canidelo', time: '08h45 às 11h30' },
  { id: 6, date: '2026-11-07', day: '07', month: 'NOV', sport: 'futsal', title: 'Futsal • 4ª Jornada & Inscrições Ténis de Mesa', location: 'Pavilhão de Fajozes', time: '08h45 às 10h45' },
  { id: 7, date: '2026-11-14', day: '14', month: 'NOV', sport: 'tenis-mesa', title: 'Ténis de Mesa • 1º Encontro Concelhio', location: 'Casa da Juventude de Guilhabreu', time: 'Manhã 9h30-12h30 | Tarde 14h30-17h30' },
  { id: 8, date: '2026-11-21', day: '21', month: 'NOV', sport: 'futsal', title: 'Futsal • 5ª Jornada & Sub-7 em Caxinas', location: 'Pavilhões de Canidelo, Fajozes e Caxinas', time: '09h00 às 12h00' },
  { id: 9, date: '2026-11-28', day: '28', month: 'NOV', sport: 'futsal', title: 'Futsal • 6ª Jornada & Taça JIF (Sub-11)', location: 'Pavilhão de Mindelo e Modivas', time: '09h00 às 12h30' },
  { id: 10, date: '2026-12-05', day: '05', month: 'DEZ', sport: 'duatlo', title: 'Duatlo • 1ª Prova Individual dos XL JIF', location: 'Freguesia a designar', time: '09h00 às 12h30' },
  { id: 11, date: '2026-12-12', day: '12', month: 'DEZ', sport: 'tenis-mesa', title: 'Ténis de Mesa • 2º Encontro Concelhio', location: 'Casa da Juventude de Guilhabreu', time: 'Manhã 9h30-12h30 | Tarde 14h30-17h30' },
  { id: 12, date: '2026-12-19', day: '19', month: 'DEZ', sport: 'futsal', title: 'Torneio de Natal JIF 2026 (Sub-9 e Sub-11)', location: 'Pavilhão Municipal de Desportos', time: 'Dia Completo (09h00 às 18h00)' },
  { id: 13, date: '2026-12-26', day: '26', month: 'DEZ', sport: 'futsal', title: 'Futsal • 1ª Eliminatória da Taça Concelhia', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 14, date: '2027-01-02', day: '02', month: 'JAN', sport: 'badminton futsal', title: 'Badminton • 1º Encontro & Futsal (Jogos em Atraso)', location: 'Pavilhão de Macieira', time: '14h00 às 17h30' },
  { id: 15, date: '2027-01-09', day: '09', month: 'JAN', sport: 'atletismo', title: 'Atletismo • 2ª Prova: Milha Urbana de Estrada', location: 'Freguesia a designar', time: '10h00 às 12h30' },
  { id: 16, date: '2027-01-16', day: '16', month: 'JAN', sport: 'futsal', title: 'Futsal • 7ª Jornada do Campeonato', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 17, date: '2027-01-23', day: '23', month: 'JAN', sport: 'futsal', title: 'Futsal • 8ª Jornada do Campeonato', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 18, date: '2027-01-30', day: '30', month: 'JAN', sport: 'tenis-mesa', title: 'Ténis de Mesa • 3º Encontro (Fecho do Troféu Concelhio)', location: 'Casa da Juventude de Guilhabreu', time: 'Manhã 9h30-12h30 | Tarde 14h30-17h30' },
  { id: 19, date: '2027-02-06', day: '06', month: 'FEV', sport: 'futsal', title: 'Futsal • 9ª Jornada do Campeonato', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 20, date: '2027-02-13', day: '13', month: 'FEV', sport: 'futsal', title: 'Futsal • 2ª Eliminatória da Taça Concelhia', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 21, date: '2027-02-20', day: '20', month: 'FEV', sport: 'duatlo', title: 'Duatlo • 2ª Prova Individual dos XL JIF', location: 'Freguesia a designar', time: '09h00 às 12h30' },
  { id: 22, date: '2027-02-27', day: '27', month: 'FEV', sport: 'futsal', title: 'Futsal • Campeonato & Jogos em Atraso', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 23, date: '2027-03-06', day: '06', month: 'MAR', sport: 'futsal', title: 'Futsal • 10ª Jornada do Campeonato', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 24, date: '2027-03-13', day: '13', month: 'MAR', sport: 'praia', title: 'Futebol de Praia • 1º Encontro Concelhio', location: 'Centro Comunitário das Caxinas', time: 'Manhã 9h00-13h00 | Tarde 14h30-18h00' },
  { id: 25, date: '2027-03-20', day: '20', month: 'MAR', sport: 'futebol', title: 'Futebol • 2º Torneio Geral dos XL JIF', location: 'Parque de Jogos Municipal', time: 'Manhã 9h00-13h00 | Tarde 14h00-18h00' },
  { id: 26, date: '2027-03-27', day: '27', month: 'MAR', sport: 'futsal', title: 'Torneio de Páscoa JIF 2027 (Sub-9 e Sub-11)', location: 'Pavilhões Concelhios', time: 'Dia Completo (09h00 às 18h00)' },
  { id: 27, date: '2027-04-03', day: '03', month: 'ABR', sport: 'futsal', title: 'Futsal • 3ª Eliminatória da Taça Concelhia', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 28, date: '2027-04-10', day: '10', month: 'ABR', sport: 'praia', title: 'Futebol de Praia • 2º Encontro (Finais na Areia)', location: 'Centro Comunitário das Caxinas', time: 'Manhã 9h00-13h00 | Tarde 14h30-18h00' },
  { id: 29, date: '2027-04-17', day: '17', month: 'ABR', sport: 'futsal', title: 'Futsal • 1ª Jornada de Play-Off', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 30, date: '2027-04-24', day: '24', month: 'ABR', sport: 'badminton futsal', title: 'Badminton • 2º Encontro & Futsal (Jogos em Atraso)', location: 'Pavilhão de Macieira', time: '14h00 às 17h30' },
  { id: 31, date: '2027-04-25', day: '25', month: 'ABR', sport: 'atletismo', title: 'Tradicional Prova de Estrada do 25 de Abril', location: 'Vila do Conde (Cidade / Av. Marginal)', time: '10h00 às 12h30' },
  { id: 32, date: '2027-05-08', day: '08', month: 'MAI', sport: 'futsal', title: 'Futsal • 2ª Jornada de Play-Off', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 33, date: '2027-05-15', day: '15', month: 'MAI', sport: 'futsal', title: 'Futsal • 3ª Jornada de Play-Off (Finais do Campeonato)', location: 'Pavilhões Concelhios', time: 'Manhã 8h45-12h30 | Tarde 14h30-18h00' },
  { id: 34, date: '2027-05-22', day: '22', month: 'MAI', sport: 'futsal', title: 'Futsal • Grande Final da Taça Concelhia ADCCVC', location: 'Pavilhão Municipal de Desportos', time: '14h30 às 19h00' },
  { id: 35, date: '2027-05-29', day: '29', month: 'MAI', sport: 'futebol', title: 'Futebol • 3º Torneio Geral dos XL JIF', location: 'Parque de Jogos Municipal', time: 'Dia Completo (09h00 às 18h00)' },
  { id: 36, date: '2027-06-12', day: '12', month: 'JUN', sport: 'all', title: 'Grande Festa de Encerramento e Entrega Oficial de Prémios', location: 'Pavilhão de Mindelo & Auditório Municipal', time: '08h30 às 12h30 | 18h00' }
];

export function getRelativeDateLabel(eventDateStr: string, todayStr: string): { text: string; pulse: boolean; color: string } {
  if (eventDateStr === todayStr) {
    return { text: 'Hoje', pulse: true, color: 'bg-emerald-400 text-slate-950' };
  }

  const eventDate = new Date(eventDateStr + 'T00:00:00');
  const todayDate = new Date(todayStr + 'T00:00:00');
  const diffDays = Math.round((eventDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return { text: 'Amanhã', pulse: true, color: 'bg-amber-400 text-slate-950' };
  }

  const dayOfWeek = eventDate.getDay(); // 0: Dom, 6: Sab
  if (diffDays > 1 && diffDays <= 7) {
    if (dayOfWeek === 6) return { text: 'Este Sábado', pulse: true, color: 'bg-amber-400 text-slate-950' };
    if (dayOfWeek === 0) return { text: 'Este Domingo', pulse: true, color: 'bg-amber-400 text-slate-950' };
  }

  return { text: 'Próxima Prova', pulse: false, color: 'bg-amber-400 text-slate-950' };
}

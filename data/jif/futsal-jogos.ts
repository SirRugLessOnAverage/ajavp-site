export interface FutsalMatch {
  time: string;
  category: 'Sub-7' | 'Sub-9' | 'Sub-11' | 'Sub-13' | 'Sub-16';
  homeTeam: string;
  awayTeam: string;
  score?: string; // e.g. "1-19" if completed
  isCompleted: boolean;
  isAjavp: boolean;
  notes?: string;
}

export interface FutsalVenueSession {
  venueId: string;
  venueName: string;
  subLocation?: string; // e.g. "Campo 1", "Campo 2"
  matches: FutsalMatch[];
}

export interface FutsalJornada {
  number: number;
  label: string;
  date: string;
  formattedDate: string;
  isTaça?: boolean;
  venueSessions: FutsalVenueSession[];
}

export const FUTSAL_JORNADAS: FutsalJornada[] = [
  {
    number: 1,
    label: '1ª Jornada',
    date: '2026-10-10',
    formattedDate: '10 de Outubro de 2026',
    venueSessions: [
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Arcos', awayTeam: 'Gião', score: '0-0', isCompleted: true, isAjavp: false },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Arcos', awayTeam: 'Gião', score: '1-3', isCompleted: true, isAjavp: false },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Árvore', awayTeam: 'Gião', score: '5-2', isCompleted: true, isAjavp: false },
          { time: '11:45', category: 'Sub-13', homeTeam: 'Árvore', awayTeam: 'Tougues', score: '4-0', isCompleted: true, isAjavp: false },
          { time: '14:30', category: 'Sub-16', homeTeam: 'Vairão', awayTeam: 'Árvore', score: '0-6', isCompleted: true, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Bagunte', awayTeam: 'Outeiro', score: '15-1', isCompleted: true, isAjavp: false },
          { time: '16:30', category: 'Sub-16', homeTeam: 'Junqueira', awayTeam: 'Gião', score: '1-0', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'canidelo',
        venueName: 'Pavilhão de Canidelo',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Junqueira', awayTeam: 'Vilar do Pinheiro', score: '5-0', isCompleted: true, isAjavp: true },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Junqueira', awayTeam: 'Bagunte', score: '1-7', isCompleted: true, isAjavp: false },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Junqueira', awayTeam: 'Bagunte', score: '1-8', isCompleted: true, isAjavp: false },
          { time: '11:45', category: 'Sub-13', homeTeam: 'Bagunte', awayTeam: 'Touguinha Touguinhó', score: '9-3', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Fajozes', awayTeam: 'Mosteiró', score: '6-4', isCompleted: true, isAjavp: false },
          { time: '10:00', category: 'Sub-11', homeTeam: 'Fajozes', awayTeam: 'Vilar do Pinheiro', score: '4-2', isCompleted: true, isAjavp: true },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Fornelo', score: '11-1', isCompleted: true, isAjavp: true }
        ]
      },
      {
        venueId: 'modivas',
        venueName: 'Pavilhão de Modivas',
        matches: [
          { time: '09:00', category: 'Sub-9', homeTeam: 'Árvore', awayTeam: 'Touguinha Touguinhó', score: '10-0', isCompleted: true, isAjavp: false },
          { time: '10:00', category: 'Sub-11', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Tougues', score: '2-12', isCompleted: true, isAjavp: false },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Modivas', awayTeam: 'Canidelo', score: '4-9', isCompleted: true, isAjavp: false }
        ]
      }
    ]
  },
  {
    number: 2,
    label: '2ª Jornada',
    date: '2026-10-24',
    formattedDate: '24 de Outubro de 2026',
    venueSessions: [
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Gião', awayTeam: 'Árvore', score: '1-2', isCompleted: true, isAjavp: false },
          { time: '09:45', category: 'Sub-11', homeTeam: 'Bagunte', awayTeam: 'Árvore', score: '4-2', isCompleted: true, isAjavp: false },
          { time: '10:45', category: 'Sub-9', homeTeam: 'Bagunte', awayTeam: 'Árvore', score: '4-2', isCompleted: true, isAjavp: false },
          { time: '11:45', category: 'Sub-13', homeTeam: 'Bagunte', awayTeam: 'Junqueira', score: '8-0', isCompleted: true, isAjavp: false },
          { time: '14:30', category: 'Sub-16', homeTeam: 'Outeiro Maior', awayTeam: 'Árvore', score: '5-1', isCompleted: true, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Bagunte', awayTeam: 'Arcos', score: '4-0', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'canidelo',
        venueName: 'Pavilhão de Canidelo',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Mosteiró', score: '4-5', isCompleted: true, isAjavp: false },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Arcos', score: '1-0', isCompleted: true, isAjavp: false },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Touguinha Touguinhó', score: '9-1', isCompleted: true, isAjavp: true },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Canidelo', awayTeam: 'Gião', score: '7-0', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Tougues', awayTeam: 'Fajozes', score: '2-1', isCompleted: true, isAjavp: false },
          { time: '09:45', category: 'Sub-11', homeTeam: 'Tougues', awayTeam: 'Junqueira', score: '2-4', isCompleted: true, isAjavp: false },
          { time: '10:45', category: 'Sub-9', homeTeam: 'Tougues', awayTeam: 'Junqueira', score: '5-0', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'modivas',
        venueName: 'Pavilhão de Modivas',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Arcos', score: '3-10', isCompleted: true, isAjavp: true },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Modivas', awayTeam: 'Vilar do Pinheiro', score: '1-19', isCompleted: true, isAjavp: true },
          { time: '11:00', category: 'Sub-11', homeTeam: 'Fornelo', awayTeam: 'Fajozes', score: '4-2', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'caxinas',
        venueName: 'Pavilhão de Caxinas (Campo 1)',
        subLocation: 'Campo 1 (Sub-7)',
        matches: [
          { time: '09:30', category: 'Sub-7', homeTeam: 'Modivas', awayTeam: 'Árvore', score: '0-8', isCompleted: true, isAjavp: false },
          { time: '10:15', category: 'Sub-7', homeTeam: 'Canidelo', awayTeam: 'Junqueira', score: '2-6', isCompleted: true, isAjavp: false },
          { time: '11:00', category: 'Sub-7', homeTeam: 'Tougues', awayTeam: 'Mosteiró', score: '8-0', isCompleted: true, isAjavp: false },
          { time: '11:45', category: 'Sub-7', homeTeam: 'Junqueira', awayTeam: 'Modivas', score: '8-1', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'caxinas',
        venueName: 'Pavilhão de Caxinas (Campo 2)',
        subLocation: 'Campo 2 (Sub-7)',
        matches: [
          { time: '09:30', category: 'Sub-7', homeTeam: 'Gião', awayTeam: 'Vilar do Pinheiro', score: '3-1', isCompleted: true, isAjavp: true },
          { time: '10:15', category: 'Sub-7', homeTeam: 'Aveleda', awayTeam: 'Fornelo', score: '1-5', isCompleted: true, isAjavp: false },
          { time: '11:00', category: 'Sub-7', homeTeam: 'Bagunte', awayTeam: 'Gião', score: '7-0', isCompleted: true, isAjavp: false },
          { time: '11:45', category: 'Sub-7', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Aveleda', score: '3-1', isCompleted: true, isAjavp: true }
        ]
      }
    ]
  },
  {
    number: 3,
    label: '3ª Jornada',
    date: '2026-10-31',
    formattedDate: '31 de Outubro de 2026',
    venueSessions: [
      {
        venueId: 'canidelo',
        venueName: 'Pavilhão de Canidelo',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Árvore', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Canidelo', isCompleted: false, isAjavp: true },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Junqueira', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Junqueira', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Junqueira', awayTeam: 'Touguinha Touguinhó', isCompleted: false, isAjavp: false },
          { time: '09:45', category: 'Sub-11', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false },
          { time: '10:45', category: 'Sub-9', homeTeam: 'Gião', awayTeam: 'Touguinha Touguinhó', isCompleted: false, isAjavp: false },
          { time: '11:45', category: 'Sub-11', homeTeam: 'Gião', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Fajozes', awayTeam: 'Gião', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-13', homeTeam: 'Arcos', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Arcos', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'modivas',
        venueName: 'Pavilhão de Modivas',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Mosteiró', awayTeam: 'Tougues', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-11', homeTeam: 'Árvore', awayTeam: 'Tougues', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Árvore', awayTeam: 'Tougues', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'municipal-desportos',
        venueName: 'Pavilhão de Desportos',
        matches: [
          { time: '14:30', category: 'Sub-16', homeTeam: 'Arcos', awayTeam: 'Outeiro Maior', isCompleted: false, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Árvore', awayTeam: 'Gião', isCompleted: false, isAjavp: false },
          { time: '16:30', category: 'Sub-16', homeTeam: 'Junqueira', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false }
        ]
      }
    ]
  },
  {
    number: 4,
    label: '4ª Jornada',
    date: '2026-11-14',
    formattedDate: '14 de Novembro de 2026',
    venueSessions: [
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Fajozes', isCompleted: false, isAjavp: true },
          { time: '09:45', category: 'Sub-11', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Árvore', isCompleted: false, isAjavp: true },
          { time: '10:45', category: 'Sub-13', homeTeam: 'Bagunte', awayTeam: 'Árvore', isCompleted: false, isAjavp: false },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Fornelo', awayTeam: 'Árvore', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Gião', awayTeam: 'Mosteiró', isCompleted: false, isAjavp: false },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Bagunte', awayTeam: 'Gião', isCompleted: false, isAjavp: false },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Tougues', awayTeam: 'Gião', isCompleted: false, isAjavp: false },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Tougues', awayTeam: 'Arcos', isCompleted: false, isAjavp: false },
          { time: '14:30', category: 'Sub-16', homeTeam: 'Outeiro Maior', awayTeam: 'Gião', isCompleted: false, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Arcos', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'canidelo',
        venueName: 'Pavilhão de Canidelo',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Tougues', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Canidelo', awayTeam: 'Touguinha Touguinhó', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-11', homeTeam: 'Fajozes', awayTeam: 'Touguinha Touguinhó', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'modivas',
        venueName: 'Pavilhão de Modivas',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Junqueira', awayTeam: 'Arcos', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-11', homeTeam: 'Fornelo', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Modivas', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false }
        ]
      }
    ]
  },
  {
    number: 5,
    label: '5ª Jornada',
    date: '2026-11-21',
    formattedDate: '21 de Novembro de 2026',
    venueSessions: [
      {
        venueId: 'canidelo',
        venueName: 'Pavilhão de Canidelo',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Árvore', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Junqueira', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true },
          { time: '11:00', category: 'Sub-11', homeTeam: 'Gião', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true }
        ]
      },
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Mosteiró', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true },
          { time: '10:00', category: 'Sub-13', homeTeam: 'Fajozes', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-11', homeTeam: 'Junqueira', awayTeam: 'Fajozes', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'caxinas',
        venueName: 'Pavilhão de Caxinas (Campo 2)',
        subLocation: 'Campo 2 (Sub-7)',
        matches: [
          { time: '09:30', category: 'Sub-7', homeTeam: 'Fornelo', awayTeam: 'Tougues', isCompleted: false, isAjavp: false },
          { time: '10:15', category: 'Sub-7', homeTeam: 'Aveleda', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-7', homeTeam: 'Tougues', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true },
          { time: '11:45', category: 'Sub-7', homeTeam: 'Gião', awayTeam: 'Aveleda', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Tougues', awayTeam: 'Gião', isCompleted: false, isAjavp: false },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Gião', awayTeam: 'Tougues', isCompleted: false, isAjavp: false },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Bagunte', awayTeam: 'Tougues', isCompleted: false, isAjavp: false },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false },
          { time: '14:30', category: 'Sub-16', homeTeam: 'Junqueira', awayTeam: 'Outeiro Maior', isCompleted: false, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Árvore', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'modivas',
        venueName: 'Pavilhão de Modivas',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Arcos', awayTeam: 'Touguinha Touguinhó', isCompleted: false, isAjavp: false },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Arcos', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Árvore', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Árvore', awayTeam: 'Modivas', isCompleted: false, isAjavp: false }
        ]
      }
    ]
  },
  {
    number: 6,
    label: 'Taça Concelhia (1ª Elim.) & 6ª Jornada',
    date: '2026-11-28',
    formattedDate: '28 de Novembro de 2026',
    isTaça: true,
    venueSessions: [
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '09:00', category: 'Sub-11', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Tougues', isCompleted: false, isAjavp: true, notes: 'Taça Concelhia (1ª Eliminatória)' },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Tougues', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Fornelo', awayTeam: 'Gião', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Gião', awayTeam: 'Mosteiró', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-13', homeTeam: 'Arcos', awayTeam: 'Árvore', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Modivas', awayTeam: 'Árvore', isCompleted: false, isAjavp: false },
          { time: '14:30', category: 'Sub-16', homeTeam: 'Bagunte', awayTeam: 'Gião', isCompleted: false, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Arcos', awayTeam: 'Árvore', isCompleted: false, isAjavp: false }
        ]
      }
    ]
  }
];

export function getUpcomingAjavpMatches(): { jornadaNumber: number; date: string; session: FutsalVenueSession; match: FutsalMatch }[] {
  const list: { jornadaNumber: number; date: string; session: FutsalVenueSession; match: FutsalMatch }[] = [];
  FUTSAL_JORNADAS.forEach((j) => {
    j.venueSessions.forEach((s) => {
      s.matches.forEach((m) => {
        if (m.isAjavp && !m.isCompleted) {
          list.push({
            jornadaNumber: j.number,
            date: j.date,
            session: s,
            match: m
          });
        }
      });
    });
  });
  return list;
}

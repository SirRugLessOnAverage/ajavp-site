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
          { time: '08:45', category: 'Sub-13', homeTeam: 'Árvore', awayTeam: 'Vilar do Pinheiro', score: '12-0', isCompleted: true, isAjavp: true },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Canidelo', score: '5-1', isCompleted: true, isAjavp: true },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Junqueira', awayTeam: 'Vilar do Pinheiro', score: '1-7', isCompleted: true, isAjavp: true },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Junqueira', awayTeam: 'Fornelo', score: '8-0', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Junqueira', awayTeam: 'Touguinha Touguinhó', score: '0-3', isCompleted: true, isAjavp: false },
          { time: '09:45', category: 'Sub-11', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Fornelo', score: '1-8', isCompleted: true, isAjavp: false },
          { time: '10:45', category: 'Sub-9', homeTeam: 'Gião', awayTeam: 'Touguinha Touguinhó', score: '9-1', isCompleted: true, isAjavp: false },
          { time: '11:45', category: 'Sub-11', homeTeam: 'Gião', awayTeam: 'Bagunte', score: '1-6', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Fajozes', awayTeam: 'Gião', score: '1-0', isCompleted: true, isAjavp: false },
          { time: '10:00', category: 'Sub-13', homeTeam: 'Arcos', awayTeam: 'Bagunte', score: '0-6', isCompleted: true, isAjavp: false },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Arcos', awayTeam: 'Bagunte', score: '1-7', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'modivas',
        venueName: 'Pavilhão de Modivas',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Mosteiró', awayTeam: 'Tougues', score: '3-1', isCompleted: true, isAjavp: false },
          { time: '10:00', category: 'Sub-11', homeTeam: 'Árvore', awayTeam: 'Tougues', score: '5-1', isCompleted: true, isAjavp: false },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Árvore', awayTeam: 'Tougues', score: '2-3', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'municipal-desportos',
        venueName: 'Pavilhão de Desportos',
        matches: [
          { time: '14:30', category: 'Sub-16', homeTeam: 'Arcos', awayTeam: 'Outeiro Maior', score: '4-3', isCompleted: true, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Árvore', awayTeam: 'Gião', score: '0-2', isCompleted: true, isAjavp: false },
          { time: '16:30', category: 'Sub-16', homeTeam: 'Junqueira', awayTeam: 'Bagunte', score: '1-2', isCompleted: true, isAjavp: false }
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
          { time: '08:45', category: 'Sub-13', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Fajozes', score: '0-10', isCompleted: true, isAjavp: true },
          { time: '09:45', category: 'Sub-11', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Árvore', score: '1-7', isCompleted: true, isAjavp: true },
          { time: '10:45', category: 'Sub-13', homeTeam: 'Bagunte', awayTeam: 'Árvore', score: '7-2', isCompleted: true, isAjavp: false },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Fornelo', awayTeam: 'Árvore', score: '0-4', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Gião', awayTeam: 'Mosteiró', score: '3-0', isCompleted: true, isAjavp: false },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Bagunte', awayTeam: 'Gião', score: '10-4', isCompleted: true, isAjavp: false },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Tougues', awayTeam: 'Gião', score: '5-1', isCompleted: true, isAjavp: false },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Tougues', awayTeam: 'Arcos', score: '13-0', isCompleted: true, isAjavp: false },
          { time: '14:30', category: 'Sub-16', homeTeam: 'Arcos', awayTeam: 'Junqueira', score: '1-3', isCompleted: true, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Outeiro Maior', awayTeam: 'Gião', score: '0-4', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'canidelo',
        venueName: 'Pavilhão de Canidelo',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Tougues', score: '1-4', isCompleted: true, isAjavp: false },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Canidelo', awayTeam: 'Touguinha Touguinhó', score: '5-1', isCompleted: true, isAjavp: false },
          { time: '11:00', category: 'Sub-11', homeTeam: 'Fajozes', awayTeam: 'Touguinha Touguinhó', score: '7-1', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'modivas',
        venueName: 'Pavilhão de Modivas',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Junqueira', awayTeam: 'Arcos', score: '0-0', isCompleted: true, isAjavp: false },
          { time: '10:00', category: 'Sub-11', homeTeam: 'Fornelo', awayTeam: 'Junqueira', score: '10-2', isCompleted: true, isAjavp: false },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Modivas', awayTeam: 'Junqueira', score: '2-6', isCompleted: true, isAjavp: false }
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
          { time: '09:00', category: 'Sub-13', homeTeam: 'Árvore', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false, notes: 'Adiado' },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Junqueira', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true, notes: 'Adiado → 02/01/2027 (Mindelo)' },
          { time: '11:00', category: 'Sub-11', homeTeam: 'Gião', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true, notes: 'Adiado → 02/01/2027 (Mindelo)' }
        ]
      },
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Mosteiró', awayTeam: 'Vilar do Pinheiro', score: '8-2', isCompleted: true, isAjavp: true },
          { time: '10:00', category: 'Sub-13', homeTeam: 'Fajozes', awayTeam: 'Bagunte', score: '1-5', isCompleted: true, isAjavp: false },
          { time: '11:00', category: 'Sub-11', homeTeam: 'Junqueira', awayTeam: 'Fajozes', score: '1-12', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'caxinas',
        venueName: 'Pavilhão de Caxinas (Campo 1)',
        subLocation: 'Campo 1 (Sub-7)',
        matches: [
          { time: '09:30', category: 'Sub-7', homeTeam: 'Árvore', awayTeam: 'Junqueira', score: '6-5', isCompleted: true, isAjavp: false, notes: '2ª Jornada' },
          { time: '10:15', category: 'Sub-7', homeTeam: 'Mosteiró', awayTeam: 'Canidelo', score: '0-5', isCompleted: true, isAjavp: false, notes: '3ª Jornada' },
          { time: '11:00', category: 'Sub-7', homeTeam: 'Canidelo', awayTeam: 'Fornelo', score: '1-1', isCompleted: true, isAjavp: false, notes: '3ª Jornada' },
          { time: '11:45', category: 'Sub-7', homeTeam: 'Modivas', awayTeam: 'Mosteiró', score: '1-2', isCompleted: true, isAjavp: false, notes: '3ª Jornada' }
        ]
      },
      {
        venueId: 'caxinas',
        venueName: 'Pavilhão de Caxinas (Campo 2)',
        subLocation: 'Campo 2 (Sub-7)',
        matches: [
          { time: '09:30', category: 'Sub-7', homeTeam: 'Fornelo', awayTeam: 'Tougues', score: '1-9', isCompleted: true, isAjavp: false, notes: '2ª Jornada' },
          { time: '10:15', category: 'Sub-7', homeTeam: 'Aveleda', awayTeam: 'Bagunte', score: '1-11', isCompleted: true, isAjavp: false, notes: '3ª Jornada' },
          { time: '11:00', category: 'Sub-7', homeTeam: 'Tougues', awayTeam: 'Vilar do Pinheiro', score: '8-6', isCompleted: true, isAjavp: true, notes: '3ª Jornada' },
          { time: '11:45', category: 'Sub-7', homeTeam: 'Gião', awayTeam: 'Aveleda', score: '3-0', isCompleted: true, isAjavp: false, notes: '4ª Jornada' }
        ]
      },
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Tougues', awayTeam: 'Gião', score: '2-1', isCompleted: true, isAjavp: false },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Gião', awayTeam: 'Tougues', score: '0-16', isCompleted: true, isAjavp: false },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Bagunte', awayTeam: 'Tougues', score: '11-0', isCompleted: true, isAjavp: false },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Bagunte', score: '2-4', isCompleted: true, isAjavp: false },
          { time: '14:30', category: 'Sub-16', homeTeam: 'Junqueira', awayTeam: 'Outeiro Maior', score: '3-0', isCompleted: true, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Árvore', awayTeam: 'Bagunte', score: '1-4', isCompleted: true, isAjavp: false }
        ]
      },
      {
        venueId: 'modivas',
        venueName: 'Pavilhão de Modivas',
        matches: [
          { time: '08:45', category: 'Sub-13', homeTeam: 'Arcos', awayTeam: 'Touguinha Touguinhó', score: '5-3', isCompleted: true, isAjavp: false },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Arcos', awayTeam: 'Fornelo', score: '4-1', isCompleted: true, isAjavp: false },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Árvore', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false, notes: 'Adiado → 28/11/2026 (Fajozes)' },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Árvore', awayTeam: 'Modivas', isCompleted: false, isAjavp: false, notes: 'Adiado → 02/01/2027 (Mindelo)' }
        ]
      }
    ]
  },
  {
    number: 6,
    label: 'Taça Concelhia (1ª Elim.) & 6ª Jornada Sub-16',
    date: '2026-11-28',
    formattedDate: '28 de Novembro de 2026',
    isTaça: true,
    venueSessions: [
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '08:45', category: 'Sub-11', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Tougues', isCompleted: false, isAjavp: true, notes: 'Taça Concelhia (1ª Eliminatória)' },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Tougues', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false },
          { time: '10:45', category: 'Sub-9', homeTeam: 'Fornelo', awayTeam: 'Gião', isCompleted: false, isAjavp: false },
          { time: '11:45', category: 'Sub-11', homeTeam: 'Árvore', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false, notes: 'Jogo adiado 5ª Jornada' }
        ]
      },
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Gião', awayTeam: 'Mosteiró', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-13', homeTeam: 'Arcos', awayTeam: 'Árvore', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Modivas', awayTeam: 'Árvore', isCompleted: false, isAjavp: false },
          { time: '14:30', category: 'Sub-16', homeTeam: 'Arcos', awayTeam: 'Árvore', isCompleted: false, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Bagunte', awayTeam: 'Gião', isCompleted: false, isAjavp: false }
        ]
      }
    ]
  },
  {
    number: 7,
    label: '6ª Jornada & Sub-7',
    date: '2026-12-12',
    formattedDate: '12 de Dezembro de 2026',
    venueSessions: [
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-11', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Bagunte', isCompleted: false, isAjavp: true },
          { time: '09:45', category: 'Sub-13', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Tougues', isCompleted: false, isAjavp: true },
          { time: '10:45', category: 'Sub-9', homeTeam: 'Tougues', awayTeam: 'Touguinha Touguinhó', isCompleted: false, isAjavp: false },
          { time: '11:45', category: 'Sub-11', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false },
          { time: '14:30', category: 'Sub-16', homeTeam: 'Gião', awayTeam: 'Arcos', isCompleted: false, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Árvore', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'canidelo',
        venueName: 'Pavilhão de Canidelo',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Junqueira', awayTeam: 'Fajozes', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-13', homeTeam: 'Bagunte', awayTeam: 'Mosteiró', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Canidelo', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Gião', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Fornelo', awayTeam: 'Gião', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-11', homeTeam: 'Fornelo', awayTeam: 'Gião', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'modivas',
        venueName: 'Pavilhão de Modivas',
        matches: [
          { time: '08:45', category: 'Sub-9', homeTeam: 'Modivas', awayTeam: 'Arcos', isCompleted: false, isAjavp: false },
          { time: '09:45', category: 'Sub-13', homeTeam: 'Arcos', awayTeam: 'Árvore', isCompleted: false, isAjavp: false },
          { time: '10:45', category: 'Sub-11', homeTeam: 'Fajozes', awayTeam: 'Árvore', isCompleted: false, isAjavp: false },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Árvore', isCompleted: false, isAjavp: true }
        ]
      },
      {
        venueId: 'caxinas',
        venueName: 'Pavilhão de Caxinas (Campo 1)',
        subLocation: 'Campo 1 (Sub-7)',
        matches: [
          { time: '09:30', category: 'Sub-7', homeTeam: 'Mosteiró', awayTeam: 'Árvore', isCompleted: false, isAjavp: false, notes: '4ª Jornada' },
          { time: '10:15', category: 'Sub-7', homeTeam: 'Fornelo', awayTeam: 'Modivas', isCompleted: false, isAjavp: false, notes: '4ª Jornada' },
          { time: '11:00', category: 'Sub-7', homeTeam: 'Junqueira', awayTeam: 'Mosteiró', isCompleted: false, isAjavp: false, notes: '5ª Jornada' },
          { time: '11:45', category: 'Sub-7', homeTeam: 'Árvore', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false, notes: '5ª Jornada' }
        ]
      },
      {
        venueId: 'caxinas',
        venueName: 'Pavilhão de Caxinas (Campo 2)',
        subLocation: 'Campo 2 (Sub-7)',
        matches: [
          { time: '09:30', category: 'Sub-7', homeTeam: 'Bagunte', awayTeam: 'Tougues', isCompleted: false, isAjavp: false, notes: '4ª Jornada' },
          { time: '10:15', category: 'Sub-7', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Canidelo', isCompleted: false, isAjavp: true, notes: '4ª Jornada' },
          { time: '11:00', category: 'Sub-7', homeTeam: 'Tougues', awayTeam: 'Gião', isCompleted: false, isAjavp: false, notes: '5ª Jornada' },
          { time: '11:45', category: 'Sub-7', homeTeam: 'Canidelo', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false, notes: '5ª Jornada' }
        ]
      }
    ]
  },
  {
    number: 8,
    label: 'Sub-9 Masculinos & Torneio de Natal',
    date: '2026-12-19',
    formattedDate: '19 de Dezembro de 2026',
    venueSessions: [
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '09:00', category: 'Sub-9', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Arcos', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true },
          { time: '11:00', category: 'Sub-9', homeTeam: 'Gião', awayTeam: 'Modivas', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '09:30', category: 'Sub-9', homeTeam: 'Junqueira', awayTeam: 'Canidelo', isCompleted: false, isAjavp: false },
          { time: '10:30', category: 'Sub-9', homeTeam: 'Bagunte', awayTeam: 'Tougues', isCompleted: false, isAjavp: false }
        ]
      }
    ]
  },
  {
    number: 9,
    label: 'Jogos em Atraso • 5ª Jornada',
    date: '2027-01-02',
    formattedDate: '02 de Janeiro de 2027',
    venueSessions: [
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-11', homeTeam: 'Gião', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true, notes: 'Jogo em atraso 5ª Jornada' },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Junqueira', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true, notes: 'Jogo em atraso 5ª Jornada' },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Árvore', awayTeam: 'Modivas', isCompleted: false, isAjavp: false, notes: 'Jogo em atraso 5ª Jornada' }
        ]
      }
    ]
  },
  {
    number: 10,
    label: '7ª Jornada & Sub-7',
    date: '2027-01-16',
    formattedDate: '16 de Janeiro de 2027',
    venueSessions: [
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-11', homeTeam: 'Tougues', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Gião', isCompleted: false, isAjavp: true },
          { time: '10:45', category: 'Sub-13', homeTeam: 'Gião', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true },
          { time: '11:45', category: 'Sub-11', homeTeam: 'Gião', awayTeam: 'Fajozes', isCompleted: false, isAjavp: false },
          { time: '14:30', category: 'Sub-16', homeTeam: 'Outeiro Maior', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Gião', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'canidelo',
        venueName: 'Pavilhão de Canidelo',
        matches: [
          { time: '08:45', category: 'Sub-11', homeTeam: 'Bagunte', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Fornelo', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false },
          { time: '10:45', category: 'Sub-13', homeTeam: 'Tougues', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Canidelo', awayTeam: 'Tougues', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Fajozes', awayTeam: 'Arcos', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Modivas', awayTeam: 'Touguinha Touguinhó', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-13', homeTeam: 'Árvore', awayTeam: 'Touguinha Touguinhó', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'macieira',
        venueName: 'Pavilhão de Macieira',
        matches: [
          { time: '09:00', category: 'Sub-11', homeTeam: 'Árvore', awayTeam: 'Touguinha Touguinhó', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Junqueira', awayTeam: 'Árvore', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-13', homeTeam: 'Mosteiró', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'caxinas',
        venueName: 'Pavilhão de Caxinas (Campo 1)',
        subLocation: 'Campo 1 (Sub-7)',
        matches: [
          { time: '09:30', category: 'Sub-7', homeTeam: 'Modivas', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true, notes: '5ª Jornada' },
          { time: '10:15', category: 'Sub-7', homeTeam: 'Fornelo', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false, notes: '6ª Jornada' },
          { time: '11:00', category: 'Sub-7', homeTeam: 'Vilar do Pinheiro', awayTeam: 'Árvore', isCompleted: false, isAjavp: true, notes: '6ª Jornada' },
          { time: '11:45', category: 'Sub-7', homeTeam: 'Mosteiró', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false, notes: '7ª Jornada' }
        ]
      },
      {
        venueId: 'caxinas',
        venueName: 'Pavilhão de Caxinas (Campo 2)',
        subLocation: 'Campo 2 (Sub-7)',
        matches: [
          { time: '09:30', category: 'Sub-7', homeTeam: 'Aveleda', awayTeam: 'Tougues', isCompleted: false, isAjavp: false, notes: '6ª Jornada' },
          { time: '10:15', category: 'Sub-7', homeTeam: 'Gião', awayTeam: 'Canidelo', isCompleted: false, isAjavp: false, notes: '6ª Jornada' },
          { time: '11:00', category: 'Sub-7', homeTeam: 'Bagunte', awayTeam: 'Modivas', isCompleted: false, isAjavp: false, notes: '6ª Jornada' },
          { time: '11:45', category: 'Sub-7', homeTeam: 'Canidelo', awayTeam: 'Aveleda', isCompleted: false, isAjavp: false, notes: '7ª Jornada' }
        ]
      }
    ]
  },
  {
    number: 11,
    label: '8ª Jornada',
    date: '2027-01-30',
    formattedDate: '30 de Janeiro de 2027',
    venueSessions: [
      {
        venueId: 'mindelo',
        venueName: 'Pavilhão de Mindelo',
        matches: [
          { time: '08:45', category: 'Sub-11', homeTeam: 'Fornelo', awayTeam: 'Tougues', isCompleted: false, isAjavp: false },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Tougues', awayTeam: 'Fornelo', isCompleted: false, isAjavp: false },
          { time: '10:45', category: 'Sub-13', homeTeam: 'Junqueira', awayTeam: 'Tougues', isCompleted: false, isAjavp: false },
          { time: '11:45', category: 'Sub-9', homeTeam: 'Arcos', awayTeam: 'Junqueira', isCompleted: false, isAjavp: false },
          { time: '14:30', category: 'Sub-16', homeTeam: 'Arcos', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false },
          { time: '15:30', category: 'Sub-16', homeTeam: 'Árvore', awayTeam: 'Outeiro Maior', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'canidelo',
        venueName: 'Pavilhão de Canidelo',
        matches: [
          { time: '08:45', category: 'Sub-11', homeTeam: 'Junqueira', awayTeam: 'Árvore', isCompleted: false, isAjavp: false },
          { time: '09:45', category: 'Sub-9', homeTeam: 'Árvore', awayTeam: 'Canidelo', isCompleted: false, isAjavp: false },
          { time: '10:45', category: 'Sub-13', homeTeam: 'Árvore', awayTeam: 'Fajozes', isCompleted: false, isAjavp: false },
          { time: '11:45', category: 'Sub-11', homeTeam: 'Fajozes', awayTeam: 'Bagunte', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'macieira',
        venueName: 'Pavilhão de Macieira',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Vilar do Pinheiro', isCompleted: false, isAjavp: true },
          { time: '11:00', category: 'Sub-11', homeTeam: 'Touguinha Touguinhó', awayTeam: 'Gião', isCompleted: false, isAjavp: false }
        ]
      },
      {
        venueId: 'fajozes',
        venueName: 'Pavilhão de Fajozes',
        matches: [
          { time: '09:00', category: 'Sub-13', homeTeam: 'Bagunte', awayTeam: 'Gião', isCompleted: false, isAjavp: false },
          { time: '10:00', category: 'Sub-9', homeTeam: 'Bagunte', awayTeam: 'Modivas', isCompleted: false, isAjavp: false },
          { time: '11:00', category: 'Sub-13', homeTeam: 'Arcos', awayTeam: 'Mosteiró', isCompleted: false, isAjavp: false }
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

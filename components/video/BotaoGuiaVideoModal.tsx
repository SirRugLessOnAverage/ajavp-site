'use client';

import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { ModalVideoInscricao } from './ModalVideoInscricao';

export function BotaoGuiaVideoModal() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="motion-press w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-heading font-bold px-7 py-4 rounded-full border border-emerald-400/40 shadow-lg hover:shadow-emerald-500/10 transition-all text-sm sm:text-base cursor-pointer backdrop-blur-xs active:scale-95"
      >
        <PlayCircle className="w-5 h-5 text-emerald-400" />
        <span>Ver Guia em Vídeo (1 min)</span>
      </button>

      <ModalVideoInscricao isOpen={aberto} onClose={() => setAberto(false)} />
    </>
  );
}


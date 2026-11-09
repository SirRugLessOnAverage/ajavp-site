'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TENIS_MESA_1_ENCONTRO,
  TenisMesaEscalaoResultado,
  TenisMesaAtletaResultado,
} from '@/data/jif/tenis-de-mesa';
import {
  Trophy,
  Medal,
  Award,
  Users,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Table as TableIcon,
  CheckCircle2,
  Camera,
  ArrowRight,
} from 'lucide-react';

const FOTOS_DESTAQUE = [
  {
    src: '/assets/images/galeria/tenis-mesa/tenis_mesa_2026_podio_sub11_ouro_prata_bronze.webp',
    title: 'Pódio 100% AJAVP • Sub-11',
    caption: '1º Johnny Ye, 2º Dong Xuan e 3º Francisco Fernandes',
    badge: 'Histórico 🥇🥈🥉',
  },
  {
    src: '/assets/images/galeria/tenis-mesa/tenis_mesa_2026_podio_livre_masculino_ouro.webp',
    title: 'Campeão Concelhio • Livres',
    caption: 'Pedro Cruz no topo do pódio individual com o cachecol',
    badge: 'Campeão Ouro 🥇',
  },
  {
    src: '/assets/images/galeria/tenis-mesa/tenis_mesa_2026_podio_sub16_campeao_vice.webp',
    title: 'Final 100% AJAVP • Sub-16',
    caption: '1º Afonso Fernandes e 2º Rodrigo Pereira',
    badge: 'Dobradinha 🥇🥈',
  },
  {
    src: '/assets/images/galeria/tenis-mesa/tenis_mesa_2026_medalhados_tarde_ajavp.webp',
    title: 'Medalhados da AJAVP',
    caption: 'Rodrigo, Diana, Afonso e Pedro com o cachecol da Mancha Verde',
    badge: 'Campeões 🏆',
  },
];

export default function JifQuadroHonraTenisMesa() {
  const [mostrarTabelaFreguesias, setMostrarTabelaFreguesias] = useState(false);
  const [escalaoAtivo, setEscalaoAtivo] = useState<string>('todos');

  const resumo = TENIS_MESA_1_ENCONTRO.ajavpResumo;
  const escaloes = TENIS_MESA_1_ENCONTRO.quadroHonraAjavp;
  const tabelaFreguesias = TENIS_MESA_1_ENCONTRO.classificacaoColetiva;

  const escaloesFiltrados =
    escalaoAtivo === 'todos'
      ? escaloes
      : escaloes.filter((e) => e.escalao === escalaoAtivo);

  return (
    <div className="space-y-6">
      {/* Hero Card da Vitória Dourada */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-900 text-white shadow-xl border-2 border-amber-300/80">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-950 text-amber-300 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Vitória Histórica • XL JIF</span>
            </span>
            <span className="text-xs font-bold text-amber-100 bg-white/15 px-3 py-1 rounded-full backdrop-blur-xs">
              07 de Novembro de 2026 • Guilhabreu
            </span>
          </div>

          <div className="space-y-1 max-w-3xl">
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
              AJAVP Vence o 1º Encontro de Ténis de Mesa!
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              Com apenas <strong>14 pontos de prova</strong>, Vilar do Pinheiro conquistou o{' '}
              <strong>1º Lugar Coletivo</strong> entre 18 freguesias concorrentes, arrecadando{' '}
              <strong>3 Títulos de Campeão Concelhio</strong> e um total de <strong>9 Pódios</strong>.
            </p>
          </div>

          {/* Métricas / Badges Rápidos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Classificação</span>
              <span className="font-heading font-black text-xl sm:text-2xl text-white">1º Lugar 🏆</span>
              <span className="text-[10px] text-amber-200/80 block mt-0.5">14 pts torneio (+54 JIF)</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Campeões Concelhios</span>
              <span className="font-heading font-black text-xl sm:text-2xl text-white">3 Ouros 🥇</span>
              <span className="text-[10px] text-amber-200/80 block mt-0.5">Sub-11, Sub-16 e Livre</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Pódios Conquistados</span>
              <span className="font-heading font-black text-xl sm:text-2xl text-white">9 Medalhas</span>
              <span className="text-[10px] text-amber-200/80 block mt-0.5">3🥇 • 3🥈 • 3🥉</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Atletas em Prova</span>
              <span className="font-heading font-black text-xl sm:text-2xl text-white">24 Atletas</span>
              <span className="text-[10px] text-amber-200/80 block mt-0.5">Presentes nos 6 Escalões</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mini-Galeria Fotográfica da Vitória */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Camera className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 dark:text-white">
                Galeria Fotográfica • 1º Encontro
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                14 fotografias oficiais disponíveis na Galeria Multimédia
              </p>
            </div>
          </div>

          <Link
            href="/multimedia#galeria-fotos"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
          >
            <span>Ver todas as fotos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FOTOS_DESTAQUE.map((foto, idx) => (
            <Link
              key={idx}
              href="/multimedia#galeria-fotos"
              className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-950 border border-slate-200 dark:border-white/10 shadow-xs block"
            >
              <img
                src={foto.src}
                alt={foto.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                  {foto.badge}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-xs font-bold text-white leading-tight truncate">
                  {foto.title}
                </p>
                <p className="text-[10px] text-slate-300 truncate">
                  {foto.caption}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Barra de Filtro de Escalão */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
        <div className="flex items-center gap-2">
          <Medal className="w-5 h-5 text-amber-500" />
          <h3 className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white">
            Quadro de Honra por Escalão
          </h3>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setEscalaoAtivo('todos')}
            className={`motion-pill motion-press px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              escalaoAtivo === 'todos'
                ? 'bg-brand-navy dark:bg-white text-white dark:text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Todos os Escalões (6)
          </button>
          {escaloes.map((e) => (
            <button
              key={e.escalao}
              type="button"
              onClick={() => setEscalaoAtivo(e.escalao)}
              className={`motion-pill motion-press px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                escalaoAtivo === e.escalao
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {e.escalao}
            </button>
          ))}
        </div>
      </div>

      {/* Grelha dos Escalões e Atletas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {escaloesFiltrados.map((esc) => {
          const isWinner = esc.posicaoEquipa === 1;
          const isPodium = esc.posicaoEquipa <= 3;

          return (
            <div
              key={esc.escalao}
              className={`motion-card rounded-3xl p-5 border flex flex-col justify-between transition-all ${
                isWinner
                  ? 'bg-gradient-to-b from-amber-500/10 via-white to-white dark:from-amber-950/30 dark:via-slate-900 dark:to-slate-900 border-amber-400 dark:border-amber-500/40 shadow-md'
                  : isPodium
                  ? 'bg-white dark:bg-slate-900 border-emerald-400/60 dark:border-emerald-500/30 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {esc.genero}
                    </span>
                    <h4 className="font-heading font-black text-lg text-slate-900 dark:text-white">
                      {esc.escalao}
                    </h4>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-xl text-xs font-black shrink-0 ${
                      isWinner
                        ? 'bg-amber-500 text-slate-950 shadow-2xs'
                        : isPodium
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {esc.posicaoEquipa}º Coletivo ({esc.pontosEquipa} pts)
                  </span>
                </div>

                {esc.destaque && (
                  <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-400/20 text-[11px] font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{esc.destaque}</span>
                  </div>
                )}

                {/* Lista de Atletas */}
                <div className="space-y-1.5 pt-1">
                  {esc.atletas.map((atleta) => (
                    <div
                      key={atleta.nome}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors ${
                        atleta.medalha === 'ouro'
                          ? 'bg-amber-100/80 dark:bg-amber-950/60 text-slate-950 dark:text-amber-100 font-bold border border-amber-300 dark:border-amber-500/40'
                          : atleta.medalha === 'prata'
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border border-slate-300 dark:border-white/20'
                          : atleta.medalha === 'bronze'
                          ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-bold border border-amber-200 dark:border-amber-600/30'
                          : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {atleta.medalha === 'ouro' && <span className="text-base">🥇</span>}
                        {atleta.medalha === 'prata' && <span className="text-base">🥈</span>}
                        {atleta.medalha === 'bronze' && <span className="text-base">🥉</span>}
                        {!atleta.medalha && (
                          <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 text-[10px] font-black flex items-center justify-center shrink-0">
                            {atleta.posicao}º
                          </span>
                        )}
                        <span className="font-heading font-black">{atleta.nome}</span>
                      </div>

                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-right">
                        {atleta.nota || `${atleta.posicao}º classificado`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botão de Toggle para ver a Classificação Coletiva das 18 Freguesias */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => setMostrarTabelaFreguesias(!mostrarTabelaFreguesias)}
          className="w-full flex items-center justify-between p-5 text-left font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Classificação Coletiva Completa do 1º Encontro (18 Freguesias)</span>
          </div>
          {mostrarTabelaFreguesias ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {mostrarTabelaFreguesias && (
          <div className="border-t border-slate-200 dark:border-white/10 overflow-x-auto p-4 animate-drawer-down">
            <table className="w-full text-xs text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-wider font-heading font-black">
                  <th className="py-2.5 px-3 text-center w-12">Pos.</th>
                  <th className="py-2.5 px-3">Freguesia</th>
                  <th className="py-2.5 px-2 text-center">Sub 11</th>
                  <th className="py-2.5 px-2 text-center">Sub 13</th>
                  <th className="py-2.5 px-2 text-center">Sub 15 F</th>
                  <th className="py-2.5 px-2 text-center">Sub 16</th>
                  <th className="py-2.5 px-2 text-center">Livre M</th>
                  <th className="py-2.5 px-2 text-center">Livre F</th>
                  <th className="py-2.5 px-3 text-center bg-amber-500/20 text-amber-900 dark:text-amber-200 font-black">
                    Total Prova
                  </th>
                  <th className="py-2.5 px-3 text-center bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 font-black">
                    Pts JIF
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {tabelaFreguesias.map((freg) => (
                  <tr
                    key={freg.freguesia}
                    className={
                      freg.isAjavp
                        ? 'bg-amber-50 dark:bg-emerald-950/60 font-black'
                        : 'hover:bg-slate-50 dark:hover:bg-white/5'
                    }
                  >
                    <td className="py-2.5 px-3 text-center font-bold">
                      {freg.clas === 1 ? '🥇 1º' : freg.clas === 2 ? '🥈 2º' : freg.clas === 3 ? '🥉 3º' : `${freg.clas}º`}
                    </td>
                    <td className="py-2.5 px-3 font-heading font-bold">
                      {freg.freguesia}
                      {freg.isAjavp && (
                        <span className="ml-2 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-black uppercase">
                          AJAVP
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-center">{freg.sub11 ? `${freg.sub11}º` : '-'}</td>
                    <td className="py-2.5 px-2 text-center">{freg.sub13 ? `${freg.sub13}º` : '-'}</td>
                    <td className="py-2.5 px-2 text-center">{freg.sub15F ? `${freg.sub15F}º` : '-'}</td>
                    <td className="py-2.5 px-2 text-center">{freg.sub16 ? `${freg.sub16}º` : '-'}</td>
                    <td className="py-2.5 px-2 text-center">{freg.livreM ? `${freg.livreM}º` : '-'}</td>
                    <td className="py-2.5 px-2 text-center">{freg.livreF ? `${freg.livreF}º` : '-'}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-black text-amber-700 dark:text-amber-400 bg-amber-500/10">
                      {freg.total > 0 ? `${freg.total} pts` : 'N/P'}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-black text-emerald-700 dark:text-emerald-400 bg-emerald-500/10">
                      {freg.pontosJif > 0 ? `+${freg.pontosJif} pts` : `${freg.pontosJif} pts`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


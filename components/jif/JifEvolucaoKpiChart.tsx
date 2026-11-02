'use client';

import { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Trophy,
  Award,
  Zap,
  ChevronDown,
  ShieldCheck,
  Target,
  Sparkles,
  Info,
} from 'lucide-react';
import type { JifParishRanking, StageHistoryPoint } from '@/data/jif/classificacao';

interface JifEvolucaoKpiChartProps {
  rankings: JifParishRanking[];
}

export default function JifEvolucaoKpiChart({ rankings }: JifEvolucaoKpiChartProps) {
  // Freguesia ativa: Vilar do Pinheiro selecionada por defeito
  const [freguesiaNome, setFreguesiaNome] = useState<string>('Vilar do Pinheiro');
  const [compararComLider, setCompararComLider] = useState<boolean>(true);

  // Freguesia selecionada
  const ativa = useMemo(() => {
    return rankings.find((r) => r.name === freguesiaNome) || rankings[0];
  }, [rankings, freguesiaNome]);

  // Líder concelhio (1º lugar atual)
  const lider = useMemo(() => {
    return rankings[0];
  }, [rankings]);

  // Freguesia imediatamente acima e abaixo para cálculo de distâncias
  const contextoVizinhos = useMemo(() => {
    const idx = rankings.findIndex((r) => r.name === ativa.name);
    const posAtual = idx + 1;
    const acima = idx > 0 ? rankings[idx - 1] : null;
    const abaixo = idx < rankings.length - 1 ? rankings[idx + 1] : null;

    return {
      posAtual,
      acima: acima ? { nome: acima.name, pos: idx, dif: acima.pontos - ativa.pontos } : null,
      abaixo: abaixo ? { nome: abaixo.name, pos: idx + 2, margem: ativa.pontos - abaixo.pontos } : null,
    };
  }, [rankings, ativa]);

  // Melhor classificação de prova da freguesia ativa
  const melhorProva = useMemo(() => {
    if (!ativa.history || ativa.history.length === 0) {
      return { rank: ativa.cmRank, label: 'Corta-Mato' };
    }
    let melhor = ativa.history[0];
    for (const h of ativa.history) {
      if (h.rankAtStage < melhor.rankAtStage) {
        melhor = h;
      }
    }
    return { rank: melhor.rankAtStage, label: melhor.stageLabel };
  }, [ativa]);

  // Configurações do Gráfico SVG (ViewBox e Coordenadas)
  const chartConfig = useMemo(() => {
    const width = 640;
    const height = 240;
    const padding = { top: 30, right: 40, bottom: 40, left: 50 };

    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;

    // Escala Y para pontos acumulados (de min pts acumulados até max pts de Bagunte)
    const maxPts = 190;
    const minPts = -40;
    const ptsRange = maxPts - minPts;

    const getY = (pts: number) => {
      const normalized = (pts - minPts) / ptsRange;
      return padding.top + innerHeight - normalized * innerHeight;
    };

    const getX = (index: number, total: number) => {
      if (total <= 1) return padding.left + innerWidth / 2;
      return padding.left + (index / (total - 1)) * innerWidth;
    };

    return { width, height, padding, innerWidth, innerHeight, getY, getX, minPts, maxPts };
  }, []);

  // Gerar caminho SVG para a freguesia ativa
  const pathAtiva = useMemo(() => {
    if (!ativa.history || ativa.history.length === 0) return { path: '', area: '', points: [] };

    const points = ativa.history.map((h, i) => {
      const x = chartConfig.getX(i, ativa.history.length);
      const y = chartConfig.getY(h.cumulativePts);
      return { x, y, ...h };
    });

    const path = points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');

    // Área fechada até à base do gráfico para o gradiente
    const baseY = chartConfig.getY(Math.max(0, chartConfig.minPts));
    const area = `${path} L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;

    return { path, area, points };
  }, [ativa, chartConfig]);

  // Gerar caminho SVG para o líder (referência comparativa)
  const pathLider = useMemo(() => {
    if (!lider.history || lider.history.length === 0 || lider.name === ativa.name) return null;

    const points = lider.history.map((h, i) => {
      const x = chartConfig.getX(i, lider.history.length);
      const y = chartConfig.getY(h.cumulativePts);
      return { x, y, ...h };
    });

    const path = points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');

    return { path, points };
  }, [lider, ativa, chartConfig]);

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-xs space-y-8">
      {/* Cabeçalho da Secção com Seletor de Freguesia */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Métricas & Trajetória Oficial XL JIF</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white">
            Evolução e Tendência Concelhia
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Analise a trajetória prova a prova de cada uma das 19 freguesias desde o Corta-Mato até à 3.ª Jornada de Futsal.
          </p>
        </div>

        {/* Dropdown de Seleção de Freguesia */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <label htmlFor="seletor-freguesia" className="sr-only">
              Selecionar Freguesia
            </label>
            <select
              id="seletor-freguesia"
              value={freguesiaNome}
              onChange={(e) => setFreguesiaNome(e.target.value)}
              className="w-full sm:w-64 appearance-none bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-2xl px-4 py-2.5 pr-10 text-xs sm:text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer shadow-2xs"
            >
              {rankings.map((r, idx) => (
                <option key={r.name} value={r.name}>
                  {idx + 1}º &middot; {r.name} ({r.pontos} pts){r.isAjavp ? ' ★ AJAVP' : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Toggle de Comparação com o Líder */}
          {ativa.name !== lider.name && (
            <button
              type="button"
              onClick={() => setCompararComLider(!compararComLider)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 shrink-0 ${
                compararComLider
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
              title="Comparar com a linha de Bagunte (Líder Concelhio)"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{compararComLider ? 'A comparar c/ Líder' : 'Comparar c/ Líder'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid de 4 KPIs Dinâmicos da Freguesia Ativa */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Classificação Atual & Tendência */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-emerald-500" />
            <span>Classificação Atual</span>
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
              {contextoVizinhos.posAtual}º
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              de 19 freguesias
            </span>
          </div>
          <div className="pt-1">
            {ativa.delta > 0 ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3" />
                <span>+{ativa.delta} posições vs Pós-Futebol</span>
              </span>
            ) : ativa.delta < 0 ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                <TrendingDown className="w-3 h-3" />
                <span>{ativa.delta} posições vs Pós-Futebol</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                <Minus className="w-3 h-3" />
                <span>Posição estável</span>
              </span>
            )}
          </div>
        </div>

        {/* KPI 2: Pontuação Total Acumulada */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Pontuação Total</span>
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-black text-emerald-600 dark:text-emerald-400">
              {ativa.pontos}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              pontos virtuais
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            Média: {(ativa.pontos / 3).toFixed(1)} pts / modalidade
          </p>
        </div>

        {/* KPI 3: Melhor Desempenho / Pico na Temporada */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Melhor Posição</span>
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
              {melhorProva.rank}º Lugar
            </span>
          </div>
          <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 pt-1 truncate">
            {melhorProva.label} {melhorProva.rank === 1 ? '🥇 Campeã' : ''}
          </p>
        </div>

        {/* KPI 4: Confronto Direto Concelhio */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-purple-500" />
            <span>Confronto Direto</span>
          </span>
          {contextoVizinhos.acima ? (
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                A {contextoVizinhos.acima.dif} pts do {contextoVizinhos.acima.pos}º
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {contextoVizinhos.acima.nome} ({rankings[contextoVizinhos.acima.pos - 1]?.pontos} pts)
              </p>
            </div>
          ) : (
            <div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Líder Concelhio Isolado 👑
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                +{contextoVizinhos.abaixo?.margem || 0} pts sobre 2º ({contextoVizinhos.abaixo?.nome})
              </p>
            </div>
          )}
          {contextoVizinhos.abaixo && contextoVizinhos.acima && (
            <p className="text-[10px] text-slate-400 dark:text-slate-500 pt-0.5">
              +{contextoVizinhos.abaixo.margem} pts sobre o {contextoVizinhos.abaixo.pos}º ({contextoVizinhos.abaixo.nome})
            </p>
          )}
        </div>
      </div>

      {/* Gráfico Visual SVG de Evolução Etapa a Etapa */}
      <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {ativa.name} {ativa.isAjavp ? '(AJAVP)' : ''}
              </span>
            </div>

            {compararComLider && pathLider && (
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-500"></span>
                <span className="font-bold">{lider.name} (Líder Concelhio)</span>
              </div>
            )}
          </div>

          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            <span>Valores representam a soma cumulativa de pontos virtuais</span>
          </span>
        </div>

        {/* SVG Container Responsivo */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="min-w-[540px]">
            <svg
              viewBox={`0 0 ${chartConfig.width} ${chartConfig.height}`}
              className="w-full h-auto overflow-visible font-sans"
            >
              <defs>
                {/* Gradiente da Linha Ativa */}
                <linearGradient id="grad-ativa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>

                {/* Filtro de Sombra suave para os marcadores */}
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
                </filter>
              </defs>

              {/* Linhas de Grelha Horizontais */}
              {[0, 50, 100, 150].map((val) => {
                const y = chartConfig.getY(val);
                return (
                  <g key={val}>
                    <line
                      x1={chartConfig.padding.left}
                      y1={y}
                      x2={chartConfig.width - chartConfig.padding.right}
                      y2={y}
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      className="text-slate-200 dark:text-slate-800"
                      strokeWidth="1"
                    />
                    <text
                      x={chartConfig.padding.left - 8}
                      y={y + 3}
                      textAnchor="end"
                      className="fill-slate-400 dark:fill-slate-500 text-[10px] font-mono font-medium"
                    >
                      {val}p
                    </text>
                  </g>
                );
              })}

              {/* Linha Zero de Base */}
              <line
                x1={chartConfig.padding.left}
                y1={chartConfig.getY(0)}
                x2={chartConfig.width - chartConfig.padding.right}
                y2={chartConfig.getY(0)}
                stroke="currentColor"
                className="text-slate-300 dark:text-slate-700"
                strokeWidth="1.5"
              />

              {/* Linha Comparativa do Líder (Bagunte) */}
              {compararComLider && pathLider && (
                <g>
                  <path
                    d={pathLider.path}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    className="opacity-70"
                  />
                  {pathLider.points.map((p, idx) => (
                    <g key={idx}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="3.5"
                        fill="#f59e0b"
                        stroke="#fff"
                        strokeWidth="1.5"
                      />
                    </g>
                  ))}
                </g>
              )}

              {/* Área Sombreada da Freguesia Ativa */}
              {pathAtiva.area && (
                <path d={pathAtiva.area} fill="url(#grad-ativa)" />
              )}

              {/* Linha Principal da Freguesia Ativa */}
              {pathAtiva.path && (
                <path
                  d={pathAtiva.path}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Pontos de Dados da Freguesia Ativa com Rótulos de Posição */}
              {pathAtiva.points.map((p, idx) => {
                const isFinal = idx === pathAtiva.points.length - 1;
                return (
                  <g key={idx} className="cursor-pointer group">
                    {/* Linha vertical tracejada até ao eixo X */}
                    <line
                      x1={p.x}
                      y1={p.y}
                      x2={p.x}
                      y2={chartConfig.height - chartConfig.padding.bottom}
                      stroke="currentColor"
                      strokeDasharray="2 2"
                      className="text-slate-200 dark:text-slate-800"
                      strokeWidth="1"
                    />

                    {/* Círculo com halo */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="7"
                      fill="#10b981"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      filter="url(#shadow)"
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="3"
                      fill="#ffffff"
                    />

                    {/* Caixa de Texto: Posição Concelhia (ex: 1º, 2º, 4º) */}
                    <g transform={`translate(${p.x}, ${p.y - 14})`}>
                      <rect
                        x="-18"
                        y="-16"
                        width="36"
                        height="18"
                        rx="6"
                        fill={isFinal ? '#047857' : '#1e293b'}
                        className="shadow-xs"
                      />
                      <text
                        x="0"
                        y="-4"
                        textAnchor="middle"
                        fill="#ffffff"
                        className="text-[10px] font-heading font-black"
                      >
                        {p.rankAtStage}º
                      </text>
                    </g>

                    {/* Rótulo de Pontos Acumulados */}
                    <text
                      x={p.x}
                      y={p.y + 20}
                      textAnchor="middle"
                      className="fill-slate-800 dark:fill-slate-200 text-[11px] font-black font-mono"
                    >
                      {p.cumulativePts} pts
                    </text>
                    <text
                      x={p.x}
                      y={p.y + 32}
                      textAnchor="middle"
                      className="fill-slate-400 dark:fill-slate-500 text-[9px] font-medium"
                    >
                      (+{p.stagePts} nesta)
                    </text>

                    {/* Rótulo do Eixo X: Nome da Etapa */}
                    <text
                      x={p.x}
                      y={chartConfig.height - 12}
                      textAnchor="middle"
                      className="fill-slate-700 dark:fill-slate-300 text-xs font-heading font-bold"
                    >
                      {p.stageLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Resumo da Trajetória em Texto */}
        <div className="pt-2 border-t border-slate-200/70 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              <strong>Trajetória de {ativa.name}:</strong> Iniciou em {ativa.history[0]?.rankAtStage}º no Corta-Mato, passou para {ativa.history[1]?.rankAtStage}º no Futebol e ocupa atualmente o {ativa.history[2]?.rankAtStage}º lugar com {ativa.pontos} pontos.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserPlus, IdCard, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { GESTAO_LINKS, TOTAL_SOCIOS_ESTATISTICA } from '@/lib/site';
import { BotaoGuiaVideoModal } from '@/components/video/BotaoGuiaVideoModal';

interface BannerSociosOficialProps {
  totalSocios?: number;
}

export function BannerSociosOficial({ totalSocios = TOTAL_SOCIOS_ESTATISTICA }: BannerSociosOficialProps) {
  const [contagem, setContagem] = useState(1);
  const [animado, setAnimado] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respeito rigoroso a utilizadores com sensibilidade a movimento
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setContagem(totalSocios);
      setAnimado(true);
      return;
    }

    const elemento = containerRef.current;
    if (!elemento) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animado) {
          setAnimado(true);
          observer.disconnect();

          const duracaoMs = 1300;
          const inicio = performance.now();
          const valorInicial = 1;
          const delta = totalSocios - valorInicial;

          const step = (agora: number) => {
            const decorrido = agora - inicio;
            const progressoLinear = Math.min(decorrido / duracaoMs, 1);
            // Curva ease-out cúbica rápida e desacelerada (Emil Kowalski)
            const easeOut = 1 - Math.pow(1 - progressoLinear, 3);
            const valorAtual = Math.round(valorInicial + delta * easeOut);

            setContagem(valorAtual);

            if (progressoLinear < 1) {
              requestAnimationFrame(step);
            } else {
              setContagem(totalSocios);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(elemento);

    return () => {
      observer.disconnect();
    };
  }, [totalSocios, animado]);

  return (
    <section
      ref={containerRef}
      aria-label="Adesão de Sócios e Comunidade AJAVP"
      className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-linear-to-r from-brand-navy via-slate-900 to-emerald-950 text-white border border-white/10 shadow-2xl p-6 sm:p-10 lg:p-12">
          {/* Brilhos de Fundo Ambiente */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-brand-green/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Coluna Esquerda: Informação & Ações */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge Superior */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Época 2026/27</span>
                <span className="text-emerald-400/50">&bull;</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Família Mancha Verde
                </span>
              </div>

              {/* Título Principal */}
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                Torna-te Sócio ou Inscreve o Teu Educando
              </h2>

              {/* Parágrafo Descritivo */}
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Apoia diretamente o desporto de formação em Vilar do Pinheiro. Ficha 100% digital,
                quotas anuais simplificadas e cartão digital oficial com QR Code imediato no telemóvel.
              </p>

              {/* Pilha de Confiança */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-300/90 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Menores Isentos (0€)
                </span>
                <span className="text-white/20">&bull;</span>
                <span>Adultos 12€/ano</span>
                <span className="text-white/20">&bull;</span>
                <span>MB WAY &amp; Referência Multibanco</span>
              </div>

              {/* Grupo de Chamadas de Ação (CTAs) */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                {/* CTA Principal */}
                <Link
                  href="/socios"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading font-black px-7 py-3.5 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transition-[transform,background-color,box-shadow] duration-160 ease-out active:scale-[0.97] text-sm sm:text-base group cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-slate-950" />
                  <span>Quero Ser Sócio &bull; Ver Quotas</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                {/* Modal Guia em Vídeo */}
                <BotaoGuiaVideoModal />

                {/* CTA Secundário para Sócios Registados */}
                <a
                  href={GESTAO_LINKS.socio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-heading font-semibold px-6 py-3.5 sm:py-4 rounded-full border border-white/20 transition-[transform,background-color] duration-160 ease-out active:scale-[0.97] text-sm sm:text-base backdrop-blur-xs cursor-pointer shadow-xs"
                >
                  <IdCard className="w-4 h-4 text-emerald-400" />
                  <span>Área de Sócio (Cartão Digital)</span>
                </a>
              </div>
            </div>

            {/* Coluna Direita: Cartão Glassmorphism Inspirado no Portal do Sócio */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden group hover:border-emerald-400/40 transition-[border-color,transform] duration-200">
                {/* Destaque Superior de Vidro */}
                <div
                  className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-slate-300 font-extrabold block">
                  Nº de Sócio Oficial
                </span>

                {/* Número Grande com Animação Fluida e Tabular Nums */}
                <div className="my-3 sm:my-4 flex items-baseline justify-center font-heading font-black text-emerald-400 tracking-tight select-none">
                  <span className="text-3xl sm:text-4xl text-emerald-400/80 mr-1">#</span>
                  <span className="text-5xl sm:text-6xl lg:text-7xl tabular-nums leading-none">
                    {contagem}
                  </span>
                  <span className="text-3xl sm:text-4xl text-emerald-300 ml-1">+</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold">
                  <span>Família AJAVP</span>
                  <span className="text-emerald-400/60">&bull;</span>
                  <span>Mancha Verde</span>
                </div>

                <p className="text-[11px] sm:text-xs text-slate-300/80 mt-4 leading-relaxed">
                  Mais de uma centena de associados oficiais a construir o futuro do desporto em Vilar do Pinheiro.
                </p>

                {/* Link Subtil para o Portal */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <a
                    href={GESTAO_LINKS.socio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-emerald-200 transition-colors group/link"
                  >
                    <span>Já és sócio? Consulta o teu número</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


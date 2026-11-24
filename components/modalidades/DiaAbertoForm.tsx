"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Send, AlertCircle, Bike, Footprints, Loader2 } from "lucide-react";

type ModalidadeOption = "atletismo" | "ciclismo" | "ambos";
type ElegibilidadeOption = "nasceu_vc" | "reside_vc" | "estuda_vc" | "nao_aplicavel";

const ANOS_NASCIMENTO = Array.from({ length: 19 }, (_, idx) => 2021 - idx);

export function DiaAbertoForm() {
  const [nomeJovem, setNomeJovem] = useState("");
  const [anoNascimento, setAnoNascimento] = useState<string>("2015");
  const [modalidade, setModalidade] = useState<ModalidadeOption>("ambos");
  const [nomeEncarregado, setNomeEncarregado] = useState("");
  const [contacto, setContacto] = useState("");
  const [elegibilidadeJif, setElegibilidadeJif] = useState<ElegibilidadeOption>("reside_vc");
  const [observacoes, setObservacoes] = useState("");
  const [consentimentoRgpd, setConsentimentoRgpd] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro(null);

    if (!consentimentoRgpd) {
      setErro("Por favor confirma o consentimento RGPD para podermos contactar-te.");
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/dia-aberto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeJovem,
          anoNascimento: Number(anoNascimento),
          modalidade,
          nomeEncarregado,
          contacto,
          elegibilidadeJif,
          observacoes,
          consentimentoRgpd,
          website_url: websiteUrl,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string; success?: boolean };
      if (!res.ok) {
        throw new Error(data.error || "Não foi possível enviar a pré-inscrição.");
      }

      if (typeof window !== "undefined") {
        const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: "dia_aberto_pre_inscricao",
          modalidade,
        });
      }

      setSucesso(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao processar pré-inscrição.";
      setErro(msg);
    } finally {
      setEnviando(false);
    }
  };

  if (sucesso) {
    return (
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-500/30 p-7 sm:p-8 shadow-xl text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-brand-green dark:text-emerald-400 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-heading text-2xl font-extrabold text-brand-navy dark:text-white">
          Pré-Inscrição Registada!
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
          Obrigado pelo interesse! Registámos os dados de{" "}
          <strong className="text-slate-900 dark:text-white">{nomeJovem}</strong>. A nossa coordenação entrará em contacto assim que fecharmos o grupo e a data do{" "}
          <strong className="text-brand-green dark:text-emerald-400">Dia Aberto</strong>.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSucesso(false);
              setNomeJovem("");
              setObservacoes("");
            }}
            className="motion-press px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-semibold text-xs transition-colors"
          >
            Inscrever outro irmão / jovem
          </button>
          <Link
            href="/modalidades"
            className="motion-press px-5 py-2.5 rounded-full bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs transition-colors"
          >
            Ver todas as modalidades →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-xl space-y-5"
    >
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-2">
          Pré-Inscrição Gratuita • Sem Compromisso
        </span>
        <h2 className="font-heading text-2xl font-extrabold text-brand-navy dark:text-white">
          Manifestar Interesse no Dia Aberto
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Estamos a reunir jovens interessados para agendar o próximo treino experimental em Vilar do Pinheiro.
        </p>
      </div>

      {/* Honeypot anti-spam */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="dia-aberto-website">Website</label>
        <input
          id="dia-aberto-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
      </div>

      {/* Modalidade */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Modalidade de Interesse *
        </legend>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: "atletismo" as const, label: "Atletismo", icon: Footprints },
            { id: "ciclismo" as const, label: "Ciclismo", icon: Bike },
            { id: "ambos" as const, label: "Ambos", icon: CheckCircle2 },
          ].map((opt) => {
            const Icon = opt.icon;
            const active = modalidade === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setModalidade(opt.id)}
                className={`motion-press flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
                  active
                    ? "bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/20"
                    : "bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-brand-green/50"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 space-y-1.5">
          <label
            htmlFor="nome-jovem"
            className="block text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Nome do Jovem Atleta *
          </label>
          <input
            id="nome-jovem"
            type="text"
            required
            minLength={2}
            maxLength={120}
            value={nomeJovem}
            onChange={(e) => setNomeJovem(e.target.value)}
            placeholder="Ex: Tomás Silva"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="ano-nascimento"
            className="block text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Ano de Nascimento *
          </label>
          <select
            id="ano-nascimento"
            value={anoNascimento}
            onChange={(e) => setAnoNascimento(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green"
          >
            {ANOS_NASCIMENTO.map((ano) => (
              <option key={ano} value={String(ano)}>
                {ano}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="nome-encarregado"
            className="block text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Nome do Encarregado / Pai / Mãe *
          </label>
          <input
            id="nome-encarregado"
            type="text"
            required
            minLength={2}
            maxLength={120}
            value={nomeEncarregado}
            onChange={(e) => setNomeEncarregado(e.target.value)}
            placeholder="Ex: Maria Silva"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="contacto-dia-aberto"
            className="block text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Telemóvel ou Email *
          </label>
          <input
            id="contacto-dia-aberto"
            type="text"
            required
            minLength={6}
            maxLength={120}
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            placeholder="Ex: 912 345 678 ou email"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="elegibilidade-jif"
          className="block text-xs font-bold text-slate-700 dark:text-slate-300"
        >
          Ligação a Vila do Conde (Elegibilidade Jogos Inter-Freguesias) *
        </label>
        <select
          id="elegibilidade-jif"
          value={elegibilidadeJif}
          onChange={(e) => setElegibilidadeJif(e.target.value as ElegibilidadeOption)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green"
        >
          <option value="reside_vc">Residente ou recenseado em Vila do Conde</option>
          <option value="estuda_vc">Estuda em instituição de ensino de Vila do Conde</option>
          <option value="nasceu_vc">Natural de Vila do Conde (nasceu no concelho)</option>
          <option value="nao_aplicavel">Outro concelho (apenas interessado nos treinos)</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="observacoes-dia-aberto"
          className="block text-xs font-bold text-slate-700 dark:text-slate-300"
        >
          Observações (opcional — ex: disponibilidade de bicicleta ou experiência)
        </label>
        <textarea
          id="observacoes-dia-aberto"
          rows={2}
          maxLength={400}
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          placeholder="Ex: Tem bicicleta própria / Prefere sábados de manhã..."
          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green"
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consentimentoRgpd}
          onChange={(e) => setConsentimentoRgpd(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green"
        />
        <span>
          Autorizo a AJAVP a utilizar estes dados exclusivamente para agendar e comunicar o Dia Aberto de Atletismo e Ciclismo, conforme a{" "}
          <Link href="/privacidade" className="underline text-brand-green dark:text-emerald-400 font-semibold">
            Política de Privacidade (RGPD)
          </Link>
          . *
        </span>
      </label>

      {erro && (
        <div
          role="alert"
          className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 text-red-800 dark:text-red-300 text-xs font-medium"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{erro}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="motion-press w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-green hover:bg-brand-greenDark disabled:opacity-60 text-white font-bold text-sm transition-colors shadow-lg shadow-brand-green/25"
      >
        {enviando ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>A registar interesse...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>Registar Interesse no Dia Aberto</span>
          </>
        )}
      </button>
    </form>
  );
}

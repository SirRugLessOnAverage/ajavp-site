"use client";

import { useState, type FormEvent } from "react";

const MODALIDADES_OPTIONS = [
  "Futsal / Futebol Formação",
  "Atletismo & Corta-Mato",
  "Ténis de Mesa",
  "Duatlo em Duplas (BTT)",
  "Badminton",
  "Futebol de Praia",
  "Informações Gerais / Patrocínios",
];

export function ContactForm() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [modalidade, setModalidade] = useState(MODALIDADES_OPTIONS[0]);
  const [mensagem, setMensagem] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<
    string | null
  >(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const buildWhatsAppUrl = () => {
    const text = `Olá AJAVP! Gostaria de informações sobre inscrições.\n\n*Nome:* ${
      nome.trim() || "Não indicado"
    }\n*Telefone:* ${telefone.trim() || "Não indicado"}\n*Email:* ${
      email.trim() || "Não indicado"
    }\n*Modalidade:* ${modalidade}\n*Mensagem:* ${
      mensagem.trim() || "Sem observações adicionais."
    }`;
    return `https://wa.me/351917194933?text=${encodeURIComponent(text)}`;
  };

  const handleWhatsAppDirect = () => {
    if (honeypot) return;
    if (!nome.trim() || !telefone.trim()) {
      setErrorMsg(
        "Por favor, indica pelo menos o teu Nome e Contacto Telefónico para iniciar a conversa no WhatsApp."
      );
      return;
    }
    setErrorMsg(null);
    const url = buildWhatsAppUrl();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;
    setErrorMsg(null);

    const whatsappUrl = buildWhatsAppUrl();
    setSubmittedWhatsAppUrl(whatsappUrl);

    const mailtoSubject = encodeURIComponent(
      `Inscrição / Contacto AJAVP - ${nome.trim()}`
    );
    const mailtoBody = encodeURIComponent(
      `Nome: ${nome.trim()}\nTelefone: ${telefone.trim()}\nEmail: ${email.trim()}\nModalidade: ${modalidade}\nMensagem:\n${
        mensagem.trim() || "Sem observações adicionais."
      }`
    );
    window.location.href = `mailto:geralajavp@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-5"
      noValidate={false}
    >
      {/* Honeypot anti-spam invisível */}
      <input
        type="text"
        name="website_url_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label
            htmlFor="contactNome"
            className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide"
          >
            Nome Completo *
          </label>
          <input
            id="contactNome"
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="O teu nome ou do encarregado"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/20 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-brand-green dark:focus:border-emerald-400 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="contactTelefone"
            className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide"
          >
            Contacto Telefónico *
          </label>
          <input
            id="contactTelefone"
            type="tel"
            required
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Ex: 912 345 678"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/20 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-brand-green dark:focus:border-emerald-400 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label
            htmlFor="contactEmail"
            className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide"
          >
            Correio Eletrónico (Email) *
          </label>
          <input
            id="contactEmail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@email.com"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/20 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-brand-green dark:focus:border-emerald-400 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="contactModalidade"
            className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide"
          >
            Modalidade de Interesse
          </label>
          <select
            id="contactModalidade"
            value={modalidade}
            onChange={(e) => setModalidade(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/20 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-green dark:focus:border-emerald-400 transition-colors"
          >
            {MODALIDADES_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="contactMensagem"
          className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide"
        >
          Mensagem / Idade do Atleta
        </label>
        <textarea
          id="contactMensagem"
          rows={4}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Indica o ano de nascimento do atleta ou a tua dúvida específica..."
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/20 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-brand-green dark:focus:border-emerald-400 transition-colors"
        />
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/15 border border-rose-300 dark:border-rose-400/40 text-rose-800 dark:text-rose-200 text-xs font-semibold"
        >
          ⚠️ {errorMsg}
        </div>
      )}

      {submittedWhatsAppUrl && (
        <div
          role="status"
          className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-400/40 text-xs space-y-3"
        >
          <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-sm">
            <span>✅</span>
            <span>Mensagem preparada com sucesso!</span>
          </div>
          <p className="leading-relaxed text-slate-700 dark:text-slate-200">
            Para um atendimento mais rápido e imediato com os treinadores da AJAVP, podes abrir diretamente a conversa no WhatsApp com os teus dados já preenchidos:
          </p>
          <a
            href={submittedWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="motion-press inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a8744] hover:bg-[#146c36] text-white font-bold text-xs shadow-md transition-colors"
          >
            <span>💬</span>
            <span>Abrir Conversa no WhatsApp Oficial</span>
          </a>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="submit"
          className="motion-press w-full sm:w-auto px-8 py-3.5 bg-brand-green hover:bg-brand-greenDark text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-green/25 transition-colors cursor-pointer"
        >
          ✉️ Enviar por Email
        </button>
        <button
          type="button"
          onClick={handleWhatsAppDirect}
          className="motion-press w-full sm:w-auto px-6 py-3.5 bg-[#1a8744] hover:bg-[#146c36] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>💬</span>
          <span>Enviar Direto via WhatsApp</span>
        </button>
      </div>
    </form>
  );
}

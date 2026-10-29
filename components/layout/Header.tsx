"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Medal,
  ChevronDown,
  ChevronRight,
  Play,
  BarChart3,
  Calendar,
  MapPin,
  Trophy,
  FileText,
  Shield,
  HeartHandshake,
  Sun,
  Moon,
  User,
  UserPlus,
  Menu,
  X,
  Home,
  ExternalLink,
  IdCard,
  LayoutDashboard,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const navLinkClass = (href: string, extra = "") => {
    const isActive =
      href === "/" ? pathname === "/" : pathname?.startsWith(href);
    return `${
      isActive
        ? "text-brand-green dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-500/10 font-bold border border-emerald-200/60 dark:border-emerald-500/20"
        : "text-slate-700 dark:text-slate-200 hover:text-brand-green dark:hover:text-emerald-400 font-semibold hover:bg-slate-50 dark:hover:bg-white/5"
    } text-xs xl:text-[13px] px-2.5 xl:px-3 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 ${extra}`;
  };

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-brand-green text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium shadow-inner flex items-center justify-center gap-2">
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-white text-brand-green uppercase tracking-wider">
          Inscrições Abertas
        </span>
        <span>
          &quot;Vem e Traz um Amigo&quot; &bull; Treinos e atividades para todas
          as idades na AJAVP! 🤩
        </span>
        <a
          href="https://ajavp-gestao.vercel.app/inscricao"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-amber-200 font-semibold ml-1 hidden sm:inline"
        >
          Inscreve-te &rarr;
        </a>
      </div>

      {/* Main Navbar */}
      <header
        className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-white/10 shadow-xs transition-colors duration-200"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 mr-2 lg:mr-4 xl:mr-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/logo.webp"
              alt="Logótipo AJAVP"
              className="h-11 sm:h-13 w-auto object-contain transition-transform group-hover:scale-105 dark:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/logo_white.webp"
              alt="Logótipo AJAVP"
              className="h-11 sm:h-13 w-auto object-contain transition-transform group-hover:scale-105 hidden dark:block"
            />
            <div className="flex flex-col justify-center whitespace-nowrap">
              <span className="font-heading font-extrabold text-brand-navy dark:text-white text-lg sm:text-xl tracking-tight leading-tight">
                AJAVP
              </span>
              <span className="text-[10px] xl:text-[11px] leading-tight text-brand-green dark:text-emerald-400 font-semibold tracking-wide hidden sm:block">
                <span className="block">Associação Jovens e Adultos</span>
                <span className="block text-emerald-800 dark:text-emerald-300 font-bold">
                  Vilar do Pinheiro
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-0.5 xl:gap-1"
            aria-label="Navegação Principal"
          >
            <Link href="/" className={navLinkClass("/")}>
              Início
            </Link>

            {/* Dropdown JIF 2026/2027 */}
            <div className="relative group shrink-0">
              <Link
                href="/jif"
                className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 font-semibold text-xs xl:text-[13px] px-2.5 xl:px-3 py-2 rounded-xl hover:bg-amber-50/60 dark:hover:bg-amber-500/10 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Medal className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>JIF 2026/27</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                  XL
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-180 transition-transform duration-200 shrink-0" />
              </Link>

              {/* Floating Dropdown */}
              <div className="absolute left-0 top-full pt-2 w-72 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0 z-50 pointer-events-none group-hover:pointer-events-auto">
                <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 shadow-2xl space-y-1">
                  <Link
                    href="/jif"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/80 dark:hover:bg-amber-500/15 border border-transparent hover:border-amber-300/60 dark:hover:border-amber-400/30 transition-colors group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                        🏆
                      </div>
                      <div>
                        <strong className="text-xs font-black text-slate-800 dark:text-slate-100 group-hover/item:text-amber-900 dark:group-hover/item:text-amber-300 block">
                          Portal dos JIF 2026/27
                        </strong>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          Página principal e visão global
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover/item:text-amber-600 transition-colors" />
                  </Link>

                  <div className="h-px bg-slate-100 dark:bg-white/10 my-1" />

                  <Link
                    href="/jif/futsal"
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-xs font-bold text-slate-800 dark:text-slate-100 block group-hover/item:text-brand-green">
                            Futsal Semanal
                          </strong>
                          <span className="text-[8px] uppercase px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                            Hub
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          Sub-7 a Sub-16 e marcadores
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/jif-classificacao"
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                        <BarChart3 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-xs font-bold text-slate-800 dark:text-slate-100 block group-hover/item:text-blue-600">
                            Classificação Virtual
                          </strong>
                          <span className="text-[8px] uppercase px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-bold">
                            Estimativa
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          19 Freguesias e pautas
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/jif#calendario"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    <Calendar className="w-4 h-4 text-amber-500 ml-1" />
                    <span>Calendário Oficial de Provas</span>
                  </Link>

                  <Link
                    href="/jif#pavilhoes"
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-500 ml-1" />
                      <span>Pavilhões &amp; GPS</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                      Waze / Maps
                    </span>
                  </Link>

                  <Link
                    href="/jif#resultados"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    <Trophy className="w-4 h-4 text-emerald-600 ml-1" />
                    <span>Resultados dos Nossos Jogos</span>
                  </Link>

                  <Link
                    href="/jif#comunicados"
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-amber-500 ml-1" />
                      <span>Comunicados Oficiais</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                      6 Emitidos
                    </span>
                  </Link>

                  <Link
                    href="/jif#modalidades"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    <Shield className="w-4 h-4 text-slate-400 ml-1" />
                    <span>Regulamentos &amp; Escalões</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/modalidades" className={navLinkClass("/modalidades")}>
              Modalidades &amp; Treinos
            </Link>
            <Link href="/associacao" className={navLinkClass("/associacao")}>
              Quem Somos
            </Link>
            <Link
              href="/patrocinadores"
              className={navLinkClass("/patrocinadores", "flex items-center gap-1.5")}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Patrocinadores</span>
            </Link>
            <Link href="/multimedia" className={navLinkClass("/multimedia")}>
              Multimédia
            </Link>
            <Link href="/contactos" className={navLinkClass("/contactos")}>
              Contactos
            </Link>
          </nav>

          {/* Action Buttons & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Alternar Modo Claro / Escuro"
              aria-label="Alternar Modo Claro / Escuro"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-[11px] font-bold text-amber-300">
                    Claro
                  </span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-700">
                    Escuro
                  </span>
                </>
              )}
            </button>

            {/* Link Portal Gestão */}
            <a
              href="https://ajavp-gestao.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 py-2 px-2.5 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all whitespace-nowrap shrink-0 group"
              title="Portal AJAVP Gestão (Secretaria & Administração)"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors shrink-0" />
              <span>Portal Gestão</span>
            </a>

            {/* Link Área de Sócio */}
            <a
              href="https://ajavp-gestao.vercel.app/socio"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-300 py-1.5 px-3 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/10 hover:border-emerald-500 hover:bg-emerald-100/60 dark:hover:bg-emerald-500/20 shadow-xs transition-all whitespace-nowrap shrink-0 group"
              title="Aceder à Área de Sócio da AJAVP (Quotas, Cartão Digital & Dados)"
            >
              <span className="relative flex items-center justify-center w-5 h-5 rounded-md bg-emerald-600 text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <IdCard className="w-3.5 h-3.5" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              </span>
              <span>Área de Sócio</span>
            </a>

            {/* Quero Fazer Parte */}
            <a
              href="https://ajavp-gestao.vercel.app/inscricao"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-brand-green hover:bg-brand-greenDark text-white px-3 py-2 text-xs xl:px-3.5 xl:py-2 xl:text-[13px] rounded-full font-heading font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5 shrink-0" />
              <span>Quero Fazer Parte!</span>
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Alternar Tema"
              className="p-2 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 px-6 py-6 shadow-xl space-y-3 max-h-[85vh] overflow-y-auto">
            <div className="space-y-1.5 text-sm font-medium">
              {/* Portais AJAVP no Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                <a
                  href="https://ajavp-gestao.vercel.app/socio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-md transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/20 text-white">
                      <IdCard className="w-3.5 h-3.5" />
                    </span>
                    <span>
                      Área de Sócio
                      <span className="text-[10px] font-normal text-emerald-100 block">
                        Cartão Digital &amp; Quotas
                      </span>
                    </span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80 group-hover:text-white" />
                </a>

                <a
                  href="https://ajavp-gestao.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs shadow-sm hover:bg-slate-800 border border-slate-700/80 transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 text-slate-300">
                      <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                    <span>
                      Portal Gestão
                      <span className="text-[10px] font-normal text-slate-400 block">
                        Secretaria &amp; Serviços
                      </span>
                    </span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                </a>
              </div>

              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-500/20 font-bold"
              >
                <span className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-emerald-600" /> Início
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              {/* Bloco JIF no Mobile */}
              <div className="rounded-2xl border border-amber-200/80 dark:border-amber-400/20 bg-amber-50/50 dark:bg-amber-500/5 p-2 space-y-1">
                <Link
                  href="/jif"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 px-2.5 rounded-xl text-amber-900 dark:text-amber-300 font-bold text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Medal className="w-4 h-4 text-amber-500" /> Jogos
                    Inter-Freguesias (JIF)
                  </span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                    XL
                  </span>
                </Link>
                <div className="pl-4 space-y-1 text-xs pt-1 border-t border-amber-200/40 dark:border-white/5">
                  <Link
                    href="/jif/futsal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-emerald-600 font-semibold"
                  >
                    <Play className="w-3 h-3 text-emerald-500" />
                    <span>Futsal Semanal (Hub)</span>
                  </Link>
                  <Link
                    href="/jif-classificacao"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 font-semibold"
                  >
                    <BarChart3 className="w-3 h-3 text-blue-500" />
                    <span>Classificação Virtual</span>
                  </Link>
                </div>
              </div>

              <Link
                href="/modalidades"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <span>Modalidades &amp; Treinos</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/associacao"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <span>Quem Somos</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/patrocinadores"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <span>Patrocinadores &amp; Apoios</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/multimedia"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <span>Multimédia</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/contactos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <span>Contactos</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

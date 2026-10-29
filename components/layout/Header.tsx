"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DynamicTopBanner } from "./DynamicTopBanner";
import {
  Medal,
  ChevronDown,
  ChevronRight,
  Play,
  BarChart3,
  MapPin,
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
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isJifDropdownOpen, setIsJifDropdownOpen] = useState(false);
  const jifDropdownRef = useRef<HTMLDivElement>(null);

  const navLinkClass = (href: string, extra = "") => {
    const isActive =
      href === "/" ? pathname === "/" : pathname?.startsWith(href);
    return `${
      isActive
        ? "text-brand-green dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-500/10 font-bold border border-emerald-200/60 dark:border-emerald-500/20"
        : "text-slate-700 dark:text-slate-200 hover:text-brand-green dark:hover:text-emerald-400 font-semibold hover:bg-slate-50 dark:hover:bg-white/5"
    } text-xs xl:text-[13px] px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 ${extra}`;
  };

  const handleA11yClick = () => {
    if (typeof window === "undefined") return;
    const win = window as unknown as { ajavpA11y?: { toggle: () => void } };
    if (win.ajavpA11y?.toggle) {
      win.ajavpA11y.toggle();
      return;
    }

    const triggerBtn = document.getElementById("a11yTriggerBtn");
    if (triggerBtn) {
      triggerBtn.click();
      return;
    }

    // Dynamic fallback
    let script = document.getElementById("a11y-core-script") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "a11y-core-script";
      script.src = "/assets/js/a11y.js";
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", () => {
      setTimeout(() => {
        if (win.ajavpA11y?.toggle) {
          win.ajavpA11y.toggle();
        } else {
          document.getElementById("a11yTriggerBtn")?.click();
        }
      }, 50);
    }, { once: true });
  };

  // Fechar dropdowns ao mudar de página
  useEffect(() => {
    setIsJifDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Fecho com clique fora e tecla Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        jifDropdownRef.current &&
        !jifDropdownRef.current.contains(event.target as Node)
      ) {
        setIsJifDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsJifDropdownOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      {/* Top Banner Dinâmico baseado no Calendário Oficial */}
      <DynamicTopBanner />

      {/* Main Navbar */}
      <header
        className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-white/10 shadow-xs transition-colors duration-200"
        role="banner"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 xl:gap-4">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0 mr-1.5 lg:mr-3 xl:mr-4"
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
            className="hidden lg:flex items-center gap-0.5 xl:gap-1.5"
            aria-label="Navegação Principal"
          >
            <Link href="/" className={navLinkClass("/")}>
              Início
            </Link>

            {/* Dropdown JIF 2026/2027 */}
            <div ref={jifDropdownRef} className="relative group shrink-0">
              <button
                type="button"
                onClick={() => setIsJifDropdownOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsJifDropdownOpen(true);
                  }
                }}
                aria-expanded={isJifDropdownOpen}
                aria-haspopup="menu"
                aria-controls="jif-desktop-menu"
                className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 font-semibold text-xs xl:text-[13px] px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-xl hover:bg-amber-50/60 dark:hover:bg-amber-500/10 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500/50"
              >
                <Medal className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>JIF 2026/27</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                  XL
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-amber-500 transition-transform duration-200 shrink-0 ${
                    isJifDropdownOpen ? "rotate-180" : "group-hover:rotate-180"
                  }`}
                />
              </button>

              {/* Floating Dropdown */}
              <div
                id="jif-desktop-menu"
                role="menu"
                className={`absolute left-0 top-full pt-2 w-72 transition-all duration-200 transform origin-top-left z-50 ${
                  isJifDropdownOpen
                    ? "visible opacity-100 translate-y-0 pointer-events-auto"
                    : "invisible opacity-0 -translate-y-2 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto"
                }`}
              >
                <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 shadow-2xl space-y-1">
                  <Link
                    href="/jif"
                    role="menuitem"
                    onClick={() => setIsJifDropdownOpen(false)}
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
                    role="menuitem"
                    onClick={() => setIsJifDropdownOpen(false)}
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
                    href="/jif/classificacao"
                    role="menuitem"
                    onClick={() => setIsJifDropdownOpen(false)}
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
                    href="/jif#pavilhoes"
                    role="menuitem"
                    onClick={(e) => {
                      setIsJifDropdownOpen(false);
                      if (typeof window !== 'undefined' && window.location.pathname === '/jif') {
                        e.preventDefault();
                        window.history.pushState(null, '', '/jif#pavilhoes');
                        window.dispatchEvent(new CustomEvent('jif-tab-change', { detail: 'pavilhoes' }));
                        document.getElementById('hub-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-800 dark:text-slate-100 block group-hover/item:text-emerald-600">
                          Pavilhões &amp; GPS
                        </strong>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          Rotas em 1 toque
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                      Waze / Maps
                    </span>
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
            {/* A11y Accessibility Modal Trigger */}
            <button
              type="button"
              onClick={handleA11yClick}
              className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer flex items-center justify-center shrink-0"
              title="Acessibilidade &amp; Usabilidade (Atalho: Alt + A)"
              aria-label="Abrir Painel de Acessibilidade"
            >
              <span className="text-xs font-bold flex items-center gap-1" aria-hidden="true">
                ♿ <span className="text-[11px] font-heading hidden xl:inline">A11y</span>
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center shrink-0"
              title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
              aria-label={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 shrink-0" />
              )}
            </button>

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
            {/* A11y Accessibility Mobile Trigger */}
            <button
              type="button"
              onClick={handleA11yClick}
              aria-label="Abrir Painel de Acessibilidade"
              title="Acessibilidade (Alt + A)"
              className="p-2 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              <span className="text-base" aria-hidden="true">♿</span>
            </button>

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
              {/* Portal do Sócio no Mobile */}
              <div className="mb-2">
                <a
                  href="https://ajavp-gestao.vercel.app/socio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-md transition-all group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/20 text-white">
                      <IdCard className="w-4 h-4" />
                    </span>
                    <span>
                      Área de Sócio
                      <span className="text-[10px] font-normal text-emerald-100 block">
                        Cartão Digital, Quotas &amp; Inscrições
                      </span>
                    </span>
                  </span>
                  <ExternalLink className="w-4 h-4 text-white/80 group-hover:text-white" />
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
                    href="/jif/classificacao"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 font-semibold"
                  >
                    <BarChart3 className="w-3 h-3 text-blue-500" />
                    <span>Classificação Virtual</span>
                  </Link>
                  <Link
                    href="/jif#pavilhoes"
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (typeof window !== 'undefined' && window.location.pathname === '/jif') {
                        e.preventDefault();
                        window.history.pushState(null, '', '/jif#pavilhoes');
                        window.dispatchEvent(new CustomEvent('jif-tab-change', { detail: 'pavilhoes' }));
                        document.getElementById('hub-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-emerald-600 font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      <span>Pavilhões &amp; GPS</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                      Waze / Maps
                    </span>
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

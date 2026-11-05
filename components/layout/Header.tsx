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
  Smartphone,
  Bell,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isJifDropdownOpen, setIsJifDropdownOpen] = useState(false);
  const jifDropdownRef = useRef<HTMLDivElement>(null);
  const [isSomosVdpDropdownOpen, setIsSomosVdpDropdownOpen] = useState(false);
  const somosVdpDropdownRef = useRef<HTMLDivElement>(null);

  const isSomosVdpActive =
    ["/associacao", "/socios", "/patrocinadores", "/multimedia"].some((p) =>
      pathname?.startsWith(p)
    );

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
    setIsSomosVdpDropdownOpen(false);
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
      if (
        somosVdpDropdownRef.current &&
        !somosVdpDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSomosVdpDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsJifDropdownOpen(false);
        setIsSomosVdpDropdownOpen(false);
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
            <div ref={jifDropdownRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsJifDropdownOpen((prev) => !prev);
                  setIsSomosVdpDropdownOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsJifDropdownOpen(true);
                  }
                }}
                aria-expanded={isJifDropdownOpen}
                aria-haspopup="menu"
                aria-controls="jif-desktop-menu"
                className={`${
                  pathname?.startsWith("/jif")
                    ? "text-amber-700 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-500/10 font-bold border border-amber-200/60 dark:border-amber-500/20"
                    : "text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 font-semibold hover:bg-amber-50/60 dark:hover:bg-amber-500/10"
                } text-xs xl:text-[13px] px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500/50`}
              >
                <Medal className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>JIF 2026/27</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                  XL
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-amber-500 transition-transform duration-200 shrink-0 ${
                    isJifDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Floating Dropdown */}
              {isJifDropdownOpen && (
                <div
                  id="jif-desktop-menu"
                  role="menu"
                  className="absolute left-0 top-full mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xl p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150 backdrop-blur-md space-y-1"
                >
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
              )}
            </div>

            <Link href="/modalidades" className={navLinkClass("/modalidades")}>
              Modalidades &amp; Treinos
            </Link>

            {/* Menu Dropdown Somos VdP */}
            <div className="relative" ref={somosVdpDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsSomosVdpDropdownOpen((prev) => !prev);
                  setIsJifDropdownOpen(false);
                }}
                aria-expanded={isSomosVdpDropdownOpen}
                className={`${
                  isSomosVdpActive
                    ? "text-brand-green dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-500/10 font-bold border border-emerald-200/60 dark:border-emerald-500/20"
                    : "text-slate-700 dark:text-slate-200 hover:text-brand-green dark:hover:text-emerald-400 font-semibold hover:bg-slate-50 dark:hover:bg-white/5"
                } text-xs xl:text-[13px] px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer`}
              >
                <span>Somos VdP</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isSomosVdpDropdownOpen
                      ? "rotate-180 text-brand-green"
                      : "text-slate-400"
                  }`}
                />
              </button>

              {isSomosVdpDropdownOpen && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xl p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150 backdrop-blur-md"
                >
                  <Link
                    href="/associacao"
                    role="menuitem"
                    onClick={() => setIsSomosVdpDropdownOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                        <Home className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-800 dark:text-slate-100 block group-hover/item:text-brand-green">
                          Quem Somos &amp; Pavilhões
                        </strong>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                          História, órgãos e recintos
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/socios"
                    role="menuitem"
                    onClick={() => setIsSomosVdpDropdownOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
                        <UserPlus className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-xs font-bold text-slate-800 dark:text-slate-100 block group-hover/item:text-amber-600">
                            Sócios &amp; Quotas
                          </strong>
                          <span className="text-[8px] uppercase px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                            26/27
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                          Quotas desde 1€/mês e vantagens
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/patrocinadores"
                    role="menuitem"
                    onClick={() => setIsSomosVdpDropdownOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                        <HeartHandshake className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-800 dark:text-slate-100 block group-hover/item:text-brand-green">
                          Patrocinadores &amp; Apoios
                        </strong>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                          Parceiros da nossa terra
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/multimedia"
                    role="menuitem"
                    onClick={() => setIsSomosVdpDropdownOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                        <Play className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-800 dark:text-slate-100 block group-hover/item:text-blue-600">
                          Multimédia &amp; Galeria
                        </strong>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                          Vídeos e fotografias oficiais
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="h-px bg-slate-100 dark:bg-white/10 my-1" />

                  <a
                    href="https://ajavp-gestao.vercel.app/socio"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    onClick={() => setIsSomosVdpDropdownOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 transition-colors group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <IdCard className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <strong className="text-xs font-bold block">
                          Área de Sócio (Cartão Digital)
                        </strong>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                          Para associados existentes
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-emerald-600" />
                  </a>
                </div>
              )}
            </div>

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

            {/* Web Push Notifications Trigger */}
            <button
              data-push-toggle
              type="button"
              className="p-2 rounded-xl border border-amber-300/60 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-colors cursor-pointer flex items-center justify-center shrink-0"
              title="Ativar Avisos e Convocatórias no Telemóvel"
              aria-label="Ativar Notificações da AJAVP"
            >
              <Bell className="w-4 h-4 shrink-0" />
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

            {/* Quero Ser Sócio (Botão Único em Destaque) */}
            <Link
              href="/socios"
              className="inline-flex items-center gap-1.5 bg-brand-green hover:bg-brand-greenDark text-white px-4 py-2 text-xs xl:px-4.5 xl:py-2.5 xl:text-[13px] rounded-full font-heading font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5 shrink-0 text-amber-300" />
              <span>Quero Ser Sócio</span>
            </Link>
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

            {/* Notificações no Mobile Top */}
            <button
              data-push-toggle
              type="button"
              aria-label="Ativar Notificações da AJAVP"
              title="Ativar Avisos no Telemóvel"
              className="p-2 rounded-lg border border-amber-300/60 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5 shrink-0" />
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
              {/* CTAs de Sócios no Mobile */}
              <div className="mb-3 space-y-2">
                <Link
                  href="/socios"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-md transition-all group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/20 text-white">
                      <UserPlus className="w-4 h-4 text-amber-300" />
                    </span>
                    <span>
                      Quero Ser Sócio
                      <span className="text-[10px] font-normal text-emerald-100 block">
                        Quotas desde 1€/mês &amp; Inscrição Online
                      </span>
                    </span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/80 group-hover:text-white" />
                </Link>

                <a
                  href="https://ajavp-gestao.vercel.app/socio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 px-3.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
                      <IdCard className="w-3.5 h-3.5" />
                    </span>
                    <span>Área de Sócio (Já Sou Sócio)</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
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

              {/* Bloco Somos VdP no Mobile */}
              <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5 p-2 space-y-1">
                <div className="px-2.5 py-1 text-emerald-900 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>Somos VdP</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 lowercase">associação</span>
                </div>
                <div className="pl-2 space-y-1 text-xs pt-1 border-t border-emerald-200/40 dark:border-white/5">
                  <Link
                    href="/associacao"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-emerald-600 font-semibold"
                  >
                    <Home className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Quem Somos &amp; Pavilhões</span>
                  </Link>
                  <Link
                    href="/socios"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-emerald-600 font-semibold"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Sócios &amp; Quotas 26/27</span>
                  </Link>
                  <Link
                    href="/patrocinadores"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-emerald-600 font-semibold"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Patrocinadores &amp; Apoios</span>
                  </Link>
                  <Link
                    href="/multimedia"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-emerald-600 font-semibold"
                  >
                    <Play className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Multimédia &amp; Galeria</span>
                  </Link>
                </div>
              </div>
              <Link
                href="/contactos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <span>Contactos</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              {/* Botões PWA & Notificações Push no Mobile */}
              <div className="pt-2.5 mt-1 border-t border-slate-200/80 dark:border-white/10 space-y-2">
                <button
                  data-push-toggle
                  type="button"
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-950/15 text-slate-950">
                      <Bell className="w-4 h-4 shrink-0" />
                    </span>
                    <span className="push-btn-text">Ativar Avisos no Telemóvel</span>
                  </span>
                  <span className="push-btn-badge text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-amber-300 font-black uppercase tracking-wider">
                    Alertas
                  </span>
                </button>

                <button
                  id="pwaInstallDrawerBtn"
                  data-pwa-install
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-100 font-bold text-xs transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <Smartphone className="w-4 h-4" />
                    </span>
                    <span>Instalar Aplicação AJAVP</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500 text-white font-bold uppercase tracking-wider">
                    App
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowRight,
  ExternalLink,
  MapPin,
  FileText,
  IdCard,
  Compass,
  Newspaper,
  Calendar,
  CornerDownLeft,
} from "lucide-react";
import {
  STATIC_SEARCH_ITEMS,
  SEARCH_CATEGORY_LABELS,
  filterSearchItems,
  type SearchItem,
  type SearchCategory,
} from "@/lib/search-index";

interface SearchPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_CHIPS = ["Futsal", "Sócio", "Classificação", "Pavilhão", "Horários"];

const DEFAULT_SUGGESTION_IDS = [
  "socio-quotas",
  "socio-portal",
  "page-jif-futsal",
  "page-jif-classificacao",
  "page-modalidades",
  "page-jif-hub",
];

function getCategoryIcon(category: SearchCategory) {
  switch (category) {
    case "socio":
      return <IdCard className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />;
    case "pavilhao":
      return <MapPin className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />;
    case "comunicado":
      return <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />;
    case "noticia":
      return <Newspaper className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />;
    case "evento":
      return <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />;
    default:
      return <Compass className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />;
  }
}

export function SearchPaletteModal({ isOpen, onClose }: SearchPaletteModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [dynamicItems, setDynamicItems] = useState<SearchItem[]>([]);
  const [hasFetchedDynamic, setHasFetchedDynamic] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Carregamento lazy do índice dinâmico (notícias e eventos) na 1ª abertura
  useEffect(() => {
    if (!isOpen || hasFetchedDynamic) return;

    let cancelled = false;
    fetch("/api/search-index")
      .then((res) => (res.ok ? res.json() : { items: [] }))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.items)) {
          setDynamicItems(data.items);
          setHasFetchedDynamic(true);
        }
      })
      .catch(() => {
        // Offline ou erro de rede: mantém índice estático a 100%
        if (!cancelled) setHasFetchedDynamic(true);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, hasFetchedDynamic]);

  // Foco automático e bloqueio de scroll ao abrir
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setActiveIndex(0);
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const rafId = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const allItems = useMemo(
    () => [...STATIC_SEARCH_ITEMS, ...dynamicItems],
    [dynamicItems]
  );

  const results = useMemo(() => {
    if (!query.trim()) {
      return STATIC_SEARCH_ITEMS.filter((item) =>
        DEFAULT_SUGGESTION_IDS.includes(item.id)
      );
    }
    return filterSearchItems(allItems, query).slice(0, 20);
  }, [allItems, query]);

  // Agrupar resultados por categoria mantendo a ordem de relevância
  const groupedResults = useMemo(() => {
    const groups: { category: SearchCategory; label: string; items: SearchItem[] }[] = [];
    const map = new Map<SearchCategory, SearchItem[]>();

    for (const item of results) {
      const existing = map.get(item.category);
      if (existing) {
        existing.push(item);
      } else {
        const arr = [item];
        map.set(item.category, arr);
        groups.push({
          category: item.category,
          label: query.trim()
            ? SEARCH_CATEGORY_LABELS[item.category]
            : "Acesso Rápido & Sugestões",
          items: arr,
        });
      }
    }

    // Quando sem query, consolidar num único grupo limpo
    if (!query.trim() && groups.length > 0) {
      return [
        {
          category: "pagina" as SearchCategory,
          label: "Acesso Rápido & Sugestões",
          items: results,
        },
      ];
    }

    return groups;
  }, [results, query]);

  const flatResults = useMemo(
    () => groupedResults.flatMap((g) => g.items),
    [groupedResults]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleSelectItem = useCallback(
    (item: SearchItem) => {
      onClose();
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [onClose, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }

    if (flatResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % flatResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = flatResults[activeIndex];
      if (target) handleSelectItem(target);
    }
  };

  // Garantir que o item selecionado por teclado fica visível na lista com scroll
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-search-index="${activeIndex}"]`);
    if (activeEl instanceof HTMLElement) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, isOpen]);

  if (!isOpen) return null;

  let runningIndex = -1;

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4 pb-6"
      role="dialog"
      aria-modal="true"
      aria-label="Pesquisar no site da AJAVP"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Janela da Paleta */}
      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden animate-in fade-in zoom-in-[0.97] duration-150 ease-out">
        {/* Barra de Input */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 dark:border-white/10">
          <Search className="w-5 h-5 text-brand-green dark:text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar modalidades, futsal, pavilhões, sócios, notícias..."
            aria-label="Termo de pesquisa"
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none min-w-0"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15 transition-colors cursor-pointer shrink-0"
            >
              Limpar
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar pesquisa"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chips de Pesquisa Rápida */}
        {!query.trim() && (
          <div className="px-4 sm:px-5 py-2.5 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-100 dark:border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
              Procurar:
            </span>
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => {
                  setQuery(chip);
                  inputRef.current?.focus();
                }}
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-brand-green dark:hover:border-emerald-400 hover:text-brand-green dark:hover:text-emerald-300 transition-[transform,border-color,color] duration-150 active:scale-[0.97] shrink-0 cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Lista de Resultados */}
        <div
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto overscroll-contain p-2 sm:p-3 space-y-3"
        >
          {flatResults.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Sem resultados para &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Tenta pesquisar por &ldquo;futsal&rdquo;, &ldquo;quotas&rdquo;, &ldquo;classificação&rdquo; ou pelo nome de uma freguesia.
              </p>
            </div>
          ) : (
            groupedResults.map((group) => (
              <div key={group.category} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {group.label}
                </div>
                {group.items.map((item) => {
                  runningIndex += 1;
                  const idx = runningIndex;
                  const isActive = idx === activeIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-search-index={idx}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => handleSelectItem(item)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-[transform,background-color] duration-120 ease-out active:scale-[0.99] cursor-pointer ${
                        isActive
                          ? "bg-emerald-50/90 dark:bg-emerald-500/15 ring-1 ring-emerald-500/30"
                          : "hover:bg-slate-50 dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive
                              ? "bg-white dark:bg-slate-800 shadow-2xs"
                              : "bg-slate-100 dark:bg-white/5"
                          }`}
                        >
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`text-xs sm:text-sm font-bold truncate ${
                              isActive
                                ? "text-brand-green dark:text-emerald-300"
                                : "text-slate-800 dark:text-slate-100"
                            }`}
                          >
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 text-slate-400">
                        {item.external ? (
                          <ExternalLink className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowRight
                            className={`w-3.5 h-3.5 transition-transform duration-150 ${
                              isActive
                                ? "translate-x-0.5 text-brand-green dark:text-emerald-400"
                                : ""
                            }`}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Rodapé de Atalhos (Desktop) */}
        <div className="hidden sm:flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 font-mono text-[10px]">
                ↑↓
              </kbd>
              navegar
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 font-mono text-[10px] inline-flex items-center">
                <CornerDownLeft className="w-2.5 h-2.5" />
              </kbd>
              abrir
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 font-mono text-[10px]">
                esc
              </kbd>
              fechar
            </span>
          </div>
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
            Pesquisa AJAVP
          </span>
        </div>
      </div>
    </div>
  );
}


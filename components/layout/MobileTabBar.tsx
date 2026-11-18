"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Calendar, Users, Search } from "lucide-react";

export function MobileTabBar() {
  const pathname = usePathname();

  const handleOpenSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
      })
    );
  };

  const handleAgendaClick = () => {
    if (pathname === "/jif") {
      window.dispatchEvent(
        new CustomEvent("jif-tab-change", { detail: "calendario" })
      );
    }
  };

  const navItems = [
    {
      label: "Início",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Jogos JIF",
      href: "/jif/futsal",
      icon: Trophy,
      isActive:
        pathname.startsWith("/jif/futsal") ||
        pathname.startsWith("/jif/classificacao"),
    },
    {
      label: "Agenda",
      href: "/jif#calendario",
      icon: Calendar,
      onLinkClick: handleAgendaClick,
      isActive: pathname === "/jif",
    },
    {
      label: "Sócios",
      href: "/socios",
      icon: Users,
      isActive: pathname.startsWith("/socios"),
    },
    {
      label: "Pesquisa",
      href: "#search",
      icon: Search,
      onClick: handleOpenSearch,
      isActive: false,
    },
  ];

  return (
    <nav
      aria-label="Navegação rápida móvel"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200/80 dark:border-white/10 pb-safe xl:hidden transition-colors duration-200"
    >
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <span
              className={`motion-press flex flex-col items-center justify-center w-full h-full py-1 text-[10px] font-bold transition-all relative ${
                item.isActive
                  ? "text-brand-green dark:text-emerald-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {item.isActive && (
                <span className="absolute top-1 w-6 h-0.5 rounded-full bg-brand-green dark:bg-emerald-400" />
              )}
              <Icon
                className={`w-5 h-5 transition-transform ${
                  item.isActive ? "scale-105 stroke-[2.5]" : "stroke-[1.8]"
                }`}
              />
              <span className="mt-0.5 leading-none tracking-tight">{item.label}</span>
            </span>
          );

          if (item.onClick) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className="flex-1 flex items-center justify-center h-full cursor-pointer focus:outline-hidden"
                aria-label={item.label}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={item.onLinkClick}
              className="flex-1 flex items-center justify-center h-full focus:outline-hidden"
              aria-label={item.label}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

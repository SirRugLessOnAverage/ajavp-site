import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-navy dark:bg-slate-950 text-white pt-16 pb-12 border-t border-brand-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/logo.webp"
                alt="Logótipo AJAVP"
                className="h-14 w-auto bg-white p-1 rounded-lg dark:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/logo_white.webp"
                alt="Logótipo AJAVP"
                className="h-14 w-auto bg-white/10 p-1 rounded-lg hidden dark:block"
              />
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  AJAVP
                </h3>
                <p className="text-xs text-emerald-300">
                  Vilar do Pinheiro &bull; Época 2026/2027
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm max-w-sm">
              Associação Jovens e Adultos de Vilar do Pinheiro. Promovemos o
              desporto, a saúde e os laços comunitários de todas as gerações.
            </p>
            <div className="space-y-1 text-xs text-slate-300">
              <p>
                <strong className="text-white">NIPC / NIF:</strong> 519096045
              </p>
              <p className="text-amber-300 font-semibold italic">
                &quot;A Tua Terra Tem Futuro&quot;
              </p>
            </div>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-300 transition-colors font-bold text-emerald-300"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/jif"
                  className="hover:text-emerald-300 transition-colors"
                >
                  JIF 2026/27
                </Link>
              </li>
              <li>
                <Link
                  href="/modalidades"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Modalidades &amp; Treinos
                </Link>
              </li>
              <li>
                <Link
                  href="/associacao"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Quem Somos &amp; Pavilhões
                </Link>
              </li>
              <li>
                <Link
                  href="/patrocinadores"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Patrocinadores &amp; Parceiros
                </Link>
              </li>
              <li>
                <Link
                  href="/multimedia"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Multimédia &amp; Vídeos
                </Link>
              </li>
              <li>
                <Link
                  href="/contactos"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Contactos &amp; Inscrições
                </Link>
              </li>
              <li>
                <a
                  href="https://ajavp-gestao.vercel.app/socio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors text-emerald-400 font-semibold flex items-center gap-1.5"
                >
                  <span>💳</span> Área de Sócio
                </a>
              </li>
              <li>
                <a
                  href="https://ajavp-gestao.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors text-slate-300 flex items-center gap-1.5"
                >
                  <span>🏛️</span> Portal AJAVP Gestão
                </a>
              </li>
              <li>
                <Link
                  href="/acessibilidade"
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span aria-hidden="true">♿</span> Acessibilidade &amp;
                  Usabilidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Modalidades Col */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white">
              Modalidades
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  href="/modalidades"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Futsal &amp; Futebol
                </Link>
              </li>
              <li>
                <Link
                  href="/modalidades"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Atletismo &amp; Corta-Mato
                </Link>
              </li>
              <li>
                <Link
                  href="/modalidades"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Ténis de Mesa
                </Link>
              </li>
              <li>
                <Link
                  href="/modalidades"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Duatlo em Duplas
                </Link>
              </li>
              <li>
                <Link
                  href="/modalidades"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Badminton
                </Link>
              </li>
              <li>
                <Link
                  href="/modalidades"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Futebol de Praia
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Channels Col */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white">
              Canais Oficiais
            </h4>
            <div className="flex flex-col space-y-2.5 text-sm text-slate-300">
              <a
                href="https://www.instagram.com/ajavp.javip"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-pink-400 transition-colors group"
              >
                <span className="w-7 h-7 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center group-hover:bg-linear-to-tr group-hover:from-amber-500 group-hover:via-pink-500 group-hover:to-purple-600 group-hover:text-white transition-all shrink-0">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </span>
                <span className="font-medium">@ajavp.javip</span>
              </a>
              <a
                href="https://www.facebook.com/ajavp.oficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-blue-400 transition-colors group"
              >
                <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white transition-all shrink-0">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </span>
                <span className="font-medium">ajavp.oficial</span>
              </a>
              <a
                href="https://www.youtube.com/@AJAVP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-red-400 transition-colors group"
              >
                <span className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center group-hover:bg-[#FF0000] group-hover:text-white transition-all shrink-0">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </span>
                <span className="font-medium">@AJAVP</span>
              </a>
              <a
                href="https://chat.whatsapp.com/BLxsjBfDw7AEAonDy72187"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors group"
              >
                <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all shrink-0">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
                  </svg>
                </span>
                <span className="font-medium">Comunidade WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-4">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span>
              &copy; 2026 Associação Jovens e Adultos de Vilar do Pinheiro &bull; NIF 519096045
            </span>
            <span className="text-slate-600 hidden sm:inline">&bull;</span>
            <a
              href="https://ajavp-gestao.vercel.app/socio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline font-semibold transition-colors"
            >
              Área de Sócio
            </a>
            <span className="text-slate-600">&bull;</span>
            <a
              href="https://ajavp-gestao.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white underline font-semibold transition-colors"
            >
              Portal Gestão
            </a>
            <span className="text-slate-600">&bull;</span>
            <Link
              href="/admin-alertas"
              className="text-amber-300 hover:text-amber-200 underline font-semibold transition-colors"
            >
              Área da Direção
            </Link>
          </div>
          <p className="text-slate-400">
            Desenvolvido com dedicação para a comunidade de Vilar do Pinheiro.
          </p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useState } from 'react';
import { JIF_VENUES, JifVenue } from '@/data/jif/pavilhoes';
import { MapPin, Navigation, Map, Copy, Check, Car, Search, Filter } from 'lucide-react';

export default function JifPavilhoesList() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Recintos' },
    { id: 'futsal', label: 'Futsal' },
    { id: 'futebol', label: 'Futebol' },
    { id: 'atletismo', label: 'Atletismo' },
    { id: 'praia', label: 'Desportos de Areia' }
  ];

  const filteredVenues = JIF_VENUES.filter((v: JifVenue) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'futsal' && (v.category === 'futsal' || v.sports.some(s => s.toLowerCase().includes('futsal')))) ||
      (selectedCategory === 'futebol' && (v.category === 'futebol' || v.sports.some(s => s.toLowerCase().includes('futebol')))) ||
      (selectedCategory === 'atletismo' && (v.category === 'atletismo' || v.sports.some(s => s.toLowerCase().includes('corta-mato') || s.toLowerCase().includes('atletismo') || s.toLowerCase().includes('duatlo')))) ||
      (selectedCategory === 'praia' && v.category === 'praia') ||
      v.category === selectedCategory;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      v.name.toLowerCase().includes(q) ||
      v.parish.toLowerCase().includes(q) ||
      v.address.toLowerCase().includes(q) ||
      v.sports.some(s => s.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleCopyAddress = (id: string, address: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(address).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por recinto, freguesia, modalidade ou rua..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-extrabold'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Venues Grid */}
      {filteredVenues.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-400 space-y-3">
          <MapPin className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm">Nenhum recinto encontrado para a pesquisa especificada.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-xs hover:bg-amber-400 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVenues.map((v) => {
            const isCopied = copiedId === v.id;
            return (
              <div
                key={v.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 hover:border-amber-400/70 dark:hover:border-amber-400/60 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between gap-4 group"
              >
                <div>
                  {/* Header & Distance */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/10">
                    <div className="space-y-1">
                      <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                        {v.categoryLabel}
                      </span>
                      <h3 className="font-heading font-black text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                        {v.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{v.parish}</span>
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/20 px-2 py-1 rounded-xl border border-emerald-200 dark:border-emerald-500/30">
                        <Car className="w-3 h-3" />
                        <span>{v.driveFromAjavp}</span>
                      </span>
                    </div>
                  </div>

                  {/* Sports and Parking */}
                  <div className="py-3 space-y-2.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {v.sports.map((sport, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 leading-relaxed">
                      <strong className="text-amber-600 dark:text-amber-400 font-bold">Estacionamento:</strong> {v.parkingInfo}
                    </p>
                  </div>
                </div>

                {/* Actions: Maps, Waze, Copy */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/10 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={v.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs shadow-xs hover:shadow-md transition-all text-center"
                    >
                      <Map className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                    <a
                      href={v.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-heading font-bold text-xs shadow-xs hover:shadow-md transition-all text-center"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Waze</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyAddress(v.id, v.address)}
                    className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-500 text-white font-bold'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300'
                    }`}
                    title="Copiar morada para a área de transferência"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Morada Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{v.address}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

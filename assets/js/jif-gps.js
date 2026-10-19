/**
 * AJAVP - Guia de Recintos & GPS dos Jogos Inter-Freguesias (JIF)
 * Catálogo oficial de pavilhões e complexos desportivos com rotas para Google Maps e Waze.
 */

(function (window) {
  'use strict';

  const AJAVP_VENUES = [
    {
      id: 'modivas',
      name: 'Pavilhão Desportivo de Modivas',
      shortName: 'Pav. Modivas',
      parish: 'Modivas, Vila do Conde',
      category: 'futsal',
      categoryLabel: 'Futsal Concelhio',
      sports: ['Futsal Sub-9', 'Futsal Sub-13'],
      address: 'Rua do Pavilhão Desportivo, 4485-481 Modivas',
      driveFromAjavp: '~6 km • 8 min',
      parkingInfo: 'Estacionamento junto à Escola Básica e campo sintético.',
      badgeColor: 'amber',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Modivas+Vila+do+Conde',
      wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Modivas+Vila+do+Conde&navigate=yes',
      coords: '41.3065,-8.7001'
    },
    {
      id: 'canidelo',
      name: 'Pavilhão Desportivo de Canidelo',
      shortName: 'Pav. Canidelo',
      parish: 'Canidelo, Vila do Conde',
      category: 'futsal',
      categoryLabel: 'Futsal & Ténis de Mesa',
      sports: ['Futsal Sub-7, 9, 11 e 13', 'Ténis de Mesa JIF'],
      address: 'Rua do Souto / Lugar do Souto, 4485-060 Canidelo',
      driveFromAjavp: '~7 km • 10 min',
      parkingInfo: 'Parque frontal com lugares disponíveis na rua circundante.',
      badgeColor: 'emerald',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Canidelo+Vila+do+Conde',
      wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Canidelo+Vila+do+Conde&navigate=yes',
      coords: '41.3283,-8.6728'
    },
    {
      id: 'fajozes',
      name: 'Pavilhão Desportivo de Fajozes',
      shortName: 'Pav. Fajozes',
      parish: 'Fajozes, Vila do Conde',
      category: 'futsal',
      categoryLabel: 'Futsal Formação',
      sports: ['Futsal Sub-11', 'Futsal Sub-13'],
      address: 'Rua de S. Gens, 4485-181 Fajozes',
      driveFromAjavp: '~5.5 km • 8 min',
      parkingInfo: 'Junto à Escola Básica e ao polidesportivo de Fajozes.',
      badgeColor: 'teal',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Fajozes',
      wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Fajozes&navigate=yes',
      coords: '41.3225,-8.6942'
    },
    {
      id: 'caxinas',
      name: 'Pavilhão de Caxinas (Campo 2)',
      shortName: 'Pav. Caxinas C2',
      parish: 'Caxinas, Vila do Conde',
      category: 'futsal',
      categoryLabel: 'Futsal Sub-7 & Sub-9',
      sports: ['Futsal Sub-7 (Campo 2)', 'Futsal Sub-9'],
      address: 'Av. Bento de Freitas, 4480-779 Vila do Conde',
      driveFromAjavp: '~10 km • 13 min',
      parkingInfo: 'Zona residencial costeira. Recomenda-se chegar 15 min antes.',
      badgeColor: 'sky',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Caxinas+Vila+do+Conde',
      wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Caxinas+Vila+do+Conde&navigate=yes',
      coords: '41.3619,-8.7511'
    },
    {
      id: 'mindelo',
      name: 'Pavilhão Desportivo de Mindelo',
      shortName: 'Pav. Mindelo',
      parish: 'Mindelo, Vila do Conde',
      category: 'futsal',
      categoryLabel: 'Futsal & Ginástica',
      sports: ['Futsal Formação JIF', 'Modalidades de Pavilhão'],
      address: 'Rua das Areias, 4485-422 Mindelo',
      driveFromAjavp: '~8 km • 11 min',
      parkingInfo: 'Parque de estacionamento amplo junto ao complexo escolar.',
      badgeColor: 'indigo',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Mindelo',
      wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Mindelo&navigate=yes',
      coords: '41.3142,-8.7214'
    },
    {
      id: 'municipal-desportos',
      name: 'Pavilhão Municipal de Desportos',
      shortName: 'Pav. Municipal',
      parish: 'Centro, Vila do Conde',
      category: 'pavilhão',
      categoryLabel: 'Recinto Nobre Concelhio',
      sports: ['Badminton', 'Finais de Futsal', 'Festa de Encerramento JIF'],
      address: 'Av. Júlio Graça / Av. Dr. Artur Cunha Araújo, 4480-754 Vila do Conde',
      driveFromAjavp: '~11 km • 14 min',
      parkingInfo: 'Parque amplo exterior ao lado do Parque de Jogos.',
      badgeColor: 'amber',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Municipal+de+Desportos+de+Vila+do+Conde',
      wazeUrl: 'https://waze.com/ul?q=Pavilh%C3%A3o+Municipal+de+Desportos+de+Vila+do+Conde&navigate=yes',
      coords: '41.3533,-8.7428'
    },
    {
      id: 'agros',
      name: 'Espaço AGROS (Parque Verde)',
      shortName: 'Espaço AGROS',
      parish: 'Argivai / Vila do Conde',
      category: 'atletismo',
      categoryLabel: 'Corta-Mato & Provas de Estrada',
      sports: ['Corta-Mato de Abertura JIF 2026', 'Atividades na Natureza'],
      address: 'Espaço AGROS, Rua da AGROS, 4480-144 Argivai',
      driveFromAjavp: '~11 km • 12 min (via N13 / A28)',
      parkingInfo: 'Grande parque interior pavimentado e gratuito.',
      badgeColor: 'emerald',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Espa%C3%A7o+AGROS+Argivai',
      wazeUrl: 'https://waze.com/ul?q=Espa%C3%A7o+AGROS+Argivai&navigate=yes',
      coords: '41.3711,-8.7244'
    },
    {
      id: 'complexo-desportivo',
      name: 'Complexo Desportivo Municipal (Campos 2, 4 e 6)',
      shortName: 'Complexo Sintéticos',
      parish: 'Vila do Conde',
      category: 'futebol',
      categoryLabel: 'Futebol 7 & Infantis',
      sports: ['1º Torneio Futebol JIF', 'Futebol 7 Infantis', 'Torneio 1º de Maio'],
      address: 'Rua Dom Sancho I / Av. Bernardino Machado, 4480-705 Vila do Conde',
      driveFromAjavp: '~10.5 km • 13 min',
      parkingInfo: 'Estacionamento junto às piscinas e campos municipais.',
      badgeColor: 'teal',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Complexo+Desportivo+Municipal+de+Vila+do+Conde',
      wazeUrl: 'https://waze.com/ul?q=Complexo+Desportivo+Municipal+de+Vila+do+Conde&navigate=yes',
      coords: '41.3622,-8.7365'
    },
    {
      id: 'estadio-municipal',
      name: 'Estádio Municipal & Pista de Atletismo',
      shortName: 'Estádio Municipal',
      parish: 'Vila do Conde',
      category: 'atletismo',
      categoryLabel: 'Pista de Atletismo',
      sports: ['Atletismo em Pista', 'Provas de Velocidade e Estafetas'],
      address: 'Av. Dr. Artur Cunha Araújo, 4480-754 Vila do Conde',
      driveFromAjavp: '~11 km • 14 min',
      parkingInfo: 'Estacionamento nas artérias envolventes e parque central.',
      badgeColor: 'rose',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Est%C3%A1dio+Municipal+de+Vila+do+Conde',
      wazeUrl: 'https://waze.com/ul?q=Est%C3%A1dio+Municipal+de+Vila+do+Conde&navigate=yes',
      coords: '41.3541,-8.7419'
    },
    {
      id: 'zona-ribeirinha',
      name: 'Cais das Lavandeiras & Marginal',
      shortName: 'Zona Ribeirinha',
      parish: 'Rio Ave / Marginal de Vila do Conde',
      category: 'atletismo',
      categoryLabel: 'Duatlo & Estrada',
      sports: ['Duatlo em Duplas JIF', 'Milha Urbana Concelhia'],
      address: 'Cais das Lavandeiras / Av. Brasil, 4480 Vila do Conde',
      driveFromAjavp: '~11 km • 15 min',
      parkingInfo: 'Parque de estacionamento do Forte São João ou ribeirinho.',
      badgeColor: 'cyan',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cais+das+Lavandeiras+Vila+do+Conde',
      wazeUrl: 'https://waze.com/ul?q=Cais+das+Lavandeiras+Vila+do+Conde&navigate=yes',
      coords: '41.3508,-8.7447'
    },
    {
      id: 'praia-olinda',
      name: 'Praia da Olinda (Frente Urbana)',
      shortName: 'Praia da Olinda',
      parish: 'Frente Marítima, Vila do Conde',
      category: 'praia',
      categoryLabel: 'Desportos de Areia',
      sports: ['Futebol de Praia JIF', 'Voleibol de Praia'],
      address: 'Praia da Olinda / Av. Brasil, 4480 Vila do Conde',
      driveFromAjavp: '~12 km • 15 min',
      parkingInfo: 'Parque da praia e marginal. Mais concorrido aos sábados.',
      badgeColor: 'amber',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Praia+da+Olinda+Vila+do+Conde',
      wazeUrl: 'https://waze.com/ul?q=Praia+da+Olinda+Vila+do+Conde&navigate=yes',
      coords: '41.3522,-8.7561'
    },
    {
      id: 'sede-ajavp',
      name: 'Sede Oficial da AJAVP',
      shortName: 'Sede AJAVP',
      parish: 'Vilar do Pinheiro, Vila do Conde',
      category: 'sede',
      categoryLabel: 'Ponto de Encontro & Sede',
      sports: ['Concentração de Atletas', 'Saída da Comitiva AJAVP'],
      address: 'Rua da Associação, 4485-846 Vilar do Pinheiro',
      driveFromAjavp: 'Ponto de Partida 📍',
      parkingInfo: 'Estacionamento próprio e envolvente da sede social.',
      badgeColor: 'emerald',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=AJAVP+Vilar+do+Pinheiro',
      wazeUrl: 'https://waze.com/ul?q=AJAVP+Vilar+do+Pinheiro&navigate=yes',
      coords: '41.2785,-8.6756'
    }
  ];

  // Resolver link GPS a partir do texto do local
  function resolveGpsLinks(locationText) {
    const loc = (locationText || '').toLowerCase();
    
    if (loc.includes('modivas')) {
      return {
        name: 'Pavilhão de Modivas',
        maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Modivas+Vila+do+Conde',
        waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Modivas+Vila+do+Conde&navigate=yes'
      };
    }
    if (loc.includes('canidelo')) {
      return {
        name: 'Pavilhão de Canidelo',
        maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Canidelo+Vila+do+Conde',
        waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Canidelo+Vila+do+Conde&navigate=yes'
      };
    }
    if (loc.includes('fajozes')) {
      return {
        name: 'Pavilhão de Fajozes',
        maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Fajozes',
        waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Fajozes&navigate=yes'
      };
    }
    if (loc.includes('caxinas')) {
      return {
        name: 'Pavilhão de Caxinas (C2)',
        maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Caxinas+Vila+do+Conde',
        waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Caxinas+Vila+do+Conde&navigate=yes'
      };
    }
    if (loc.includes('mindelo')) {
      return {
        name: 'Pavilhão de Mindelo',
        maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Desportivo+de+Mindelo',
        waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Desportivo+de+Mindelo&navigate=yes'
      };
    }
    if (loc.includes('agros')) {
      return {
        name: 'Espaço AGROS',
        maps: 'https://www.google.com/maps/dir/?api=1&destination=Espa%C3%A7o+AGROS+Argivai',
        waze: 'https://waze.com/ul?q=Espa%C3%A7o+AGROS+Argivai&navigate=yes'
      };
    }
    if (loc.includes('estádio') || loc.includes('estadio') || loc.includes('pista')) {
      return {
        name: 'Estádio Municipal de Vila do Conde',
        maps: 'https://www.google.com/maps/dir/?api=1&destination=Est%C3%A1dio+Municipal+de+Vila+do+Conde',
        waze: 'https://waze.com/ul?q=Est%C3%A1dio+Municipal+de+Vila+do+Conde&navigate=yes'
      };
    }
    if (loc.includes('campo') || loc.includes('complexo')) {
      return {
        name: 'Complexo Desportivo de Vila do Conde',
        maps: 'https://www.google.com/maps/dir/?api=1&destination=Complexo+Desportivo+Municipal+de+Vila+do+Conde',
        waze: 'https://waze.com/ul?q=Complexo+Desportivo+Municipal+de+Vila+do+Conde&navigate=yes'
      };
    }
    if (loc.includes('praia')) {
      return {
        name: 'Praia da Olinda',
        maps: 'https://www.google.com/maps/dir/?api=1&destination=Praia+da+Olinda+Vila+do+Conde',
        waze: 'https://waze.com/ul?q=Praia+da+Olinda+Vila+do+Conde&navigate=yes'
      };
    }
    if (loc.includes('ribeirinha') || loc.includes('cais') || loc.includes('duatlo')) {
      return {
        name: 'Cais das Lavandeiras',
        maps: 'https://www.google.com/maps/dir/?api=1&destination=Cais+das+Lavandeiras+Vila+do+Conde',
        waze: 'https://waze.com/ul?q=Cais+das+Lavandeiras+Vila+do+Conde&navigate=yes'
      };
    }
    return {
      name: 'Pavilhão Municipal de Desportos',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=Pavilh%C3%A3o+Municipal+de+Desportos+de+Vila+do+Conde',
      waze: 'https://waze.com/ul?q=Pavilh%C3%A3o+Municipal+de+Desportos+de+Vila+do+Conde&navigate=yes'
    };
  }

  // Copiar morada
  function copyVenueAddress(address, btnElement) {
    if (!address) return;
    navigator.clipboard.writeText(address).then(() => {
      if (btnElement) {
        const originalText = btnElement.innerHTML;
        btnElement.classList.add('bg-emerald-500', 'text-white');
        btnElement.innerHTML = `
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Morada Copiada!</span>
        `;
        setTimeout(() => {
          btnElement.classList.remove('bg-emerald-500', 'text-white');
          btnElement.innerHTML = originalText;
          if (window.lucide) lucide.createIcons();
        }, 2000);
      }
    }).catch(() => {
      alert(`Morada: ${address}`);
    });
  }

  // Renderizar grelha de pavilhões
  function renderVenuesGrid(containerId, filterCategory = 'all', searchQuery = '') {
    const container = document.getElementById(containerId);
    if (!container) return;

    let filtered = AJAVP_VENUES;

    if (filterCategory !== 'all') {
      filtered = filtered.filter(v => {
        if (filterCategory === 'futsal') return v.category === 'futsal' || v.sports.some(s => s.toLowerCase().includes('futsal'));
        if (filterCategory === 'futebol') return v.category === 'futebol' || v.sports.some(s => s.toLowerCase().includes('futebol'));
        if (filterCategory === 'atletismo') return v.category === 'atletismo' || v.sports.some(s => s.toLowerCase().includes('corta-mato') || s.toLowerCase().includes('atletismo') || s.toLowerCase().includes('duatlo'));
        if (filterCategory === 'praia') return v.category === 'praia';
        return v.category === filterCategory;
      });
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(v => 
        v.name.toLowerCase().includes(q) ||
        v.parish.toLowerCase().includes(q) ||
        v.address.toLowerCase().includes(q) ||
        v.sports.some(s => s.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full p-8 text-center bg-white/5 rounded-3xl border border-white/10 text-slate-400">
          <p class="text-sm">Nenhum recinto encontrado para a pesquisa "<strong>${searchQuery}</strong>".</p>
          <button type="button" onclick="window.ajavpGps.resetFilters()" class="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold cursor-pointer">
            Limpar Filtros
          </button>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(v => {
      const sportsBadges = v.sports.map(s => `
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
          ${s}
        </span>
      `).join('');

      html += `
        <div class="venue-card p-5 rounded-3xl bg-white dark:bg-white/5 border border-slate-200/90 dark:border-white/10 hover:border-amber-400/60 dark:hover:border-amber-500/50 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between gap-4 group">
          <div>
            <!-- Top Header & Distance -->
            <div class="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/10">
              <div>
                <span class="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30">
                  ${v.categoryLabel}
                </span>
                <h3 class="font-heading font-black text-base sm:text-lg text-brand-navy dark:text-white mt-1.5 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  ${v.name}
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                  <svg class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>${v.parish}</span>
                </p>
              </div>
              <div class="text-right flex-shrink-0">
                <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/20 px-2.5 py-1 rounded-xl border border-emerald-200 dark:border-emerald-500/30">
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                  <span>${v.driveFromAjavp}</span>
                </span>
              </div>
            </div>

            <!-- Modalidades e Estacionamento -->
            <div class="py-3 space-y-2">
              <div class="flex items-center gap-1.5 flex-wrap">
                ${sportsBadges}
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed bg-slate-50 dark:bg-white/5 p-2 rounded-xl border border-slate-200/50 dark:border-white/5">
                <svg class="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                <span><strong>Estacionamento:</strong> ${v.parkingInfo}</span>
              </p>
            </div>
          </div>

          <!-- Ações GPS em 1 Clique -->
          <div class="pt-3 border-t border-slate-100 dark:border-white/10 space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <!-- Google Maps -->
              <a href="${v.mapsUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs shadow-xs hover:shadow-md transition-all text-center">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                <span>Google Maps</span>
              </a>
              <!-- Waze -->
              <a href="${v.wazeUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-heading font-bold text-xs shadow-xs hover:shadow-md transition-all text-center">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                <span>Waze</span>
              </a>
            </div>

            <!-- Copiar Morada -->
            <button type="button" onclick="window.ajavpGps.copyVenueAddress('${v.address.replace(/'/g, "\\'")}', this)" class="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition-colors cursor-pointer" title="Copiar Morada Completa">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span class="truncate">Copiar: ${v.address}</span>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  }

  // Inicializar o separador de pavilhões e os seus listeners
  function initVenuesTab() {
    const grid = document.getElementById('jifVenuesGrid');
    if (!grid) return;

    let currentCategory = 'all';
    let currentSearch = '';

    renderVenuesGrid('jifVenuesGrid', currentCategory, currentSearch);

    // Botões de filtro
    const filterBtns = document.querySelectorAll('.venue-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.className = 'venue-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 cursor-pointer transition-all';
        });
        btn.className = 'venue-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 shadow-xs cursor-pointer transition-all';
        currentCategory = btn.getAttribute('data-venue-filter') || 'all';
        renderVenuesGrid('jifVenuesGrid', currentCategory, currentSearch);
      });
    });

    // Input de pesquisa
    const searchInput = document.getElementById('venueSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderVenuesGrid('jifVenuesGrid', currentCategory, currentSearch);
      });
    }
  }

  // Injetar botões de GPS em cada linha do calendário de jogos (.jif-event-row)
  function enhanceCalendarRows() {
    const rows = document.querySelectorAll('.jif-event-row');
    rows.forEach(row => {
      if (row.querySelector('.jif-gps-actions')) return; // já injetado

      // Procurar texto do local
      const mapPinEl = row.querySelector('[data-lucide="map-pin"]');
      if (!mapPinEl) return;
      const locationSpan = mapPinEl.closest('span');
      if (!locationSpan) return;

      const locationText = locationSpan.textContent.trim();
      const gps = resolveGpsLinks(locationText);

      // Criar elemento de ações GPS
      const gpsPills = document.createElement('div');
      gpsPills.className = 'jif-gps-actions inline-flex items-center gap-1.5 ml-2 mt-1 sm:mt-0';
      gpsPills.innerHTML = `
        <a href="${gps.maps}" target="_blank" rel="noopener noreferrer" title="Abrir rota no Google Maps para ${gps.name}" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 hover:text-white border border-emerald-500/30 text-[10px] font-bold transition-all shadow-2xs">
          <span>📍 Maps</span>
        </a>
        <a href="${gps.waze}" target="_blank" rel="noopener noreferrer" title="Abrir rota no Waze para ${gps.name}" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/20 hover:bg-cyan-500/35 text-cyan-300 hover:text-white border border-cyan-500/30 text-[10px] font-bold transition-all shadow-2xs">
          <span>Waze</span>
        </a>
      `;

      // Anexar junto ao local
      locationSpan.parentNode.insertBefore(gpsPills, locationSpan.nextSibling);
    });

    if (window.lucide) lucide.createIcons();
  }

  function resetFilters() {
    const searchInput = document.getElementById('venueSearchInput');
    if (searchInput) searchInput.value = '';
    const allBtn = document.querySelector('.venue-filter-btn[data-venue-filter="all"]');
    if (allBtn) allBtn.click();
  }

  // Executar no carregamento
  document.addEventListener('DOMContentLoaded', () => {
    initVenuesTab();
    enhanceCalendarRows();
  });

  // Expor API global
  window.ajavpGps = {
    venues: AJAVP_VENUES,
    resolveGpsLinks: resolveGpsLinks,
    copyVenueAddress: copyVenueAddress,
    renderVenuesGrid: renderVenuesGrid,
    resetFilters: resetFilters,
    enhanceCalendarRows: enhanceCalendarRows
  };

})(typeof window !== 'undefined' ? window : this);

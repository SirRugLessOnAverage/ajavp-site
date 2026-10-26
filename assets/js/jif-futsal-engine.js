/**
 * jif-futsal-engine.js
 * Motor Dinâmico para o Hub de Futsal JIF e Match Center (AJAVP)
 * Carrega dados centralizados de assets/data/jif-futsal.json
 */

(function (window) {
  'use strict';

  const JifFutsalEngine = {
    data: null,
    activeJornada: 2,
    activeEscalao: 'sub9',
    filterOnlyAjavp: false,

    /**
     * Carrega a base de dados centralizada do Futsal
     */
    async loadData(jsonUrl) {
      if (this.data) return this.data;

      const url = jsonUrl || (window.location.pathname.includes('/jif/') ? '../assets/data/jif-futsal.json' : 'assets/data/jif-futsal.json');
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.data = await response.json();
        this.activeJornada = this.data.jornadaAtiva || 2;
        return this.data;
      } catch (err) {
        console.warn('Erro ao carregar dados do Futsal JIF:', err);
        return null;
      }
    },

    /**
     * Renderiza o Match Center dinâmico para a Homepage (index.html)
     */
    renderMatchCenter(containerId) {
      const container = document.getElementById(containerId);
      if (!container || !this.data) return;

      const d = this.data;
      const destaque = d.destaqueSemana;
      const proxima = d.proximaJornada;
      const topMarcador = d.melhoresMarcadores[0]?.atletas[0]; // Cid Ferreira

      let ajavpGamesHtml = '';
      (d.destaquesAjavp || []).forEach(item => {
        const isWin = item.resultado.includes('19') || item.resultado.includes('9 – 1') || item.resultado.includes('3 – 1 Aveleda');
        const badgeColor = isWin 
          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-600/40' 
          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10';

        ajavpGamesHtml += `
          <div class="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1 hover:border-brand-green/40 transition-colors">
            <div class="flex items-center justify-between text-[11px]">
              <span class="font-extrabold text-brand-navy dark:text-white uppercase tracking-wider">${item.escalao}</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black border ${badgeColor}">${item.posicao}</span>
            </div>
            <div class="font-heading font-black text-xs sm:text-sm text-slate-900 dark:text-white">${item.resultado}</div>
            <div class="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>${item.pavilhao}</span>
              <span class="font-semibold text-emerald-600 dark:text-emerald-400">${isWin ? 'Vitória 🏆' : 'Disputado'}</span>
            </div>
          </div>
        `;
      });

      container.innerHTML = `
        <div class="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-emerald-950/20 border-2 border-emerald-500/30 dark:border-emerald-500/20 shadow-xl space-y-6">
          
          <!-- Cabeçalho do Match Center -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-white/10">
            <div class="space-y-1">
              <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 text-brand-green dark:text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/20">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>XL JIF 2026/2027 &bull; Futsal Semanal</span>
              </div>
              <h3 class="font-heading font-black text-xl sm:text-2xl text-brand-navy dark:text-white">
                Match Center AJAVP &bull; 2.ª Jornada
              </h3>
            </div>
            
            <a href="/jif/futsal" class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-navy dark:bg-emerald-600 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all self-start sm:self-auto">
              <span>Ver Hub Completo de Futsal</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

          <!-- Banner de Destaque Semanal -->
          <div class="p-4 rounded-2xl bg-emerald-600 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider">${destaque.badge}</span>
                <span class="text-xs text-emerald-100 font-semibold">Boletim Oficial ADCCVC (24/Out)</span>
              </div>
              <strong class="text-sm sm:text-base font-heading font-black block">${destaque.titulo}</strong>
              <p class="text-xs text-emerald-100 max-w-2xl leading-relaxed">${destaque.subtitulo}</p>
            </div>
            ${topMarcador ? `
              <div class="bg-emerald-700/80 p-3 rounded-xl border border-emerald-400/30 text-center flex-shrink-0 w-full md:w-auto">
                <span class="text-[10px] uppercase font-bold text-amber-300 block">👑 Artilheiro Concelhio</span>
                <strong class="text-sm font-black text-white block">${topMarcador.nome}</strong>
                <span class="text-xs text-emerald-200 font-semibold">${topMarcador.golos} Golos (Sub-9)</span>
              </div>
            ` : ''}
          </div>

          <!-- Grid dos Jogos da AJAVP -->
          <div>
            <div class="flex items-center justify-between pb-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Resultados Oficiais dos Escalões da AJAVP</span>
              <span class="text-brand-green dark:text-emerald-400 font-black">4 Equipas em Ação</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              ${ajavpGamesHtml}
            </div>
          </div>

          <!-- Próxima Jornada & Alerta -->
          <div class="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-brand-navy dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black">📅</span>
              <div>
                <strong class="text-slate-900 dark:text-white font-bold block">Próxima Jornada: 3.ª Jornada JIF</strong>
                <span class="text-slate-500 dark:text-slate-400">${proxima.dataPrevisao} &bull; ${proxima.estado}</span>
              </div>
            </div>
            <a href="/jif/futsal" class="text-brand-green dark:text-emerald-400 font-bold hover:underline">
              Consultar calendário completo &rarr;
            </a>
          </div>

        </div>
      `;

      if (window.lucide) lucide.createIcons();
    },

    /**
     * Renderiza o Hub Completo de Futsal (jif/futsal.html)
     */
    renderFutsalHub() {
      if (!this.data) return;

      this.renderHubHero();
      this.renderHubJornadaSelector();
      this.renderHubJogos();
      this.renderHubClassificacoes();
      this.renderHubMarcadores();

      if (window.lucide) lucide.createIcons();
    },

    renderHubHero() {
      const heroKpis = document.getElementById('hubHeroKpis');
      if (!heroKpis || !this.data) return;

      const kpis = this.data.destaqueSemana.kpis || [];
      heroKpis.innerHTML = kpis.map(k => `
        <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center space-y-1 shadow-lg">
          <span class="text-[11px] font-semibold text-slate-300 uppercase block">${k.label}</span>
          <div class="text-2xl sm:text-3xl font-black text-amber-400">${k.valor}</div>
          <span class="text-[11px] text-emerald-200 block font-medium">${k.sub}</span>
        </div>
      `).join('');
    },

    renderHubJornadaSelector() {
      const container = document.getElementById('hubJornadaSelector');
      if (!container || !this.data) return;

      const jornadas = this.data.jornadas || [];
      container.innerHTML = jornadas.map(j => {
        const isActive = j.numero === this.activeJornada;
        const btnClass = isActive
          ? 'px-4 py-2 rounded-xl bg-brand-navy dark:bg-white text-white dark:text-slate-900 font-black shadow-sm'
          : 'px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold';

        return `
          <button type="button" onclick="JifFutsalEngine.setJornada(${j.numero})" class="${btnClass} text-xs cursor-pointer transition-all">
            ${j.numero}.ª Jornada (${j.data.split(' ')[0]})
          </button>
        `;
      }).join('');
    },

    renderHubJogos() {
      const container = document.getElementById('hubJogosContainer');
      if (!container || !this.data) return;

      const jornada = (this.data.jornadas || []).find(j => j.numero === this.activeJornada);
      if (!jornada) return;

      const filterAjavp = this.filterOnlyAjavp;
      let html = '';

      jornada.pavilhoes.forEach(pav => {
        let jogos = pav.jogos || [];
        if (filterAjavp) {
          jogos = jogos.filter(j => j.isAjavp || j.casa.includes('AJAVP') || j.fora.includes('AJAVP') || j.casa.includes('Vilar do Pinheiro') || j.fora.includes('Vilar do Pinheiro'));
        }

        if (jogos.length === 0) return;

        let corBadge = 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';
        if (pav.cor === 'emerald') corBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
        if (pav.cor === 'purple') corBadge = 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300';
        if (pav.cor === 'amber') corBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';

        html += `
          <div class="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
              <strong class="text-brand-navy dark:text-white font-bold text-xs flex items-center gap-1.5">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-500"></i> ${pav.nome}
              </strong>
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${corBadge}">${jogos.length} ${jogos.length === 1 ? 'Jogo' : 'Jogos'}</span>
            </div>

            <ul class="space-y-2 text-xs">
              ${jogos.map(g => {
                const isAjavpGame = g.isAjavp || g.casa.includes('AJAVP') || g.fora.includes('AJAVP') || g.casa.includes('Vilar') || g.fora.includes('Vilar');
                const rowClass = isAjavpGame 
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-500/30 p-2 rounded-xl shadow-2xs' 
                  : 'py-1.5 border-b border-slate-50 dark:border-white/5';

                return `
                  <li class="flex items-center justify-between gap-2 ${rowClass}">
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400 min-w-[70px]">${g.escalao || g.campo} (${g.hora})</span>
                      <span class="${isAjavpGame ? 'font-black text-brand-green dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200 font-medium'}">${g.casa} vs ${g.fora}</span>
                    </div>
                    <strong class="font-mono text-xs px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white flex-shrink-0">
                      ${g.golosCasa} &ndash; ${g.golosFora}
                    </strong>
                  </li>
                `;
              }).join('')}
            </ul>
          </div>
        `;
      });

      if (!html) {
        html = `
          <div class="col-span-full p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-500">
            Nenhum jogo encontrado com o filtro atual selecionado.
          </div>
        `;
      }

      container.innerHTML = html;
      if (window.lucide) lucide.createIcons();
    },

    renderHubClassificacoes() {
      const container = document.getElementById('hubClassificacaoTable');
      if (!container || !this.data) return;

      const escalaoKey = this.activeEscalao;
      const escalaoData = this.data.classificacoes[escalaoKey];
      if (!escalaoData) return;

      let rowsHtml = '';
      escalaoData.tabela.forEach(item => {
        let posBadge = '';
        if (item.pos === 1) posBadge = '<span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-black text-xs">1º 🥇</span>';
        else if (item.pos === 2) posBadge = '<span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-200 text-slate-900 font-black text-xs">2º 🥈</span>';
        else if (item.pos === 3) posBadge = '<span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-amber-700 text-white font-black text-xs">3º 🥉</span>';
        else posBadge = `<span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs">${item.pos}º</span>`;

        const rowHighlight = item.isAjavp 
          ? 'bg-emerald-50/70 dark:bg-emerald-950/40 font-bold border-l-4 border-l-brand-green' 
          : 'hover:bg-slate-50/60 dark:hover:bg-white/5';

        rowsHtml += `
          <tr class="${rowHighlight} border-b border-slate-100 dark:border-white/5 transition-colors">
            <td class="py-2.5 px-3 text-center">${posBadge}</td>
            <td class="py-2.5 px-4 font-bold ${item.isAjavp ? 'text-brand-green dark:text-emerald-300 font-black' : 'text-slate-900 dark:text-white'}">
              <div class="flex items-center gap-1.5">
                <span>${item.equipa}</span>
                ${item.isAjavp ? '<span class="px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px] uppercase font-black">AJAVP</span>' : ''}
              </div>
            </td>
            <td class="py-2.5 px-3 text-center font-heading font-black text-brand-navy dark:text-emerald-400">${item.pontos}</td>
            <td class="py-2.5 px-3 text-center text-slate-600 dark:text-slate-300">${item.jogos}</td>
            <td class="py-2.5 px-3 text-center text-slate-600 dark:text-slate-300">${item.v}</td>
            <td class="py-2.5 px-3 text-center text-slate-600 dark:text-slate-300">${item.e}</td>
            <td class="py-2.5 px-3 text-center text-slate-600 dark:text-slate-300">${item.d}</td>
            <td class="py-2.5 px-3 text-center font-mono text-slate-700 dark:text-slate-300">${item.gm} - ${item.gs}</td>
            <td class="py-2.5 px-3 text-center font-bold ${item.saldo > 0 ? 'text-emerald-600 dark:text-emerald-400' : (item.saldo < 0 ? 'text-rose-500' : 'text-slate-500')}">${item.saldo > 0 ? '+' + item.saldo : item.saldo}</td>
          </tr>
        `;
      });

      container.innerHTML = `
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse">
            <thead>
              <tr class="bg-brand-navy text-white text-[11px] font-heading font-black uppercase tracking-wider">
                <th class="py-3 px-3 text-center w-12">Pos</th>
                <th class="py-3 px-4">Freguesia / Equipa</th>
                <th class="py-3 px-3 text-center">Pts</th>
                <th class="py-3 px-3 text-center">J</th>
                <th class="py-3 px-3 text-center">V</th>
                <th class="py-3 px-3 text-center">E</th>
                <th class="py-3 px-3 text-center">D</th>
                <th class="py-3 px-3 text-center">Golos</th>
                <th class="py-3 px-3 text-center">Saldo</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      `;
    },

    renderHubMarcadores() {
      const container = document.getElementById('hubMarcadoresContainer');
      if (!container || !this.data) return;

      const marcadores = this.data.melhoresMarcadores || [];
      container.innerHTML = marcadores.map(m => {
        return `
          <div class="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
              <strong class="font-heading font-black text-xs text-brand-navy dark:text-white flex items-center gap-1.5">
                <span>⚽ Escalão ${m.escalao}</span>
              </strong>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Top Concelhio</span>
            </div>

            <div class="space-y-1.5 text-xs">
              ${m.atletas.map(a => {
                const isAjavp = a.isAjavp;
                const rowClass = isAjavp
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-xl border border-emerald-300 dark:border-emerald-500/30 font-bold'
                  : 'p-1.5 border-b border-slate-50 dark:border-white/5 text-slate-700 dark:text-slate-300';

                return `
                  <div class="flex items-center justify-between ${rowClass}">
                    <div class="flex items-center gap-1.5">
                      <span class="w-5 text-center font-black ${a.pos === 1 ? 'text-amber-500' : 'text-slate-400'}">${a.pos}º</span>
                      <span class="${isAjavp ? 'text-brand-green dark:text-emerald-300 font-black' : ''}">${a.nome}</span>
                      ${a.coroa ? '<span title="Melhor Marcador Concelhio">👑</span>' : ''}
                      ${a.medalha ? `<span>${a.medalha}</span>` : ''}
                    </div>
                    <strong class="font-black text-sm px-2 py-0.5 rounded-lg ${isAjavp ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white'}">
                      ${a.golos}
                    </strong>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('');
    },

    setJornada(num) {
      this.activeJornada = num;
      this.renderHubJornadaSelector();
      this.renderHubJogos();
    },

    setEscalao(key) {
      this.activeEscalao = key;
      document.querySelectorAll('.tab-escalao-btn').forEach(btn => {
        const isTarget = btn.getAttribute('data-escalao') === key;
        btn.className = isTarget
          ? 'tab-escalao-btn px-4 py-2 rounded-xl bg-brand-navy dark:bg-white text-white dark:text-slate-900 font-black shadow-sm cursor-pointer text-xs'
          : 'tab-escalao-btn px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer text-xs';
      });
      this.renderHubClassificacoes();
    },

    toggleFilterAjavp() {
      this.filterOnlyAjavp = !this.filterOnlyAjavp;
      const btn = document.getElementById('btnToggleAjavpOnly');
      if (btn) {
        if (this.filterOnlyAjavp) {
          btn.className = 'px-3 py-1.5 rounded-xl bg-brand-green text-white font-black text-xs shadow-xs cursor-pointer';
          btn.textContent = 'Apenas AJAVP (Ativo)';
        } else {
          btn.className = 'px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer';
          btn.textContent = 'Todos os Pavilhões';
        }
      }
      this.renderHubJogos();
    }
  };

  window.JifFutsalEngine = JifFutsalEngine;

})(window);

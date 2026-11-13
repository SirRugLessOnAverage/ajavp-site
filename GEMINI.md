# Contexto e Regras do Projeto • Site Público & PWA AJAVP

Este repositório (`radiant-salk`) gere o portal público institucional, a PWA offline, a divulgação dos XL Jogos Inter-Freguesias (JIF), o calendário das modalidades e a prova social associativa da Associação de Jovens Amigos de Vilar do Pinheiro (AJAVP).

---

## 1. Stack Técnica & Fundações
- **Framework:** Next.js 16 (App Router / Turbopack) com React 19.
- **Linguagem & Tipagem:** TypeScript em modo estrito (sem recurso a `any`).
- **Estilos:** Tailwind CSS v4 com temas Claro e Escuro (`dark:` mode) e tokens de animação em `app/globals.css`.
- **Base de Dados & Backend:** Supabase (PostgreSQL, RLS ativo, Auth gerido pela Secretaria).
- **PWA & Offline:** Service Worker nativo (`sw.js`) e índice estático de pesquisa a 0ms (`lib/search-index.ts`).

---

## 2. Relação com o Ecossistema & Projeto Irmão (`AJAVP-Gestao`)
- **Projeto Irmão:** `C:\Users\msilveira\Documents\AJAVP-Gestao` (Next.js 15, gestão de sócios, quotas, pessoas, kits e backoffice da direção).
- **Base de Dados Partilhada:** Supabase ID `mudgnaajtolytggksvvq`.
- **Contrato de Privacidade e RGPD:**
  - O Site Público **NUNCA** acede diretamente às tabelas privadas de sócios, pessoas, quotas ou documentos protegidos.
  - Para validações ou estatísticas públicas, utiliza apenas contratos explícitos, RPCs com `SECURITY DEFINER` e campos públicos agregados.
  - Consulta obrigatória: `ARQUITETURA_ECOSSISTEMA.md` e `INTEGRACAO_SECRETARIA.md`.

---

## 3. Regras de Arquitetura (Carbon / Planning Mode)
- **Modificações de Esquema ou Funcionalidades Complexas:**
  - Devem ser precedidas de um *Implementation Plan* detalhado com aprovação explícita do utilizador antes de qualquer código.
  - Alterações no Supabase devem ser escritas como migrações SQL explícitas e validadas previamente.
  - Assegurar compatibilidade com o simulador virtual oficial dos JIF (`GERAL 26_27` / Artigo XV da ADCCVC) no cálculo proporcional de pontos para equipas efetivamente participantes.

---

## 4. Regras de Implementação (Hydrogen / Fast Mode)
- **Componentes e Tipagem:**
  - Componentes pequenos, reutilizáveis e com tipos TypeScript claros em `components/`.
  - Tratamento gracioso de erros em chamadas de rede ou clientes offline.
- **Acessibilidade & Micro-Interações (Emil Kowalski + Modern Web):**
  - Botões e elementos táteis com feedback de pressão (`motion-press` / `active:scale-[0.97]`).
  - Transições aplicadas unicamente ao compositor (`transform`, `opacity`).
  - Respeito obrigatório por `prefers-reduced-motion: reduce`.
- **Definição de Concluído (Definition of Done):**
  - `npx tsc --noEmit` sem qualquer erro de tipagem.
  - Execução dos testes unitários e de integração com `npm test`.
  - Build limpo com `npm run build`.

---

## 5. Fluxo de Git, Ambientes & Produção
- **Ambiente de Validação / Preview (`development`):** Todo o trabalho ativo é desenvolvido e enviado primeiro para o branch `development` (`https://ajavp.vercel.app`).
- **Ambiente de Produção (`main`):** `https://ajavp.pt`. O merge e push para `main` apenas é executado após validação positiva do utilizador no preview.


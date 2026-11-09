# Diretrizes para Agentes • Site Público & PWA AJAVP

## 🏛️ Projeto Irmão: Gestão & Secretaria (AJAVP-Gestao)
- **Localização:** `C:\Users\msilveira\Documents\AJAVP-Gestao`
- **Tecnologias:** Next.js 15, TypeScript, Supabase Auth.
- **Contrato de Arquitetura e Dados:** Consulta [ARQUITETURA_ECOSSISTEMA.md](./ARQUITETURA_ECOSSISTEMA.md) e [INTEGRACAO_SECRETARIA.md](./INTEGRACAO_SECRETARIA.md).
- **Base de Dados Partilhada:** Supabase ID `mudgnaajtolytggksvvq`.
  - Este projeto (`radiant-salk`) gere: o site institucional público, os resultados dos JIF, a PWA offline e o sistema de notificações Web Push (`push_subscriptions`, `push_notifications`, `push_private.config`).
  - O projeto irmão (`AJAVP-Gestao`) gere: os dados protegidos de sócios, quotas, pessoas, equipamentos, inscrições com assinatura digital e backoffice da direção.
  - O Site Público NUNCA deve tentar aceder diretamente ou alterar as tabelas de pessoas/sócios sem passar pelos contratos ou RPCs autorizados pela secretaria.

## 🌿 Política de Git, Branches e Ambientes (Regra Oficial Atualizada pelo Utilizador)
- **Produção Principal (`main`):** Aponta para o domínio oficial definitivo `https://ajavp.pt`.
- **Ambiente de Validação / Preview (`development`):** O branch `development` aponta para o ambiente de preview no Vercel: `https://ajavp.vercel.app`.
- **Fluxo de Trabalho:**
  1. Desenvolver, testar e efetuar commits/push no branch `development` para validação em `https://ajavp.vercel.app`.
  2. Após validação e aprovação explícita do utilizador, efetuar merge e push para `main`, publicando em `https://ajavp.pt`.

## 🌐 Domínios & Arquitetura de URLs
- **Domínio Oficial de Produção (`main`):** `https://ajavp.pt`.
- **Domínio de Preview (`development`):** `https://ajavp.vercel.app`.
- **Arquitetura de URLs, CORS & SEO:** Toda a arquitetura canónica (canonical, sitemaps, OpenGraph, JSON-LD, CORS e webhooks) permanece estritamente orientada para o domínio de produção `https://ajavp.pt`. A constante centralizada está em `lib/site.ts`.

## 📊 Sistema de Pontuação e Classificação Virtual dos JIF (Regra Oficial)
- **Simulador Virtual Excel:** O documento Excel de suporte (`GERAL 26_27` / simulador virtual) é a referência para a pontuação e simulação da classificação geral dos Jogos Inter-Freguesias.
- **Regra de Cálculo de Pontos por Participação Efetiva:** A divisão e atribuição de pontos de cada prova/modalidade é calculada exclusivamente com base no **número de equipas que efetivamente participaram**.
  - Exemplo: se numa modalidade com 3 eventos participaram apenas 18 equipas (em vez das 19 do concelho), a pontuação máxima de 1º lugar é `18 × 3 = 54 pontos`, e a fórmula para cada posição é `(N_equipas_participantes - Posição + 1) × N_eventos`.
  - As equipas que não participam sofrem a penalização regulamentar de não comparência (ex: `-15 pts` em modalidades de 3 eventos), mas **não entram** na base de cálculo de atribuição de pontos das equipas participantes.
- **Workflow Obrigatório:**
  1. Extrair e validar toda a informação do simulador e dos vários comunicados com a explicação do sistema de pontuação no geral.
  2. Fazer perguntas claras para os pontos que não encontrem resposta no Excel ou nos comunicados.
  3. Demonstrar o que percebeu e obter alinhamento do utilizador ANTES de alterar a página oficial de classificação/JIF no site.

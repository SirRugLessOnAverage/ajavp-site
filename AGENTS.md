# Diretrizes para Agentes • Site Público & PWA AJAVP

## 🏛️ Projeto Irmão: Gestão & Secretaria (AJAVP-Gestao)
- **Localização:** `C:\Users\msilveira\Documents\AJAVP-Gestao`
- **Tecnologias:** Next.js 15, TypeScript, Supabase Auth.
- **Contrato de Arquitetura e Dados:** Consulta [ARQUITETURA_ECOSSISTEMA.md](./ARQUITETURA_ECOSSISTEMA.md) e [INTEGRACAO_SECRETARIA.md](./INTEGRACAO_SECRETARIA.md).
- **Base de Dados Partilhada:** Supabase ID `mudgnaajtolytggksvvq`.
  - Este projeto (`radiant-salk`) gere: o site institucional público, os resultados dos JIF, a PWA offline e o sistema de notificações Web Push (`push_subscriptions`, `push_notifications`, `push_private.config`).
  - O projeto irmão (`AJAVP-Gestao`) gere: os dados protegidos de sócios, quotas, pessoas, equipamentos, inscrições com assinatura digital e backoffice da direção.
  - O Site Público NUNCA deve tentar aceder diretamente ou alterar as tabelas de pessoas/sócios sem passar pelos contratos ou RPCs autorizados pela secretaria.

## 🌿 Política de Git e Branches (Regra Oficial Atualizada pelo Utilizador)
- **Ramo Principal (main):** Todos os desenvolvimentos, alterações, commits e respetivos git push devem ser efetuados **única e exclusivamente** no ramo main (produção direta).
- **Sem Ramo Develop/Preview:** **NÃO** usar o ramo develop nem ambientes preview nesta área, por determinação expressa do utilizador. Todo o trabalho deve ser feito e enviado diretamente no ramo main.

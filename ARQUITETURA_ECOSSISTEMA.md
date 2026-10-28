# 🏛️ Ecossistema Digital AJAVP • Contrato de Integração e Arquitetura

> **Documento Oficial de Alinhamento entre Projetos e Agentes de IA**  
> *Data de criação: 16 de Outubro de 2026*  
> *Associação: Associação Jovens e Adultos de Vilar do Pinheiro (NIF 519096045)*

---

## 🗺️ 1. Visão Geral dos 2 Projetos

A presença digital da AJAVP é dividida em dois projetos independentes e complementares:

```
                                  ECOSSISTEMA DIGITAL AJAVP
                                             │
               ┌─────────────────────────────┴─────────────────────────────┐
               ▼                                                           ▼
       [PROJETO 1: SITE PÚBLICO & PWA]                             [PROJETO 2: GESTÃO & SECRETARIA]
   c:\Users\msilveira\Documents\antigravity\radiant-salk       c:\Users\msilveira\Documents\AJAVP-Gestao
   Domínio: ajavp.pt / ajavp-site.vercel.app                   Domínio: gestao.ajavp.pt / localhost:3000
   Tecnologias: HTML5 + Tailwind + JS + PWA (SW)               Tecnologias: Next.js 15 + TypeScript + Supabase Auth
   Público: Associados, Atletas, Famílias, Vila do Conde       Público: Direção, Secretaria, Sócios Autenticados
               │                                                           │
               └─────────────────────────────┬─────────────────────────────┘
                                             ▼
                             [BASE DE DADOS SUPABASE PARTILHADA]
                                     ID: mudgnaajtolytggksvvq
```

---

## 📂 2. Responsabilidades de Cada Projeto

### Projeto 1: Site Público & PWA (`radiant-salk`)
* **Pasta Local:** `C:\Users\msilveira\Documents\antigravity\radiant-salk`
* **Repositório GitHub:** `SirRugLessOnAverage/ajavp-site` (branches `develop` e `main`)
* **Hospedagem:** Vercel (`ajavp-site.vercel.app`)
* **Principais Páginas:**
  - `index.html`: Página principal e destaques
  - `jif.html`: Jogos Inter-Freguesias 2026/2027 (calendário, resultados, classificações)
  - `modalidades.html`: Futsal, Atletismo, Ténis de Mesa, Duatlo
  - `clube.html`: História, órgãos sociais, instalações
  - `multimedia.html`: Galeria de fotos e feed Instagram @ajavp.javip
  - `contactos.html`: Secretaria, contactos, mapa e formulário
  - `admin-alertas.html`: Painel rápido da Direção para envio de notificações Web Push
  - `sw.js` & `manifest.webmanifest`: PWA instalável no telemóvel e modo offline
* **Funcionalidade Central:** Comunicação rápida, notificações push em tempo real e identidade visual da associação.

### Projeto 2: Secretaria & Gestão (`AJAVP-Gestao`)
* **Pasta Local:** `C:\Users\msilveira\Documents\AJAVP-Gestao`
* **Tecnologia:** Next.js 15 (App Router), React 19, TypeScript, Supabase Auth
* **Principais Rotas:**
  - `/direcao`: Backoffice da Direção (gestão de sócios, quotas, validação de inscrições, equipamentos)
  - `/socio`: Portal Privado do Sócio (consulta de quotas, pagamentos, cartão digital, dados)
  - `/(publico)/inscricao`: Ficha de Inscrição pública de novos atletas com assinatura digital (`SignatureCanvas`)
  - `/direcao/jif`: Gestão técnica dos participantes dos JIF
  - `/api/socios`, `/api/inscricao`, `/api/documentos`: Endpoints de negócio
* **Funcionalidade Central:** Processos administrativos internos, cumprimento RGPD, exportação oficial ADCCVC/Excel e gestão financeira/quotas.

---

## 🗄️ 3. Fronteiras na Base de Dados Supabase (`mudgnaajtolytggksvvq`)

Para evitar conflitos entre as migrações dos dois projetos, as tabelas e permissões estão rigorosamente repartidas:

| Domínio de Dados | Dono Principal | Tabelas / Esquema | Regra de Acesso para o Outro Projeto |
|---|---|---|---|
| **Notificações Push & Alertas** | `radiant-salk` (Site) | `push_subscriptions`, `push_notifications`, `push_private.config` | Acesso exclusivo ao site/admin de alertas |
| **Pessoas, Sócios e Perfis** | `AJAVP-Gestao` | `pessoas`, `socios`, `perfis`, `quotas`, `documentos` | **Protegido por RGPD.** O Site Público NÃO acede diretamente a estas tabelas |
| **Equipamentos e Plantel** | `AJAVP-Gestao` | `equipamentos_plantel`, `tamanhos_equipamento` | Gestão interna da secretaria |
| **Modalidades e Escalões** | Partilhado | `modalidades`, `escaloes`, `epocas` | Leitura pública no Site; Edição na Gestão |
| **Participantes JIF** | `AJAVP-Gestao` | `participantes_jif`, `modalidades_jif` | Gestão técnica na Secretaria; Resultados públicos no Site |
| **Balcão Documental & Site CMS** | Partilhado | `site_documentos`, `site_noticias`, `site_eventos`, `site_treinadores`, `site_horarios_treino` + Storage Bucket `documentos_publicos` | Upload/Edição autenticada na Gestão (`AJAVP-Gestao`); Leitura pública automática no Site (`radiant-salk` via ISR 5m) |

---

## 🔗 4. Pontos de Integração e Ligações Recomendadas

### 4.1 Do Site Público (`radiant-salk`) para a Gestão (`AJAVP-Gestao`)
1. **Botão "Área de Sócio" no Cabeçalho:**
   - Link no menu de navegação que aponta para o portal do sócio (ex.: `https://gestao.ajavp.pt/socio` ou `http://localhost:3000/socio` em desenvolvimento).
2. **Botão "Inscrição Online de Atletas":**
   - Na página `modalidades.html` e `contactos.html`, o botão "Inscrever" aponta diretamente para o formulário oficial da secretaria: `https://gestao.ajavp.pt/inscricao`.

### 4.2 Da Gestão (`AJAVP-Gestao`) para o Site Público
1. **Botão de Regresso:** No topo da página de login e do portal do sócio, incluir: `← Voltar ao Site Oficial AJAVP`.

---

## 🤖 5. Diretrizes para Agentes de IA (Instruções Obrigatórias)

1. **Respeito Mútuo de Ficheiros:**
   - O agente do Site Público NÃO edita ficheiros em `C:\Users\msilveira\Documents\AJAVP-Gestao` sem instrução explícita.
   - O agente da Gestão NÃO edita ficheiros em `C:\Users\msilveira\Documents\antigravity\radiant-salk` sem instrução explícita.
2. **Migrações Supabase:**
   - As migrações da Secretaria ficam em `AJAVP-Gestao/supabase/migrations/`.
   - O Site Público utiliza apenas funções RPC dedicadas para alertas (`push_subscribe`, `push_unsubscribe`, etc.).
3. **Leitura Cruzada Permitida:**
   - Qualquer agente tem autorização para **ler** os ficheiros e esquemas do outro projeto para garantir coerência de estilos, rotas, tipos de dados e identidade gráfica (logos, cores e termos).

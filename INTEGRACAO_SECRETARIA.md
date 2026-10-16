# 🤝 Guia de Integração Oficial • Site Público & Secretaria AJAVP

> **Ficheiro de Referência Contratual para Desenvolvedores e Agentes de IA**  
> **Associação:** Associação Jovens e Adultos de Vilar do Pinheiro (NIF: 519096045)  
> **Data:** Outubro de 2026

---

## 🏛️ 1. Os Dois Projetos do Ecossistema

| Propriedade | 🌐 Projeto 1: Site Público & PWA | 📋 Projeto 2: Secretaria & Gestão |
|---|---|---|
| **Pasta Local** | `C:\Users\msilveira\Documents\antigravity\radiant-salk` | `C:\Users\msilveira\Documents\AJAVP-Gestao` |
| **Tecnologias** | HTML5, Tailwind CSS, JavaScript Vanilla, PWA (Service Worker) | Next.js 15 (App Router), TypeScript, Tailwind CSS, Supabase Auth |
| **Repositório** | `SirRugLessOnAverage/ajavp-site` | `AJAVP-Gestao` |
| **Ambiente Dev** | Live Server / Porta 5500 ou Vercel Preview | `npm run dev` na porta 3000 (`http://localhost:3000`) |
| **Produção** | `https://ajavp.pt` (atualmente `https://ajavp-site.vercel.app`) | `https://gestao.ajavp.pt` (ou `https://secretaria.ajavp.pt`) |
| **Público-Alvo** | Adeptos, atletas, encarregados de educação, comunidade | Direção, secretaria, atletas inscritos, sócios autenticados |
| **Objetivo** | Divulgação, notícias, resultados JIF, notificações push, PWA | Fichas de inscrição, quotas, documentos, equipamentos, RGPD |

---

## 🗄️ 2. Base de Dados Partilhada (Supabase ID: `mudgnaajtolytggksvvq`)

Os dois projetos partilham a mesma instância do Supabase. Para manter a segurança, a integridade dos dados e o cumprimento escrupuloso do **RGPD**, existe uma separação estrita de domínios:

```
                               BASE DE DADOS SUPABASE
                                (mudgnaajtolytggksvvq)
                                          │
                ┌─────────────────────────┴─────────────────────────┐
                ▼                                                   ▼
     [DOMÍNIO SITE PÚBLICO]                              [DOMÍNIO SECRETARIA]
   • push_subscriptions                                • pessoas (118 registos - RGPD)
   • push_notifications                                • socios (111 sócios)
   • push_private.config                               • quotas & pagamentos
   • RPC: push_subscribe()                             • documentos & exames médicos
   • RPC: push_admin_dispatch()                        • equipamentos_plantel
   • Cache offline de resultados                       • inscricoes & assinaturas
                │                                                   │
                └─────────────────────────┬─────────────────────────┘
                                          ▼
                             [DADOS COMUNS / LEITURA]
                           • modalidades
                           • escaloes
                           • epocas
                           • participantes_jif
```

### 🔒 Regras de Segurança Obrigatórias:
1. **O Site Público NUNCA acede diretamente à tabela `pessoas` ou `socios`:**
   - O site público utiliza a chave pública `anon`. Dados de CC, moradas, emails e contactos de menores nunca podem ser lidos pela chave pública.
2. **A Secretaria NÃO remove tabelas de Push:**
   - O projeto `AJAVP-Gestao` não deve alterar nem eliminar as tabelas `push_subscriptions`, `push_notifications` ou as RPCs de alertas criadas pelo site público.
3. **Operações Partilhadas via RPC:**
   - Se o site público precisar de verificar se um número de sócio é válido (ex.: para o Cartão de Sócio Digital), a Secretaria disponibiliza uma função RPC com `SECURITY DEFINER` que responde apenas `valido: true/false` e o primeiro nome, sem expor os restantes dados pessoais.

---

## 🔗 3. Rotas e Pontos de Ligação entre os Projetos

### 3.1 Do Site Público para a Secretaria

| O que o utilizador quer fazer | Onde clica no Site Público | URL de Destino na Secretaria |
|---|---|---|
| **Entrar na Área de Sócio** | Botão "Área de Sócio" no Cabeçalho/Menu | `https://gestao.ajavp.pt/socio` (dev: `http://localhost:3000/socio`) |
| **Inscrever Novo Atleta** | Botão "Inscrever Atleta" nas modalidades | `https://gestao.ajavp.pt/inscricao` (dev: `http://localhost:3000/inscricao`) |
| **Login da Direção** | Acesso reservado no rodapé | `https://gestao.ajavp.pt/entrar` (dev: `http://localhost:3000/entrar`) |
| **Consultar Quotas** | Link no Portal do Sócio | `https://gestao.ajavp.pt/socio#quotas` |

### 3.2 Da Secretaria para o Site Público

| O que o utilizador quer fazer | Onde clica na Secretaria | URL de Destino no Site Público |
|---|---|---|
| **Voltar à Página Inicial** | Botão "← Site Oficial" na barra de navegação | `https://ajavp.pt/` |
| **Consultar Calendário JIF** | Link "Jogos Inter-Freguesias" | `https://ajavp.pt/jif` |
| **Ver Notícias & Fotos** | Link "Galeria & Redes" | `https://ajavp.pt/multimedia` |

---

## 🎨 4. Coerência Visual e Identidade da Marca

Para que o utilizador sinta que está a navegar na mesma instituição ao transitar entre o Site e a Gestão:

1. **Cores Oficiais AJAVP:**
   - **Verde Principal (Emerald):** `#10b981` / `rgb(16, 185, 129)`
   - **Verde Escuro:** `#047857`
   - **Azul Petróleo / Slate:** `#1b4557` / `#0f172a`
   - **Fundo:** `#ffffff` (claro) e `#0f172a` (escuro)
2. **Tipografia:**
   - Títulos: `Montserrat`, sans-serif (pesos 600, 700, 800)
   - Corpo de texto: `Inter`, sans-serif (pesos 400, 500)
3. **Logótipo e Favicon:**
   - Emblema oficial da AJAVP a preto num badge branco de alto contraste (`assets/icons/favicon-32.png?v=7`).
   - Logótipo completo em `assets/images/logo.png`.

---

## 🛠️ 5. Checklist para Desenvolvedores e Agentes de IA

Antes de realizar alterações estruturais, verifica:

- [ ] **Não estou a alterar código no projeto vizinho** sem instrução explícita do utilizador.
- [ ] **As migrações da base de dados** respeitam a divisão descrita na Secção 2.
- [ ] **Os links entre os dois sistemas** utilizam caminhos relativos ou variáveis de ambiente (ex.: `process.env.NEXT_PUBLIC_SITE_URL` no Next.js e uma constante `GESTAO_URL` no JavaScript do Site).
- [ ] **As permissões RLS do Supabase** continuam a proteger os dados de identificação dos sócios e menores contra acessos não autenticados.

---

> 💡 *Dúvidas ou novos pontos de contacto? Atualiza este documento em ambos os repositórios para manter o ecossistema sempre sincronizado.*

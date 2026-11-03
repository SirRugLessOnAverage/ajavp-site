# AJAVP - Associação Jovens e Adultos de Vilar do Pinheiro

Website oficial moderno da **AJAVP**, baseado na informação e documentos da associação.

## 🚀 Como publicar na Vercel (`ajavp`)

O link fornecido (`https://vercel.com/new?teamSlug=ajavp`) é o ecrã de **criação e importação de projetos** da equipa **ajavp** na Vercel.

Existem duas formas simples de colocar este site online:

---

### Opção 1: Via GitHub (Recomendado - Automático e com atualizações contínuas)

1. **Criar um repositório no seu GitHub**:
   - Vá a [github.com/new](https://github.com/new).
   - Dê o nome ao repositório (por exemplo, `ajavp-site` ou `ajavp-website`).
   - Escolha **Public** ou **Private** e clique em **Create repository**.

2. **Enviar este código para o GitHub** (no terminal desta pasta):
   ```bash
   git add .
   git commit -m "Site AJAVP pronto para Vercel"
   git branch -M main
   git remote add origin https://github.com/SEU_UTILIZADOR/ajavp-site.git
   git push -u origin main
   ```

3. **Conectar na Vercel**:
   - Abra o link: [https://vercel.com/new?teamSlug=ajavp](https://vercel.com/new?teamSlug=ajavp)
   - Na secção **Import Git Repository**, selecione o repositório que acabou de criar (`ajavp-site`).
   - Clique em **Import**.
   - O Vercel deteta automaticamente que é um site estático. Basta clicar no botão azul **Deploy**!
   - Em cerca de 15 segundos o site estará online num link oficial (ex: `ajavp.vercel.app`), com SSL gratuito e domínio personalizável.

---

### Opção 2: Via Vercel CLI (Direto do Terminal)

Se preferir publicar sem passar pelo GitHub:

1. Instale ou use o Vercel CLI com o Node.js:
   ```bash
   npx vercel --scope ajavp
   ```
2. Siga as instruções no ecrã (fazer login no browser e confirmar o projeto).
3. Para publicar em produção:
   ```bash
   npx vercel --prod --scope ajavp
   ```

---

## 📁 Estrutura de Ficheiros

- `index.html`: Website responsivo completo com todas as secções:
  - Início & Destaques
  - Sobre a Associação & O Espírito AJAVP
  - Modalidades (Atletismo, Futsal, Ténis de Mesa, Duatlo, Badminton, Futebol, Futebol de Praia)
  - Treinos, Instalações & Grupos
  - Documentação Oficial & Regulamentos (Google Drive & Google Forms)
  - Contactos, Redes Sociais & Mapas Interativos
- `assets/images/logo.png`: Emblema/logótipo oficial em alta resolução
- `vercel.json`: Configuração de deploy da Vercel (clean URLs e cache otimizado)

## Feed diário do Instagram

A página **Galeria & Multimédia** apresenta as publicações recentes do perfil oficial. O workflow `.github/workflows/update-instagram.yml` executa diariamente e obtém as imagens pela API oficial da Meta; sem credenciais, a galeria continua a mostrar os destaques locais.

Para ativar o feed:

1. A conta `@ajavp.javip` tem de ser profissional (Business ou Creator) e estar ligada a uma Página do Facebook para usar a Instagram Graph API com Facebook Login.
2. Crie/configure uma app Meta e autorize a leitura do perfil profissional. Com Facebook Login, a app normalmente precisa das permissões `instagram_basic`, `pages_show_list` e `pages_read_engagement`; confirme os requisitos e o acesso de produção na documentação da Meta. Obtenha o ID da conta profissional e um token de utilizador autorizado.
3. Em **Settings → Secrets and variables → Actions** no repositório, adicione:
   - `INSTAGRAM_ACCESS_TOKEN` como secret (nunca no código nem em variáveis públicas).
   - `INSTAGRAM_USER_ID` como secret.
   - Opcionalmente, `INSTAGRAM_GRAPH_API_VERSION` como variável, por exemplo `v23.0` (valor predefinido do workflow).
4. Execute manualmente **Atualizar Feed do Instagram** em GitHub Actions para validar a configuração. O workflow agendado atualiza o feed diariamente e publica as alterações em `main`.

O token tem de continuar válido e autorizado; quando expirar ou for revogado, a atualização reporta falha e o site mantém o último feed publicado. Consulte a [documentação oficial da Instagram Graph API](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login/).

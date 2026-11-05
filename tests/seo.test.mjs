import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();

function getSitemapPaths() {
  const sitemapContent = fs.readFileSync(
    path.join(ROOT_DIR, "app", "sitemap.ts"),
    "utf-8"
  );
  const match = sitemapContent.match(/export const SITEMAP_PATHS = \[([\s\S]*?)\] as const;/);
  assert.ok(match, "SITEMAP_PATHS array deve estar definido em app/sitemap.ts");
  const rawPaths = match[1]
    .split(",")
    .map((s) => s.trim().replace(/['"]/g, ""))
    .filter(Boolean);
  return rawPaths;
}

function getAppPageRoutes(dir = path.join(ROOT_DIR, "app"), base = "") {
  const routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith("(") || entry.name.startsWith("_") || entry.name === "api") {
        continue;
      }
      routes.push(...getAppPageRoutes(path.join(dir, entry.name), `${base}/${entry.name}`));
    } else if (entry.name === "page.tsx" || entry.name === "page.ts") {
      routes.push(base === "" ? "/" : base);
    }
  }

  return routes;
}

function getNextRedirectSources() {
  const configContent = fs.readFileSync(path.join(ROOT_DIR, "next.config.ts"), "utf-8");
  const sources = [];
  const matches = configContent.matchAll(/source:\s*["']([^"']+)["']/g);
  for (const match of matches) {
    sources.push(match[1]);
  }
  return sources;
}

test("Sitemap: Não deve ter caminhos duplicados", () => {
  const paths = getSitemapPaths();
  const set = new Set(paths);
  assert.equal(paths.length, set.size, "O sitemap contém caminhos duplicados");
});

test("Sitemap: Todos os caminhos do sitemap devem existir como page.tsx", () => {
  const paths = getSitemapPaths();
  for (const p of paths) {
    const routePath = p === "/" ? path.join(ROOT_DIR, "app", "page.tsx") : path.join(ROOT_DIR, "app", ...p.split("/").filter(Boolean), "page.tsx");
    assert.ok(
      fs.existsSync(routePath),
      `Caminho no sitemap '${p}' não tem ficheiro page.tsx correspondente em ${routePath}`
    );
  }
});

test("Sitemap: Todas as rotas públicas de app/ devem estar no sitemap", () => {
  const appRoutes = getAppPageRoutes();
  const sitemapPaths = new Set(getSitemapPaths());

  for (const route of appRoutes) {
    assert.ok(
      sitemapPaths.has(route),
      `Rota pública '${route}' existe em app/ mas não está listada no sitemap.ts`
    );
  }
});

test("Sitemap & Links: Nenhum caminho do sitemap deve ser um redirect de next.config.ts", () => {
  const sitemapPaths = getSitemapPaths();
  const redirectSources = getNextRedirectSources();

  for (const source of redirectSources) {
    assert.ok(
      !sitemapPaths.includes(source),
      `Caminho '${source}' é um redirect em next.config.ts e não deve estar no sitemap`
    );
  }
});

test("Links internos: page.tsx não deve ter links para a rota antiga /jif-classificacao", () => {
  const pageContent = fs.readFileSync(path.join(ROOT_DIR, "app", "page.tsx"), "utf-8");
  assert.ok(
    !pageContent.includes('href="/jif-classificacao"'),
    "app/page.tsx ainda contém link para /jif-classificacao (deve ser /jif/classificacao)"
  );
});

test("Dados estáticos: jif-futsal.json não deve apontar para /jif-classificacao", () => {
  const jsonContent = fs.readFileSync(
    path.join(ROOT_DIR, "public", "assets", "data", "jif-futsal.json"),
    "utf-8"
  );
  assert.ok(
    !jsonContent.includes("/jif-classificacao"),
    "public/assets/data/jif-futsal.json ainda contém referências a /jif-classificacao"
  );
});

test("Sitemap: Ficheiros estáticos sitemap.xml não devem existir na raiz nem em public/", () => {
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "public", "sitemap.xml")), "public/sitemap.xml não deve existir");
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "sitemap.xml")), "sitemap.xml na raiz não deve existir");
});


test("Canonical: Todas as 12 rotas do sitemap devem ter canonical definido", () => {
  const sitemapPaths = getSitemapPaths();
  for (const p of sitemapPaths) {
    if (p === "/") {
      const layoutContent = fs.readFileSync(path.join(ROOT_DIR, "app", "layout.tsx"), "utf-8");
      assert.ok(layoutContent.includes("canonical:"), "app/layout.tsx deve ter canonical para a homepage");
    } else {
      const routePath = path.join(ROOT_DIR, "app", ...p.split("/").filter(Boolean), "page.tsx");
      const content = fs.readFileSync(routePath, "utf-8");
      assert.ok(content.includes("canonical:"), `Página '${p}' (${routePath}) deve ter canonical definido em metadata.alternates`);
    }
  }
});

test("SEO: Homepage deve renderizar componente JsonLd com dados estruturados", () => {
  const homeContent = fs.readFileSync(path.join(ROOT_DIR, "app", "page.tsx"), "utf-8");
  assert.ok(homeContent.includes("<JsonLd />"), "app/page.tsx deve incluir o componente <JsonLd />");
  assert.ok(fs.existsSync(path.join(ROOT_DIR, "components", "seo", "JsonLd.tsx")), "components/seo/JsonLd.tsx deve existir");
});

test("Limpeza: Ficheiros e pastas mortos da camada estática não devem existir na raiz", () => {
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "assets")), "Pasta 'assets' não deve existir na raiz (apenas em public/assets)");
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "sw.js")), "sw.js não deve existir na raiz (apenas em public/sw.js)");
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "manifest.json")), "manifest.json não deve existir na raiz");
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "manifest.webmanifest")), "manifest.webmanifest não deve existir na raiz");
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "favicon.ico")), "favicon.ico não deve existir na raiz (apenas em public/favicon.ico)");
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "robots.txt")), "robots.txt não deve existir na raiz (apenas em public/robots.txt)");
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "robots-dev.txt")), "robots-dev.txt não deve existir na raiz");
  assert.ok(
    fs.existsSync(path.join(ROOT_DIR, "public", "assets", "images", "galeria", "foto_21.webp")),
    "foto_21.webp deve existir preservada em public/assets/images/galeria/"
  );
});

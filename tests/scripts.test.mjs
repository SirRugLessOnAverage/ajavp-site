import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

test("Scripts: A11yScript.tsx não deve existir no repositório", () => {
  const filePath = path.join(ROOT_DIR, "components", "layout", "A11yScript.tsx");
  assert.ok(!fs.existsSync(filePath), "components/layout/A11yScript.tsx deve ser removido");
});

test("Scripts: app/layout.tsx deve ter scripts defer no head sem duplicados no body", () => {
  const layoutContent = fs.readFileSync(path.join(ROOT_DIR, "app", "layout.tsx"), "utf-8");
  
  // Não deve conter A11yScript
  assert.ok(!layoutContent.includes("A11yScript"), "layout.tsx não deve referenciar A11yScript");

  // Deve conter a11y.js exatamente 1 vez
  const a11yMatches = layoutContent.match(/\/assets\/js\/a11y\.js/g) || [];
  assert.equal(a11yMatches.length, 1, "layout.tsx deve incluir a11y.js exatamente uma vez");

  // Deve conter pwa.js exatamente 1 vez
  const pwaMatches = layoutContent.match(/\/assets\/js\/pwa\.js/g) || [];
  assert.equal(pwaMatches.length, 1, "layout.tsx deve incluir pwa.js exatamente uma vez");
});

test("Scripts: PwaManager.tsx não deve injetar pwa.js em duplicado", () => {
  const pwaManagerContent = fs.readFileSync(
    path.join(ROOT_DIR, "components", "layout", "PwaManager.tsx"),
    "utf-8"
  );
  assert.ok(
    !pwaManagerContent.includes("pwa.js"),
    "PwaManager.tsx não deve tentar injetar pwa.js dinamicamente"
  );
  assert.ok(
    pwaManagerContent.includes("navigator.serviceWorker"),
    "PwaManager.tsx deve manter o registo do Service Worker"
  );
});


test("Fontes: public/assets/css/a11y.css não deve ter @import externo para googleapis", () => {
  const cssContent = fs.readFileSync(path.join(ROOT_DIR, "public", "assets", "css", "a11y.css"), "utf-8");
  assert.ok(!cssContent.includes("@import url('https://fonts.googleapis.com"), "a11y.css não deve ter @import remoto de fontes");
  assert.ok(cssContent.includes("var(--font-dyslexic)"), "a11y.css deve usar var(--font-dyslexic)");
});

test("Fontes: app/layout.tsx deve configurar Lexend com preload false e variavel --font-dyslexic", () => {
  const layoutContent = fs.readFileSync(path.join(ROOT_DIR, "app", "layout.tsx"), "utf-8");
  assert.ok(layoutContent.includes("Lexend"), "layout.tsx deve importar Lexend de next/font/google");
  assert.ok(layoutContent.includes('variable: "--font-dyslexic"'), "layout.tsx deve definir variable: --font-dyslexic");
  assert.ok(layoutContent.includes("preload: false"), "layout.tsx deve ter preload: false para economizar tráfego");
  assert.ok(layoutContent.includes("${lexend.variable}"), "layout.tsx deve incluir lexend.variable na tag html");
});

test("Workflows: update-instagram.yml não deve existir no repositório", () => {
  const workflowPath = path.join(ROOT_DIR, ".github", "workflows", "update-instagram.yml");
  assert.ok(!fs.existsSync(workflowPath), ".github/workflows/update-instagram.yml deve ser removido");
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

test("Motion: globals.css deve conter tokens de micro-interações do Design System", () => {
  const css = fs.readFileSync(path.join(ROOT_DIR, "app", "globals.css"), "utf-8");
  assert.ok(css.includes(".motion-press"), "globals.css deve definir .motion-press");
  assert.ok(css.includes(".animate-drawer-down"), "globals.css deve definir .animate-drawer-down");
  assert.ok(css.includes("@keyframes drawerSlideDown"), "globals.css deve definir @keyframes drawerSlideDown");
  assert.ok(css.includes(".motion-pill"), "globals.css deve definir .motion-pill");
  assert.ok(css.includes(".backdrop-drawer"), "globals.css deve definir .backdrop-drawer");
});

test("Motion: globals.css deve respeitar WCAG com prefers-reduced-motion: reduce", () => {
  const css = fs.readFileSync(path.join(ROOT_DIR, "app", "globals.css"), "utf-8");
  assert.ok(
    css.includes("@media (prefers-reduced-motion: reduce)"),
    "globals.css deve conter bloco de acessibilidade prefers-reduced-motion"
  );
  assert.ok(
    css.includes("animation: none !important"),
    "prefers-reduced-motion deve desativar animações"
  );
  assert.ok(
    css.includes("transform: none !important"),
    "prefers-reduced-motion deve desativar transformações"
  );
});

test("Motion: Header.tsx deve ter drawer suave com backdrop e botoes com feedback tatil", () => {
  const headerContent = fs.readFileSync(path.join(ROOT_DIR, "components", "layout", "Header.tsx"), "utf-8");
  assert.ok(headerContent.includes("animate-drawer-down"), "Header deve usar animate-drawer-down no mobile drawer");
  assert.ok(headerContent.includes("backdrop-drawer"), "Header deve usar backdrop-drawer no mobile drawer");
  assert.ok(headerContent.includes("motion-press"), "Header deve usar motion-press nos botões interativos");
});

test("Motion: JifHubTabs e JifCalendarList devem usar motion-pill e motion-press nas abas e filtros", () => {
  const tabsContent = fs.readFileSync(path.join(ROOT_DIR, "components", "jif", "JifHubTabs.tsx"), "utf-8");
  assert.ok(tabsContent.includes("motion-pill"), "JifHubTabs deve usar motion-pill");
  assert.ok(tabsContent.includes("motion-press"), "JifHubTabs deve usar motion-press");
  assert.ok(tabsContent.includes("animate-drawer-down"), "JifHubTabs deve animar a transição de abas");

  const calContent = fs.readFileSync(path.join(ROOT_DIR, "components", "jif", "JifCalendarList.tsx"), "utf-8");
  assert.ok(calContent.includes("motion-pill"), "JifCalendarList deve usar motion-pill");
  assert.ok(calContent.includes("motion-press"), "JifCalendarList deve usar motion-press");
  assert.ok(calContent.includes("motion-card"), "JifCalendarList deve usar motion-card nos eventos");
});

test("Motion: Homepage e Socios devem usar motion-press nos CTAs e motion-card nos cartões", () => {
  const homeContent = fs.readFileSync(path.join(ROOT_DIR, "app", "page.tsx"), "utf-8");
  assert.ok(homeContent.includes("motion-press"), "Homepage deve usar motion-press nos botões principais");

  const sociosContent = fs.readFileSync(path.join(ROOT_DIR, "app", "socios", "page.tsx"), "utf-8");
  assert.ok(sociosContent.includes("motion-card"), "Socios deve usar motion-card nos cartões de quotas");
  assert.ok(sociosContent.includes("motion-press"), "Socios deve usar motion-press nos botões de adesão");
});

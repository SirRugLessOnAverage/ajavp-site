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

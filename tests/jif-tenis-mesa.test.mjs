import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

test("Ténis de Mesa: dados oficiais do 1º Encontro devem refletir vitória histórica da AJAVP", async () => {
  const tmFilePath = path.join(ROOT_DIR, "data", "jif", "tenis-de-mesa.ts");
  const content = fs.readFileSync(tmFilePath, "utf-8");

  assert.ok(content.includes("pontosTorneio: 14"), "AJAVP deve ter 14 pontos de prova");
  assert.ok(content.includes("pontosJif: 54"), "AJAVP deve somar 54 pontos na classificação JIF (base 18 equipas)");
  assert.ok(content.includes("totalAtletas: 24"), "AJAVP deve ter 24 atletas registados");
  assert.ok(content.includes("totalPodios: 9"), "AJAVP deve ter 9 pódios");
  assert.ok(content.includes("Johnny Ye"), "Quadro de honra deve incluir Johnny Ye (Campeão Sub-11)");
  assert.ok(content.includes("Afonso Fernandes"), "Quadro de honra deve incluir Afonso Fernandes (Campeão Sub-16)");
  assert.ok(content.includes("Pedro Cruz"), "Quadro de honra deve incluir Pedro Cruz (Campeão Livre)");
});

test("Classificação Geral Virtual: deve integrar 4ª etapa (TM) com rigor matemático a 18 equipas", async () => {
  const clasFilePath = path.join(ROOT_DIR, "data", "jif", "classificacao.ts");
  const content = fs.readFileSync(clasFilePath, "utf-8");

  // Vilar do Pinheiro
  assert.ok(content.includes('name: "Vilar do Pinheiro"'), "Deve conter Vilar do Pinheiro");
  assert.ok(content.includes("tmPts: 54"), "AJAVP deve ter 54 pts em TM");
  assert.ok(content.includes("pontos: 196"), "AJAVP deve ter 196 pontos acumulados");
  assert.ok(content.includes("gold: 5, silver: 5, bronze: 5"), "AJAVP deve liderar o medalheiro com 5 ouros, 5 pratas e 5 bronzes");
  assert.ok(content.includes("stageId: 'tm'"), "History deve conter etapa tm");

  // Top 3 concelhio
  assert.ok(content.includes("pontos: 213"), "Bagunte deve ter 213 pontos");
  assert.ok(content.includes("pontos: 202"), "Árvore deve ter 202 pontos");
  assert.ok(content.includes("pontos: 198"), "Gião deve ter 198 pontos");
});

test("UI & Componentes: Hub JIF e Homepage devem integrar Quadro de Honra e Banners", async () => {
  const tabsPath = path.join(ROOT_DIR, "components", "jif", "JifHubTabs.tsx");
  const tabsContent = fs.readFileSync(tabsPath, "utf-8");
  assert.ok(tabsContent.includes("JifQuadroHonraTenisMesa"), "JifHubTabs deve renderizar JifQuadroHonraTenisMesa");

  const homePath = path.join(ROOT_DIR, "app", "page.tsx");
  const homeContent = fs.readFileSync(homePath, "utf-8");
  assert.ok(homeContent.includes("1º Encontro Ténis de Mesa"), "Homepage Hero deve destacar vitória no Ténis de Mesa");

  const tickerPath = path.join(ROOT_DIR, "components", "home", "JifLiveTicker.tsx");
  const tickerContent = fs.readFileSync(tickerPath, "utf-8");
  assert.ok(tickerContent.includes("1º Encontro de Ténis de Mesa"), "Ticker deve destacar vitória no Ténis de Mesa");
});


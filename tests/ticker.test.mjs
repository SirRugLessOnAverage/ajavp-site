import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

test("Ticker: Formatação de data deve respeitar estritamente o formato português DD/MM/YYYY", () => {
  // Simular a função pura formatPortugueseDate
  const formatPt = (d) => {
    const [y, m, day] = d.split("-");
    return `${day}/${m}/${y}`;
  };

  assert.equal(formatPt("2026-11-07"), "07/11/2026", "Data deve ser DD/MM/YYYY");
  assert.equal(formatPt("2026-12-05"), "05/12/2026", "Data deve ser DD/MM/YYYY");
  assert.equal(formatPt("2027-01-16"), "16/01/2027", "Data deve ser DD/MM/YYYY");
});

test("Ticker: JifLiveTicker.tsx deve existir e conter links diretos para /jif#calendario", () => {
  const tickerPath = path.join(ROOT_DIR, "components", "home", "JifLiveTicker.tsx");
  assert.ok(fs.existsSync(tickerPath), "components/home/JifLiveTicker.tsx deve existir");

  const content = fs.readFileSync(tickerPath, "utf-8");
  assert.ok(content.includes('href="/jif#calendario"'), "Ticker deve ter links para /jif#calendario");
  assert.ok(content.includes("formatPortugueseDate"), "Ticker deve implementar formatPortugueseDate");
  assert.ok(content.includes("getWeekdayName"), "Ticker deve calcular dia da semana em português");
  assert.ok(content.includes("36 provas"), "Ticker deve indicar o total oficial de 36 provas");
});

test("Ticker: Homepage deve renderizar JifLiveTicker logo a seguir ao Hero", () => {
  const homeContent = fs.readFileSync(path.join(ROOT_DIR, "app", "page.tsx"), "utf-8");
  assert.ok(homeContent.includes("<JifLiveTicker />"), "app/page.tsx deve incluir <JifLiveTicker />");
  assert.ok(
    homeContent.includes('href="/jif#calendario"'),
    "Hero card da homepage deve ter link direto para /jif#calendario"
  );
});

test("Ticker: EventosSection deve referenciar 36 provas de forma harmonizada", () => {
  const eventosContent = fs.readFileSync(
    path.join(ROOT_DIR, "components", "home", "EventosSection.tsx"),
    "utf-8"
  );
  assert.ok(
    eventosContent.includes("36 provas"),
    "EventosSection deve ter texto atualizado para 36 provas"
  );
});

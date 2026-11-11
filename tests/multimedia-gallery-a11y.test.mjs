import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

test("MediaGallery: modal de vídeo deve cumprir acessibilidade e gestão de foco WCAG", () => {
  const content = fs.readFileSync(
    path.join(ROOT_DIR, "components", "multimedia", "MediaGallery.tsx"),
    "utf-8"
  );

  // 1. ARIA Attributes e referências de diálogo
  assert.ok(
    content.includes('role="dialog"'),
    "MediaGallery deve declarar role='dialog' no modal de vídeo"
  );
  assert.ok(
    content.includes('aria-modal="true"'),
    "MediaGallery deve declarar aria-modal='true'"
  );
  assert.ok(
    content.includes('ref={videoDialogRef}'),
    "Modal de vídeo deve ter ref={videoDialogRef}"
  );
  assert.ok(
    content.includes('aria-labelledby="video-dialog-title"'),
    "Modal de vídeo deve apontar aria-labelledby para o título do vídeo"
  );
  assert.ok(
    content.includes('id="video-dialog-title"'),
    "Título do vídeo deve ter id='video-dialog-title'"
  );

  // 2. Gestão de foco e devolução ao acionador
  assert.ok(
    content.includes("modalTriggerRef.current = document.activeElement"),
    "Deve capturar o elemento acionador antes de abrir o diálogo"
  );
  assert.ok(
    content.includes("modalTriggerRef.current.focus()"),
    "Deve devolver o foco ao acionador original ao fechar o diálogo"
  );

  // 3. Confinamento de foco por teclado (Focus Trap com Tab)
  assert.ok(
    content.includes('e.key === "Tab"'),
    "Deve intercetar a tecla Tab para confinamento de foco"
  );

  // 4. Fecho por Escape
  assert.ok(
    content.includes('e.key === "Escape"'),
    "Deve fechar o modal com a tecla Escape"
  );

  // 5. Bloqueio de scroll do fundo
  assert.ok(
    content.includes('document.body.style.overflow = "hidden"'),
    "Deve bloquear o scroll da página durante a exibição do diálogo"
  );
});


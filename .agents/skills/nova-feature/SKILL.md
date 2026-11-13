---
name: nova-feature
description: Planeia, implementa e testa uma nova funcionalidade de ponta a ponta seguindo o protocolo Carbon/Planning e Hydrogen/Fast.
---

# Workflow de Desenvolvimento • /nova-feature

Este fluxo padroniza o ciclo de vida de qualquer nova funcionalidade ou refatoração no projeto, garantindo planeamento rigoroso e execução atómica sem quebras.

## Procedimento de 4 Fases

### Fase 1: Análise & Clarificação
1. Inspeciona o código existente, dependências e contratos de dados antes de propor alterações.
2. Clarifica requisitos em falta e volume de dados/utilização esperado.
3. Não escreve nem edita ficheiros de implementação nesta fase.

### Fase 2: Implementation Plan (Aprovação Obrigatória)
1. Cria um artefacto de planeamento detalhado contendo:
   - Abordagem técnica e fundamentação arquitetural.
   - Lista exata de ficheiros a criar (`[NEW]`), modificar (`[MODIFY]`) ou remover (`[DELETE]`).
   - Assinaturas de tipos, componentes ou funções principais.
   - Lista numerada de tarefas atómicas de execução.
   - Plano de verificação automatizada e manual.
2. Pede aprovação explícita com a pergunta de fecho: *"Aprovas este plano e arquitetura para avançarmos para a Tarefa 1?"*.

### Fase 3: Execução Atómica Sequencial
1. Executa **uma única tarefa da lista de cada vez**.
2. Altera apenas o código estritamente necessário para cumprir a tarefa atual (KISS / YAGNI).
3. Ao concluir cada tarefa, reporta as alterações efetuadas e aguarda validação antes de avançar para a seguinte.

### Fase 4: Definition of Done & Validação
1. Executa validação estrita de tipos: `npx tsc --noEmit` (0 erros).
2. Executa a suite de testes: `npm test`.
3. Executa o build de produção: `npm run build`.
4. Gera um artefacto de `walkthrough.md` com o resumo do que foi entregue e testado.


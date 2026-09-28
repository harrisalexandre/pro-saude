# AGENTS.md — Por Perto / ProSaúde

## Antes de trabalhar

1. Trabalhe na branch indicada pela tarefa.
2. Leia `docs/ai/CONTEXT.md` e `docs/ai/CURRENT_STATE.md` antes de uma sessão relevante.
3. Consulte `docs/ai/BUSINESS_RULES.md` ao alterar comportamento, papéis, pacientes, medicamentos, consultas ou SOS.
4. Consulte `docs/ai/ARCHITECTURE.md` ao tocar React, Supabase, Auth, RLS, Edge Functions, persistência ou integrações.
5. Consulte `docs/ai/DECISIONS.md` antes de modificar padrões existentes.
6. Código e schema atuais são a fonte da verdade para fatos verificáveis.
7. Mudanças relevantes devem atualizar somente a documentação correspondente.

## Estrutura

- `docs/ai/` — contexto, estado, regras, arquitetura e decisões para agentes.
- `docs/FEATURES.md` — catálogo funcional.
- `docs/DAILY_WORK.md` — diário operacional.
- `docs/` — documentação geral do produto.
- `AGENTS.md` — protocolo permanente.

Não criar uma segunda árvore de documentação para agentes.

## Engenharia

- Preserve a arquitetura existente antes de criar abstrações.
- Faça mudanças pequenas, rastreáveis e verificáveis.
- Frontend nunca é a barreira definitiva de segurança.
- Autorização real deve ser garantida por Supabase/RLS/backend/Edge Functions.
- Nunca coloque `service_role` ou segredos no bundle React.
- Operações privilegiadas de Auth ficam em Edge Function/backend.
- Dados de saúde devem ser tratados como sensíveis.
- Loading, erro e vazio devem ser distintos em fluxos críticos.
- Build verde não significa feature concluída quando há Auth, RLS ou integração envolvida.

## Saúde e segurança

- Não inventar orientação clínica.
- Não alterar dose, frequência ou instrução de medicamento por inferência.
- SOS é alerta/comunicação, não substituto de emergência.
- Mudanças em dados sensíveis exigem revisão de RLS, autenticação e escopo.

## Memória

- `CURRENT_STATE.md`: estado vigente.
- `FEATURES.md`: catálogo funcional.
- `DAILY_WORK.md`: histórico curto.
- `BUSINESS_RULES.md`: regras confirmadas.
- `ARCHITECTURE.md`: arquitetura real.
- `DECISIONS.md`: decisões duradouras.
- `CONTEXT.md`: visão estável.

Atualize somente documentos afetados e evite duplicação.

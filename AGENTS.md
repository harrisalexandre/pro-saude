# AGENTS.md — Por Perto / ProSaúde

## Antes de trabalhar

1. Trabalhe na branch de desenvolvimento indicada pela tarefa. Não force mudanças diretamente em `main` quando existir uma branch de trabalho ativa.
2. Leia `docs/ai/CONTEXT.md` e `docs/ai/CURRENT_STATE.md` antes de iniciar uma sessão relevante.
3. Consulte `docs/ai/BUSINESS_RULES.md` ao alterar comportamento funcional, papéis, pacientes, medicamentos, consultas ou SOS.
4. Consulte `docs/ai/ARCHITECTURE.md` ao tocar React, Supabase, Auth, RLS, Edge Functions, persistência ou integrações.
5. Consulte `docs/ai/DECISIONS.md` antes de modificar padrões existentes.
6. Inspecione código e schema atual antes de concluir que uma regra, tabela, função ou fluxo existe. Código/schema atual é a fonte da verdade para fatos verificáveis.
7. Quando uma mudança alterar estado, arquitetura, regra ou feature relevante, atualize somente a documentação correspondente.

## Estrutura

Toda a memória operacional fica em `/docs`.

- `docs/ai/` — contexto, estado, regras, arquitetura e decisões para agentes.
- `docs/FEATURES.md` — catálogo funcional cumulativo.
- `docs/DAILY_WORK.md` — diário operacional curto.
- `AGENTS.md` — protocolo permanente.

Não criar uma segunda árvore `agent/docs/`.

## Interpretação

Use:

`pedido explícito → intenção → dependências → casos correlatos → regressões → validação`

- Trate pedidos curtos como intenção, não como especificação completa.
- Investigue dependências diretamente relacionadas: frontend, backend, Auth, RLS, Edge Functions, loading/error/empty e responsividade.
- Não invente tabelas, colunas, endpoints, permissões, regras clínicas ou contratos.
- Não faça refactors oportunistas.
- Achados fora do escopo seguro viram pendência em `CURRENT_STATE.md`.
- Pergunte apenas diante de decisão real de produto, ambiguidade relevante, operação destrutiva/irreversível ou credencial inacessível.

## Engenharia

- Preserve a arquitetura existente antes de criar abstrações.
- Reutilize componentes, estado, services e contratos existentes.
- Faça mudanças pequenas, rastreáveis e verificáveis.
- Frontend nunca é a barreira definitiva de segurança.
- Autorização real deve ser garantida por Supabase/RLS/backend/Edge Functions.
- Nunca coloque `service_role` ou segredos no bundle React.
- Operações privilegiadas de Auth ficam em Edge Function/backend.
- Dados de saúde devem ser tratados como sensíveis: evite logs desnecessários, exposição em erros e acesso fora do escopo.
- Loading, erro e vazio devem ser distintos em fluxos críticos.
- Valide o que for relevante com build e, quando houver mudança Supabase, verificação no ambiente real.
- Não marque como validado algo que apenas compilou quando o fluxo exige validação funcional ou de segurança.

## Saúde e segurança

- Não inventar orientação clínica.
- Não alterar dose, frequência ou instrução de medicamento por inferência.
- Dados cadastrados por profissional/família devem ser preservados como dados.
- SOS é alerta/comunicação; não tratar como substituto de emergência.
- Mudanças em dados sensíveis exigem revisão de RLS, autenticação e escopo.

## Memória

- `CURRENT_STATE.md`: estado vigente, sem diário.
- `FEATURES.md`: catálogo funcional.
- `DAILY_WORK.md`: histórico curto.
- `BUSINESS_RULES.md`: regras confirmadas.
- `ARCHITECTURE.md`: arquitetura real.
- `DECISIONS.md`: decisões duradouras.
- `CONTEXT.md`: visão estável.

Atualize somente documentos afetados e evite duplicação.

## Comunicação

Prefira:
- `Etapa X/Y — Nome`
- `Ação:`
- `Alterações:`
- `Validação:`
- `Resultado:`
- `Pendência:`
- `Próximo:`

Ao concluir etapa relevante, informe alterações, validações, documentação e commit Conventional Commits.

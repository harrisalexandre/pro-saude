# AGENTS.md — Por Perto / ProSaúde

## Antes de trabalhar

1. Trabalhe na branch `main`, branch canônica de desenvolvimento e integração. Não crie ou migre para outra branch sem decisão explícita.
2. Leia `docs/ai/CONTEXT.md` e `docs/ai/CURRENT_STATE.md`.
3. Na primeira sessão/mensagem de trabalho de cada dia, leia `docs/FEATURES.md`, revise os commits desde a última atualização e atualize o catálogo com mudanças funcionais relevantes. Não transforme o arquivo em changelog de correções triviais.
4. Consulte `docs/ai/BUSINESS_RULES.md` ao tocar comportamento funcional, papéis, pacientes, medicamentos, consultas ou SOS.
5. Consulte `docs/ai/ARCHITECTURE.md` ao tocar React, Supabase, Auth, RLS, Edge Functions, persistência ou integrações.
6. Consulte `docs/ai/DECISIONS.md` antes de modificar padrões existentes.
7. Inspecione código e schema atuais: eles são a fonte da verdade para fatos verificáveis.
8. Quando uma integração, regra ou documento específico for citado, leia a documentação correspondente antes de alterar o contrato.

## Estrutura de documentação

Toda a documentação do projeto fica sob a única pasta `/docs`.

- `docs/ai/` — memória técnica e operacional para agentes.
- `docs/FEATURES.md` — catálogo funcional cumulativo.
- `docs/DAILY_WORK.md` — diário operacional curto entre sessões.
- `docs/` — documentação geral do produto.
- `AGENTS.md` — protocolo permanente de trabalho.

Não criar uma segunda árvore `agent/docs/`. Novos documentos de memória técnica devem ficar em `/docs/ai/`.

## Interpretação e escopo

Trate pedidos curtos como intenção, não necessariamente como especificação completa.

Aplique:

`pedido explícito → intenção → dependências → casos correlatos → regressões → implementação → validação`

Amplie a análise quando fizer sentido para:
- componentes e fluxos compartilhados;
- rotas e guards;
- permissões e personas;
- loading/error/empty;
- services e persistência;
- Supabase, RLS e Edge Functions;
- mocks, hardcodes e LocalStorage legado;
- integrações;
- acessibilidade e experiência do idoso;
- implementações antigas e duplicadas;
- consistência entre módulos.

Ampliação da análise não autoriza expansão indiscriminada da implementação. Altere somente o necessário para resolver corretamente a intenção e problemas diretamente relacionados, seguros e verificáveis.

Não:
- invente features, regras ou contratos;
- invente tabelas, colunas, APIs ou Edge Functions;
- faça refactors oportunistas;
- redesenhe módulos não relacionados;
- sobrescreva alterações existentes sem avaliar impacto.

Achados relevantes fora do escopo seguro viram pendência em `docs/ai/CURRENT_STATE.md`.

Pergunte somente diante de decisão de produto, ambiguidade real, operação destrutiva/irreversível, credencial inacessível ou aumento significativo de escopo.

## Engenharia

- Preserve a arquitetura existente.
- Reutilize components, services, hooks e fluxos antes de criar abstrações.
- Faça alterações pequenas, rastreáveis e verificáveis.
- Backend/RLS é a autorização definitiva; UI não é barreira de segurança.
- Nunca coloque `service_role` ou segredos no bundle React.
- Operações privilegiadas devem permanecer em Edge Function/backend.
- Não confie em papel, tenant ou permissão enviados pelo frontend.
- Dados de saúde devem ser tratados como sensíveis.
- Loading, erro e vazio devem ser estados distintos em fluxos críticos.
- Falha de backend não pode ser apresentada como lista vazia ou zero.
- LocalStorage não concede autorização e não deve competir com Supabase sem estratégia explícita de sincronização.
- Não alterar dose, frequência, diagnóstico ou orientação clínica por inferência.

## Segurança e saúde

- Dados sensíveis devem ter escopo de acesso explícito.
- Toda mudança em RLS, Auth, Edge Function ou dados de saúde exige revisão do impacto.
- Login não deve revelar se um e-mail existe.
- Lockout local é somente camada complementar.
- SOS é alerta/comunicação enquanto não houver integração real; não prometer atendimento de emergência, localização ou chamada automática sem implementação confirmada.
- Segredos, tokens e `service_role` ficam fora do frontend.

## Validação

Valide somente o que for relevante, mas valide de verdade.

Quando disponível:
- lint/typecheck;
- testes unitários/integrados;
- `npm run check` (validação padrão do agente, atualmente equivalente ao build);
- `npm run build` quando necessário para diagnóstico;
- validação das Edge Functions;
- validação de RLS/policies;
- fluxo manual por persona quando comportamento de usuário for alterado.

Build verde não significa feature concluída quando Auth, RLS, UX, dados ou integração também foram alterados.

## Definition of Done

Uma etapa relevante só fecha quando aplicável:

- [ ] implementação concluída;
- [ ] casos correlatos verificados;
- [ ] permissões/RLS avaliados;
- [ ] loading/error/empty avaliados;
- [ ] build/testes executados;
- [ ] fluxo principal validado;
- [ ] regressão relevante verificada;
- [ ] documentação pertinente atualizada;
- [ ] `CURRENT_STATE.md` atualizado quando o estado mudou;
- [ ] um commit Conventional Commits realizado.

Não marcar como OK algo que não foi executado ou confirmado.

## Memória operacional

- `docs/ai/CURRENT_STATE.md`: estado vigente, fila, bloqueios e próximo passo. Não é diário.
- `docs/FEATURES.md`: catálogo funcional cumulativo.
- `docs/DAILY_WORK.md`: trabalho relevante, validações e próximos passos.
- `docs/ai/BUSINESS_RULES.md`: somente regras confirmadas.
- `docs/ai/DECISIONS.md`: decisões duradouras.
- `docs/ai/ARCHITECTURE.md`: arquitetura real e contratos técnicos.
- `docs/ai/CONTEXT.md`: visão estável do produto.
- `AGENTS.md`: regras permanentes de trabalho dos agentes.

Atualize somente os documentos afetados e evite duplicação.

Cada etapa aprovada fecha como uma unidade:
`implementação + documentação pertinente + validação + um commit`.

## Comunicação

Durante uma etapa, prefira:

`Etapa X/Y — Nome`

**Ação:** investigação ou alteração realizada.  
**Encontrado:** fatos relevantes confirmados.  
**Alterações:** 2–5 mudanças relevantes.  
**Validação:** verificações realmente executadas.  
**Pendência:** bloqueios ou itens fora do escopo.  
**Resultado:** estado funcional atual.  
**Próximo:** próxima ação.

Ao concluir:

`Etapa X/Y — CONCLUÍDA`

Informe alterações, validações, resultado, documentação atualizada e commit.

Nunca diga que algo foi corrigido, validado ou concluído sem evidência da execução.

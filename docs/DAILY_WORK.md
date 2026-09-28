# Por Perto — Diário de Trabalho

Registro operacional curto entre sessões. O estado vigente fica em docs/ai/CURRENT_STATE.md; este arquivo registra contexto recente e validações relevantes.

## 28/09/2026

### Consolidação documental

- Comparação do modelo documental do ProSaúde com o padrão operacional do KarateERP.
- Estrutura docs/ai/ mantida como única memória técnica de agentes.
- Protocolo de agentes reforçado em AGENTS.md.
- Fluxo pedido → intenção → dependências → regressões → implementação → validação formalizado.
- Definition of Done e formato de comunicação adicionados.
- Papéis, fonte da verdade, arquitetura e responsabilidades documentais explicitados.

### Auditoria RLS estrutural

- Levantadas as seis tabelas públicas: profiles, esfs, esf_members, patients, medications, appointments.
- Confirmado RLS habilitado em todas.
- Levantadas policies por operação e funções de autorização.
- Confirmado uso de private.is_admin, private.is_esf_manager, can_access_esf e can_access_patient.
- Identificadas 16 ocorrências de policies permissivas sobrepostas.
- Relatório detalhado: docs/ai/RLS_AUDIT.md.

### Matriz RLS e decisões de autorização

- Etapa 2 concluída.
- Decidido que doutor enxerga somente pacientes atribuídos a ele.
- Decidido que gestor e doutor não excluem pacientes.
- Decidido que gestor pode reatribuir pacientes da própria ESF a outro doutor da mesma ESF.
- RLS atualizado no Supabase para refletir essas regras.
- can_access_patient() alterado para diferenciar gestor e doutor.
- Policy de UPDATE de pacientes consolidada para impedir transferência por doutor e validar o novo doutor no mesmo vínculo de ESF.
- Policy de DELETE de pacientes removida para usuários não-admin.
- Matriz atualizada em docs/ai/RLS_MATRIX.md.

### Validação

- Migration Supabase 20260928203620_restrict_patient_access_and_assignment aplicada com sucesso.
- Próxima validação é a Etapa 3, com testes de isolamento por persona e operação.

## Regra de manutenção

Ao concluir uma etapa relevante:
1. atualizar o estado vigente;
2. registrar a execução aqui;
3. atualizar somente documentos afetados;
4. validar;
5. fechar com um commit Conventional Commits.
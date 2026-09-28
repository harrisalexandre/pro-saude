# Por Perto — Diário de Trabalho

Registro operacional curto entre sessões. O estado vigente fica em `docs/ai/CURRENT_STATE.md`; este arquivo registra contexto recente e validações relevantes.

## 28/09/2026

### Consolidação documental

- Comparação do modelo documental do ProSaúde com o padrão operacional do KarateERP.
- Estrutura `docs/ai/` mantida como única memória técnica de agentes.
- Protocolo de agentes reforçado em `AGENTS.md`.
- Fluxo pedido → intenção → dependências → regressões → implementação → validação formalizado.
- Definition of Done e formato de comunicação adicionados.
- Papéis, fonte da verdade, arquitetura e responsabilidades documentais explicitados.

### Validação

- Documentos existentes revisados.
- Conteúdo funcional preservado.
- Nenhuma alteração de código ou schema nesta etapa.

### Próximos passos

- Auditar RLS por persona/operação.
- Validar isolamento com duas sessões.
- Fechar CRUD de pacientes.
- Definir fluxos reais de medicamentos e consultas.
- Definir família/cuidador e SOS.

### 28/09/2026 — Auditoria RLS estrutural

- Levantadas as seis tabelas públicas: `profiles`, `esfs`, `esf_members`, `patients`, `medications`, `appointments`.
- Confirmado RLS habilitado em todas.
- Levantadas policies por operação e funções de autorização.
- Confirmado uso de `private.is_admin`, `private.is_esf_manager`, `can_access_esf` e `can_access_patient`.
- Identificadas 16 ocorrências de policies permissivas sobrepostas.
- Nenhuma alteração de banco ou código nesta etapa.
- Relatório detalhado: `docs/ai/RLS_AUDIT.md`.

**Próximo:** matriz Persona × Tabela × Operação e testes de isolamento.

## Regra de manutenção

Ao concluir uma etapa relevante:
1. atualizar o estado vigente;
2. registrar a execução aqui;
3. atualizar somente documentos afetados;
4. validar;
5. fechar com um commit Conventional Commits.

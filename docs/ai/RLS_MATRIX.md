# Matriz RLS — Etapa 2: Persona × Tabela × Operação

**Data:** 28/09/2026
**Escopo:** traduzir as policies atuais em uma matriz verificável. Nenhuma policy foi alterada.

## Legenda
- **A** = permitido pela policy atual
- **—** = não existe policy explícita
- **D** = permitido por condição de domínio/vínculo
- **F** = operação administrativa feita por Edge Function
- **⚠️** = comportamento atual que precisa de validação antes de ser contrato desejado

> A matriz descreve o comportamento técnico atual; não transforma toda permissão existente em regra de negócio aprovada.

## Matriz principal
| Persona | Tabela | SELECT | INSERT | UPDATE | DELETE |
|---|---|---:|---:|---:|---:|
| Admin | profiles | A | F | A | F |
| Admin | esfs | A | A | A | A |
| Admin | esf_members | A | A | A | A |
| Admin | patients | A | A | A | A |
| Admin | medications | A | A | A | A |
| Admin | appointments | A | A | A | A |
| Gestor ESF | profiles | próprio | — | próprio | — |
| Gestor ESF | esfs | D | — | D | — |
| Gestor ESF | esf_members | D | — | — | — |
| Gestor ESF | patients | D | D | D | D ⚠️ |
| Gestor ESF | medications | D | D | D | D |
| Gestor ESF | appointments | D | D | D | D |
| Doutor | profiles | próprio | — | próprio | — |
| Doutor | esfs | D | — | D | — |
| Doutor | esf_members | próprio | — | — | — |
| Doutor | patients | D | D | D | D ⚠️ |
| Doutor | medications | D | D | D | D |
| Doutor | appointments | D | D | D | D |

## Achados

### M1 — Gestor e doutor compartilham grande parte do mesmo poder sobre dados
O acesso a patients, medications e appointments é baseado principalmente em can_access_patient(). Essa função considera membro da ESF ou doutor responsável e não verifica diretamente profiles.role.

Resultado: um doutor membro da ESF possui, tecnicamente, operações equivalentes às de um gestor sobre os dados acessíveis.

**Status:** validar se é intencional.

### M2 — Doutor pode criar paciente
A policy de INSERT de patients permite admin, usuário com acesso à ESF ou usuário definido como doctor_id. Como doutor é membro da ESF, o caminho de acesso à ESF já permite a operação.

**Status:** permitido atualmente; validar contra regra funcional.

### M3 — Membro pode excluir paciente
A policy de DELETE de patients permite is_admin() ou can_access_patient(id). Logo, gestor e doutor com acesso ao paciente podem excluir o registro.

**Status:** ⚠️ requer decisão explícita antes de consolidar como contrato de produto.

### M4 — Alteração de escopo de paciente
patients_update exige acesso atual no USING e acesso à ESF nova ou vínculo como doutor no WITH CHECK. Isso deve ser coberto por teste de isolamento.

### M5 — profiles não é CRUD direto
Não existem policies authenticated para INSERT/DELETE em profiles. Isso é coerente com a decisão de manter criação administrativa de Auth fora do browser.

### M6 — Família/cuidador ainda não participa
Não existe persona/tabela específica para família/cuidador no schema atual. Não inventar autorização antes do modelo funcional existir.

## Próxima validação
1. Admin atravessa todos os escopos.
2. Gestor ESF A não acessa dados da ESF B.
3. Doutor da ESF A não acessa pacientes da ESF B.
4. Validar se doutor deve acessar todos os pacientes da própria ESF ou somente os atribuídos.
5. Validar mudanças de esf_id/doctor_id.
6. Usuário autenticado sem vínculo não acessa dados de domínio.
7. Anônimo não acessa dados de saúde.
8. Operações administrativas de Auth permanecem nas Edge Functions.

## Conclusão
A estrutura atual fornece isolamento por ESF/membro e por doutor responsável, mas o RLS não implementa uma separação forte entre as personas esf e doctor.

Principais pontos para validação: exclusão de pacientes, criação de pacientes por doutor, diferença de poder entre gestor e doutor e futuro modelo de família/cuidador.

Nenhuma policy foi alterada nesta etapa.
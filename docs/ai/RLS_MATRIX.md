# Matriz RLS — Persona × Tabela × Operação

**Data:** 28/09/2026  
**Escopo:** contrato de autorização vigente após a validação dos pontos 1, 2 e 3 da Etapa 2.

## Legenda
- **A** = permitido
- **—** = não permitido por RLS
- **D** = permitido por condição de vínculo/escopo
- **F** = operação administrativa feita por Edge Function

> Esta matriz registra o comportamento técnico que foi decidido como válido neste momento. Permissões podem ser ampliadas ou restringidas futuramente por decisão explícita.

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
| Gestor ESF | patients | D — todos da própria ESF | D | D | — |
| Gestor ESF | medications | D — pacientes da própria ESF | D | D | D |
| Gestor ESF | appointments | D — pacientes da própria ESF | D | D | D |
| Doutor | profiles | próprio | — | próprio | — |
| Doutor | esfs | D | — | D | — |
| Doutor | esf_members | próprio | — | — | — |
| Doutor | patients | D — somente atribuídos | D | D — somente atribuídos | — |
| Doutor | medications | D — pacientes atribuídos | D | D | D |
| Doutor | appointments | D — pacientes atribuídos | D | D | D |

## Regras validadas

### 1. Doutor vê somente pacientes atribuídos a ele
O acesso do doutor a patients passa a depender de patients.doctor_id = auth.uid(). Ser membro da mesma ESF, por si só, não concede acesso aos pacientes.

O mesmo escopo se propaga para medications e appointments, pois essas tabelas usam can_access_patient().

### 2. Gestor e doutor não excluem pacientes
A exclusão de patients fica reservada ao admin. Não existe mais policy de DELETE para gestor ou doutor.

Isso trata a exclusão do registro de paciente no domínio. Não confundir com exclusão de uma conta do Supabase Auth, que permanece em fluxo administrativo próprio.

### 3. Gestor pode reatribuir pacientes dentro da própria ESF
O gestor pode alterar doctor_id de pacientes da própria ESF, desde que o novo doutor:
- tenha perfil doctor;
- esteja ativo;
- seja membro da mesma ESF com papel doctor.

O doutor pode atualizar o paciente que já está atribuído a ele, mas não pode transferi-lo para outro doutor.

A alteração de esf_id também continua limitada ao escopo permitido pelo RLS; não foi criada uma permissão para mover pacientes entre ESFs.

## Decisões temporárias
Estas regras são o contrato vigente por enquanto e podem ser revistas posteriormente:
- doutor não enxerga todos os pacientes da ESF;
- gestor não exclui pacientes;
- doutor não exclui pacientes;
- gestor pode reatribuir dentro da própria ESF.

## Impactos nas features
- **Lista de pacientes do doutor:** deve mostrar apenas pacientes atribuídos ao usuário.
- **Detalhes de paciente:** devem respeitar o mesmo escopo.
- **Medicamentos e consultas:** continuam derivados do acesso ao paciente; doutor perde acesso indireto a registros de pacientes não atribuídos.
- **Cadastro/edição de paciente:** reatribuição para outro doutor é operação de gestor/admin e deve refletir essa regra na UI, sem depender dela para segurança.
- **Exclusão de paciente:** botões/ações para gestor e doutor devem ser removidos ou bloqueados; o backend continua sendo a barreira definitiva.

## Próxima etapa
Etapa 3 — testes de isolamento RLS:
1. Admin atravessa todos os escopos.
2. Gestor ESF A não acessa dados da ESF B.
3. Doutor A não acessa paciente atribuído a Doutor B.
4. Gestor A consegue reatribuir paciente dentro da ESF A.
5. Gestor/doutor não conseguem excluir paciente.
6. Usuário autenticado sem vínculo não acessa dados de domínio.
7. Anônimo não acessa dados de saúde.
8. Operações administrativas de Auth permanecem nas Edge Functions.
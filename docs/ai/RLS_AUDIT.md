# Auditoria RLS — Etapa 1: Estrutural

**Data:** 28/09/2026
**Projeto Supabase:** `vohmmqexaopbmtgycgdt`
**Escopo:** levantamento estrutural, sem alteração de schema, policies ou Edge Functions.

## Resultado

O projeto possui seis tabelas públicas de domínio e todas estão com RLS habilitado:

- `profiles`
- `esfs`
- `esf_members`
- `patients`
- `medications`
- `appointments`

O relacionamento estrutural confirmado é:

`auth.users → profiles → esf_members → esfs → patients → medications/appointments`

## Autorização encontrada

Funções usadas pelas policies:

- `private.is_admin()` — `SECURITY DEFINER`, verifica `profiles.role = admin` e `active`.
- `private.is_esf_manager(target_esf)` — `SECURITY DEFINER`, verifica vínculo `manager`.
- `public.is_admin()` — wrapper de `private.is_admin()`.
- `public.can_access_esf(target_esf)` — admin ou membro da ESF.
- `public.can_access_patient(target_patient)` — admin, membro da ESF do paciente ou doutor responsável.

Não foram encontrados triggers não internos nas tabelas públicas auditadas.

## Policies encontradas

### profiles
- SELECT: próprio usuário ou admin; há duas policies permissivas sobrepostas.
- UPDATE: próprio usuário ou admin.
- Não há INSERT/DELETE explícitos para `authenticated`.

### esfs
- ALL para admin.
- SELECT para admin e membros.
- INSERT restrito a admin + `created_by = auth.uid()`.
- UPDATE para admin ou usuário com acesso à ESF.
- Há policies permissivas sobrepostas.

### esf_members
- ALL para admin.
- SELECT para próprio vínculo, admin e gestor da ESF.
- Há policies SELECT permissivas sobrepostas.

### patients
- SELECT para paciente acessível.
- INSERT para admin, usuário com acesso à ESF ou doutor definido no registro.
- UPDATE para admin ou paciente acessível; há policy adicional para managers.
- DELETE para admin ou paciente acessível.
- Há policies permissivas sobrepostas em INSERT/UPDATE/DELETE.

### medications
- SELECT para paciente acessível.
- INSERT/UPDATE/DELETE para admin ou usuário com acesso ao paciente.
- Há policies permissivas sobrepostas em todas as operações relevantes.

### appointments
- SELECT para paciente acessível.
- INSERT/UPDATE/DELETE para admin ou usuário com acesso ao paciente.
- Há policies permissivas sobrepostas em todas as operações relevantes.

## Achados estruturais

### A1 — Policies permissivas duplicadas
O advisor do Supabase reporta **16 ocorrências** de múltiplas policies permissivas para a mesma tabela, papel e operação.

Isso não prova, isoladamente, uma falha de autorização: policies permissivas são combinadas de forma ampla. Porém, aumenta complexidade, dificulta auditoria e pode produzir permissões mais amplas que a intenção.

**Próxima etapa:** consolidar as policies em contratos explícitos por persona/operação, sem alterar comportamento por suposição.

### A2 — Modelo atual de acesso é baseado em vínculo
`can_access_patient()` considera membro da ESF ou doutor responsável.

Isso fornece a base para isolamento, mas ainda precisa ser validado contra os casos de UPDATE/INSERT/DELETE e contra mudança de `esf_id`/`doctor_id`.

### A3 — UPDATE possui `USING` e `WITH CHECK`
As policies de UPDATE relevantes possuem ambos, o que é importante para impedir que uma alteração mova um registro para fora do escopo permitido. Ainda assim, o contrato precisa ser testado por persona.

### A4 — Funções privilegiadas
As funções `private.is_admin()` e `private.is_esf_manager()` são `SECURITY DEFINER`. Estão em schema `private`, o que reduz exposição, mas precisam ser mantidas sob revisão específica na etapa de segurança.

### A5 — Grants
As tabelas públicas possuem privilégios para `anon` e `authenticated`; RLS está habilitado. A existência do grant não significa acesso efetivo aos dados quando RLS bloqueia a linha, mas o escopo de exposição deve permanecer parte da auditoria.

## Achados fora do escopo imediato

- Supabase Security Advisor: proteção contra senhas vazadas desabilitada.
- Performance Advisor: quatro foreign keys sem índice cobrindo a FK.
- Índices de pacientes/medicamentos/consultas aparecem como ainda não utilizados, provavelmente devido ao baixo volume atual.
- Não foram feitas alterações nesta etapa.

## Próxima etapa

Construir e validar a matriz:

`Persona × Tabela × SELECT/INSERT/UPDATE/DELETE`

e então testar isolamento entre duas ESFs e entre doutores antes de alterar policies.

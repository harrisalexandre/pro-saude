# Etapa 3 — Testes de Isolamento RLS

**Data:** 28/09/2026  
**Ambiente:** Supabase projeto `vohmmqexaopbmtgycgdt`  
**Branch:** `main`

## Objetivo

Validar o comportamento do RLS contra o contrato definido na Etapa 2, usando sessões PostgreSQL simuladas com claims JWT e fixtures transacionais.

## Resultado

### Confirmado

| Teste | Resultado |
|---|---|
| Usuário authenticated sem acesso não recebe pacientes | OK |
| Gestor acessa paciente da própria ESF | OK |
| Gestor não exclui paciente | OK — tentativa não removeu a linha |
| Gestor não enxerga ESF sem vínculo | OK |
| Gestor não enxerga paciente de ESF sem vínculo | OK |
| Anônimo não recebe pacientes | OK |
| Admin atravessa a barreira de pacientes | OK |
| `can_access_patient()` não entra mais em recursão RLS | OK |

Os testes com fixtures foram executados dentro de transações e encerrados com `ROLLBACK`; nenhum paciente, ESF ou dado de teste permaneceu no banco.

### Correção encontrada durante a Etapa 3

A primeira simulação de uma sessão `authenticated` encontrou:

1. falta de acesso ao schema `private` para os helpers usados pelo RLS;
2. depois de corrigido, recursão entre `can_access_patient()` e a própria policy de `patients`, causando `stack depth limit exceeded`.

A solução foi transformar `can_access_esf()` e `can_access_patient()` em helpers `SECURITY DEFINER`, com `search_path` fixado em `public`, evitando que a avaliação do helper seja novamente filtrada pelo RLS da tabela que ele consulta.

O acesso RPC anônimo aos helpers foi removido explicitamente.

## Ainda não comprovado

### Doutor A × Doutor B

Não existem doutores ativos nem contas Auth de homologação no banco atual. Portanto não foi criado usuário falso em `profiles`, pois `profiles.id` possui FK para `auth.users`.

Consequentemente, ainda não foi possível executar uma sessão real de Doutor A contra Doutor B.

### Reatribuição gestor → doutor

A policy foi implementada para permitir ao gestor atribuir somente a doutores ativos vinculados à mesma ESF, mas a execução completa desse cenário aguarda pelo menos duas contas reais de doutor em homologação.

## Estado da Etapa 3

**Parcialmente concluída.**

O mecanismo base de RLS foi exercitado com sessão authenticated, gestor, admin e anônimo, e foram corrigidos dois problemas reais encontrados pelo teste.

O isolamento específico entre dois doutores e a reatribuição para outro doutor permanecem como testes pendentes por falta de fixtures Auth reais.

## Alertas

O Security Advisor mantém:
- `authenticated_security_definer_function_executable` para os dois helpers públicos;
- proteção contra senhas vazadas desabilitada.

O primeiro alerta decorre da necessidade atual de executar os helpers pelo RLS; deve ser tratado em uma etapa de hardening posterior, preferencialmente movendo esses helpers para schema privado e atualizando as policies para chamá-los diretamente.

## Próximo passo

Criar fixtures de homologação com contas Auth reais para executar:
- Doutor A não vê paciente de Doutor B;
- Doutor A não atualiza paciente de Doutor B;
- Gestor reatribui paciente A para Doutor B;
- Doutor não consegue reatribuir para Doutor B;
- Gestor/Doutor não conseguem excluir paciente.


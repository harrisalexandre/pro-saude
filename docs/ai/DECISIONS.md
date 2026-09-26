# Por Perto — Decisões

## Código/schema como fonte da verdade
Fatos verificáveis devem ser confirmados no código e Supabase atual.

## Segurança backend-first
Autorização real fica em backend/RLS/Edge Functions. UI melhora UX, mas não protege contra chamadas manipuladas.

## Auth administrativo fora do browser
Criação administrativa de usuários Auth ocorre em Edge Function, nunca diretamente pelo cliente.

## RLS como barreira definitiva
Tabelas públicas mantêm RLS e policies coerentes com o modelo de acesso. Novas tabelas expostas exigem revisão de RLS.

## Experiência idoso-first
A experiência do idoso permanece deliberadamente mais simples que a administrativa.

## Família/cuidador separado
Família/cuidador configura e acompanha; pessoa idosa executa ações essenciais. O modelo de permissões futuro deve refletir isso.

## SOS sem promessa clínica
SOS é alerta/comunicação até existir integração real.

## Dados de saúde não são inferidos
Agentes não inventam dose, frequência, diagnóstico ou orientação clínica.

## Erro não vira vazio
Falha de backend deve ser distinguida de lista vazia.

## Lockout local é complementar
LocalStorage pode reduzir tentativas na mesma sessão, mas não é controle de segurança suficiente.

## Uma fonte de verdade por fluxo
Ao migrar LocalStorage para Supabase, não manter dois estados concorrentes sem estratégia de sincronização.

## Documentação por responsabilidade
Contexto, estado, regras, arquitetura e decisões ficam separados em `docs/ai`.

## Escopo consciente
Investigar dependências e regressões relacionadas, mas implementar somente o necessário para a intenção solicitada.

## Feature exige validação
Build verde não prova Auth, RLS, UX ou integração; fluxos críticos exigem validação funcional.

# Por Perto — Decisões

## 1. Código/schema como fonte da verdade
**Status:** vigente.

Fatos verificáveis devem ser confirmados no código e Supabase atuais.

## 2. Segurança backend-first
**Status:** vigente.

Autorização real fica em backend/RLS/Edge Functions. UI melhora UX, mas não protege contra chamadas manipuladas.

## 3. Auth administrativo fora do browser
**Status:** vigente.

Criação administrativa de usuários Auth ocorre em Edge Function, nunca diretamente pelo cliente.

## 4. RLS como barreira definitiva
**Status:** vigente.

Tabelas públicas mantêm RLS e policies coerentes com o modelo de acesso. Novas tabelas expostas exigem revisão de RLS.

## 5. Experiência idoso-first
**Status:** vigente.

A experiência da pessoa idosa permanece deliberadamente mais simples que a administrativa.

## 6. Família/cuidador separado
**Status:** diretriz de produto.

Família/cuidador configura e acompanha; pessoa idosa executa ações essenciais. O modelo de permissões futuro deve refletir isso.

## 7. SOS sem promessa clínica
**Status:** vigente.

SOS é alerta/comunicação até existir integração real.

## 8. Dados de saúde não são inferidos
**Status:** vigente.

Não inventar dose, frequência, diagnóstico ou orientação clínica.

## 9. Erro não vira vazio
**Status:** vigente.

Falha de backend deve ser distinguida de lista vazia.

## 10. Lockout local é complementar
**Status:** vigente.

LocalStorage pode reduzir tentativas na mesma sessão, mas não é controle de segurança suficiente.

## 11. Uma fonte de verdade por fluxo
**Status:** vigente.

Ao migrar LocalStorage para Supabase, não manter dois estados concorrentes sem estratégia de sincronização.

## 12. Documentação por responsabilidade
**Status:** vigente.

Contexto, estado, regras, arquitetura e decisões ficam separados em `docs/ai`; catálogo e diário ficam em `docs/`.

## 13. Processo agent-ready
**Status:** vigente.

Cada etapa relevante deve seguir:

`investigar → implementar → documentar → validar → commit`

Pedidos curtos devem ser interpretados pela intenção e pelo contexto do projeto, sem ampliar indiscriminadamente o escopo.

## 14. Feature exige validação
**Status:** vigente.

Build verde não prova Auth, RLS, UX ou integração; fluxos críticos exigem validação funcional.

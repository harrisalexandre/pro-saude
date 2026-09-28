# Por Perto — Arquitetura

## Visão

`Landing/Login → Supabase Auth → profiles → Admin/ESF/Doutor → patients → medications/appointments`

## Camadas

Fluxo preferencial:

`Page/Component → Service → Supabase/Edge Function → Auth/RLS/Backend → PostgreSQL`

### Frontend

- `src/main.jsx` inicializa a aplicação.
- `Entry.jsx` controla a entrada entre landing e área autenticada.
- `App.jsx` concentra parte relevante do fluxo atual de autenticação/perfil/painéis.
- `Landing.jsx` apresenta a área pública.
- Serviços devem concentrar acesso a dados e integrações à medida que os fluxos forem evoluindo.
- Componentes não devem ser tratados como autoridade de autorização.

### Supabase

Projeto atual: `vohmmqexaopbmtgycgdt`.

Uso:
- Auth para identidade/sessão;
- PostgreSQL para dados;
- RLS para autorização de dados;
- Edge Functions para operações privilegiadas.

Storage, Realtime e Push não são contratos funcionais confirmados até implementação específica.

## Identidade

`auth.users` é a identidade de autenticação.

`profiles` é o perfil operacional associado.

Não usar `user_metadata`, LocalStorage ou estado visual como autoridade de autorização.

## Operações privilegiadas

Fluxo:

`React → supabase.functions.invoke() → Edge Function → Auth Admin/Postgres`

`manage-staff-user` valida sessão, resolve usuário, verifica papel/vínculo e executa criação administrativa com tentativa de rollback.

## Segurança

- RLS é barreira definitiva para dados.
- Backend deve validar identidade, papel, vínculo e entrada.
- `service_role` somente server-side.
- Não confiar em tenant/papel/permissão enviados pelo browser.
- Toda nova tabela exposta exige revisão de RLS.
- Mudanças em dados sensíveis exigem revisão de escopo e logs.

## Persistência legada

O projeto nasceu com LocalStorage. Essa camada não representa sincronização multiusuário real.

Ao migrar um fluxo para Supabase:
- definir uma fonte de verdade;
- remover duplicidade quando seguro;
- evitar duas fontes concorrentes sem estratégia de sincronização;
- registrar decisão quando a migração alterar comportamento.

## Estados de interface

Fluxos críticos devem distinguir:

`loading ≠ error ≠ empty ≠ success`

Falha de backend não pode aparecer como “nenhum dado”.

## Contratos de serviço

À medida que services forem consolidados, preferir contratos previsíveis e erros de domínio em vez de expor erros técnicos diretamente à UI.

Não inventar contrato novo sem verificar os fluxos existentes e registrar decisão quando ele se tornar padrão.

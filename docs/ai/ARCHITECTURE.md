# Por Perto — Arquitetura

## Visão

`Landing/Login → Supabase Auth → profiles → Admin/ESF/Doutor → patients → medications/appointments`

## Frontend

- `index.html` → `src/main.jsx` → `Entry.jsx`.
- `Entry.jsx` alterna landing e aplicação autenticada.
- `App.jsx` concentra autenticação, perfil e painéis atuais.
- `Landing.jsx` é a apresentação pública.
- `store.js` mantém persistência do protótipo legado.
- `supabase.js` cria o cliente Supabase.

## Supabase

Projeto atual: `vohmmqexaopbmtgycgdt`.

Uso:
- Auth para identidade/sessão;
- PostgreSQL para dados;
- RLS para acesso;
- Edge Functions para operações privilegiadas.

Storage, Realtime e Push ainda não são contratos funcionais confirmados.

## Identidade

`auth.users` é a identidade de autenticação.

`profiles` é o perfil operacional associado ao mesmo UUID.

Não usar `user_metadata` como autoridade de autorização.

## Operações privilegiadas

Fluxo:

`React → supabase.functions.invoke() → Edge Function → Auth Admin/Postgres`

`manage-staff-user` valida token, resolve usuário, consulta profile, verifica papel/vínculo, cria Auth/profile/vínculos e tenta rollback em falhas intermediárias.

## Segurança

- RLS em tabelas públicas;
- menor privilégio;
- backend-first;
- Auth Admin em Edge Function;
- sem `service_role` no browser;
- não confiar em papel enviado pelo frontend;
- LocalStorage nunca concede autorização;
- validar entrada no backend.

## Persistência legada

O projeto nasceu com LocalStorage. Essa camada não representa sincronização multiusuário real.

Ao migrar fluxo para Supabase, evitar duas fontes concorrentes sem estratégia explícita.

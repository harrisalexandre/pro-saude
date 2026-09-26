# Por Perto — Contexto

## Produto

**Por Perto** é a aplicação de cuidado familiar do projeto ProSaúde. A proposta aproxima pessoa idosa, família/cuidador e rede de atendimento em uma experiência simples, especialmente adequada a cidades pequenas.

Regra central de UX:

> Se uma pessoa idosa precisa pedir ajuda para entender o aplicativo, a interface falhou.

## Experiências

### Pessoa idosa

Experiência extremamente simples, focada em:
- próximo medicamento;
- confirmação de tomada;
- agenda/consultas;
- SOS Familiar;
- responsável familiar;
- mensagens claras e grandes.

### Central administrativa

Experiência mais densa para usuários autorizados:
- Administração;
- ESF;
- Doutor;
- pacientes;
- vínculos ESF/doutores;
- consultas;
- medicamentos.

## Papéis atuais

O schema atual define:
- `admin` — administração da rede;
- `esf` — responsável/gestor de uma ESF;
- `doctor` — profissional vinculado a uma ESF.

Autorização real não deve ser inferida apenas pela UI.

## Stack

- React;
- Vite;
- JavaScript/JSX;
- Supabase Auth;
- Supabase PostgreSQL;
- Supabase Edge Functions;
- GitHub Pages no deploy atual;
- LocalStorage ainda existe em partes do protótipo legado.

Arquivos principais atuais:
`src/App.jsx`, `src/Entry.jsx`, `src/Landing.jsx`, `src/main.jsx`, `src/store.js`, `src/styles.css` e `src/supabase.js`.

## Banco atual

Tabelas públicas confirmadas:
- `profiles`
- `esfs`
- `esf_members`
- `patients`
- `medications`
- `appointments`

Todas estão com RLS habilitado.

Relações:
`auth.users → profiles`
`esfs → esf_members → profiles`
`esfs → patients`
`profiles(doctor) → patients`
`patients → medications`
`patients → appointments`

## Documentação

A memória de agentes fica em `/docs/ai/`:
- `CURRENT_STATE.md` — estado.
- `BUSINESS_RULES.md` — regras.
- `ARCHITECTURE.md` — arquitetura.
- `DECISIONS.md` — decisões.
- `FEATURES.md` — catálogo.
- `DAILY_WORK.md` — histórico operacional.

Em dúvida sobre estado, consultar `CURRENT_STATE.md`; em dúvida sobre fatos técnicos, conferir código e Supabase.

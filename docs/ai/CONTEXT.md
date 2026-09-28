# Por Perto — Contexto

## Produto

**Por Perto** é a aplicação de cuidado conectado do projeto ProSaúde. A proposta aproxima pessoa idosa, família/cuidador e rede de atendimento em uma experiência simples.

Regra central de UX:

> Se uma pessoa idosa precisa pedir ajuda para entender o aplicativo, a interface falhou.

## Experiências

### Pessoa idosa

Experiência simples, focada em:
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
- vínculos;
- consultas;
- medicamentos.

## Papéis atuais

- `admin` — administração da rede;
- `esf` — gestão de uma ESF;
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
- LocalStorage em partes do protótipo legado.

## Banco

Tabelas confirmadas pela documentação da branch de trabalho:
- `profiles`
- `esfs`
- `esf_members`
- `patients`
- `medications`
- `appointments`

Relações:

`auth.users → profiles`  
`esfs → esf_members → profiles`  
`esfs → patients`  
`profiles(doctor) → patients`  
`patients → medications`  
`patients → appointments`

## Regra de fonte

Para fatos técnicos, conferir código e schema atual. Documentos de agente orientam o trabalho, mas não substituem a fonte técnica.

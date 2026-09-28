# Por Perto — Contexto

## Produto

**Por Perto** é a aplicação de cuidado conectado do projeto ProSaúde. Aproxima pessoa idosa, família/cuidador e rede de atendimento em uma experiência simples.

Regra central de UX:

> Se uma pessoa idosa precisa pedir ajuda para entender o aplicativo, a interface falhou.

## Experiências

### Pessoa idosa
Experiência simples e direta:
- próximo medicamento;
- confirmação de tomada;
- consultas;
- SOS Familiar;
- responsável;
- mensagens claras, grandes e acionáveis.

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

Autorização real é definida pelo backend/RLS, não pela interface.

## Stack

- React;
- Vite;
- JavaScript/JSX;
- Supabase Auth;
- Supabase PostgreSQL;
- Supabase Edge Functions;
- GitHub Pages no deploy atual;
- LocalStorage em partes do protótipo legado.

## Banco confirmado

- `profiles`
- `esfs`
- `esf_members`
- `patients`
- `medications`
- `appointments`

Relações centrais:

`auth.users → profiles → esf_members/esfs → patients → medications/appointments`

## Princípio de arquitetura

O fluxo preferencial é:

`Page/Component → Service → Supabase/Edge Function → Auth/RLS/Backend → Banco`

Componentes não devem concentrar regras de persistência, autorização ou integrações privilegiadas.

## Fonte da verdade

Para fatos técnicos:
1. código/schema atual;
2. documentação técnica específica;
3. documentos de agente.

Os documentos orientam o trabalho, mas não substituem o estado real do código e banco.

## Onde cada informação vive

- Estado e fila: `CURRENT_STATE.md`
- Funcionalidades: `FEATURES.md`
- Trabalho recente: `DAILY_WORK.md`
- Regras: `BUSINESS_RULES.md`
- Arquitetura: `ARCHITECTURE.md`
- Decisões: `DECISIONS.md`
- Visão estável: este arquivo
- Protocolo de execução: `AGENTS.md`

Se a IA não conseguir descobrir “onde estamos” sem ler histórico de conversa, o estado está subdocumentado.

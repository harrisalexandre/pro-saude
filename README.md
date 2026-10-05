# Por Perto — ProSaúde

**Por Perto** é a aplicação do projeto **ProSaúde**, criada para aproximar pessoa idosa, família/cuidador e rede de atendimento em uma experiência simples, acessível e segura.

O projeto nasceu como protótipo local e está em evolução para uma arquitetura com **React + Supabase**, autenticação, banco de dados, RLS e Edge Functions.

> **Princípio central de UX:** se uma pessoa idosa precisa pedir ajuda para entender o aplicativo, a interface falhou.

## Aplicação

Acesse a versão publicada do **Por Perto**:

**https://harrisalexandre.github.io/pro-saude/**

## Contexto do projeto

O ProSaúde é um projeto institucional da **CNA Ctrl Play — Santiago/RS**, orientado pelo professor **Harris Alexandre**, com desenvolvimento dos alunos **Otavio, Vitor e João**.

A proposta combina aprendizagem baseada em projeto com tecnologias utilizadas em aplicações reais.

## Produto

O Por Perto possui experiências diferentes para cada público.

### Pessoa idosa

Interface simples, direta e mobile-first:

- próximo medicamento;
- confirmação de tomada;
- consultas;
- SOS Familiar;
- responsável;
- mensagens grandes e claras;
- poucas decisões por tela.

### Central administrativa

Experiência para usuários autorizados da rede:

- administração;
- ESF;
- doutores;
- pacientes;
- vínculos;
- medicamentos;
- consultas.

## Papéis atuais

- `admin` — administração da rede;
- `esf` — gestão de uma ESF;
- `doctor` — profissional vinculado a uma ESF.

A interface pode esconder ou mostrar recursos, mas **a autorização definitiva pertence ao backend/RLS**.

## Arquitetura atual

Fluxo preferencial:

```text
React
  ↓
Page / Component
  ↓
Service
  ↓
Supabase / Edge Function
  ↓
Auth / RLS / Backend
  ↓
PostgreSQL
```

Stack:

- React;
- Vite;
- JavaScript / JSX;
- Supabase Auth;
- Supabase PostgreSQL;
- Supabase Edge Functions;
- `@supabase/supabase-js`;
- Lucide React;
- Motion;
- GitHub Pages.

O projeto ainda possui partes do protótipo legado baseadas em LocalStorage. Elas não devem ser tratadas como autorização nem como fonte concorrente de dados sem uma estratégia explícita de sincronização.

## Banco de dados

Domínio atualmente documentado:

```text
auth.users
    ↓
profiles
    ↓
esf_members / esfs
    ↓
patients
    ↓
medications / appointments
```

Tabelas principais:

- `profiles`
- `esfs`
- `esf_members`
- `patients`
- `medications`
- `appointments`

## Autenticação e segurança

A base atual utiliza Supabase Auth e RLS.

Princípios obrigatórios:

- frontend não é autoridade de autorização;
- `service_role` nunca vai para o bundle React;
- operações privilegiadas permanecem no backend/Edge Functions;
- dados de saúde são tratados como sensíveis;
- escopo de acesso por persona deve ser explícito;
- falha de backend não deve ser apresentada como lista vazia;
- mudanças em Auth, RLS ou dados de saúde exigem validação específica.

Edge Functions atualmente documentadas:

- `manage-staff-user` — fluxo atual para criação de ESF/doutor;
- `admin-create-doctor` — fluxo alternativo/legado, que não deve evoluir sem decisão explícita.

## Estado atual

A base funcional cobre:

**Landing → Login → Sessão → Perfil → Admin / ESF / Doutor**

O domínio está preparado para:

**Paciente → Medicamentos → Consultas → Experiência do idoso → SOS Familiar**

A próxima frente de consolidação é fechar a matriz de permissões e o isolamento por persona antes de ampliar funcionalidades críticas.

Itens ainda em evolução:

- matriz Persona × Tabela × Ação;
- isolamento ESF → pacientes;
- isolamento doutor → pacientes;
- INSERT/UPDATE/DELETE por papel;
- recuperação segura de senha;
- rate limiting/CAPTCHA;
- CRUD completo de pacientes;
- medicamentos reais e sincronizados;
- consultas reais;
- família/cuidador;
- SOS real;
- experiência do idoso consumindo Supabase;
- notificações;
- WhatsApp, se permanecer no escopo;
- auditoria, governança e LGPD.

## Documentação para agentes e desenvolvimento

O repositório possui um protocolo operacional inspirado na estrutura madura utilizada no Karate ERP.

Antes de alterar o projeto, o agente deve consultar:

```text
AGENTS.md
  ↓
docs/ai/CONTEXT.md
docs/ai/CURRENT_STATE.md
  ↓
docs/FEATURES.md
docs/ai/BUSINESS_RULES.md
docs/ai/ARCHITECTURE.md
docs/ai/DECISIONS.md
```

### Mapa da documentação

| Documento | Responsabilidade |
|---|---|
| `AGENTS.md` | protocolo permanente dos agentes |
| `docs/ai/CONTEXT.md` | contexto estável do produto |
| `docs/ai/CURRENT_STATE.md` | estado atual, fila e bloqueios |
| `docs/FEATURES.md` | catálogo funcional cumulativo |
| `docs/DAILY_WORK.md` | diário operacional |
| `docs/ai/BUSINESS_RULES.md` | regras funcionais confirmadas |
| `docs/ai/ARCHITECTURE.md` | arquitetura e contratos técnicos |
| `docs/ai/DECISIONS.md` | decisões arquiteturais duradouras |

Regra de trabalho:

```text
investigar
→ entender intenção
→ mapear dependências
→ implementar
→ documentar
→ validar
→ commit
```

O código e o schema atuais continuam sendo a fonte da verdade para fatos verificáveis.

## Desenvolvimento local

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

Gere o build:

```bash
npm run build
```

Validação padrão do agente:

```bash
npm run check
```

Atalho equivalente para agentes:

```bash
npm run agent:check
```

Visualize o build:

```bash
npm run preview
```

## Validação e CI

O comando padrão de validação é:

```text
npm run check
```

Atualmente ele executa o build do Vite.

O workflow do GitHub Pages utiliza o mesmo comando, mantendo a validação local e a validação de CI alinhadas.

> Build verde não significa feature concluída quando Auth, RLS, UX, dados ou integrações também foram alterados.

## Deploy

O projeto utiliza **GitHub Pages** no deploy atual.

Workflow:

```text
push na main
  ↓
GitHub Actions
  ↓
npm install
  ↓
npm run check
  ↓
build/dist
  ↓
GitHub Pages
```

A URL pública atual é:

https://harrisalexandre.github.io/pro-saude/

## Princípios de UX

1. **A família configura; o idoso utiliza.**
2. **O idoso não deve precisar entender o sistema.**
3. **A ação principal deve ser evidente.**
4. **Clareza vem antes de quantidade de informação.**
5. **SOS deve ser fácil de encontrar.**
6. **Acessibilidade é parte da funcionalidade.**
7. **O painel pode ser denso; a experiência do idoso não.**

## Acessibilidade

A interface prioriza:

- mobile-first;
- textos grandes;
- contraste;
- foco visível;
- navegação por teclado;
- áreas de toque amplas;
- mensagens acompanhadas de texto;
- redução de movimento;
- baixa carga cognitiva.

## Convenções de trabalho

- Desenvolvimento e integração na `main`.
- Alterações pequenas, rastreáveis e verificáveis.
- Sem refactors oportunistas.
- Sem inventar tabelas, APIs, permissões ou regras.
- Reutilizar componentes, services e fluxos existentes.
- Toda alteração relevante deve atualizar a documentação afetada.
- Cada etapa relevante termina com validação e um commit Conventional Commits.

## Licença / uso

Projeto educacional e institucional desenvolvido no contexto da CNA Ctrl Play / ProSaúde.

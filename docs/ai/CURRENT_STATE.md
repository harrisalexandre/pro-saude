# Por Perto — Estado atual e fila de trabalho

**Atualizado em:** 26/09/2026  
**Branch de trabalho:** `feat/landing-login`  
**Produto:** ProSaúde / Por Perto  
**Backend:** Supabase  
**Status geral:** 🟡 **BASE FUNCIONAL EM CONSOLIDAÇÃO**

---

## 1. Estado do produto

O **Por Perto** está saindo de um protótipo local para uma aplicação React com autenticação, banco real e autorização via Supabase.

A base atual cobre:

**Landing → Login → Sessão → Perfil → Admin / ESF / Doutor**

E possui o modelo necessário para avançar para:

**Paciente → Medicamentos → Consultas → Experiência do idoso → SOS Familiar**

A arquitetura ainda está em consolidação. **Não considerar o produto pronto para operação real** apenas porque autenticação e banco estão funcionando.

---

## 2. Consolidado

### Entrada e autenticação
- Landing pública criada.
- CTA para acesso à área autenticada.
- Supabase Auth integrado.
- Sessão autenticada carregada pelo frontend.
- Perfil operacional carregado após login.
- Mensagem de login não revela se o e-mail existe.
- E-mail normalizado antes da autenticação.
- Lockout local após 5 tentativas inválidas por 15 minutos como camada complementar de UX.

### Estrutura administrativa
- Perfil `admin`.
- Perfil `esf`.
- Perfil `doctor`.
- ESF com vínculo de membros.
- Doutor vinculado a uma ESF.
- Paciente vinculado a uma ESF.
- Paciente pode possuir doutor responsável.

### Banco / domínio
- `profiles`
- `esfs`
- `esf_members`
- `patients`
- `medications`
- `appointments`

Todas as tabelas públicas atuais estão com **RLS habilitado**.

### Operações privilegiadas
- Criação administrativa de usuários Auth ocorre por Edge Function.
- `manage-staff-user` valida sessão, papel e vínculo antes de criar usuários.
- Fluxos de criação tentam rollback quando uma etapa intermediária falha.
- Edge Functions estão protegidas por JWT.

---

## 3. Trabalho concluído recentemente

### Landing → Login

A entrada foi reorganizada para separar apresentação pública e aplicação autenticada.

- `index.html` aponta para `src/main.jsx`.
- `Entry.jsx` decide entre Landing e aplicação.
- `Landing.jsx` contém a apresentação pública.
- `painel.html` continua como entrada administrativa.
- A autenticação permanece centralizada no Supabase Auth.

**Atenção:** a entrada atual ainda usa uma decisão simples baseada no pathname/estado React. Funciona para o estágio atual, mas deve ser consolidada antes de uma navegação maior.

### Hardening do login

Foi corrigido o problema de enumeração de contas no frontend.

O login agora:
- usa mensagem genérica para credenciais inválidas;
- não informa se o usuário existe;
- normaliza o e-mail;
- aplica bloqueio local após tentativas consecutivas.

**Limitação conhecida:** LocalStorage não é barreira de segurança. Rate limiting server-side e CAPTCHA devem ser considerados a proteção efetiva contra abuso.

### Cadastro de ESF e Doutor

A Edge Function `manage-staff-user` é o fluxo atualmente consolidado.

Ela:
1. valida o token;
2. resolve o usuário autenticado;
3. consulta `profiles`;
4. valida papel e vínculo;
5. cria Auth;
6. cria `profiles`;
7. cria ESF/vínculo quando aplicável;
8. tenta desfazer registros parciais em caso de erro.

`admin-create-doctor` também existe, mas deve ser tratado como **fluxo alternativo/legado até decisão explícita**.

---

## 4. Estado por persona

| Persona | Estado | Confirmado |
|---|---|---|
| **Admin** | 🟡 Base funcional | ESFs, doutores, pacientes e criação administrativa |
| **ESF** | 🟡 Base funcional | vínculo, doutores, pacientes e criação de doutor |
| **Doutor** | 🟡 Base funcional | acesso aos pacientes vinculados |
| **Paciente/Idoso** | ⏳ Em construção | modelo de dados existe; experiência real não está fechada |
| **Família/Cuidador** | ⏳ Não consolidado | conceito existe; modelo de acesso precisa ser definido |

> Não assumir que uma persona está concluída apenas porque existe uma tela ou rota. Validar acesso, dados, permissões e comportamento real.

---

## 5. Modelo de dados atual

### Identidade

`auth.users`  
↓  
`profiles`

### Rede de atendimento

`esfs`  
↓  
`esf_members`  
↓  
`profiles`

### Pacientes

`esfs`  
↓  
`patients`  
↳ `doctor_id` → `profiles`

### Cuidado

`patients`  
├── `medications`  
└── `appointments`

---

## 6. Segurança / RLS

### Confirmado
- RLS habilitado nas tabelas públicas atuais.
- Auth administrativo fora do browser.
- `service_role` somente server-side.
- Edge Functions exigem JWT.
- Frontend não é autoridade de autorização.
- Login não revela existência de contas.

### Ainda precisa de auditoria
- Matriz **Persona × Tabela × Ação**.
- Isolamento ESF → pacientes.
- Isolamento doutor → pacientes.
- INSERT/UPDATE/DELETE de cada papel.
- Acesso direto via API, fora da interface.
- Revisão das Edge Functions e grants.
- Recuperação de senha sem enumeração.
- Rate limiting/CAPTCHA no Auth.

**Critério:** esconder uma tela ou botão não conta como proteção.

---

## 7. Funcionalidades ainda não concluídas

### Pacientes
- CRUD completo e validado.
- Estados de loading/erro/vazio.
- Validação de escopo por ESF.
- Experiência dedicada do idoso.

### Medicamentos
- CRUD completo.
- Lembretes reais.
- Registro de tomada.
- Histórico.
- Sincronização entre dispositivos.

### Consultas
- CRUD completo.
- Confirmação/cancelamento.
- Histórico.
- Visão do idoso.
- Visão do doutor/ESF.

### SOS Familiar
- Cadastro de contatos.
- Permissões da família/cuidador.
- Disparo de alerta.
- Estado do alerta.
- Comunicação real.
- Definição de localização, se fizer parte do escopo final.

**Não considerar SOS implementado enquanto existir apenas uma simulação visual.**

### Família / Cuidador
Ainda precisa definir:
- identidade;
- vínculo com paciente;
- múltiplos pacientes;
- permissões;
- configuração versus uso;
- recuperação de acesso;
- revogação de vínculo.

---

## 8. Dados do ambiente atual

Fotografia do Supabase consultado durante a atualização:

- `profiles`: **2**
- `esfs`: **1**
- `esf_members`: **1**
- `patients`: **0**
- `medications`: **0**
- `appointments`: **0**

Esses números são apenas o estado observado no momento da documentação.

**Não usar esses números como regra de negócio nem como evidência de que o ambiente de produção está vazio.**

---

## 9. Edge Functions

### `manage-staff-user`

**Estado:** ✅ ativa / fluxo atual

Responsável por operações administrativas de criação de ESF, doutor, perfil e vínculo.

### `admin-create-doctor`

**Estado:** 🟡 existente / revisar

Também cria doutor usando privilégios administrativos.

Antes de evoluir esse fluxo, decidir se será removido, mantido por compatibilidade ou consolidado como único contrato.

**Não criar uma terceira função para resolver o mesmo problema sem necessidade.**

---

## 10. Regressão e validação

### Já validado
- Estrutura de autenticação Supabase.
- Existência dos perfis atuais.
- Edge Functions ativas.
- RLS habilitado nas tabelas públicas.
- Fluxo administrativo de criação via Edge Function.
- Landing/login na branch de trabalho.
- Tratamento genérico de erro de login.

### Ainda não validado de forma suficiente
- E2E completo de cada persona.
- Isolamento entre ESFs.
- Isolamento doutor → pacientes.
- Segunda sessão independente.
- Fluxos completos de paciente.
- Medicamentos reais.
- Consultas reais.
- SOS real.
- Recuperação de senha.
- Proteção server-side contra brute force.
- Auditoria completa de policies.

**Build verde não significa feature concluída.**

---

## 11. Fila atual

### 🔴 Prioridade alta — segurança e fundação

1. Auditar RLS por persona e operação.
2. Validar isolamento dos dados com duas sessões.
3. Consolidar Landing → Login → Aplicação.
4. Implementar recuperação segura de senha.
5. Revisar rate limiting/CAPTCHA.
6. Decidir o destino de `admin-create-doctor`.

### 🟠 Prioridade média — domínio

7. Fechar CRUD de pacientes.
8. Fechar medicamentos.
9. Fechar consultas.
10. Definir família/cuidador.
11. Definir modelo real do SOS.

### 🟡 Depois da fundação

12. Experiência idoso-first consumindo Supabase.
13. Sincronização entre dispositivos.
14. Notificações.
15. WhatsApp, se permanecer no escopo.
16. Auditoria/governança/LGPD.

---

## 12. Próxima sequência recomendada

A próxima sessão de desenvolvimento deve seguir esta ordem:

1. **RLS e isolamento**
2. **Auth / recuperação de acesso**
3. **Navegação / entrada**
4. **Pacientes**
5. **Medicamentos**
6. **Consultas**
7. **Família/Cuidador**
8. **SOS**
9. **Experiência idoso**
10. **Notificações e integrações**

Não avançar para funcionalidades de superfície enquanto houver dúvida sobre **quem pode acessar quais dados**.

---

## 13. Critério de pronto

Uma feature com fluxo de usuário só entra como **✅ concluída** quando houver:

- implementação;
- regra documentada quando necessário;
- build/validação técnica;
- validação do backend;
- RLS/política correspondente;
- validação da persona;
- estados loading/erro/vazio;
- teste do fluxo principal;
- ausência de regressão nos fluxos relacionados.

Para segurança, **teste de UI sozinho nunca é suficiente**.

---

> **Regra de manutenção:** este arquivo representa somente o estado vigente. Ao concluir uma etapa, atualizar o estado e retirar a pendência correspondente. Histórico detalhado fica em commits, `DAILY_WORK.md` e documentos específicos.

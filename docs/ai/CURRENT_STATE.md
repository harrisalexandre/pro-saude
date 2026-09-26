# Por Perto — Estado Atual

**Atualizado em:** 26/09/2026
**Branch em trabalho:** `feat/landing-login`

## 1. Estado

O projeto está na transição de protótipo local para aplicação React com autenticação e backend Supabase.

Base atual:
- login;
- sessão;
- perfil;
- Admin;
- ESF;
- Doutor;
- cadastro de ESF;
- cadastro de doutor;
- cadastro de paciente;
- estrutura de medicamentos e consultas no banco.

## 2. Entrada e autenticação

A branch atual possui:
- landing pública;
- CTA para entrar;
- entrada administrativa por `painel.html`;
- Supabase Auth;
- mensagem genérica para falha de login;
- normalização de e-mail;
- lockout local após 5 tentativas inválidas por 15 minutos.

O lockout em LocalStorage é somente UX e pode ser contornado. Proteção server-side do Supabase e CAPTCHA continuam sendo a defesa real contra abuso.

## 3. Acesso

### Admin
- lista ESFs, doutores e pacientes;
- cria ESF + acesso;
- cria doutor via Edge Function.

### ESF
- carrega a ESF vinculada como `manager`;
- lista doutores e pacientes da própria ESF;
- cria doutor para a própria ESF;
- cria paciente para a própria ESF.

### Doutor
- visualiza pacientes vinculados ao seu `doctor_id`.

## 4. Edge Functions

Ativas:
- `manage-staff-user` — fluxo atual para criar ESF e doutor;
- `admin-create-doctor` — função alternativa/legada a revisar.

Ambas exigem JWT.

`manage-staff-user` valida token, perfil, papel e vínculo antes de criar Auth + profile + vínculos. Em falha, tenta rollback.

## 5. Banco

Fotografia do ambiente consultado:
- `profiles`: 2;
- `esfs`: 1;
- `esf_members`: 1;
- `patients`: 0;
- `medications`: 0;
- `appointments`: 0.

Essas quantidades não são regras de negócio.

## 6. Em consolidação

- landing/login;
- cadastro/autenticação;
- hierarquia Admin → ESF → Doutor → Paciente;
- pacientes;
- medicamentos;
- consultas;
- experiência do idoso;
- SOS Familiar;
- sincronização entre aparelhos;
- notificações;
- WhatsApp;
- auditoria;
- governança/LGPD.

## 7. Pendências prioritárias

1. Fechar navegação landing/login/área autenticada.
2. Validar RLS por papel em todos os fluxos.
3. Consolidar pacientes, medicamentos e consultas em telas reais.
4. Fazer a experiência do idoso consumir dados reais.
5. Definir família/cuidador e contatos do SOS.
6. Definir sincronização entre aparelhos.
7. Revisar rate limiting/CAPTCHA de login.
8. Criar recuperação de senha sem enumeração.
9. Decidir destino de `admin-create-doctor`.
10. Criar testes funcionais/E2E.

## 8. Critério de conclusão

Feature de usuário exige implementação + documentação + validação frontend + backend/RLS + validação do papel + regressão dos fluxos relacionados.

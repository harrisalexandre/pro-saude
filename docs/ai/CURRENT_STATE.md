# Por Perto — Estado Atual

**Atualizado em:** 28/09/2026  
**Branch:** `main`  
**Produto:** ProSaúde / Por Perto  
**Backend:** Supabase  
**Status:** 🟡 **BASE FUNCIONAL EM CONSOLIDAÇÃO**

## Estado consolidado

A base atual cobre:

**Landing → Login → Sessão → Perfil → Admin / ESF / Doutor**

O modelo de domínio está preparado para:

**Paciente → Medicamentos → Consultas → Experiência do idoso → SOS Familiar**

Não considerar o produto pronto para operação real apenas porque autenticação e banco estão funcionando.

## Entrada e autenticação

- Landing pública.
- CTA para área autenticada.
- Supabase Auth.
- Sessão persistente.
- Perfil operacional carregado após login.
- Mensagem genérica para credenciais inválidas.
- E-mail normalizado.
- Lockout local após 5 tentativas inválidas por 15 minutos, como camada complementar.
- Retorno da tela de login para a landing preservado.

O lockout em LocalStorage não substitui rate limiting server-side/CAPTCHA.

## Papéis

- `admin` — administração da rede.
- `esf` — gestão de uma ESF.
- `doctor` — profissional vinculado a uma ESF.

## Domínio

- `profiles`
- `esfs`
- `esf_members`
- `patients`
- `medications`
- `appointments`

Relacionamento central:

`auth.users → profiles → esf_members/esfs → patients → medications/appointments`

## Edge Functions

### `manage-staff-user`

Fluxo atual para criação de ESF e doutor, com validação de sessão/papel/vínculo e tentativa de rollback.

### `admin-create-doctor`

Existe como fluxo alternativo/legado e precisa de decisão antes de novas evoluções.

## Segurança

### Confirmado pela documentação da branch analisada

- RLS habilitado nas tabelas públicas atuais.
- Auth administrativo fora do browser.
- `service_role` server-side.
- Edge Functions protegidas por JWT.
- Frontend não é autoridade de autorização.

### Ainda precisa de auditoria

- matriz Persona × Tabela × Ação;
- isolamento ESF → pacientes;
- isolamento doutor → pacientes;
- INSERT/UPDATE/DELETE por papel;
- acesso direto via API;
- grants e Edge Functions;
- recuperação de senha;
- rate limiting/CAPTCHA;
- E2E de cada persona.

## Funcionalidades pendentes

1. RLS e isolamento por persona.
2. Recuperação segura de senha.
3. CRUD completo de pacientes.
4. Medicamentos reais e sincronizados.
5. Consultas reais.
6. Família/cuidador.
7. SOS real.
8. Experiência idoso consumindo Supabase.
9. Notificações.
10. WhatsApp, se permanecer no escopo.
11. Auditoria/governança/LGPD.

## Critério de pronto

Feature crítica só é considerada concluída quando houver implementação, validação técnica, backend/RLS, validação da persona, estados loading/erro/vazio, teste do fluxo principal e ausência de regressão relacionada.

> Build verde sozinho não prova Auth, RLS, UX ou integração.

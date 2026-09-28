# Por Perto — Estado Atual

**Atualizado em:** 28/09/2026  
**Branch canônica:** main  
**Produto:** ProSaúde / Por Perto  
**Backend:** Supabase  
**Status:** 🟡 **BASE FUNCIONAL EM CONSOLIDAÇÃO**

## 1. Estado do produto

A base atual cobre:

**Landing → Login → Sessão → Perfil → Admin / ESF / Doutor**

O domínio está preparado para:

**Paciente → Medicamentos → Consultas → Experiência do idoso → SOS Familiar**

Autenticação e banco funcionando não significam produto pronto para operação real.

## 2. Consolidado

### Entrada e autenticação
- Landing pública.
- CTA para área autenticada.
- Supabase Auth.
- Sessão persistente.
- Perfil operacional após login.
- Mensagem genérica para credenciais inválidas.
- E-mail normalizado.
- Lockout local após 5 tentativas inválidas por 15 minutos.
- Retorno da tela de login para a landing preservado.

O lockout em LocalStorage é complementar e não substitui rate limiting server-side/CAPTCHA.

### Administração
- Painel Admin.
- Listagem de ESFs, doutores e pacientes.
- Criação de ESF + acesso.
- Criação de doutor vinculada à ESF.
- Criação de paciente.

### Domínio
- profiles
- esfs
- esf_members
- patients
- medications
- appointments

### Edge Functions
- manage-staff-user: fluxo atual para criação de ESF/doutor com validação e tentativa de rollback.
- admin-create-doctor: fluxo alternativo/legado; não evoluir sem decisão explícita.

## 3. Segurança

### Auditoria estrutural — 28/09/2026
- Etapa 1 concluída: schema, RLS, policies, funções e Edge Functions levantados.
- Seis tabelas públicas auditadas com RLS habilitado.
- Foram identificadas 16 ocorrências de policies permissivas sobrepostas pelo Security/Performance Advisor.
- O modelo usa is_admin, can_access_esf e can_access_patient como funções centrais de autorização.

### Matriz de autorização — 28/09/2026
- Etapa 2 concluída.
- Contrato validado:
  - doutor enxerga somente pacientes atribuídos a ele;
  - gestor e doutor não excluem pacientes;
  - gestor pode reatribuir paciente para outro doutor da própria ESF.
- RLS ajustado para refletir essas três decisões.
- can_access_patient() agora trata gestor por vínculo de manager e doutor por patients.doctor_id.
- Reatribuição de paciente exige novo doutor ativo, com perfil doctor e vínculo doctor na mesma ESF.
- Exclusão de paciente permanece somente para admin.

### Pendente
- testes de isolamento por persona — próxima etapa;
- isolamento ESF → pacientes;
- isolamento doutor → pacientes;
- INSERT/UPDATE/DELETE por papel;
- acesso direto via API;
- grants e Edge Functions;
- recuperação segura de senha;
- rate limiting/CAPTCHA;
- E2E por persona;
- auditoria/governança/LGPD.

## 4. Funcionalidades em fila

1. Fechar auditoria RLS/isolamento por persona.
2. Recuperação segura de senha.
3. CRUD completo de pacientes.
4. Medicamentos reais e sincronizados.
5. Consultas reais.
6. Definir família/cuidador.
7. SOS real.
8. Experiência idoso consumindo Supabase.
9. Notificações.
10. WhatsApp, se permanecer no escopo.
11. Auditoria/governança/LGPD.

## 5. Critério de pronto

Feature crítica só é concluída quando houver implementação, validação técnica, backend/RLS quando aplicável, validação da persona, estados loading/erro/vazio, fluxo principal e regressão relacionada.

> Build verde sozinho não prova Auth, RLS, UX ou integração.

## 6. Próxima sequência

1. Testar isolamento RLS com sessões/personas.
2. Fechar CRUD de pacientes respeitando o novo contrato.
3. Definir e implementar fluxos reais de medicamentos e consultas.
4. Definir família/cuidador e SOS antes de integrar notificações/WhatsApp.
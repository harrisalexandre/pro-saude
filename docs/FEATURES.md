# Por Perto — Features

Memória funcional cumulativa do produto.

- `docs/ai/CURRENT_STATE.md` = estado atual, foco e fila.
- `docs/FEATURES.md` = catálogo funcional.
- `docs/DAILY_WORK.md` = diário operacional.
- Não registrar cada ajuste trivial de CSS/build.

## Status
- `✅` Implementado
- `🟡` Em refinamento/validação
- `⏳` Previsto
- `🚫` Desabilitado/fora do escopo atual

## Entrada e autenticação
- `✅` Landing pública.
- `✅` CTA para área autenticada.
- `✅` Login Supabase.
- `✅` Sessão persistente.
- `✅` Perfil após autenticação.
- `✅` Normalização de e-mail.
- `✅` Mensagem genérica de credenciais inválidas.
- `🟡` Lockout local como camada complementar.
- `⏳` Recuperação segura de senha.
- `⏳` Rate limiting/CAPTCHA.

## Administração
- `✅` Painel Admin.
- `✅` Listagem de ESFs, doutores e pacientes.
- `✅` Criação de ESF + acesso.
- `🟡` CRUD administrativo completo.

## ESF
- `✅` Área da ESF.
- `✅` ESF vinculada ao gestor.
- `✅` Listagem de doutores e pacientes.
- `✅` Criação de doutor na própria ESF.
- `✅` Criação de paciente.
- `🟡` CRUD completo.

## Doutor
- `✅` Área do doutor.
- `✅` Lista de pacientes vinculados.
- `⏳` Gestão operacional completa.

## Pacientes
- `✅` Modelo de dados.
- `🟡` Cadastro administrativo em evolução.
- `⏳` CRUD completo.
- `⏳` Experiência real da pessoa idosa.

## Medicamentos
- `✅` Modelo de dados.
- `⏳` CRUD.
- `⏳` Registro de tomada.
- `⏳` Lembretes sincronizados.
- `⏳` Histórico.

## Consultas
- `✅` Modelo de dados.
- `⏳` CRUD.
- `⏳` Confirmação.
- `⏳` Histórico.

## SOS
- `🟡` Conceito/UX definidos.
- `⏳` Contatos reais.
- `⏳` Alertas sincronizados.
- `⏳` Comunicação real.
- `⏳` Localização, se aprovada.

## Infraestrutura
- `✅` Supabase Auth.
- `✅` PostgreSQL.
- `✅` RLS nas tabelas públicas atuais.
- `✅` Edge Functions administrativas.
- `🟡` Auditoria de policies.
- `⏳` Push.
- `⏳` WhatsApp.
- `⏳` Governança/LGPD.
- `⏳` Offline/PWA robusto.

## Manutenção

1. Atualizar `CURRENT_STATE.md` quando o estado mudar.
2. Atualizar este catálogo quando uma funcionalidade relevante mudar de estado.
3. Registrar trabalho relevante em `DAILY_WORK.md`.
4. Registrar decisões duradouras em `DECISIONS.md`.
5. Não usar este arquivo como changelog de correções triviais.

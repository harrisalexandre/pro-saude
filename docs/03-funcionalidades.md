# Funcionalidades

## Landing

- proposta do Por Perto;
- experiências para idoso, família e profissional;
- módulos principais;
- acesso à central;
- navegação por âncoras;
- animações de entrada e movimento.

## Autenticação

A central usa Supabase Auth com e-mail e senha. Com sessão válida, o sistema consulta `profiles` pelo ID do usuário autenticado.

## Admin

- consulta ESFs, doutores e pacientes;
- cadastra ESF;
- utiliza `manage-staff-user` para criar o acesso da ESF.

## ESF

- identifica a ESF via `esf_members`;
- lista doutores da unidade;
- lista pacientes da unidade;
- cadastra doutor via `manage-staff-user`;
- cadastra paciente;
- vincula paciente a doutor.

## Doutor

- lista os próprios pacientes.

## Experiência local do idoso

A store suporta múltiplos idosos, medicamentos, múltiplos horários, frequências, confirmação de doses, consultas, contatos de emergência, SOS, estados de segurança, doses perdidas e histórico.

## Lembretes

A lógica identifica doses pendentes, compara horários, classifica atrasos e registra confirmações. Áudio e notificações dependem das permissões e limitações do navegador.

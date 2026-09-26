# Por Perto — Regras de Negócio

Somente regras confirmadas entram aqui.

## Experiência
1. A pessoa idosa recebe experiência mais simples que a central.
2. Família/cuidador configura e acompanha; pessoa idosa utiliza.
3. A ação principal deve ser evidente.
4. SOS deve ser fácil de encontrar.
5. Texto grande, contraste, foco e áreas de toque amplas são requisitos.

## Papéis
1. `admin` administra a rede.
2. `esf` representa a gestão de uma ESF.
3. `doctor` representa doutor vinculado a ESF.
4. ESF possui membros em `esf_members`.
5. `manager` é o vínculo responsável pela ESF.
6. `doctor` é o vínculo profissional.
7. Papel persistido/backend é fonte de autorização.

## ESF
1. Nome é obrigatório.
2. Código é único quando informado.
3. Apenas admin cadastra ESF.
4. Criar ESF + acesso resulta em Auth + profile + ESF + vínculo manager.
5. Falha parcial deve disparar tentativa de rollback.

## Doutor
1. Nome, e-mail e senha são obrigatórios no fluxo de acesso.
2. Profile usa role `doctor`.
3. Doutor deve estar vinculado a ESF.
4. Admin pode criar doutor.
5. Gestor ESF pode criar doutor somente para sua ESF.
6. Frontend não cria Auth administrativo diretamente.

## Paciente
1. Paciente pertence a uma ESF.
2. Pode possuir doutor responsável.
3. Possui dados cadastrais e contato.
4. Possui estado ativo/inativo.
5. Medicamentos e consultas pertencem ao paciente.
6. Dados devem obedecer ao escopo de acesso do backend.

## Medicamentos
1. Pertencem a paciente.
2. Podem conter nome, dose, forma, instruções e horários.
3. `schedules` é JSONB.
4. Sistema não altera dose/frequência por inferência.
5. Lembrete não é prescrição.

## Consultas
1. Pertencem a paciente.
2. Podem possuir doutor.
3. Possuem data/hora.
4. Podem possuir especialidade, local e observações.
5. Estados aceitos pelo schema: `scheduled`, `confirmed`, `completed`, `cancelled`.

## SOS
SOS é alerta/comunicação. Até existir backend real, não prometer chamada automática, localização real ou atendimento de emergência.

## Segurança
1. UI não é autorização.
2. RLS/backend é barreira definitiva.
3. Dados sensíveis não devem aparecer em logs desnecessários.
4. `service_role` nunca vai para o frontend.
5. Login não deve revelar se um e-mail existe.
6. Lockout local é complementar, não segurança definitiva.

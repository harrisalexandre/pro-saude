# Roadmap

## Fase 1 — Protótipo funcional

- [x] Landing page
- [x] Login
- [x] Separação por papéis
- [x] Cadastro de ESF
- [x] Cadastro de doutor
- [x] Cadastro de paciente
- [x] Associação paciente ↔ doutor
- [x] Experiência local de medicamentos
- [x] Consultas
- [x] SOS local
- [x] Histórico local

## Fase 2 — Backend conectado

- [ ] Consolidar schema Supabase
- [ ] Migrar medicamentos para banco
- [ ] Migrar consultas para banco
- [ ] Migrar contatos para banco
- [ ] Persistir eventos de tomada
- [ ] Persistir SOS
- [ ] Sincronizar dispositivos da família e do idoso

## Fase 3 — Operação real

- [ ] Recuperação de senha
- [ ] RLS revisada por papel
- [ ] Auditoria
- [ ] Backup e recuperação
- [ ] Gestão de usuários e vínculos
- [ ] Tratamento de erros e observabilidade
- [ ] Testes automatizados

## Fase 4 — Comunicação

- [ ] Push notifications
- [ ] WhatsApp
- [ ] Escalonamento de alertas
- [ ] Confirmação de recebimento do SOS
- [ ] Integrações externas necessárias

## Fase 5 — Produção

- [ ] PWA/offline robusto
- [ ] domínio próprio
- [ ] política de privacidade
- [ ] documentação operacional
- [ ] monitoramento
- [ ] plano de contingência
- [ ] revisão de segurança
- [ ] validação de acessibilidade

## Regra de evolução

Cada funcionalidade nova deve responder:

1. reduz a carga para a pessoa idosa?
2. ajuda a rede de cuidado a agir melhor?
3. continua segura quando os dados deixam o navegador local?

# Segurança e LGPD

## Contexto

O sistema pode tratar dados de identificação, contato, atendimento, medicamentos e profissionais/unidades.

## Requisitos prioritários

### Autenticação

- recuperação de senha;
- confirmação de e-mail quando aplicável;
- renovação de sessão;
- proteção contra abuso de autenticação.

### Autorização

Toda ação sensível deve ser autorizada por backend/RLS.

```text
Admin → rede inteira
ESF → somente sua unidade
Doutor → pacientes autorizados
Idoso → seus próprios dados
```

### Dados

- criptografia em trânsito;
- política de retenção;
- backups;
- rastreabilidade;
- minimização de dados;
- controles de exportação e exclusão quando aplicáveis.

### LGPD

Definir formalmente controlador/operadores, finalidades, bases legais, direitos dos titulares, retenção, incidentes e registro de operações antes do uso em produção.

## Pendências críticas

- revisar RLS;
- mapear dados pessoais e sensíveis;
- revisar Edge Functions;
- garantir ausência de credenciais privilegiadas no cliente;
- implementar auditoria;
- definir backup e recuperação;
- validar requisitos jurídicos e operacionais.

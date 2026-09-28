# Por Perto — Diário de Trabalho

## 28/09/2026

### Consolidação

Foi feita uma análise comparativa entre a branch `feat/landing-login` e a `main`.

### Incorporado

- hardening do login com mensagem genérica;
- normalização de e-mail;
- lockout local após tentativas consecutivas;
- preservação da navegação de retorno para a landing;
- documentação operacional para agentes;
- contexto, estado, regras, arquitetura e decisões;
- catálogo de features.

### Preservado da main

- documentação geral `docs/`;
- arquitetura e roadmap já consolidados;
- experiência atual da landing e painéis;
- estrutura React/Vite/Supabase existente.

### Decisão

A documentação de agente fica em `docs/ai/`, enquanto a documentação geral permanece em `docs/`. Assim evitamos misturar documentação operacional de desenvolvimento com documentação de produto.

### Próximos passos

- auditar RLS por persona e operação;
- validar isolamento com duas sessões;
- implementar recuperação segura de senha;
- fechar CRUD de pacientes;
- migrar medicamentos e consultas para fluxos reais;
- definir família/cuidador;
- definir SOS real;
- manter documentação sincronizada com mudanças estruturais.

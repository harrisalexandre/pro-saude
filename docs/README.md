# Documentação — Por Perto

Documentação funcional e técnica do projeto **Por Perto**, parte do ProSaúde.

| Documento | Conteúdo |
|---|---|
| [Visão do Produto](./01-visao-produto.md) | Problema, proposta, públicos e princípios |
| [Arquitetura](./02-arquitetura.md) | Frontend, fluxo, estado e integrações |
| [Funcionalidades](./03-funcionalidades.md) | Funcionalidades atuais e comportamento |
| [Dados e Supabase](./04-dados-e-supabase.md) | Entidades, relacionamentos e integração |
| [UX e Acessibilidade](./05-ux-acessibilidade.md) | Diretrizes para a experiência 65+ |
| [Segurança e LGPD](./06-seguranca-lgpd.md) | Requisitos e pendências para produção |
| [Roadmap](./07-roadmap.md) | Evolução do protótipo para produto |

## Estado atual

A aplicação combina landing page, autenticação e painéis administrativos em React/Vite. A experiência local do idoso ainda usa `localStorage`; os painéis administrativos usam Supabase para autenticação e dados da rede.

> A documentação acompanha o estado da branch `main` e deve evoluir junto com o código.

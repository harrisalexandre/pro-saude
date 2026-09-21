# Por Perto

**Por Perto** é uma aplicação web de cuidado familiar pensada para pessoas idosas, com duas experiências conectadas:

- **App do idoso:** simples, grande e direto.
- **Central da família:** completa, densa e feita para configurar e acompanhar.

A proposta deixou de ser uma tela de mock e passou a funcionar como um pequeno produto: navegação entre telas, estado persistente, CRUD, histórico, lembretes e fluxo de SOS.

## Acesso

- App do idoso: `index.html`
- Central da família: `painel.html`
- GitHub Pages: https://harrisalexandre.github.io/pro-saude/

## Experiência do idoso

### Início
Mostra somente o que importa naquele momento:

- saudação;
- status do dia;
- próximo remédio;
- botão gigante **TOMEI**;
- agenda do dia;
- próxima consulta;
- acesso rápido ao SOS;
- responsável familiar.

### Remédios
- linha do tempo dos horários;
- doses já registradas;
- doses pendentes;
- detalhes do medicamento;
- orientação;
- múltiplos horários;
- frequência diária, semanal, por intervalo ou quando necessário.

### Consultas
- lista de consultas;
- data e horário;
- profissional;
- especialidade;
- local;
- retorno;
- observações;
- confirmação de leitura.

### SOS Familiar
Fluxo visual:

```
PRECISO DE AJUDA
       ↓
Enviando pedido
       ↓
Avisando família
       ↓
Pedido registrado
       ↓
Ligações para contatos
```

Nesta versão o SOS é **simulado**. Não existe envio real de localização, SMS, WhatsApp ou chamada automática.

### Perfil
Tela somente de consulta, sem transformar o idoso em administrador do sistema.

## Central da família

A família tem uma experiência diferente do idoso, com navegação lateral no desktop e navegação horizontal no mobile.

### Visão geral
- status do dia;
- doses registradas;
- doses perdidas;
- contatos de emergência;
- próximos remédios;
- próxima consulta;
- responsável;
- ações rápidas.

### Idosos vinculados
O protótipo já suporta mais de um idoso:

- adicionar;
- editar;
- selecionar;
- remover;
- dados separados por idoso.

### Remédios
CRUD completo:

- nome;
- dose;
- formato;
- vários horários;
- frequência;
- dias da semana;
- intervalo em horas;
- horário inicial;
- observações;
- excluir.

### Consultas
CRUD completo:

- profissional;
- especialidade;
- local;
- data;
- hora;
- retorno;
- observações.

### Responsável
- nome;
- telefone;
- e-mail.

### Emergência
- vários contatos;
- relação;
- telefone;
- prioridade;
- remoção.

### Histórico
- remédios tomados;
- consultas confirmadas;
- SOS;
- doses perdidas.

### Configurações
- repetição do lembrete;
- tolerância para considerar uma dose perdida;
- restauração do estado de demonstração.

## Arquitetura atual

O projeto continua deliberadamente sem framework ou build step:

```
HTML
  ↓
CSS
  ↓
JavaScript vanilla
  ↓
PorPertoStore
  ↓
localStorage
```

Arquivos:

```
pro-saude/
├── index.html       # app do idoso
├── painel.html      # central da família
├── style.css        # design system
├── state.js         # estado, regras e persistência
├── app.js           # experiência do idoso
├── painel.js        # experiência da família
├── README.md
└── .gitignore
```

## Estado

O estado atual usa:

```
por-perto-state-v2
```

O `state.js` também migra automaticamente a estrutura anterior `por-perto-state-v1`.

O armazenamento é local ao navegador. Portanto, o protótipo **não sincroniza dois aparelhos reais**. Para isso será necessário um backend.

## Lembretes

O app verifica os horários periodicamente.

Quando chega a hora:

1. identifica uma dose pendente;
2. tenta emitir som via Web Audio API;
3. usa Notification API se a permissão estiver disponível;
4. exibe aviso visual;
5. repete conforme a configuração;
6. para quando a dose é marcada como tomada.

Navegadores podem restringir áudio e notificações automáticas.

## Acessibilidade

A interface foi desenhada mobile-first, com foco em:

- texto grande;
- contraste;
- foco visível;
- navegação por teclado;
- áreas de toque amplas;
- mensagens acompanhadas de texto;
- redução de movimento;
- poucas decisões na tela do idoso.

A referência de acessibilidade considera a orientação da W3C sobre alvos de toque e interfaces móveis.

## O que é protótipo e o que ainda precisa de backend

### Funciona localmente
- navegação;
- CRUD;
- persistência;
- múltiplos idosos;
- medicamentos;
- consultas;
- histórico;
- doses perdidas;
- lembretes;
- SOS simulado;
- contatos;
- painel familiar.

### Precisa de infraestrutura real
- conta/autenticação da família;
- banco PostgreSQL;
- sincronização entre aparelhos;
- push notification;
- WhatsApp;
- localização real no SOS;
- chamadas automáticas;
- permissões por usuário;
- auditoria;
- backup;
- LGPD e governança de dados;
- PWA/offline robusto.

## Próxima arquitetura recomendada

Quando o protótipo estiver aprovado visualmente:

```
                    ┌──────────────────┐
                    │ App do idoso     │
                    └────────┬─────────┘
                             │
                    HTTPS / API
                             │
┌──────────────────┐   ┌─────▼─────┐   ┌──────────────────┐
│ Central família  │──►│ Backend   │◄──│ Notificações     │
└──────────────────┘   └─────┬─────┘   │ Push / WhatsApp │
                             │           └──────────────────┘
                       ┌─────▼─────┐
                       │ PostgreSQL│
                       └───────────┘
```

O `PorPertoStore` foi mantido isolado justamente para facilitar a troca de LocalStorage por uma API posteriormente.

## Princípios de UX

1. **A família configura; o idoso utiliza.**
2. **O idoso não deve precisar entender o sistema.**
3. **A ação mais importante da tela deve ser evidente.**
4. **Tamanho e clareza vêm antes de quantidade de informação.**
5. **SOS sempre deve ser fácil de encontrar.**
6. **Verde, amarelo e vermelho representam estados de segurança, não decoração.**
7. **O painel pode ser complexo; o app do idoso não.**

## Executar localmente

Não há instalação de dependências.

```bash
python3 -m http.server 8080
```

Abra:

```
http://localhost:8080/
http://localhost:8080/painel.html
```

Também funciona como site estático no GitHub Pages.

## Reset da demonstração

No painel existe o botão **Restaurar demonstração**.

Ou pelo console:

```javascript
localStorage.removeItem("por-perto-state-v2");
localStorage.removeItem("por-perto-state-v1");
location.reload();
```

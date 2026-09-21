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

```text
React
  ↓
Componentes / estado
  ↓
PorPerto Store
  ↓
localStorage
  ↓
Vite → dist → GitHub Pages
```

Arquivos:

```
pro-saude/
├── index.html / painel.html       # entradas Vite
├── src/App.jsx                    # experiências React
├── src/store.js                   # estado e persistência
├── src/main.jsx                   # bootstrap React
├── src/styles.css                 # ponte para o design system
├── style.css                      # design system
├── vite.config.js                 # configuração Vite
├── package.json                   # dependências
└── .github/workflows/deploy.yml  # deploy GitHub Pages
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

```bash
npm install
npm run dev
```

Para produção:

```bash
npm run build
npm run preview
```

O deploy para GitHub Pages é feito automaticamente pelo workflow do repositório.

## Reset da demonstração

No painel existe o botão **Restaurar demonstração**.

Ou pelo console:

```javascript
localStorage.removeItem("por-perto-state-v2");
localStorage.removeItem("por-perto-state-v1");
location.reload();
```

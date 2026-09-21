# Por Perto

Solução web mobile-first de cuidado para pessoas idosas, com uma experiência extremamente simples para o idoso e um painel de configuração para familiares e cuidadores.

> **Regra de ouro:** se uma pessoa de 65+ precisar perguntar como usar uma função, a UX falhou.

## Objetivo

O **Por Perto** reúne três módulos:

- **Remédio na Hora** — lembra o horário dos medicamentos e permite confirmar com um toque.
- **Consulta Fácil** — mostra consultas, médico, local, horário e retorno.
- **SOS Familiar** — permite pedir ajuda sem formulário ou navegação complexa.

O projeto possui duas experiências:

### Idoso

Interface extremamente simples:

- máximo de poucos blocos de ação;
- textos grandes;
- botões grandes;
- alto contraste;
- sem cadastro;
- sem configuração;
- sem senha complexa;
- ícones acompanhados de texto;
- botão de SOS sempre acessível.

### Familiar / cuidador

Painel para configurar e acompanhar:

- idosos vinculados;
- medicamentos;
- múltiplos horários por dia;
- frequência;
- consultas;
- data de retorno;
- responsável principal;
- contatos de emergência;
- acompanhamento diário;
- histórico geral;
- histórico de doses perdidas.

## Tecnologia

Projeto propositalmente simples:

- HTML5
- CSS3
- JavaScript vanilla
- LocalStorage
- Web Audio API
- Notification API

Não utiliza:

- frameworks;
- bundlers;
- npm;
- backend;
- banco de dados;
- API externa.

## Estrutura

```text
pro-saude/
├── index.html       # Experiência do idoso
├── painel.html      # Painel familiar/cuidador
├── style.css        # Design system e responsividade
├── state.js         # Estado mockado + localStorage
├── app.js           # Experiência do idoso
├── painel.js        # Experiência do familiar
├── .gitignore
└── README.md
```

## Como executar

Como não existe build step, basta servir a pasta com qualquer servidor HTTP estático.

Exemplo com Python:

```bash
python3 -m http.server 8080
```

Depois:

```text
http://localhost:8080/
```

Painel:

```text
http://localhost:8080/painel.html
```

Também pode ser hospedado diretamente em serviços de páginas estáticas.

## Estado compartilhado

O estado é armazenado em:

```text
localStorage
└── por-perto-state-v1
```

Isso permite simular o backend durante o desenvolvimento.

As duas interfaces usam o mesmo estado:

```text
index.html
    ↓
 app.js
    ↓
 state.js
    ↓
localStorage
    ↑
 state.js
    ↑
painel.js
    ↑
painel.html
```

Alterações feitas no painel podem ser refletidas na experiência do idoso através do evento `storage`.

## Lembrete de medicamentos

O aplicativo verifica periodicamente os horários cadastrados.

Fluxo:

```text
Relógio do dispositivo
        ↓
Horário cadastrado
        ↓
Remédio ainda pendente?
        ↓
      SIM
        ↓
Som de alerta
        ↓
Notification API
        ↓
Home do idoso
```

O som é criado diretamente com a **Web Audio API**, sem arquivo de áudio externo.

### Observação importante

Navegadores podem restringir reprodução automática de áudio e notificações até que o usuário tenha interagido com a página.

Por isso o sistema solicita permissão para notificações após uma interação.

## Doses perdidas

O painel considera uma dose perdida quando:

```text
horário atual >= horário programado + tolerância
```

A tolerância padrão é:

```text
20 minutos
```

O valor pode ser alterado posteriormente quando o backend real for implementado.

## SOS

O fluxo simulado é:

```text
PRECISO DE AJUDA
       ↓
Enviando localização...
       ↓
Avisando família...
       ↓
Pronto!
       ↓
Ligações diretas
```

Atualmente o SOS é apenas simulado e registrado no estado local.

Nenhuma localização real é enviada.

## Acessibilidade

O design foi pensado para pessoas com menor familiaridade tecnológica e possíveis limitações visuais ou motoras.

Principais decisões:

- corpo mínimo de aproximadamente 18px;
- títulos maiores;
- botões principais com aproximadamente 66px de altura;
- áreas de toque superiores a 48px;
- contraste elevado;
- foco visível por teclado;
- linguagem direta;
- poucos elementos por tela;
- sem dependência exclusiva de ícones;
- suporte a `prefers-reduced-motion`;
- layout mobile-first;
- mensagens de confirmação explícitas;
- cores de segurança reservadas para estados verde/amarelo/vermelho.

## Estados de segurança

As cores têm significado específico:

| Estado | Significado |
|---|---|
| Verde | Tudo certo |
| Amarelo | Existe pendência |
| Vermelho | SOS acionado |

Evita-se utilizar essas cores para elementos decorativos ou ações comuns.

## Dados de demonstração

O projeto inicia com dados mockados para facilitar os testes:

- Dona Maria;
- medicamentos de exemplo;
- consulta de cardiologia;
- responsável familiar;
- contatos de emergência.

Os dados são criados automaticamente no primeiro acesso.

Para resetar completamente a demonstração, execute no console do navegador:

```javascript
localStorage.removeItem("por-perto-state-v1");
location.reload();
```

## Roadmap

### MVP atual

- [x] Home do idoso
- [x] Detalhe do medicamento
- [x] Confirmação "TOMEI"
- [x] Detalhe da consulta
- [x] Confirmação "ENTENDI"
- [x] SOS simulado
- [x] Alerta sonoro
- [x] Notification API
- [x] Múltiplos horários
- [x] Doses perdidas
- [x] Responsável principal
- [x] Contatos de emergência
- [x] Histórico
- [x] Painel familiar
- [x] Sincronização local

### Próximas etapas

- [ ] Backend real
- [ ] Autenticação do familiar
- [ ] Banco de dados
- [ ] Sincronização em tempo real
- [ ] WhatsApp para notificações
- [ ] Push notifications
- [ ] Localização real no SOS
- [ ] Ligação automática para contatos configurados
- [ ] PWA / instalação no celular
- [ ] Funcionamento offline robusto
- [ ] Múltiplos idosos por conta familiar
- [ ] Controle de permissões
- [ ] Auditoria de eventos

## Princípios do projeto

1. **O idoso não configura.**
2. **O idoso não precisa aprender o sistema.**
3. **Uma ação importante deve exigir um toque.**
4. **Informação essencial sempre vem acompanhada de texto claro.**
5. **A família configura; o idoso utiliza.**
6. **Segurança não deve depender de memória ou conhecimento tecnológico.**
7. **O sistema deve ser simples antes de ser sofisticado.**

## Licença

Projeto privado em desenvolvimento por **Harris Alexandre**.

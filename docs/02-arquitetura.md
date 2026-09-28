# Arquitetura

## Visão geral

```text
Landing
  ↓
Entry.jsx
  ↓
React + Vite
  ├── Landing
  └── App / Painéis
         ↓
   Supabase Auth/Data

Experiência local do idoso:
React → store.js → localStorage
```

## Stack

- React
- Vite
- JavaScript/JSX
- Supabase JS
- Motion
- Lucide React
- CSS próprio

## Entradas

- `index.html` — entrada principal.
- `painel.html` — entrada da área de painel.

`Entry.jsx` decide a visualização pelo caminho e pelo hash.

## Organização

```text
src/
├── App.jsx
├── Entry.jsx
├── Landing.jsx
├── landing.css
├── main.jsx
├── store.js
├── styles.css
└── supabase.js
```

## Papéis

`App.jsx` direciona a interface autenticada conforme `profiles.role`:

- `admin`
- `esf`
- `doctor`

## Persistência local

`store.js` usa a chave:

```text
por-perto-state-v2
```

A experiência local contém dados de demonstração, registros diários, configurações e histórico. Essa persistência não sincroniza dispositivos reais.

## Evolução arquitetural

A recomendação é substituir gradualmente o armazenamento local por serviços persistentes, mantendo a camada de estado isolada do restante da interface.

# AGENTS.md

Este arquivo define as convenções do projeto para agentes de IA (Antigravity, Copilot, Cursor, etc.).
Leia este arquivo antes de qualquer alteração de código.

## Stack

- React 18 + TypeScript (Vite)
- React Router v6 (rotas declarativas)
- Mantine UI + `@mantine/form` + `@mantine/hooks`
- Axios (centralizado em `src/services/api.ts`)
- Zod (`zodResolver` para formulários Mantine)
- Vitest + React Testing Library
- Playwright
- Context API para estado global (sem Redux/Zustand)

## Estrutura de pastas

src/
├── app/ # bootstrap: App.tsx, router.tsx, providers.tsx, layouts/, styles/
├── pages/ # uma pasta por tela/rota
├── components/ # componentes visuais genéricos e reutilizáveis
├── contexts/ # Context API (auth, tema, etc.)
├── services/ # Axios + chamadas de API
├── hooks/ # hooks React genéricos
├── utils/ # funções puras (sem React)
├── types/ # tipos TypeScript globais
└── schemas/ # schemas Zod + tipos inferidos

## Regras de arquitetura (obrigatórias)

1. **`app/` é o topo.** Ninguém importa de `app/`. Ele só importa dos demais.
2. **Nenhuma página importa de outra página.** `pages/Posts/` nunca importa de `pages/Home/`.
3. **Componentes em `components/` são genéricos.** Não podem conter lógica ou tipos de negócio (post, comentário, usuário). Se precisar, o componente pertence à página que o usa.
4. **Todo Axios vive em `services/api.ts`.** Os demais arquivos de `services/` apenas chamam `api.get/post/...`. Nenhum componente ou hook chama `axios` diretamente.
5. **Contextos expõem um hook dedicado** (ex.: `useAuth`) que valida se está sendo usado dentro do Provider e lança erro caso não esteja.
6. **Schemas Zod e tipos inferidos ficam em `schemas/`.** Exporte sempre o schema (`PostSchema`) e o tipo (`type Post = z.infer<typeof PostSchema>`).
7. **`utils/` é composto apenas de funções puras.** Nada de React, hooks ou imports de `components/`.
8. **`services/` não importa de `pages/`, `components/` ou `contexts/`.** Só pode importar de `types/` e `schemas/`.
9. **Sem `any`.** Tipar tudo. Se um tipo externo for desconhecido, usar `unknown` e validar com Zod.
10. **Sem imports relativos com `../..` profundos.** Usar o alias `@/` (configurado no `vite.config.ts` e `tsconfig.json`).

## Regra rápida: onde colocar um arquivo?

Pergunte nesta ordem:

1. É bootstrap, layout ou provider global? → `app/`
2. É uma tela (rota)? → `pages/<NomeDaTela>/`
3. É um componente visual reutilizável e sem negócio? → `components/`
4. É um contexto global? → `contexts/`
5. É chamada de API? → `services/`
6. É um hook React genérico? → `hooks/`
7. É uma função pura sem React? → `utils/`
8. É um tipo global? → `types/`
9. É um schema Zod de domínio? → `schemas/`

Se ainda estiver em dúvida, coloque na pasta da página onde é usado. Depois, se outro lugar precisar, sobe para `components/` ou `hooks/`.

## Padrões de código

- **Componentes:** funcionais, com `children` quando fizer sentido, props tipadas explicitamente.
- **Imutabilidade:** sempre usar spread (`...`) para atualizar objetos e arrays em `useState`.
- **`useEffect`:** array de dependências sempre explícito. Cleanup obrigatório quando houver timer, listener ou subscription.
- **Formulários:** sempre `@mantine/form` + `zodResolver` + schema em `schemas/`.
- **Loading/erro:** tratar explicitamente os três estados (loading, sucesso, erro) em toda chamada de API.
- **Nomes de arquivos:**
  - Componentes de página: `<Nome>Page.tsx`
  - Componentes genéricos: `PascalCase.tsx`
  - Hooks: `useAlgo.ts`
  - Schemas: `algoSchema.ts`
  - Serviços: `algoService.ts`

## Proibições explícitas

- Não criar pastas `entities/`, `features/`, `widgets/` ou `shared/`. Esta arquitetura **não** usa FSD.
- Não adicionar Redux, Zustand, Jotai ou MobX. Usar apenas Context API.
- Não criar arquivos `index.ts` com re-exports a menos que estritamente necessário.
- Não usar `default export` para hooks, utils ou schemas. Apenas para componentes de página.
- Não instalar dependências sem confirmar antes.

## Scripts disponíveis

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run test` — Vitest (unit + components)
- `npm run test:e2e` — Playwright
- `npm run lint` — ESLint

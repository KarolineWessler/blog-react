---
trigger: always_on
---

---

description: Convenções de arquitetura e estrutura de pastas do projeto
alwaysApply: true

---

# Regras de arquitetura

## Estrutura de pastas

src/
├── app/ # bootstrap, router, providers, layouts, estilos globais
├── pages/ # uma pasta por tela/rota
├── components/ # componentes visuais genéricos, sem negócio
├── contexts/ # Context API (auth, tema, etc.)
├── services/ # Axios + chamadas de API
├── hooks/ # hooks React genéricos
├── utils/ # funções puras (sem React)
├── types/ # tipos TypeScript globais e genéricos
└── schemas/ # Zod schemas + tipos inferidos

Pastas são criadas **conforme a necessidade**. Não criar pasta vazia.

## Regras invioláveis

1. Nenhuma página importa de outra página. `pages/Posts/` nunca importa de `pages/Home/`.
2. Nenhum componente em `components/` contém lógica ou tipos de negócio (post, comentário, usuário). Se precisar, o componente pertence à página que o usa.
3. Todo Axios vive em `services/api.ts`. Nunca importar `axios` fora dele.
4. Contextos expõem um hook dedicado (ex.: `useAuth`) que valida se está sendo usado dentro do Provider e lança erro caso não esteja.
5. Schemas Zod e seus tipos inferidos ficam em `schemas/`. Exportar sempre o schema (`PostSchema`) e o tipo inferido (`type Post = z.infer<typeof PostSchema>`).
6. `utils/` só tem funções puras. Sem React, sem hooks.
7. `services/` não importa de `pages/`, `components/` ou `contexts/`. Só pode importar de `types/` e `schemas/`.
8. Sem `any`. Tipar tudo. Se um tipo externo for desconhecido, usar `unknown` e validar com Zod.
9. Usar alias `@/` para imports. Nunca `../../` profundo.
10. Toda chamada de API trata explicitamente os três estados: `loading`, `success`, `error`.

## Proibições explícitas

- Não criar pastas `entities/`, `features/`, `widgets/` ou `shared/`. Esta arquitetura **não** usa FSD.
- Não adicionar Redux, Zustand, Jotai ou MobX. Usar apenas Context API.
- Não criar arquivos `index.ts` com re-exports a menos que estritamente necessário.
- Não usar `default export` em lugar nenhum. Sempre `export function` / `export const`. Para páginas, o import é nomeado: `import { HomePage } from '@/pages/Home/HomePage'`.
- Não instalar dependências sem confirmar antes.

## Onde colocar cada arquivo

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

## Padrões de nomenclatura

- Página: `<Nome>Page.tsx` (ex.: `HomePage.tsx`)
- Componente genérico: `PascalCase.tsx` (ex.: `Header.tsx`)
- Hook: `useAlgo.ts` (ex.: `useDebounce.ts`)
- Schema: `algoSchema.ts` (ex.: `postSchema.ts`)
- Serviço: `algoService.ts` (ex.: `postService.ts`)
- Tipo puro: `algo.ts` (ex.: `pagination.ts`)
- Componentes: `export function Header() {}` (função nomeada, nunca arrow)
- Props: `interface XxxProps`
- `children`: `React.ReactNode`

## Como resolver violações

Se dois lugares precisam da mesma coisa, **suba o nível**:

| Situação                                      | Onde colocar                     |
| --------------------------------------------- | -------------------------------- |
| Duas páginas usam o mesmo componente genérico | `components/`                    |
| Duas páginas usam a mesma lógica de negócio   | página → `hooks/` ou `contexts/` |
| Duas páginas usam a mesma chamada de API      | `services/`                      |
| Duas páginas usam o mesmo tipo                | `types/`                         |
| Duas páginas usam o mesmo schema              | `schemas/`                       |
| Duas páginas usam o mesmo hook genérico       | `hooks/`                         |
| Duas páginas usam a mesma função pura         | `utils/`                         |

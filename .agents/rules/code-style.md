---
trigger: always_on
---

---

description: Convenções de estilo de código
alwaysApply: true

---

# Estilo de código

- Sem `any`. Sem `as` desnecessário. Se o tipo é desconhecido, use `unknown` + Zod.
- Sem `default export` exceto em componentes de página (`pages/**/*Page.tsx`).
- Componentes: função nomeada (`export function Button() {}`), não arrow.
- Props sempre tipadas com `interface XxxProps`.
- `children` tipado como `React.ReactNode`.
- Imutabilidade: sempre spread em `setState` para objetos e arrays.
- Preferir `const` a `let`. Nunca `var`.
- Sem `console.log` em código commitado.
- Imports ordenados: externos → alias `@/` → relativos.
- Sem imports relativos profundos (`../../..`). Use `@/`.
- Nomes: componentes em `PascalCase`, hooks `useAlgo`, constantes `UPPER_SNAKE`, variáveis `camelCase`.
- Funções com mais de 40 linhas devem ser extraídas.
- Sem `useEffect` para lógica que pode ser derivada em render (`useMemo`/`useCallback` ou cálculo direto).

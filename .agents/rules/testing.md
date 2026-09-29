---
trigger: always_on
---

---

description: Padrões para testes com Vitest, RTL e Playwright
alwaysApply: true

---

# Testes

## Vitest + RTL

- Testes unitários e de componente ficam em `tests/unit/` e `tests/components/` (ou ao lado do arquivo, se preferir consistência — escolher uma e manter).
- Nomes: `*.test.ts` ou `*.test.tsx`.
- Consultas acessíveis primeiro: `getByRole`, `getByLabelText`, `getByText`.
- Nunca usar `getByTestId` como primeira opção.
- Interações com `@testing-library/user-event`, não `fireEvent`.
- Componentes que usam contexto são envoltos em wrappers de teste (`renderWithProviders`).
- Nunca testar detalhes de implementação (estado interno, nomes de funções).
- Testar comportamento visível ao usuário.

## Playwright

- Testes E2E ficam em `tests/e2e/`.
- Localizadores semânticos: `page.getByRole`, `page.getByLabel`, `page.getByText`.
- Nunca usar seletores CSS frágeis (`div > span:nth-child(2)`).
- Cada teste é independente; sem dependência de ordem.
- Modo headless por padrão.
- Pelo menos 2 fluxos completos cobertos: autenticação e navegação/busca.

---
trigger: always_on
---

---

description: Convenções de Git, commits e CI/CD
alwaysApply: true

---

# Git e CI

- Commits em português, no imperativo: "adiciona formulário de login", "corrige filtro de tags".
- Nunca commitar direto na `main`. Sempre via Pull Request.
- PRs pequenos e focados em uma mudança.
- Toda PR precisa passar no CI antes do merge.
- Nunca commitar `.env`, tokens ou senhas. Usar variáveis de ambiente.
- Workflows em `.github/workflows/`:
  - `ci.yml`: roda Vitest e Playwright em todo push e PR.
  - `deploy.yml`: build + deploy no GitHub Pages na branch `main`.
- `vite.config.ts` com `base` configurado para o repositório no GitHub Pages.
- Arquivo `public/404.html` para fallback de SPA.

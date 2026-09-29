---
trigger: always_on
---

### `.agent/rules/forms.md`

```markdown
---
description: Padrões para formulários com Mantine
alwaysApply: true
---

# Formulários

- Sempre usar `@mantine/form` + `zodResolver`.
- O schema Zod fica em `src/schemas/` e é reutilizado no formulário.
- Validação de cliente via Zod. Validação de servidor via `safeParse` na resposta.
- Campos com `label`, `placeholder` e mensagem de erro visível.
- Botão de submit desabilitado durante `loading`.
- Erros de API exibidos no formulário, não só no console.
- Formulário de login, criação de post e edição de post compartilham o mesmo padrão.
```

---
trigger: always_on
---

---

description: Regras de segurança
alwaysApply: true

---

# Segurança

- Token JWT armazenado em `localStorage` **apenas** por `AuthContext`.
- Nenhum outro módulo lê ou escreve o token diretamente.
- Interceptor de requisição é o único lugar que injeta o `Authorization`.
- Nunca logar o token no console.
- Nunca expor dados do usuário em URLs ou query strings.
- Rotas administrativas sempre protegidas por `ProtectedRoute`.
- Logout limpa o token e redireciona para `/login`.
- Validar toda resposta da API com Zod antes de usar.

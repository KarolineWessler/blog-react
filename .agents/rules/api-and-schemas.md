---
trigger: always_on
---

---

description: Padrões para chamadas de API, Axios e Zod
alwaysApply: true

---

# API e Schemas

- Axios configurado **apenas** em `src/services/api.ts`.
- Nenhum componente ou hook importa `axios` diretamente.
- `baseURL: 'https://dummyjson.com'`.
- Interceptor de requisição injeta `Authorization: Bearer <token>` a partir de `localStorage`.
- Interceptor de resposta trata erros de rede e expõe mensagens amigáveis.
- Toda resposta de API é validada com Zod (`.safeParse()`) antes de ser usada.
- Todo schema Zod exporta também o tipo inferido:
  ```ts
  export const PostSchema = z.object({...});
  export type Post = z.infer<typeof PostSchema>;
  ```

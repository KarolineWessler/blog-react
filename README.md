# DevBlog

Blog estilo Substack simplificado, desenvolvido com React e consumindo a API REST do DummyJSON para autenticação, leitura e gerenciamento de publicações.

**Deploy:** [https://karolinewessler.github.io/blog-react/](https://karolinewessler.github.io/blog-react/)

## Stack

- React 19
- TypeScript
- Vite
- Mantine UI
- React Router
- Zod
- Axios
- Vitest
- React Testing Library
- Playwright
- GitHub Actions

## Como rodar localmente

```bash
npm install
npm run dev
```

O projeto será iniciado em `http://localhost:5173`.

### Scripts disponíveis

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Executa o typecheck e gera o build de produção |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Executa o ESLint |
| `npm run test` | Inicia o Vitest em modo watch |
| `npm run test:run` | Executa os testes unitários e de componentes |
| `npm run test:e2e` | Executa os testes ponta a ponta com Playwright |

## Arquitetura

O projeto segue uma organização por responsabilidade, com alias `@/` para imports internos e sem dependências profundas entre módulos.

- `src/app/`: bootstrap da aplicação, roteamento, providers, layouts e tema global.
- `src/pages/`: telas associadas às rotas, organizadas por domínio da interface.
- `src/components/`: componentes visuais reutilizáveis, sem lógica de negócio específica.
- `src/contexts/`: contextos globais, como autenticação.
- `src/services/`: cliente Axios e funções de comunicação com a API.
- `src/hooks/`: hooks React reutilizáveis e lógica compartilhada.
- `src/utils/`: funções puras sem dependência de React.
- `src/types/`: tipos TypeScript compartilhados.
- `src/schemas/`: schemas Zod e tipos inferidos dos dados da aplicação.

As regras principais são: evitar `any`, manter os componentes tipados, concentrar o uso de Axios em `services/`, validar dados externos com Zod e expor hooks dedicados para os contextos.

## Testes

- **Unitários e de componente:** `npm run test:run` — Vitest + React Testing Library, com 11 testes.
- **E2E:** `npm run test:e2e` — Playwright, com 3 fluxos completos. Na primeira execução, instalar o navegador com `npx playwright install chromium`.

## Checklist de requisitos

### 1. Estrutura de componentes e tipagem com TypeScript

A aplicação usa Vite, React e TypeScript, com componentes funcionais desacoplados, props tipadas e composição por `children`.

- Componentes organizados em `src/components/` e `src/pages/`.
- Interfaces explícitas para props dos componentes.
- Tipos de domínio derivados dos schemas Zod.
- Mantine UI utilizado para os elementos visuais.
- Não há uso de `any` no código da aplicação.

### 2. Estado reativo, imutabilidade e ciclo de vida

O estado é controlado com hooks React e atualizado de forma imutável, com efeitos que possuem dependências explícitas e limpeza adequada.

- `useState` para estados de autenticação, posts, loading e erros.
- Atualizações de arrays e objetos usando cópias e métodos imutáveis.
- `useEffect` com arrays de dependências definidos.
- Efeitos assíncronos usam `isMounted` para evitar atualização após unmount.
- Listeners, observers e recursos do ambiente de teste possuem mocks e cleanup apropriados.

### 3. Estado global com Context API e Custom Hooks

O estado global usa Context API, sem Redux, Zustand ou bibliotecas equivalentes.

- `src/contexts/AuthContext.tsx` concentra autenticação e sessão.
- `useAuth()` valida se foi usado dentro de `AuthProvider`.
- `src/pages/Admin/AdminPostsContext.tsx` concentra a listagem de posts do administrador.
- `useAdminPosts()` valida se foi usado dentro de `AdminPostsProvider`.
- Os contextos expõem valores tipados, incluindo estado, loading, erros e operações.

### 4. Roteamento e layouts com React Router

As rotas são declarativas e organizadas em um layout público com conteúdo aninhado.

- `src/app/router.tsx` define as rotas da aplicação.
- `PublicLayout` usa `<Outlet />` e mantém o Header persistente.
- O Header usa `<NavLink>` para indicar a rota ativa.
- `useNavigate()` é usado para navegação programática, como após o login.
- `useParams()` é usado em `/posts/:id` e `/admin/posts/:id/edit`.

### 5. Interface gráfica e formulários com Mantine UI

A interface usa Mantine UI com tema customizado, formulários tipados e estados visuais explícitos.

- `src/app/theme.ts` define o tema global.
- `<MantineProvider>` envolve a aplicação.
- Formulários usam `@mantine/form` e `schemaResolver`.
- `AdminPostsPage` possui paginação client-side.
- `Loader`, `Alert` e mensagens de erro representam loading, erro e sucesso.

### 6. Fluxo de autenticação JWT e rotas protegidas

O fluxo de autenticação usa o endpoint de login do DummyJSON e mantém a sessão no navegador.

- Login realizado via `POST /auth/login`.
- Token persistido em `localStorage`.
- `AuthContext` sincroniza usuário, token, loading e logout.
- `ProtectedRoute` bloqueia o acesso às rotas `/admin/*`.
- Usuários não autenticados são redirecionados para `/login`.

### 7. Consumo de API REST, interceptors e validação com Zod

A comunicação com a API é centralizada em Axios, com interceptors para autenticação e normalização de erros.

- `src/services/api.ts` configura o Axios com `baseURL: 'https://dummyjson.com'`.
- O interceptor de request injeta `Authorization: Bearer <token>`.
- O interceptor de response normaliza falhas em `ApiError`.
- Schemas Zod ficam em `src/schemas/`.
- Os tipos são derivados com `z.infer`.
- Respostas externas são validadas com `.safeParse()` antes de serem usadas.

> O professor mencionou `zodResolver`, mas o projeto usa Mantine 9, que unificou essa integração sob `schemaResolver`. Essa é a forma atual recomendada pela versão utilizada.

### 8. Testes automatizados com Vitest e RTL

Vitest e React Testing Library cobrem schemas e componentes importantes da aplicação.

- Teste unitário do `PostSchema`.
- Testes de `ProtectedRoute`, `PostCard` e `LoginPage`.
- Consultas acessíveis com `getByRole`, `getByLabelText` e `getByText`.
- `user-event` simula preenchimento e submissão de formulários.
- `customRender` envolve os componentes com `MantineProvider` e `MemoryRouter`.
- **Resultado atual: 11 testes passando.**

### 9. Testes ponta a ponta com Playwright

Playwright cobre os fluxos principais usando Chromium em modo headless e localizadores semânticos.

- Autenticação com redirecionamento de `/admin` para `/login`.
- Navegação da landing page para o detalhe de um post.
- Criação de uma publicação no painel administrativo.
- Testes independentes, com login próprio quando necessário.
- `webServer` inicia o Vite automaticamente durante a execução.
- **Resultado atual: 3 testes passando.**

### 10. Pipeline de CI/CD e deploy em produção

GitHub Actions executa as verificações de qualidade e publica o build no GitHub Pages.

- `.github/workflows/ci.yml` executa lint, typecheck, Vitest, Playwright e build em push e pull request para `main`.
- `.github/workflows/deploy.yml` executa build e deploy no GitHub Pages após push na `main`.
- `vite.config.ts` usa `base: '/blog-react/'` durante o build em CI.
- `public/404.html` e o script em `index.html` implementam o fallback para rotas da SPA.
- O `BrowserRouter` usa `import.meta.env.BASE_URL` como `basename`.
- A branch protection foi configurada via Ruleset com status checks obrigatórios.

## Decisões técnicas e limitações

### DummyJSON não persiste o CRUD

A API DummyJSON retorna respostas plausíveis para `POST`, `PUT` e `DELETE`, mas não altera permanentemente os dados no servidor.

Os posts criados ou editados durante a sessão são mantidos no `AdminPostsContext` e desaparecem após um refresh da página. Esse comportamento é uma limitação esperada da API utilizada, não um erro do frontend.

### `schemaResolver` em vez de `zodResolver`

O projeto usa Mantine 9. Nessa versão, a integração com schemas é feita por `schemaResolver`, que é a API unificada e idiomática da biblioteca.

### Paginação client-side no painel administrativo

A paginação de `AdminPostsPage` é feita no cliente porque o `AdminPostsContext` já mantém os posts carregados em memória. A solução evita novas requisições para cada página da listagem.

### Layout editorial

O tema do Mantine foi customizado para aproximar a interface de um blog editorial:

- Merriweather para títulos.
- Inter para textos e controles.
- Teal como cor principal.
- Cards, espaçamento e hierarquia visual voltados para leitura.

### Dependência da internet nos testes E2E

Os testes Playwright fazem chamadas reais à DummyJSON para autenticação, carregamento de posts e criação de publicação. Por isso, a execução dos testes E2E depende de conectividade com a internet e da disponibilidade da API externa.

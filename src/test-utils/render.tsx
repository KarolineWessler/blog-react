import '@testing-library/jest-dom/vitest'
import { MantineProvider } from '@mantine/core'
import { render as testingLibraryRender } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { theme } from '@/app/theme'

export interface CustomRenderOptions {
  route?: string
  withRouter?: boolean
}

export function render(
  ui: ReactNode,
  { route = '/', withRouter = true }: CustomRenderOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    const content = withRouter ? (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    ) : (
      children
    )

    return <MantineProvider theme={theme}>{content}</MantineProvider>
  }

  return testingLibraryRender(ui, { wrapper: Wrapper })
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

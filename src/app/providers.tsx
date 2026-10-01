import type { ReactNode } from 'react'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css'

export interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MantineProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </MantineProvider>
  )
}

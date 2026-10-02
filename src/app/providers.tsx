import type { ReactNode } from 'react'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import '@mantine/core/styles.css'

export interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MantineProvider>
      <BrowserRouter>
        <AuthProvider>
          {children}
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  )
}

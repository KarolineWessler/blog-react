import { describe, expect, it, vi } from 'vitest'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import type { AuthContextValue } from '@/contexts/AuthContext'
import { render, screen } from '@/test-utils/render'

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

function mockAuth(isAuthenticated: boolean): AuthContextValue {
  return {
    user: isAuthenticated
      ? {
          id: 1,
          username: 'emilys',
          email: 'emily@example.com',
          firstName: 'Emily',
          lastName: 'Johnson',
          image: 'https://example.com/avatar.png',
          accessToken: 'token',
        }
      : null,
    isAuthenticated,
    isLoading: false,
    login: vi.fn(),
    logout: vi.fn(),
  }
}

describe('ProtectedRoute', () => {
  it('renderiza children quando autenticado', () => {
    vi.mocked(useAuth).mockReturnValue(mockAuth(true))

    render(
      <Routes>
        <Route
          path="/private"
          element={
            <ProtectedRoute>
              <div>Conteúdo protegido</div>
            </ProtectedRoute>
          }
        />
      </Routes>,
      { route: '/private' },
    )

    expect(screen.getByText('Conteúdo protegido')).toBeInTheDocument()
  })

  it('redireciona para /login quando não autenticado', () => {
    vi.mocked(useAuth).mockReturnValue(mockAuth(false))

    render(
      <Routes>
        <Route
          path="/private"
          element={
            <ProtectedRoute>
              <div>Conteúdo protegido</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Página de login</div>} />
      </Routes>,
      { route: '/private' },
    )

    expect(screen.queryByText('Conteúdo protegido')).not.toBeInTheDocument()
    expect(screen.getByText('Página de login')).toBeInTheDocument()
  })
})

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LoginPage } from './LoginPage'
import type { AuthContextValue } from '@/contexts/AuthContext'
import { useAuth } from '@/contexts/AuthContext'
import { render, screen, userEvent } from '@/test-utils/render'

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

const mockLogin = vi.fn<AuthContextValue['login']>()

function mockAuth(): AuthContextValue {
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: mockLogin,
    logout: vi.fn(),
  }
}

describe('LoginPage', () => {
  beforeEach(() => {
    mockLogin.mockReset()
    vi.mocked(useAuth).mockReturnValue(mockAuth())
  })

  it('renderiza os campos do formulário', () => {
    render(<LoginPage />)

    expect(screen.getByLabelText(/nome de usuário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /entrar/i }),
    ).toBeInTheDocument()
  })

  it('mostra erros de validação ao submeter vazio', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByText('Informe o nome de usuário')).toBeInTheDocument()
    expect(screen.getByText('Informe a senha')).toBeInTheDocument()
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('submete o formulário com os valores corretos', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.type(screen.getByLabelText(/nome de usuário/i), 'emilys')
    await user.type(screen.getByLabelText(/senha/i), 'emilyspass')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(mockLogin).toHaveBeenCalledWith({
      username: 'emilys',
      password: 'emilyspass',
    })
  })
})

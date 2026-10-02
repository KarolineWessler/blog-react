import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { login as authenticate } from '@/services/authService'
import {
  SessionDataSchema,
  type LoginFormData,
  type SessionData,
} from '@/schemas/authSchema'

export interface AuthContextValue {
  user: SessionData | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginFormData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function getInitialUser(): SessionData | null {
  const storedSession = localStorage.getItem('auth_session')
  if (!storedSession) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(storedSession)
    const result = SessionDataSchema.safeParse(parsed)
    if (result.success) {
      return result.data
    }
  } catch {
    // Falha ao parsear ou formato corrompido
  }

  localStorage.removeItem('auth_session')
  localStorage.removeItem('auth_token')
  return null
}

export interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SessionData | null>(getInitialUser)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isAuthenticated = user !== null

  const login = useCallback(async (credentials: LoginFormData): Promise<void> => {
    setIsLoading(true)
    try {
      const sessionData = await authenticate(credentials)
      localStorage.setItem('auth_session', JSON.stringify(sessionData))
      localStorage.setItem('auth_token', sessionData.accessToken)
      setUser(sessionData)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback((): void => {
    localStorage.removeItem('auth_session')
    localStorage.removeItem('auth_token')
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
    }),
    [user, isAuthenticated, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return context
}

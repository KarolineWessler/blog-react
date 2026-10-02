import { api, ApiError } from '@/services/api'
import {
  SessionDataSchema,
  type LoginFormData,
  type SessionData,
} from '@/schemas/authSchema'

export async function login(credentials: LoginFormData): Promise<SessionData> {
  const response = await api.post('/auth/login', credentials)
  const parseResult = SessionDataSchema.safeParse(response.data)

  if (!parseResult.success) {
    throw new ApiError(500, 'Resposta inválida do servidor ao autenticar.')
  }

  return parseResult.data
}

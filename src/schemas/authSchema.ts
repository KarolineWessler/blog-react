import { z } from 'zod'

export const LoginFormSchema = z.object({
  username: z.string().min(1, 'Informe o nome de usuário'),
  password: z.string().min(1, 'Informe a senha'),
})

export type LoginFormData = z.infer<typeof LoginFormSchema>

export const SessionDataSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  image: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export type SessionData = z.infer<typeof SessionDataSchema>

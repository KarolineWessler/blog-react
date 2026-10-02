import axios from 'axios'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// Instância centralizada com a baseURL da DummyJSON
export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de Requisição: Injeta o token JWT automaticamente nas chamadas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor de Resposta: Trata erros de rede e servidor de forma amigável
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? 500
    const message =
      error.response?.data?.message ||
      'Ocorreu uma falha na comunicação com o servidor. Tente novamente mais tarde.'

    throw new ApiError(status, message)
  },
)

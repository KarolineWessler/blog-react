import { useEffect, useState } from 'react'
import {
  Alert,
  Anchor,
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { LoginFormSchema, type LoginFormData } from '@/schemas/authSchema'
import { ApiError } from '@/services/api'

function getErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    return err.message
  }
  if (err instanceof Error) {
    return err.message
  }
  return 'Ocorreu um erro inesperado ao realizar o login.'
}

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, isAuthenticated } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const form = useForm<LoginFormData>({
    mode: 'controlled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: schemaResolver(LoginFormSchema),
    onValuesChange: () => {
      if (errorMessage) {
        setErrorMessage(null)
      }
    },
  })

  const handleSubmit = async (values: LoginFormData) => {
    setErrorMessage(null)
    try {
      await login(values)
    } catch (err) {
      setErrorMessage(getErrorMessage(err))
    }
  }

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--mantine-color-gray-0)',
      }}
      py="xl"
    >
      <Container size="xs" style={{ width: '100%' }}>
        <Paper withBorder shadow="md" p="xl" radius="md">
          <Title order={1} size="h2" ta="center" mb="lg">
            Entrar no DevBlog
          </Title>

          {errorMessage && (
            <Alert
              color="red"
              variant="light"
              mb="md"
              withCloseButton
              onClose={() => setErrorMessage(null)}
            >
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Nome de usuário"
                placeholder="Ex: emilys"
                key={form.key('username')}
                {...form.getInputProps('username')}
              />

              <PasswordInput
                label="Senha"
                placeholder="Sua senha"
                key={form.key('password')}
                {...form.getInputProps('password')}
              />

              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                disabled={isLoading}
                mt="sm"
              >
                Entrar
              </Button>
            </Stack>
          </form>

          <Box ta="center" mt="lg">
            <Anchor component={Link} to="/" size="sm" c="dimmed">
              Voltar para a home
            </Anchor>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

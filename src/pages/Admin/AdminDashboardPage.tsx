import { Container, Paper, Text, Title } from '@mantine/core'
import { useAuth } from '@/contexts/AuthContext'

export function AdminDashboardPage() {
  const { user } = useAuth()

  return (
    <Container size="lg" py="xl">
      <Paper withBorder shadow="sm" p="xl" radius="md">
        <Title order={1} mb="md">
          Painel do Autor
        </Title>
        <Text size="lg" fw={500} mb="xs">
          Olá, {user?.firstName}!
        </Text>
        <Text c="dimmed">
          As funcionalidades de gerenciamento de posts e perfil estarão disponíveis em breve.
        </Text>
      </Paper>
    </Container>
  )
}

import { Badge, Button, Card, Container, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function AdminDashboardPage() {
  const { user } = useAuth()

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Paper withBorder shadow="sm" p="xl" radius="md">
          <Title order={1} mb="xs">
            Painel do Autor
          </Title>
          <Text size="lg" fw={500} mb="xs">
            Olá, {user?.firstName}!
          </Text>
          <Text c="dimmed" size="sm">
            Bem-vindo ao seu ambiente de gerenciamento de publicações. Escolha uma das opções abaixo para gerenciar seu conteúdo.
          </Text>
        </Paper>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          <Card
            withBorder
            shadow="sm"
            radius="md"
            p="lg"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Stack gap="xs">
              <Group justify="space-between" align="center">
                <Title order={3} size="h4">
                  Meus posts
                </Title>
                <Badge variant="light" color="blue">
                  Publicações
                </Badge>
              </Group>
              <Text size="sm" c="dimmed">
                Visualize seus artigos cadastrados, acompanhe engajamento, edite ou exclua publicações.
              </Text>
            </Stack>

            <Button
              component={Link}
              to="/admin/posts"
              variant="light"
              fullWidth
              mt="lg"
            >
              Acessar publicações
            </Button>
          </Card>

          <Card
            withBorder
            shadow="sm"
            radius="md"
            p="lg"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Stack gap="xs">
              <Group justify="space-between" align="center">
                <Title order={3} size="h4">
                  Criar novo post
                </Title>
                <Badge variant="light" color="green">
                  Novo
                </Badge>
              </Group>
              <Text size="sm" c="dimmed">
                Redija um novo artigo com título, conteúdo formatado e tags personalizadas.
              </Text>
            </Stack>

            <Button
              component={Link}
              to="/admin/posts/new"
              variant="filled"
              fullWidth
              mt="lg"
            >
              Novo post
            </Button>
          </Card>

          <Card
            withBorder
            shadow="sm"
            radius="md"
            p="lg"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Stack gap="xs">
              <Group justify="space-between" align="center">
                <Title order={3} size="h4">
                  Ver perfil
                </Title>
                <Badge variant="light" color="indigo">
                  Autor
                </Badge>
              </Group>
              <Text size="sm" c="dimmed">
                Visualização e gerenciamento de informações pessoais e biografia de autor.
              </Text>
            </Stack>

            <Button
              component={Link}
              to="/admin/profile"
              variant="light"
              fullWidth
              mt="lg"
            >
              Acessar perfil
            </Button>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  )
}

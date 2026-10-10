import {
  Anchor,
  Avatar,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function ProfilePage() {
  const { user } = useAuth()

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Anchor component={Link} to="/admin" size="sm" c="dimmed">
            &larr; Voltar ao Painel
          </Anchor>
        </div>

        <Paper withBorder shadow="sm" p="xl" radius="md">
          <Group justify="space-between" align="center" wrap="wrap" gap="md">
            <Group gap="lg">
              <Avatar
                src={user?.image}
                alt={`${user?.firstName} ${user?.lastName}`}
                size={80}
                radius="xl"
                color="blue"
              >
                {user ? `${user.firstName[0]}${user.lastName[0]}` : 'U'}
              </Avatar>

              <Stack gap={4}>
                <Title order={1} size="h2">
                  {user?.firstName} {user?.lastName}
                </Title>
                <Text size="sm" c="dimmed">
                  @{user?.username} &bull; {user?.email}
                </Text>
              </Stack>
            </Group>

            <Group gap="sm">
              <Button component={Link} to="/admin/posts" variant="light">
                Ver minhas publicações
              </Button>
              <Button variant="default" disabled>
                Editar perfil
              </Button>
            </Group>
          </Group>
        </Paper>
      </Stack>
    </Container>
  )
}

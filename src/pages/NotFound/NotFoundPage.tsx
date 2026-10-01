import { Button, Container, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <Container size="sm" py={80}>
      <Stack align="center" gap="md">
        <Title order={1} style={{ fontSize: '3rem' }}>
          404
        </Title>
        <Text size="lg" fw={500}>
          Página não encontrada
        </Text>
        <Text c="dimmed" ta="center">
          O link que você seguiu pode estar incorreto ou a página pode ter sido removida.
        </Text>
        <Button component={Link} to="/" variant="filled" mt="md">
          Voltar para a Home
        </Button>
      </Stack>
    </Container>
  )
}

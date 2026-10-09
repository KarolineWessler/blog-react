import { Box, Button, Container, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

export function CallToAction() {
  return (
    <Box bg="gray.0" py={{ base: 56, md: 80 }} mt="xl">
      <Container size="md">
        <Stack align="center" gap="md" ta="center">
          <Title order={2} size="h2" fw={800}>
            Pronto para compartilhar suas histórias?
          </Title>
          <Text c="dimmed" size="md" maw={520}>
            Junte-se à nossa comunidade de leitores e escritores. Crie sua conta para publicar seus próprios artigos e interagir com outros autores.
          </Text>
          <Button size="lg" radius="md" mt="xs" component={Link} to="/login">
            Começar
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

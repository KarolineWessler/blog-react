import { Box, Button, Container, Stack, Text, Title } from '@mantine/core'

export function Hero() {
  return (
    <Box bg="gray.0" py={{ base: 56, md: 80 }}>
      <Container size="md">
        <Stack align="center" gap="md" ta="center">
          <Title order={1} size="h1" fw={900}>
            Histórias e ideias que valem a pena ler
          </Title>
          <Text c="dimmed" size="lg" maw={580}>
            Explore crônicas, ensaios e narrativas de autores independentes em um espaço dedicado à boa leitura.
          </Text>
          <Button
            component="a"
            href="#posts"
            size="lg"
            radius="md"
            mt="sm"
          >
            Explorar
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

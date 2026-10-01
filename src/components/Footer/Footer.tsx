import { Box, Container, Text } from '@mantine/core'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box component="footer" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }} py="md" mt="auto">
      <Container size="lg">
        <Text c="dimmed" size="sm" ta="center">
          © {currentYear} DevBlog. Todos os direitos reservados.
        </Text>
      </Container>
    </Box>
  )
}

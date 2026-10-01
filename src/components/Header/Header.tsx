import { Box, Button, Container, Group, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <Box component="header" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }} py="sm">
      <Container size="lg">
        <Group justify="space-between" align="center">
          <Text
            component={Link}
            to="/"
            size="xl"
            fw={700}
            c="inherit"
            style={{ textDecoration: 'none' }}
          >
            DevBlog
          </Text>

          <Button
            disabled
            variant="default"
            radius="md"
          >
            Login
          </Button>
        </Group>
      </Container>
    </Box>
  )
}

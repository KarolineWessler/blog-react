import { Box, Button, Container, Group, Text } from '@mantine/core'
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function Header() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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

          <Group gap="sm" align="center">
            {isAuthenticated && user ? (
              <>
                <RouterNavLink to="/feed" style={{ textDecoration: 'none' }}>
                  {({ isActive }) => (
                    <Button variant={isActive ? 'filled' : 'light'} size="sm" radius="md">
                      Feed
                    </Button>
                  )}
                </RouterNavLink>
                <Text size="sm" fw={500}>
                  Olá, {user.firstName}!
                </Text>
                <RouterNavLink to="/admin" style={{ textDecoration: 'none' }}>
                  {({ isActive }) => (
                    <Button variant={isActive ? 'filled' : 'light'} size="sm" radius="md">
                      Painel
                    </Button>
                  )}
                </RouterNavLink>
                <Button
                  onClick={handleLogout}
                  variant="default"
                  radius="md"
                  size="sm"
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant="default"
                  radius="md"
                  size="sm"
                >
                  Login
                </Button>
              </>
            )}
          </Group>
        </Group>
      </Container>
    </Box>
  )
}

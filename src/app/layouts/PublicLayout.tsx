import { Box } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'

export function PublicLayout() {
  return (
    <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" style={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

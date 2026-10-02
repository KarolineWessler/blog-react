import { Route, Routes } from 'react-router-dom'
import { PublicLayout } from '@/app/layouts/PublicLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute'
import { AdminDashboardPage } from '@/pages/Admin/AdminDashboardPage'
import { HomePage } from '@/pages/Home/HomePage'
import { LoginPage } from '@/pages/Login/LoginPage'
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}


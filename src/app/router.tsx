import { Outlet, Route, Routes } from 'react-router-dom'
import { PublicLayout } from '@/app/layouts/PublicLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute'
import { AdminDashboardPage } from '@/pages/Admin/AdminDashboardPage'
import { AdminPostsProvider } from '@/pages/Admin/AdminPostsContext'
import { AdminPostsPage } from '@/pages/Admin/AdminPostsPage'
import { PostFormPage } from '@/pages/Admin/PostFormPage'
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
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />

          <Route
            path="posts"
            element={
              <AdminPostsProvider>
                <Outlet />
              </AdminPostsProvider>
            }
          >
            <Route index element={<AdminPostsPage />} />
            <Route path="new" element={<PostFormPage />} />
            <Route path=":id/edit" element={<PostFormPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

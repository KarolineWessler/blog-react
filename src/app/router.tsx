import { Outlet, Route, Routes } from 'react-router-dom'
import { PublicLayout } from '@/app/layouts/PublicLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute'
import { AdminDashboardPage } from '@/pages/Admin/AdminDashboardPage'
import { AdminPostsProvider } from '@/pages/Admin/AdminPostsContext'
import { AdminPostsPage } from '@/pages/Admin/AdminPostsPage'
import { PostFormPage } from '@/pages/Admin/PostFormPage'
import { ProfilePage } from '@/pages/Admin/ProfilePage'
import { HomePage } from '@/pages/Home/HomePage'
import { LoginPage } from '@/pages/Login/LoginPage'
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage'
import { PostDetailPage } from '@/pages/PostDetail/PostDetailPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="posts/:id" element={<PostDetailPage />} />

        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminPostsProvider>
                <Outlet />
              </AdminPostsProvider>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="posts">
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

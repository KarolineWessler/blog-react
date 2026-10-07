import { useState } from 'react'
import {
  Alert,
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import type { Post } from '@/schemas/postSchema'
import { ApiError } from '@/services/api'
import { deletePost } from '@/services/postService'
import { AdminPostCard } from './AdminPostCard'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'
import { useAdminPosts } from './useAdminPosts'

export function AdminPostsPage() {
  const { posts, isLoading, error, removePost } = useAdminPosts()
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(null)

  const handleOpenDeleteModal = (post: Post) => {
    setDeleteErrorMessage(null)
    setPostToDelete(post)
  }

  const handleCloseDeleteModal = () => {
    if (isDeleting) return
    setPostToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!postToDelete) return

    setIsDeleting(true)
    setDeleteErrorMessage(null)

    try {
      await deletePost(postToDelete.id)
      removePost(postToDelete.id)
      setFeedbackMessage(`Post "${postToDelete.title}" excluído com sucesso.`)
      setPostToDelete(null)
    } catch (err) {
      if (err instanceof ApiError) {
        setDeleteErrorMessage(err.message)
      } else if (err instanceof Error) {
        setDeleteErrorMessage(err.message)
      } else {
        setDeleteErrorMessage('Não foi possível excluir o post.')
      }
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <div>
          <Anchor component={Link} to="/admin" size="sm" c="dimmed">
            &larr; Voltar ao Painel
          </Anchor>
          <Group justify="space-between" align="center" mt="xs">
            <div>
              <Title order={1} size="h2">
                Minhas Publicações
              </Title>
              <Text c="dimmed" size="sm">
                Gerencie seus artigos, crie novas publicações ou edite conteúdos.
              </Text>
            </div>
            <Button
              component={Link}
              to="/admin/posts/new"
              size="sm"
            >
              + Novo post
            </Button>
          </Group>
        </div>

        {feedbackMessage && (
          <Alert
            color="green"
            variant="light"
            withCloseButton
            onClose={() => setFeedbackMessage(null)}
          >
            {feedbackMessage}
          </Alert>
        )}

        {deleteErrorMessage && (
          <Alert
            color="red"
            variant="light"
            withCloseButton
            onClose={() => setDeleteErrorMessage(null)}
          >
            {deleteErrorMessage}
          </Alert>
        )}

        {isLoading ? (
          <Center py="xl">
            <Loader size="lg" />
          </Center>
        ) : error ? (
          <Alert color="red" variant="light" title="Erro ao carregar publicações">
            {error}
          </Alert>
        ) : posts.length === 0 ? (
          <Paper withBorder p="xl" radius="md" ta="center">
            <Stack align="center" gap="xs">
              <Text size="lg" fw={500}>
                Você ainda não possui nenhum post publicado.
              </Text>
              <Text c="dimmed" size="sm">
                Comece agora mesmo compartilhando sua primeira ideia no DevBlog.
              </Text>
              <Box mt="sm">
                <Button component={Link} to="/admin/posts/new">
                  Criar primeiro post
                </Button>
              </Box>
            </Stack>
          </Paper>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {posts.map((post) => (
              <AdminPostCard
                key={post.id}
                post={post}
                onDelete={handleOpenDeleteModal}
              />
            ))}
          </SimpleGrid>
        )}
      </Stack>

      <ConfirmDeleteModal
        opened={postToDelete !== null}
        postTitle={postToDelete?.title}
        isLoading={isDeleting}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  )
}

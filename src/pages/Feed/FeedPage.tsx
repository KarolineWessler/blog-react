import { useEffect, useState } from 'react'
import {
  Alert,
  Center,
  Container,
  Loader,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { PostCard } from '@/pages/Home/PostCard'
import type { Post } from '@/schemas/postSchema'
import { fetchPosts } from '@/services/postService'

const ITEMS_PER_PAGE = 9

export function FeedPage() {
  const { isAuthenticated } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    setIsLoading(true)
    setError(null)
  }

  useEffect(() => {
    if (!isAuthenticated) return

    let isMounted = true
    const skip = (page - 1) * ITEMS_PER_PAGE

    fetchPosts({ skip, limit: ITEMS_PER_PAGE })
      .then((data) => {
        if (!isMounted) return
        setPosts(data.posts)
        setTotal(data.total)
      })
      .catch((err: unknown) => {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : 'Erro ao carregar o feed de publicações.')
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [isAuthenticated, page])

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} size="h2">
            Feed
          </Title>
          <Text c="dimmed" size="sm">
            Confira as últimas publicações da comunidade de desenvolvedores.
          </Text>
        </div>

        {isLoading ? (
          <Center py="xl">
            <Loader size="lg" />
          </Center>
        ) : error ? (
          <Alert color="red" variant="light" title="Erro ao carregar publicações">
            {error}
          </Alert>
        ) : posts.length === 0 ? (
          <Center py="xl">
            <Text c="dimmed">Nenhuma publicação encontrada no momento.</Text>
          </Center>
        ) : (
          <>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </SimpleGrid>

            {totalPages > 1 && (
              <Center mt="md">
                <Pagination
                  value={page}
                  onChange={handlePageChange}
                  total={totalPages}
                />
              </Center>
            )}
          </>
        )}
      </Stack>
    </Container>
  )
}

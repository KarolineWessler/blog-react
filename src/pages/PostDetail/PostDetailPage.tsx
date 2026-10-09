import { useEffect, useState } from 'react'
import {
  Alert,
  Anchor,
  Badge,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { Link, useParams } from 'react-router-dom'
import type { Comment } from '@/schemas/commentSchema'
import type { Post } from '@/schemas/postSchema'
import { ApiError } from '@/services/api'
import { fetchCommentsByPost } from '@/services/commentService'
import { fetchPost } from '@/services/postService'
import { CommentItem } from './CommentItem'

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>()
  const numericId = id ? Number(id) : null
  const isInvalidId = numericId === null || Number.isNaN(numericId)

  const [isLoading, setIsLoading] = useState<boolean>(!isInvalidId)
  const [error, setError] = useState<string | null>(null)
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    if (isInvalidId || numericId === null) {
      return
    }

    let isMounted = true

    async function loadPostDetails(postId: number) {
      try {
        const [postData, commentsData] = await Promise.all([
          fetchPost(postId),
          fetchCommentsByPost(postId),
        ])
        if (isMounted) {
          setPost(postData)
          setComments(commentsData)
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (err instanceof ApiError) {
            setError(err.message)
          } else if (err instanceof Error) {
            setError(err.message)
          } else {
            setError('Não foi possível carregar a publicação.')
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPostDetails(numericId)

    return () => {
      isMounted = false
    }
  }, [numericId, isInvalidId])

  if (isInvalidId) {
    return (
      <Container size="md" py="xl">
        <Paper withBorder p="xl" radius="md">
          <Alert color="red" variant="light" title="Identificador inválido" mb="md">
            O identificador da publicação informado na URL não é válido.
          </Alert>
          <Button component={Link} to="/" variant="default">
            Voltar para a home
          </Button>
        </Paper>
      </Container>
    )
  }

  if (isLoading) {
    return (
      <Container size="md" py="xl">
        <Center py="xl">
          <Loader size="lg" />
        </Center>
      </Container>
    )
  }

  if (error || !post) {
    return (
      <Container size="md" py="xl">
        <Paper withBorder p="xl" radius="md">
          <Alert color="red" variant="light" title="Publicação não encontrada" mb="md">
            {error || 'Não foi possível encontrar a publicação solicitada.'}
          </Alert>
          <Button component={Link} to="/" variant="default">
            Voltar para a home
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <div>
          <Anchor component={Link} to="/" size="sm" c="dimmed">
            &larr; Voltar para a home
          </Anchor>
        </div>

        <div>
          <Title order={1} size="h1" mb="xs">
            {post.title}
          </Title>

          <Group justify="space-between" align="center" mt="xs" wrap="wrap" gap="sm">
            <Group gap="xs">
              <Badge variant="outline" color="blue">
                Autor #{post.userId}
              </Badge>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="light" size="sm">
                  #{tag}
                </Badge>
              ))}
            </Group>

            <Group gap="md">
              <Text size="sm" c="dimmed">
                <span aria-hidden="true">👍 </span>
                {post.reactions?.likes ?? 0} curtidas
              </Text>
              <Text size="sm" c="dimmed">
                <span aria-hidden="true">👁️ </span>
                {post.views ?? 0} visualizações
              </Text>
            </Group>
          </Group>
        </div>

        <Text size="md" style={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
          {post.body}
        </Text>

        <Divider my="md" />

        <Stack gap="md">
          <Title order={2} size="h3">
            Comentários ({comments.length})
          </Title>

          {comments.length === 0 ? (
            <Text c="dimmed" size="sm">
              Nenhum comentário ainda
            </Text>
          ) : (
            <Stack gap="sm">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </Stack>
          )}
        </Stack>

        <Box mt="md">
          <Button component={Link} to="/" variant="default">
            Voltar para a home
          </Button>
        </Box>
      </Stack>
    </Container>
  )
}

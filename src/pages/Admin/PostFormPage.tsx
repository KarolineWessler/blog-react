import { useEffect, useRef, useState } from 'react'
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
  Stack,
  TagsInput,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { CreatePostSchema, type CreatePostDTO } from '@/schemas/postSchema'
import { ApiError } from '@/services/api'
import { createPost, fetchPost, updatePost } from '@/services/postService'
import { useAdminPosts } from './useAdminPosts'

function getErrorMessage(err: unknown, defaultMessage: string): string {
  if (err instanceof ApiError) {
    return err.message
  }
  if (err instanceof Error) {
    return err.message
  }
  return defaultMessage
}

export function PostFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { posts, addPost, updatePostInList } = useAdminPosts()

  const isEditing = Boolean(id)
  const numericId = id ? Number(id) : null
  const isInvalidId = isEditing && (numericId === null || Number.isNaN(numericId))

  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(isEditing && !isInvalidId)
  const [notFoundError, setNotFoundError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const postsRef = useRef(posts)
  useEffect(() => {
    postsRef.current = posts
  }, [posts])

  const form = useForm<CreatePostDTO>({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      body: '',
      tags: [],
      userId: user?.id ?? 0,
    },
    validate: schemaResolver(CreatePostSchema),
  })

  useEffect(() => {
    if (!isEditing || isInvalidId || numericId === null) {
      return
    }

    let isMounted = true

    async function loadPostToEdit(postId: number) {
      try {
        const post = await fetchPost(postId)
        if (isMounted) {
          form.setValues({
            title: post.title,
            body: post.body,
            tags: post.tags,
            userId: post.userId,
          })
          form.resetDirty()
        }
      } catch {
        // A DummyJSON simula o CRUD sem persistir no backend.
        // Se o post foi criado nesta sessão, recuperamos do estado em memória.
        const localPost = postsRef.current.find((p) => p.id === postId)
        if (localPost && isMounted) {
          form.setValues({
            title: localPost.title,
            body: localPost.body,
            tags: localPost.tags,
            userId: localPost.userId,
          })
          form.resetDirty()
        } else if (isMounted) {
          setNotFoundError(
            'Não foi possível encontrar a publicação para edição. O post pode ter sido excluído ou não está cadastrado na API.',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoadingPost(false)
        }
      }
    }

    loadPostToEdit(numericId)

    return () => {
      isMounted = false
    }
    // form é intencionalmente omitido: o Mantine devolve uma nova referência a cada render,
    // mas o efeito só deve rodar quando o id da URL muda.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericId, isEditing, isInvalidId])

  const handleSubmit = async (values: CreatePostDTO) => {
    if (!user) {
      setSubmitError('Usuário não autenticado.')
      return
    }

    setSubmitError(null)
    setIsSubmitting(true)

    try {
      if (isEditing && numericId !== null) {
        const payload: CreatePostDTO = {
          ...values,
          userId: values.userId || user.id,
        }
        const updated = await updatePost(numericId, payload)
        updatePostInList(updated)
        navigate('/admin/posts')
      } else {
        const payload: CreatePostDTO = {
          ...values,
          userId: user.id,
        }
        const created = await createPost(payload)
        addPost(created)
        navigate('/admin/posts')
      }
    } catch (err) {
      setSubmitError(getErrorMessage(err, 'Ocorreu um erro ao salvar a publicação.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isInvalidId) {
    return (
      <Container size="md" py="xl">
        <Paper withBorder p="xl" radius="md">
          <Alert color="red" variant="light" title="Identificador inválido" mb="md">
            O identificador do post informado na URL não é válido.
          </Alert>
          <Button component={Link} to="/admin/posts" variant="default">
            Voltar para a listagem
          </Button>
        </Paper>
      </Container>
    )
  }

  if (isLoadingPost) {
    return (
      <Container size="md" py="xl">
        <Center py="xl">
          <Loader size="lg" />
        </Center>
      </Container>
    )
  }

  if (notFoundError) {
    return (
      <Container size="md" py="xl">
        <Paper withBorder p="xl" radius="md">
          <Alert color="red" variant="light" title="Post não encontrado" mb="md">
            {notFoundError}
          </Alert>
          <Button component={Link} to="/admin/posts" variant="default">
            Voltar para a listagem
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container size="md" py="xl">
      <Paper withBorder shadow="sm" p="xl" radius="md">
        <Stack gap="lg">
          <div>
            <Anchor component={Link} to="/admin/posts" size="sm" c="dimmed">
              &larr; Voltar para minhas publicações
            </Anchor>
            <Title order={1} size="h2" mt="xs">
              {isEditing ? 'Editar Publicação' : 'Criar Nova Publicação'}
            </Title>
          </div>

          {submitError && (
            <Alert
              color="red"
              variant="light"
              withCloseButton
              onClose={() => setSubmitError(null)}
            >
              {submitError}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Título"
                placeholder="Ex: Primeiros passos com React 19"
                withAsterisk
                key={form.key('title')}
                {...form.getInputProps('title')}
              />

              <Textarea
                label="Conteúdo"
                placeholder="Escreva aqui o conteúdo da publicação..."
                withAsterisk
                minRows={6}
                autosize
                key={form.key('body')}
                {...form.getInputProps('body')}
              />

              <TagsInput
                label="Tags"
                placeholder="Digite a tag e pressione Enter (ex: react, frontend)"
                withAsterisk
                key={form.key('tags')}
                {...form.getInputProps('tags')}
              />

              <Box mt="md">
                <Group justify="flex-end" gap="sm">
                  <Button
                    component={Link}
                    to="/admin/posts"
                    variant="default"
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isEditing ? 'Atualizar post' : 'Publicar post'}
                  </Button>
                </Group>
              </Box>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Container>
  )
}

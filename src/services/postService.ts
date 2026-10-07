import {
  PostSchema,
  PostsPaginatedResponseSchema,
  type CreatePostDTO,
  type Post,
} from '@/schemas/postSchema'
import { api, ApiError } from '@/services/api'

export async function fetchPost(postId: number): Promise<Post> {
  const response = await api.get(`/posts/${postId}`)

  const postData = {
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
    ...response.data,
  }

  const parsed = PostSchema.safeParse(postData)

  if (!parsed.success) {
    throw new ApiError(500, 'Formato de dados inválido retornado pelo servidor.')
  }

  return parsed.data
}

export async function fetchPostsByUser(userId: number): Promise<Post[]> {
  const response = await api.get(`/posts/user/${userId}`)

  const parsed = PostsPaginatedResponseSchema.safeParse(response.data)

  if (!parsed.success) {
    throw new ApiError(500, 'Formato de dados inválido retornado pelo servidor.')
  }

  return parsed.data.posts
}

export async function createPost(dto: CreatePostDTO): Promise<Post> {
  const response = await api.post('/posts/add', dto)

  // A DummyJSON não retorna reactions e views em POST /posts/add, garantimos valores padrão
  const postData = {
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
    ...response.data,
  }

  const parsed = PostSchema.safeParse(postData)

  if (!parsed.success) {
    throw new ApiError(500, 'Formato de dados inválido retornado pelo servidor.')
  }

  return parsed.data
}

export async function updatePost(postId: number, dto: CreatePostDTO): Promise<Post> {
  try {
    const response = await api.put(`/posts/${postId}`, dto)

    const postData = {
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      ...response.data,
    }

    const parsed = PostSchema.safeParse(postData)

    if (!parsed.success) {
      throw new ApiError(500, 'Formato de dados inválido retornado pelo servidor.')
    }

    return parsed.data
  } catch (error) {
    // A DummyJSON simula o CRUD sem persistir no backend. Retorna 404 em PUT para posts criados durante a sessão.
    if (error instanceof ApiError && error.status === 404) {
      const fallbackPost: Post = {
        id: postId,
        title: dto.title,
        body: dto.body,
        tags: dto.tags,
        reactions: { likes: 0, dislikes: 0 },
        views: 0,
        userId: dto.userId,
      }
      return fallbackPost
    }
    throw error
  }
}

export async function deletePost(postId: number): Promise<void> {
  try {
    await api.delete(`/posts/${postId}`)
  } catch (error) {
    // A DummyJSON não persiste posts criados na sessão e retorna 404 ao tentar excluí-los.
    if (error instanceof ApiError && error.status === 404) {
      return
    }
    throw error
  }
}

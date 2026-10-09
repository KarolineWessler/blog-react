import {
  CommentsPaginatedResponseSchema,
  type Comment,
} from '@/schemas/commentSchema'
import { api, ApiError } from '@/services/api'

export async function fetchCommentsByPost(postId: number): Promise<Comment[]> {
  const response = await api.get(`/posts/${postId}/comments`)

  const parsed = CommentsPaginatedResponseSchema.safeParse(response.data)

  if (!parsed.success) {
    throw new ApiError(500, 'Formato de dados inválido retornado pelo servidor.')
  }

  return parsed.data.comments
}

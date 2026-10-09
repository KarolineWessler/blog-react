import { z } from 'zod'

export const CommentSchema = z.object({
  id: z.number(),
  body: z.string(),
  postId: z.number(),
  likes: z.number(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    fullName: z.string(),
  }),
})

export type Comment = z.infer<typeof CommentSchema>

export const CommentsPaginatedResponseSchema = z.object({
  comments: z.array(CommentSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type CommentsPaginatedResponse = z.infer<typeof CommentsPaginatedResponseSchema>

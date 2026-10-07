import { z } from 'zod'

export const PostSchema = z.object({
  id: z.number(),
  title: z.string().min(5, 'O título deve ter no mínimo 5 caracteres'),
  body: z.string().min(10, 'O texto deve ter no mínimo 10 caracteres'),
  tags: z.array(z.string()).min(1, 'Adicione pelo menos uma tag'),
  reactions: z
    .object({
      likes: z.number(),
      dislikes: z.number(),
    })
    .default({ likes: 0, dislikes: 0 }),
  views: z.number().default(0),
  userId: z.number(),
})

export type Post = z.infer<typeof PostSchema>

export const CreatePostSchema = PostSchema.omit({
  id: true,
  reactions: true,
  views: true,
})

export type CreatePostDTO = z.infer<typeof CreatePostSchema>

export const PostsPaginatedResponseSchema = z.object({
  posts: z.array(PostSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type PostsPaginatedResponse = z.infer<typeof PostsPaginatedResponseSchema>


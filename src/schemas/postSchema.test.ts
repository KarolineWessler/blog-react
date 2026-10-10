import { describe, expect, it } from 'vitest'
import { PostSchema } from './postSchema'

const validPost = {
  id: 1,
  title: 'Título válido',
  body: 'Corpo válido do post',
  tags: ['tech'],
  reactions: { likes: 10, dislikes: 0 },
  views: 100,
  userId: 1,
}

describe('PostSchema', () => {
  it('valida um post completo', () => {
    expect(PostSchema.safeParse(validPost).success).toBe(true)
  })

  it('rejeita um post sem título', () => {
    const postWithoutTitle = {
      id: validPost.id,
      body: validPost.body,
      tags: validPost.tags,
      reactions: validPost.reactions,
      views: validPost.views,
      userId: validPost.userId,
    }
    expect(PostSchema.safeParse(postWithoutTitle).success).toBe(false)
  })

  it('rejeita um título com menos de 5 caracteres', () => {
    expect(
      PostSchema.safeParse({ ...validPost, title: 'Curto' }).success,
    ).toBe(true)
    expect(
      PostSchema.safeParse({ ...validPost, title: 'Ok' }).success,
    ).toBe(false)
  })

  it('rejeita um post sem tags', () => {
    const postWithoutTags = {
      id: validPost.id,
      title: validPost.title,
      body: validPost.body,
      reactions: validPost.reactions,
      views: validPost.views,
      userId: validPost.userId,
    }
    expect(PostSchema.safeParse(postWithoutTags).success).toBe(false)
  })
})

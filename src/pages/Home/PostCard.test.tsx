import { describe, expect, it } from 'vitest'
import { PostCard } from './PostCard'
import type { Post } from '@/schemas/postSchema'
import { render, screen } from '@/test-utils/render'

const mockPost: Post = {
  id: 1,
  title: 'Título do Post de Teste',
  body: 'Corpo do post de teste para verificação.',
  tags: ['react', 'vitest'],
  reactions: { likes: 42, dislikes: 2 },
  views: 150,
  userId: 1,
}

describe('PostCard', () => {
  it('renderiza o título e as tags', () => {
    render(<PostCard post={mockPost} />)

    expect(screen.getByText('Título do Post de Teste')).toBeInTheDocument()
    expect(screen.getByText('#react')).toBeInTheDocument()
    expect(screen.getByText('#vitest')).toBeInTheDocument()
  })

  it('é um link para a página de detalhe do post', () => {
    render(<PostCard post={mockPost} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/posts/1')
  })
})

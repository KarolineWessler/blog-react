import type { Post } from '@/schemas/postSchema'

export const AVAILABLE_TAGS: readonly string[] = [
  'fiction',
  'history',
  'mystery',
  'fantasy',
  'love',
  'science',
]

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: 'O Enigma do Relógio Ancestral',
    body: 'Entre as engrenagens empoeiradas da antiga torre da cidade, um mecanismo secreto guardava respostas esquecidas há séculos pelos moradores locais.',
    tags: ['mystery', 'fiction'],
    reactions: {
      likes: 142,
      dislikes: 4,
    },
    views: 1250,
    userId: 12,
  },
  {
    id: 2,
    title: 'Crônicas dos Reinos Perdidos',
    body: 'A magia há muito adormecida nas montanhas de cristal começou a despertar quando as duas luas se alinharam no céu noturno.',
    tags: ['fantasy', 'fiction'],
    reactions: {
      likes: 320,
      dislikes: 12,
    },
    views: 2840,
    userId: 25,
  },
  {
    id: 3,
    title: 'Memórias de uma Cidade Fluvial',
    body: 'Registros históricos detalham como o grande rio moldou as civilizações e as rotas de comércio da bacia central durante o século XIX.',
    tags: ['history'],
    reactions: {
      likes: 98,
      dislikes: 2,
    },
    views: 890,
    userId: 8,
  },
  {
    id: 4,
    title: 'Cartas que Nunca Chegaram',
    body: 'Uma correspondência inacabada encontrada em um sótão de Paris revela uma história de amor separada pelas fronteiras e pelo tempo.',
    tags: ['love', 'fiction'],
    reactions: {
      likes: 215,
      dislikes: 6,
    },
    views: 1730,
    userId: 19,
  },
  {
    id: 5,
    title: 'A Ascensão das Máquinas a Vapor',
    body: 'Uma análise profunda sobre o surgimento da indústria moderna e os impactos cotidianos na vida dos trabalhadores urbanos.',
    tags: ['history'],
    reactions: {
      likes: 175,
      dislikes: 5,
    },
    views: 1420,
    userId: 14,
  },
  {
    id: 6,
    title: 'O Labirinto dos Sussurros',
    body: 'Quem ousa atravessar as galerias subterrâneas da antiga biblioteca descobre segredos que desafiam a lógica humana.',
    tags: ['mystery', 'fantasy'],
    reactions: {
      likes: 410,
      dislikes: 15,
    },
    views: 3100,
    userId: 33,
  },
]

import { useState } from 'react'
import { Container, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { CallToAction } from './CallToAction'
import { Hero } from './Hero'
import { AVAILABLE_TAGS, MOCK_POSTS } from './mockPosts'
import { PostCard } from './PostCard'
import { TagFilter } from './TagFilter'

export function HomePage() {
  const { isAuthenticated } = useAuth()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  if (isAuthenticated) {
    return <Navigate to="/feed" replace />
  }

  const filteredPosts = selectedTag
    ? MOCK_POSTS.filter((post) => post.tags.includes(selectedTag))
    : MOCK_POSTS

  return (
    <>
      <Hero />

      <Container
        size="lg"
        py={{ base: 'xl', md: 56 }}
        id="posts"
        style={{ scrollMarginTop: 80 }}
      >
        <Stack gap="xl">
          <Stack align="center" gap="xs" ta="center">
            <Title order={2} size="h2">
              Publicações em Destaque
            </Title>
            <Text c="dimmed" size="sm">
              Filtre por tema ou explore as leituras recomendadas
            </Text>
          </Stack>

          <TagFilter
            tags={AVAILABLE_TAGS}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
          />

          {filteredPosts.length > 0 ? (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </SimpleGrid>
          ) : (
            <Text c="dimmed" ta="center" py="xl">
              Nenhum post encontrado para esta tag.
            </Text>
          )}
        </Stack>
      </Container>

      <CallToAction />
    </>
  )
}

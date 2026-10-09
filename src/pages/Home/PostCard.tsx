import { Badge, Card, Group, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import type { Post } from '@/schemas/postSchema'

export interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card
      component={Link}
      to={`/posts/${post.id}`}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
      }}
    >
      <Stack gap="xs" style={{ flex: 1 }}>
        <Group gap="xs">
          {post.tags.map((tag) => (
            <Badge key={tag} size="xs" variant="light">
              #{tag}
            </Badge>
          ))}
        </Group>

        <Title order={3} size="h4" lineClamp={2}>
          {post.title}
        </Title>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {post.body}
        </Text>
      </Stack>

      <Group
        justify="space-between"
        mt="md"
        pt="xs"
        style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
      >
        <Text size="xs" c="dimmed">
          <span aria-hidden="true">👍 </span>
          {post.reactions.likes} curtidas
        </Text>
        <Text size="xs" c="dimmed">
          <span aria-hidden="true">👁️ </span>
          {post.views} visualizações
        </Text>
      </Group>
    </Card>
  )
}

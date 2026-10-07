import { Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import type { Post } from '@/schemas/postSchema'

export interface AdminPostCardProps {
  post: Post
  onDelete: (post: Post) => void
}

export function AdminPostCard({ post, onDelete }: AdminPostCardProps) {
  return (
    <Card
      withBorder
      shadow="sm"
      radius="md"
      p="lg"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Stack gap="xs" style={{ flex: 1 }}>
        <Title order={3} size="h4" lineClamp={2}>
          {post.title}
        </Title>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {post.body}
        </Text>

        {post.tags && post.tags.length > 0 && (
          <Group gap="xs" mt="xs">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="light" size="sm">
                #{tag}
              </Badge>
            ))}
          </Group>
        )}
      </Stack>

      <Stack gap="sm" mt="md">
        <Group justify="space-between" align="center">
          <Text size="xs" c="dimmed">
            Curtidas: {post.reactions?.likes ?? 0}
          </Text>
          <Text size="xs" c="dimmed">
            Visualizações: {post.views ?? 0}
          </Text>
        </Group>

        <Group gap="xs" grow>
          <Button
            component={Link}
            to={`/admin/posts/${post.id}/edit`}
            variant="light"
            size="sm"
          >
            Editar
          </Button>
          <Button
            variant="subtle"
            color="red"
            size="sm"
            onClick={() => onDelete(post)}
          >
            Excluir
          </Button>
        </Group>
      </Stack>
    </Card>
  )
}

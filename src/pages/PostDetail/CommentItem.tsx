import { Avatar, Group, Paper, Stack, Text } from '@mantine/core'
import type { Comment } from '@/schemas/commentSchema'

export interface CommentItemProps {
  comment: Comment
}

export function CommentItem({ comment }: CommentItemProps) {
  const authorName = comment.user.fullName || comment.user.username
  const initials = comment.user.username.slice(0, 2).toUpperCase()

  return (
    <Paper withBorder p="md" radius="sm">
      <Group justify="space-between" align="flex-start" mb="xs">
        <Group gap="sm">
          <Avatar radius="xl" size="sm" color="blue">
            {initials}
          </Avatar>
          <Stack gap={0}>
            <Text size="sm" fw={600}>
              {authorName}
            </Text>
            <Text size="xs" c="dimmed">
              @{comment.user.username}
            </Text>
          </Stack>
        </Group>

        <Text size="xs" c="dimmed">
          <span aria-hidden="true">👍 </span>
          {comment.likes} {comment.likes === 1 ? 'curtida' : 'curtidas'}
        </Text>
      </Group>

      <Text size="sm" style={{ whiteSpace: 'pre-line' }}>
        {comment.body}
      </Text>
    </Paper>
  )
}

import { Chip, Group } from '@mantine/core'

export interface TagFilterProps {
  tags: readonly string[]
  selectedTag: string | null
  onSelectTag: (tag: string | null) => void
}

export function TagFilter({ tags, selectedTag, onSelectTag }: TagFilterProps) {
  return (
    <Group justify="center" gap="xs">
      {tags.map((tag) => (
        <Chip
          key={tag}
          checked={selectedTag === tag}
          onChange={(checked) => onSelectTag(checked ? tag : null)}
          variant="light"
          radius="xl"
          size="sm"
        >
          #{tag}
        </Chip>
      ))}
    </Group>
  )
}

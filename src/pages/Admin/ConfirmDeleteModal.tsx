import { Button, Group, Modal, Stack, Text } from '@mantine/core'

export interface ConfirmDeleteModalProps {
  opened: boolean
  postTitle?: string
  isLoading: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ConfirmDeleteModal({
  opened,
  postTitle,
  isLoading,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Confirmar exclusão"
      centered
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
    >
      <Stack gap="md">
        <Text size="sm">
          Tem certeza de que deseja excluir o post{' '}
          <Text span fw={600}>
            &ldquo;{postTitle}&rdquo;
          </Text>
          ? Esta ação não pode ser desfeita.
        </Text>

        <Group justify="flex-end" gap="sm">
          <Button
            variant="default"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            color="red"
            onClick={onConfirm}
            loading={isLoading}
            disabled={isLoading}
          >
            Excluir post
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}

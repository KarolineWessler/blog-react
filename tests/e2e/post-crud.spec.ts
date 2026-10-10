import { expect, test } from '@playwright/test'
import { login } from './helpers/login.ts'

test('cria um post e o exibe na listagem', async ({ page }) => {
  await login(page)
  await page.goto('/admin/posts/new')

  await page.getByLabel(/título/i).fill('Título de Teste E2E')
  await page.getByLabel(/conteúdo/i).fill('Conteúdo de teste criado pelo Playwright.')
  const tagsInput = page.getByRole('combobox', { name: 'Tags' })
  await tagsInput.fill('e2e')
  await tagsInput.press('Enter')

  await page.getByRole('button', { name: 'Publicar post' }).click()

  await expect(page).toHaveURL('/admin/posts')
  await expect(page.getByText('Título de Teste E2E')).toBeVisible()
})

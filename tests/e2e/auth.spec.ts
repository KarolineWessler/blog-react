import { expect, test } from '@playwright/test'

test('redireciona usuário deslogado para o login e autentica', async ({ page }) => {
  await page.goto('/admin')
  await expect(page).toHaveURL('/login')

  await page.getByLabel('Nome de usuário').fill('emilys')
  await page.getByLabel('Senha').fill('emilyspass')
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(page).toHaveURL('/admin')
  await expect(page.getByRole('main').getByText('Olá, Emily!')).toBeVisible()
})

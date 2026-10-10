import { expect, type Page } from '@playwright/test'

export async function login(page: Page): Promise<void> {
  await page.goto('/login')
  await page.getByLabel('Nome de usuário').fill('emilys')
  await page.getByLabel('Senha').fill('emilyspass')
  await page.getByRole('button', { name: 'Entrar' }).click()
  await expect(page).toHaveURL('/admin')
}

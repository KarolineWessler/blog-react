import { expect, test } from '@playwright/test'

test('navega da home para o detalhe de um post', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: /O Enigma do Relógio Ancestral/i }).click()

  await expect(page).toHaveURL(/\/posts\/\d+$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Comentários/ })).toBeVisible()
})

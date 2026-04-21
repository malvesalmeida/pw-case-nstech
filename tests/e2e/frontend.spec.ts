import { test, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { credentials } from '../config/credentials';

test('deve realizar login com sucesso', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test('visualizar produto e voltar para lista', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/inventory/);
  await page.locator('.inventory_item_name').first().click();
  await expect(page).toHaveURL(/inventory-item/);
  await page.click('#back-to-products');
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test('deve adicionar e remover item do carrinho', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/inventory/);
  const firstItem = page.locator('.inventory_item').first();
  await firstItem.locator('button').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await page.locator('.cart_item button').click();
  await expect(page.locator('.cart_item')).toHaveCount(0);
});

test('deve realizar uma compra com sucesso', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/inventory/);
  const firstItem = page.locator('.inventory_item').first();
  const itemName = await firstItem.locator('.inventory_item_name').textContent();
  await firstItem.locator('button').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.inventory_item_name')).toHaveText(itemName!);
  await page.click('#checkout');
  await page.fill('#first-name', 'Marly');
  await page.fill('#last-name', 'Alves');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');
  await expect(page).toHaveURL(/checkout-step-two/);
  await page.click('#finish');
  await expect(page).toHaveURL(/checkout-complete/);
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

test('login inválido', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', credentials.invalidUser.username);
  await page.fill('#password', credentials.invalidUser.password);
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

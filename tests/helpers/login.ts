import { Page } from '@playwright/test';
import { credentials } from '../config/credentials';

const BASE_URL = 'https://www.saucedemo.com/';

export async function login(page: Page) {
  await page.goto(BASE_URL);
  await page.fill('#user-name', credentials.validUser.username);
  await page.fill('#password', credentials.validUser.password);
  await page.click('#login-button');
}

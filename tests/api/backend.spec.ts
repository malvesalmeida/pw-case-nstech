import { test, expect } from '@playwright/test';
import { getDDD } from '../helpers/apiAccess';
import { getFeriados } from '../helpers/apiAccess';

test('deve retornar DDD 31', async ({ request }) => {
  const response = await getDDD(request, '31');
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.state).toBe('MG');
});

test('deve retornar 400 para DDD inválido', async ({ request }) => {
  const response = await getDDD(request, '1');
  expect(response.status()).toBe(400);

  const body = await response.json();
  expect(body.message).toContain('DDD deve conter apenas 2 dígitos');
});

test('deve retornar 404 para DDD inexistente', async ({ request }) => {
  const response = await getDDD(request, '52');
  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body.message).toContain('DDD não encontrado');
});

test('deve retornar 200 ao consultar feriados de 2026', async ({ request }) => {
  const response = await getFeriados(request, 2026);
  expect(response.status()).toBe(200);
});

test('deve retornar 404 ao consultar ano fora do intervalo', async ({ request }) => {
  const response = await getFeriados(request, 2200);
  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body.message).toContain('Ano fora do intervalo suportado entre 1900 e 2199');
});

import { APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://brasilapi.com.br/api';

export async function getDDD(request: APIRequestContext, ddd: string) {
  return request.get(`${BASE_URL}/ddd/v1/${ddd}`);
}

export async function getFeriados(request: APIRequestContext, ano: number) {
  return request.get(`${BASE_URL}/feriados/v1/${ano}`);
}

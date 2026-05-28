import { apiClient } from '@/src/shared/api/axios-client';

export type LoginInput = { email: string; password: string };

export async function login(input: LoginInput) {
  const { data } = await apiClient.post('/auth/login', input);
  return data as { accessToken: string; refreshToken: string };
}

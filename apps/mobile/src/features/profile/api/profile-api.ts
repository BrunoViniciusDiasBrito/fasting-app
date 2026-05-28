import { apiClient } from '@/src/shared/api/axios-client';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  timezone: string;
  role: string;
  createdAt: string;
};

export async function fetchMe() {
  const { data } = await apiClient.get<UserProfile>('/me');
  return data;
}

export async function exportMyData() {
  const { data } = await apiClient.get('/me/export-data');
  return data;
}

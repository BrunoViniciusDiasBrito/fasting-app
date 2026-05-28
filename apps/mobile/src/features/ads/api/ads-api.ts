import { apiClient } from '@/src/shared/api/axios-client';

export async function fetchAdsStatus() {
  const { data } = await apiClient.get('/ads/status');
  return data as { showAds: boolean; reason: string };
}

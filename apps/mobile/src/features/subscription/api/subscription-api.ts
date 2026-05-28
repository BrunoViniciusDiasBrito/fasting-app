import { apiClient } from '@/src/shared/api/axios-client';

export async function fetchSubscriptionStatus() {
  const { data } = await apiClient.get('/subscriptions/status');
  return data as { hasSubscription: boolean; plan: string; adsEnabled: boolean };
}

export async function syncSubscription(planCode: string) {
  const { data } = await apiClient.post('/subscriptions/sync', { planCode });
  return data;
}

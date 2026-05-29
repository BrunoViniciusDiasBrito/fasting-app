import { apiClient } from '@/src/shared/api/axios-client';

export type Reminder = {
  id: string;
  type: 'HOURLY_FASTING' | 'SAFETY' | 'EATING_WINDOW_END' | 'BREAK_FAST';
  title: string;
  message: string;
  scheduledAt: string;
  enabled: boolean;
};

export async function fetchReminders() {
  const { data } = await apiClient.get<Reminder[]>('/reminders');
  return data;
}

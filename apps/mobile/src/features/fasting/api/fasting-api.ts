import { apiClient } from '@/src/shared/api/axios-client';

export type FastingSession = {
  id: string;
  startAt: string;
  expectedEndAt: string;
  endedAt?: string | null;
  status: 'ACTIVE' | 'PAUSED' | 'FINISHED' | 'CANCELLED';
  totalHours: number;
  pointsEarned: number;
  mood?: string | null;
  notes?: string | null;
};

export async function fetchCurrentFast() {
  const { data } = await apiClient.get<FastingSession | null>('/fasting-sessions/current');
  return data;
}

export async function fetchFastHistory() {
  const { data } = await apiClient.get<FastingSession[]>('/fasting-sessions/history');
  return data;
}

export async function startFast(hours = 16) {
  const startAt = new Date();
  const expectedEndAt = new Date(startAt.getTime() + hours * 60 * 60 * 1000);
  const { data } = await apiClient.post<FastingSession>('/fasting-sessions/start', {
    startAt: startAt.toISOString(),
    expectedEndAt: expectedEndAt.toISOString(),
  });
  return data;
}

export async function finishFast(id: string, mood = 'equilibrado') {
  const { data } = await apiClient.post<FastingSession>(`/fasting-sessions/${id}/finish`, { mood });
  return data;
}

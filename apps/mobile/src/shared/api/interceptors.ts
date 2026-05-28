import { AxiosError } from 'axios';
import { apiClient } from './axios-client';
import { tokenStorage } from '../storage/token-storage';
import { AuthTokens } from '../types/auth-tokens';

let isRefreshing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

function processQueue(token: string | null) {
  pendingQueue.forEach((cb) => cb(token));
  pendingQueue = [];
}

export function setupInterceptors() {
  apiClient.interceptors.request.use((config) => {
    const token = tokenStorage.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  apiClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalRequest = error.config;

      if (status === 401 && originalRequest && !originalRequest.headers['x-retried']) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            pendingQueue.push((token) => {
              if (!token) return reject(error);
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            });
          });
        }

        isRefreshing = true;
        originalRequest.headers['x-retried'] = 'true';

        try {
          const refreshToken = tokenStorage.getRefreshToken();
          if (!refreshToken) throw error;

          const { data } = await apiClient.post<AuthTokens>('/auth/refresh', { refreshToken });
          tokenStorage.setTokens(data.accessToken, data.refreshToken);
          processQueue(data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return apiClient(originalRequest);
        } catch (e) {
          tokenStorage.clear();
          processQueue(null);
          throw e;
        } finally {
          isRefreshing = false;
        }
      }

      throw error;
    },
  );
}

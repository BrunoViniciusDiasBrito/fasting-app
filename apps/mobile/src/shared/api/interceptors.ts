import { apiClient } from './axios-client';

export function setupInterceptors() {
  apiClient.interceptors.response.use((res) => res, (error) => Promise.reject(error));
}

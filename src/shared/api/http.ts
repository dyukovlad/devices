import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://dev-space.su/api/v1',
  timeout: 15000,
});

http.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const message =
      (typeof data === 'string' && data) || data?.message || error?.message || 'Произошла ошибка';
    return Promise.reject({ status, message, data });
  }
);

export type ApiError = { status?: number; message: string; data?: unknown };

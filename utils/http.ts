import { API_BASE_URL } from '@/constants/env';
import { getToken } from './cookies';
export const http = {
  request: async (url: string, method: string, body?: Request, options?: any) => {
    const defaultOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, defaultOptions);

      if (!response.ok) {
        const errorData = await response.json();

        console.log(errorData);

        console.log('실패');

        throw new Error(errorData.message || 'Request failed');
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  get: (url: string, options?: any) => http.request(url, 'GET', undefined, options),
  post: (url: string, body?: any, options?: any) => http.request(url, 'POST', body, options),
  put: (url: string, body?: any, options?: any) => http.request(url, 'PUT', body, options),
  delete: (url: string, options?: any) => http.request(url, 'DELETE', undefined, options),
};

import { HTTP_METHOD, COMMON_HEADERS } from '@/constants/api';
import { API_BASE_URL } from '@/constants/env';

class HttpClient {
  private baseURL: string | undefined;

  constructor(initialBaseURL: string | undefined) {
    this.baseURL = initialBaseURL;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      console.log('실패');
      throw new Error(errorData.message || 'Request failed');
    }
    return response.json();
  }

  private async request(url: string, method: string, body?: Request, options?: any) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method,
      headers: {
        ...COMMON_HEADERS,
        ...options.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    return this.handleResponse(response);
  }

  get(url: string, options = {}) {
    return this.request(url, HTTP_METHOD.GET, undefined, options);
  }

  post(url: string, body?: any, options = {}) {
    return this.request(url, HTTP_METHOD.POST, body, options);
  }

  put(url: string, body?: any, options = {}) {
    return this.request(url, HTTP_METHOD.PUT, body, options);
  }

  delete(url: string, options = {}) {
    return this.request(url, HTTP_METHOD.DELETE, undefined, options);
  }

  setBaseURL(newBaseURL: string) {
    this.baseURL = newBaseURL;
  }
}

export const httpClient = new HttpClient(API_BASE_URL);

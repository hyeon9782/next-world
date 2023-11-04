import { httpClient } from './http/httpClient';

export const getTags = async () => {
  return await httpClient.get('/tags');
};

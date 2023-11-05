import { httpClient } from './http/httpClient';

export const getTagsAPI = async () => {
  return await httpClient.get('/tags');
};

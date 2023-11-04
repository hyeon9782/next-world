import { httpClient } from './http/httpClient';

const getProfile = (username: string) => {
  return httpClient.get(`/profiles/${username}`);
};

export { getProfile };

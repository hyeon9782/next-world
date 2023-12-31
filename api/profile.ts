import { httpClient } from './http/httpClient';

const getProfileAPI = (username: string) => {
  return httpClient.get(`/profiles/${username}`);
};

const followAPI = (username: string, token: string) => {
  return httpClient.post(`/profiles/${username}/follow`, '', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const unFollowAPI = (username: string, token: string) => {
  return httpClient.delete(`/profiles/${username}/follow`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export { getProfileAPI, followAPI, unFollowAPI };

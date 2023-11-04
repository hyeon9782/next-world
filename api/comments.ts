import { httpClient } from './http/httpClient';

const getComments = (slug: string, token: string) => {
  return httpClient.get(`/articles/${slug}/comments`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const createComment = (slug: string, token: string, body: any) => {
  return httpClient.post(`/articles/${slug}/comments`, body, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const deleteComment = (slug: string, id: string, token: string) => {
  return httpClient.delete(`/articles/${slug}/comments/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export { getComments, createComment, deleteComment };

import { httpClient } from './http/httpClient';

const getComments = (slug: string) => {
  return httpClient.get(`/articles/${slug}/comments`);
};

const createComment = (slug: string) => {
  return httpClient.post(`/articles/${slug}/comments`);
};

const deleteComment = (slug: string, id: string) => {
  return httpClient.delete(`/articles/${slug}/comments/${id}`);
};

export { getComments, createComment, deleteComment };

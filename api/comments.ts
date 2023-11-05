import { httpClient } from './http/httpClient';

const getCommentsAPI = (slug: string, token: string) => {
  return httpClient.get(`/articles/${slug}/comments`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const createCommentAPI = (slug: string, token: string, body: any) => {
  console.log(body);
  console.log(token);

  return httpClient.post(`/articles/${slug}/comments`, body, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const deleteCommentAPI = (slug: string, id: string, token: string) => {
  return httpClient.delete(`/articles/${slug}/comments/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export { getCommentsAPI, createCommentAPI, deleteCommentAPI };

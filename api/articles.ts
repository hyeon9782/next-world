import { httpClient } from './http/httpClient';

const getArticlesAPI = (auth: string, offset = 0, limit = 20) => {
  return httpClient.get(`/articles?limit=${limit}&offset=${offset ? offset * limit : 0}`, {
    headers: {
      Authorization: `Token ${auth}`,
    },
  });
};

const getArticlesWithTagAPI = (tag: string, offset = 0, limit = 10) => {
  return httpClient.get(`/articles?tag=${tag}&limit=${limit}&offset=${offset ? offset * limit : 0}`);
};

const getArticlesWithAuthorAPI = (username: string, auth: string, offset = 0, limit = 10) => {
  return httpClient.get(`/articles?author=${username}&limit=${limit}&offset=${offset ? offset * limit : 0}`, {
    headers: {
      Authorization: `Token ${auth}`,
    },
  });
};

const getArticlesWithFavoritedAPI = (username: string, auth: string, offset = 0, limit = 10) => {
  return httpClient.get(`/articles?favorited=${username}&limit=${limit}&offset=${offset ? offset * limit : 0}`, {
    headers: {
      Authorization: `Token ${auth}`,
    },
  });
};

const getArticlesFeed = (offset = 0, auth: string, limit = 10) => {
  return httpClient.get(`/articles/feed?limit=${limit}&offset=${offset ? offset * limit : 0}`, {
    headers: {
      Authorization: `Token ${auth}`,
    },
  });
};

const getArticleAPI = (slug: string, token: string) => {
  return httpClient.get(`/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const favoriteArticle = async (slug: string, token: string) => {
  return await httpClient.post(`/articles/${slug}/favorite`, '', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const unFavoriteArticle = async (slug: string, token: string) => {
  return await httpClient.delete(`/articles/${slug}/favorite`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const createArticle = (token: string, body: any) => {
  return httpClient.post('/articles', body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
};

const updateArticle = (slug: string, token: string, body: any) => {
  return httpClient.put(`/articles/${slug}`, body, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const deleteArticle = (slug: string, token: string) => {
  return httpClient.delete(`/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export {
  getArticlesAPI,
  getArticlesWithAuthorAPI,
  getArticlesWithFavoritedAPI,
  getArticlesWithTagAPI,
  getArticlesFeed,
  getArticleAPI,
  favoriteArticle,
  unFavoriteArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};

import { Article } from '../api/articles';

export type ArticlesResponse = {
  pages: [
    {
      articles: Article[];
      articlesCount: number;
    },
  ];
  pageParams: number;
};

export type ArticleResponse = {
  message: string;
  success: boolean;
  data: {
    article: Article;
  };
};

import { getArticlesAPI, getArticlesWithTagAPI } from '@/services/articles';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RefObject } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

const useArticles = (ref: RefObject<HTMLElement>, tab: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['articles', tab],
    queryFn: async ({ pageParam = 0 }) => {
      switch (tab) {
        case 'global':
          return await getArticlesAPI(pageParam);
        case 'your':
          return fetch(`/api/articles/feed?page=${pageParam}`).then(res => res.json());
        default:
          return await getArticlesWithTagAPI(tab, pageParam);
      }
    },
    getNextPageParam: (lastPage, pages) => {
      const totalPage = Math.ceil(lastPage.articlesCount / 10);
      let currentPage = pages.length;
      if (lastPage.articlesCount < 11 || totalPage < pages.length) {
        return undefined;
      }

      return currentPage++;
    },
  });

  const nextPage = () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  };

  useIntersectionObserver(nextPage, ref);

  return { data };
};

export default useArticles;
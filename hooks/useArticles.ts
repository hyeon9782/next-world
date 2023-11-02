import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RefObject } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
import { HTTP_METHOD } from '@/constants/api';
import { ArticlesResponse } from '@/types/route/articles';

const useArticles = ({
  targetRef,
  tab = 'global',
  username = '',
}: {
  targetRef?: RefObject<HTMLElement> | undefined;
  tab?: string;
  username?: string;
}) => {
  const queryClient = useQueryClient();

  const origin = process.env.NODE_ENV === 'production' ? 'https://next-world-ten.vercel.app' : 'http://localhost:3000';

  const {
    data: articlesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['articles', tab],
    queryFn: async ({ pageParam = 0 }) => {
      let query = '';
      switch (tab) {
        case 'global':
          query = `?page=${pageParam}`;
          break;
        case 'my':
          query = `/my?username=${username}&page=${pageParam}`;
          break;
        case 'favorited':
          query = `?username=${username}&page=${pageParam}`;
          break;
        case 'your':
          query = `/feed?page=${pageParam}`;
          break;
        default:
          query = `/tag?tag=${tab}&page=${pageParam}`;
      }
      return await fetch(`${origin}/api/articles${query}`).then(res => res.json());
    },
    getNextPageParam: (lastPage, pages) => {
      const totalPage = Math.ceil(lastPage.articlesCount / 10);
      let currentPage = pages.length;
      if (lastPage.articlesCount < 11 || totalPage < pages.length) {
        return undefined;
      }
      return currentPage++;
    },
    enabled: !!targetRef,
    initialPageParam: 0,
  });

  const { mutate: favorite } = useMutation({
    mutationFn: async (slug: string) => {
      return await fetch('/api/articles/favorite', { method: HTTP_METHOD.POST, body: JSON.stringify({ slug }) }).then(
        res => res.json()
      );
    },
    onMutate: async (slug: string) => {
      await queryClient.cancelQueries({ queryKey: ['articles', tab] });
      const previousArticles: ArticlesResponse | undefined = queryClient.getQueryData(['articles', tab]);

      if (previousArticles) {
        const newArticles = previousArticles.pages.map(page => {
          const newArticles = page.articles.map(article => {
            if (article.slug === slug) {
              return {
                ...article,
                favorited: true,
                favoritesCount: article.favoritesCount + 1,
              };
            }
            return article;
          });

          return {
            ...page,
            articles: newArticles,
          };
        });

        queryClient.setQueriesData({ queryKey: ['articles', tab] }, (old: any) => ({
          ...old,
          pages: [...newArticles],
        }));

        return { previousArticles };
      }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['articles', tab], context?.previousArticles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['articles', tab] });
    },
  });

  const { mutate: unFavorite } = useMutation({
    mutationFn: async (slug: string) => {
      return await fetch(`${origin}/api/articles/favorite`, {
        method: HTTP_METHOD.DELETE,
        body: JSON.stringify({ slug }),
      }).then(res => res.json());
    },
    onMutate: async (slug: string) => {
      await queryClient.cancelQueries({ queryKey: ['articles', tab] });
      const previousArticles: ArticlesResponse | undefined = queryClient.getQueryData(['articles', tab]);

      if (previousArticles) {
        const newArticles = previousArticles.pages.map(page => {
          const newArticles = page.articles.map(article => {
            if (article.slug === slug) {
              return {
                ...article,
                favorited: false,
                favoritesCount: article.favoritesCount - 1,
              };
            }
            return article;
          });

          return {
            ...page,
            articles: newArticles,
          };
        });

        queryClient.setQueriesData({ queryKey: ['articles', tab] }, (old: any) => ({
          ...old,
          pages: [...newArticles],
        }));

        return { previousArticles };
      }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['articles', tab], context?.previousArticles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['articles', tab] });
    },
  });

  const { mutate: deleteAritlce } = useMutation({
    mutationFn: async (slug: string) => {
      return fetch(`${origin}/api/articles/${slug}`, { method: HTTP_METHOD.DELETE }).then(res => res.json());
    },
  });

  const nextPage = () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  };

  useIntersectionObserver(nextPage, targetRef);

  return { articlesData, favorite, unFavorite, deleteAritlce };
};

export default useArticles;

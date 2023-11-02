import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { RefObject } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
import { HTTP_METHOD } from '@/constants/api';

const useArticles = ({
  targetRef,
  tab = 'global',
  username = '',
  onSuccess,
  onError,
}: {
  targetRef?: RefObject<HTMLElement> | undefined;
  tab?: string;
  username?: string;
  onSuccess?: (res?: any) => void;
  onError?: (err?: any) => void;
}) => {
  // const queryClient = useQueryClient();
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
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
      return await fetch(`${currentOrigin}/api/articles${query}`).then(res => res.json());
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
    onSuccess,
    onError,
    // onMutate: async newArticles => {
    //   console.log('커스텀 훅');
    //   console.log(newArticles);

    //   await queryClient.cancelQueries({ queryKey: ['articles', tab] });
    //   const previousArticles = queryClient.getQueryData(['articles', tab]);

    //   queryClient.setQueriesData(['articles', tab], old => [...old, newArticles]);

    //   return { previousArticles };
    // },
    // onError: (err, newTodo, context) => {
    //   queryClient.setQueryData(['articles', tab], context.previousArticles);
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['articles', tab] });
    // },
  });

  const { mutate: unFavorite } = useMutation({
    mutationFn: async (slug: string) => {
      return await fetch(`${currentOrigin}/api/articles/favorite`, {
        method: HTTP_METHOD.DELETE,
        body: JSON.stringify({ slug }),
      }).then(res => res.json());
    },
    onSuccess,
    onError,
  });

  const { mutate: deleteAritlce } = useMutation({
    mutationFn: async (slug: string) => {
      return fetch(`${currentOrigin}/api/articles/${slug}`, { method: HTTP_METHOD.DELETE }).then(res => res.json());
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

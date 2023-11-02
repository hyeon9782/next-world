import { HTTP_METHOD } from '@/constants/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useArticle = ({ slug }: { slug: string }) => {
  const queryClient = useQueryClient();
  const origin = process.env.NODE_ENV === 'production' ? 'https://next-world-ten.vercel.app' : 'http://localhost:3000';

  const { data: article } = useQuery({
    queryKey: ['article', slug],
    queryFn: async () => await fetch(`${origin}/api/articles/${slug}`).then(res => res.json()),
    select: res => res.data.article,
  });

  const { mutate: favorite } = useMutation({
    mutationFn: async (slug: string) => {
      return await fetch('/api/articles/favorite', { method: HTTP_METHOD.POST, body: JSON.stringify({ slug }) }).then(
        res => res.json()
      );
    },
    onMutate: async (slug: string) => {
      await queryClient.cancelQueries({ queryKey: ['article', slug] });
      const previousArticle = queryClient.getQueryData(['article', slug]);
      const newArticle = {
        ...previousArticle,
        data: {
          ...previousArticle.data,
          article: {
            ...previousArticle.data.article,
            favorited: true,
            favoritesCount: previousArticle.data.article.favoritesCount + 1,
          },
        },
      };

      console.log(newArticle);

      queryClient.setQueriesData({ queryKey: ['article', slug] }, () => newArticle);

      return { previousArticle };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['article', slug], context.previousArticle);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['article', slug] });
    },
  });

  const { mutate: unFavorite } = useMutation({
    mutationFn: async (slug: string) => {
      return await fetch('/api/articles/favorite', { method: HTTP_METHOD.POST, body: JSON.stringify({ slug }) }).then(
        res => res.json()
      );
    },
    onMutate: async (slug: string) => {
      await queryClient.cancelQueries({ queryKey: ['article', slug] });
      const previousArticle = queryClient.getQueryData(['article', slug]);
      const newArticle = {
        ...previousArticle,
        data: {
          ...previousArticle.data,
          article: {
            ...previousArticle.data.article,
            favorited: false,
            favoritesCount: previousArticle.data.article.favoritesCount - 1,
          },
        },
      };

      console.log(newArticle);

      queryClient.setQueriesData({ queryKey: ['article', slug] }, () => newArticle);

      return { previousArticle };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['article', slug], context.previousArticle);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['article', slug] });
    },
  });

  return { article, favorite, unFavorite };
};

export default useArticle;

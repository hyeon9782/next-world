import { HTTP_METHOD } from '@/constants/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useProfile = ({ username, slug }: { username?: string; slug: string }) => {
  const queryClient = useQueryClient();
  const origin = process.env.NODE_ENV === 'production' ? 'https://next-world-ten.vercel.app' : 'http://localhost:3000';
  const { data: profile } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => fetch(`${origin}/api/profiles/${username}`, { method: HTTP_METHOD.GET }).then(res => res.json()),
    enabled: !!username,
    select: res => res.response.profile,
  });

  const { mutate: follow } = useMutation({
    mutationFn: async (username: string) => {
      return fetch(`${origin}/api/profiles/${username}`, { method: HTTP_METHOD.POST }).then(res => res.json());
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['article', slug] });
      const previousArticle = queryClient.getQueryData(['article', slug]);
      const newArticle = {
        ...previousArticle,
        data: {
          ...previousArticle.data,
          article: {
            ...previousArticle.data.article,
            author: {
              ...previousArticle.data.article.author,
              following: true,
            },
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

  const { mutate: unFollow } = useMutation({
    mutationFn: async (username: string) => {
      return fetch(`${origin}/api/profiles/${username}`, { method: HTTP_METHOD.DELETE }).then(res => res.json());
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['article', slug] });
      const previousArticle = queryClient.getQueryData(['article', slug]);
      const newArticle = {
        ...previousArticle,
        data: {
          ...previousArticle.data,
          article: {
            ...previousArticle.data.article,
            author: {
              ...previousArticle.data.article.author,
              following: false,
            },
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

  return { profile, follow, unFollow };
};

export default useProfile;

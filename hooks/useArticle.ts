import { modals } from '@/composables/Modals';
import { HTTP_METHOD } from '@/constants/api';
import useModalsStore from '@/stores/useModalStore';
import { NewArticle } from '@/types/api/articles';
import { ArticleResponse } from '@/types/route/articles';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useArticle = ({ slug }: { slug: string | undefined }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openModal, closeModal } = useModalsStore();

  const { data: article } = useQuery({
    queryKey: ['article', slug],
    queryFn: async () => await fetch(`/api/articles/${slug}`).then(res => res.json()),
    enabled: !!slug,
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
      const previousArticle: ArticleResponse | undefined = queryClient.getQueryData(['article', slug]);

      if (previousArticle) {
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

        queryClient.setQueriesData({ queryKey: ['article', slug] }, () => newArticle);

        return { previousArticle };
      }
    },
    onError: (err, _, context) => {
      console.error(err.message);
      router.push('/login');
      queryClient.setQueryData(['article', slug], context?.previousArticle);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['article', slug] });
    },
  });

  const { mutate: unFavorite } = useMutation({
    mutationFn: async (slug: string) => {
      return await fetch('/api/articles/favorite', { method: HTTP_METHOD.DELETE, body: JSON.stringify({ slug }) }).then(
        res => res.json()
      );
    },
    onMutate: async (slug: string) => {
      await queryClient.cancelQueries({ queryKey: ['article', slug] });
      const previousArticle: ArticleResponse | undefined = queryClient.getQueryData(['article', slug]);

      if (previousArticle) {
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

        queryClient.setQueriesData({ queryKey: ['article', slug] }, () => newArticle);

        return { previousArticle };
      }
    },
    onError: (err, _, context) => {
      console.error(err.message);
      queryClient.setQueryData(['article', slug], context?.previousArticle);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['article', slug] });
    },
  });

  const { mutate: follow } = useMutation({
    mutationFn: async (username: string) => {
      return fetch(`/api/profiles/${username}`, { method: HTTP_METHOD.POST }).then(res => res.json());
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['article', slug] });
      const previousArticle: ArticleResponse | undefined = queryClient.getQueryData(['article', slug]);
      if (previousArticle) {
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

        queryClient.setQueriesData({ queryKey: ['article', slug] }, () => newArticle);

        return { previousArticle };
      }
    },
    onError: (err, _, context) => {
      console.error(err.message);
      router.push('/login');
      queryClient.setQueryData(['article', slug], context?.previousArticle);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['article', slug] });
    },
  });

  const { mutate: unFollow } = useMutation({
    mutationFn: async (username: string) => {
      return fetch(`/api/profiles/${username}`, { method: HTTP_METHOD.DELETE }).then(res => res.json());
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['article', slug] });
      const previousArticle: ArticleResponse | undefined = queryClient.getQueryData(['article', slug]);
      if (previousArticle) {
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
      }
    },
    onError: (err, _, context) => {
      console.error(err.message);
      queryClient.setQueryData(['article', slug], context?.previousArticle);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['article', slug] });
    },
  });

  const { mutate: createArticle } = useMutation({
    mutationFn: async (formData: NewArticle) =>
      await fetch('/api/articles/new', {
        method: HTTP_METHOD.POST,
        body: JSON.stringify({ article: formData }),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articles', 'global'],
      });
      router.push('/');
    },
    onError: (error: any) => {
      openModal(modals.alert, {
        title: '',
        content: '게시글 생성에 실패했습니다!',
        onClose: () => {
          closeModal(modals.alert);
        },
      });
      console.error(error);
    },
  });

  const { mutate: updateArticle } = useMutation({
    mutationFn: async (formData: NewArticle) =>
      await fetch(`/api/articles/${slug}`, {
        method: HTTP_METHOD.PUT,
        body: JSON.stringify({ article: formData }),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articles', 'global'],
      });
      router.push('/');
    },
    onError: (error: any) => {
      openModal(modals.alert, {
        title: '',
        content: '게시글 수정에 실패했습니다!',
        onClose: () => {
          closeModal(modals.alert);
        },
      });
      console.error(error);
    },
  });

  return { article, favorite, unFavorite, follow, unFollow, createArticle, updateArticle };
};

export default useArticle;

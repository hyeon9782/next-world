import { HTTP_METHOD } from '@/constants/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useProfile = ({ username }: { username?: string }) => {
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
      await queryClient.cancelQueries({ queryKey: ['profile', username] });
      const previousProfile = queryClient.getQueryData(['profile', username]);
      const newProfile = {
        ...previousProfile,
        response: {
          ...previousProfile.response,
          profile: {
            ...previousProfile.response.profile,
            following: true,
          },
        },
      };

      console.log(newProfile);

      queryClient.setQueriesData({ queryKey: ['profile', username] }, () => newProfile);

      return { newProfile };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['profile', username], context.newProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', username] });
    },
  });

  const { mutate: unFollow } = useMutation({
    mutationFn: async (username: string) => {
      return fetch(`${origin}/api/profiles/${username}`, { method: HTTP_METHOD.DELETE }).then(res => res.json());
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['profile', username] });
      const previousProfile = queryClient.getQueryData(['profile', username]);
      const newProfile = {
        ...previousProfile,
        response: {
          ...previousProfile.response,
          profile: {
            ...previousProfile.response.profile,
            following: false,
          },
        },
      };

      console.log(newProfile);

      queryClient.setQueriesData({ queryKey: ['profile', username] }, () => newProfile);

      return { newProfile };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['profile', username], context.newProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', username] });
    },
  });

  return { profile, follow, unFollow };
};

export default useProfile;

import { HTTP_METHOD } from '@/constants/api';
import { ProfileResponse } from '@/types/route/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useProfile = ({ username }: { username?: string }) => {
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => fetch(`/api/profiles/${username}`, { method: HTTP_METHOD.GET }).then(res => res.json()),
    enabled: !!username,
    select: res => res.response.profile,
  });

  const { mutate: follow } = useMutation({
    mutationFn: async (username: string) => {
      return fetch(`/api/profiles/${username}`, { method: HTTP_METHOD.POST }).then(res => res.json());
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['profile', username] });
      const previousProfile: ProfileResponse | undefined = queryClient.getQueryData(['profile', username]);

      if (previousProfile) {
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

        queryClient.setQueriesData({ queryKey: ['profile', username] }, () => newProfile);

        return { newProfile };
      }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['profile', username], context?.newProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', username] });
    },
  });

  const { mutate: unFollow } = useMutation({
    mutationFn: async (username: string) => {
      return fetch(`/api/profiles/${username}`, { method: HTTP_METHOD.DELETE }).then(res => res.json());
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['profile', username] });
      const previousProfile: ProfileResponse | undefined = queryClient.getQueryData(['profile', username]);

      if (previousProfile) {
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

        queryClient.setQueriesData({ queryKey: ['profile', username] }, () => newProfile);

        return { newProfile };
      }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['profile', username], context?.newProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', username] });
    },
  });

  return { profile, follow, unFollow };
};

export default useProfile;

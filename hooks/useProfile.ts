import { HTTP_METHOD } from '@/constants/api';
import { useMutation, useQuery } from '@tanstack/react-query';

const useProfile = ({
  username,
  onSuccess,
  onError,
}: {
  username?: string;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
}) => {
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  console.log(currentOrigin);
  const { data: profile } = useQuery({
    queryKey: ['profile', username],
    queryFn: () =>
      fetch(`${currentOrigin}/api/profiles/${username}`, { method: HTTP_METHOD.GET }).then(res => res.json()),
    enabled: !!username,
    select: res => res.response.profile,
  });

  const { mutate: follow } = useMutation({
    mutationFn: async (username: string) => {
      return fetch(`${currentOrigin}/api/profiles/${username}`, { method: HTTP_METHOD.POST }).then(res => res.json());
    },
    onSuccess,
    onError,
  });

  const { mutate: unFollow } = useMutation({
    mutationFn: async (username: string) => {
      return fetch(`${currentOrigin}/api/profiles/${username}`, { method: HTTP_METHOD.DELETE }).then(res => res.json());
    },
    onSuccess,
    onError,
  });

  return { profile, follow, unFollow };
};

export default useProfile;

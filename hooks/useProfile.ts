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
  const origin = process.env.NODE_ENV === 'production' ? 'https://next-world-ten.vercel.app/' : 'http://localhost:3000';
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
    onSuccess,
    onError,
  });

  const { mutate: unFollow } = useMutation({
    mutationFn: async (username: string) => {
      return fetch(`${origin}/api/profiles/${username}`, { method: HTTP_METHOD.DELETE }).then(res => res.json());
    },
    onSuccess,
    onError,
  });

  return { profile, follow, unFollow };
};

export default useProfile;

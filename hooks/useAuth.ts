import { LoginUser, NewUser } from '@/types/api/users';
import { useMutation } from '@tanstack/react-query';
// 로그인 / 로그아웃 / 회원가입 / 로그인 확인
const useAuth = ({ onSuccess, onError }: { onSuccess: (arg: any) => void; onError?: () => void }) => {
  // 로그인
  const { mutate: login } = useMutation({
    mutationFn: async (loginUser: LoginUser) =>
      await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ ...loginUser }) }).then(res =>
        res.json()
      ),
    onSuccess,
    onError,
  });

  // 회원가입
  const { mutate: signup } = useMutation({
    mutationFn: async (newUser: NewUser) =>
      await fetch('/api/auth/signup', { method: 'POST', body: JSON.stringify({ ...newUser }) }).then(res => res.json()),
    onSuccess,
    onError,
  });

  // 로그아웃
  const { mutate: signOut } = useMutation({
    mutationFn: async () => await fetch('/api/auth/logout').then(res => res.json()),
    onSuccess,
    onError,
  });

  return { login, signup, signOut };
};

export default useAuth;

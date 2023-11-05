import { modals } from '@/composables/Modals';
import { HTTP_METHOD } from '@/constants/api';
import useModalsStore from '@/stores/useModalStore';
import { LoginUser, NewUser } from '@/types/api/users';
import { useMutation } from '@tanstack/react-query';

// 로그인 / 로그아웃 / 회원가입
const useAuth = ({ onSuccess, onError }: { onSuccess: (arg: any) => void; onError?: () => void }) => {
  const { openModal, closeModal } = useModalsStore();
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

  //
  const { mutate: updateUser } = useMutation({
    mutationFn: (formData: any) =>
      fetch('/api/auth/user', { method: HTTP_METHOD.PUT, body: JSON.stringify(formData) }).then(res => res.json()),
    onSuccess,
    onError: () => {
      openModal(modals.alert, {
        title: '',
        content: '회원 정보 변경에 실패했습니다.',
        onClose: () => {
          closeModal(modals.alert);
        },
      });
    },
  });

  return { login, signup, signOut, updateUser };
};

export default useAuth;

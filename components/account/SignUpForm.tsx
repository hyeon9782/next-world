'use client';

import { modals } from '@/composables/Modals';
import useAuth from '@/hooks/useAuth';
import useModalsStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { form } from '@/styles/account.css';
import { fillGreenButton, input } from '@/styles/common.css';
import { buttonBox } from '@/styles/layout.css';
import { NewUser } from '@/types/api/users';
import { UserAction } from '@/types/store/userStore';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const SignUpForm = () => {
  const router = useRouter();
  const { saveUserInfo } = useUserStore() as UserAction;
  const { openModal, closeModal } = useModalsStore();
  const [newUser, setNewUser] = useState<NewUser>({
    username: '',
    email: '',
    password: '',
  });

  const onSuccess = (res: any) => {
    saveUserInfo({
      ...res.user,
    });
    router.push('/');
  };

  const onError = () => {
    openModal(modals.alert, {
      title: '',
      content: '회원가입에 실패했습니다.',
      onClose: () => {
        closeModal(modals.alert);
      },
    });
    setNewUser({
      username: '',
      email: '',
      password: '',
    });
  };

  const { signup } = useAuth({ onSuccess, onError });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signup({
      ...newUser,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={form}>
      <input
        type="text"
        name="username"
        className={input}
        placeholder="Username"
        onChange={handleChange}
        value={newUser.username}
        required
      />
      <input
        type="email"
        name="email"
        className={input}
        placeholder="Email"
        onChange={handleChange}
        value={newUser.email}
        required
      />
      <input
        type="password"
        name="password"
        className={input}
        placeholder="Password"
        onChange={handleChange}
        value={newUser.password}
        required
      />
      <div className={buttonBox}>
        <input type="submit" className={fillGreenButton} value="Sign up" disabled={false} />
      </div>
    </form>
  );
};

export default SignUpForm;

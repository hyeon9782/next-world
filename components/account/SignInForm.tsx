'use client';
import { modals } from '@/composables/Modals';
import useAuth from '@/hooks/useAuth';
import useModals from '@/hooks/useModals';
import useUserStore from '@/stores/useUserStore';
import { form } from '@/styles/account.css';
import { fillGreenButton, input } from '@/styles/common.css';
import { buttonBox } from '@/styles/layout.css';
import { LoginUser, UserResponse } from '@/types/api/users';
import { UserAction } from '@/types/store/userStore';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const SignInForm = () => {
  const router = useRouter();
  const { saveUserInfo } = useUserStore() as UserAction;

  const { openModal, closeModal } = useModals();

  const [loginUser, setLoginUser] = useState<LoginUser>({
    email: '',
    password: '',
  });

  const loginSuccess = (res: UserResponse) => {
    saveUserInfo({ ...res.user });
    router.push('/');
  };

  const loginError = (err: Error) => {
    console.error(err.message);
    alert('이메일 또는 비밀번호가 잘못되었습니다.');
  };

  const { login } = useAuth({ loginSuccess, loginError });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      ...loginUser,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={input}
          onChange={handleChange}
          value={loginUser.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={input}
          onChange={handleChange}
          value={loginUser.password}
          required
        />
        <div className={buttonBox}>
          <input type="submit" value={'Sign in'} className={fillGreenButton} disabled={false} />
        </div>
      </form>
      <button
        className={fillGreenButton}
        onClick={() =>
          openModal(modals.confirm, {
            title: 'Next World',
            content: '컨펌 모달 입니다.',
            onClose: () => {
              console.log('닫기');
              closeModal(modals.confirm);
            },
            onSubmit: () => {
              console.log('확인');
              closeModal(modals.confirm);
            },
          })
        }
      >
        모달
      </button>
    </>
  );
};

export default SignInForm;

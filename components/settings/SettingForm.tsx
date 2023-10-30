'use client';
import { modals } from '@/composables/Modals';
import { HTTP_METHOD } from '@/constants/api';
import useModalsStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { articleTextarea } from '@/styles/article.css';
import { input } from '@/styles/common.css';
import { settingForm, updateButton } from '@/styles/settings.css';
import { User } from '@/types/api/users';
import { UserAction } from '@/types/store/userStore';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SettingForm = () => {
  const router = useRouter();

  const { openModal, closeModal } = useModalsStore();

  const { updateUser, email, username, image, bio } = useUserStore() as User & UserAction;

  // 초기화 함수로 전환
  const [formData, setFormData] = useState({
    image,
    username,
    bio: bio ? bio : '',
    email,
    password: '',
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: any) =>
      fetch('/api/auth/user', { method: HTTP_METHOD.PUT, body: JSON.stringify(formData) }).then(res => res.json()),
    onSuccess: () => {
      updateUser({
        ...formData,
      });
      openModal(modals.alert, {
        title: '',
        content: '회원 정보를 변경했습니다.',
        onClose: () => {
          closeModal(modals.alert);
          router.push(`/@${username}`);
        },
      });
    },
    onError: () => {
      alert('실패');
    },
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    mutate({
      ...formData,
      password: formData && formData.password,
    });
  };

  const handleChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <form onSubmit={handleSubmit} className={settingForm}>
      <input
        type="text"
        name="iamge"
        className={input}
        placeholder="URL of profile picture"
        value={formData.image}
        onChange={handleChange}
        readOnly={isLoading}
      />
      <input
        type="text"
        name="username"
        className={input}
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        readOnly={isLoading}
      />
      <textarea
        rows={8}
        name="bio"
        className={articleTextarea}
        placeholder="Short bio about you"
        value={formData.bio}
        onChange={handleChange}
        readOnly={isLoading}
      ></textarea>
      <input
        type="email"
        name="email"
        className={input}
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        readOnly={isLoading}
      />
      <input
        type="password"
        name="password"
        className={input}
        placeholder="New Password"
        value={formData.password}
        onChange={handleChange}
        readOnly={isLoading}
      />
      <div>
        <input type="submit" className={updateButton} value="Update Settings" />
      </div>
    </form>
  );
};

export default SettingForm;

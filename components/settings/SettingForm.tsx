'use client';

import { modals } from '@/composables/Modals';
import useAuth from '@/hooks/useAuth';
import useModalsStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { articleTextarea } from '@/styles/article.css';
import { hr, input } from '@/styles/common.css';
import { settingForm, updateButton } from '@/styles/settings.css';
import { User } from '@/types/api/users';
import { UserAction } from '@/types/store/userStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SettingForm = () => {
  const { updateUserStore, email, username, image, bio } = useUserStore() as User & UserAction;
  const { openModal, closeModal } = useModalsStore();
  const router = useRouter();

  // 초기화 함수로 전환
  const [formData, setFormData] = useState({
    image,
    username,
    bio: bio ? bio : '',
    email,
    password: '',
  });

  const onSuccess = () => {
    updateUserStore({
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
  };

  const { updateUser } = useAuth({ onSuccess });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    updateUser({
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
    <>
      <form onSubmit={handleSubmit} className={settingForm}>
        <input
          type="text"
          name="iamge"
          className={input}
          placeholder="URL of profile picture"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          className={input}
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <textarea
          rows={2}
          name="bio"
          className={articleTextarea}
          placeholder="Short bio about you"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>
        <input
          type="email"
          name="email"
          className={input}
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className={input}
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
        />
        <div>
          <input type="submit" className={updateButton} value="Update Settings" />
        </div>
        <div className={hr} />
      </form>
    </>
  );
};

export default SettingForm;

'use client';

import ArticleList from '@/components/article/ArticleList';
import ProfileBox from '@/components/profile/ProfileBox';
import useProfile from '@/hooks/useProfile';
import { container } from '@/styles/common.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ArticleTab = dynamic(() => import('@/components/article/ArticleTab'), { ssr: false });

type Props = {
  params: { usernameParam: string };
};

const ProfilePage = ({ params: { usernameParam } }: Props) => {
  const {
    profile: { username, following, image },
  } = useProfile({ username: usernameParam });

  return (
    <section>
      <ProfileBox username={username} following={following} image={image} />
      <div className={container}>
        <ArticleTab />
        <Suspense fallback={<div>리스트 로딩 중...</div>}>
          <ArticleList username={username} />
        </Suspense>
      </div>
    </section>
  );
};

export default ProfilePage;

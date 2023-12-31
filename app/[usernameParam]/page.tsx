'use client';

import ArticleList from '@/components/article/ArticleList';
import ArticleListSkeleton from '@/components/article/ArticleListSkeleton';
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
    follow,
    unFollow,
  } = useProfile({ username: usernameParam });

  return (
    <section>
      <ProfileBox username={username} following={following} image={image} follow={follow} unFollow={unFollow} />
      <div className={container}>
        <ArticleTab />
        <Suspense fallback={<ArticleListSkeleton />}>
          <ArticleList username={username} />
        </Suspense>
      </div>
    </section>
  );
};

export default ProfilePage;

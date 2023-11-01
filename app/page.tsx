// import ArticleList from '@/components/article/ArticleList';
import ArticleListSkeleton from '@/components/article/ArticleListSkeleton';
import SideBar from '@/components/layouts/SideBar';
import SkeletonElement from '@/composables/SkeletonElement';
import getQueryClient from '@/libs/getQueryClient';

import { articleContainer } from '@/styles/article.css';
import { container, flex, textCenter } from '@/styles/common.css';
import { bannerDescription, bannerTitle } from '@/styles/home.css';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Suspense, lazy } from 'react';

const ArticleTab = dynamic(() => import('@/components/article/ArticleTab'), { ssr: false });
// const ArticleList = dynamic(() => import('@/components/article/ArticleList'));
const ArticleList = lazy(() => import('@/components/article/ArticleList'));
// const SkeletonElement = dynamic(() => import('@/composables/SkeletonElement'), { ssr: false });
const Banner = dynamic(() => import('@/components/layouts/Banner'), { ssr: false });

export default async function HomePage() {
  // const queryClient = getQueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['articles', 'global'],
  //   queryFn: async () => await fetch(`/api/articles?page=0`).then(res => res.json()),
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <section>
      <Banner background="green">
        <div className={textCenter}>
          <h1 className={bannerTitle}>conduit</h1>
          <p className={bannerDescription}>A place to share your knowledge.</p>
        </div>
      </Banner>

      <main className={container}>
        <div className={flex}>
          <div className={articleContainer}>
            <ArticleTab />

            <Suspense fallback={<ArticleListSkeleton />}>
              <ArticleList />
            </Suspense>
          </div>
          <SideBar />
        </div>
      </main>
    </section>
    // </HydrationBoundary>
  );
}

import SideBar from '@/components/layouts/SideBar';
import ArticleListSkeleton from '@/components/article/ArticleListSkeleton';

import { articleContainer } from '@/styles/article.css';
import { container, textCenter, flex } from '@/styles/common.css';
import { bannerDescription, bannerTitle } from '@/styles/home.css';
import dynamic from 'next/dynamic';

const ArticleTab = dynamic(() => import('@/components/article/ArticleTab'), { ssr: false });
const ArticleList = dynamic(() => import('@/components/article/ArticleList'), {
  loading: () => <ArticleListSkeleton />,
  ssr: false,
});
const Banner = dynamic(() => import('@/components/layouts/Banner'), { ssr: false });

export default function HomePage() {
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
            <ArticleList />
          </div>
          <SideBar />
        </div>
      </main>
    </section>
    // </HydrationBoundary>
  );
}

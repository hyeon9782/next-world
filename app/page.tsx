import SideBar from '@/components/layouts/SideBar';
import ArticleListSkeleton from '@/components/article/ArticleListSkeleton';

import { articleContainer } from '@/styles/article.css';
import { container, textCenter } from '@/styles/common.css';
import { bannerDescription, bannerTitle, homeContainer, homeSection } from '@/styles/home.css';
import dynamic from 'next/dynamic';

const ArticleTab = dynamic(() => import('@/components/article/ArticleTab'), { ssr: false });
const ArticleList = dynamic(() => import('@/components/article/ArticleList'), {
  loading: () => <ArticleListSkeleton />,
  ssr: false,
});
const Banner = dynamic(() => import('@/components/layouts/Banner'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <Banner background="green">
        <div className={textCenter}>
          <h1 className={bannerTitle}>conduit</h1>
          <p className={bannerDescription}>A place to share your knowledge.</p>
        </div>
      </Banner>
      <main className={homeContainer}>
        <div className={articleContainer}>
          <ArticleTab />
          <ArticleList />
        </div>
        <SideBar />
      </main>
    </>
  );
}

import ArticleList from '@/components/article/ArticleList';
import ArticleTab from '@/components/article/ArticleTab';
import Banner from '@/components/layouts/Banner';
import SideBar from '@/components/layouts/SideBar';
import { articleContainer } from '@/styles/article.css';
import { container, flex } from '@/styles/common.css';
import { bannerDescription, bannerTitle } from '@/styles/home.css';

export default function Page() {
  return (
    <section>
      <Banner background="green">
        <h1 className={bannerTitle}>conduit</h1>
        <p className={bannerDescription}>A place to share your knowledge.</p>
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
  );
}

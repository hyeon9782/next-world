'use client';
import { articleDescription, articleMeta, articlePreview, articleReadMore, articleTitle } from '@/styles/article.css';
import UserBox from '../user/UserBox';
import TagList from '../tags/TagList';
import { useRouter } from 'next/navigation';
import { flexBetween } from '@/styles/common.css';
import { Article } from '@/types/api/articles';
import HeartButton from './HeartButton';

type Props = {
  article: Article;
};
const ArticlePreview = ({
  article: { title, description, favorited, favoritesCount, tagList, author, createdAt, slug = 'asd' },
}: Props) => {
  const router = useRouter();
  return (
    <div className={articlePreview}>
      <div className={articleMeta}>
        <UserBox author={author} createdAt={createdAt} />
        <HeartButton favorited={favorited} favoritesCount={favoritesCount} slug={slug} />
      </div>
      <div onClick={() => router.push(`/article/${slug}`)}>
        <div className={articleTitle}>{title}</div>
        <div className={articleDescription}>{description}</div>
        <div className={flexBetween}>
          <span className={articleReadMore}>Read more...</span>
          <TagList tags={tagList} />
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;

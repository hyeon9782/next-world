'use client';
import { articleDescription, articleMeta, articlePreview, articleReadMore, articleTitle } from '@/styles/article.css';
import UserBox from '../user/UserBox';
import TagList from '../tags/TagList';
import { useRouter } from 'next/navigation';
import { FillHeartIcon } from '@/composables/icons';
import { fillGreenButton, flex, flexBetween, greenButton } from '@/styles/common.css';
import { useQueryClient } from '@tanstack/react-query';
import useCurrentTab from '@/stores/useCurrentTab';
import useArticles from '@/hooks/useArticles';
import { Article } from '@/types/api/articles';
import ToggleButton from '@/composables/ToggleButton';
import { useEffect, useState } from 'react';

type Props = {
  article: Article;
};
const ArticlePreview = ({
  article: { title, description, favorited, favoritesCount, tagList, author, createdAt, slug = 'asd' },
}: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const { tab } = useCurrentTab();

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['articles', tab] });
  };

  const onError = () => {
    // 권한이 없을 경우 login 페이지로 이동
    router.push('/login');
  };

  const { favorite, unFavorite } = useArticles({ onSuccess, onError });

  const handleButtonClick = (slug: string) => {
    if (favorited) {
      unFavorite(slug);
    } else {
      favorite(slug);
    }
  };

  useEffect(() => {
    if (favorited) {
      setIsFavorite(true);
      return;
    }

    setIsFavorite(false);
  }, [favorited]);

  return (
    <div className={articlePreview}>
      <div className={articleMeta}>
        <UserBox author={author} createdAt={createdAt} />
        {/* <ToggleButton onIcon={<FillHeartIcon />} offIcon={} onToggle={handleButtonClick} toggled={favorited} /> */}
        <button
          onClick={() => handleButtonClick(slug)}
          className={isFavorite ? `${fillGreenButton}` : `${greenButton}`}
        >
          <div className={flex}>
            <FillHeartIcon /> &nbsp;
            {favoritesCount}
          </div>
        </button>
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

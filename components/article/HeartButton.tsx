'use client';
import { FillHeartIcon } from '@/composables/icons';
import useArticles from '@/hooks/useArticles';
import useCurrentTab from '@/stores/useCurrentTab';
import { fillGreenButton, flex, greenButton } from '@/styles/common.css';

const HeartButton = ({
  favorited,
  favoritesCount,
  slug,
}: {
  favorited: boolean | undefined;
  favoritesCount: number;
  slug: string;
}) => {
  const { tab } = useCurrentTab();
  const { favorite, unFavorite } = useArticles({ tab });
  const handleButtonClick = (slug: string) => {
    if (favorited) {
      unFavorite(slug);
    } else {
      favorite(slug);
    }
  };
  return (
    <button onClick={() => handleButtonClick(slug)} className={favorited ? `${fillGreenButton}` : `${greenButton}`}>
      <div className={flex}>
        <FillHeartIcon /> &nbsp;
        {favoritesCount}
      </div>
    </button>
  );
};

export default HeartButton;

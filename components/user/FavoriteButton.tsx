'use client';
import Button from '@/composables/Button';
import { FillHeartIcon } from '@/composables/icons';

const FavoriteButton = ({
  favorited,
  favoritesCount,
  favorite,
  unFavorite,
  slug,
}: {
  favorited: boolean;
  favoritesCount: number;
  favorite: any;
  unFavorite: any;
  slug: string;
}) => {
  const handleFavoriteButtonClick = () => {
    if (favorited) {
      unFavorite(slug);
    } else {
      favorite(slug);
    }
  };
  return (
    <Button onClick={handleFavoriteButtonClick} type="green">
      <FillHeartIcon />
      Favorite Article ({favoritesCount})
    </Button>
  );
};

export default FavoriteButton;

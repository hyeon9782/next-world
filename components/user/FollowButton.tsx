'use client';
import Button from '@/composables/Button';
import { PlusIcon } from '@/composables/icons';
import { fontSize } from '@/styles/common.css';
type Props = {
  follow: any;
  unFollow: any;
  author: any;
};
const FollowButton = ({ follow, unFollow, author: { username, following } }: Props) => {
  const handleButtonClick = (username: string) => {
    if (following) {
      unFollow(username);
    } else {
      follow(username);
    }
  };

  return (
    <Button onClick={() => handleButtonClick(username)} type="gray">
      <PlusIcon className={fontSize} /> {following ? 'Unfollow' : 'Follow'} {username}
    </Button>
  );
};

export default FollowButton;

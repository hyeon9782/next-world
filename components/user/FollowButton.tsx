'use client';
import Button from '@/composables/Button';
import { PlusIcon } from '@/composables/icons';
import useProfile from '@/hooks/useProfile';
import { fontSize } from '@/styles/common.css';
type Props = {
  author: any;
  slug: string;
};
const FollowButton = ({ author: { username, following }, slug }: Props) => {
  const { follow, unFollow } = useProfile({ slug });

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

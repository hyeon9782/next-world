'use client';
import { tagList } from '@/styles/layout.css';
import Tag from './Tag';
import useCurrentTab from '@/stores/useCurrentTab';

type Props = {
  tags: string[];
  onClick?: (tag: string) => void;
};
const TagList = ({ tags, onClick }: Props) => {
  const { setTab } = useCurrentTab();

  const handleTagClick = (tag: string) => {
    setTab(tag);
  };
  return (
    <ul className={tagList}>
      {tags?.map((tag, index) => <Tag key={index} tag={tag} onTagClick={onClick ? onClick : handleTagClick} />)}
    </ul>
  );
};

export default TagList;

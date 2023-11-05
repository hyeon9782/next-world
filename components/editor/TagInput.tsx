'use client';

import { input } from '@/styles/common.css';
import { useEffect, useState } from 'react';
import TagList from '../tags/TagList';

type Props = {
  appendTag: (tag: string) => void;
  tagList?: string[];
};

const TagInput = ({ appendTag, tagList }: Props) => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState<string[] | any>([]);

  useEffect(() => {
    if (tagList?.length !== 0) {
      setTags(tagList);
    }
  }, [tagList]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      appendTag(value);
      setTags((prev: any) => [...prev, value]);
      setValue('');
    }
  };

  const handleTagClick = (tag: string) => {
    setTags((prevTags: string[]) => prevTags.filter(prevTag => prevTag !== tag));
  };

  return (
    <>
      <input
        placeholder="Enter tags"
        value={value}
        name="tagList"
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={input}
      />
      <TagList tags={tags} onClick={handleTagClick} />
    </>
  );
};

export default TagInput;

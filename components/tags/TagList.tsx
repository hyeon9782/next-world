'use client';
import { http } from '@/libs/http';
import { tagFill, tagItem, tagList } from '@/styles/layout.css';
import React from 'react';

type Props = {
  tags: string[];
  onClick: (tag: string) => void;
};
const TagList = ({ tags, onClick }: Props) => {
  // const handleTagClick = async (tag: string) => {
  //   const res = await http.get(`http://localhost:3000/api/articles?tag=${tag}`);
  //   console.log(res);
  // };
  return (
    <ul className={tagList}>
      {tags.length > 0 &&
        tags?.map((tag, index) => (
          <li key={index} className={`${tagItem} ${tagFill}`} onClick={() => onClick(tag)}>
            {tag}
          </li>
        ))}
    </ul>
  );
};

export default TagList;

import Banner from '@/components/layouts/Banner';
import TagList from '@/components/tags/TagList';
import UserBox from '@/components/user/UserBox';
import { fetchArticle } from '@/services/articles';
import { articleContent } from '@/styles/article.css';
import { container } from '@/styles/common.css';
import Link from 'next/link';
import React from 'react';
type Props = {
  params: { slug: string };
};
const ArticlePage = async ({ params: { slug } }: Props) => {
  const {
    article: { title, author, createdAt, body, tagList },
  } = await fetchArticle(slug);

  return (
    <div>
      <Banner>
        <div>{title}</div>
        <div>
          <UserBox author={author} createdAt={createdAt} />
        </div>
      </Banner>
      <div className={container}>
        <p className={articleContent}>{body}</p>
        <TagList tags={tagList} />
        <div>
          <Link href="/login">Sign in</Link> or <Link href="/register">sign up</Link> to add comments on this article.
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
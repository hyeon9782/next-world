'use client';
import ArticleDeleteButton from '@/components/article/ArticleDeleteButton';
import ArticleEditButton from '@/components/article/ArticleEditButton';
import CommentBox from '@/components/comments/CommentBox';
import Banner from '@/components/layouts/Banner';
import TagList from '@/components/tags/TagList';
import FavoriteButton from '@/components/user/FavoriteButton';
import FollowButton from '@/components/user/FollowButton';
import UserBox from '@/components/user/UserBox';
import useArticle from '@/hooks/useArticle';
import useUserStore from '@/stores/useUserStore';
import { articleContent, articleDetailTitle } from '@/styles/article.css';
import { container, flex, justifyCenter, paddingTB } from '@/styles/common.css';
import { User } from '@/types/api/users';
import React, { Suspense } from 'react';
type Props = {
  params: { slug: string };
};
const ArticlePage = ({ params: { slug } }: Props) => {
  const { username } = useUserStore() as User;

  const { article, favorite, unFavorite, follow, unFollow } = useArticle({ slug });

  const { title, author, createdAt, body, tagList, favoritesCount, favorited } = article;

  return (
    <section>
      <Suspense fallback={<div>로딩중...</div>}>
        <Banner background="black">
          <h1 className={articleDetailTitle}>{title}</h1>
          <div className={flex}>
            <UserBox author={author} createdAt={createdAt} />

            {author.username === username ? (
              <div className={flex}>
                <ArticleEditButton slug={slug} />
                <ArticleDeleteButton slug={slug} />
              </div>
            ) : (
              <div className={flex}>
                <FollowButton author={author} follow={follow} unFollow={unFollow} />
                <FavoriteButton
                  favorited={favorited}
                  favoritesCount={favoritesCount}
                  favorite={favorite}
                  slug={slug}
                  unFavorite={unFavorite}
                />
              </div>
            )}
          </div>
        </Banner>
      </Suspense>
      <Suspense fallback={<div>로딩중...</div>}>
        <div className={container}>
          <p className={articleContent}>{body}</p>
          <TagList tags={tagList} />
          <hr />
          <div className={`${justifyCenter} ${paddingTB}`}>
            <UserBox author={author} createdAt={createdAt} />
            {author.username === username ? (
              <div className={flex}>
                <ArticleEditButton slug={slug} />
                <ArticleDeleteButton slug={slug} />
              </div>
            ) : (
              <div className={flex}>
                <FollowButton author={author} follow={follow} unFollow={unFollow} />
                <FavoriteButton
                  favorited={favorited}
                  favoritesCount={favoritesCount}
                  favorite={favorite}
                  slug={slug}
                  unFavorite={unFavorite}
                />
              </div>
            )}
          </div>
        </div>
      </Suspense>
      <CommentBox slug={slug} />
    </section>
  );
};

export default ArticlePage;

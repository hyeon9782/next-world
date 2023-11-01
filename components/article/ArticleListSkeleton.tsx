import SkeletonElement from '@/composables/SkeletonElement';
import { flex } from '@/styles/common.css';
import {
  articleList,
  articlePreviewFooter,
  articlePreviewHead,
  articlePreviewSection,
  articlePreviewSkeleton,
  articlePreviewTags,
} from '@/styles/skeleton.css';

const ArticleListSkeleton = () => {
  return (
    <div className={articleList}>
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <SkeletonElement width="100%" height="200px" radius="5px" background="lightgray" key={index}>
            <div className={articlePreviewSkeleton}>
              <div className={articlePreviewHead}>
                <div className={articlePreviewTags}>
                  <SkeletonElement width="40px" height="40px" radius="50%" background="gray" />
                  <SkeletonElement width="90px" height="40px" radius="5px" background="gray" />
                </div>
                <SkeletonElement width="90px" height="40px" radius="5px" background="gray" />
              </div>
              <div className={articlePreviewSection}>
                <SkeletonElement width="100%" height="30px" radius="5px" background="gray" />
                <SkeletonElement width="100%" height="50px" radius="5px" background="gray" />
                <div className={articlePreviewFooter}>
                  <SkeletonElement width="80px" height="20px" radius="5px" background="gray" />
                  <div className={articlePreviewTags}>
                    <SkeletonElement width="60px" height="20px" radius="5px" background="gray" />
                    <SkeletonElement width="60px" height="20px" radius="5px" background="gray" />
                  </div>
                </div>
              </div>
            </div>
          </SkeletonElement>
        );
      })}
    </div>
  );
};

export default ArticleListSkeleton;

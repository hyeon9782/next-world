'use client';
import Button from '@/composables/Button';
import { modals } from '@/composables/Modals';
import { HTTP_METHOD } from '@/constants/api';
import useArticles from '@/hooks/useArticles';
import useModalsStore from '@/stores/useModalStore';
import { useRouter } from 'next/navigation';

const ArticleDeleteButton = ({ slug }: { slug: string }) => {
  const router = useRouter();
  // const { deleteArticle } = useArticles();
  const { openModal, closeModal } = useModalsStore();

  const handleButtonClick = async () => {
    await fetch(`/api/articles/${slug}`, { method: HTTP_METHOD.DELETE }).then(res => res.json());
    router.push('/');
  };
  return (
    <Button
      onClick={() =>
        openModal(modals.confirm, {
          title: '정말 글을 삭제하시겠습니까?',
          content: '삭제한 글은 복구할 수 없습니다.',
          onClose: () => {
            closeModal(modals.confirm);
          },
          onSubmit: () => {
            handleButtonClick();
            closeModal(modals.confirm);
          },
        })
      }
      type="red"
    >
      Delete Article
    </Button>
  );
};

export default ArticleDeleteButton;

import useModalsStore from '@/stores/useModalStore';
import { useCallback } from 'react';

// 이 부분을 useModalsStore에서 한 번에 처리하는 게 더 효율적이겠지?
const useModals = () => {
  const { modals, setModals } = useModalsStore();

  const openModal = useCallback(
    (Component, props) => {
      setModals([...modals, { Component, props: { ...props, open: true } }]);
    },
    [setModals]
  );

  const closeModal = useCallback(
    Component => {
      setModals(modals.filter(modal => modal.Component !== Component));
    },
    [setModals]
  );

  return {
    modals,
    openModal,
    closeModal,
  };
};

export default useModals;

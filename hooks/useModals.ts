import useModalsStore from '@/stores/useModalStore';
import { useCallback } from 'react';

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

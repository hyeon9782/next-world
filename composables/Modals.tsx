'use client';
import useModals from '@/hooks/useModals';
import ConfirmModal from './ConfirmModal';
import AlertModal from './AlertModal';

export const modals = {
  confirm: ConfirmModal,
  alert: AlertModal,
};

const Modals = () => {
  const { modals } = useModals();
  return (
    <>
      {modals.map(({ Component, props }, idx) => {
        return <Component key={idx} {...props} />;
      })}
    </>
  );
};

export default Modals;

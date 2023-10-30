'use client';
import useModals from '@/hooks/useModals';
import ConfirmDialog from './ConfirmDialog';
import AlertDialog from './AlertDialog';

export const modals = {
  confirm: ConfirmDialog,
  alert: AlertDialog,
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

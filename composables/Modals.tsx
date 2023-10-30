'use client';
import ConfirmModal from './ConfirmModal';
import AlertModal from './AlertModal';
import { ComponentProps, FunctionComponent } from 'react';
import useModalsStore from '@/stores/useModalStore';

export const modals = {
  confirm: ConfirmModal as FunctionComponent<ComponentProps<typeof ConfirmModal>>,
  alert: AlertModal as FunctionComponent<ComponentProps<typeof AlertModal>>,
};

const Modals = () => {
  const { modals } = useModalsStore();
  return (
    <>
      {modals.map(({ Component, props }, idx) => {
        return <Component key={idx} {...props} />;
      })}
    </>
  );
};

export default Modals;

import { dialogBackground } from '@/styles/composables.css';
import { ReactNode } from 'react';

const Dialog = ({ children }: { children: ReactNode }) => {
  return <div className={dialogBackground}>{children}</div>;
};

export default Dialog;

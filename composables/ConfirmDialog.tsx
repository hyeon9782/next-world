import { confirmDialog } from '@/styles/composables.css';
import Dialog from './Dialog';

const ConfirmDialog = () => {
  return (
    <Dialog>
      <div className={confirmDialog}>Confirm Dialog</div>
    </Dialog>
  );
};

export default ConfirmDialog;

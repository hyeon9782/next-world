import { confirmDialog, confirmFooter, confirmHeader, confirmSection } from '@/styles/composables.css';
import Dialog from './Dialog';
type Props = {
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  content: string;
};
const ConfirmDialog = ({ onClose, onSubmit, title, content }: Props) => {
  return (
    <Dialog>
      <div className={confirmDialog}>
        <div className={confirmHeader}>{title}</div>
        <div className={confirmSection}>{content}</div>
        <div className={confirmFooter}>
          <button onClick={onClose}>취소</button>
          <button onClick={onSubmit}>확인</button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;

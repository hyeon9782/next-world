import { alertSection, alertDialog, alertHeader, alertFooter } from '@/styles/composables.css';
import Dialog from './Dialog';
type Props = {
  onClose: () => void;
  title: string;
  content: string;
};
const AlertDialog = ({ onClose, title, content }: Props) => {
  return (
    <Dialog>
      <div className={alertDialog}>
        <div className={alertHeader}>{title}</div>
        <div className={alertSection}>{content}</div>
        <div className={alertFooter}>
          <button onClick={onClose}>확인</button>
        </div>
      </div>
    </Dialog>
  );
};

export default AlertDialog;

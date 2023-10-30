import { alertSection, alertHeader, alertFooter, alertModal } from '@/styles/composables.css';
import Modal from './Modal';
type Props = {
  onClose: () => void;
  title: string;
  content: string;
};
const AlertModal = ({ onClose, title, content }: Props) => {
  return (
    <Modal>
      <div className={alertModal}>
        <div className={alertHeader}>{title}</div>
        <div className={alertSection}>{content}</div>
        <div className={alertFooter}>
          <button onClick={onClose}>확인</button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;

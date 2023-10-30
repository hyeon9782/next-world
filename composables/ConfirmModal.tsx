import { confirmFooter, confirmHeader, confirmModal, confirmSection } from '@/styles/composables.css';
import Modal from './Modal';
type Props = {
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  content: string;
};
const ConfirmModal = ({ onClose, onSubmit, title, content }: Props) => {
  return (
    <Modal>
      <div className={confirmModal}>
        <div className={confirmHeader}>{title}</div>
        <div className={confirmSection}>{content}</div>
        <div className={confirmFooter}>
          <button onClick={onClose}>취소</button>
          <button onClick={onSubmit}>확인</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

import EditForm from '@/components/editor/EditForm';
import { editorContainer } from '@/styles/editor.css';

const EditorPage = () => {
  return (
    <section className={editorContainer}>
      <EditForm />
    </section>
  );
};

export default EditorPage;

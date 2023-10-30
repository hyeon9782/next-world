import { create } from 'zustand';

const useDialogStore = create(set => ({
  isOpen: false,
  openDialog: () => {
    set(() => ({ isOpen: true }));
  },
  closeDialog: () => {
    set(() => ({ isOpen: false }));
  },
}));

export default useDialogStore;

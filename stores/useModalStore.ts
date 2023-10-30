import { create } from 'zustand';

const useModalsStore = create(set => ({
  modals: [],
  setModals: (modals: any) => {
    set(() => ({ modals }));
  },
}));

export default useModalsStore;

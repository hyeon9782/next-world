import { ComponentProps, FunctionComponent } from 'react';
import { create } from 'zustand';

type Modal = {
  Component: FunctionComponent<any>;
  props: any;
};

type ModalsState = {
  modals: Modal[];
  openModal: <T extends FunctionComponent<any>>(Component: T, props: Omit<ComponentProps<T>, 'open'>) => void;
  closeModal: <T extends FunctionComponent<any>>(Component: T) => void;
};

const useModalsStore = create<ModalsState>(set => ({
  modals: [],
  openModal: (Component, props) => {
    set(state => ({ modals: [...state.modals, { Component, props }] }));
  },
  closeModal: Componet => {
    set(state => ({ modals: state.modals.filter(modal => modal.Component !== Componet) }));
  },
}));

export default useModalsStore;

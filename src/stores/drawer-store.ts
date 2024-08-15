import { create } from 'zustand';

interface DrawerState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useDrawerStore = create<DrawerState>(set => ({
  isOpen: true,
  setIsOpen: isOpen => set(() => ({ isOpen }))
}));

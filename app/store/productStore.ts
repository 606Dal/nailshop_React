import { create } from 'zustand';

interface ProductStore {
  page: number;
  size: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  page: 1,
  size: 10,
  setPage: (page) => set({ page }),
  setSize: (size) => set({ size }),
}));
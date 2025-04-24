import { create } from 'zustand';
import type { ProductRead } from '~/types/product';

interface ProductState {
  currentProduct: ProductRead | null;
  setCurrentProduct: (product: ProductRead) => void;
  clearCurrentProduct: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  currentProduct: null,
  setCurrentProduct: (product) => set({ currentProduct: product }),
  clearCurrentProduct: () => set({ currentProduct: null }),
}));
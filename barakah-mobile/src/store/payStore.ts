import { create } from 'zustand';
import type { SavedBiller } from '../data/mockBeneficiaries';
import { mockBillers } from '../data/mockBeneficiaries';

interface PayForm {
  biller: string;
  reference: string;
  amount: string;
}

interface PayState {
  billers: SavedBiller[];
  selectedCategory: string | null;
  form: PayForm;
  success: boolean;
  setField: (key: keyof PayForm, value: string) => void;
  selectCategory: (category: string | null) => void;
  selectBiller: (biller: SavedBiller) => void;
  pay: () => void;
  reset: () => void;
}

const initialForm: PayForm = {
  biller: '',
  reference: '',
  amount: '',
};

export const usePayStore = create<PayState>((set) => ({
  billers: mockBillers,
  selectedCategory: null,
  form: initialForm,
  success: false,
  setField: (key, value) =>
    set((state) => ({ form: { ...state.form, [key]: value } })),
  selectCategory: (category) => set({ selectedCategory: category }),
  selectBiller: (biller) =>
    set((state) => ({
      form: { ...state.form, biller: biller.name, reference: biller.accountNumber },
    })),
  pay: () => set({ success: true }),
  reset: () => set({ form: initialForm, success: false, selectedCategory: null }),
}));

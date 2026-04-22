import { create } from 'zustand';
import type { MurabahaProduct, MurabahaCalculation, MurabahaProductType } from '../engines/types';
import { mockMurabahaProducts, calculateMurabaha } from '../data/mockMurabahaProducts';
import { createShariaState, MURABAHA_COMPLIANCE_CONTEXT } from '../engines/shariaRules';
import type { ShariaState } from '../engines/types';

interface MurabahaState {
  products: MurabahaProduct[];
  selectedProduct: MurabahaProduct | null;
  amount: number;
  tenure: number;
  calculation: MurabahaCalculation | null;
  complianceState: ShariaState | null;
  selectProduct: (type: MurabahaProductType) => void;
  setAmount: (amount: number) => void;
  setTenure: (tenure: number) => void;
  calculate: () => void;
}

export const useMurabahaStore = create<MurabahaState>((set, get) => ({
  products: mockMurabahaProducts,
  selectedProduct: mockMurabahaProducts[0],
  amount: 100_000,
  tenure: 36,
  calculation: null,
  complianceState: null,

  selectProduct: (type) => {
    const product = mockMurabahaProducts.find((p) => p.type === type);
    if (product) {
      set({
        selectedProduct: product,
        amount: Math.max(product.minAmount, Math.min(get().amount, product.maxAmount)),
        tenure: Math.max(product.minTenure, Math.min(get().tenure, product.maxTenure)),
        calculation: null,
      });
    }
  },

  setAmount: (amount) => set({ amount, calculation: null }),
  setTenure: (tenure) => set({ tenure, calculation: null }),

  calculate: () => {
    const { selectedProduct, amount, tenure } = get();
    if (!selectedProduct) return;

    const calculation = calculateMurabaha(amount, selectedProduct.profitRate, tenure);
    const complianceState = createShariaState(MURABAHA_COMPLIANCE_CONTEXT);

    set({
      calculation: { ...calculation, product: selectedProduct.type },
      complianceState,
    });
  },
}));

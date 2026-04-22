import { create } from 'zustand';
import type { ZakatAssets, ZakatLiabilities, ZakatResult, Madhab, InvestmentScreening } from '../engines/types';
import { calculateZakat } from '../engines/zakatCalculator';
import { mockPortfolio } from '../data/mockPortfolio';
import { createAuditEntry } from '../engines/auditLog';

interface ZakatState {
  assets: ZakatAssets;
  liabilities: ZakatLiabilities;
  madhab: Madhab;
  result: ZakatResult | null;
  portfolio: InvestmentScreening[];
  setAsset: (key: keyof ZakatAssets, value: number) => void;
  setLiability: (key: keyof ZakatLiabilities, value: number) => void;
  setMadhab: (madhab: Madhab) => void;
  calculate: () => void;
}

export const useZakatStore = create<ZakatState>((set, get) => ({
  assets: {
    cash: 50_000,
    gold: 15_000,
    silver: 0,
    investments: 45_000,
    businessAssets: 0,
    receivables: 5_000,
  },
  liabilities: {
    debts: 12_000,
    expenses: 3_000,
  },
  madhab: 'hanafi',
  result: null,
  portfolio: mockPortfolio,

  setAsset: (key, value) =>
    set((state) => ({
      assets: { ...state.assets, [key]: value },
      result: null,
    })),

  setLiability: (key, value) =>
    set((state) => ({
      liabilities: { ...state.liabilities, [key]: value },
      result: null,
    })),

  setMadhab: (madhab) => set({ madhab, result: null }),

  calculate: () => {
    const { assets, liabilities, madhab } = get();
    const result = calculateZakat(assets, liabilities, madhab);

    createAuditEntry('zakat_calculated', 'Zakat calculation performed', {
      assets,
      liabilities,
      madhab,
      zakatDue: result.zakatDue,
      isAboveNisab: result.isAboveNisab,
    });

    set({ result });
  },
}));

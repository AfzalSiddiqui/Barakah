import { create } from 'zustand';
import type { InvestmentHolding, MetalHolding, WatchlistItem, MetalInvestmentPlan, MetalType, MetalInvestFrequency } from '../engines/types';
import { mockHoldings, mockMetals, mockWatchlist, mockMetalPlans } from '../data/mockInvestments';

interface InvestState {
  holdings: InvestmentHolding[];
  metals: MetalHolding[];
  watchlist: WatchlistItem[];
  expandedHoldingId: string | null;
  metalPlans: MetalInvestmentPlan[];
  investModalVisible: boolean;
  investModalMetal: MetalType | null;

  toggleExpanded: (id: string) => void;
  openInvestModal: (metalType: MetalType) => void;
  closeInvestModal: () => void;
  createPlan: (metalType: MetalType, frequency: MetalInvestFrequency, amount: number) => void;
  cancelPlan: (planId: string) => void;
}

export const useInvestStore = create<InvestState>((set, get) => ({
  holdings: mockHoldings,
  metals: mockMetals,
  watchlist: mockWatchlist,
  expandedHoldingId: null,
  metalPlans: mockMetalPlans,
  investModalVisible: false,
  investModalMetal: null,

  toggleExpanded: (id) =>
    set((state) => ({
      expandedHoldingId: state.expandedHoldingId === id ? null : id,
    })),

  openInvestModal: (metalType) =>
    set({ investModalVisible: true, investModalMetal: metalType }),

  closeInvestModal: () =>
    set({ investModalVisible: false, investModalMetal: null }),

  createPlan: (metalType, frequency, amount) => {
    const metal = get().metals.find((m) => m.type === metalType);
    if (!metal) return;

    const gramsForAmount = amount / metal.currentPricePerGram;
    const today = new Date().toISOString().split('T')[0];

    let nextDate: string | null = null;
    if (frequency === 'daily') {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      nextDate = d.toISOString().split('T')[0];
    } else if (frequency === 'monthly') {
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      nextDate = d.toISOString().split('T')[0];
    }

    const newPlan: MetalInvestmentPlan = {
      id: `plan-${Date.now()}`,
      metalType,
      frequency,
      amountPerInterval: amount,
      currency: metal.currency,
      totalInvested: amount,
      gramsAccumulated: gramsForAmount,
      startDate: today,
      nextDate,
      isActive: frequency !== 'one_time',
      createdAt: Date.now(),
    };

    // Update metal holding weight
    set((state) => ({
      metalPlans: [...state.metalPlans, newPlan],
      metals: state.metals.map((m) =>
        m.type === metalType
          ? { ...m, weightGrams: m.weightGrams + gramsForAmount }
          : m,
      ),
      investModalVisible: false,
      investModalMetal: null,
    }));
  },

  cancelPlan: (planId) =>
    set((state) => ({
      metalPlans: state.metalPlans.map((p) =>
        p.id === planId ? { ...p, isActive: false, nextDate: null } : p,
      ),
    })),
}));

// ─── Derived selectors ───
export function usePortfolioTotals() {
  const holdings = useInvestStore((s) => s.holdings);
  const metals = useInvestStore((s) => s.metals);

  const stockValue = holdings.reduce((sum, h) => sum + h.shares * h.currentPrice, 0);
  const stockCost = holdings.reduce((sum, h) => sum + h.shares * h.avgCost, 0);
  const metalValue = metals.reduce((sum, m) => sum + m.weightGrams * m.currentPricePerGram, 0);
  const metalCost = metals.reduce((sum, m) => sum + m.weightGrams * m.purchasePricePerGram, 0);

  const totalValue = stockValue + metalValue;
  const totalCost = stockCost + metalCost;
  const dailyPL = holdings.reduce(
    (sum, h) => sum + h.shares * h.currentPrice * (h.dailyChangePercent / 100),
    0,
  );
  const totalPL = totalValue - totalCost;

  const halalCount = holdings.filter((h) => h.screening.status === 'halal').length;
  const halalPercent = holdings.length > 0 ? Math.round((halalCount / holdings.length) * 100) : 0;

  return { totalValue, totalCost, dailyPL, totalPL, halalPercent, stockValue, metalValue };
}

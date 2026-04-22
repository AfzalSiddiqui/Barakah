import { create } from 'zustand';
import type { InvestmentHolding, MetalHolding, WatchlistItem } from '../engines/types';
import { mockHoldings, mockMetals, mockWatchlist } from '../data/mockInvestments';

interface InvestState {
  holdings: InvestmentHolding[];
  metals: MetalHolding[];
  watchlist: WatchlistItem[];
  expandedHoldingId: string | null;
  toggleExpanded: (id: string) => void;
}

export const useInvestStore = create<InvestState>((set, get) => ({
  holdings: mockHoldings,
  metals: mockMetals,
  watchlist: mockWatchlist,
  expandedHoldingId: null,

  toggleExpanded: (id) =>
    set((state) => ({
      expandedHoldingId: state.expandedHoldingId === id ? null : id,
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

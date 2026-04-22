import type { InvestmentHolding, MetalHolding, WatchlistItem, ScreeningCriteria } from '../engines/types';
import { screenInvestment } from '../engines/halalScreener';

// ─── Metal Holdings (Gold & Silver) ───
export const mockMetals: MetalHolding[] = [
  {
    id: 'metal-001',
    type: 'gold',
    name: 'Gold (24K)',
    nameAr: 'ذهب (24 قيراط)',
    weightGrams: 50,
    purchasePricePerGram: 295,
    currentPricePerGram: 312,
    currency: 'AED',
  },
  {
    id: 'metal-002',
    type: 'silver',
    name: 'Silver',
    nameAr: 'فضة',
    weightGrams: 500,
    purchasePricePerGram: 3.6,
    currentPricePerGram: 3.85,
    currency: 'AED',
  },
];

// ─── Halal Stock Holdings ───
const stockData: Array<{
  id: string;
  name: string;
  nameAr: string;
  ticker: string;
  sector: string;
  sectorAr: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  dailyChangePercent: number;
  criteria: ScreeningCriteria;
}> = [
  {
    id: 'stock-001',
    name: 'Saudi Aramco',
    nameAr: 'أرامكو السعودية',
    ticker: 'ARAMCO',
    sector: 'Energy',
    sectorAr: 'الطاقة',
    shares: 200,
    avgCost: 32.5,
    currentPrice: 34.8,
    dailyChangePercent: 1.2,
    criteria: { debtToEquityRatio: 0.08, haramRevenuePercentage: 0.0, interestIncomePercentage: 0.01, liquidAssetsPercentage: 0.35 },
  },
  {
    id: 'stock-002',
    name: 'Al Rajhi Bank',
    nameAr: 'مصرف الراجحي',
    ticker: 'RJHI',
    sector: 'Banking',
    sectorAr: 'البنوك',
    shares: 150,
    avgCost: 85.0,
    currentPrice: 92.4,
    dailyChangePercent: 0.8,
    criteria: { debtToEquityRatio: 0.25, haramRevenuePercentage: 0.0, interestIncomePercentage: 0.0, liquidAssetsPercentage: 0.45 },
  },
  {
    id: 'stock-003',
    name: 'SABIC',
    nameAr: 'سابك',
    ticker: 'SABIC',
    sector: 'Materials',
    sectorAr: 'المواد',
    shares: 100,
    avgCost: 95.0,
    currentPrice: 88.6,
    dailyChangePercent: -1.5,
    criteria: { debtToEquityRatio: 0.22, haramRevenuePercentage: 0.0, interestIncomePercentage: 0.02, liquidAssetsPercentage: 0.30 },
  },
  {
    id: 'stock-004',
    name: 'Etisalat (e&)',
    nameAr: 'اتصالات (e&)',
    ticker: 'ETISALAT',
    sector: 'Telecom',
    sectorAr: 'الاتصالات',
    shares: 300,
    avgCost: 22.0,
    currentPrice: 24.3,
    dailyChangePercent: 0.5,
    criteria: { debtToEquityRatio: 0.18, haramRevenuePercentage: 0.01, interestIncomePercentage: 0.02, liquidAssetsPercentage: 0.40 },
  },
  {
    id: 'stock-005',
    name: 'Emirates NBD',
    nameAr: 'الإمارات دبي الوطني',
    ticker: 'ENBD',
    sector: 'Banking',
    sectorAr: 'البنوك',
    shares: 250,
    avgCost: 17.0,
    currentPrice: 18.9,
    dailyChangePercent: -0.3,
    criteria: { debtToEquityRatio: 0.30, haramRevenuePercentage: 0.03, interestIncomePercentage: 0.04, liquidAssetsPercentage: 0.50 },
  },
  {
    id: 'stock-006',
    name: 'STC',
    nameAr: 'الاتصالات السعودية',
    ticker: 'STC',
    sector: 'Telecom',
    sectorAr: 'الاتصالات',
    shares: 180,
    avgCost: 48.0,
    currentPrice: 51.2,
    dailyChangePercent: 2.1,
    criteria: { debtToEquityRatio: 0.30, haramRevenuePercentage: 0.03, interestIncomePercentage: 0.04, liquidAssetsPercentage: 0.50 },
  },
];

export const mockHoldings: InvestmentHolding[] = stockData.map((s) => ({
  id: s.id,
  name: s.name,
  nameAr: s.nameAr,
  ticker: s.ticker,
  sector: s.sector,
  sectorAr: s.sectorAr,
  shares: s.shares,
  avgCost: s.avgCost,
  currentPrice: s.currentPrice,
  dailyChangePercent: s.dailyChangePercent,
  currency: 'SAR',
  screening: screenInvestment(s.id, s.name, s.ticker, s.criteria),
}));

// ─── Watchlist ───
export const mockWatchlist: WatchlistItem[] = [
  {
    id: 'watch-001',
    name: 'Dubai Islamic Bank',
    nameAr: 'بنك دبي الإسلامي',
    ticker: 'DIB',
    currentPrice: 6.25,
    dailyChangePercent: 1.8,
    currency: 'AED',
    status: 'halal',
  },
  {
    id: 'watch-002',
    name: 'Almarai',
    nameAr: 'المراعي',
    ticker: 'ALMARAI',
    currentPrice: 52.1,
    dailyChangePercent: -0.6,
    currency: 'SAR',
    status: 'halal',
  },
  {
    id: 'watch-003',
    name: 'Jarir Marketing',
    nameAr: 'جرير للتسويق',
    ticker: 'JARIR',
    currentPrice: 148.0,
    dailyChangePercent: 0.3,
    currency: 'SAR',
    status: 'doubtful',
  },
];

// ─── Sector Allocation ───
export const sectorAllocation: Array<{ sector: string; sectorAr: string; percentage: number; color: string }> = [
  { sector: 'Energy', sectorAr: 'الطاقة', percentage: 28, color: '#00D4AA' },
  { sector: 'Banking', sectorAr: 'البنوك', percentage: 32, color: '#4A9EFF' },
  { sector: 'Materials', sectorAr: 'المواد', percentage: 14, color: '#D4A843' },
  { sector: 'Telecom', sectorAr: 'الاتصالات', percentage: 18, color: '#FF6B8A' },
  { sector: 'Precious Metals', sectorAr: 'المعادن الثمينة', percentage: 8, color: '#C0C0C0' },
];

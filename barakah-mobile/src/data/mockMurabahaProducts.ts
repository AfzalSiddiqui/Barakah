import type { MurabahaProduct } from '../engines/types';

export const mockMurabahaProducts: MurabahaProduct[] = [
  {
    id: 'mp-001',
    type: 'auto',
    name: 'Auto Finance',
    minAmount: 30_000,
    maxAmount: 500_000,
    minTenure: 12,
    maxTenure: 60,
    profitRate: 0.045,
    icon: '🚗',
  },
  {
    id: 'mp-002',
    type: 'home',
    name: 'Home Finance',
    minAmount: 200_000,
    maxAmount: 5_000_000,
    minTenure: 60,
    maxTenure: 300,
    profitRate: 0.0499,
    icon: '🏠',
  },
  {
    id: 'mp-003',
    type: 'personal',
    name: 'Personal Goods',
    minAmount: 5_000,
    maxAmount: 100_000,
    minTenure: 6,
    maxTenure: 36,
    profitRate: 0.055,
    icon: '📱',
  },
  {
    id: 'mp-004',
    type: 'business',
    name: 'Business Equipment',
    minAmount: 50_000,
    maxAmount: 2_000_000,
    minTenure: 12,
    maxTenure: 84,
    profitRate: 0.048,
    icon: '🏭',
  },
];

export function calculateMurabaha(
  principal: number,
  profitRate: number,
  tenureMonths: number
) {
  const totalProfit = principal * profitRate * (tenureMonths / 12);
  const totalCost = principal + totalProfit;
  const monthlyPayment = totalCost / tenureMonths;

  return {
    principal,
    profitRate,
    tenure: tenureMonths,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    totalProfit: Math.round(totalProfit * 100) / 100,
  };
}

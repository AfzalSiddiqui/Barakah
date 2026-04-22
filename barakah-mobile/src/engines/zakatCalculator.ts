import type { ZakatAssets, ZakatLiabilities, ZakatResult, Madhab } from './types';

// Current approximate Nisab values in AED
const NISAB_GOLD_AED = 25_000; // ~87.48g of gold
const NISAB_SILVER_AED = 2_000; // ~612.36g of silver
const ZAKAT_RATE = 0.025; // 2.5%

export function getNisabThreshold(madhab: Madhab): number {
  // Hanafi uses the lower of gold/silver nisab (more inclusive)
  // Shafi'i uses gold nisab
  return madhab === 'hanafi' ? NISAB_SILVER_AED : NISAB_GOLD_AED;
}

export function calculateTotalAssets(assets: ZakatAssets): number {
  return (
    assets.cash +
    assets.gold +
    assets.silver +
    assets.investments +
    assets.businessAssets +
    assets.receivables
  );
}

export function calculateTotalLiabilities(liabilities: ZakatLiabilities): number {
  return liabilities.debts + liabilities.expenses;
}

export function calculateNetZakatable(
  assets: ZakatAssets,
  liabilities: ZakatLiabilities,
  madhab: Madhab
): number {
  const totalAssets = calculateTotalAssets(assets);
  const totalLiabilities = calculateTotalLiabilities(liabilities);

  // Hanafi: deduct only immediate debts (simplified here as all debts)
  // Shafi'i: deduct debts that are due
  const deductible = madhab === 'hanafi' ? totalLiabilities : liabilities.debts;

  return Math.max(0, totalAssets - deductible);
}

export function calculateZakat(
  assets: ZakatAssets,
  liabilities: ZakatLiabilities,
  madhab: Madhab = 'hanafi'
): ZakatResult {
  const totalAssets = calculateTotalAssets(assets);
  const totalLiabilities = calculateTotalLiabilities(liabilities);
  const netZakatable = calculateNetZakatable(assets, liabilities, madhab);
  const nisabThreshold = getNisabThreshold(madhab);
  const isAboveNisab = netZakatable >= nisabThreshold;
  const zakatDue = isAboveNisab ? netZakatable * ZAKAT_RATE : 0;

  return {
    totalAssets,
    totalLiabilities,
    netZakatable,
    nisabThreshold,
    isAboveNisab,
    zakatDue,
    madhab,
    calculatedAt: Date.now(),
  };
}

export function formatCurrency(amount: number, currency = 'AED'): string {
  return `${currency} ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export { NISAB_GOLD_AED, NISAB_SILVER_AED, ZAKAT_RATE };

import type { HalalStatus, InvestmentScreening, ScreeningCriteria } from './types';

// AAOIFI screening thresholds
const THRESHOLDS = {
  maxDebtToEquity: 0.33, // 33% — debt-to-equity ratio
  maxHaramRevenue: 0.05, // 5% — haram revenue percentage
  maxInterestIncome: 0.05, // 5% — interest income percentage
  maxLiquidAssets: 0.70, // 70% — liquid assets (for asset-backed requirement)
} as const;

interface ScreeningCheckResult {
  passed: boolean;
  message: string;
}

function checkDebtRatio(criteria: ScreeningCriteria): ScreeningCheckResult {
  const passed = criteria.debtToEquityRatio <= THRESHOLDS.maxDebtToEquity;
  return {
    passed,
    message: passed
      ? `Debt-to-equity ratio ${(criteria.debtToEquityRatio * 100).toFixed(1)}% within limit`
      : `Debt-to-equity ratio ${(criteria.debtToEquityRatio * 100).toFixed(1)}% exceeds ${THRESHOLDS.maxDebtToEquity * 100}% threshold`,
  };
}

function checkHaramRevenue(criteria: ScreeningCriteria): ScreeningCheckResult {
  const passed = criteria.haramRevenuePercentage <= THRESHOLDS.maxHaramRevenue;
  return {
    passed,
    message: passed
      ? `Haram revenue ${(criteria.haramRevenuePercentage * 100).toFixed(1)}% within limit`
      : `Haram revenue ${(criteria.haramRevenuePercentage * 100).toFixed(1)}% exceeds ${THRESHOLDS.maxHaramRevenue * 100}% threshold`,
  };
}

function checkInterestIncome(criteria: ScreeningCriteria): ScreeningCheckResult {
  const passed = criteria.interestIncomePercentage <= THRESHOLDS.maxInterestIncome;
  return {
    passed,
    message: passed
      ? `Interest income ${(criteria.interestIncomePercentage * 100).toFixed(1)}% within limit`
      : `Interest income ${(criteria.interestIncomePercentage * 100).toFixed(1)}% exceeds ${THRESHOLDS.maxInterestIncome * 100}% threshold`,
  };
}

function checkLiquidAssets(criteria: ScreeningCriteria): ScreeningCheckResult {
  const passed = criteria.liquidAssetsPercentage <= THRESHOLDS.maxLiquidAssets;
  return {
    passed,
    message: passed
      ? `Liquid assets ${(criteria.liquidAssetsPercentage * 100).toFixed(1)}% within limit`
      : `Liquid assets ${(criteria.liquidAssetsPercentage * 100).toFixed(1)}% exceeds ${THRESHOLDS.maxLiquidAssets * 100}% threshold`,
  };
}

export function screenInvestment(
  id: string,
  name: string,
  ticker: string,
  criteria: ScreeningCriteria
): InvestmentScreening {
  const checks = [
    { name: 'Debt Ratio', result: checkDebtRatio(criteria) },
    { name: 'Haram Revenue', result: checkHaramRevenue(criteria) },
    { name: 'Interest Income', result: checkInterestIncome(criteria) },
    { name: 'Liquid Assets', result: checkLiquidAssets(criteria) },
  ];

  const failedChecks = checks
    .filter((c) => !c.result.passed)
    .map((c) => c.result.message);

  let status: HalalStatus;
  if (failedChecks.length === 0) {
    status = 'halal';
  } else if (failedChecks.length === 1) {
    status = 'doubtful';
  } else {
    status = 'haram';
  }

  return {
    id,
    name,
    ticker,
    status,
    criteria,
    failedChecks,
    screenedAt: Date.now(),
  };
}

export function getStatusColor(status: HalalStatus): string {
  switch (status) {
    case 'halal': return '#00D4AA';
    case 'haram': return '#FF4757';
    case 'doubtful': return '#D4A843';
  }
}

export { THRESHOLDS };

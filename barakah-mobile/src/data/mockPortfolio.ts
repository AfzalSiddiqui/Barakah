import type { InvestmentScreening, ScreeningCriteria } from '../engines/types';
import { screenInvestment } from '../engines/halalScreener';

const portfolioData: Array<{ id: string; name: string; ticker: string; criteria: ScreeningCriteria }> = [
  {
    id: 'inv-001',
    name: 'Saudi Aramco',
    ticker: 'ARAMCO',
    criteria: { debtToEquityRatio: 0.08, haramRevenuePercentage: 0.0, interestIncomePercentage: 0.01, liquidAssetsPercentage: 0.35 },
  },
  {
    id: 'inv-002',
    name: 'Al Rajhi Bank',
    ticker: 'RJHI',
    criteria: { debtToEquityRatio: 0.25, haramRevenuePercentage: 0.0, interestIncomePercentage: 0.0, liquidAssetsPercentage: 0.45 },
  },
  {
    id: 'inv-003',
    name: 'SABIC',
    ticker: 'SABIC',
    criteria: { debtToEquityRatio: 0.22, haramRevenuePercentage: 0.0, interestIncomePercentage: 0.02, liquidAssetsPercentage: 0.30 },
  },
  {
    id: 'inv-004',
    name: 'STC',
    ticker: 'STC',
    criteria: { debtToEquityRatio: 0.30, haramRevenuePercentage: 0.03, interestIncomePercentage: 0.04, liquidAssetsPercentage: 0.50 },
  },
  {
    id: 'inv-005',
    name: 'Acme Finance Corp',
    ticker: 'ACMF',
    criteria: { debtToEquityRatio: 0.55, haramRevenuePercentage: 0.12, interestIncomePercentage: 0.08, liquidAssetsPercentage: 0.80 },
  },
];

export const mockPortfolio: InvestmentScreening[] = portfolioData.map((item) =>
  screenInvestment(item.id, item.name, item.ticker, item.criteria)
);

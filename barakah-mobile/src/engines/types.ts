// ─── Sharia Compliance ───
export type ComplianceStatus = 'compliant' | 'non_compliant' | 'review_required' | 'pending';

export type ComplianceStandard = 'AAOIFI' | 'IFSB' | 'LOCAL_REGULATOR';

export interface ComplianceCheck {
  id: string;
  name: string;
  description: string;
  status: ComplianceStatus;
  standard: ComplianceStandard;
  timestamp: number;
}

export interface ShariaState {
  status: ComplianceStatus;
  checks: ComplianceCheck[];
  lastAudit: number;
  certificationId: string | null;
}

// ─── Zakat ───
export type Madhab = 'hanafi' | 'shafii';

export interface ZakatAssets {
  cash: number;
  gold: number;
  silver: number;
  investments: number;
  businessAssets: number;
  receivables: number;
}

export interface ZakatLiabilities {
  debts: number;
  expenses: number;
}

export interface ZakatResult {
  totalAssets: number;
  totalLiabilities: number;
  netZakatable: number;
  nisabThreshold: number;
  isAboveNisab: boolean;
  zakatDue: number;
  madhab: Madhab;
  calculatedAt: number;
}

// ─── Halal Screening ───
export type HalalStatus = 'halal' | 'haram' | 'doubtful';

export interface ScreeningCriteria {
  debtToEquityRatio: number;
  haramRevenuePercentage: number;
  interestIncomePercentage: number;
  liquidAssetsPercentage: number;
}

export interface InvestmentScreening {
  id: string;
  name: string;
  ticker: string;
  status: HalalStatus;
  criteria: ScreeningCriteria;
  failedChecks: string[];
  screenedAt: number;
}

// ─── Investment Portfolio ───
export type MetalType = 'gold' | 'silver';

export interface MetalHolding {
  id: string;
  type: MetalType;
  name: string;
  nameAr: string;
  weightGrams: number;
  purchasePricePerGram: number;
  currentPricePerGram: number;
  currency: string;
}

export interface InvestmentHolding {
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
  currency: string;
  screening: InvestmentScreening;
}

export interface WatchlistItem {
  id: string;
  name: string;
  nameAr: string;
  ticker: string;
  currentPrice: number;
  dailyChangePercent: number;
  currency: string;
  status: HalalStatus;
}

// ─── Murabaha ───
export type MurabahaProductType = 'auto' | 'home' | 'personal' | 'business';

export interface MurabahaProduct {
  id: string;
  type: MurabahaProductType;
  name: string;
  minAmount: number;
  maxAmount: number;
  minTenure: number;
  maxTenure: number;
  profitRate: number;
  icon: string;
}

export interface MurabahaCalculation {
  principal: number;
  profitRate: number;
  tenure: number;
  monthlyPayment: number;
  totalCost: number;
  totalProfit: number;
  product: MurabahaProductType;
}

// ─── Audit Log ───
export type AuditEventType =
  | 'zakat_calculated'
  | 'sharia_check'
  | 'halal_screening'
  | 'murabaha_calculation'
  | 'compliance_verified'
  | 'language_changed'
  | 'user_action';

export interface AuditEntry {
  id: string;
  type: AuditEventType;
  description: string;
  data: Record<string, unknown>;
  timestamp: number;
  hash: string;
}

// ─── User & Transactions ───
export interface User {
  id: string;
  name: string;
  nameAr: string;
  accountNumber: string;
  balance: number;
  currency: string;
  isVerified: boolean;
  shariaStatus: ComplianceStatus;
}

export type TransactionType = 'credit' | 'debit';
export type TransactionCategory = 'salary' | 'transfer' | 'payment' | 'investment' | 'zakat' | 'profit_share';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  currency: string;
  description: string;
  descriptionAr: string;
  date: string;
  isCompliant: boolean;
}

// ─── Chat ───
export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  actions?: ChatAction[];
}

export interface ChatAction {
  id: string;
  label: string;
  type: 'navigate' | 'calculate' | 'info';
  payload?: string;
}

import type { ComplianceCheck, ComplianceStatus, ShariaState, ComplianceStandard } from './types';

const COMPLIANCE_RULES: Array<{
  id: string;
  name: string;
  description: string;
  standard: ComplianceStandard;
  validate: (context: ComplianceContext) => boolean;
}> = [
  {
    id: 'no_riba',
    name: 'No Interest (Riba)',
    description: 'Transaction must not involve interest-based lending or borrowing',
    standard: 'AAOIFI',
    validate: (ctx) => !ctx.involvesInterest,
  },
  {
    id: 'no_gharar',
    name: 'No Excessive Uncertainty (Gharar)',
    description: 'Contract terms must be clear and transparent',
    standard: 'AAOIFI',
    validate: (ctx) => ctx.termsDisclosed && !ctx.excessiveUncertainty,
  },
  {
    id: 'asset_backed',
    name: 'Asset-Backed Transaction',
    description: 'Financing must be tied to a real tangible asset',
    standard: 'AAOIFI',
    validate: (ctx) => ctx.isAssetBacked,
  },
  {
    id: 'halal_activity',
    name: 'Halal Business Activity',
    description: 'Underlying business must not involve haram activities',
    standard: 'AAOIFI',
    validate: (ctx) => !ctx.involvesHaramActivity,
  },
  {
    id: 'profit_loss_sharing',
    name: 'Profit-Loss Sharing',
    description: 'Risk must be shared between parties per Islamic principles',
    standard: 'AAOIFI',
    validate: (ctx) => ctx.riskShared,
  },
  {
    id: 'full_disclosure',
    name: 'Full Disclosure',
    description: 'All costs, profits, and terms must be disclosed upfront',
    standard: 'IFSB',
    validate: (ctx) => ctx.termsDisclosed,
  },
];

export interface ComplianceContext {
  involvesInterest: boolean;
  termsDisclosed: boolean;
  excessiveUncertainty: boolean;
  isAssetBacked: boolean;
  involvesHaramActivity: boolean;
  riskShared: boolean;
}

export function runComplianceChecks(context: ComplianceContext): ComplianceCheck[] {
  return COMPLIANCE_RULES.map((rule) => ({
    id: rule.id,
    name: rule.name,
    description: rule.description,
    status: rule.validate(context) ? 'compliant' as const : 'non_compliant' as const,
    standard: rule.standard,
    timestamp: Date.now(),
  }));
}

export function deriveComplianceStatus(checks: ComplianceCheck[]): ComplianceStatus {
  if (checks.length === 0) return 'pending';
  const hasNonCompliant = checks.some((c) => c.status === 'non_compliant');
  const hasReview = checks.some((c) => c.status === 'review_required');
  if (hasNonCompliant) return 'non_compliant';
  if (hasReview) return 'review_required';
  return 'compliant';
}

export function createShariaState(context: ComplianceContext): ShariaState {
  const checks = runComplianceChecks(context);
  const status = deriveComplianceStatus(checks);
  return {
    status,
    checks,
    lastAudit: Date.now(),
    certificationId: status === 'compliant' ? `AAOIFI-${Date.now()}` : null,
  };
}

export const MURABAHA_COMPLIANCE_CONTEXT: ComplianceContext = {
  involvesInterest: false,
  termsDisclosed: true,
  excessiveUncertainty: false,
  isAssetBacked: true,
  involvesHaramActivity: false,
  riskShared: true,
};

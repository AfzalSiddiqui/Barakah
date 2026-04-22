import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../ui/Typography';
import type { InvestmentHolding } from '../../engines/types';
import { useRTL } from '../../hooks/useRTL';
import { useTranslation } from 'react-i18next';

interface HoldingRowProps {
  holding: InvestmentHolding;
  isExpanded: boolean;
  onToggle: () => void;
}

const statusConfig = {
  halal: { color: 'text-nb-green', bg: 'bg-nb-green/20', dot: 'bg-nb-green', label: 'Halal' },
  haram: { color: 'text-nb-red', bg: 'bg-nb-red/20', dot: 'bg-nb-red', label: 'Non-Compliant' },
  doubtful: { color: 'text-nb-gold', bg: 'bg-nb-gold/20', dot: 'bg-nb-gold', label: 'Review' },
} as const;

export function HoldingRow({ holding, isExpanded, onToggle }: HoldingRowProps) {
  const { isRTL, flexRow } = useRTL();
  const { t } = useTranslation();
  const config = statusConfig[holding.screening.status];
  const changeColor = holding.dailyChangePercent >= 0 ? 'text-nb-green' : 'text-nb-red';
  const changeSign = holding.dailyChangePercent >= 0 ? '+' : '';
  const totalValue = holding.shares * holding.currentPrice;

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      className="bg-nb-surface rounded-xl p-3 mb-2"
    >
      {/* Main Row */}
      <View className={`${flexRow} justify-between items-center`}>
        <View className="flex-1">
          <View className={`${flexRow} items-center gap-2`}>
            <Typography variant="bodyBold" className="text-nb-text">
              {isRTL ? holding.nameAr : holding.name}
            </Typography>
            <View className={`${config.bg} rounded-full px-2 py-0.5 ${flexRow} items-center`}>
              <View className={`w-1.5 h-1.5 rounded-full ${config.dot} mr-1`} />
              <Typography variant="small" className={config.color}>
                {config.label}
              </Typography>
            </View>
          </View>
          <Typography variant="small" className="text-nb-muted">
            {holding.ticker} · {isRTL ? holding.sectorAr : holding.sector} · {holding.shares} {t('invest.shares')}
          </Typography>
        </View>
        <View className="items-end">
          <Typography variant="bodyBold" className="text-nb-text">
            {holding.currentPrice.toFixed(2)}
          </Typography>
          <Typography variant="small" className={changeColor}>
            {changeSign}{holding.dailyChangePercent.toFixed(1)}%
          </Typography>
        </View>
      </View>

      {/* Value Row */}
      <View className={`${flexRow} justify-between mt-1`}>
        <Typography variant="small" className="text-nb-muted">
          {t('invest.value')}: {totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} {holding.currency}
        </Typography>
        <Typography variant="small" className="text-nb-muted">
          {t('invest.avgCost')}: {holding.avgCost.toFixed(2)}
        </Typography>
      </View>

      {/* Expanded AAOIFI Detail */}
      {isExpanded && (
        <View className="mt-3 pt-3 border-t border-nb-muted/20">
          <Typography variant="captionBold" className="text-nb-accent mb-2">
            {t('invest.aaoifiScreening')}
          </Typography>
          <View className="gap-1">
            <ScreeningRow
              label={t('invest.debtToEquity')}
              value={`${(holding.screening.criteria.debtToEquityRatio * 100).toFixed(1)}%`}
              limit="33%"
              passed={holding.screening.criteria.debtToEquityRatio <= 0.33}
            />
            <ScreeningRow
              label={t('invest.haramRevenue')}
              value={`${(holding.screening.criteria.haramRevenuePercentage * 100).toFixed(1)}%`}
              limit="5%"
              passed={holding.screening.criteria.haramRevenuePercentage <= 0.05}
            />
            <ScreeningRow
              label={t('invest.interestIncome')}
              value={`${(holding.screening.criteria.interestIncomePercentage * 100).toFixed(1)}%`}
              limit="5%"
              passed={holding.screening.criteria.interestIncomePercentage <= 0.05}
            />
            <ScreeningRow
              label={t('invest.liquidAssets')}
              value={`${(holding.screening.criteria.liquidAssetsPercentage * 100).toFixed(1)}%`}
              limit="70%"
              passed={holding.screening.criteria.liquidAssetsPercentage <= 0.70}
            />
          </View>
          {holding.screening.failedChecks.length > 0 && (
            <View className="mt-2">
              {holding.screening.failedChecks.map((check, idx) => (
                <Typography key={idx} variant="small" className="text-nb-red/80 mt-0.5">
                  {check}
                </Typography>
              ))}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

function ScreeningRow({ label, value, limit, passed }: { label: string; value: string; limit: string; passed: boolean }) {
  return (
    <View className="flex-row justify-between items-center">
      <Typography variant="small" className="text-nb-muted flex-1">
        {label}
      </Typography>
      <Typography variant="smallBold" className={passed ? 'text-nb-green' : 'text-nb-red'}>
        {value}
      </Typography>
      <Typography variant="small" className="text-nb-muted ml-2">
        / {limit}
      </Typography>
    </View>
  );
}

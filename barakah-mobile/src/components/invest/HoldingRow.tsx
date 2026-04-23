import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useFluxColors, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import type { InvestmentHolding } from '../../engines/types';
import { useRTL } from '../../hooks/useRTL';
import { useTranslation } from 'react-i18next';

interface HoldingRowProps {
  holding: InvestmentHolding;
  isExpanded: boolean;
  onToggle: () => void;
}

export function HoldingRow({ holding, isExpanded, onToggle }: HoldingRowProps) {
  const colors = useFluxColors();
  const { isRTL, flexRow } = useRTL();
  const { t } = useTranslation();

  const statusColors = {
    halal: { color: colors.success, bg: hexToRgba(colors.success, 0.2), label: 'Halal' },
    haram: { color: colors.error, bg: hexToRgba(colors.error, 0.2), label: 'Non-Compliant' },
    doubtful: { color: colors.warning, bg: hexToRgba(colors.warning, 0.2), label: 'Review' },
  } as const;

  const config = statusColors[holding.screening.status];
  const changeColor = holding.dailyChangePercent >= 0 ? colors.success : colors.error;
  const changeSign = holding.dailyChangePercent >= 0 ? '+' : '';
  const totalValue = holding.shares * holding.currentPrice;

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      className="bg-nb-surface rounded-xl p-3 mb-2"
    >
      <View className={`${flexRow} justify-between items-center`}>
        <View className="flex-1">
          <View className={`${flexRow} items-center gap-2`}>
            <FluxText textStyle="body" color={colors.textPrimary} style={{ fontWeight: '600', fontSize: 14 }}>
              {isRTL ? holding.nameAr : holding.name}
            </FluxText>
            <View style={{ backgroundColor: config.bg, borderRadius: 9999, paddingHorizontal: 8, paddingVertical: 2, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: config.color, marginRight: 4 }} />
              <FluxText textStyle="caption" color={config.color} style={{ fontSize: 10 }}>
                {config.label}
              </FluxText>
            </View>
          </View>
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
            {`${holding.ticker} · ${isRTL ? holding.sectorAr : holding.sector} · ${holding.shares} ${t('invest.shares')}`}
          </FluxText>
        </View>
        <View className="items-end">
          <FluxText textStyle="body" color={colors.textPrimary} style={{ fontWeight: '600', fontSize: 14 }}>
            {holding.currentPrice.toFixed(2)}
          </FluxText>
          <FluxText textStyle="caption" color={changeColor} style={{ fontSize: 10 }}>
            {`${changeSign}${holding.dailyChangePercent.toFixed(1)}%`}
          </FluxText>
        </View>
      </View>

      <View className={`${flexRow} justify-between mt-1`}>
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
          {`${t('invest.value')}: ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${holding.currency}`}
        </FluxText>
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
          {`${t('invest.avgCost')}: ${holding.avgCost.toFixed(2)}`}
        </FluxText>
      </View>

      {isExpanded && (
        <View className="mt-3 pt-3 border-t border-nb-muted/20">
          <FluxText textStyle="caption" color={colors.accent} style={{ fontWeight: '600', marginBottom: 8 }}>
            {t('invest.aaoifiScreening')}
          </FluxText>
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
                <FluxText key={idx} textStyle="caption" color={colors.error} style={{ fontSize: 10, marginTop: 2, opacity: 0.8 }}>
                  {check}
                </FluxText>
              ))}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

function ScreeningRow({ label, value, limit, passed }: { label: string; value: string; limit: string; passed: boolean }) {
  const colors = useFluxColors();

  return (
    <View className="flex-row justify-between items-center">
      <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, flex: 1 }}>
        {label}
      </FluxText>
      <FluxText textStyle="caption" color={passed ? colors.success : colors.error} style={{ fontSize: 10, fontWeight: '600' }}>
        {value}
      </FluxText>
      <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginLeft: 8 }}>
        {`/ ${limit}`}
      </FluxText>
    </View>
  );
}

import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText, FluxDivider } from '@flux-ds/react-native-foundation';
import { Card } from '../ui/Card';
import { usePortfolioTotals } from '../../store/investStore';
import { useRTL } from '../../hooks/useRTL';

export function PortfolioSummaryCard() {
  const { t } = useTranslation();
  const colors = useFluxColors();
  const { totalValue, dailyPL, totalPL, halalPercent, stockValue, metalValue } = usePortfolioTotals();
  const { isRTL, flexRow, textAlign } = useRTL();

  const plColor = dailyPL >= 0 ? colors.success : colors.error;
  const plSign = dailyPL >= 0 ? '+' : '';
  const totalPlColor = totalPL >= 0 ? colors.success : colors.error;
  const totalPlSign = totalPL >= 0 ? '+' : '';
  const align = isRTL ? 'right' : 'left';

  return (
    <Card variant="elevated">
      <FluxText textStyle="caption" color={colors.textSecondary} style={{ textAlign: align }}>
        {t('invest.portfolioValue')}
      </FluxText>
      <FluxText textStyle="title" color={colors.textPrimary} style={{ marginTop: 4, textAlign: align }}>
        {`AED ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
      </FluxText>

      <View className={`${flexRow} mt-3 gap-4`}>
        <View className="flex-1">
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
            {t('invest.dailyPL')}
          </FluxText>
          <FluxText textStyle="body" color={plColor} style={{ fontWeight: '600', fontSize: 14 }}>
            {`${plSign}${dailyPL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </FluxText>
        </View>
        <View className="flex-1">
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
            {t('invest.totalPL')}
          </FluxText>
          <FluxText textStyle="body" color={totalPlColor} style={{ fontWeight: '600', fontSize: 14 }}>
            {`${totalPlSign}${totalPL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </FluxText>
        </View>
        <View className="flex-1">
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
            {t('invest.halalCompliance')}
          </FluxText>
          <FluxText textStyle="body" color={colors.success} style={{ fontWeight: '600', fontSize: 14 }}>
            {`${halalPercent}%`}
          </FluxText>
        </View>
      </View>

      <FluxDivider style={{ marginVertical: 12 }} />

      <View className={`${flexRow} gap-4`}>
        <View className="flex-1">
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
            {t('invest.stocks')}
          </FluxText>
          <FluxText textStyle="caption" color={colors.textPrimary} style={{ fontWeight: '600' }}>
            {`AED ${stockValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          </FluxText>
        </View>
        <View className="flex-1">
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
            {t('invest.metals')}
          </FluxText>
          <FluxText textStyle="caption" color={colors.textPrimary} style={{ fontWeight: '600' }}>
            {`AED ${metalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          </FluxText>
        </View>
      </View>
    </Card>
  );
}

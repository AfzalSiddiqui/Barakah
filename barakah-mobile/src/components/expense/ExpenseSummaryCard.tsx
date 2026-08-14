import React from 'react';
import { View } from 'react-native';
import { useFluxColors, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../lib/formatters';
import type { ExpenseSummary } from '../../engines/types';
import { useTranslation } from 'react-i18next';

interface ExpenseSummaryCardProps {
  summary: ExpenseSummary;
}

export function ExpenseSummaryCard({ summary }: ExpenseSummaryCardProps) {
  const colors = useFluxColors();
  const { t } = useTranslation();

  return (
    <Card>
      <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontWeight: '600', marginBottom: 12 }}>
        {t('expenses.title')}
      </FluxText>

      {/* Net Spend - large number */}
      <FluxText textStyle="headline" color={colors.error} style={{ marginBottom: 8 }}>
        {formatCurrency(summary.netSpend)}
      </FluxText>

      {/* Stats row */}
      <View className="flex-row justify-between mt-2">
        <View className="flex-1 items-center">
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 2 }}>
            {t('expenses.totalSpent')}
          </FluxText>
          <FluxText textStyle="caption" color={colors.error} style={{ fontWeight: '600' }}>
            {formatCurrency(summary.totalSpent)}
          </FluxText>
        </View>
        <View style={{ width: 1, backgroundColor: hexToRgba(colors.textSecondary, 0.2) }} />
        <View className="flex-1 items-center">
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 2 }}>
            {t('expenses.refunded')}
          </FluxText>
          <FluxText textStyle="caption" color={colors.success} style={{ fontWeight: '600' }}>
            {formatCurrency(summary.totalRefunded)}
          </FluxText>
        </View>
        <View style={{ width: 1, backgroundColor: hexToRgba(colors.textSecondary, 0.2) }} />
        <View className="flex-1 items-center">
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 2 }}>
            {t('expenses.dailyAvg')}
          </FluxText>
          <FluxText textStyle="caption" color={colors.textPrimary} style={{ fontWeight: '600' }}>
            {formatCurrency(summary.dailyAverage)}
          </FluxText>
        </View>
      </View>

      {/* Transaction count */}
      <View className="mt-3 items-center">
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
          {`${summary.transactionCount} ${t('expenses.transactions')}`}
        </FluxText>
      </View>
    </Card>
  );
}

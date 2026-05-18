import React from 'react';
import { View } from 'react-native';
import { useFluxColors, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../lib/formatters';
import { CATEGORY_META } from '../../engines/smsParser';
import type { CategoryBreakdownItem } from '../../engines/types';
import { useTranslation } from 'react-i18next';

interface CategoryBreakdownProps {
  breakdown: CategoryBreakdownItem[];
}

export function CategoryBreakdown({ breakdown }: CategoryBreakdownProps) {
  const colors = useFluxColors();
  const { t } = useTranslation();

  if (breakdown.length === 0) return null;

  return (
    <Card>
      <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontWeight: '600', marginBottom: 12 }}>
        {t('expenses.categoryBreakdown')}
      </FluxText>

      {breakdown.map((item) => {
        const meta = CATEGORY_META[item.category];
        return (
          <View key={item.category} className="mb-3">
            <View className="flex-row justify-between items-center mb-1">
              <View className="flex-row items-center">
                <FluxText textStyle="body" style={{ marginRight: 6 }}>
                  {meta.emoji}
                </FluxText>
                <FluxText textStyle="caption" color={colors.textPrimary} style={{ fontWeight: '500' }}>
                  {t(`expenses.categories.${item.category}`)}
                </FluxText>
              </View>
              <View className="flex-row items-center">
                <FluxText textStyle="caption" color={colors.textPrimary} style={{ fontWeight: '600', marginRight: 8 }}>
                  {formatCurrency(item.total)}
                </FluxText>
                <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, width: 40, textAlign: 'right' }}>
                  {item.percentage.toFixed(1)}%
                </FluxText>
              </View>
            </View>
            {/* Progress bar */}
            <View style={{ height: 6, borderRadius: 3, backgroundColor: hexToRgba(colors.textSecondary, 0.15) }}>
              <View
                style={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: meta.color,
                  width: `${Math.min(item.percentage, 100)}%`,
                }}
              />
            </View>
          </View>
        );
      })}
    </Card>
  );
}

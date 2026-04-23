import React from 'react';
import { View } from 'react-native';
import { useFluxColors, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../lib/formatters';

interface ProfitShareWidgetProps {
  amount: number;
  period: string;
  annualizedReturn: number;
  className?: string;
}

export function ProfitShareWidget({
  amount,
  period,
  annualizedReturn,
  className,
}: ProfitShareWidgetProps) {
  const colors = useFluxColors();
  const isPositive = amount >= 0;
  const color = isPositive ? colors.success : colors.error;
  const bg = hexToRgba(color, 0.2);
  const sign = isPositive ? '+' : '-';

  return (
    <Card className={`${className ?? ''}`}>
      <View className="flex-row justify-between items-center mb-3">
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontWeight: '600' }}>
          Profit Share
        </FluxText>
        <FluxText textStyle="caption" color={colors.warning} style={{ fontSize: 10 }}>
          {period}
        </FluxText>
      </View>
      <FluxText textStyle="headline" color={color} style={{ marginBottom: 4 }}>
        {`${sign}${formatCurrency(Math.abs(amount))}`}
      </FluxText>
      <View className="flex-row items-center">
        <View style={{ backgroundColor: bg, borderRadius: 9999, paddingHorizontal: 8, paddingVertical: 2, marginRight: 8 }}>
          <FluxText textStyle="caption" color={color} style={{ fontSize: 10 }}>
            {`${isPositive ? '+' : ''}${(annualizedReturn * 100).toFixed(1)}% APR`}
          </FluxText>
        </View>
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
          Mudarabah Return
        </FluxText>
      </View>
    </Card>
  );
}

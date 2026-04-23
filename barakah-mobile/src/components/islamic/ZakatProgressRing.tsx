import React from 'react';
import { View } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText, FluxProgressRing } from '@flux-ds/react-native-foundation';
import { formatCurrency } from '../../lib/formatters';

interface ZakatProgressRingProps {
  zakatDue: number;
  netWealth: number;
  nisabThreshold: number;
  size?: number;
  className?: string;
}

export function ZakatProgressRing({
  zakatDue,
  netWealth,
  nisabThreshold,
  size = 160,
  className,
}: ZakatProgressRingProps) {
  const colors = useFluxColors();
  const progress = nisabThreshold > 0 ? Math.min(netWealth / nisabThreshold, 2) / 2 : 0;
  const isAboveNisab = netWealth >= nisabThreshold;

  return (
    <View className={`items-center ${className ?? ''}`}>
      <FluxProgressRing
        progress={progress}
        size={size}
        strokeWidth={10}
        trackColor={colors.secondary}
        progressColor={isAboveNisab ? colors.warning : colors.textSecondary}
      >
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
          Zakat Due
        </FluxText>
        <FluxText textStyle="headline" color={colors.warning}>
          {formatCurrency(zakatDue)}
        </FluxText>
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
          2.5%
        </FluxText>
      </FluxProgressRing>
    </View>
  );
}

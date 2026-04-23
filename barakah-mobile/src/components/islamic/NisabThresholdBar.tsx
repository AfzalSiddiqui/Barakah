import React from 'react';
import { View } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText, FluxProgressBar } from '@flux-ds/react-native-foundation';
import { formatCurrency } from '../../lib/formatters';

interface NisabThresholdBarProps {
  netWealth: number;
  nisabThreshold: number;
  className?: string;
}

export function NisabThresholdBar({ netWealth, nisabThreshold, className }: NisabThresholdBarProps) {
  const colors = useFluxColors();
  const progress = Math.min(netWealth / nisabThreshold, 1);
  const isAboveNisab = netWealth >= nisabThreshold;

  return (
    <View className={className}>
      <View className="flex-row justify-between mb-2">
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontWeight: '600' }}>
          Nisab Threshold
        </FluxText>
        <FluxText
          textStyle="caption"
          color={isAboveNisab ? colors.warning : colors.textSecondary}
          style={{ fontWeight: '600' }}
        >
          {isAboveNisab ? 'Above Nisab' : 'Below Nisab'}
        </FluxText>
      </View>
      <FluxProgressBar
        progress={progress}
        height={12}
        trackColor={colors.surface}
        progressColor={isAboveNisab ? colors.warning : colors.textSecondary}
      />
      <View className="flex-row justify-between mt-1">
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
          {formatCurrency(netWealth)}
        </FluxText>
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
          {formatCurrency(nisabThreshold)}
        </FluxText>
      </View>
    </View>
  );
}

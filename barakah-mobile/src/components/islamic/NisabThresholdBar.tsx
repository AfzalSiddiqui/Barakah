import React from 'react';
import { View } from 'react-native';
import { Typography } from '../ui/Typography';
import { formatCurrency } from '../../lib/formatters';

interface NisabThresholdBarProps {
  netWealth: number;
  nisabThreshold: number;
  className?: string;
}

export function NisabThresholdBar({ netWealth, nisabThreshold, className }: NisabThresholdBarProps) {
  const progress = Math.min((netWealth / nisabThreshold) * 100, 100);
  const isAboveNisab = netWealth >= nisabThreshold;

  return (
    <View className={className}>
      <View className="flex-row justify-between mb-2">
        <Typography variant="captionBold" className="text-nb-muted">
          Nisab Threshold
        </Typography>
        <Typography
          variant="captionBold"
          className={isAboveNisab ? 'text-nb-gold' : 'text-nb-muted'}
        >
          {isAboveNisab ? 'Above Nisab' : 'Below Nisab'}
        </Typography>
      </View>
      <View className="h-3 bg-nb-surface rounded-full overflow-hidden">
        <View
          className={`h-full rounded-full ${isAboveNisab ? 'bg-nb-gold' : 'bg-nb-muted'}`}
          style={{ width: `${progress}%` }}
        />
      </View>
      <View className="flex-row justify-between mt-1">
        <Typography variant="small" className="text-nb-muted">
          {formatCurrency(netWealth)}
        </Typography>
        <Typography variant="small" className="text-nb-muted">
          {formatCurrency(nisabThreshold)}
        </Typography>
      </View>
    </View>
  );
}

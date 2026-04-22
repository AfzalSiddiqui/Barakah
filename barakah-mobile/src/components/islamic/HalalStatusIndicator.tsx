import React from 'react';
import { View } from 'react-native';
import { Typography } from '../ui/Typography';
import type { HalalStatus } from '../../engines/types';

interface HalalStatusIndicatorProps {
  name: string;
  ticker: string;
  status: HalalStatus;
  failedChecks: string[];
  className?: string;
}

const statusConfig: Record<HalalStatus, { color: string; bg: string; label: string; dot: string }> = {
  halal: { color: 'text-nb-green', bg: 'bg-nb-green/20', label: 'Halal', dot: 'bg-nb-green' },
  haram: { color: 'text-nb-red', bg: 'bg-nb-red/20', label: 'Non-Compliant', dot: 'bg-nb-red' },
  doubtful: { color: 'text-nb-gold', bg: 'bg-nb-gold/20', label: 'Review', dot: 'bg-nb-gold' },
};

export function HalalStatusIndicator({
  name,
  ticker,
  status,
  failedChecks,
  className,
}: HalalStatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <View className={`bg-nb-surface rounded-xl p-3 ${className ?? ''}`}>
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Typography variant="bodyBold" className="text-nb-text">
            {name}
          </Typography>
          <Typography variant="small" className="text-nb-muted">
            {ticker}
          </Typography>
        </View>
        <View className={`flex-row items-center ${config.bg} rounded-full px-3 py-1`}>
          <View className={`w-2 h-2 rounded-full ${config.dot} mr-1.5`} />
          <Typography variant="smallBold" className={config.color}>
            {config.label}
          </Typography>
        </View>
      </View>
      {failedChecks.length > 0 && (
        <View className="mt-2">
          {failedChecks.map((check, idx) => (
            <Typography key={idx} variant="small" className="text-nb-red/80 mt-0.5">
              • {check}
            </Typography>
          ))}
        </View>
      )}
    </View>
  );
}

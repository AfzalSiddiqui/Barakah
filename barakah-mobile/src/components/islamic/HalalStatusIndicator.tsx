import React from 'react';
import { View } from 'react-native';
import { useFluxColors, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import type { HalalStatus } from '../../engines/types';

interface HalalStatusIndicatorProps {
  name: string;
  ticker: string;
  status: HalalStatus;
  failedChecks: string[];
  className?: string;
}

export function HalalStatusIndicator({
  name,
  ticker,
  status,
  failedChecks,
  className,
}: HalalStatusIndicatorProps) {
  const colors = useFluxColors();

  const statusConfig: Record<HalalStatus, { color: string; bg: string; label: string }> = {
    halal: { color: colors.success, bg: hexToRgba(colors.success, 0.2), label: 'Halal' },
    haram: { color: colors.error, bg: hexToRgba(colors.error, 0.2), label: 'Non-Compliant' },
    doubtful: { color: colors.warning, bg: hexToRgba(colors.warning, 0.2), label: 'Review' },
  };

  const config = statusConfig[status];

  return (
    <View className={`bg-nb-surface rounded-xl p-3 ${className ?? ''}`}>
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <FluxText textStyle="body" color={colors.textPrimary} style={{ fontWeight: '600', fontSize: 14 }}>
            {name}
          </FluxText>
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
            {ticker}
          </FluxText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: config.bg, borderRadius: 9999, paddingHorizontal: 12, paddingVertical: 4 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: config.color, marginRight: 6 }} />
          <FluxText textStyle="caption" color={config.color} style={{ fontWeight: '600', fontSize: 10 }}>
            {config.label}
          </FluxText>
        </View>
      </View>
      {failedChecks.length > 0 && (
        <View className="mt-2">
          {failedChecks.map((check, idx) => (
            <FluxText key={idx} textStyle="caption" color={colors.error} style={{ fontSize: 10, marginTop: 2, opacity: 0.8 }}>
              {`• ${check}`}
            </FluxText>
          ))}
        </View>
      )}
    </View>
  );
}

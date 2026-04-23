import React from 'react';
import { View } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import type { WatchlistItem as WatchlistItemType } from '../../engines/types';
import { useRTL } from '../../hooks/useRTL';

interface WatchlistItemProps {
  item: WatchlistItemType;
}

export function WatchlistItem({ item }: WatchlistItemProps) {
  const colors = useFluxColors();
  const { isRTL, flexRow } = useRTL();
  const changeColor = item.dailyChangePercent >= 0 ? colors.success : colors.error;
  const changeSign = item.dailyChangePercent >= 0 ? '+' : '';

  const statusDotColor = {
    halal: colors.success,
    haram: colors.error,
    doubtful: colors.warning,
  } as const;

  return (
    <View className={`${flexRow} justify-between items-center py-2.5 border-b border-nb-muted/10`}>
      <View className={`${flexRow} items-center gap-2`}>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: statusDotColor[item.status] }} />
        <View>
          <FluxText textStyle="caption" color={colors.textPrimary} style={{ fontWeight: '600' }}>
            {item.ticker}
          </FluxText>
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
            {isRTL ? item.nameAr : item.name}
          </FluxText>
        </View>
      </View>
      <View className="items-end">
        <FluxText textStyle="caption" color={colors.textPrimary} style={{ fontWeight: '600' }}>
          {item.currentPrice.toFixed(2)}
        </FluxText>
        <FluxText textStyle="caption" color={changeColor} style={{ fontSize: 10 }}>
          {`${changeSign}${item.dailyChangePercent.toFixed(1)}%`}
        </FluxText>
      </View>
    </View>
  );
}

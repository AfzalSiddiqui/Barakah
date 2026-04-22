import React from 'react';
import { View } from 'react-native';
import { Typography } from '../ui/Typography';
import type { WatchlistItem as WatchlistItemType } from '../../engines/types';
import { useRTL } from '../../hooks/useRTL';

interface WatchlistItemProps {
  item: WatchlistItemType;
}

const statusDot = {
  halal: 'bg-nb-green',
  haram: 'bg-nb-red',
  doubtful: 'bg-nb-gold',
} as const;

export function WatchlistItem({ item }: WatchlistItemProps) {
  const { isRTL, flexRow } = useRTL();
  const changeColor = item.dailyChangePercent >= 0 ? 'text-nb-green' : 'text-nb-red';
  const changeSign = item.dailyChangePercent >= 0 ? '+' : '';

  return (
    <View className={`${flexRow} justify-between items-center py-2.5 border-b border-nb-muted/10`}>
      <View className={`${flexRow} items-center gap-2`}>
        <View className={`w-2 h-2 rounded-full ${statusDot[item.status]}`} />
        <View>
          <Typography variant="captionBold" className="text-nb-text">
            {item.ticker}
          </Typography>
          <Typography variant="small" className="text-nb-muted">
            {isRTL ? item.nameAr : item.name}
          </Typography>
        </View>
      </View>
      <View className="items-end">
        <Typography variant="captionBold" className="text-nb-text">
          {item.currentPrice.toFixed(2)}
        </Typography>
        <Typography variant="small" className={changeColor}>
          {changeSign}{item.dailyChangePercent.toFixed(1)}%
        </Typography>
      </View>
    </View>
  );
}
